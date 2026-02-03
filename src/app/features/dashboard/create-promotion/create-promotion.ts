import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fechaRealValidator } from '../../../shared/validators/DateValidator';
import { httpService } from '../../../shared/services/http/http.service';
import { CatModel, Product, Variant } from '../../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePromotionDto, Promotion, PromoType } from '../../../shared/models/promotions';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';

@Component({
  selector: 'app-create-promotion',
  imports: [ReactiveFormsModule, CommonModule, BoxLoader],
  templateUrl: './create-promotion.html',
  styleUrl: './create-promotion.css'
})
export class CreatePromotion implements AfterViewInit, OnInit {
  createForm: FormGroup;
  @ViewChild('endDateInput') endDateInput: any;
  @ViewChild('startDateInput') startDateInput: any;
  loading = false;
  general = false;
  openTypeOption = false;
  openCatOption = false;
  openProdOption = false;
  products: Product[] = [];
  categories: CatModel[] = [];
  selectedCat: { [id: string]: CatModel } = {};
  selectedVariants: { [id: string]: Variant } = {}
  filteredProd: Product[] = []

  edit: Promotion | undefined;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: httpService,
    private router: Router, private route: ActivatedRoute, private errorServ: ErrorLogService) {
    this.createForm = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      discount: [0, [Validators.required, Validators.min(0.01)]],
      startDate: ['', [Validators.required, fechaRealValidator]],
      endDate: ['', [Validators.required, fechaRealValidator]],
      search: ['']
    })
  }


  ngOnInit(): void {
    this.createForm.get('search')?.valueChanges.subscribe(x => {
      this.filteredProd = this.products.filter(prod => this.match(prod.name, x));
    });
    this.loadData();

    let id = this.route.snapshot.queryParamMap.get('edit');

    if (id) {
      this.loadPromo(id);
    }

  }


  loadPromo(id: string) {
    this.http.getPromotion(id).subscribe({
      next: val => {
        this.edit = val as Promotion;
        let startDate = new Date(this.edit.startDate)
        let endDate = new Date(this.edit.endDate)
        this.createForm.setValue({
          name: this.edit.name,
          description: '',
          discount: this.edit.discount,
          startDate: startDate.getFullYear() + '-' + startDate.getMonth().toString() + '-' + startDate.getDay().toString(),
          endDate: endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDay(),
          search: ['']
        })
        console.log(val)
        this.edit.products.map(x => this.selectedVariants[x.productId] = x.product);
        this.edit.categories.map(x => this.selectedCat[x.categoryId] = x.category)
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
      }
    })
  }


  ngAfterViewInit(): void {

    this.endDateInput.nativeElement.addEventListener('change', (event: any) => {
      this.createForm.get('endDate')?.setValue(event.target.value.toString());

    });
    this.startDateInput.nativeElement.addEventListener('change', (event: any) => {
      this.createForm.get('startDate')?.setValue(event.target.value.toString());
    });
  }


  loadData() {
    this.loading = true
    this.http.getCategories().subscribe({
      next: (val) => {
        this.categories = val as CatModel[];
        this.loadProd();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.errorServ.addError(parseError(err));
      }
    })
  }

  loadProd() {
    this.http.getProducts().subscribe({
      next: (val) => {
        this.products = val as Product[];
        this.filteredProd = this.products;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false
        this.cdr.detectChanges();
        this.errorServ.addError(parseError(err));
      }
    })
  }



  pickDate(field: 'startDate' | 'endDate') {
    if (field === 'startDate') {
      this.startDateInput.nativeElement.showPicker();
    } else {
      this.endDateInput.nativeElement.showPicker();
    }
  }

  increment(n: number) {
    const current = this.createForm.value.discount + n;
    if (current < 0) return;
    this.createForm.get('discount')?.setValue(current);
  }

  onSubmit() {
    if (this.valid()) {

      const data: CreatePromotionDto = {
        startDate: new Date(this.createForm.get('startDate')?.value),
        endDate: new Date(this.createForm.get('endDate')?.value),
        name: this.createForm.value.name,
        discountType: 'percent',
        Type: this.general ? PromoType.general : PromoType.prodCat,
        categories: this.getCategories().map(x => x.id),
        products: this.getVariants().map(x => x.id),
        discount: this.createForm.value.discount
      }

      console.log(data.startDate);
      console.log(this.createForm.get('date')?.value);

      this.loading = true
      this.http.createPromo(data).subscribe({
        next: val => {
          this.loading = false;
          this.router.navigate(['dashboard/promotions']);
        },
        error: err => {
          this.loading = false;
          this.errorServ.addError(parseError(err));
        }
      })

    }
  }

  onSearch() {

  }


  slelectProd(prod: Variant) {
    this.selectedVariants[prod.id] = prod;
  }



  getVariants() {
    return Object.values(this.selectedVariants);
  }
  getCategories() {
    return Object.values(this.selectedCat);
  }


  removeSelected(id: string) {
    delete this.selectedVariants[id];
  }

  valid() {
    return this.createForm.valid && (this.getVariants().length > 0 || [].length > 0)
  }

  onSelectCat(cat: CatModel) {
    this.selectedCat[cat.id] = cat;
    this.products.forEach(x => {
      if (x.category.id = cat.id) {
        x.variants.forEach(variant => this.selectedVariants[variant.id] = variant);
      }
    });
  }

  onRemoveCat(cat: CatModel) {
    delete this.selectedCat[cat.id];
    this.getVariants().forEach(x => {
      if (x.genericProd!.category.id = cat.id) {
        delete this.selectedVariants[x.id]
        this.cdr.detectChanges();
      }

    })
  }

  onChangePromotionType(general: boolean) {
    this.general = general;
    this.selectedCat = {};
    this.selectedVariants = {};
    if (general) this.products.forEach(x => x.variants.forEach(y => this.selectedVariants[y.id] = y));

  }

  onOpenSelProd() {
    this.openProdOption = !this.openProdOption
  }
  onSearhValue(nuevoValor: string) {
    console.log('Valor cambiado:', nuevoValor);
  }

  match(x: string, y: string) {
    x = x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    y = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    return x.match(y);
  }
}
