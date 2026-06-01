/**
 * @format
 * @module FileValidationPipe
 * @description Validates uploaded files by MIME type and size.
 * @author auto
 * @since 1.0.0
 */

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ALLOWED_UPLOAD_MIME_TYPES, MAX_UPLOAD_BYTES } from '@onboarding/schemas';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    /**
     * Validates an uploaded file payload.
     * @param file - Multer file object.
     * @returns The original file when valid.
     */
    transform(file: Express.Multer.File): Express.Multer.File {
        if (
            !ALLOWED_UPLOAD_MIME_TYPES.includes(file.mimetype as never) ||
            file.size > MAX_UPLOAD_BYTES
        ) {
            throw new BadRequestException('Unsupported file upload');
        }
        return file;
    }
}
