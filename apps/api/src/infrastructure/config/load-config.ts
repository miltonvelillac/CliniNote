import 'dotenv/config';

export type ApiConfig = {
  port: number;
};

export function loadConfig(): ApiConfig {
  return {
    port: Number(process.env.PORT ?? 3000)
  };
}
