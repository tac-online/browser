import {Directive, HostListener, Input} from '@angular/core';
import {DragDropService} from '../core/drag-drop.service';

@Directive({
  selector: '[tacDraggable]'
})
export class DraggableDirective {

  @Input() pred: boolean;

  @Input('tacDraggable')
  set item(item) {
    this._item = item;
  }
  get item() {
    return this._item;
  }
  private _item;

  constructor(private dragDropService: DragDropService) { }

  @HostListener('dragstart') onDragStart() {
    console.log(this.pred);
    if (this.pred) {
      this.dragDropService.startDrag(this.item);
    }
  }

  @HostListener('dragend') onDragEnd() {
    this.dragDropService.endDrag(this.item);
  }

}
