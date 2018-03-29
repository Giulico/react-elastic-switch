export const getY = (e: MouseEvent): number => {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
        const touch = e.targetTouches[0];
        return touch.clientY - touch.target.offsetTop;
    }
    // mouse event
    return e.clientY;
};

export const getX = (e: MouseEvent): number => {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
        const touch = e.targetTouches[0];
        return touch.clientX - touch.target.offsetLeft;
    }
    // mouse event
    return e.clientX;
};