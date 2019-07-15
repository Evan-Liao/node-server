import Router from 'koa-router';
import * as Koa from 'koa';

const router = new Router();

router
    .get('/test', async (ctx): Promise<void> => {
        ctx.body = `method: ${ctx.request.method}, url: ${ctx.request.url}`
    });


export default {
    init(app: Koa): void {
        app.use(router.routes()).use(router.allowedMethods());
    }
}
