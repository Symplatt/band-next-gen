import{d as $,c as o,f as a,F as p,i as _,n as f,t as w,e as i,_ as x,r as z,p as C,k as S,m as E,o as M,b as P,h as L,q as N}from"./index-wCr1ikYA.js";const D={class:"sidebar"},R={class:"nav-list"},B=["onClick"],V={class:"label"},A=$({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(d){return(k,l)=>(i(),o("nav",D,[l[1]||(l[1]=a("div",{class:"nav-line"},null,-1)),a("ul",R,[(i(!0),o(p,null,_(d.navItems,(v,g)=>(i(),o("li",{key:g,class:f(["nav-item",{active:d.activeSection===v.id}]),onClick:u=>k.$emit("scrollTo",v.id)},[l[0]||(l[0]=a("span",{class:"dot"},null,-1)),a("span",V,w(v.label),1)],10,B))),128))])]))}}),F=x(A,[["__scopeId","data-v-2654a7c4"]]),H={class:"section-block"},O={class:"table-scroll-wrapper"},q={class:"call-table"},U={class:"header-avator"},W=["src","onLoad"],Y={class:"header-char"},G={class:"th-content"},j={class:"td-content"},J=["onMouseenter"],K={key:0,class:"call-content"},Q={class:"romaji"},X={key:1,class:"dash"},Z=$({__name:"CallTable",props:{memberList:{},callTable:{}},setup(d){const k=d,l="/band-next-gen/",v=z(new Set),g=s=>{if(!s)return"";const c=s.startsWith("/")?s.slice(1):s;return`${l}${c}`},u=s=>{v.value.add(s)},m=z(null),h=z(null),t=(s,c)=>{m.value=s,h.value=c},n=()=>{m.value=null,h.value=null},e=(s,c)=>k.callTable[s]?.[c]||"?";return(s,c)=>(i(),o("section",H,[c[3]||(c[3]=a("h2",{class:"section-title"},[a("span",null,"称呼表")],-1)),a("div",O,[a("table",q,[a("thead",null,[a("tr",U,[c[0]||(c[0]=a("th",{class:"fixed-col"},null,-1)),(i(!0),o(p,null,_(d.memberList,(r,y)=>(i(),o("th",{key:r.id},[a("img",{src:g(r.avatar),class:f(["avatar-square",{loaded:v.value.has(r.id)}]),loading:"lazy",onLoad:b=>u(r.id)},null,42,W)]))),128))]),c[2]||(c[2]=a("tr",{class:"header-group"},[a("th",{class:"fixed-col"},[a("span",{class:"group-label"},"所属乐队")]),a("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),a("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),a("th",{colspan:"1",class:"group-name other"},"Other")],-1)),a("tr",Y,[c[1]||(c[1]=a("th",{class:"corner-header fixed-col"},[a("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(i(!0),o(p,null,_(d.memberList,r=>(i(),o("th",{key:r.id,class:f({"highlight-col":h.value===r.id})},[a("div",G,w(r.name),1)],2))),128))])]),a("tbody",null,[(i(!0),o(p,null,_(d.memberList,(r,y)=>(i(),o("tr",{key:r.id},[a("td",{class:f(["row-header fixed-col",{"highlight-row":m.value===r.id}])},[a("div",j,w(r.name),1)],2),(i(!0),o(p,null,_(d.memberList,(b,I)=>(i(),o("td",{key:b.id,class:f(["cell",{active:m.value===r.id&&h.value===b.id,"cross-highlight":m.value===r.id||h.value===b.id,self:r.id===b.id,"bg-lilith":y<4&&I<4,"bg-gorai":y>=4&&I>=4}]),onMouseenter:Ta=>t(r.id,b.id),onMouseleave:n},[r.id!==b.id?(i(),o("div",K,[C(w(e(r.id,b.id).split(`
`)[0])+" ",1),a("span",Q,w(e(r.id,b.id).split(`
`)[1]||""),1)])):(i(),o("span",X,"—"))],42,J))),128))]))),128))])])])]))}}),aa=x(Z,[["__scopeId","data-v-646fdba7"]]),na={class:"section-block"},ea={class:"network-container desktop-only"},sa={class:"circle-layout"},ta={class:"lines-layer",viewBox:"0 0 500 500"},oa=["x1","y1","x2","y2"],ia=["onMouseenter"],ra={class:"node-circle"},la={class:"node-text"},ca=$({__name:"RelationNetwork",props:{memberList:{}},setup(d){const k=d,l=z(null),v=S(()=>{const t=[],n=k.memberList.map(e=>e.id);return n.forEach((e,s)=>{s<n.length-1&&t.push({source:e,target:n[s+1]}),s<n.length-2&&t.push({source:e,target:n[s+2]}),s===n.length-1&&t.push({source:e,target:n[0]})}),t}),g=t=>{const n=k.memberList.findIndex(y=>y.id===t);if(n===-1)return{x:250,y:250};const e=k.memberList.length,s=180,r=(360/e*n-90)*Math.PI/180;return{x:250+Math.cos(r)*s,y:250+Math.sin(r)*s}},u=(t,n)=>{const e=k.memberList[t];if(!e)return{};const s=g(e.id);return{left:`${s.x}px`,top:`${s.y}px`}},m=t=>{if(!l.value)return!0;const n=t===l.value,e=v.value.some(s=>s.source===l.value&&s.target===t||s.target===l.value&&s.source===t);return n||e},h=t=>l.value?t.source===l.value||t.target===l.value:!0;return(t,n)=>(i(),o("section",na,[n[2]||(n[2]=a("h2",{class:"section-title"},[a("span",null,"关系网")],-1)),a("div",ea,[n[1]||(n[1]=C(" 该模块正在制作中，当前仅演示初版效果： ",-1)),a("div",sa,[(i(),o("svg",ta,[(i(!0),o(p,null,_(v.value,(e,s)=>(i(),o("line",{key:s,x1:g(e.source).x,y1:g(e.source).y,x2:g(e.target).x,y2:g(e.target).y,class:f(["network-line",{dimmed:l.value&&!h(e),active:h(e)}])},null,10,oa))),128))])),(i(!0),o(p,null,_(d.memberList,(e,s)=>(i(),o("div",{key:e.id,class:f(["node-wrapper",{dimmed:l.value&&!m(e.id),active:l.value===e.id}]),style:E(u(s,d.memberList.length)),onMouseenter:c=>l.value=e.id,onMouseleave:n[0]||(n[0]=c=>l.value=null)},[a("div",ra,[a("span",la,w(e.name.slice(-1)),1)])],46,ia))),128))])]),n[3]||(n[3]=a("div",{class:"mobile-network-msg"},[a("p",null,"正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。")],-1))]))}}),ua=x(ca,[["__scopeId","data-v-c93faddf"]]),ma={class:"section-block"},da={class:"genealogy-grid"},ha={class:"parents-row"},va=["src"],ga={class:"name"},ka={class:"child-row"},pa=["src"],_a={class:"name"},ba=$({__name:"FamilyTree",props:{familyData:{}},setup(d){const k=d,l="/band-next-gen/",v=u=>{if(!u)return"";const m=u.startsWith("/")?u.slice(1):u;return`${l}${m}`},g=S(()=>k.familyData.map(u=>({...u,child:Array.isArray(u.child)?u.child:[u.child]})));return(u,m)=>(i(),o("section",ma,[m[1]||(m[1]=a("h2",{class:"section-title"},[a("span",null,"亲缘谱")],-1)),a("div",da,[(i(!0),o(p,null,_(g.value,(h,t)=>(i(),o("div",{key:t,class:"family-unit"},[a("div",ha,[(i(!0),o(p,null,_(h.mother,n=>(i(),o("div",{key:n.name,class:"parent-node"},[a("img",{src:v(n.avatar),class:"avatar-round",loading:"lazy"},null,8,va),a("span",ga,w(n.name),1)]))),128))]),a("div",{class:f(["connector",{"dashed-line":h.type==="adopt"}])},[...m[0]||(m[0]=[a("div",{class:"connector-top"},null,-1),a("div",{class:"connector-bottom"},null,-1)])],2),a("div",ka,[(i(!0),o(p,null,_(h.child,n=>(i(),o("div",{key:n.id,class:"child-node"},[a("img",{src:v(n.avatar),class:"avatar-round",loading:"lazy"},null,8,pa),a("span",_a,w(n.name),1)]))),128))])]))),128))])]))}}),fa=x(ba,[["__scopeId","data-v-545c174e"]]),wa=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],ya={hazuki:{riko:`莉子(同学)
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
oneesan/muna san`}},za=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{name:"八幡海铃",avatar:"images/avatar/umiri.png"},{name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{name:"长崎素世",avatar:"images/avatar/soyo.png"},{name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"},{child:{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},mother:[{name:"高松灯",avatar:"images/avatar/tomori.png"},{name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"}],T={characters:wa,callTable:ya,familyTree:za},$a={class:"relations-view"},xa={class:"page-container"},La=$({__name:"RelationsView",setup(d){const k=S(()=>T.characters.flatMap(t=>t.members)),l=T.callTable,v=T.familyTree,g=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],u=z("section-table"),m=t=>{u.value=t;const n=document.getElementById(t);if(n){const e=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),s=parseInt(e||"60"),r=n.getBoundingClientRect().top+window.pageYOffset-s-20;window.scrollTo({top:r,behavior:"smooth"})}},h=()=>{const n=window.scrollY;for(const e of g){const s=document.getElementById(e.id);if(s){if(window.innerWidth<=768&&e.id==="section-network")continue;const{offsetTop:c,offsetHeight:r}=s;n>=c-300&&n<c+r-300&&(u.value=e.id)}}};return M(()=>{window.addEventListener("scroll",h);const t=new IntersectionObserver(n=>{n.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),t.unobserve(e.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(n=>t.observe(n))},100)}),P(()=>{window.removeEventListener("scroll",h)}),(t,n)=>(i(),o("div",$a,[L(F,{navItems:g,activeSection:u.value,onScrollTo:m},null,8,["activeSection"]),a("div",xa,[L(aa,{id:"section-table",memberList:k.value,callTable:N(l)},null,8,["memberList","callTable"]),L(ua,{id:"section-network",memberList:k.value},null,8,["memberList"]),L(fa,{id:"section-family",familyData:N(v)},null,8,["familyData"])])]))}}),Ia=x(La,[["__scopeId","data-v-5876165b"]]);export{Ia as default};
