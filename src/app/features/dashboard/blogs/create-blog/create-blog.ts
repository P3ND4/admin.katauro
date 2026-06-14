
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DragAndDrop } from '../../../../shared/components/drag-and-drop/drag-and-drop';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTagModal } from './create-tag-modal/create-tag-modal';
import { Tags } from '../../../../shared/models/blog/tags.entity';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AddBlock } from "./add-block/add-block";
import { CreateTag } from '../../../../shared/models/blog/DTO\'s/tags.entity';
import { Blog, BlogImage } from '../../../../shared/models';
import { Blog as CreateBlogDTO } from '../../../../shared/models/blog/DTO\'s/blog.entity';
import { BlobViewer } from "../blob-viewer/blob-viewer";
import { httpService } from '../../../../shared/services/http/http.service';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../../shared/components/box-loader/box-loader";

@Component({
  selector: 'app-create-blog',
  imports: [ReactiveFormsModule, DragAndDrop, RouterLink, CreateTagModal, QuillModule, AddBlock, BlobViewer, BoxLoader, DragDropModule],
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
  loading = false;
  todayDate: string = new Date().toISOString().split('T')[0];

  addItemOption = false;
  edit: Blog | undefined;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 2 }, { 'header': 3 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'header': [2, 3, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['clean'],
      ['link']
    ],
  };

  currentBlog: undefined | Blog;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private router: Router,
    private http: httpService, private errorService: ErrorLogService, private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      image: this.fb.group({
        url: ['', [Validators.required]],
        publicId: ['1', [Validators.required]],
      }),
      introduction: ['', [Validators.required]],
      publishedDate: [''],
      content: fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadTags();

    let id = this.route.snapshot.queryParamMap.get('edit');
    if (id) {
      this.loadBlog(id);
    }
  }

  loadBlog(id: string): void {
    this.http.getBlog(id).subscribe({
      next: (val) => {
        this.edit = val as Blog;
        console.log('Blog a editar:', this.edit);

        const mainImage = this.edit.images.find(img => img.position === -1) || this.edit.images[0];

        // Cargar datos principales del formulario
        this.createForm.patchValue({
          title: this.edit.title,
          introduction: this.edit.introduction,
          publishedDate: this.edit.publishedDate ? new Date(this.edit.publishedDate).toISOString().split('T')[0] : '',
          image: {
            url: mainImage?.link || '',
            publicId: mainImage?.publicId || '1',
          }
        });

        this.imageUrl = mainImage?.link || '';
        this.imagePublicId = mainImage?.publicId || '1';

        // Cargar tags seleccionados
        this.edit.tags.forEach(blogTag => {
          this.selectedTags[blogTag.tag.id] = blogTag.tag;
        });

        // Cargar contenido en el FormArray
        const contentArray = this.createForm.get('content') as FormArray;

        // Crear un array con todos los bloques (imágenes y texto) ordenados por posición
        const allBlocks: any[] = [];

        // Agregar imágenes de bloques (excluyendo la imagen principal que tiene position: -1)

        const contentImages = this.edit.images.filter(img => img.position !== -1);

        contentImages.forEach((img) => {
            allBlocks.push({
              type: 'image',
              position: img.position,
              data: {
                url: img.link,
                publicId: img.publicId,
                altText: img.alt || ''
              }
            });
          });

        // Agregar bloques de texto
        this.edit.blogContent.forEach((content) => {
          allBlocks.push({
            type: 'text',
            position: content.position,
            data: {
              text: content.text
            }
          });
        });

        // Ordenar por posición
        allBlocks.sort((a, b) => a.position - b.position);

        // Crear FormGroups para cada bloque
        allBlocks.forEach((block) => {
          if (block.type === 'image') {
            contentArray.push(this.fb.group({
              type: ['image'],
              url: [block.data.url, [Validators.required]],
              publicId: [block.data.publicId, [Validators.required]],
              altText: [block.data.altText],
              position: [block.position, [Validators.required]],
            }));
          } else if (block.type === 'text') {
            contentArray.push(this.fb.group({
              type: ['text'],
              text: [block.data.text, [Validators.required]],
              position: [block.position, [Validators.required]],
            }));
          }
        });

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorService.addError(parseError(err));
      }
    });
  }

  loadTags(): void {
    this.loading = true;
    this.http.getTags().subscribe({
      next: (response: any) => {
        this.tags = response as Tags[];
        console.log('Tags cargados:', this.tags);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorService.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }


  addContentBlock(): void {
    const contentArray = this.createForm.get('content') as FormArray;

    if (contentArray != undefined) {
      contentArray.push(this.fb.group({
        type: 'text',
        text: ['', [Validators.required]],
        position: [contentArray.length, [Validators.required]],
      }));
    }
  }


  onAddBlock(type: string): void {
    if (type === 'text') {
      this.addContentBlock();
    } else if (type === 'image') {
      this.addImageBlock();
    }
    this.addItemOption = false;
  }


  addBlock(): void {
    this.addItemOption = true;
  }

  addImageBlock(): void {
    const contentArray = this.createForm.get('content') as FormArray;

    if (contentArray != undefined) {
      contentArray.push(this.fb.group({
        type: 'image',
        url: ['', [Validators.required]],
        publicId: ['1', [Validators.required]],
        altText: [''],
        position: [contentArray.length, [Validators.required]],
      }));
    }
  }
  deleteContentBlock(index: number): void {
    const contentArray = this.createForm.get('content') as FormArray;
    contentArray.removeAt(index);
  }

  reorderBlocks(event: CdkDragDrop<any[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousIndex === currentIndex) return;

    const control = this.contentBlocks.at(previousIndex);
    this.contentBlocks.removeAt(previousIndex);
    this.contentBlocks.insert(currentIndex, control);

    this.contentBlocks.controls.forEach((ctrl, index) => {
      ctrl.get('position')?.setValue(index);
    });

    this.cdr.detectChanges();
  }

  public get contentBlocks(): FormArray {
    return this.createForm.get('content') as FormArray;
  }

  toggleTagOption(): void {
    this.openTagOption = !this.openTagOption;
  }

  openCreateTagModal(): void {
    this.showCreateTagModal = true;
  }

  onTagCreated(tag: CreateTag): void {
    console.log('Nuevo tag recibido en CreateBlog:', tag);

    this.http.createTag(tag).subscribe({
      next: (response) => {
        this.loadTags(); console.log('Tag creado con éxito:', response);
        this.showCreateTagModal = false;
      },
      error: (err) => {
        this.errorService.addError(parseError(err));
        this.showCreateTagModal = false;
      }
    })

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
    this.createForm.get('image')?.patchValue({
      url: payload.secure_url,
      publicId: payload.public_id,
    });
  }
  onImageUploadedContent(payload: { secure_url: string, public_id: string }, index: number): void {
    const contentArray = this.createForm.get('content') as FormArray;
    const contentGroup = contentArray.at(index) as FormGroup;
    contentGroup.patchValue({
      url: payload.secure_url,
      publicId: payload.public_id,
    });
  }
  onUploadedContent($event: { secure_url: string, public_id: string }, index: number): void {
    const contentArray = this.createForm.get('content') as FormArray;
    const contentGroup = contentArray.at(index) as FormGroup;
    contentGroup.patchValue({
      url: $event.secure_url,
      publicId: $event.public_id,
    });
  }

  valid(): boolean {
    return this.createForm.valid && this.getSelectedTags().length > 0 && !!this.imageUrl;
  }
  ssHtml: SafeHtml = '';
  onSubmit(): void {
    if (!this.valid()) return;
    this.saveBlog(false);
  }

  onSaveDraft(): void {
    if (!this.createForm.valid) return;
    this.saveBlog(true);
  }

  private saveBlog(isDraft: boolean): void {
    const mainImage = this.createForm.value.image as { url: string, publicId: string };
    var images: BlogImage[] = [{ link: mainImage.url, alt: this.createForm.value.title, position: -1, publicId: mainImage.publicId, id: '1', blogId: '1' }];
    images = [...images, ...this.createForm.value.content.filter((block: any) => block.type === 'image').map((img: any) => ({
      link: img.url,
      alt: img.altText || this.createForm.value.title,
      position: img.position,
      publicId: img.publicId,
      id: '1',
      blogId: '1'
    }))];
    const contentBlocks = this.createForm.value.content.filter((block: any) => block.type === 'text').map((block: any) => ({
      text: block.text,
      position: block.position,
    }));
    const rawDate = this.createForm.value.publishedDate;
    const blogData: CreateBlogDTO = {
      title: this.createForm.value.title,
      blogContent: contentBlocks,
      tags: this.getSelectedTags().map((tag) => tag.id),
      images: images,
      BlogView: [],
      introduction: this.createForm.value.introduction,
      publishedDate: rawDate ? new Date(rawDate) : undefined,
      draft: isDraft,
    };

    this.loading = true;

    const request = this.edit
      ? this.http.updateBlog(this.edit.id, blogData)
      : this.http.createBlog(blogData);

    request.subscribe({
      next: (response) => {
        console.log(this.edit ? 'Blog actualizado con éxito:' : 'Blog creado con éxito:', response);
        this.router.navigate(['/dashboard/blogs']);
        this.loading = false;
      },
      error: (err) => {
        this.errorService.addError(parseError(err));
        this.loading = false;
      }
    });
  }

  viewBlog(): void {
    const mainImage = this.createForm.value.image as { url: string, publicId: string };

    var images: BlogImage[] = [{ link: mainImage.url, alt: this.createForm.value.title, position: -1, publicId: mainImage.publicId, id: '1', blogId: '1' }];

    images = [...images, ...this.createForm.value.content.filter((block: any) => block.type === 'image').map((img: any) => ({
      link: img.url,
      alt: img.altText,
      position: img.position,
      publicId: img.publicId,
      id: img.id || Date.now().toString(),
      blogId: img.blogId || '1',
    }))];


    const contentBlocks = this.createForm.value.content.filter((block: any) => block.type === 'text').map((block: any) => ({
      text: block.text,
      position: block.position,
    }));

    this.currentBlog = {
      id: '1',
      introduction: this.createForm.value.introduction,
      title: this.createForm.value.title,
      tags: this.getSelectedTags().map((tag) => ({ tagId: tag.id, tag: tag, blogId: '1' })),
      images: images,
      createdAt: new Date(),
      updatedAt: new Date(),
      blogContent: contentBlocks,
      BlogView: [],
    };
  }

  onClosed() {
    this.currentBlog = undefined;
  }
}

enum ContentType {
  Text = 'text',
  Image = 'image'
}