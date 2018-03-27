import * as React from 'react';
import * as PIXI from 'pixi.js';

// Style
import './ElasticSwitch.css';

// Interfaces
import * as I from './interfaces';

// Animations
import * as A from './animations';

const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

class ElasticSwitch extends React.Component<I.Props> {
  app: PIXI.Application;
  circleOne: I.CircleGraphics;
  circleTwo: I.CircleGraphics;
  line: I.LineGraphics;
  wrapper: HTMLDivElement | null;
  reference: number;
  pointerState: 'in' | 'out';

  vars = {
    size: 100,
    padding: 10,
    circle: {
      radius: 5,
      radiusHover: 15,
      fill: 0xFFFFFF,
    },
    line: {
      fill: 0x414141,
    },
  };

  componentDidMount() {
    this.app = new Application(this.vars.size, this.vars.size, {
      transparent: true,
    });

    if (this.wrapper) {
      this.wrapper.appendChild(this.app.view);
    }

    // Start loop animation
    this.app.ticker.add(this.animate);

    // Setup shapes
    this.circleOne = {
      graphics: new Graphics(),
      data: {
        alpha: 0,
        fill: this.vars.circle.fill,
        radius: this.vars.circle.radius,
        x: this.vars.size / 2,
        y: this.vars.padding,
      },
    };
    this.circleTwo = {
      graphics: new Graphics(),
      data: {
        alpha: 0,
        fill: this.vars.circle.fill,
        radius: this.vars.circle.radius,
        x: this.vars.size / 2,
        y: this.vars.size - this.vars.padding,
      },
    };
    this.line = {
      graphics: new Graphics(),
      data: {
        xStart: this.vars.size / 2,
        yStart: this.vars.padding + (this.vars.circle.radius / 2),
        xEnd: this.vars.size / 2,
        yEnd: this.vars.size - (this.vars.padding + (this.vars.circle.radius / 2)),
        fill: this.vars.line.fill,
      }
    };
    this.line.graphics.interactive = true;

    this.app.stage.addChild(
      this.line.graphics,
      this.circleOne.graphics,
      this.circleTwo.graphics,
    );

    this.reference = this.vars.size / 2;
    this.setEvents();
  }

  render() {
    return (
      <div
        className="ElasticSwitch"
        ref={c => this.wrapper = c}
      />
    );
  }

  animate = () => {
    const c1 = this.circleOne;
    const cD1 = c1.data;
    const c2 = this.circleTwo;
    const cD2 = c2.data;
    const l = this.line;
    const lD = l.data;

    l.graphics
      .clear()
      .beginFill(lD.fill, 1)
      .lineStyle(2, lD.fill, 1)
      .moveTo(lD.xStart, lD.yStart)
      .lineTo(lD.xEnd, lD.yEnd)
      .endFill();

    c1.graphics
      .clear()
      .beginFill(cD1.fill, cD1.alpha)
      .lineStyle(2, cD1.fill, 1)
      .drawCircle(cD1.x, cD1.y, cD1.radius)
      .endFill();

    c2.graphics
      .clear()
      .beginFill(cD2.fill, cD2.alpha)
      .lineStyle(2, cD2.fill, 1)
      .drawCircle(cD2.x, cD2.y, cD2.radius)
      .endFill();
  }

  setEvents() {
    if (this.wrapper) {
      this.wrapper.addEventListener('mousemove', this.mouseMoveHandler, false);
      this.wrapper.addEventListener('mouseenter', this.mouseEnterHandler, false);
      this.wrapper.addEventListener('mouseout', this.mouseOutHandler, false);
    }
  }

  mouseMoveHandler = (e: MouseEvent): void => {
    const pos = e.offsetX;
    const halfSize = this.vars.size / 2;

    if (this.pointerState === 'out') {
      return;
    }

    if (
      this.reference < halfSize
      && pos > halfSize
    ) {
      console.log('animate to right!');
    }

    if (
      this.reference > halfSize
      && pos < halfSize
    ) {
      console.log('animate to left!');
    }

    this.reference = pos;
  }

  mouseEnterHandler = (e: MouseEvent): void => {
    this.pointerState = 'in';
    A.hover({
      circleOne: this.circleOne,
      circleTwo: this.circleTwo,
      yOne: this.vars.padding - 5,
      yTwo: this.vars.size - 5,
    });
  }

  mouseOutHandler = (e: MouseEvent): void => {
    this.pointerState = 'out';
    A.unHover({
      circleOne: this.circleOne,
      circleTwo: this.circleTwo,
      yOne: this.vars.padding,
      yTwo: this.vars.size - this.vars.padding,
    });
  }
}

export default ElasticSwitch;