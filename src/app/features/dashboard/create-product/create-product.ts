import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CatModel, Color, Finish, Product, Typology } from '../../../shared/models/Product';
import { CreateProductDto, CreateSpecProductDTO } from '../../../shared/models/create-product-dto';
import { httpService } from '../../../shared/services/http/http.service';
import { CloudinaryService } from '../../../shared/services/cloudinary/cloudinary.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct implements OnInit {
  file: File | undefined;
  createFinish: FormGroup;
  createColor: FormGroup;
  imagePreview: string[] | undefined[] = [undefined, undefined, undefined, undefined]
  isHovering = false;
  isHoveringVariant = false;
  createProductForm: FormGroup;
  finishes: Finish[] = [];
  color: (Color | undefined)[] = [undefined];
  editProduct: Product | undefined;
  subscript: Subscription | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputVariants') fileInputVariants!: ElementRef<HTMLInputElement>;
  @ViewChild('finish') finishInput!: ElementRef<HTMLInputElement>;
  @ViewChild('color') colorInput!: ElementRef<HTMLInputElement>;

  typology = true; // true for simple, false for variant
  defaultVAriant = 0;
  currentVariant = 0;
  variantPreviews: string[][] = [[]];
  showDialog = 0;
  aviableFinishes: Finish[] = [];
  aviavleColors: Color[] = [];
  categories: CatModel[] = [];
  edit = false;
  progress = -1;

  constructor(private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private http: httpService, readonly cloudy: CloudinaryService) {

    this.createColor = fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required]
    })


    this.createFinish = fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required]
    })


    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      details: ['', [Validators.required, Validators.maxLength(80)]],
      vector: [null, Validators.required],
      categoryId: ['', Validators.required],
      finishesId: [[], Validators.minLength(1)],
      variants: this.fb.array([]),
    });

    this.addVariant();
  }
  ngOnInit(): void {

    this.subscript = this.route.queryParams.subscribe(() => {
      this.chargeComponentData();
    })


  }

  chargeComponentData() {

    const edit = this.route.snapshot.queryParamMap.get('edit');
    this.edit = edit == 'true';

    this.http.getCategories().subscribe({
      next: (val) => {
        this.categories = val as CatModel[];
        this.categories = this.categories.filter(x => x.nombre != Category.other)
        console.log(this.categories);
        console.log(val);
      },
      error: (err) => console.log(err)
    })

    this.http.getColors().subscribe({
      next: (val) => this.aviavleColors = val as Color[],
      error: err => console.log(err)
    })

    this.http.getFinishes().subscribe({
      next: val => this.aviableFinishes = val as Finish[],
      error: err => console.log(err)
    })

    if (this.edit) {
      const id = this.route.snapshot.queryParamMap.get('id');
      this.http.getProductById(id ? id : '').subscribe({
        next: val => {
          this.editProduct = val as Product;
          console.log(this.editProduct);
          if (edit) this.setValuesForEdit();
        },
        error: err => console.log(err)
      });
    }

  }
  setValuesForEdit() {
    if (this.editProduct) {
      this.createProductForm.get('name')?.setValue(this.editProduct.name);
      this.createProductForm.get('subtitle')?.setValue(this.editProduct.subtitle);
      this.createProductForm.get('description')?.setValue(this.editProduct.description);
      this.createProductForm.get('details')?.setValue(this.editProduct.details.map(x => x.text).join('\n'));
      this.createProductForm.get('vector')?.setValue(this.editProduct.vector);
      this.createProductForm.get('categoryId')?.setValue(this.editProduct.category.id);
      this.createProductForm.get('finishesId')?.setValue(this.editProduct.finish.map(x => x.finishId));
      this.typology = this.editProduct.typology == Typology.simple ? true : false;
      this.finishes = this.editProduct.finish.map(x => this.aviableFinishes.find(f => f.id == x.finishId!)).filter(x => x != undefined);
      this.imagePreview[0] = this.editProduct.vector;
      for (let i = 0; i < this.editProduct.variants.length - 1; i++) {
        this.addVariant();
      }
      this.currentVariant = 0;
      this.editProduct.variants.forEach((variant, index) => {
        this.variants.controls[index].get('colorId')?.setValue(variant.color?.id);
        this.color[index] = variant.color;
        this.variants.controls[index].get('stock')?.setValue(variant.stock);
        this.variants.controls[index].get('price')?.setValue(variant.price);
        this.variants.controls[index].get('variantImages')?.patchValue(variant.images.map(img => img.link));
        this.variantPreviews[index] = variant.images.map(img => img.link);
      });

      this.cdr.detectChanges();
    }
  }

  onTypologyChange(value: boolean) {
    this.typology = value;
    this.cdr.detectChanges();
  }

  selectCategory(id: string) {
    this.createProductForm.get('categoryId')?.setValue(id);
    this.closeDialog();
  }

  getCategory() {
    const cat = this.categories.find((x) => this.createProductForm.get('categoryId')?.value == x.id);
    return cat ? cat.nombre : 'Selecciona una categoría'
  }

  onDragOver(event: DragEvent, option?: number) {
    event.preventDefault();
    if (option == undefined) {
      this.isHoveringVariant = true;
    } else this.isHovering = true;
  }

  onDragLeave(event: DragEvent, option?: number) {
    if (option == undefined) {
      this.isHoveringVariant = false;
    } else this.isHovering = false;
  }

  async onDrop(event: DragEvent, option?: number) {
    event.preventDefault();
    if (option == undefined) {
      this.isHoveringVariant = false;
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        var files = [...event.dataTransfer.files];
        if (files.length > 5) {
          files = files.slice(0, 5);
        }
        this.uploadMulti(files);
        event.dataTransfer.clearData();
      }
      return;
    }
    this.isHovering = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      //this.createProductForm.get('vector')?.setValue(file);
      this.upload(file, option);
      //this.loadImage(file);
      event.dataTransfer.clearData();
    }
  }

  onFilesSelected(event: Event, option?: number) {
    if (option == undefined) this.fileInputVariants.nativeElement.click();
    else {
      switch (option) {
        case 0:
          this.fileInput.nativeElement.click();
          break;
        case 1:
          this.finishInput.nativeElement.click();
          break;
        case 2:
          this.colorInput.nativeElement.click()
      }
    }
  }

  onFileChange(event: Event, option?: number) {
    const input = event.target as HTMLInputElement;
    if (option == undefined) {
      if (input.files && input.files.length > 0) {
        var files = [...input.files];
        if (files.length > 5) {
          files = files.slice(0, 5);
        }
        this.uploadMulti(files);
      }
      return;
    }
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      //this.createProductForm.get('vector')?.setValue(file);
      this.upload(file, option);
      //this.loadImage(file);
    }
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  loadImageVariants(files: File[]) {
    Promise.all(files.map(f => this.readFileAsDataURL(f)))
      .then(previews => {
        this.variantPreviews[this.currentVariant] = previews;
        this.cdr.detectChanges();
      })
      .catch(err => {
        console.error('Error leyendo imágenes', err);
      });
  }

  openFinishModal(dialog: number) {
    this.showDialog = dialog == this.showDialog ? 0 : dialog;
  }
  closeDialog() {
    this.showDialog = 0;
    document.body.style.overflow = ''; // ✅ vuelve a lo normal
    this.cdr.detectChanges();
  }

  canPreview(i: number) {
    return this.imagePreview[i];
  }

  addVariant() {
    const variantGroup = this.fb.group({
      stock: [0, Validators.required],
      price: [0, Validators.required],
      colorId: ['', Validators.required],
      variantImages: [[], [Validators.required, Validators.minLength(5)]]  // para los archivos
    });
    this.variants.push(variantGroup);
    this.color.push(undefined);
  }


  get variants() {
    return this.createProductForm.get('variants') as FormArray;
  }


  plus() {
    const stock = this.variants.controls[this.currentVariant].value.stock;
    this.variants.controls[this.currentVariant].get('stock')?.setValue(stock + 1);;
    this.cdr.detectChanges();
  }

  minus() {
    const stock = this.variants.controls[this.currentVariant].value.stock;
    this.variants.controls[this.currentVariant].get('stock')?.setValue(stock - 1);
  }

  onSubmit() {
    if (this.createProductForm.valid) {

      const variantsArray = this.variants.value;

      // Crear una copia para reordenar sin afectar el original
      const reorderedVariants = [...variantsArray];

      // Solo hacer swap si defaultVAriant no es 0
      if (this.defaultVAriant !== 0) {
        [reorderedVariants[0], reorderedVariants[this.defaultVAriant]] =
          [reorderedVariants[this.defaultVAriant], reorderedVariants[0]];
      }

      const body: CreateProductDto = {
        name: this.createProductForm.get('name')?.value,
        description: this.createProductForm.get('description')?.value,
        subtitle: this.createProductForm.get('subtitle')?.value,
        categoryId: this.createProductForm.get('categoryId')?.value, // Example category ID
        typology: this.typology ? Typology.simple : Typology.variant,
        vector: this.createProductForm.get('vector')?.value, // Placeholder, handle file upload separately
        details: this.createProductForm.get('details')?.value.split('\n'),
        finishId: this.createProductForm.get('finishesId')?.value,
        variants: reorderedVariants.map(
          (variant: any): CreateSpecProductDTO =>
          ({
            stock: variant.stock,
            price: variant.price,
            colorId: variant.colorId,
            image: variant.variantImages[0], // La primera imagen sigue siendo la importante
            images: variant.variantImages

          }))
      }
      console.log(body);
      if (!this.edit) {
        this.http.createProduct(body).subscribe(
          {
            next: val => {
              console.log(val);
              this.router.navigate(['dashboard/products']);

            },
            error: err => console.log(err)
          }
        );
      }
      else {
        this.update(body);
      }
    }

  }

  uploadMulti(files: File[]) {
    this.progress = 0;
    const count = files.length
    var urls: string[] = files.map(file => "");
    files.forEach((file, index: number) => {
      var fileProgress = 0
      this.cloudy.uploadFile(file).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = this.progress - fileProgress
          fileProgress = Math.round(((event.loaded / event.total) * 100) / count);
          this.progress += fileProgress
          this.cdr.detectChanges();
        } else if (event.type === HttpEventType.Response) {
          console.log('✅ Subida completa:', event.body);
          const optimizedUrl = (event.body as { secure_url: string }).secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
          this.progress = this.progress - fileProgress
          fileProgress = Math.round(100 / count);
          this.progress += fileProgress;
          urls[index] = optimizedUrl
          if (this.progress === 100) {
            var currentFiles = this.variants.controls[this.currentVariant].get('variantImages')?.value as string[];
            currentFiles = files.length + currentFiles.length > 5 && files.length < 5 ? currentFiles.slice(currentFiles.length - (5 - files.length), undefined) : files.length == 5 ? [] : currentFiles;
            currentFiles.push(...urls);
            this.variants.controls[this.currentVariant].get('variantImages')?.patchValue(currentFiles)
            this.variantPreviews[this.currentVariant] = currentFiles;
            setTimeout(() => {
              this.progress = -1;
              this.cdr.detectChanges();
            }, 3000);

          }

          this.cdr.detectChanges();
        }
      });
    })

  }

  upload(file: File, i: number) {
    this.progress = 0;
    this.cloudy.uploadFile(file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.progress = Math.round((event.loaded / event.total) * 100);
        this.cdr.detectChanges();
      } else if (event.type === HttpEventType.Response) {
        console.log('✅ Subida completa:', event.body);
        const optimizedUrl = (event.body as { secure_url: string }).secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
        this.progress = 100;
        this.imagePreview[i] = optimizedUrl
        switch (i) {
          case 0:
            this.createProductForm.get('vector')?.setValue(optimizedUrl);
            break;
          case 1:
            this.createFinish.get('image')?.setValue(optimizedUrl);
            break;
          case 2:
            this.createColor.get('image')?.setValue(optimizedUrl);
        }
        setTimeout(() => {
          this.progress = -1;
          this.cdr.detectChanges();
        }, 3000);
        this.cdr.detectChanges();
      }
    });
  }

  onCreateFinish() {
    if (this.createFinish.valid) {
      const finish = {
        text: this.createFinish.get('name')?.value,
        image: this.createFinish.get('image')?.value
      }
      this.http.createFinish(finish).subscribe(
        {
          next: val => {
            console.log(val);
            this.closeDialog();
            this.cdr.detectChanges();
            this.chargeComponentData();
          },
          error: err => console.log(err)
        }
      )
    }
  }
  deleteFinish(id: string) {
    this.http.deleteFinish(id).subscribe(
      {
        next: val => {
          console.log(val);
          this.closeDialog()
          this.chargeComponentData()
          this.cdr.detectChanges()
        },
        error: err => {
          console.log(err);
          this.closeDialog()
          this.cdr.detectChanges()
        }
      }
    )
  }
    deleteColor(id: string) {
    this.http.deleteColor(id).subscribe(
      {
        next: val => {
          console.log(val);
          this.closeDialog();
          this.chargeComponentData();
          this.cdr.detectChanges();
        },
        error: err => {
          console.log(err);
          this.closeDialog();
          this.cdr.detectChanges();
        }
      }
    )
  }

  onCreateColor() {
    if (this.createColor.valid) {
      const color = {
        name: this.createColor.get('name')?.value,
        image: this.createColor.get('image')?.value
      }
      this.http.createColor(color).subscribe(
        {
          next: val => {
            console.log(val);
            this.closeDialog()
            this.cdr.detectChanges();
            this.chargeComponentData();
          },
          error: err => console.log(err)
        }
      )
    }

  }

  removeFinish(id: string) {
    this.finishes = this.finishes.filter(x => x.id != id)
  }

  addFinish(item: Finish) {
    this.finishes.push(item);
    var current = this.createProductForm.get('finishesId')?.value
    current.push(item.id);
    this.createProductForm.get('finishesId')?.patchValue(current);
    this.closeDialog();
  }

  onSelectColor(color: Color) {
    this.color[this.currentVariant] = color;
    this.variants.controls[this.currentVariant].get('colorId')?.setValue(color.id)
    this.closeDialog();
    this.showDialog = 0;
    this.cdr.detectChanges();
  }

  cancel() {
    this.router.navigate(['dashboard/products'])
  }

  update(prod: CreateProductDto) {
    this.http.updateProduct(this.editProduct!.id, prod).subscribe(
      {
        next: val => {
          console.log(val);
          this.router.navigate(['dashboard/products']);
        },
        error: err => console.log(err)
      }
    );
  }

  showErrors() {
    return this.createProductForm.errors as string[]
  }
}

