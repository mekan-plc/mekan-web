const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_CMS_BASE_URL": "http://localhost:8881", "PUBLIC_SITE_URL": "https://mekanplc.com", "SITE": undefined, "SSR": true};
const API_BASE = "http://localhost:8881/wp-json/wp/v2";
const CACHE_TTL_MS = Number(Object.assign(__vite_import_meta_env__, { WP_API_BASE: "http://localhost:8881/wp-json/wp/v2" })?.WP_CACHE_TTL_SECONDS || "60") * 1e3;
const cache = /* @__PURE__ */ new Map();
function getApiBase() {
  const base = API_BASE;
  return base.replace(/\/$/, "");
}
function getWpRootBase() {
  const apiBase = getApiBase();
  if (apiBase.endsWith("/wp/v2")) {
    return apiBase.slice(0, -"/wp/v2".length);
  }
  return apiBase;
}
async function cachedFetchJson(url) {
  if (CACHE_TTL_MS > 0) {
    const hit = cache.get(url);
    if (hit && hit.expiresAt > Date.now()) {
      return hit.value;
    }
  }
  console.log("[WP] Fetching:", url);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[WP] Error response:", res.status, text.slice(0, 200));
    throw new Error(`WordPress API failed (${res.status}): ${text.slice(0, 100)}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("[WP] Non-JSON response:", text.slice(0, 200));
    throw new Error("WordPress returned non-JSON response. Is the REST API enabled?");
  }
  const data = await res.json();
  if (CACHE_TTL_MS > 0) {
    cache.set(url, { value: data, expiresAt: Date.now() + CACHE_TTL_MS });
  }
  return data;
}
async function listBlogs(opts) {
  const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 10;
  const root = getWpRootBase();
  let url = `${root}/mekan/v1/blogs?per_page=${perPage}`;
  if (opts?.category) {
    url += `&category=${encodeURIComponent(opts.category)}`;
  }
  if (opts?.featured) {
    url += `&featured=1`;
  }
  const blogs = await cachedFetchJson(url);
  return { blogs, perPage };
}
async function getBlogBySlug(slug) {
  const root = getWpRootBase();
  const url = `${root}/mekan/v1/blogs/${encodeURIComponent(slug)}`;
  try {
    const blog = await cachedFetchJson(url);
    return blog;
  } catch {
    return null;
  }
}

export { getBlogBySlug as g, listBlogs as l };
