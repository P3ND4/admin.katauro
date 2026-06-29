import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Blog } from '../../../../shared/models';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blob-viewer',
  imports: [DatePipe],
  templateUrl: './blob-viewer.html',
  styleUrl: './blob-viewer.css',
})
export class BlobViewer implements OnInit {
  @Input({ required: true }) blog!: Blog;
  @Output() closed = new EventEmitter<void>();


  constructor(private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    console.log('Blog recibido en BlobViewer:', this.blog);

  }


  close() {
    this.closed.emit();
  }

  getContent() {

    const images: BlogContent[] = this.blog.images.length > 1 ? this.blog.images.slice(1).map((img) => ({
      content: `
      <div class="image-container">
        <div class="image"> 
          <img src="${img.link}" alt="${img.alt || 'blog image'}" class="blog-image"> 
        </div>
        <p class="image-alt">${img.alt || ''}</p>
      </div>`,
      position: img.position
    })) : [];
    console.log('Contenido de texto procesado:', this.blog.blogContent);
    const textContent: BlogContent[] = this.blog.blogContent.map((content) => ({
      content: content.text
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00A0/g, ' '),
      position: content.position
    }));



    const result = [...images, ...textContent].sort((a, b) => a.position - b.position); // Limitar a los primeros 5 elementos para la vista previa
    return result;
  }


  sanitizeContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}

interface BlogContent {
  position: number;
  content: string;
}