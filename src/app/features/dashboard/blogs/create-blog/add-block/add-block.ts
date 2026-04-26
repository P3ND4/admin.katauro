import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-block',
  imports: [],
  templateUrl: './add-block.html',
  styleUrl: './add-block.css',
})
export class AddBlock {

  @Output() blockAdded = new EventEmitter<string>();

  addBlock(type: string) {
    this.blockAdded.emit(type);
  }

}
