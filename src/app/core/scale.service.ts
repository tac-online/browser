import { Injectable } from '@angular/core';

@Injectable()
export class ScaleService {

  private scale = 1;

  constructor() { }

  public getScale(): number {
    return this.scale;
  }

  public updateScale(boardSize: number) {
    this.scale = boardSize / 984;
  }
}
