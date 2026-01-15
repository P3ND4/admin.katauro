import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorLogService } from './shared/services/errors/error.log.service';
import { ErrorBox } from "./shared/components/error-box/error-box";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorBox],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  globalErrors: { name: string, error: string }[] = [];
  constructor(private errorServ: ErrorLogService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.errorServ.errors.subscribe((val) => this.updateErrors(val));
  }
  protected readonly title = signal('admin.katauro');

  updateErrors(val: { name: string, error: string }[]) {
    this.globalErrors = val;
    this.cdr.detectChanges();
  }
}
