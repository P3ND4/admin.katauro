import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct {

  createProductForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createProductForm = this.fb.group({
      name: [''],
      subtitle: [''],
      description: [''],
      details: [''],
    });
  }



  onSubmit() { }
}
