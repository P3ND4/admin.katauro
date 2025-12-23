import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderState } from '../../../../shared/models/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this.order);
  }
  states = OrderState
  @Input() order: Order | undefined;
  @Output() close = new EventEmitter<boolean>(false);

  getDate() {
    const date = new Date(this.order?.createdAt?? "")
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  getDateByOrd(ord: Order) {
    const date = new Date(ord.createdAt ?? "")
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  onClose() {
    this.close.emit(true);
  }
}
