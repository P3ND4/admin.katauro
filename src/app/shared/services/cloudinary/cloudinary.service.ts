import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  public progress = -1;
  cloudName = ''
  url ='https://api.katauro.com/cloudinary/';
  constructor(private http: HttpClient) {
    //this.url = 'http://localhost:3000/cloudinary/';
    this.http.get(`${this.url}signature`).subscribe(
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
