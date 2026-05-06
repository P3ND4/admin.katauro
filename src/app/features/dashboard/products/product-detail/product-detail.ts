import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpService } from '../../../../shared/services/http/http.service';
import { Finish, Product } from '../../../../shared/models/product/Product';
import { Subscription } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { CustomCurrencyPipe } from '../../../../shared/pipes/myCurrencyPipe';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, CustomCurrencyPipe],
  providers: [CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // 👈 esto es lo que faltaba
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  encapsulation: ViewEncapsulation.None, // 👈 agrega esto
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
        setTimeout(() => {        // 👈 envuelve el detectChanges
          this.cdr.detectChanges();
        }, 0);
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
