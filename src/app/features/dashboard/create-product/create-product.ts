import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Finish, Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct {
  file: File | undefined;
  imagePreview: string | undefined
  isHovering = false;
  isHoveringVariant = false;
  createProductForm: FormGroup;
  finishes: Finish[] = [];
  editProduct: Product | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputVariants') fileInputVariants!: ElementRef<HTMLInputElement>;
  typology = true; // true for simple, false for variant
  defaultVAriant = 0;
  currentVariant = 0;
  variantPreviews: string[][] = [[]];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {

    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      details: ['', [Validators.required, Validators.maxLength(80)]],
      vector: [null, Validators.required],
      variants: this.fb.array([])
    });

    this.addVariant();
  }



  onTypologyChange(value: boolean) {
    this.typology = value;
    this.cdr.detectChanges();
  }

  onSubmit() { }

  onDragOver(event: DragEvent, isVariant?: boolean) {
    event.preventDefault();
    if (isVariant) {
      this.isHoveringVariant = true;
    } else this.isHovering = true;
  }

  onDragLeave(event: DragEvent, isVariant?: boolean) {
    if (isVariant) {
      this.isHoveringVariant = false;
    } else this.isHovering = false;
  }

  onDrop(event: DragEvent, isVariant?: boolean) {
    event.preventDefault();
    if (isVariant) {
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
      this.loadImage(file);
      event.dataTransfer.clearData();
    }
  }

  onFilesSelected(event: Event, isVariant?: boolean) {
    if (isVariant) this.fileInputVariants.nativeElement.click();
    else this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event, isVariant?: boolean) {
    const input = event.target as HTMLInputElement;
    if (isVariant) {
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
      this.createProductForm.get('vector')?.setValue(file);
      this.loadImage(file);
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

  openFinishModal() {
    // Logic to open the modal
  }

  loadImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
    console.log(this.imagePreview)
  }

  canPreview() {
    return this.imagePreview
  }

  addVariant() {
    const variantGroup = this.fb.group({
      stock: [0, Validators.required],
      price: [0, Validators.required],
      variantImages: [[], [Validators.required, Validators.minLength(4)]]  // para los archivos
    });
    this.variants.push(variantGroup);
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
}
