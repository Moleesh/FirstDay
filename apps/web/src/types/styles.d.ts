/**
 * @format
 * @module StyleDeclarations
 * @description Type declarations for imported SCSS stylesheets.
 */

declare module '*.module.scss' {
    const classes: Readonly<Record<string, string>>;
    export default classes;
}

declare module '*.scss';
