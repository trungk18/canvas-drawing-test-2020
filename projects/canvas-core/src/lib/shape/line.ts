import { Shape, ShapeType } from './shape';
import { Canvas } from '../core/canvas';

export class Line extends Shape {
  type: ShapeType;
  direction: LineDirection;
  length: number;

  constructor(x1: number, y1: number, x2: number, y2: number, label = 'x') {
    super(x1, y1, x2, y2, label);
    this.type = ShapeType.Line;
    this.setDirection();
    this.setLength();
  }

  isValid(canvasWidth: number, canvasHeight: number) {
    return (
      this.direction !== LineDirection.NotSupported &&
      this.isInsideCanvas(canvasWidth, canvasHeight)
    );
  }

  drawToCanvas(
    canvas: Canvas,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (!this.isValid(canvasWidth, canvasHeight)) {
      return;
    }
    if (this.direction === LineDirection.Horizontal) {
      for (let i = 0; i < this.length; i++) {
        canvas[this.startY][this.startX + i] = this.label;
      }
    } else if (this.direction === LineDirection.Vertical) {
      for (let i = 0; i < this.length; i++) {
        canvas[this.startY + i][this.startX] = this.label;
      }
    }
  }

  setLength() {
    if (this.direction === LineDirection.Horizontal) {
      this.length = Math.abs(this.x2 - this.x1) + 1;
    } else if (this.direction === LineDirection.Vertical) {
      this.length = Math.abs(this.y2 - this.y1) + 1;
    }
  }

  setDirection() {
    if (this.x1 === this.x2) {
      this.direction = LineDirection.Vertical;
    } else if (this.y1 === this.y2) {
      this.direction = LineDirection.Horizontal;
    } else {
      this.direction = LineDirection.NotSupported;
    }
  }
}

export enum LineDirection {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
  NotSupported = 'NotSupported',
}