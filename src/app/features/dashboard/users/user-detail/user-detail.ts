import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  getDate(date: string | Date): string {
    if (!date) return '---';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  getTotal(order: any): number {
    return (order.price || 0) + (order.delPrice || 0);
  }

  getOrderState(state: string): { text: string; color: string } {
    switch (state) {
      case 'Pendiente': return { text: 'Pendiente', color: '#F59E0B' };
      case 'Realizado': return { text: 'Realizado', color: '#10B981' };
      case 'Cancelado': return { text: 'Cancelado', color: '#EF4444' };
      default: return { text: state, color: '#6B7280' };
    }
  }
}
