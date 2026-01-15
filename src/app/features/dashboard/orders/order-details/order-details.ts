import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderState } from '../../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { httpService } from '../../../../shared/services/http/http.service';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../../shared/components/box-loader/box-loader";

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, BoxLoader],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this.order);
  }
  isDropdownOpen = false;
  states = OrderState
  @Input() order: Order | undefined;
  @Output() close = new EventEmitter<boolean>(false);

  constructor(private http: httpService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) { }

  getDate() {
    const date = new Date(this.order?.createdAt ?? "")
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  getDateByOrd(ord: Order) {
    const date = new Date(ord.createdAt ?? "")
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  onClose() {
    this.close.emit(true);
  }
  loading = false;
  changeState(state: string) {
    this.loading = true;
    this.http.updateOrder(this.order?.id ?? '', { state: state as OrderState }).subscribe({
      next: (res) => {
        console.log(res);
        if (this.order) {
          this.order.state = state as OrderState;
        }
        this.isDropdownOpen = false;
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
}
