import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';
import { HttpEventType } from '@angular/common/http';
import { ErrorLogService } from '../../services/errors/error.log.service';
import { parseError } from '../../services/errors/errorParser';

@Component({
  selector: 'app-drag-and-drop',
  imports: [],
  templateUrl: './drag-and-drop.html',
  styleUrl: './drag-and-drop.css'
})
export class DragAndDrop {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() accept = 'image/*';
  @Input() label = 'SVG, PNG, JPG or GIF (max. 800x400px)';
  @Input() optimize = true;
  progress = -1
  imagePreview: string = '';
  isHovering: boolean = false;
  @Output() uploaded = new EventEmitter<{ secure_url: string, public_id: string }>();

  constructor(private cloudy: CloudinaryService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) { }



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
    this.cloudy.uploadFile(file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((event.loaded / event.total) * 100);
          this.cdr.detectChanges();
        } else if (event.type === HttpEventType.Response) {
          console.log('✅ Subida completa:', event.body);
          const body = event.body as { secure_url: string, public_id: string };
          const resultUrl = this.optimize
            ? body.secure_url.replace('/upload/', '/upload/q_auto,f_auto/')
            : body.secure_url;
          this.progress = 100;
          this.imagePreview = resultUrl;
          this.uploaded.emit({ secure_url: resultUrl, public_id: body.public_id });
          setTimeout(() => {
            this.progress = -1;
            this.cdr.detectChanges();
          }, 3000);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.progress = -1;
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
