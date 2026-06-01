/**
 * @format
 * @module AiExtractService
 * @description Extracts form fields from uploaded documents with Gemini.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class AiExtractService {
	private readonly client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

	/**
	 * Extracts candidate field values from a text prompt and document content.
	 * @param prompt - Extraction instruction prompt.
	 * @returns Extracted JSON-like text.
	 */
	async extractFields(prompt: string): Promise<string> {
		const model = this.client.getGenerativeModel({ model: GEMINI_MODEL });
		const result = await model.generateContent(prompt);
		return result.response.text();
	}
}
