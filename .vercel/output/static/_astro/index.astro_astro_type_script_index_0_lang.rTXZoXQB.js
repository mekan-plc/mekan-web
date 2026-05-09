const d="http://localhost:8881".replace(/\/$/,""),s=document.getElementById("projectsGrid"),l=document.getElementById("projectsError"),p=300*1e3,c="mekan_cache_v1:";function m(e){try{const r=sessionStorage.getItem(c+e);if(!r)return null;const t=JSON.parse(r);return!t||typeof t!="object"||typeof t.ts!="number"||Date.now()-t.ts>p?null:t.data??null}catch{return null}}function u(e,r){try{sessionStorage.setItem(c+e,JSON.stringify({ts:Date.now(),data:r}))}catch{}}function a(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(){s&&(s.innerHTML=Array.from({length:6}).map(()=>`<div class="card overflow-hidden">
					<div class="h-56 bg-[hsl(var(--muted))] animate-pulse"></div>
					<div class="p-6 space-y-3">
						<div class="h-3 w-2/3 bg-[hsl(var(--muted))] rounded animate-pulse"></div>
						<div class="h-4 w-4/5 bg-[hsl(var(--muted))] rounded animate-pulse"></div>
						<div class="h-3 w-full bg-[hsl(var(--muted))] rounded animate-pulse"></div>
						<div class="h-3 w-5/6 bg-[hsl(var(--muted))] rounded animate-pulse"></div>
					</div>
				</div>`).join(""))}function o(e){const r=e.imageUrl?`<img src="${a(e.imageUrl)}" alt="${a(e.title)}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />`:'<div class="text-7xl text-[hsl(var(--muted-foreground))]/20">📁</div>',t=Array.isArray(e.services)?e.services.map(n=>`<span class="text-xs px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">${a(n)}</span>`).join(""):"",i=Array.isArray(e.results)?e.results.map(n=>`<li class="flex items-start gap-2 text-sm"><span class="text-[hsl(var(--brand))]">✓</span><span>${a(n)}</span></li>`).join(""):"";return`<div class="card overflow-hidden transition-all hover:shadow-lg group">
				<div class="h-56 bg-[hsl(var(--muted))] flex items-center justify-center relative overflow-hidden">
					${r}
					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
				</div>
				<div class="p-6">
					<div class="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
						<span>${a(e.location||"")}</span>
						<span>•</span>
						<span>${a(e.duration||"")}</span>
					</div>
					<h3 class="mt-3 text-xl font-semibold group-hover:text-[hsl(var(--brand))] transition-colors">${a(e.title||"")}</h3>
					<p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">${a(e.client||"")}</p>
					<p class="mt-4 text-sm leading-relaxed text-[hsl(var(--foreground))]/80">${a(e.description||"")}</p>
					<div class="mt-4 flex flex-wrap gap-2">${t}</div>
					<div class="mt-6 pt-6 border-t border-[hsl(var(--border))]">
						<p class="text-xs font-medium text-[hsl(var(--brand))] uppercase tracking-wide mb-3">Key Results</p>
						<ul class="space-y-2">${i}</ul>
					</div>
				</div>
			</div>`}const f=[{title:"GLOBALG.A.P Certification for Sidama Coffee Cooperative",client:"Sidama Coffee Farmers Cooperative Union",location:"Sidama, Ethiopia",duration:"6 months",description:"Implemented comprehensive GLOBALG.A.P certification program for 2,400 smallholder coffee farmers, enabling access to premium European markets.",services:["Certification Support","Training","Audit Preparation"],results:["2400 farmers certified","€2M export contracts secured","30% price premium achieved"],imageUrl:null},{title:"Sesame Export Quality Improvement Program",client:"Ethiopian Sesame Exporters Association",location:"Humera & Wollega, Ethiopia",duration:"8 months",description:"Established quality control systems and export documentation processes for major sesame exporters targeting Middle Eastern and Asian markets.",services:["Quality Systems","Export Compliance","Market Access"],results:["98% export acceptance rate","Reduced rejection by 85%","3 new market channels"],imageUrl:null},{title:"Organic Certification Transition for Spice Exporters",client:"Green Earth Spices PLC",location:"Gondar & Bahir Dar, Ethiopia",duration:"12 months",description:"Guided organic certification transition for turmeric and ginger exporters, including farm mapping, documentation, and EU organic compliance.",services:["Organic Certification","Farm Mapping","EU Compliance"],results:["EU Organic certified","1500 hectares mapped","$1.2M new contracts"],imageUrl:null}];async function g(){v();const e=m("projects:index");e&&Array.isArray(e)&&s&&(s.innerHTML=e.map(o).join(""));try{const r=`${d}/wp-json/mekan/v1/projects?per_page=100`,t=await fetch(r,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error("Failed to load projects.");const i=await t.json();if(!Array.isArray(i))throw new Error("Invalid projects response.");u("projects:index",i),s&&(s.innerHTML=i.map(o).join(""))}catch{if(!e){const t=document.getElementById("staticBanner");t&&t.classList.remove("hidden"),s&&(s.innerHTML=f.map(o).join("")),l&&l.classList.add("hidden")}}}g();
