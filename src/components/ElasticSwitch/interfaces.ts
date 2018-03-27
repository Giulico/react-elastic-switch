export interface CircleGraphics {
  graphics: PIXI.Graphics;
  data: {
    alpha: number,
    fill: number,
    radius: number,
    x: number,
    y: number,
  };
}

export interface LineGraphics {
  graphics: PIXI.Graphics;
  data: {
    xStart: number,
    xEnd: number,
    yStart: number,
    yEnd: number,
    fill: number,
  };
}

export interface Props {
  horizontal?: boolean;
}