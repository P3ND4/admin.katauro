import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-drag-and-drop',
  imports: [],
  templateUrl: './drag-and-drop.html',
  styleUrl: './drag-and-drop.css'
})
export class DragAndDrop {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  progress = -1
  imagePreview: string = '';
  isHovering: boolean = false;
  @Output() uploaded = new EventEmitter<{ secure_url: string, public_id: string }>();

  constructor(private cloudy: CloudinaryService, private cdr: ChangeDetectorRef) { }



  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.upload(file);
    }
  }
  async onDrop(event: DragEvent, option?: number) {
    event.preventDefault();
    this.isHovering = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]

      this.upload(file);

      event.dataTransfer.clearData();
    }
  }
  onFilesSelected(event: Event) {
    this.fileInput.nativeElement.click();
  }
  upload(file: File) {
    this.progress = 0;
    this.cloudy.uploadFile(file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.progress = Math.round((event.loaded / event.total) * 100);
        this.cdr.detectChanges();
      } else if (event.type === HttpEventType.Response) {
        console.log('✅ Subida completa:', event.body);
        const body = event.body as { secure_url: string, public_id: string };
        const optimizedUrl = body.secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
        this.progress = 100;
        this.imagePreview = optimizedUrl
        this.uploaded.emit({ secure_url: optimizedUrl, public_id: body.public_id });
        setTimeout(() => {
          this.progress = 0;
          this.cdr.detectChanges();
        }, 3000);
        this.cdr.detectChanges();
      }
    });
  }
  onDragOver(event: DragEvent, option?: number) {
    event.preventDefault();
    this.isHovering = true;
  }
  onDragLeave(event: DragEvent) {
    this.isHovering = false;
  }


}
