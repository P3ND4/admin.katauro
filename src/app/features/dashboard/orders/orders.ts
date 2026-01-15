import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { httpService } from '../../../shared/services/http/http.service';
import { Order, OrderState } from '../../../shared/models/Order';
import { CurrencyPipe, NgClass } from '@angular/common';
import { OrderDetails } from './order-details/order-details';
import { Subscription } from 'rxjs';
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, OrderDetails, NgClass, BoxLoader],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  filterMenu = false;
  stateParser = [OrderState.canceled, OrderState.completed, OrderState.pending]
  count = 0;
  orders: Order[] = [];
  orderOpen = true
  openOrder: Order | undefined;
  options: { search?: string, order?: number, state?: string } = {}
  @ViewChild('search') search!: ElementRef
  filters: string[] = []
  querySub: Subscription | undefined
  states = OrderState

  constructor(readonly router: Router, private route: ActivatedRoute, private http: httpService, private cdr: ChangeDetectorRef, private errorServ: ErrorLogService) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(x => this.loadQuerys());
  }

  loadQuerys() {
    this.filters = []

    const order = this.route.snapshot.queryParamMap.get('order');
    this.options.order = order == "1" ? 1 : order == "2" ? 2 : undefined;
    if (this.options.order) this.filters.push(this.options.order == 2 ? 'Más recientes' : 'Antiguos')

    const search = this.route.snapshot.queryParamMap.get('search');
    this.options.search = search ?? undefined
    if (this.options.search) this.filters.push(this.options.search)

    const state = this.route.snapshot.queryParamMap.get('state');
    this.options.state = state ?? undefined;
    if (state) {
      state.split('-').map(x => this.filters.push(this.stateParser[(x as any) as number]))
    }

    this.readData();
  }

  onDeleteFilter(filter: string) {
    if (['Realizado', 'Pendiente', 'Cancelado'].includes(filter)) {
      const states = this.options.state!.split('-').map(x => (x as any) as number);
      const toDelete = this.stateParser.indexOf(filter as OrderState);
      var resultString = '';
      for (let index = 0; index < states.length; index++) {
        if (states[index] == toDelete) continue;
        if (index != 0) resultString += resultString.length > 0 ? '-' : '';
        resultString += states[index];
      }
      this.options.state = resultString;
    }
    else if (['Más recientes', 'Antiguos'].includes(filter)) this.options.order = undefined
    else this.options.search = undefined

    this.router.navigate(['dashboard', 'orders'], {
      queryParams: this.options
    });

  }

  readData() {

    this.loading = true;
    this.http.getOrders(this.options).subscribe({
      next: val => {
        this.orders = val as Order[];
        console.log(this.orders)
        this.loading = false
        this.cdr.detectChanges()
      },
      error: err => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onOpenOrder(order: Order) {
    this.openOrder = order
    this.orderOpen = true
  }

  onStateFilter(state: string) {
    const states = this.options.state;

    if (states?.split('-').includes(this.stateParser.indexOf(state as OrderState).toString())) return;

    const params = {
      search: this.options.search,
      order: this.options.order,
      state: this.options.state ? this.options.state + `-${this.stateParser.indexOf(state as OrderState)}` : `${this.stateParser.indexOf(state as OrderState)}`
    }
    this.router.navigate(['dashboard', 'orders'], {
      queryParams: params
    });
  }

  onOrderBy(orderBy: number) {
    this.options.order = orderBy

    const params = {
      search: this.options.search,
      order: this.options.order,
      state: this.options.state
    }
    this.router.navigate(['dashboard', 'orders'], {
      queryParams: params
    });
  }
  loading = false;
  onSearch() {
    const search = this.search.nativeElement.value
    const params = {
      search: search,
      order: this.options.order,
      state: this.options.state
    }
    this.router.navigate(['dashboard', 'orders'], {
      queryParams: params
    });
  }

  getDate(ord: Order) {
    const date = new Date(ord.createdAt)
    return `${date.getDate()
      }/${date.getMonth() + 1}/${date.getFullYear()} `
  }
}
