import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  public progress = -1;
  cloudName = ''

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/cloudinary/signature').subscribe(
      {next: (val) => this.cloudName = (val as {cloud_name: string}).cloud_name}
    );

    // 2️⃣ Prepara el FormData para Cloudinary

  }

  uploadFile(file: File) {
    // 1️⃣ Pide la firma al backend

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'luminarias');
    //formData.append('upload_preset', 'unsigned_preset'); // opcional si lo usas


    // 3️⃣ Subida directa a Cloudinary
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
