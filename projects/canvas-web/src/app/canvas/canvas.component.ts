import { Component, OnInit } from '@angular/core';
import { CanvasCore, Line, Rectangle, BucketFill } from 'canvas-core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  core: CanvasCore;
  constructor() {}

  ngOnInit(): void {
    this.core = new CanvasCore(20, 4);
    this.core.addShape(new Line(1, 2, 6, 2));
    this.core.addShape(new Line(6, 3, 6, 4));
    this.core.addShape(new Rectangle(14, 1, 18, 3));
    this.core.addBucket(new BucketFill(15, 2));
    this.core.addBucket(new BucketFill(1, 3));
  }

  createCanvas() {}

  addShape() {}

  addBucket() {}
}
