import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpService } from '../../../shared/services/http/http.service';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";
import { MessageBox } from "../../../shared/components/message-box/message-box";
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { CreateDeliveryModal } from './create-delivery-modal/create-delivery-modal';

@Component({
  selector: 'app-deliveries',
  imports: [CommonModule, BoxLoader, MessageBox, CreateDeliveryModal],
  templateUrl: './deliveries.html',
  styleUrl: './deliveries.css',
})
export class Deliveries implements OnInit {
  deliveryPrices: any[] = [];
  loading = false;
  showCreateModal = false;
  editDeliveryPrice: any = null;
  warn: { msg: string, warn: string } | undefined;
  toDelete: string | undefined;

  constructor(
    private http: httpService,
    private cdr: ChangeDetectorRef,
    private errorServ: ErrorLogService
  ) { }

  ngOnInit(): void {
    this.loadDeliveryPrices();
  }

  loadDeliveryPrices(): void {
    this.loading = true;
    this.http.getDeliveryPrices().subscribe({
      next: (val) => {
        this.deliveryPrices = val as any[];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onCreate(): void {
    this.editDeliveryPrice = null;
    this.showCreateModal = true;
  }

  onEdit(dp: any): void {
    this.editDeliveryPrice = dp;
    this.showCreateModal = true;
  }

  onModalClosed(): void {
    this.showCreateModal = false;
    this.editDeliveryPrice = null;
  }

  onDeliveryPriceCreated(): void {
    this.showCreateModal = false;
    this.editDeliveryPrice = null;
    this.loadDeliveryPrices();
  }

  ask(id: string): void {
    this.toDelete = id;
    this.warn = {
      msg: 'Eliminar precio de delivery',
      warn: '¿Estás seguro que deseas eliminar este precio de delivery? Esta acción no tiene vuelta atrás.',
    };
  }

  onDecide(result: boolean): void {
    this.warn = undefined;
    if (result && this.toDelete) this.deleteDeliveryPrice(this.toDelete);
    this.toDelete = undefined;
  }

  deleteDeliveryPrice(id: string): void {
    this.loading = true;
    this.http.deleteDeliveryPrice(id).subscribe({
      next: () => {
        this.loadDeliveryPrices()
        this.loading = false;
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleActive(dp: any): void {
    this.loading = true;
    this.http.updateDeliveryPrice(dp.id, { active: !dp.active }).subscribe({
      next: () => {
        this.loadDeliveryPrices();
        this.loading = false;
      },
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.cdr.detectChanges();
      }
    });
  }

  getCount(): number {
    return this.deliveryPrices.length;
  }
}
