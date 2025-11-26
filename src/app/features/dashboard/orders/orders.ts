import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from '../../../shared/services/http/http.service';
import { Order } from '../../../shared/models/Order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  filterMenu = false;
  count = 0;
  orders: Order[]= [];

  constructor(readonly router: Router, private http: httpService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.readData();
  }

  readData(){
    this.http.getOrders().subscribe({
      next: val => {
        this.orders = val as Order[];
        console.log(this.orders)
        this.cdr.detectChanges()
      },
      error: err => {
        console.log(err)
      }
    });
  }

  getDate(ord: Order){
    const date = new Date(ord.createdAt)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}
