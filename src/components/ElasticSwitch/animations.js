import {TweenMax} from 'gsap';

export const hover = ({circleOne, circleTwo, yOne, yTwo}): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.5, {
        y: yOne,
    });
    TweenMax.to(circleTwo.data, 0.5, {
        y: yTwo,
        onComplete: resolve,
    });
});

export const unHover = ({circleOne, circleTwo, yOne, yTwo}): Promise<any> => new Promise(resolve => {
    TweenMax.to(circleOne.data, 0.5, {
        y: yOne,
    });
    TweenMax.to(circleTwo.data, 0.5, {
        y: yTwo,
        onComplete: resolve,
    });
});
