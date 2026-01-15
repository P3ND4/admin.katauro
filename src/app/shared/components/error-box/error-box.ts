import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-box',
  imports: [CommonModule],
  templateUrl: './error-box.html',
  styleUrl: './error-box.css',
})
export class ErrorBox implements OnDestroy, OnInit {
  @Input() errorTitle: string = 'Error';
  @Input() errorMessage: string = 'An unexpected error occurred.';
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    this.exitAnim = true;
  }
  exitAnim: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.exitAnim = false;
      this.cdr.detectChanges();
    }, 8500);
  }

}
