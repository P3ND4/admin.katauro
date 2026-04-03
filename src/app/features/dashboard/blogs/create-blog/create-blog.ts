import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DragAndDrop } from '../../../../shared/components/drag-and-drop/drag-and-drop';
import { CreateTagModal } from '../../../../shared/components/create-tag-modal/create-tag-modal';
import { Tags } from '../../../../shared/models/tags.entity';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule, DragAndDrop, RouterLink, CreateTagModal],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog implements OnInit {
  createForm: FormGroup;
  openTagOption = false;
  showCreateTagModal = false;
  tags: Tags[] = [];
  selectedTags: { [key: string]: Tags } = {};
  imageUrl = '';
  imagePublicId = '';

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  toggleTagOption(): void {
    this.openTagOption = !this.openTagOption;
  }

  openCreateTagModal(): void {
    this.showCreateTagModal = true;
  }

  onTagCreated(tag: Tags): void {
    this.tags.push(tag);
    this.selectedTags[tag.id] = tag;
    this.showCreateTagModal = false;
  }

  onTagModalClosed(): void {
    this.showCreateTagModal = false;
  }

  onSelectTag(tag: Tags): void {
    if (tag.id in this.selectedTags) {
      delete this.selectedTags[tag.id];
    } else {
      this.selectedTags[tag.id] = tag;
    }
  }

  getSelectedTags(): Tags[] {
    return Object.values(this.selectedTags);
  }

  onRemoveTag(tag: Tags): void {
    delete this.selectedTags[tag.id];
  }

  onImageUploaded(payload: { secure_url: string, public_id: string }): void {
    this.imageUrl = payload.secure_url;
    this.imagePublicId = payload.public_id;
  }

  valid(): boolean {
    return this.createForm.valid && this.getSelectedTags().length > 0 && !!this.imageUrl;
  }

  onSubmit(): void {
    if (!this.valid()) return;

    const blogData = {
      title: this.createForm.value.title,
      content: this.createForm.value.content,
      tags: this.getSelectedTags().map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
      image: this.imageUrl,
      imagePublicId: this.imagePublicId,
      createdAt: new Date().toISOString(),
    };

    console.log('Creando blog:', blogData);
    // TODO: llamar servicio http para crear el blog y navegar a lista de blogs
  }
}

