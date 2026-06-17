import { createHttpServer } from './interfaces/http/server.js';
import { loadConfig } from './infrastructure/config/load-config.js';

const config = loadConfig();
const app = createHttpServer();

app.listen(config.port, () => {
  console.log(`CliniNote API listening on port ${config.port}`);
});
