import { CanvasUtil } from '../util/canvas';
import { Matrix } from '../core/matrix';
import { Point } from '../point/point';
import { FilledBlock } from '../block/filled-block';

export class BucketFill {
  positionsOnCanvas: Point[];

  constructor(public x: number, public y: number, public color: string = 'o') {
    this.positionsOnCanvas = [];
  }

  isValid(canvas: Matrix, canvasWidth: number, canvasHeight: number): boolean {
    return this.isAvailablePoint(
      this.x,
      this.y,
      canvas,
      canvasWidth,
      canvasHeight
    );
  }

  fill(matrix: Matrix, canvasWidth: number, canvasHeight: number) {
    this.positionsOnCanvas = [];
    if (!this.isValid(matrix, canvasWidth, canvasHeight)) {
      return;
    }

    let xyAdjacentCors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let point = new Point(this.x, this.y);
    let queue: Point[] = [point];

    while (queue.length) {
      let { x, y } = queue.shift();

      matrix[y - 1][x - 1] = new FilledBlock(this.color);
      this.positionsOnCanvas.push(new Point(y - 1, x - 1));

      for (let i = 0; i < xyAdjacentCors.length; i++) {
        const newX = x + xyAdjacentCors[i][0];
        const newY = y + xyAdjacentCors[i][1];
        let isQueueHasPoint = queue.some(
          (point) => point.x === newX && point.y === newY
        );
        if (
          !isQueueHasPoint &&
          this.isAvailablePoint(newX, newY, matrix, canvasWidth, canvasHeight)
        ) {
          queue.push(new Point(newX, newY));
        }
      }
    }
  }

  isAvailablePoint(
    x: number,
    y: number,
    canvas: Matrix,
    canvasWidth: number,
    canvasHeight: number
  ) {
    return (
      CanvasUtil.isInside(x, canvasWidth) &&
      CanvasUtil.isInside(y, canvasHeight) &&
      canvas[y - 1][x - 1]?.isEmpty
    );
  }
}
