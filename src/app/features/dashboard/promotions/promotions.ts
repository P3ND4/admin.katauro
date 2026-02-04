import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { httpService } from '../../../shared/services/http/http.service';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";
import { Promotion } from '../../../shared/models/promotions';
import { Router, RouterLink } from '@angular/router';
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { Carousels } from "./carousels/carousels";
import { MessageBox } from "../../../shared/components/message-box/message-box";
import { PromotionInfo } from "./promotion-info/promotion-info";



@Component({
  selector: 'app-promotions',
  imports: [CommonModule, BoxLoader, RouterLink, Carousels, MessageBox, PromotionInfo],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css'
})
export class Promotions implements OnInit {
  filterMenu = false;
  proSection = true;
  promotions: Promotion[] = []

  info: Promotion | undefined;
  loading = false;
  constructor(private http: httpService, private cdr: ChangeDetectorRef, private router: Router, private errorServ: ErrorLogService) {
  }
  ngOnInit(): void {
    this.loading = true;
    this.http.getPromotions().subscribe({
      next: val => {
        this.promotions = val as Promotion[];
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
  warn: { msg: string, warn: string } | undefined;

  getDate(pDate: Date) {
    const date = new Date(pDate)
    return `${date.getDate()
      }/${date.getMonth() + 1}/${date.getFullYear()} `
  }
  onSearch() { }
  navigateEdit(id: string) {
    this.router.navigate(['/dashboard/create-promotion'], { queryParams: { edit: id } })
  }

  deletePromo(id: string) {
    this.loading = true
    this.http.deletePromo(id).subscribe({
      next: val => this.ngOnInit(),
      error: err => {
        this.errorServ.addError(parseError(err));
      }
    })
  }
  ask(id: string) {
    this.toDelete = id
    this.warn = { msg: 'Eliminar promoción', warn: '¿Estás seguro que deseas realizar esta acción? Esta acción no tiene vuelta atrás.' };
  }
  toDelete: string | undefined
  onDecide(result: boolean) {
    this.warn = undefined
    if (result && this.toDelete) this.deletePromo(this.toDelete);
    this.toDelete = undefined;
  }
}
