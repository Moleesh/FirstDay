/**
 * @format
 * @module MobileNav
 * @description Compact mobile navigation control.
 * @author auto
 * @since 1.0.0
 */

import { Menu } from 'lucide-react';

export function MobileNav(): JSX.Element {
	return (
		<button aria-label="Open navigation" className="nav-button" type="button">
			<Menu size={16} />
		</button>
	);
}
