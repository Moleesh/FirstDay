/**
 * @format
 * @module GlobalExceptionFilter
 * @description Normalizes API exception responses.
 * @author auto
 * @since 1.0.0
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    /**
     * Converts thrown errors into consistent JSON payloads.
     * @param exception - Thrown exception.
     * @param host - Nest arguments host.
     */
    catch(exception: unknown, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).send({ ok: false, statusCode: status, message: 'Request failed' });
    }
}
