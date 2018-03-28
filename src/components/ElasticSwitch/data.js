// Interfaces
import * as I from './interfaces';

export const getData = (type: string, vars: I.Vars) => {
    const settings = {
      verticalCircleOne: {
        alpha: 1,
        fill: vars.circle.fill,
        radius: vars.circle.radius,
        x: vars.size / 2,
        y: vars.padding * 1.5,
      },
      verticalCircleTwo: {
        alpha: 1,
        fill: vars.circle.fill,
        radius: vars.circle.radius,
        x: vars.size / 2,
        y: vars.size - (vars.padding * 1.5),
      },
      verticalLine: {
        xStart: vars.size / 2,
        yStart: vars.padding + (vars.circle.radius / 2),
        xControl: vars.size / 2,
        yControl: vars.size / 2,
        xEnd: vars.size / 2,
        yEnd: vars.size - (vars.padding + (vars.circle.radius / 2)),
        fill: vars.line.fill,
      },
      horizontalCircleOne: {
        alpha: 1,
        fill: vars.circle.fill,
        radius: vars.circle.radius,
        x: vars.padding * 1.5,
        y: vars.size / 2,
      },
      horizontalCircleTwo: {
        alpha: 1,
        fill: vars.circle.fill,
        radius: vars.circle.radius,
        x: vars.size - (vars.padding * 1.5),
        y: vars.size / 2,
      },
      horizontalLine: {
        xStart: vars.padding + (vars.circle.radius / 2),
        yStart: vars.size / 2,
        xControl: vars.size / 2,
        yControl: vars.size / 2,
        xEnd: vars.size - (vars.padding + (vars.circle.radius / 2)),
        yEnd: vars.size / 2,
        fill: vars.line.fill,
      }
    };
    return settings[type] ? settings[type] : settings.verticalLine;
  }
