const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_CMS_BASE_URL": "http://localhost:8881", "PUBLIC_SITE_URL": "http://localhost:4321", "SITE": undefined, "SSR": true};
const prerender = false;
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function getWpRootBase() {
  const envAny = Object.assign(__vite_import_meta_env__, { WP_API_BASE: "http://localhost:8881/wp-json/wp/v2", WP_ROOT_BASE: "http://localhost:8881", OS: "Windows_NT", _: "C:/Program Files/nodejs/node.exe" }) || {};
  const explicit = envAny.WP_ROOT_BASE;
  if (explicit) return String(explicit).replace(/\/$/, "");
  const apiBase = envAny.WP_API_BASE;
  if (apiBase) {
    const base = String(apiBase).replace(/\/$/, "");
    if (base.endsWith("/wp-json/wp/v2")) return base.slice(0, -"/wp-json/wp/v2".length);
    if (base.endsWith("/wp-json/wp/v2/")) return base.slice(0, -"/wp-json/wp/v2/".length);
    if (base.endsWith("/wp-json/wp/v2")) return base.slice(0, -"/wp-json/wp/v2".length);
    if (base.endsWith("/wp-json")) return base.slice(0, -"/wp-json".length);
    return base;
  }
  return "http://127.0.0.1:8881";
}
async function POST({ request }) {
  try {
    const payload = await request.json();
    const wpBase = getWpRootBase();
    const targetUrl = `${wpBase}/wp-json/mekan/v1/contact`;
    let upstream;
    try {
      upstream = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch {
      return jsonResponse(
        {
          success: false,
          message: "Cannot reach WordPress server. Make sure it is running and accessible.",
          targetUrl
        },
        502
      );
    }
    const text = await upstream.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      return jsonResponse(
        {
          success: false,
          message: "Unexpected response from WordPress endpoint.",
          status: upstream.status
        },
        502
      );
    }
    return jsonResponse(data ?? { success: upstream.ok }, upstream.status);
  } catch (err) {
    return jsonResponse(
      { success: false, message: err instanceof Error ? err.message : "Failed to send message" },
      500
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
