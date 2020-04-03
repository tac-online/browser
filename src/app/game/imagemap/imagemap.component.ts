import {
  Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild
} from '@angular/core';

import {
  TRACK,
  HOMES,
  FieldPosition,
  HomePosition,
  BasePosition,
  BASES,
  Coordinates,
  MarblePosition,
  MARBLERADIUS
} from '../../core/model.positions';
import {Board, Field, FieldID, Position} from '../../core/model.game';
import {Card} from '../../core/model.card';

@Component({
  selector: 'img-map',
  templateUrl: './imagemap.component.html',
  styleUrls: ['./imagemap.component.css']
})
export class ImagemapComponent {

  constructor(private renderer: Renderer2) {}

  /**
   * Canvas element.
   */
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef;

  /**
   * Container element.
   */
  @ViewChild('container', { static: true })
  private container: ElementRef;

  /**
   * Image element.
   */
  @ViewChild('image', { static: true })
  private image: ElementRef;

  @Input() public currentCard: Card;
  @Input('board')
  set board(board: Board) {
    this._board = board;
    this.findMarbles();
    this.draw(false);
  }
  get board(): Board {
    return this._board;
  }
  private _board: Board;

  @Input('specialMarbles')
  set specialMarbles(specialMarbles: [FieldID, boolean][]) {
    this._specialMarbles = [];
    for (const specialMarble of specialMarbles) {
      if (specialMarble[0].homeField) {
        this.homes.filter(home => home.id === specialMarble[0].number && home.player === specialMarble[0].player).forEach(home => this._specialMarbles.push(new MarblePosition(home.player, home.x, home.y, specialMarble[1])));
      } else {
        this.track.filter(field => field.id === specialMarble[0].number).forEach(field => this._specialMarbles.push(new MarblePosition(specialMarble[0].player, field.x, field.y, specialMarble[1])));
      }
    }
    this.draw(false);
  }
  private _specialMarbles: MarblePosition[] = [];

  public highlights: Coordinates[] = [];

  @Output() public clickField = new EventEmitter<{field: Field, coords: Coordinates}>();
  @Output() public clickMarble = new EventEmitter<{marble: Position, coords: Coordinates}>();

  private track: FieldPosition[];
  private homes: HomePosition[];
  private bases: BasePosition[];

  private hoverMarker: Coordinates = null;
  private marbles: MarblePosition[] = [];

  private static scaleToSize<T extends Coordinates>(coord: T, image: HTMLImageElement): T {
    const copy = Object.assign({}, coord);
    copy.x = (coord.x / 984) * image.clientWidth;
    copy.y = (coord.y / 984) * image.clientHeight;
    return copy;
  }

  /**
   * Check if a position is inside a marker.
   */
  private static insideMarker(position: Coordinates, coordinate: number[]): boolean {
    return Math.sqrt(
      (coordinate[0] - position.x) * (coordinate[0] - position.x)
      + (coordinate[1] - position.y) * (coordinate[1] - position.y)
    ) < position.radius;
  }

  public findMarbles() {
    this.marbles = [];
    if (!this.track || !this.bases || !this.homes) {
      this.init();
    }
    this._board.track.filter(field => field.occupier).forEach(field => this.track.filter(position => position.id === field.number).forEach(position => this.marbles.push(new MarblePosition(field.occupier.owner, position.x, position.y, field.occupier.transparent))));
    this._board.bases.filter(base => base.occupiers.length >= 0).forEach(base => this.bases.filter(position => position.player === base.player).forEach(position => {
      if (base.occupiers.length === 1) {
        this.marbles.push(new MarblePosition(base.player, position.x, position.y, false));
      } else if (base.occupiers.length === 2) {
        this.marbles.push(new MarblePosition(base.player, position.x - MARBLERADIUS, position.y, false));
        this.marbles.push(new MarblePosition(base.player, position.x + MARBLERADIUS, position.y, false));
      } else if (base.occupiers.length === 3) {
        this.marbles.push(new MarblePosition(base.player, position.x - MARBLERADIUS, position.y - MARBLERADIUS * 0.7, false));
        this.marbles.push(new MarblePosition(base.player, position.x + MARBLERADIUS, position.y - MARBLERADIUS * 0.7, false));
        this.marbles.push(new MarblePosition(base.player, position.x, position.y + MARBLERADIUS, false));
      } else if (base.occupiers.length === 4) {
        this.marbles.push(new MarblePosition(base.player, position.x - MARBLERADIUS, position.y - MARBLERADIUS, false));
        this.marbles.push(new MarblePosition(base.player, position.x + MARBLERADIUS, position.y - MARBLERADIUS, false));
        this.marbles.push(new MarblePosition(base.player, position.x - MARBLERADIUS, position.y + MARBLERADIUS, false));
        this.marbles.push(new MarblePosition(base.player, position.x + MARBLERADIUS, position.y + MARBLERADIUS, false));
      }
    }));
    this._board.homes.forEach(homes => homes.filter(home => home.occupier).forEach(home => this.homes.filter(position => position.player === home.player && position.id === home.number).forEach(position => this.marbles.push(new MarblePosition(home.player, position.x, position.y, home.occupier.transparent)))));
  }

