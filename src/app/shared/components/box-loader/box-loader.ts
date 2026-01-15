import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-loader',
  imports: [],
  templateUrl: './box-loader.html',
  styleUrl: './box-loader.css'
})
export class BoxLoader {
  @Input() message: string = "Cargando...";
}
