import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category, Product, Typology } from '../../../shared/models/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { httpService } from '../../../shared/services/http/http.service';
import { MessageBox } from "../../../shared/components/message-box/message-box";
import { ProductDetail } from "./product-detail/product-detail";
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, CommonModule, MessageBox, ProductDetail, BoxLoader],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  count = 0;
  products: Product[] = [];

  pagesArray = [1];
  pages = 1;
  currentPage = 1;
  warn: { msg: string, warn: string } | undefined;
  toDelete: Product | undefined;
  readonly CatParser = [
    Category.footLumin,
    Category.lightBulb,
    Category.roofLumin,
    Category.tableLumin,
    Category.wallLumin
  ]
  @ViewChild('searchProd') search!: ElementRef

  CategoryFilter: Category[] = [];
  queryParamSubs: Subscription | undefined;
  filterMenu = false;
  details: Product | undefined = undefined
  params: { categories: undefined | string, search: undefined | string, page: undefined | number } = { categories: undefined, search: undefined, page: 1 };
  constructor(readonly router: Router, private route: ActivatedRoute, private http: httpService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) {



  }
  ngOnInit(): void {
    this.queryParamSubs = this.route.queryParamMap.subscribe(() => {
      this.ReadData();
    })
  }

  edit(id: string) {
    this.router.navigate(['/dashboard/create-product'], { queryParams: { id: id, edit: 'true' } });
  }
  loading = false;
  private ReadData() {
    this.loading = true;
    const cat = this.route.snapshot.queryParamMap.get('categories');
    this.params.categories = cat ?? undefined;
    const search = this.route.snapshot.queryParamMap.get('search');
    this.params.search = search ?? undefined;
    const page = this.route.snapshot.queryParamMap.get('page');
    this.params.page = page ? +page : 1;
    this.CategoryFilter = [];
    const catList = cat ? cat.split('-') : [];
    catList.map((x: string) => this.CategoryFilter.push(this.CatParser[+x < 5 && 0 <= +x ? +x : 1]))

    this.http.getPages({ categories: this.params.categories, search: this.params.search }).subscribe(
      {
        next: val => {
          this.pages = val as number
          this.getProducts();
        },
        error: err => {
          this.errorServ.addError(parseError(err));
          this.loading = false;
          this.cdr.detectChanges();
        }
      }
    )



  }
  getProducts() {
    this.http.getProducts(this.params).subscribe({
      next: val => {
        this.products = (val as Product[])//.filter(x => x.variants.length > 0);
        console.log(val);
        this.count = this.products.length
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.loading = false;
        this.errorServ.addError(parseError(err));
      }
    })
  }



  getStock(prod: Product): number {
    return prod.variants.reduce((acc, variant) => acc + variant.stock, 0);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.router.navigate([], { queryParams: this.params });
  }
  onAddFilter(filter: Category) {
    if (!this.CategoryFilter.includes(filter)) {
      this.CategoryFilter.push(filter);
      this.router.navigate([], { queryParams: { categories: this.CategoryFilter.map(x => this.CatParser.indexOf(x)).join('-') }, queryParamsHandling: 'merge' });
    }
  }

  onDeleteFilter(index: number) {
    this.CategoryFilter.splice(index, 1);
    this.router.navigate([], { queryParams: { categories: this.CategoryFilter.map(x => this.CatParser.indexOf(x)).join('-') }, queryParamsHandling: 'merge' });
  }

  delete(id: string) {
    this.http.deleteProduct(id).subscribe({
      next: val => {
        console.log(val);
        this.ReadData();
        this.cdr.detectChanges();
      },
      error: err => console.log(err)
    });
  }

  ask(product: Product) {
    this.toDelete = product
    this.warn = { msg: 'Eliminar producto', warn: '¿Estás seguro que deseas realizar esta acción? Esta acción no tiene vuelta atrás.' };
  }

  onDecide(result: boolean) {
    this.warn = undefined
    if (result && this.toDelete) this.delete(this.toDelete.id);
    this.toDelete = undefined;
  }

  onSearch() {
    const search = this.search.nativeElement.value
    this.params.search = search
    this.router.navigate([], {
      queryParams: this.params
    });
  }

}
