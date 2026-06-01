/**
 * @format
 * @module StepFormBuilder
 * @description Extracts template fields from uploaded reference files and supports manual fields.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { FileUp, Plus, Sparkles, UploadCloud } from 'lucide-react';
import { Button } from '@onboarding/ui';

const extractedDefaults = ['Full name', 'Date of birth', 'Address', 'PAN number'];

export function StepFormBuilder(): JSX.Element {
	const [customField, setCustomField] = useState('');
	const [fields, setFields] = useState<string[]>([]);
	const [fileName, setFileName] = useState('');

	function uploadReference(event: ChangeEvent<HTMLInputElement>): void {
		const file = event.target.files?.[0];
		if (!file) return;
		setFileName(file.name);
		setFields(extractedDefaults);
	}

	function addField(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const label = customField.trim();
		if (!label || fields.includes(label)) return;
		setFields((current) => [...current, label]);
		setCustomField('');
	}

	return (
		<div className="field-builder">
			<label className="field-builder__upload">
				<span className="field-builder__upload-icon">
					<UploadCloud size={22} />
				</span>
				<span>
					<strong>Upload a reference template</strong>
					<small>Drag a PDF, Word, or Excel file here, or browse up to 10 MB.</small>
				</span>
				<span className="field-builder__browse">
					<FileUp size={15} />
					Browse file
				</span>
				<input
					accept=".pdf,.doc,.docx,.xls,.xlsx"
					aria-label="Upload reference template"
					onChange={uploadReference}
					type="file"
				/>
			</label>
			<div className="field-builder__status">
				<Sparkles size={16} />
				{fileName
					? `${fileName} processed. Review the extracted fields below.`
					: 'Upload a reference template to extract fillable fields.'}
			</div>
			{fields.length ? (
				<div className="field-builder__fields">
					{fields.map((field) => (
						<label className="field-builder__field" key={field}>
							<span>{field}</span>
							<input
								className="app-input"
								placeholder={`Enter ${field.toLowerCase()}`}
							/>
						</label>
					))}
				</div>
			) : null}
			<form className="field-builder__custom" onSubmit={addField}>
				<input
					aria-label="Custom field"
					className="app-input"
					onChange={(event) => setCustomField(event.target.value)}
					placeholder="Add custom field for later reference"
					value={customField}
				/>
				<Button className="app-button app-button--primary" type="submit">
					<Plus size={16} />
					Add field
				</Button>
			</form>
		</div>
	);
}
