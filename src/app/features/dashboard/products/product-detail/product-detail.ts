import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpService } from '../../../../shared/services/http/http.service';
import { Finish, Product } from '../../../../shared/models/Product';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  @Input({ required: true }) currentProduct!: Product;
  @Output() close = new EventEmitter<void>();
  queryParamsSubscription: Subscription | undefined;
  images: string[] = [];
  finishes: Finish[] = [];
  prodFinishes: Finish[] = [];
  currentVariant = 0;
  selectedImage = 0;
  loading = false;
  charged = false;



  constructor(private route: ActivatedRoute, private http: httpService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) {

  }
  ngOnInit(): void {
    this.chargeValues();
    this.images = this.currentProduct?.variants[this.currentVariant].images.map(x => x.link) ?? [];

  }
  chargeValues() {
    this.loadFinishes();
  }
  private loadFinishes() {
    this.http.getFinishes().subscribe({
      next: val => {
        this.finishes = val as Finish[];
        this.prodFinishes = this.finishes.filter(x => this.currentProduct!.finish.filter(y => y.finishId === x.id).length > 0) ?? [];
        this.charged = true;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
      }
    })
  }

  variantChange(i: number) {
    this.currentVariant = i
    this.images = this.currentProduct?.variants[this.currentVariant].images.map(x => x.link) ?? [];
    this.selectedImage = 0;
    this.cdr.detectChanges()
  }

  selectImage(i: number) {
    this.selectedImage = i;
    this.cdr.detectChanges();
  }
  onClose() {
    this.close.emit();
  }





}
