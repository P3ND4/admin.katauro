import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Promotion } from '../../../../shared/models/promotions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion-info',
  imports: [],
  templateUrl: './promotion-info.html',
  styleUrl: './promotion-info.css'
})
export class PromotionInfo {
  @Input({ required: true }) promotion!: Promotion;
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) { }
  convertToDate(date: Date) {
    date = new Date(date);
    let year = date.getFullYear().toString();
    let month = ((date.getMonth() + 1) + 100).toString().slice(1);
    let day = (date.getDate() + 100).toString().slice(1);

    return year + '-' + month + '-' + day;
  }

  onClose() {
    this.close.emit()
  }

  navigateToEdit() {
    this.router.navigate([`/dashboard/create-promotion`], { queryParams: { edit: this.promotion.promo_id } });
  }
}
