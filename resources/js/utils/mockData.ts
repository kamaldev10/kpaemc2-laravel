import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

/**
 * Checks whether mock data fallback is enabled.
 * Returns true ONLY if USE_MOCK_DATA=true in backend or VITE_USE_MOCK_DATA=true in frontend.
 */
export function useIsMockDataEnabled(): boolean {
	const { props } = usePage<PageProps>();
	const viteMockFlag = import.meta.env.VITE_USE_MOCK_DATA;
	return Boolean(
		props.use_mock_data === true || viteMockFlag === 'true' || viteMockFlag === true
	);
}

/**
 * Resolves data between real server/database data and mock fallback.
 * When USE_MOCK_DATA is false (default in live/database mode):
 *   - Returns serverData directly as passed from the backend.
 * When USE_MOCK_DATA is true:
 *   - If serverData is null, undefined, or an empty array, returns fallbackMock.
 */
export function resolveData<T>(
	serverData: T | null | undefined,
	fallbackMock: T,
	isMockEnabled: boolean
): T | null | undefined {
	if (!isMockEnabled) {
		return serverData;
	}

	if (serverData === null || serverData === undefined) {
		return fallbackMock;
	}

	if (Array.isArray(serverData) && serverData.length === 0) {
		return fallbackMock;
	}

	return serverData;
}
