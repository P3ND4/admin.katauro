import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { httpService } from '../../../../shared/services/http/http.service';
import { Carousel } from '../../../../shared/models/promotions';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../../shared/components/box-loader/box-loader";
import { Corousel } from "../../../../shared/components/corousel/corousel";

@Component({
  selector: 'app-carousels',
  imports: [BoxLoader, Corousel],
  templateUrl: './carousels.html',
  styleUrl: './carousels.css'
})
export class Carousels implements OnInit {
  carousels: Carousel[] = [];
  loading = false;
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
