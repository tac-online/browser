import {Directive, ElementRef, Input} from '@angular/core';
import {Coordinates} from '../core/model.positions';
import {ScaleService} from '../core/scale.service';

@Directive({
  selector: '[tacPositioned]'
})
export class PositionedDirective {

  @Input() center: boolean;

  @Input('tacPositioned')
  set coordinates(coordinates: Coordinates) {
    this._coordinates = coordinates;
    this.updatePosition();
  }
  get coordinates(): Coordinates {
    return this._coordinates;
  }
  private _coordinates: Coordinates;

  constructor(private el: ElementRef, private scaleService: ScaleService) { }

  private updatePosition() {
    const element = this.el.nativeElement;
    const scale = this.scaleService.getScale();
    const radius = this.coordinates.radius * scale;
    const x = this.coordinates.x * scale;
    const y = this.coordinates.y * scale;
    if (!this.center) {
      element.style.top = (y - radius) + 'px';
      element.style.left = (x - radius) + 'px';
    } else {
      element.style.top = y + 'px';
      element.style.left = x + 'px';
    }
    const diameter = radius * 2;
    element.style.height = diameter + 'px';
    element.style.width = diameter + 'px';
    element.style.position = 'absolute';
    element.style.display = 'inline-block';
  }

}
