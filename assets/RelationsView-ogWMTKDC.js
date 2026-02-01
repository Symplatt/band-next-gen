import{S as V}from"./SpecialNoteBox-DYmfANTt.js";import{d as S,c as o,f as a,F as y,j as $,n as z,t as T,e as i,_ as I,r as w,o as R,b as P,v as A,l as N,a as O,q as F,s as M,p as H,u as W,h as x}from"./index-BpYmnFin.js";const Y={class:"sidebar"},U={class:"nav-list"},j=["onClick"],q={class:"label"},G=S({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(v){return(k,h)=>(i(),o("nav",Y,[h[1]||(h[1]=a("div",{class:"nav-line"},null,-1)),a("ul",U,[(i(!0),o(y,null,$(v.navItems,(n,p)=>(i(),o("li",{key:p,class:z(["nav-item",{active:v.activeSection===n.id}]),onClick:_=>k.$emit("scrollTo",n.id)},[h[0]||(h[0]=a("span",{class:"dot"},null,-1)),a("span",q,T(n.label),1)],10,j))),128))])]))}}),X=I(G,[["__scopeId","data-v-2654a7c4"]]),Z=S({__name:"SectionTitle",props:{title:{}},setup(v){const k=w(null),h=w(!1);let n=null;return R(()=>{n=new IntersectionObserver(p=>{p[0]?.isIntersecting&&(h.value=!0,k.value&&n&&n.unobserve(k.value))},{threshold:.2}),k.value&&n.observe(k.value)}),P(()=>{n&&n.disconnect()}),(p,_)=>(i(),o("h2",{ref_key:"titleRef",ref:k,class:z(["section-title",{visible:h.value}])},[a("span",null,T(v.title),1)],2))}}),C=I(Z,[["__scopeId","data-v-316c9169"]]),J={class:"section-block"},K={class:"table-scroll-wrapper"},Q={class:"call-table"},aa={class:"header-avator"},ea=["src","onLoad"],na={class:"header-char"},ta={class:"th-content"},sa={class:"td-content"},oa=["onMouseenter"],ia={key:0,class:"call-content"},ra={class:"romaji"},la={key:1,class:"dash"},ca=S({__name:"CallTable",props:{memberList:{},callTable:{}},setup(v){const k=v,h="/band-next-gen/",n=w(new Set),p=l=>{if(!l)return"";const t=l.startsWith("/")?l.slice(1):l;return`${h}${t}`},_=l=>{n.value.add(l)},g=w(null),b=w(null),u=(l,t)=>{g.value=l,b.value=t},m=()=>{g.value=null,b.value=null},d=(l,t)=>k.callTable[l]?.[t]||"?";return(l,t)=>(i(),o("section",J,[a("div",K,[a("table",Q,[a("thead",null,[a("tr",aa,[t[0]||(t[0]=a("th",{class:"fixed-col"},null,-1)),(i(!0),o(y,null,$(v.memberList,(r,s)=>(i(),o("th",{key:r.id},[a("img",{src:p(r.avatar),class:z(["avatar-square",{loaded:n.value.has(r.id)}]),loading:"lazy",onLoad:e=>_(r.id)},null,42,ea)]))),128))]),t[2]||(t[2]=a("tr",{class:"header-group"},[a("th",{class:"fixed-col"},[a("span",{class:"group-label"},"所属乐队")]),a("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),a("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),a("th",{colspan:"1",class:"group-name other"},"Other")],-1)),a("tr",na,[t[1]||(t[1]=a("th",{class:"corner-header fixed-col"},[a("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(i(!0),o(y,null,$(v.memberList,r=>(i(),o("th",{key:r.id,class:z({"highlight-col":b.value===r.id})},[a("div",ta,T(r.name),1)],2))),128))])]),a("tbody",null,[(i(!0),o(y,null,$(v.memberList,(r,s)=>(i(),o("tr",{key:r.id},[a("td",{class:z(["row-header fixed-col",{"highlight-row":g.value===r.id}])},[a("div",sa,T(r.name),1)],2),(i(!0),o(y,null,$(v.memberList,(e,c)=>(i(),o("td",{key:e.id,class:z(["cell",{active:g.value===r.id&&b.value===e.id,"cross-highlight":g.value===r.id||b.value===e.id,self:r.id===e.id,"bg-lilith":s<4&&c<4,"bg-gorai":s>=4&&c>=4}]),onMouseenter:f=>u(r.id,e.id),onMouseleave:m},[r.id!==e.id?(i(),o("div",ia,[A(T(d(r.id,e.id).split(`
`)[0])+" ",1),a("span",ra,T(d(r.id,e.id).split(`
`)[1]||""),1)])):(i(),o("span",la,"—"))],42,oa))),128))]))),128))])])])]))}}),ua=I(ca,[["__scopeId","data-v-cd7f579b"]]),da={class:"section-block"},ma={class:"network-container"},ha=["viewBox"],va=["x1","y1","x2","y2"],ka=["onMouseenter"],ga={class:"node-circle"},pa=["src","alt"],L=500,_a=S({__name:"RelationNetwork",props:{memberList:{}},setup(v){const k=v,h=N(()=>k.memberList.slice(0,8)),n=w(null),p=w(null),_=w(1),g=w(0),b=w(0),u=()=>{if(!p.value)return;const s=p.value.getBoundingClientRect(),e=Math.min(s.width,s.height);_.value=e/L,g.value=(s.width-e)/2,b.value=(s.height-e)/2};R(()=>{u(),window.addEventListener("resize",u)}),O(()=>{window.removeEventListener("resize",u)});const m=N(()=>{const s=[],e=h.value.map(c=>c.id);return e.forEach((c,f)=>{f<e.length-1&&s.push({source:c,target:e[f+1]||""}),f<e.length-2&&s.push({source:c,target:e[f+2]||""}),f===e.length-1&&s.push({source:c,target:e[0]||""})}),s}),d=s=>{const e=h.value.findIndex(D=>D.id===s);if(e===-1)return{x:L/2,y:L/2};const c=h.value.length,f=L*.38,B=(360/c*e-90)*Math.PI/180;return{x:L/2+Math.cos(B)*f,y:L/2+Math.sin(B)*f}},l=s=>{const e=d(s);return{left:`${e.x*_.value+g.value}px`,top:`${e.y*_.value+b.value}px`}},t=s=>n.value?s===n.value||m.value.some(e=>e.source===n.value&&e.target===s||e.target===n.value&&e.source===s):!0,r=s=>n.value?s.source===n.value||s.target===n.value:!0;return(s,e)=>(i(),o("section",da,[a("div",ma,[a("div",{ref_key:"containerRef",ref:p,class:"circle-layout"},[(i(),o("svg",{class:"lines-layer",viewBox:`0 0 ${L} ${L}`,preserveAspectRatio:"xMidYMid meet"},[(i(!0),o(y,null,$(m.value,(c,f)=>(i(),o("line",{key:f,x1:d(c.source).x,y1:d(c.source).y,x2:d(c.target).x,y2:d(c.target).y,class:z(["network-line",{dimmed:n.value&&!r(c),active:r(c)}])},null,10,va))),128))],8,ha)),(i(!0),o(y,null,$(h.value,c=>(i(),o("div",{key:c.id,class:z(["node-wrapper",{dimmed:n.value&&!t(c.id),active:n.value===c.id}]),style:F(l(c.id)),onMouseenter:f=>n.value=c.id,onMouseleave:e[0]||(e[0]=f=>n.value=null)},[a("div",ga,[a("img",{src:M(H)(c.avatar),alt:c.name.slice(-1),class:"node-avatar"},null,8,pa)])],46,ka))),128))],512)])]))}}),fa=I(_a,[["__scopeId","data-v-7d144ece"]]),ba={class:"section-block"},wa={class:"genealogy-grid"},ya={class:"parents-row"},$a=["onClick"],za=["src"],xa={class:"name"},La={class:"child-row"},Ta=["onClick"],Sa=["src"],Ia={class:"name"},Na=S({__name:"FamilyTree",props:{familyData:{}},setup(v){const k=v,h=W(),n="/band-next-gen/",p=u=>{const m=["若叶睦","祐天寺若麦"];return u.mother[0].name in m},_=u=>{if(!u)return"";const m=u.startsWith("/")?u.slice(1):u;return`${n}${m}`},g=u=>{u&&h.push({name:"char-detail",params:{id:u}})},b=N(()=>k.familyData.map(u=>({...u,child:Array.isArray(u.child)?u.child:[u.child]})));return(u,m)=>(i(),o("section",ba,[a("div",wa,[(i(!0),o(y,null,$(b.value,(d,l)=>(i(),o("div",{key:l,class:z(["family-unit",{"special-unit":p(d)}])},[a("div",ya,[(i(!0),o(y,null,$(d.mother,t=>(i(),o("div",{key:t.name,class:"parent-node interactive-node",onClick:r=>g(t.id)},[a("img",{src:_(t.avatar),class:"avatar-round",loading:"lazy"},null,8,za),a("span",xa,T(t.name),1)],8,$a))),128))]),a("div",{class:z(["connector",{"dashed-line":d.type==="adopt"}])},[...m[0]||(m[0]=[a("div",{class:"connector-top"},null,-1),a("div",{class:"connector-bottom"},null,-1)])],2),a("div",La,[(i(!0),o(y,null,$(d.child,t=>(i(),o("div",{key:t.id,class:"child-node interactive-node",onClick:r=>g(t.id)},[a("img",{src:_(t.avatar),class:"avatar-round",loading:"lazy"},null,8,Sa),a("span",Ia,T(t.name),1)],8,Ta))),128))])],2))),128))])]))}}),Ca=I(Na,[["__scopeId","data-v-8f9a6ce2"]]),Ea=[{groupName:"Ex_Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],Ma={hazuki:{riko:`莉子(同学)
riko (san)`,ameha:`天叶
ameha`,wakaho:`若穗
wakaho`,mirei:`小美铃
mirei chan`,shizuku:`小雫
shizuku chan`,anna:`小杏奈
anna chan`,muna:`小梦那
muna chan`,sora:`小空
sora chan`},riko:{hazuki:`丰川/羽月 同学
togawa/hazuki san`,ameha:`天叶
ameha`,wakaho:`若穗
wakaho`,mirei:`喂/美铃
mirei`,shizuku:`雫雫
ルル ruru`,anna:`小安
ann chan`,muna:`若叶同学
wakaba san`,sora:`小空
sora chan`},ameha:{hazuki:`小羽月
hazuki chan`,riko:`莉子/小莉子
riko/koriko`,wakaho:`若
waka`,mirei:`小美铃
mirei chan`,shizuku:`雫雫
ルル ruru chan`,anna:`小杏奈
anna chan`,muna:`小梦那
muna chan`,sora:`小空
sora chan`},wakaho:{hazuki:`月
zuki`,riko:`莉子
riko`,ameha:`天
ame`,mirei:`美铃铃
mirin`,shizuku:`雫雫
ルル ruru`,anna:`杏奈
anna`,muna:`梦那
muna`,sora:`小空
sora chan`},shizuku:{hazuki:`小月
zuki chan`,riko:`姐姐/莉子
neesan/riko`,ameha:`小天
ame chan`,wakaho:`小若
waka chan`,mirei:`美铃铃
mirin chan`,anna:`小安
ann chan`,muna:`小猫
nyanko chan`,sora:`小空
sora chan`},mirei:{hazuki:`羽月姐姐
hazuki san`,riko:`莉子/姐姐
koriko/nee`,ameha:`天叶
ameha chan`,wakaho:`小若穗
wakaho chan`,shizuku:`雫雫
ルル ruru`,anna:`小安
ann`,muna:`梦那
muna`,sora:`小空
sora chan`},anna:{hazuki:`羽月姐姐
hazuki san`,riko:`姐姐/莉子姐姐
oneesan/riko san`,ameha:`天叶
ameha chan`,wakaho:`小若穗
wakaho chan`,shizuku:`雫雫
ルル ruru chan`,mirei:`美铃
mirin`,muna:`小梦那
muna chan`,sora:`小空
sora chan`},muna:{hazuki:`羽月姐姐
hazuki san`,riko:`姐姐/莉子姐姐
oneesan/riko san`,ameha:`天姐
ame nee`,wakaho:`若姐
waka nee`,shizuku:`小雫
shizuku chan`,mirei:`美子
mi ko`,anna:`杏子
ann ko`,sora:`小空
sora chan`},sora:{hazuki:`姐姐/羽月姐姐
oneesan/hazuki san`,riko:`姐姐/莉子姐姐
oneesan/riko san`,ameha:`姐姐/天叶姐姐
oneesan/ameha san`,wakaho:`姐姐/若穗姐姐
oneesan/wakaho san`,shizuku:`雫雫
ルル ruru chan`,mirei:`姐姐/美铃姐姐
oneesan/mirei san`,anna:`姐姐
neesan`,muna:`姐姐/梦那姐姐
oneesan/muna san`}},Ra=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{id:"sakiko",name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{id:"uika",name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{id:"nyamu",name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{id:"mutsumi",name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"}],mother:[{id:"tomori",name:"高松灯",avatar:"images/avatar/tomori.png"},{id:"rana",name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{id:"umiri",name:"八幡海铃",avatar:"images/avatar/umiri.png"},{id:"rikki",name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{id:"soyo",name:"长崎素世",avatar:"images/avatar/soyo.png"},{id:"anon",name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"}],E={characters:Ea,callTable:Ma,familyTree:Ra},Ba={class:"relations-view"},Pa={class:"page-container"},Da={id:"section-table"},Va={id:"section-network"},Aa={id:"section-family"},Oa=S({__name:"RelationsView",setup(v){const k=["本页面所展示的立绘皆截取自鹤星发布于各平台的作品","点击亲缘谱中的头像可进入个人详情页"],h=N(()=>E.characters.flatMap(m=>m.members)),n=E.callTable,p=E.familyTree,_=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],g=w("section-table"),b=m=>{g.value=m;const d=document.getElementById(m);if(d){const l=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),t=parseInt(l||"60"),s=d.getBoundingClientRect().top+window.pageYOffset-t+40;window.scrollTo({top:s,behavior:"smooth"})}},u=()=>{const d=window.scrollY;for(const l of _){const t=document.getElementById(l.id);if(t){if(window.innerWidth<=768&&l.id==="section-network")continue;const{offsetTop:r,offsetHeight:s}=t;d>=r-300&&d<r+s-300&&(g.value=l.id)}}};return R(()=>{window.addEventListener("scroll",u);const m=new IntersectionObserver(d=>{d.forEach(l=>{l.isIntersecting&&(l.target.classList.add("visible"),m.unobserve(l.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(d=>m.observe(d))},100)}),P(()=>{window.removeEventListener("scroll",u)}),(m,d)=>{const l=V;return i(),o("div",Ba,[x(X,{navItems:_,activeSection:g.value,onScrollTo:b},null,8,["activeSection"]),a("div",Pa,[a("section",Da,[x(C,{title:"称呼表"}),x(ua,{memberList:h.value,callTable:M(n)},null,8,["memberList","callTable"])]),a("section",Va,[x(C,{title:"关系网",class:"relation-network"}),x(fa,{memberList:h.value},null,8,["memberList"])]),a("section",Aa,[x(C,{title:"亲缘谱"}),x(Ca,{familyData:M(p)},null,8,["familyData"])]),x(l,{class:"special-note-box","note-content":k})])])}}}),Ya=I(Oa,[["__scopeId","data-v-2dbf46c8"]]);export{Ya as default};
