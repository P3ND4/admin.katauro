import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatModel, Color, Finish, Product, Typology } from '../../../shared/models/Product';
import { CreateProductDto, CreateSpecProductDTO } from '../../../shared/models/create-product-dto';
import { httpService } from '../../../shared/services/http/http.service';
import { CloudinaryService } from '../../../shared/services/cloudinary/cloudinary.service';
import { HttpEventType } from '@angular/common/http';

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

  progress = -1;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: httpService, readonly cloudy: CloudinaryService) {

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
      variants: this.fb.array([]),
    });

    this.addVariant();
  }
  ngOnInit(): void {

    this.chargeComponentData();


  }

  chargeComponentData() {
    this.http.getCategories().subscribe({
      next: (val) => {
        this.categories = val as CatModel[];
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
  }


  onTypologyChange(value: boolean) {
    this.typology = value;
    this.cdr.detectChanges();
  }

  selectCategory(id: string) {
    this.createProductForm.get('categoryId')?.setValue(id);
    this.showDialog = 0;
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
        var currentFiles = this.variants.controls[this.currentVariant].get('variantImages')?.value as File[];
        currentFiles.push(...files);
        currentFiles = currentFiles.slice(currentFiles.length < 5 ? 0 : -5);
        this.variants.controls[this.currentVariant].get('variantImages')?.patchValue(currentFiles);
        this.loadImageVariants(currentFiles);
        event.dataTransfer.clearData();
      }
      return;
    }
    this.isHovering = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      this.createProductForm.get('vector')?.setValue(file);
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
        const files = [...input.files];
        var currentFiles = this.variants.controls[this.currentVariant].get('variantImages')?.value as File[];
        currentFiles.push(...files);
        currentFiles = currentFiles.slice(currentFiles.length < 5 ? 0 : -5);
        this.variants.controls[this.currentVariant].get('variantImages')?.patchValue(currentFiles);
        this.loadImageVariants(currentFiles);
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
    this.showDialog = dialog;
    document.body.style.overflow = 'hidden'; // ❌ bloquea scroll
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
      variantImages: [[], [Validators.required, Validators.minLength(4)]]  // para los archivos
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

      const body: CreateProductDto = {
        name: this.createProductForm.get('name')?.value,
        description: this.createProductForm.get('description')?.value,
        subtitle: this.createProductForm.get('subtitle')?.value.split('\n'),
        categoryId: this.createProductForm.get('categoryId')?.value, // Example category ID
        typology: this.typology ? Typology.simple : Typology.variant,
        vector: "", // Placeholder, handle file upload separately
        details: this.createProductForm.get('details')?.value.split('\n'),
        variants: (this.createProductForm.get('variants') as FormArray).controls.map(
          (variant: any): CreateSpecProductDTO =>
          ({
            stock: variant.get('stock')?.value,
            price: variant.get('price')?.value,
            colorId: ""
          }))
      }
      console.log(body);
    }

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
            this.showDialog = 0;
            this.cdr.detectChanges();
            this.chargeComponentData();
          },
          error: err => console.log(err)
        }
      )
    }
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
            this.showDialog = 0;
            this.cdr.detectChanges();
            this.chargeComponentData();
          },
          error: err => console.log(err)
        }
      )
    }

  }



  addFinish(item: Finish) {
    this.finishes.push(item)
  }


}
