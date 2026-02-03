import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BoxLoader } from "../../../../shared/components/box-loader/box-loader";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, Variant } from '../../../../shared/models/Product';
import { httpService } from '../../../../shared/services/http/http.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { Banner, CreateBannerDto, Promotion } from '../../../../shared/models/promotions';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DragAndDrop } from "../../../../shared/components/drag-and-drop/drag-and-drop";

@Component({
  selector: 'app-edit-banner',
  imports: [BoxLoader, ReactiveFormsModule, DragAndDrop, RouterLink],
  templateUrl: './edit-banner.html',
  styleUrl: './edit-banner.css'
})
export class EditBanner implements OnInit {
  loadProd = true;
  loadingBanner = true;
  openProdOption = false
  editForm: FormGroup;
  currentBanner: Banner | undefined;
  filteredProd: Product[] = []
  selectedVariant: Variant | undefined;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private http: httpService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) {
    this.editForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      search: [''],
      image: ['', Validators.required],
      prodID: ['', Validators.required],
      publicID: ['', Validators.required]
    })
  }
  products: Product[] = [];
  id: number | undefined = undefined
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id ? +id : undefined;


    this.editForm.get('search')?.valueChanges.subscribe(x => {
      this.filteredProd = this.products.filter(prod => this.match(prod.name, x));
    });
    this.loadData();
  }

  onSubmit() {
    if (this.valid() && this.currentBanner) {
      this.loadingBanner = true;

      const dto: CreateBannerDto = {
        name: this.editForm.get('name')?.value,
        description: this.editForm.get('description')?.value,
        prodId: this.editForm.get('prodID')?.value,
        image: this.editForm.get('image')?.value,
        carouselId: this.currentBanner.carouselId,
        publicId: this.editForm.get('publicID')?.value
      }

      this.http.updateBanner(dto, this.currentBanner.id).subscribe(
        {
          next: val => {
            this.loadingBanner = false
            this.router.navigate(['/dashboard/promotions']);
          },
          error: err => this.errorServ.addError(parseError(err))
        }
      );
    }
  }
  slelectProd(variant: Variant) {
    this.selectedVariant = variant;
    this.editForm.get('prodID')?.setValue(variant.id);
    this.openProdOption = !this.openProdOption;
  }

  onUploaded(imageUrl: any) {
    let image = imageUrl as { secure_url: string, public_id: string }
    this.editForm.get('image')?.setValue(image.secure_url);
    this.editForm.get('publicID')?.setValue(image.public_id);
    console.log(image);
  }

  onOpenSelProd() {
    this.openProdOption = !this.openProdOption
  }
  loadData() {
    this.loadProd = true

    this.loadBanner()

    this.http.getProducts().subscribe({
      next: (val) => {
        this.products = val as Product[];
        this.filteredProd = this.products;
        this.loadProd = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loadProd = false
        this.cdr.detectChanges();
        this.errorServ.addError(parseError(err));
      }
    })
  }

  loadBanner() {
    if (this.id) {
      this.loadingBanner = true
      this.http.getBanner(this.id).subscribe({
        next: val => {
          this.currentBanner = val as Banner;
          console.log(val)
          this.editForm.setValue({
            name: this.currentBanner.name,
            description: this.currentBanner.description,
            image: this.currentBanner.image,
            prodID: this.currentBanner.prodId,
            search: '',
            publicID: this.currentBanner.publicId
          })

          this.selectedVariant = this.currentBanner.product;
          this.loadingBanner = false;
          this.cdr.detectChanges();
        },
        error: err => {
          this.errorServ.addError(parseError(err));
          this.loadingBanner = false;
        }
      })
    }
  }


  valid() {
    return this.editForm.valid;
  }
  match(x: string, y: string) {
    x = x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    y = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    return x.match(y);
  }

  calculateDiscount(prod: Variant) {
    const percentD = prod.promotions.filter(x => x.promotion.discountType == 'percent');

    const discount = this.filterActivePromotions(percentD).map(x => x.discount);

    return discount.reduce((count, current) => count + current, 0);
  }

  filterActivePromotions(promos: { promotion: Promotion }[]) {
    const now = new Date();
    let filters = promos.filter(x => new Date(x.promotion.endDate) > now && new Date(x.promotion.startDate) < now).map(x => x.promotion);
    return filters
  }

  loading = () => this.loadingBanner || this.loadProd;
}

