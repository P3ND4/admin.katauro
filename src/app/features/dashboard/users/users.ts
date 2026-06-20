import { ChangeDetectorRef, Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpService } from '../../../shared/services/http/http.service';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";
import { MessageBox } from "../../../shared/components/message-box/message-box";
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { UserDetail } from './user-detail/user-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule, BoxLoader, MessageBox, UserDetail],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, OnDestroy {
  users: any[] = [];
  loading = false;
  showUserDetail = false;
  selectedUser: any = null;
  warn: { msg: string, warn: string } | undefined;
  toDelete: string | undefined;

  params: { search?: string, order?: string, page?: number } = { page: 1 };
  filters: string[] = [];
  filterMenu = false;
  @ViewChild('searchUser') search!: ElementRef;
  querySub: Subscription | undefined;
  pages = 0;
  pagesArray: number[] = [];
  currentPage = 1;

  constructor(
    private http: httpService,
    private cdr: ChangeDetectorRef,
    private errorServ: ErrorLogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap.subscribe(() => this.loadQuerys());
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }

  loadQuerys(): void {
    this.filters = [];

    const search = this.route.snapshot.queryParamMap.get('search');
    this.params.search = search ?? undefined;
    if (this.params.search) this.filters.push(this.params.search);

    const order = this.route.snapshot.queryParamMap.get('order');
    this.params.order = order ?? undefined;
    if (this.params.order === 'desc') this.filters.push('Más recientes');
    else if (this.params.order === 'asc') this.filters.push('Antiguos');

    const pageStr = this.route.snapshot.queryParamMap.get('page');
    this.params.page = pageStr ? +pageStr : 1;
    this.currentPage = this.params.page;

    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.http.getUsers(this.params).subscribe({
      next: (val: any) => {
        this.users = val.users as any[];
        this.pages = val.pages || 0;
        this.pagesArray = Array(this.pages).fill(0).map((x, i) => i + 1);
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

  onSearch(): void {
    const searchValue = this.search.nativeElement.value;
    this.params.search = searchValue || undefined;
    this.params.page = 1;
    this.router.navigate([], { queryParams: this.params });
  }

  onOrderBy(order: 'asc' | 'desc'): void {
    this.params.order = this.params.order === order ? undefined : order;
    this.params.page = 1;
    this.router.navigate([], { queryParams: this.params });
  }

  onDeleteFilter(filter: string): void {
    if (filter === 'Más recientes' || filter === 'Antiguos') this.params.order = undefined;
    else this.params.search = undefined;
    this.params.page = 1;
    this.router.navigate([], { queryParams: this.params });
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.router.navigate([], { queryParams: this.params });
  }

  getOrderCount(user: any): number {
    return user.orders?.length || 0;
  }

  getTotalSpent(user: any): number {
    if (!user.orders || user.orders.length === 0) return 0;
    return user.orders.reduce((total: number, order: any) => {
      return total + (order.price || 0) + (order.delPrice || 0);
    }, 0);
  }

  onView(user: any): void {
    this.selectedUser = user;
    this.showUserDetail = true;
  }

  onCloseDetail(): void {
    this.showUserDetail = false;
    this.selectedUser = null;
  }

  ask(id: string): void {
    this.toDelete = id;
    this.warn = {
      msg: 'Eliminar cliente',
      warn: '¿Estás seguro que deseas eliminar este cliente? Esta acción no tiene vuelta atrás.',
    };
  }

  onDecide(result: boolean): void {
    this.warn = undefined;
    if (result && this.toDelete) this.deleteUser(this.toDelete);
    this.toDelete = undefined;
  }

  deleteUser(id: string): void {
    this.loading = true;
    this.http.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCount(): number {
    return this.users.length;
  }
}
