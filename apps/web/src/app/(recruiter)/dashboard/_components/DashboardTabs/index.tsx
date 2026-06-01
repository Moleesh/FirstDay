/**
 * @format
 * @module DashboardTabs
 * @description Switches between recruiter template and joinee workspaces.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { ClipboardList, UserCog, Users } from 'lucide-react';
import { useState } from 'react';
import { DocumentBuilder } from '@/app/(recruiter)/dashboard/_components/DocumentBuilder';
import { JoineeManager } from '@/app/(recruiter)/dashboard/_components/JoineeManager';
import { RecruiterManager } from '@/app/(recruiter)/dashboard/_components/RecruiterManager';

type Workspace = 'builder' | 'joinees' | 'recruiters';

const tabs = [
	{ icon: ClipboardList, id: 'builder', label: 'Document builder' },
	{ icon: Users, id: 'joinees', label: 'Joinee workspace' },
	{ icon: UserCog, id: 'recruiters', label: 'Recruiter admin' },
] as const;

/**
 * Renders dashboard workspace tabs.
 * @returns Tabbed recruiter workspace.
 */
export function DashboardTabs(): JSX.Element {
	const [activeTab, setActiveTab] = useState<Workspace>('builder');

	return (
		<section className="dashboard-workspaces">
			<div aria-label="Recruiter workspaces" className="workspace-tabs" role="tablist">
				{tabs.map(({ icon: Icon, id, label }) => (
					<button
						aria-controls={`${id}-panel`}
						aria-selected={activeTab === id}
						className="workspace-tab"
						id={`${id}-tab`}
						key={id}
						onClick={() => setActiveTab(id)}
						role="tab"
						type="button"
					>
						<Icon size={17} />
						{label}
					</button>
				))}
			</div>
			<div
				aria-labelledby="builder-tab"
				hidden={activeTab !== 'builder'}
				id="builder-panel"
				role="tabpanel"
			>
				<DocumentBuilder />
			</div>
			<div
				aria-labelledby="joinees-tab"
				hidden={activeTab !== 'joinees'}
				id="joinees-panel"
				role="tabpanel"
			>
				<JoineeManager />
			</div>
			<div
				aria-labelledby="recruiters-tab"
				hidden={activeTab !== 'recruiters'}
				id="recruiters-panel"
				role="tabpanel"
			>
				<RecruiterManager />
			</div>
		</section>
	);
}
