import { Component, Input } from '@angular/core';
import { Promotion } from '../../../../shared/models/promotions';

@Component({
  selector: 'app-promotion-info',
  imports: [],
  templateUrl: './promotion-info.html',
  styleUrl: './promotion-info.css'
})
export class PromotionInfo {
  @Input({ required: true }) promotion!: Promotion


  convertToDate(date: Date) {
    date = new Date(date);
    let year = date.getFullYear().toString();
    let month = ((date.getMonth() + 1) + 100).toString().slice(1);
    let day = (date.getDate() + 100).toString().slice(1);

    return year + '-' + month + '-' + day;
  }
}
