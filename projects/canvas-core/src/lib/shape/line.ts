import { Shape, ShapeType } from './shape';
import { Matrix } from '../core/matrix';
import { Point } from '../point/point';
import { FilledBlock } from '../block/filled-block';

export class Line extends Shape {
  type: ShapeType;
  direction: LineDirection;
  length: number;
  startX: number;
  startY: number;
  positionsOnCanvas: Point[];

  constructor(x1: number, y1: number, x2: number, y2: number, label = 'x') {
    super(x1, y1, x2, y2, label);
    this.type = ShapeType.Line;
    this.positionsOnCanvas = [];
    this.reCalculation();
  }

  reCalculation() {
    this.startX = Math.min(this.x1, this.x2);
    this.startY = Math.min(this.y1, this.y2);
    this.setDirection();
    this.setLength();
  }

  isValid(canvasWidth: number, canvasHeight: number) {
    return (
      this.direction !== LineDirection.NotSupported &&
      this.isInsideCanvas(canvasWidth, canvasHeight)
    );
  }

  drawToCanvas(matrix: Matrix, canvasWidth: number, canvasHeight: number) {
    this.positionsOnCanvas = [];
    if (!this.isValid(canvasWidth, canvasHeight)) {
      return;
    }
    let arrIdxRow = this.startY - 1;
    let arrIdxCol = this.startX - 1;

    if (this.direction === LineDirection.Horizontal) {
      for (let i = 0; i < this.length; i++) {
        matrix[arrIdxRow][arrIdxCol + i] = new FilledBlock(this.label);
        this.positionsOnCanvas.push(new Point(arrIdxRow, arrIdxCol + i));
      }
    } else if (this.direction === LineDirection.Vertical) {
      for (let i = 0; i < this.length; i++) {
        matrix[arrIdxRow + i][arrIdxCol] = new FilledBlock(this.label);
        this.positionsOnCanvas.push(new Point(arrIdxRow + i, arrIdxCol));
      }
    }
  }

  setLength() {
    if (this.direction === LineDirection.Horizontal) {
      this.length = Math.abs(this.x2 - this.x1) + 1;
    } else if (this.direction === LineDirection.Vertical) {
      this.length = Math.abs(this.y2 - this.y1) + 1;
    } else {
      this.length = 0;
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
