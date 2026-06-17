import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { httpService } from '../../../../shared/services/http/http.service';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';

@Component({
  selector: 'app-create-delivery-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-delivery-modal.html',
  styleUrl: './create-delivery-modal.css'
})
export class CreateDeliveryModal implements OnInit {
  @Input() deliveryPrice: any = null;
  @Output() created = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  createForm: FormGroup;
  isActive = true;

  constructor(
    private fb: FormBuilder,
    private http: httpService,
    private cdr: ChangeDetectorRef,
    private errorServ: ErrorLogService
  ) {
    this.createForm = this.fb.group({
      province: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.deliveryPrice) {
      this.createForm.patchValue({
        province: this.deliveryPrice.province,
        municipality: this.deliveryPrice.municipality,
        price: this.deliveryPrice.price,
      });
      this.isActive = this.deliveryPrice.active;
    }
  }

  onSubmit(): void {
    if (!this.createForm.valid) return;

    const data = {
      province: this.createForm.value.province,
      municipality: this.createForm.value.municipality,
      price: this.createForm.value.price,
      active: this.isActive,
    };

    const request = this.deliveryPrice
      ? this.http.updateDeliveryPrice(this.deliveryPrice.id, data)
      : this.http.createDeliveryPrice(data);

    request.subscribe({
      next: () => {
        this.createForm.reset();
        this.created.emit();
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
      }
    });
  }

  onCancel(): void {
    this.createForm.reset();
    this.closed.emit();
  }
}
