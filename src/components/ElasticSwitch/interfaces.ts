export interface CircleData {
  alpha: number,
  fill: number,
  radius: number,
  x: number,
  y: number,
}

export interface LineData {
  alpha: number,
  xStart: number,
  xControl: number,
  xEnd: number,
  yStart: number,
  yControl: number,
  yEnd: number,
  fill: number,
}

export interface Props {
  horizontal?: boolean;
  onSwitch?: Function;
}

export interface Vars {
  size: number;
  padding: number;
  circle: {
    radius: number,
    radiusHover: number,
    fill: number,
  };
  line: {
    fill: number,
  };
}

export interface Unhover {
  circleOne: {
    graphics: PIXI.Graphics,
    data: CircleData,
  };
  circleTwo: {
    graphics: PIXI.Graphics,
    data: CircleData,
  };
  line: {
    graphics: PIXI.Graphics,
    data: LineData,
  };
  yOne: number;
  yTwo: number;
  lineStart: number;
  lineEnd: number;
  radius: number;
}

export interface Hover {
  circleOne: {
    graphics: PIXI.Graphics,
    data: CircleData,
  };
  circleTwo: {
    graphics: PIXI.Graphics,
    data: CircleData,
  };
  line: {
    graphics: PIXI.Graphics,
    data: LineData,
  };
  yOne: number;
  yTwo: number;
  radius: number;
}