import koa from 'koa';
import koaBody from 'koa-body';
import Controller from './controllers';

import { systemConfig } from './config';

const app = new koa();
app.use(koaBody());

Controller.init(app);

app.listen(systemConfig.port, function() {
  console.log(`server is running on: http://localhost:${systemConfig.port}`);
});

export default app;