import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-box',
  imports: [],
  templateUrl: './message-box.html',
  styleUrl: './message-box.css'
})
export class MessageBox {
  @Input() data: { msg: string, warn: string } | undefined
  @Output() acept = new EventEmitter<boolean>(false);

  onAction(action: boolean){
    this.acept.emit(action);
  }
}
