import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Banner, Promotion } from '../../../../shared/models/promotions';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-carousel',
  imports: [RouterLink],
  templateUrl: './edit-carousel.html',
  styleUrl: './edit-carousel.css'
})
export class EditCarousel implements OnInit {
  @Input() data: { name: string, banners: Banner[] } = { name: 'Principal', banners: [] };
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.data.banners);
  }

  onClose() {
    this.close.emit();
  }

  filterActivePromotions(promos: { promotion: Promotion }[]) {
    const now = new Date();
    let filters = promos.filter(x => new Date(x.promotion.endDate) > now && new Date(x.promotion.startDate) < now).map(x => x.promotion);
    return filters
  }
}
