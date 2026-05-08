import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { httpService } from '../../../../shared/services/http/http.service';
import { ErrorLogService } from '../../../../shared/services/errors/error.log.service';
import { parseError } from '../../../../shared/services/errors/errorParser';
import { BoxLoader } from '../../../../shared/components/box-loader/box-loader';

@Component({
  selector: 'app-blog-stats-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, BoxLoader],
  templateUrl: './blog-stats-detail.html',
  styleUrl: './blog-stats-detail.css',
})
export class BlogStatsDetail implements OnInit {
  @Input({ required: true }) blogId!: string;
  @Output() closed = new EventEmitter<void>();

  analytics: any;
  loading = true;

  constructor(
    private http: httpService,
    private cdr: ChangeDetectorRef,
    private errorServ: ErrorLogService
  ) { }

  ngOnInit(): void {
    this.http.getBlogAnalytics(this.blogId).subscribe({
      next: val => {
        this.analytics = val;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorServ.addError(parseError(err));
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  formatTime(seconds: number): string {
    if (!seconds || seconds < 60) return `${seconds ?? 0}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}min ${s}s`;
  }

  getDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
}