  private init() {
    const image: HTMLImageElement = this.image.nativeElement;
    this.track = TRACK.map(position => ImagemapComponent.scaleToSize(position, image));
    this.bases = BASES.map(position => ImagemapComponent.scaleToSize(position, image));
    this.homes = HOMES.map(position => ImagemapComponent.scaleToSize(position, image));
  }

  /**
   * Get the cursor position relative to the canvas.
   */
  private cursor(event: MouseEvent): number[] {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return [
      event.clientX - rect.left,
      event.clientY - rect.top
    ];
  }

  private drawHoverMarker(position: Coordinates): void {
    const context = this.canvas.nativeElement.getContext('2d');
    context.beginPath();
    context.arc(position.x, position.y, position.radius, 0, 2 * Math.PI);
    context.strokeStyle = '#49E6FF';
    context.lineWidth = 3;
    context.stroke();
  }

  private drawClickMarker(position: Coordinates): void {
    const context = this.canvas.nativeElement.getContext('2d');
    context.beginPath();
    context.arc(position.x, position.y, position.radius, 0, 2 * Math.PI);
    context.strokeStyle = '#CE1EFF';
    context.lineWidth = 3;
    context.stroke();
  }

  private drawMarble(position: MarblePosition): void {
    const context = this.canvas.nativeElement.getContext('2d');
    const img = document.getElementById('marble' + position.player);
    if (position.transparent) {
      context.globalAlpha = 0.6;
    } else {
      context.globalAlpha = 1;
    }
    context.drawImage(img, position.x - position.radius, position.y - position.radius, position.radius * 2, position.radius * 2);
  }

  /**
   * Clears the canvas and draws the markers.
   */
  draw(resize: boolean): void {
    if (resize) {
      this.init();
      this.findMarbles();
    }
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const container: HTMLDivElement = this.container.nativeElement;
    const image: HTMLImageElement = this.image.nativeElement;
    const height = image.clientHeight;
    const width = image.clientWidth;
    this.renderer.setAttribute(canvas, 'height', `${height}`);
    this.renderer.setAttribute(canvas, 'width', `${width}`);
    this.renderer.setStyle(container, 'height', `${height}px`);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    if (this.hoverMarker) {
      this.drawHoverMarker(this.hoverMarker);
    }
    for (const hightlight of this.highlights) {
      this.drawClickMarker(hightlight);
    }
    this._specialMarbles.forEach(marble => this.drawMarble(marble));
    this.marbles.filter(marble => this._specialMarbles.every(smarble => !(marble.x === smarble.x && marble.y === smarble.y)))
      .forEach(marble => this.drawMarble(marble));
  }

  onClick(event: MouseEvent): void {
    const cursor = this.cursor(event);
    this.track.forEach(position => {
      if (ImagemapComponent.insideMarker(position, cursor)) {
        const field = this.board.track[position.id];
        this.clickField.emit({field: field, coords: position});
        if (field.occupier) {
          this.clickMarble.emit({marble: Position.fromField(field), coords: position});
        }
      }
    });
    this.homes.forEach(position => {
        if (ImagemapComponent.insideMarker(position, cursor)) {
          const field = this.board.homes[position.player][position.id];
          this.clickField.emit({field: field, coords: position});
          if (field.occupier) {
            this.clickMarble.emit({marble: Position.fromField(field), coords: position});
          }

        }
    });

    this.bases.forEach(position => {
      if (ImagemapComponent.insideMarker(position, cursor)) {
        const field = this.board.bases[position.player];
        if (field.occupiers.length > 0) {
          this.clickMarble.emit({marble: Position.fromBase(field), coords: position});
        }
      }
    });
  }

  onMousemove(event: MouseEvent): void {
      const cursor = this.cursor(event);
      let hover = false;
      let draw = false;
      this.track.forEach(position => {
        if (ImagemapComponent.insideMarker(position, cursor)) {
          hover = true;
          if (this.hoverMarker === null || this.hoverMarker !== position) {
            this.hoverMarker = position;
            draw = true;
          }
        }
      });
      this.homes.forEach(position => {
        if (ImagemapComponent.insideMarker(position, cursor)) {
          hover = true;
          if (this.hoverMarker === null || this.hoverMarker !== position) {
            this.hoverMarker = position;
            draw = true;
          }
        }
      });

    this.bases.forEach(position => {
      if (ImagemapComponent.insideMarker(position, cursor)) {
        hover = true;
        if (this.hoverMarker === null || this.hoverMarker !== position) {
          this.hoverMarker = position;
          draw = true;
        }
      }
    });
      if (!hover && this.hoverMarker !== null) {
        this.hoverMarker = null;
        draw = true;
      }
      if (draw) { this.draw(false); }

  }

  onMouseout(): void {
    if (this.hoverMarker) {
      this.hoverMarker = null;
      this.draw(false);
    }
  }

}
