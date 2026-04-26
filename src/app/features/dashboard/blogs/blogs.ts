import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { httpService } from '../../../shared/services/http/http.service';
import { BoxLoader } from "../../../shared/components/box-loader/box-loader";
import { Blog } from '../../../shared/models/blog/blog.entity';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorLogService } from '../../../shared/services/errors/error.log.service';
import { parseError } from '../../../shared/services/errors/errorParser';
import { MessageBox } from "../../../shared/components/message-box/message-box";
import { BlobViewer } from "./blob-viewer/blob-viewer";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, BoxLoader, MessageBox, BlobViewer],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {
  filterMenu = false;
  blogs: Blog[] = [];
  
  count = 0;
  pagesArray = [1];
  pages = 1;
  currentPage = 1;
  
  loading = false;
  warn: { msg: string, warn: string } | undefined;
  toDelete: string | undefined;
  details: Blog | undefined = undefined;
  
  tags: any[] = [];
  selectedTags: string[] = [];
  sortBy: string = 'desc';
  
  @ViewChild('searchBlog') search!: ElementRef;
  
  queryParamSubs: Subscription | undefined;
  params: { tags: undefined | string, search: undefined | string, sortBy: undefined | string, page: undefined | number } = { 
    tags: undefined, 
    search: undefined, 
    sortBy: undefined,
    page: 1 
  };

  constructor(
    private http: httpService,
    private cdr: ChangeDetectorRef,
    readonly router: Router,
    private route: ActivatedRoute,
    private errorServ: ErrorLogService
  ) {}

  ngOnInit(): void {
    this.loadTags();
    this.queryParamSubs = this.route.queryParamMap.subscribe(() => {
      this.ReadData();
    });
  }

  private ReadData(): void {
    this.loading = true;
    const tags = this.route.snapshot.queryParamMap.get('tags');
    this.params.tags = tags ?? undefined;
    const search = this.route.snapshot.queryParamMap.get('search');
    this.params.search = search ?? undefined;
    const sortBy = this.route.snapshot.queryParamMap.get('sortBy');
    this.params.sortBy = sortBy ?? 'desc';
    this.sortBy = this.params.sortBy;
    const page = this.route.snapshot.queryParamMap.get('page');
    this.params.page = page ? +page : 1;
    this.currentPage = this.params.page;
    
    this.selectedTags = tags ? tags.split(',') : [];

    this.http.getBlogPages({ tags: this.params.tags, search: this.params.search }).subscribe(
      {
        next: val => {
          this.pages = val as number;
          this.pagesArray = Array(this.pages).fill(0).map((x, i) => i + 1);
          this.getBlogs();
        },
        error: err => {
          this.errorServ.addError(parseError(err));
          this.loading = false;
          this.cdr.detectChanges();
        }
      }
    );
  }

  private getBlogs(): void {
    this.http.getBlogs(this.params).subscribe({
      next: val => {
        this.blogs = (val as { blogs: Blog[] }).blogs;
        this.count = (val as { total: number }).total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.loading = false;
        this.errorServ.addError(parseError(err));
        this.cdr.detectChanges();
      }
    });
  }

  private loadTags(): void {
    this.http.getTags().subscribe({
      next: val => {
        this.tags = val as any[];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
      }
    });
  }

  getDate(pDate: Date): string {
    const date = new Date(pDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  onSearch(): void {
    const searchValue = this.search.nativeElement.value;
    this.params.search = searchValue || undefined;
    this.router.navigate([], {
      queryParams: this.params
    });
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    this.params.sortBy = sortValue;
    this.router.navigate([], {
      queryParams: this.params
    });
  }

  onAddTag(tagId: string): void {
    if (!this.selectedTags.includes(tagId)) {
      this.selectedTags.push(tagId);
      this.params.tags = this.selectedTags.join(',');
      this.router.navigate([], { queryParams: this.params });
    }
  }

  onDeleteTag(index: number): void {
    this.selectedTags.splice(index, 1);
    this.params.tags = this.selectedTags.length > 0 ? this.selectedTags.join(',') : undefined;
    this.router.navigate([], { queryParams: this.params });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.params.page = page;
    this.router.navigate([], { queryParams: this.params });
  }

  navigateCreate(): void {
    this.router.navigate(['/dashboard/create-blog']);
  }

  navigateEdit(id: string): void {
    this.router.navigate(['/dashboard/create-blog'], { queryParams: { edit: id } });
  }

  deleteBlog(id: string): void {
    this.loading = true;
    this.http.deleteBlog(id).subscribe({
      next: () => this.ReadData(),
      error: (err) => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  ask(id: string): void {
    this.toDelete = id;
    this.warn = {
      msg: 'Eliminar blog',
      warn: '¿Estás seguro que deseas realizar esta acción? Esta acción no tiene vuelta atrás.',
    };
  }

  onDecide(result: boolean): void {
    this.warn = undefined;
    if (result && this.toDelete) this.deleteBlog(this.toDelete);
    this.toDelete = undefined;
  }

  ngOnDestroy(): void {
    if (this.queryParamSubs) {
      this.queryParamSubs.unsubscribe();
    }
  }
}
