/**
 * @format
 * @module AppConfig
 * @description Central application runtime configuration.
 * @author auto
 * @since 1.0.0
 */

export const appConfig = {
    port: Number(process.env.PORT ?? 4000),
    webOrigin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
};
