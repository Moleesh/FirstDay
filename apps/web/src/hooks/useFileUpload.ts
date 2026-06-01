/**
 * @format
 * @module UseFileUpload
 * @description Provides upload state helpers for joinee documents.
 * @author auto
 * @since 1.0.0
 */

export function useFileUpload(): { upload: (file: File) => Promise<string> } {
	return {
		async upload(file: File): Promise<string> {
			return file.name;
		},
	};
}
