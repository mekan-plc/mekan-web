export const prerender = false;

function jsonResponse(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

/**
 * Determine WordPress root URL from environment variables
 *
 * Supports multiple configuration patterns:
 * - WP_ROOT_BASE: Direct root URL (preferred)
 * - WP_API_BASE: API endpoint (extracts root by removing /wp-json/*)
 *
 * Handles various trailing slash and path combinations to ensure
 * consistent root URL for constructing contact form endpoint.
 *
 * @returns WordPress root URL without trailing slash
 */
function getWpRootBase(): string {
	const envAny = (import.meta as any).env || {};
	const explicit = envAny.WP_ROOT_BASE;
	if (explicit) return String(explicit).replace(/\/$/, '');

	const apiBase = envAny.WP_API_BASE;
	if (apiBase) {
		const base = String(apiBase).replace(/\/$/, '');
		if (base.endsWith('/wp-json/wp/v2')) return base.slice(0, -'/wp-json/wp/v2'.length);
		if (base.endsWith('/wp-json/wp/v2/')) return base.slice(0, -'/wp-json/wp/v2/'.length);
		if (base.endsWith('/wp-json/wp/v2')) return base.slice(0, -'/wp-json/wp/v2'.length);
		if (base.endsWith('/wp-json')) return base.slice(0, -'/wp-json'.length);
		return base;
	}

	return 'http://127.0.0.1:8881';
}

/** A person needs longer than this to fill in the form; scripts post almost at once. */
const MIN_FILL_MS = 3000;

/**
 * Bot check for a form posted by the homepage script.
 * Returns why the post looks automated, or null for a real visitor:
 * - the hidden `check` field (off-screen, never shown to people) has a value
 * - `elapsedMs` (time on page, measured in the browser) is missing or too short,
 *   which also catches scripts posting to this endpoint without loading the page
 */
function botReason(payload: any): string | null {
	if (typeof payload?.check === 'string' && payload.check.trim() !== '') return 'hidden field filled';
	const elapsed = Number(payload?.elapsedMs);
	if (!Number.isFinite(elapsed)) return 'no page timing';
	if (elapsed < MIN_FILL_MS) return `sent after ${Math.round(elapsed)}ms`;
	return null;
}

/**
 * Handle contact form submissions
 *
 * Proxies contact form data to the WordPress backend endpoint. This API route:
 * - Receives JSON payload from frontend contact form
 * - Forwards to WordPress custom REST endpoint (/mekan/v1/contact)
 * - Handles WordPress connectivity failures gracefully
 * - Returns structured JSON response for frontend error handling
 *
 * Expected payload: { name, email, phone, service, message, check, elapsedMs }
 * (`check` and `elapsedMs` are bot checks and are not forwarded)
 *
 * @param request - Astro API request object
 * @returns JSON response with success status and optional error messages
 */
export async function POST({ request }: { request: Request }) {
	try {
		const body = await request.json();

		// Bots get the normal success reply, so they have no reason to retry or adapt,
		// but nothing reaches WordPress (no inbox entry, no notification email).
		const reason = botReason(body);
		if (reason) {
			console.info(`[contact] blocked automated submission: ${reason}`);
			return jsonResponse({
				success: true,
				message: 'Your message has been sent successfully. We will contact you soon!',
			});
		}

		// Forward exactly the fields WordPress expects; the bot-check fields stay here.
		const { name, email, phone, service, message } = body ?? {};
		const payload = { name, email, phone, service, message };

		const wpBase = getWpRootBase();
		const targetUrl = `${wpBase}/wp-json/mekan/v1/contact`;

		let upstream: Response;
		try {
			upstream = await fetch(targetUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch {
			return jsonResponse(
				{
					success: false,
					message: 'Cannot reach WordPress server. Make sure it is running and accessible.',
					targetUrl,
				},
				502
			);
		}

		const text = await upstream.text();
		let data: any = null;
		try {
			data = text ? JSON.parse(text) : null;
		} catch {
			return jsonResponse(
				{
					success: false,
					message: 'Unexpected response from WordPress endpoint.',
					status: upstream.status,
				},
				502
			);
		}

		return jsonResponse(data ?? { success: upstream.ok }, upstream.status);
	} catch (err) {
		return jsonResponse(
			{ success: false, message: err instanceof Error ? err.message : 'Failed to send message' },
			500
		);
	}
}
