import { c as createComponent } from './astro-component_v2g3HnPa.mjs';
import 'piccolore';
import { l as createRenderInstruction, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderComponent, o as renderSlot, p as renderHead, u as unescapeHTML } from './entrypoint_iqnPl3Pl.mjs';
import 'clsx';
import { g as getBlogBySlug } from './wp_BS7XIf38.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", `<button type="button" id="theme-toggle" aria-label="Toggle theme" class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"> <span class="sr-only">Toggle theme</span> <svg id="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"> <circle cx="12" cy="12" r="4"></circle> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path> </svg> <svg id="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden h-4 w-4"> <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path> </svg> </button> <script>
	const STORAGE_KEY = 'theme';

	function getPreferredTheme() {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function setTheme(theme) {
		document.documentElement.classList.toggle('dark', theme === 'dark');
		const sun = document.getElementById('theme-icon-sun');
		const moon = document.getElementById('theme-icon-moon');
		if (sun && moon) {
			// Show opposite icon (the action you can take)
			sun.classList.toggle('hidden', theme === 'light');
			moon.classList.toggle('hidden', theme === 'dark');
		}
	}

	setTheme(getPreferredTheme());

	document.getElementById('theme-toggle')?.addEventListener('click', () => {
		const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
		localStorage.setItem(STORAGE_KEY, next);
		setTheme(next);
	});
<\/script>`])), maybeRenderHead());
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/components/ThemeToggle.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const { overlay = false } = Astro2.props;
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/resources", label: "Resources" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#blog", label: "Blogs" },
    { href: "/#contact", label: "Contact us" }
  ];
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<header id="site-header"', "", '> <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"> <a href="/" class="flex items-center gap-2 text-sm font-medium"> <img src="/logo1.2.png" alt="Mekan Consultancy" class="h-10 w-auto object-contain"> <span', '>\nMekan PLC\n</span> </a> <nav class="hidden items-center gap-6 text-sm font-semibold lg:flex"> ', ' </nav> <div class="flex items-center gap-3"> <button type="button" id="mobile-nav-toggle"', ' aria-label="Open navigation menu" aria-controls="mobile-nav" aria-expanded="false"> <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> </button> <a href="/#contact"', ">\nGet in touch\n</a> ", ' </div> </div> <nav id="mobile-nav"', '> <div class="mx-auto w-full max-w-6xl px-4 py-3"> <div class="flex flex-col gap-1 text-sm font-semibold"> ', " </div> </div> </nav> </header> <script>\n	(() => {\n		const header = document.getElementById('site-header');\n		if (!header) return;\n\n		const isOverlay = header.dataset.overlay === 'true';\n\n		const apply = () => {\n			const scrolled = window.scrollY > 8;\n			header.dataset.scrolled = scrolled ? 'true' : 'false';\n		};\n\n		const toggle = document.getElementById('mobile-nav-toggle');\n		const mobileNav = document.getElementById('mobile-nav');\n\n		const setMobileOpen = (open) => {\n			if (!toggle || !mobileNav) return;\n			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');\n			mobileNav.classList.toggle('hidden', !open);\n		};\n\n		apply();\n		window.addEventListener('scroll', apply, { passive: true });\n\n		if (toggle && mobileNav) {\n			let open = false;\n			setMobileOpen(open);\n\n			toggle.addEventListener('click', () => {\n				open = !open;\n				setMobileOpen(open);\n			});\n\n			mobileNav.addEventListener('click', (e) => {\n				const target = e.target;\n				if (target && target.closest && target.closest('a')) {\n					open = false;\n					setMobileOpen(open);\n				}\n			});\n		}\n	})();\n<\/script>"])), maybeRenderHead(), addAttribute(overlay ? "true" : "false", "data-overlay"), addAttribute(
    overlay ? "group fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent text-[hsl(var(--brand-foreground))] transition-all duration-300 data-[scrolled=true]:border-[hsl(var(--border))] data-[scrolled=true]:bg-[hsl(var(--background))]/95 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:shadow-sm data-[scrolled=true]:text-[hsl(var(--foreground))]" : "group sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 text-[hsl(var(--foreground))] backdrop-blur",
    "class"
  ), addAttribute(
    overlay ? "hidden lg:inline text-[hsl(var(--brand-foreground))] group-data-[scrolled=true]:text-[hsl(var(--foreground))] font-semibold" : "hidden lg:inline font-semibold",
    "class"
  ), links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(
    overlay ? "text-[hsl(var(--brand-foreground))] opacity-80 hover:opacity-100 group-data-[scrolled=true]:text-[hsl(var(--foreground))] group-data-[scrolled=true]:opacity-80 group-data-[scrolled=true]:hover:opacity-100" : "text-[hsl(var(--foreground))] opacity-80 hover:opacity-100",
    "class"
  )}> ${l.label} </a>`), addAttribute(
    overlay ? "inline-flex items-center justify-center rounded-md p-2 text-[hsl(var(--brand-foreground))] opacity-90 hover:opacity-100 group-data-[scrolled=true]:text-[hsl(var(--foreground))] lg:hidden" : "inline-flex items-center justify-center rounded-md p-2 text-[hsl(var(--foreground))] opacity-90 hover:opacity-100 lg:hidden",
    "class"
  ), addAttribute(
    overlay ? "hidden rounded-md border border-[hsl(var(--brand-border))] bg-[hsl(var(--brand))]/30 px-3 py-2 text-sm font-semibold text-[hsl(var(--brand-foreground))] group-data-[scrolled=true]:border-[hsl(var(--border))] group-data-[scrolled=true]:bg-[hsl(var(--primary))] group-data-[scrolled=true]:text-[hsl(var(--primary-foreground))] lg:inline-flex" : "hidden rounded-md bg-[hsl(var(--primary))] px-3 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] lg:inline-flex",
    "class"
  ), renderComponent($$result, "ThemeToggle", $$ThemeToggle, {}), addAttribute(
    overlay ? "hidden lg:hidden border-t border-white/10 bg-[hsl(var(--background))]/95 backdrop-blur-md" : "hidden lg:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md",
    "class"
  ), links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(
    overlay ? "rounded-md px-3 py-2 text-[hsl(var(--foreground))] opacity-90 hover:opacity-100 hover:bg-black/5" : "rounded-md px-3 py-2 text-[hsl(var(--foreground))] opacity-90 hover:opacity-100 hover:bg-black/5",
    "class"
  )}> ${l.label} </a>`));
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/components/Navbar.astro", void 0);

const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="cta" class="relative overflow-hidden bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]">  <div class="absolute inset-0 pointer-events-none">  <div class="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[30%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[40%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[60%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[70%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div> <div class="absolute left-[90%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--brand-foreground))]/[0.08] to-transparent"></div>  <div class="absolute top-[12%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> <div class="absolute top-[28%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> <div class="absolute top-[44%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> <div class="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> <div class="absolute top-[76%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> <div class="absolute top-[92%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-foreground))]/[0.05] to-transparent"></div> </div> <div class="relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28"> <div class="flex flex-col items-center text-center" data-aos="fade-up"> <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
Ready to grow your agribusiness?
</h2> <p class="text-lg md:text-xl text-[hsl(var(--brand-foreground))]/70 max-w-2xl mb-12">
Partner with Mekan Consultancy for expert guidance in sustainable agricultural development and strategic investment.
</p> <div class="flex flex-col sm:flex-row gap-4"> <a href="/#contact" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--brand-foreground))] px-8 py-4 text-base font-semibold text-[hsl(var(--brand))] transition-all hover:opacity-90 hover:scale-105 shadow-lg"> <span>Get started</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <a href="tel:+251911454671" class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[hsl(var(--brand-foreground))]/30 px-8 py-4 text-base font-semibold text-[hsl(var(--brand-foreground))] transition-all hover:bg-[hsl(var(--brand-foreground))]/10"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <span>Call us now</span> </a> </div> </div> </div> </section>`;
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/components/CTASection.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/resources", label: "Resources" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#blog", label: "Blogs" },
    { href: "/#contact", label: "Contact us" }
  ];
  const socialLinks = [
    { href: "https://www.instagram.com/digitalaksumite/", label: "Instagram", icon: "instagram" },
    { href: "https://www.linkedin.com/company/mekan-quality-management-training/", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:biniam@mekanplc.com", label: "Email", icon: "email" },
    { href: "https://web.facebook.com/mekanplc?checkpoint_src=any#", label: "Facebook", icon: "facebook" }
  ];
  const contactInfo = [
    { icon: "location", label: "Addis Ababa, Ethiopia" },
    { icon: "email", label: "biniam@mekanplc.com", href: "mailto:biniam@mekanplc.com" },
    { icon: "phone", label: "+251 911 454 671", href: "tel:+251911454671" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]"> <div class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-4">  <div class="space-y-4 sm:pr-4"> <div class="text-sm font-semibold tracking-tight">Mekan PLC</div> <img src="/logo.png" alt="Mekan Consultancy" class="h-12 w-auto object-contain"> <p class="text-sm text-[hsl(var(--brand-foreground))]/80">
Empowering sustainable growth in global agribusiness.
</p>  <div class="flex items-center gap-3 pt-2"> ${socialLinks.map((social) => renderTemplate`<a${addAttribute(social.href, "href")}${addAttribute(social.href.startsWith("mailto:") ? void 0 : "_blank", "target")}${addAttribute(social.href.startsWith("mailto:") ? void 0 : "noopener noreferrer", "rel")} class="flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--brand-foreground))]/20 text-[hsl(var(--brand-foreground))]/80 transition-all hover:border-[hsl(var(--brand-foreground))]/40 hover:text-[hsl(var(--brand-foreground))] hover:bg-[hsl(var(--brand-foreground))]/10"${addAttribute(social.label, "aria-label")}> ${social.icon === "instagram" && renderTemplate`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg>`} ${social.icon === "linkedin" && renderTemplate`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg>`} ${social.icon === "email" && renderTemplate`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>`} ${social.icon === "facebook" && renderTemplate`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg>`} </a>`)} </div> </div>  <div class="space-y-4"> <div class="text-sm font-semibold">Pages</div> <div class="grid gap-2 text-sm"> ${links.map((link) => renderTemplate`<a class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors"${addAttribute(link.href, "href")}>${link.label}</a>`)} </div> </div>  <div class="space-y-4 sm:col-span-2 lg:col-span-1"> <div class="text-sm font-semibold">Services</div> <div class="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1"> <a href="/services/quality-assurance" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Quality Assurance & Compliance</a> <a href="/services/agribusiness-development" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Agribusiness Development</a> <a href="/services/agricultural-productivity" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Productivity & Sustainability</a> <a href="/services/food-systems" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Food Systems & Climate Resilience</a> <a href="/services/global-standards" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Global Standards & Certifications</a> <a href="/services/investment-advisory" class="text-[hsl(var(--brand-foreground))]/80 hover:text-[hsl(var(--brand-foreground))] transition-colors">Investment Advisory</a> </div> </div>  <div class="space-y-4"> <div class="text-sm font-semibold">Contact</div> <div class="grid gap-3 text-sm"> ${contactInfo.map((item) => renderTemplate`<div class="flex items-center gap-2 text-[hsl(var(--brand-foreground))]/80"> ${item.icon === "location" && renderTemplate`<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg>`} ${item.icon === "email" && renderTemplate`<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>`} ${item.icon === "phone" && renderTemplate`<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg>`} ${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} class="hover:text-[hsl(var(--brand-foreground))] transition-colors">${item.label}</a>` : renderTemplate`<span>${item.label}</span>`} </div>`)} </div> </div> </div>  <div class="border-t border-[hsl(var(--brand-foreground))]/10"> <div class="mx-auto w-full max-w-6xl px-6 py-6 lg:px-4"> <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-between"> <div class="flex flex-wrap items-center justify-center gap-3"> <span class="text-xs text-[hsl(var(--brand-foreground))]/60">Built by</span> <a href="https://digitalaksumite.com" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-[hsl(var(--brand-foreground))] hover:opacity-80 transition-opacity">
Digital Aksumite
</a> <div class="flex items-center gap-2"> <a href="mailto:hello@digitalaksumite.com" class="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--brand-foreground))]/20 text-[hsl(var(--brand-foreground))]/70 transition-all hover:border-[hsl(var(--brand-foreground))]/40 hover:text-[hsl(var(--brand-foreground))] hover:bg-[hsl(var(--brand-foreground))]/10" aria-label="Email Digital Aksumite"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </a> <a href="https://www.instagram.com/digitalaksumite/" target="_blank" rel="noopener noreferrer" class="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--brand-foreground))]/20 text-[hsl(var(--brand-foreground))]/70 transition-all hover:border-[hsl(var(--brand-foreground))]/40 hover:text-[hsl(var(--brand-foreground))] hover:bg-[hsl(var(--brand-foreground))]/10" aria-label="Digital Aksumite Instagram"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg> </a> </div> </div> <div id="mekan-copyright" class="hidden lg:block text-xs text-[hsl(var(--brand-foreground))]/60">
© ${year} Mekan Consultancy. All rights reserved.
</div> <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-[hsl(var(--brand-foreground))]/60"> <a href="/privacy-policy" class="hover:text-[hsl(var(--brand-foreground))] transition-colors">Privacy Policy</a> <a href="/terms-of-service" class="hover:text-[hsl(var(--brand-foreground))] transition-colors">Terms of Service</a> </div> </div> </div> </div> </footer> ${renderScript($$result, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/components/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/components/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, canonical, overlayNav = false } = Astro2.props;
  const DEFAULT_TITLE = "Mekan PLC | Quality Management, Compliance & Training";
  const DEFAULT_DESCRIPTION = "Mekan PLC provides quality management consulting, compliance support, certification readiness, and training services for agribusiness and related sectors in Ethiopia.";
  Astro2.request?.url ? new URL(Astro2.request.url).origin : "";
  const siteUrl = "https://mekanplc.com".replace(/\/$/, "");
  const pageTitle = title ? title.includes("Mekan PLC") ? title : `${title} | Mekan PLC` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = (() => {
    if (!siteUrl) return void 0;
    if (canonical) return new URL(canonical, siteUrl).toString();
    return new URL(Astro2.url.pathname, siteUrl).toString();
  })();
  const ogImage = image || "/og-image.png";
  const ogImageUrl = siteUrl ? new URL(ogImage, siteUrl).toString() : ogImage;
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mekan PLC",
    url: siteUrl || void 0,
    logo: ogImageUrl,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "biniam@mekanplc.com",
        telephone: "+251911454671",
        availableLanguage: ["English"]
      }
    ]
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="icon" type="image/png" href="/logo1.2.png"><meta name="generator"', "><title>", '</title><meta name="description"', ">", '<meta name="robots" content="index,follow"><meta property="og:type" content="website"><meta property="og:site_name" content="Mekan PLC"><meta property="og:title"', '><meta property="og:description"', ">", '<meta property="og:image"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><script type="application/ld+json">', "</script><script>\n			(() => {\n				const STORAGE_KEY = 'theme';\n				const stored = localStorage.getItem(STORAGE_KEY);\n				const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n				const theme = stored === 'light' || stored === 'dark' ? stored : systemDark ? 'dark' : 'light';\n				document.documentElement.classList.toggle('dark', theme === 'dark');\n			})();\n		</script>", "</head> <body data-astro-cid-sckkx6r4> ", " <main data-astro-cid-sckkx6r4> ", " </main> ", " ", " <script>\n			// Load AOS (Animate On Scroll) - the industry standard\n			(function() {\n				// Load CSS\n				const aosCss = document.createElement('link');\n				aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';\n				aosCss.rel = 'stylesheet';\n				document.head.appendChild(aosCss);\n				\n				// Load JS\n				const script = document.createElement('script');\n				script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';\n				script.onload = function() {\n					AOS.init({\n						duration: 800,\n						easing: 'ease-out-cubic',\n						offset: 100,\n						delay: 0,\n						anchorPlacement: 'top-bottom',\n						startEvent: 'DOMContentLoaded',\n						animatedClassName: 'aos-animate',\n						mirror: false\n					});\n				};\n				document.head.appendChild(script);\n			})();\n		</script> </body> </html>"])), addAttribute(Astro2.generator, "content"), pageTitle, addAttribute(pageDescription, "content"), canonicalUrl ? renderTemplate`<link rel="canonical"${addAttribute(canonicalUrl, "href")}>` : null, addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), canonicalUrl ? renderTemplate`<meta property="og:url"${addAttribute(canonicalUrl, "content")}>` : null, addAttribute(ogImageUrl, "content"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(ogImageUrl, "content"), unescapeHTML(JSON.stringify(organizationLd)), renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "overlay": overlayNav, "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "CTASection", $$CTASection, { "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }));
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/layouts/Layout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return Astro2.redirect("/404", 404);
  }
  Astro2.request?.url ? new URL(Astro2.request.url).origin : "";
  const siteUrl = "https://mekanplc.com".replace(/\/$/, "");
  const pageUrl = siteUrl ? new URL(Astro2.url.pathname, siteUrl).toString() : Astro2.url.pathname;
  const imageUrl = blog.featuredImageUrl || (siteUrl ? new URL("/logo1.2.png", siteUrl).toString() : "/logo1.2.png");
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: imageUrl,
    url: pageUrl,
    datePublished: blog.date ? new Date(blog.date).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
    author: {
      "@type": "Organization",
      name: "Mekan PLC",
      url: siteUrl || void 0
    },
    publisher: {
      "@type": "Organization",
      name: "Mekan PLC",
      logo: {
        "@type": "ImageObject",
        url: siteUrl ? new URL("/logo1.2.png", siteUrl).toString() : "/logo1.2.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": blog.title, "description": (blog.excerpt || "").slice(0, 160), "overlayNav": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "</script> ", '<div class="min-h-screen bg-[hsl(var(--background))]">  <section class="relative text-white overflow-hidden"> <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"', '></div> <div class="absolute inset-0 bg-[#0F2C59]/90"></div> <div class="relative container pt-32 pb-20">  <nav class="flex items-center gap-2 text-sm text-white/70 mb-6"> <a href="/" class="hover:text-white transition-colors flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg>\nHome\n</a> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> <a href="/blog" class="hover:text-white transition-colors">Blog</a> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> <span class="text-white font-medium truncate max-w-[200px]">', '</span> </nav>  <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 max-w-3xl">', '</h1>  <div class="mb-4"> <span class="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/20"> ', ' </span> </div>  <div class="flex items-center gap-4 text-sm text-white/70"> <div class="flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <span>', '</span> </div> <span>•</span> <span>5 min read</span> </div> </div> </section>  <section class="py-12 md:py-16"> <div class="container"> <div class="max-w-4xl mx-auto">  <div', '> <div class="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-[hsl(var(--muted))]"> <img', "", ' class="w-full h-full object-cover" loading="eager">  <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div> </div> </div> <div class="grid gap-8 lg:grid-cols-[1fr,280px]">  <div>  <div class="relative rounded-2xl bg-slate-100 dark:bg-[#1F2937] p-6 md:p-8 mb-8 overflow-hidden"> <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#0F2C59] dark:bg-[#7EA2CE]"></div> <div class="relative"> <div class="flex items-center gap-2 mb-3"> <svg class="w-5 h-5 text-[#0F2C59] dark:text-[#7EA2CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="text-sm font-semibold text-[#0F2C59] dark:text-[#7EA2CE] uppercase tracking-wide">Summary</span> </div> <p class="text-lg text-slate-700 dark:text-white/90 leading-relaxed italic">', '</p> </div> </div>  <article class="prose prose-lg max-w-none \n								prose-headings:text-[hsl(var(--foreground))] \n								prose-headings:font-semibold\n								prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4\n								prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3\n								prose-p:text-[hsl(var(--muted-foreground))] prose-p:leading-relaxed\n								prose-li:text-[hsl(var(--muted-foreground))]\n								prose-strong:text-[hsl(var(--foreground))] prose-strong:font-semibold\n								prose-a:text-[hsl(var(--brand))] prose-a:no-underline hover:prose-a:underline\n								prose-blockquote:border-l-4 prose-blockquote:border-[hsl(var(--brand))] prose-blockquote:bg-[hsl(var(--muted))] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg\n								prose-img:rounded-xl prose-img:shadow-lg"> <div>', '</div> </article>  <div class="mt-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1F2937] dark:to-[#111827] p-6 md:p-8 border border-slate-200 dark:border-gray-700 shadow-sm"> <div class="flex items-center gap-3 mb-5"> <div class="w-10 h-10 rounded-xl bg-[#0F2C59]/10 dark:bg-[#7EA2CE]/20 flex items-center justify-center"> <svg class="w-5 h-5 text-[#0F2C59] dark:text-[#7EA2CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path> </svg> </div> <h3 class="font-semibold text-[hsl(var(--foreground))]">Share this article</h3> </div> <div class="grid grid-cols-3 gap-3"> <a id="shareLinkedIn" href="#" target="_blank" rel="noopener noreferrer" class="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] border border-slate-200 dark:border-gray-600 hover:border-[#0077b5] transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Share on LinkedIn"> <svg class="w-6 h-6 text-[#0077b5] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg> <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">LinkedIn</span> </a> <a id="shareTwitter" href="#" target="_blank" rel="noopener noreferrer" class="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-[#1DA1F2] dark:hover:bg-[#1DA1F2] border border-slate-200 dark:border-gray-600 hover:border-[#1DA1F2] transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Share on Twitter"> <svg class="w-6 h-6 text-[#1DA1F2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path> </svg> <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">Twitter</span> </a> <a id="shareFacebook" href="#" target="_blank" rel="noopener noreferrer" class="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-[#4267B2] dark:hover:bg-[#4267B2] border border-slate-200 dark:border-gray-600 hover:border-[#4267B2] transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Share on Facebook"> <svg class="w-6 h-6 text-[#4267B2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">Facebook</span> </a> </div> </div>  <div class="mt-10 flex items-center justify-between"> <a href="/blog" class="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[hsl(var(--muted))] hover:bg-[hsl(var(--brand))] text-[hsl(var(--foreground))] hover:text-[hsl(var(--brand-foreground))] transition-all duration-300 font-medium"> <span class="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </span> <span>Back to all blogs</span> </a> </div> </div>  <aside class="hidden lg:block"> <div class="sticky top-24">  <div class="rounded-2xl bg-gradient-to-br from-[#0F2C59] to-[#1a3a6e] dark:from-[#1a3a6e] dark:to-[#0F2C59] p-6 text-white shadow-lg relative overflow-hidden">  <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div> <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div> <div class="relative"> <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </div> <h3 class="font-bold text-lg mb-2">Need Expert Help?</h3> <p class="text-sm text-white/80 mb-5 leading-relaxed">Our consultants can help you implement these strategies in your business.</p> <a href="/#contact" class="inline-flex items-center gap-2 text-sm font-semibold bg-white text-[#0F2C59] px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">\nContact Us\n<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </div> </aside> </div> </div> </div> </section>  <section id="relatedSection" class="hidden py-16 bg-[hsl(var(--muted))]"> <div class="container"> <div class="max-w-4xl mx-auto"> <h2 class="text-2xl font-bold mb-8 text-[hsl(var(--foreground))]">Related Articles</h2> <div id="relatedGrid" class="grid gap-6 md:grid-cols-2"></div> </div> </div> </section> </div> '])), unescapeHTML(JSON.stringify(blogPostingLd)), maybeRenderHead(), addAttribute(`background-image: url('${blog.featuredImageUrl || "/logo.png"}');`, "style"), blog.title, blog.title, blog.category || "Blog", blog.date, addAttribute(["mb-10", !blog.imageUrl && "hidden"], "class:list"), addAttribute(blog.imageUrl, "src"), addAttribute(blog.title, "alt"), blog.excerpt, unescapeHTML(blog.content)) })} ${renderScript($$result, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/pages/blog/[slug].astro", void 0);
const $$file = "C:/Users/Biniam/Desktop/Biniam/Biniam Projects/Mekan/mekan-web/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
