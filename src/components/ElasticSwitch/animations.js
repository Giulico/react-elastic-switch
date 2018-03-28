import { TweenMax, Elastic } from 'gsap';
import * as I from './interfaces';

export const verticalHover = ({circleOne, circleTwo, line, yOne, yTwo, radius}: I.Hover): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.3, {
        y: yOne,
        alpha: 0,
        radius,
    });
    TweenMax.to(circleTwo.data, 0.3, {
        y: yTwo,
        alpha: 0,
        radius,
        onComplete: resolve,
    });
    TweenMax.to(line.data, 0.3, {
        yStart: yOne,
        yEnd: yTwo,
    });
});

export const horizontalHover = ({circleOne, circleTwo, line, yOne, yTwo, radius}: I.Hover): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.3, {
        x: yOne,
        alpha: 0,
        radius,
    });
    TweenMax.to(circleTwo.data, 0.3, {
        x: yTwo,
        alpha: 0,
        radius,
        onComplete: resolve,
    });
    TweenMax.to(line.data, 0.3, {
        xStart: yOne,
        xEnd: yTwo,
    });
});

export const verticalUnhover = ({circleOne, circleTwo, line, yOne, yTwo, lineStart, lineEnd, radius}: I.Unhover): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.3, {
        y: yOne,
        alpha: 1,
        radius,
    });
    TweenMax.to(circleTwo.data, 0.3, {
        y: yTwo,
        alpha: 1,
        radius,
        onComplete: resolve,
    });
    TweenMax.to(line.data, 0.3, {
        yStart: lineStart,
        yEnd: lineEnd,
    });
});

export const horizontalUnhover = ({circleOne, circleTwo, line, yOne, yTwo, lineStart, lineEnd, radius}: I.Unhover): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.3, {
        x: yOne,
        alpha: 1,
        radius,
    });
    TweenMax.to(circleTwo.data, 0.3, {
        x: yTwo,
        alpha: 1,
        radius,
        onComplete: resolve,
    });
    TweenMax.to(line.data, 0.3, {
        xStart: lineStart,
        xEnd: lineEnd,
    });
});

export const verticalMove = ({line, direction}): Promise<any> => new Promise(resolve => {
    const tl = new TimelineMax({onComplete: resolve});
    const xControl = line.data.xControl;
    const strength = direction === 'right' ? 30 : -30;

    tl
        .to(line.data, 0.3, {
            xControl: xControl + strength
        })
        .to(line.data, 0.9, {
            xControl: xControl,
            ease: Elastic.easeOut.config(2.5, 0.1)
        })
});

export const horizontalMove = ({line, direction}): Promise<any> => new Promise(resolve => {
    const tl = new TimelineMax({onComplete: resolve});
    const yControl = line.data.yControl;
    const strength = direction === 'right' ? 30 : -30;

    tl
        .to(line.data, 0.3, {
            yControl: yControl + strength
        })
        .to(line.data, 0.9, {
            yControl: yControl,
            ease: Elastic.easeOut.config(2.5, 0.1)
        })
});
