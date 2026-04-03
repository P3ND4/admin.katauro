import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tags } from '../../models/tags.entity';

@Component({
  selector: 'app-create-tag-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-tag-modal.html',
  styleUrl: './create-tag-modal.css'
})
export class CreateTagModal implements OnInit {
  @Output() tagCreated = new EventEmitter<Tags>();
  @Output() closed = new EventEmitter<void>();

  createTagForm: FormGroup;
  availableColors = [
    { name: 'Azul', hex: '#0070f3' },
    { name: 'Naranja', hex: '#f39c12' },
    { name: 'Verde', hex: '#27ae60' },
    { name: 'Púrpura', hex: '#9b59b6' },
    { name: 'Rojo', hex: '#e74c3c' },
    { name: 'Cian', hex: '#1abc9c' },
    { name: 'Gris', hex: '#95a5a6' },
    { name: 'Marrón', hex: '#a93226' },
  ];

  showColorDropdown = false;
  selectedColor: { name: string; hex: string } | null = null;

  constructor(private fb: FormBuilder) {
    this.createTagForm = this.fb.group({
      name: ['', [Validators.required]],
      colorHex: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.availableColors.length > 0) {
      this.selectedColor = this.availableColors[0];
      this.createTagForm.patchValue({ colorHex: this.availableColors[0].hex });
    }
  }

  onSelectColor(color: { name: string; hex: string }): void {
    this.selectedColor = color;
    this.createTagForm.patchValue({ colorHex: color.hex });
    this.showColorDropdown = false;
  }

  onSubmit(): void {
    if (this.createTagForm.valid && this.selectedColor) {
      const newTag: Tags = {
        id: Date.now().toString(),
        name: this.createTagForm.value.name,
        color: this.selectedColor.hex
      };
      this.tagCreated.emit(newTag);
      this.createTagForm.reset();
      this.selectedColor = this.availableColors[0];
    }
  }

  onCancel(): void {
    this.createTagForm.reset();
    this.selectedColor = this.availableColors[0];
    this.closed.emit();
  }
}
