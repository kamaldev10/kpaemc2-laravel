import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface UseSearchOptions {
	baseUrl: string;
	initialValue?: string;
	paramName?: string;
	otherParams?: Record<string, string | undefined>;
	delay?: number;
}

export function useSearch({
	baseUrl,
	initialValue = '',
	paramName = 'search',
	otherParams = {},
	delay = 300,
}: UseSearchOptions) {
	const [term, setTerm] = useState(initialValue);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const timer = setTimeout(() => {
			const query: Record<string, string> = {};

			Object.entries(otherParams).forEach(([key, val]) => {
				if (val && val.trim() !== '') {
					query[key] = val;
				}
			});

			if (term && term.trim() !== '') {
				query[paramName] = term.trim();
			}

			router.get(baseUrl, query, {
				preserveState: true,
				preserveScroll: true,
				replace: true,
			});
		}, delay);

		return () => clearTimeout(timer);
	}, [term, baseUrl, paramName, delay, JSON.stringify(otherParams)]);

	return {
		term,
		setTerm,
	};
}

export default useSearch;
