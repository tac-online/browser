import { Injectable } from '@angular/core';

@Injectable()
export class DragDropService {

  private item;

  constructor() { }

  public startDrag(item) {
    this.item = item;
  }

  public endDrag(item) {
    if (this.item === item) {
      this.item = null;
    }
  }

  public getItem() {
    return this.item;
  }
}
