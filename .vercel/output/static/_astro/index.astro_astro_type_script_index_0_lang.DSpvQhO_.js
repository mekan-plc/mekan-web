const x="http://localhost:8881".replace(/\/$/,""),d=document.getElementById("category-filters"),l=document.getElementById("resources-grid"),v=document.getElementById("resourcesError"),c=document.getElementById("active-filter"),f=document.getElementById("active-filter-name"),y=document.getElementById("clear-filter"),w=300*1e3,p="mekan_cache_v1:";function k(e){try{const o=sessionStorage.getItem(p+e);if(!o)return null;const r=JSON.parse(o);return!r||typeof r!="object"||typeof r.ts!="number"||Date.now()-r.ts>w?null:r.data??null}catch{return null}}function C(e,o){try{sessionStorage.setItem(p+e,JSON.stringify({ts:Date.now(),data:o}))}catch{}}function s(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function E(){l&&(l.innerHTML=Array.from({length:6}).map(()=>`<div class="resource-card group relative flex flex-col bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden">
					<div class="relative h-48 bg-[hsl(var(--muted))] animate-pulse"></div>
					<div class="relative p-6 space-y-3">
						<div class="h-4 w-4/5 bg-[hsl(var(--muted))] rounded animate-pulse"></div>
						<div class="h-3 w-full bg-[hsl(var(--muted))] rounded animate-pulse"></div>
						<div class="h-3 w-5/6 bg-[hsl(var(--muted))] rounded animate-pulse"></div>
					</div>
				</div>`).join(""))}function h(e){d&&(d.innerHTML=e.map((o,r)=>`<button class="category-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${r===0?"bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]":"bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--brand))] hover:text-[hsl(var(--brand-foreground))]"}" data-category="${s(o)}">${s(o)}</button>`).join(""))}function g(e){const o=e.imageUrl?`<img src="${s(e.imageUrl)}" alt="${s(e.title)}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />`:`<div class="text-6xl text-[hsl(var(--muted-foreground))]/30 transition-transform duration-500 group-hover:scale-110">${s(e.icon||"📄")}</div>`,r=Array.isArray(e.features)?e.features.map(t=>`<li class="flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))]"><svg class="w-4 h-4 text-[hsl(var(--brand))] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>${s(t)}</span></li>`).join(""):"",a=e.downloadUrl?`<a href="${s(e.downloadUrl)}" target="_blank" rel="noopener noreferrer" class="download-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] text-sm font-medium transition-all hover:bg-[hsl(var(--brand))]/90 hover:scale-105 hover:shadow-lg" download="${s(String(e.title||"resource").replace(/\s+/g,"_"))}.pdf"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Download PDF</a>`:'<span class="text-xs text-[hsl(var(--muted-foreground))]">No file available</span>';return`<div class="resource-card group relative flex flex-col bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[hsl(var(--brand))]/10 hover:border-[hsl(var(--brand))]/50 hover:-translate-y-2" data-category="${s(e.category||"General")}">
				<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--brand))]/0 via-[hsl(var(--brand))]/0 to-[hsl(var(--brand))]/0 opacity-0 transition-all duration-500 group-hover:from-[hsl(var(--brand))]/5 group-hover:via-[hsl(var(--brand))]/3 group-hover:to-[hsl(var(--brand))]/5 group-hover:opacity-100"></div>
				<div class="relative h-48 bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--card))] flex items-center justify-center overflow-hidden">
					${o}
					<div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-[hsl(var(--brand))]/90 text-[hsl(var(--brand-foreground))] text-xs font-medium">${s(e.category||"General")}</div>
					<div class="absolute top-4 right-4 px-2 py-1 rounded bg-red-500/90 text-white text-xs font-semibold">PDF</div>
				</div>
				<div class="relative p-6 flex flex-col flex-grow">
					<h3 class="text-lg font-semibold text-[hsl(var(--foreground))] transition-colors duration-300 group-hover:text-[hsl(var(--brand))]">${s(e.title||"")}</h3>
					<p class="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] flex-grow">${s(e.description||"")}</p>
					<div class="mt-4 pt-4 border-t border-[hsl(var(--border))]">
						<ul class="space-y-2">${r}</ul>
					</div>
					<div class="mt-6 flex items-center justify-between">
						<span class="text-xs text-[hsl(var(--muted-foreground))]">${s(e.fileSize||"")}</span>
						${a}
					</div>
				</div>
			</div>`}function m(){const e=document.querySelectorAll(".category-btn"),o=document.querySelectorAll(".resource-card");function r(a){e.forEach(t=>{t.dataset.category===a?(t.classList.remove("bg-[hsl(var(--muted))]","text-[hsl(var(--muted-foreground))]"),t.classList.add("bg-[hsl(var(--brand))]","text-[hsl(var(--brand-foreground))]")):(t.classList.remove("bg-[hsl(var(--brand))]","text-[hsl(var(--brand-foreground))]"),t.classList.add("bg-[hsl(var(--muted))]","text-[hsl(var(--muted-foreground))]"))}),o.forEach(t=>{a==="All"||t.dataset.category===a?(t.style.display="flex",t.style.opacity="1",t.style.transform="none",t.style.visibility="visible",t.style.animation="fadeIn 0.3s ease-out"):t.style.display="none"}),c&&f&&(a!=="All"?(c.classList.remove("hidden"),f.textContent=a):c.classList.add("hidden"))}e.forEach(a=>{a.addEventListener("click",()=>{r(a.dataset.category)})}),y?.addEventListener("click",()=>{r("All")})}async function S(){E();const e=k("resources:index");if(e&&Array.isArray(e)){const o=new Set(e.map(n=>n.category).filter(Boolean)),r=["Certification","Compliance","Sustainability","Strategy","Coffee","Finance"],a=Array.from(o),t=["All",...r.filter(n=>a.includes(n)),...a.filter(n=>!r.includes(n))];h(t),l&&(l.innerHTML=e.map(g).join("")),m()}try{const o=`${x}/wp-json/mekan/v1/resources?per_page=100`,r=await fetch(o,{headers:{Accept:"application/json"}});if(!r.ok)throw new Error("Failed to load resources.");const a=await r.json();if(!Array.isArray(a))throw new Error("Invalid resources response.");C("resources:index",a);const t=new Set(a.map(i=>i.category).filter(Boolean)),n=["Certification","Compliance","Sustainability","Strategy","Coffee","Finance"],u=Array.from(t),b=["All",...n.filter(i=>u.includes(i)),...u.filter(i=>!n.includes(i))];h(b),l&&(l.innerHTML=a.map(g).join("")),m()}catch{if(!e){const r=`
					<div class="col-span-full text-center py-16 px-4">
						<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center">
							<svg class="w-10 h-10 text-[hsl(var(--muted-foreground))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">Resources Coming Soon</h3>
						<p class="text-[hsl(var(--muted-foreground))] mb-6 max-w-md mx-auto">
							We're curating valuable resources for you. Check back soon for guides, templates, and industry insights!
						</p>
						<a href="/#contact" class="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] rounded-xl font-medium hover:opacity-90 transition-opacity">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							Contact Us
						</a>
					</div>
				`;l&&(l.innerHTML=r),v&&v.classList.add("hidden"),d&&d.parentElement.classList.add("hidden")}}}S();
