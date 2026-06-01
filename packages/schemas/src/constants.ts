/**
 * @format
 * @module SchemaConstants
 * @description Shared validation constants for platform schemas.
 * @author auto
 * @since 1.0.0
 */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const SIGNED_URL_EXPIRY_SECONDS = 60 * 60;
export const JOINEE_DISPLAY_ID_PATTERN = /^JN-\d{4}-\d{5}$/;
export const ALLOWED_UPLOAD_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
] as const;
