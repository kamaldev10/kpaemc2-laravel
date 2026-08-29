import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route, RouteName, RouteParams, Config } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: (title) => `${title} - ${appName}`,
		resolve: (name) =>
			resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
		setup: ({ App, props }) => {
			/* eslint-disable @typescript-eslint/no-explicit-any */
			// @ts-expect-error global route assignment for SSR
			global.route = (name: RouteName, params?: RouteParams<RouteName>, absolute?: boolean) =>
				route(name, params as any, absolute, {
					...(page.props.ziggy as Config),
					location: new URL((page.props.ziggy as any).location),
				});
			/* eslint-enable @typescript-eslint/no-explicit-any */

			return <App {...props} />;
		},
	})
);
