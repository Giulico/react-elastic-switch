export const getY = (e: MouseEvent, app: any): number => {
    return app.renderer.plugins.interaction.eventData.data.global.y;
};

export const getX = (e: MouseEvent, app: any): number => {
    return app.renderer.plugins.interaction.eventData.data.global.x;
};