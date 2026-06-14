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
import { BlogStatsDetail } from "./blog-stats-detail/blog-stats-detail";
import { Subscription } from 'rxjs';
import { NgApexchartsModule, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, BoxLoader, MessageBox, BlobViewer, BlogStatsDetail, NgApexchartsModule],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {
  activeTab: 'publicaciones' | 'estadisticas' = 'publicaciones';

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
    tags: undefined, search: undefined, sortBy: undefined, page: 1
  };

  statsOverview: any;
  statsTimeline: any;
  statsArticles: any[] = [];
  statsLoaded = false;
  chartSubTab: 'visitas' | 'lectores' | 'engagement' = 'visitas';
  chartOptions: any;
  statsLoading = false;
  statsDetailBlogId: string | undefined;

  constructor(
    private http: httpService,
    private cdr: ChangeDetectorRef,
    readonly router: Router,
    private route: ActivatedRoute,
    private errorServ: ErrorLogService
  ) { }

  ngOnInit(): void {
    this.loadTags();
    this.queryParamSubs = this.route.queryParamMap.subscribe(() => {
      this.ReadData();
    });
  }

  setTab(tab: 'publicaciones' | 'estadisticas'): void {
    this.activeTab = tab;
    if (tab === 'estadisticas') {
      this.loadStats();
    }
  }

  openStatsDetail(blogId: string): void {
    this.statsDetailBlogId = blogId;
  }

  closeStatsDetail(): void {
    this.statsDetailBlogId = undefined;
  }

  private loadStats(): void {
    if (this.statsLoaded) return;
    this.statsLoaded = true;
    this.statsLoading = true;

    let completed = 0;
    const checkDone = () => {
      completed++;
      if (completed >= 3) {
        this.statsLoading = false;
        this.cdr.detectChanges();
      }
    };

    this.http.getBlogStatsOverview().subscribe({
      next: val => {
        this.statsOverview = val;
        checkDone();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
        checkDone();
      }
    });

    this.http.getBlogStatsTimeline(12).subscribe({
      next: val => {
        this.statsTimeline = val;
        this.buildChart();
        checkDone();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
        checkDone();
      }
    });

    this.http.getBlogStatsArticles().subscribe({
      next: val => {
        this.statsArticles = val as any[];
        checkDone();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
        checkDone();
      }
    });
  }

  setChartSubTab(sub: 'visitas' | 'lectores' | 'engagement'): void {
    this.chartSubTab = sub;
    this.buildChart();
  }

  private buildChart(): void {
    if (!this.statsTimeline) return;
    const t = this.statsTimeline;
    let seriesName = '';
    let data: number[] = [];
    let color = '';

    switch (this.chartSubTab) {
      case 'visitas':
        seriesName = 'Visitas';
        data = t.visits ?? [];
        color = '#007981';
        break;
      case 'lectores':
        seriesName = 'Lectores';
        data = t.readers ?? [];
        color = '#178C94';
        break;
      case 'engagement':
        seriesName = 'Engagement %';
        data = t.engagement ?? [];
        color = '#F5A623';
        break;
    }

    this.chartOptions = {
      series: [{ name: seriesName, data }],
      chart: { type: 'line' as ChartType, height: 280, toolbar: { show: false }, fontFamily: 'var(--montser-font, Montserrat)' },
      colors: [color],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4 },
      grid: { borderColor: '#E9EAEB', strokeDashArray: 4 },
      xaxis: { categories: t.labels ?? [], labels: { style: { colors: '#535862', fontSize: '12px' } } },
      yaxis: { labels: { style: { colors: '#535862', fontSize: '12px' } } },
      tooltip: { theme: 'light' },
    };
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

    this.http.getBlogPages({ tags: this.params.tags, search: this.params.search }).subscribe({
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
    });
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

  getStatus(blog: Blog): { text: string; color: string } {
    if (blog.draft) {
      return { text: 'Borrador', color: '#F59E0B' };
    }
    if (blog.publishedDate) {
      const pub = new Date(blog.publishedDate);
      const now = new Date();
      pub.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (pub > now) {
        return { text: 'Programado', color: '#3B82F6' };
      }
    }
    return { text: 'Publicado', color: '#10B981' };
  }

  getDisplayDate(blog: Blog): string {
    if (blog.publishedDate) {
      return this.getDate(blog.publishedDate);
    }
    return this.getDate(blog.createdAt);
  }

  formatTime(seconds: number): string {
    if (!seconds || seconds < 60) return `${seconds ?? 0}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}min ${s}s`;
  }

  onSearch(): void {
    const searchValue = this.search.nativeElement.value;
    this.params.search = searchValue || undefined;
    this.router.navigate([], { queryParams: this.params });
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    this.params.sortBy = sortValue;
    this.router.navigate([], { queryParams: this.params });
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
