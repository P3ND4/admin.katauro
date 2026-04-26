import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tags } from '../../../../../shared/models/blog/tags.entity';
import { CreateTag } from '../../../../../shared/models/blog/DTO\'s/tags.entity';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-tag-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-tag-modal.html',
  styleUrl: './create-tag-modal.css'
})
export class CreateTagModal implements OnInit {
  @Output() tagCreated = new EventEmitter<CreateTag>();
  @Output() closed = new EventEmitter<void>();
  @ViewChild('bgColor', { static: true }) colorInput!: ElementRef<HTMLInputElement>;
  createTagForm: FormGroup;


  showColorDropdown = false;
  selectedColor: { name: string; hex: string } | null = null;

  fontColor = '#007981';
  bgColorValue = '#F0FEFF';

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.createTagForm = this.fb.group({
      name: ['', [Validators.required]],
      colorHex: [this.fontColor, [Validators.required]],
      bgColor: [this.bgColorValue, [Validators.required]]
    });
  }

  onColorChange(event: Event, colorType: 'font' | 'background' = 'font'): void {
    const input = event.target as HTMLInputElement;
    if (colorType === 'font') {
      this.fontColor = input.value;
      this.createTagForm.patchValue({ colorHex: this.fontColor });
      console.log('Color de fuente seleccionado:', this.fontColor);
    } else {
      this.bgColorValue = input.value;
      this.createTagForm.patchValue({ bgColor: this.bgColorValue });
      console.log('Color de fondo seleccionado:', this.bgColorValue);
    }
    this.cdr.detectChanges();
  }

  openColorOption(): void {
    this.colorInput.nativeElement.click();
  }
  ngOnInit(): void {

  }
  onSelectColor(color: { name: string; hex: string }): void {
    this.selectedColor = color;
    this.createTagForm.patchValue({ colorHex: color.hex });
    this.showColorDropdown = false;
  }

  onSubmit(): void {
    if (this.createTagForm.valid) {
      const newTag: CreateTag = {
        name: this.createTagForm.value.name,
        color: this.fontColor,
        bgColor: this.bgColorValue
      };
      this.tagCreated.emit(newTag);
    
      this.createTagForm.reset();
    }
  }

  onCancel(): void {
    this.createTagForm.reset();
    this.closed.emit();
  }
}
