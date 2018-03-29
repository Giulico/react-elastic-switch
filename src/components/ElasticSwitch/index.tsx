import * as React from 'react';
import * as PIXI from 'pixi.js';

// Style
import './ElasticSwitch.css';

// Interfaces
import * as I from './interfaces';

// Animations
import * as A from './animations';

// Utils
import { getData } from './data';

const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

class ElasticSwitch extends React.Component<I.Props> {
  app: PIXI.Application;
  circleOne: {
    graphics: PIXI.Graphics,
    data: I.CircleData,
  };
  circleTwo: {
    graphics: PIXI.Graphics,
    data: I.CircleData,
  };
  line: {
    graphics: PIXI.Graphics,
    data: I.LineData,
  };
  wrapper: HTMLDivElement | null;
  reference: number;
  pointerState: 'in' | 'out';
  isMoving: boolean = false;
  debugLC1: PIXI.Graphics;
  debugLC2: PIXI.Graphics;
  debugLC3: PIXI.Graphics;

  vars: I.Vars = {
    size: 120,
    padding: 20,
    circle: {
      radius: 3,
      radiusHover: 15,
      fill: 0xFFFFFF,
    },
    line: {
      fill: 0x414141,
    },
  };

  debug: boolean = false;

  componentDidMount() {
    this.app = new Application(this.vars.size, this.vars.size, {
      transparent: true,
    });
    let circleOneType = 'verticalCircleOne';
    let circleTwoType = 'verticalCircleTwo';
    let lineType = 'verticalLine';

    if (this.props.horizontal) {
      circleOneType = 'horizontalCircleOne';
      circleTwoType = 'horizontalCircleTwo';
      lineType = 'horizontalLine';
    }

    if (this.wrapper) {
      this.wrapper.appendChild(this.app.view);
    }

    // Start loop animation
    this.app.ticker.add(this.animate);

    // Setup shapes
    this.circleOne = {
      graphics: new Graphics(),
      data: getData(circleOneType, this.vars),
    };
    this.circleTwo = {
      graphics: new Graphics(),
      data: getData(circleTwoType, this.vars),
    };
    this.line = {
      graphics: new Graphics(),
      data: getData(lineType, this.vars),
    };
    this.line.graphics.interactive = true;

    this.app.stage.addChild(
      this.line.graphics,
      this.circleOne.graphics,
      this.circleTwo.graphics,
    );

    if (this.debug) {
      this.debugLC1 = new Graphics();
      this.debugLC2 = new Graphics();
      this.debugLC3 = new Graphics();
      this.app.stage.addChild(this.debugLC1, this.debugLC2, this.debugLC3);
    }

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

    if (this.debug) {
      this.debugLC1
        .clear()
        .beginFill(0xCC0000, 1)
        .drawRect(lD.xStart - 2, lD.yStart - 2, 4, 4)
        .endFill();
      this.debugLC2
        .clear()
        .beginFill(0x00CC00, 1)
        .drawRect(lD.xControl - 2, lD.yControl - 2, 4, 4)
        .endFill();
      this.debugLC3
        .clear()
        .beginFill(0x0000CC, 1)
        .drawRect(lD.xEnd - 2, lD.yEnd - 2, 4, 4)
        .endFill();
    }

    l.graphics
      .clear()
      .beginFill(lD.fill, 0)
      .lineStyle(2, lD.fill, lD.alpha)
      .moveTo(lD.xStart, lD.yStart)
      .bezierCurveTo(
        lD.xStart, lD.yStart,
        lD.xControl, lD.yControl,
        lD.xEnd, lD.yEnd
      )
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
    const { horizontal } = this.props;
    const pos = horizontal ? e.offsetY : e.offsetX;
    const halfSize = this.vars.size / 2;

    if (
      this.reference < halfSize
      && pos > halfSize
      && !this.isMoving
    ) {
      const move = horizontal ? 'horizontalMove' : 'verticalMove';
      const direction = 'right';
      this.isMoving = true;
      A[move]({
        line: this.line,
        direction,
      })
      .then(() => {
        this.isMoving = false;
      });

      if (typeof this.props.onSwitch === 'function') {
        this.props.onSwitch({
          direction
        });
      }
    }

    if (
      this.reference > halfSize
      && pos < halfSize
      && !this.isMoving
    ) {
      const move = horizontal ? 'horizontalMove' : 'verticalMove';
      const direction = 'left';
      this.isMoving = true;
      A[move]({
        line: this.line,
        direction,
      })
      .then(() => {
        this.isMoving = false;
      });

      if (typeof this.props.onSwitch === 'function') {
        this.props.onSwitch({
          direction
        });
      }
    }

    this.reference = pos;
  }

  mouseEnterHandler = (e: MouseEvent): void => {
    const { horizontal } = this.props;
    this.pointerState = 'in';
    const hover = horizontal ? 'horizontalHover' : 'verticalHover';
    // const yOne = horizontal ?
    A[hover]({
      circleOne: this.circleOne,
      circleTwo: this.circleTwo,
      line: this.line,
      yOne: this.vars.padding,
      yTwo: this.vars.size - this.vars.padding,
      radius: this.vars.circle.radius * 1.5,
    });
  }

  mouseOutHandler = (): void => {
    if (this.isMoving) {
      requestAnimationFrame(this.mouseOutHandler);
      return;
    }
    const { horizontal } = this.props;
    this.pointerState = 'out';
    const unhover = horizontal ? 'horizontalUnhover' : 'verticalUnhover';
    A[unhover]({
      circleOne: this.circleOne,
      circleTwo: this.circleTwo,
      line: this.line,
      yOne: this.vars.padding * 1.5,
      yTwo: this.vars.size - (this.vars.padding * 1.5),
      lineStart: this.vars.padding + (this.vars.circle.radius / 2),
      lineEnd: this.vars.size - (this.vars.padding + (this.vars.circle.radius / 2)),
      radius: this.vars.circle.radius,
    });
  }

}

export default ElasticSwitch;