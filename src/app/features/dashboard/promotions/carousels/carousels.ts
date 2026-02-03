import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { httpService } from '../../../../shared/services/http/http.service';
import { Banner, Carousel } from '../../../../shared/models/promotions';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../../shared/components/box-loader/box-loader";
import { Corousel } from "../../../../shared/components/corousel/corousel";
import { CommonModule } from '@angular/common';
import { EditCarousel } from "../edit-carousel/edit-carousel";


@Component({
  selector: 'app-carousels',
  imports: [BoxLoader, Corousel, CommonModule, EditCarousel],
  templateUrl: './carousels.html',
  styleUrl: './carousels.css'
})
export class Carousels implements OnInit {
  carousels: Carousel[] = [];
  loading = false;
  selected: { [name: string]: number } = { 'primary': 0, 'secundary': 0 };
  names: { [name: string]: string } = { 'primary': 'Carrusel principal', 'secundary': 'Carrusel secundario' };
  edit: { banners: Banner[], name: string } | undefined = undefined;
  constructor(private http: httpService, private errorServ: ErrorLogService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.loading = true;
    this.http.getCarousels().subscribe({
      next: val => {
        this.carousels = val as Carousel[];
        this.loading = false;
        this.cdr.detectChanges();

      },
      error: err => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    })
  }


}
