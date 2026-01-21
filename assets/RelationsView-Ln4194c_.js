import{d as y,c as o,f as e,F as k,i as p,n as f,t as b,e as i,_ as w,r as x,p as I,k as T,m as N,o as C,b as E,h as $,q as S}from"./index-C_BZ5ioP.js";const M={class:"sidebar"},P={class:"nav-list"},D=["onClick"],R={class:"label"},B=y({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(u){return(h,r)=>(i(),o("nav",M,[r[1]||(r[1]=e("div",{class:"nav-line"},null,-1)),e("ul",P,[(i(!0),o(k,null,p(u.navItems,(v,c)=>(i(),o("li",{key:c,class:f(["nav-item",{active:u.activeSection===v.id}]),onClick:l=>h.$emit("scrollTo",v.id)},[r[0]||(r[0]=e("span",{class:"dot"},null,-1)),e("span",R,b(v.label),1)],10,D))),128))])]))}}),V=w(B,[["__scopeId","data-v-2654a7c4"]]),A={class:"section-block"},F={class:"table-scroll-wrapper"},H={class:"call-table"},O={class:"header-avator"},q=["src"],U={class:"header-char"},W={class:"th-content"},Y={class:"td-content"},G=["onMouseenter"],j={key:0,class:"call-content"},J={class:"romaji"},K={key:1,class:"dash"},Q=y({__name:"CallTable",props:{memberList:{},callTable:{}},setup(u){const h=u,r="/band-next-gen/",v=a=>{if(!a)return"";const n=a.startsWith("/")?a.slice(1):a;return`${r}${n}`},c=x(null),l=x(null),d=(a,n)=>{c.value=a,l.value=n},g=()=>{c.value=null,l.value=null},t=(a,n)=>h.callTable[a]?.[n]||"?";return(a,n)=>(i(),o("section",A,[n[3]||(n[3]=e("h2",{class:"section-title"},[e("span",null,"称呼表")],-1)),e("div",F,[e("table",H,[e("thead",null,[e("tr",O,[n[0]||(n[0]=e("th",{class:"fixed-col"},null,-1)),(i(!0),o(k,null,p(u.memberList,s=>(i(),o("th",{key:s.id},[e("img",{src:v(s.avatar),class:"avatar-square",loading:"lazy"},null,8,q)]))),128))]),n[2]||(n[2]=e("tr",{class:"header-group"},[e("th",{class:"fixed-col"},[e("span",{class:"group-label"},"所属乐队")]),e("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),e("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),e("th",{colspan:"1",class:"group-name other"},"Other")],-1)),e("tr",U,[n[1]||(n[1]=e("th",{class:"corner-header fixed-col"},[e("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(i(!0),o(k,null,p(u.memberList,s=>(i(),o("th",{key:s.id,class:f({"highlight-col":l.value===s.id})},[e("div",W,b(s.name),1)],2))),128))])]),e("tbody",null,[(i(!0),o(k,null,p(u.memberList,(s,_)=>(i(),o("tr",{key:s.id},[e("td",{class:f(["row-header fixed-col",{"highlight-row":c.value===s.id}])},[e("div",Y,b(s.name),1)],2),(i(!0),o(k,null,p(u.memberList,(m,z)=>(i(),o("td",{key:m.id,class:f(["cell",{active:c.value===s.id&&l.value===m.id,"cross-highlight":c.value===s.id||l.value===m.id,self:s.id===m.id,"bg-lilith":_<4&&z<4,"bg-gorai":_>=4&&z>=4}]),onMouseenter:xa=>d(s.id,m.id),onMouseleave:g},[s.id!==m.id?(i(),o("div",j,[I(b(t(s.id,m.id).split(`
`)[0])+" ",1),e("span",J,b(t(s.id,m.id).split(`
`)[1]||""),1)])):(i(),o("span",K,"—"))],42,G))),128))]))),128))])])])]))}}),X=w(Q,[["__scopeId","data-v-98b4230c"]]),Z={class:"section-block"},aa={class:"network-container desktop-only"},na={class:"circle-layout"},ea={class:"lines-layer",viewBox:"0 0 500 500"},sa=["x1","y1","x2","y2"],ta=["onMouseenter"],oa={class:"node-circle"},ia={class:"node-text"},ra=y({__name:"RelationNetwork",props:{memberList:{}},setup(u){const h=u,r=x(null),v=T(()=>{const t=[],a=h.memberList.map(n=>n.id);return a.forEach((n,s)=>{s<a.length-1&&t.push({source:n,target:a[s+1]}),s<a.length-2&&t.push({source:n,target:a[s+2]}),s===a.length-1&&t.push({source:n,target:a[0]})}),t}),c=t=>{const a=h.memberList.findIndex(z=>z.id===t);if(a===-1)return{x:250,y:250};const n=h.memberList.length,s=180,m=(360/n*a-90)*Math.PI/180;return{x:250+Math.cos(m)*s,y:250+Math.sin(m)*s}},l=(t,a)=>{const n=h.memberList[t];if(!n)return{};const s=c(n.id);return{left:`${s.x}px`,top:`${s.y}px`}},d=t=>{if(!r.value)return!0;const a=t===r.value,n=v.value.some(s=>s.source===r.value&&s.target===t||s.target===r.value&&s.source===t);return a||n},g=t=>r.value?t.source===r.value||t.target===r.value:!0;return(t,a)=>(i(),o("section",Z,[a[2]||(a[2]=e("h2",{class:"section-title"},[e("span",null,"关系网")],-1)),e("div",aa,[a[1]||(a[1]=I(" 该模块正在制作中，当前仅演示初版效果： ",-1)),e("div",na,[(i(),o("svg",ea,[(i(!0),o(k,null,p(v.value,(n,s)=>(i(),o("line",{key:s,x1:c(n.source).x,y1:c(n.source).y,x2:c(n.target).x,y2:c(n.target).y,class:f(["network-line",{dimmed:r.value&&!g(n),active:g(n)}])},null,10,sa))),128))])),(i(!0),o(k,null,p(u.memberList,(n,s)=>(i(),o("div",{key:n.id,class:f(["node-wrapper",{dimmed:r.value&&!d(n.id),active:r.value===n.id}]),style:N(l(s,u.memberList.length)),onMouseenter:_=>r.value=n.id,onMouseleave:a[0]||(a[0]=_=>r.value=null)},[e("div",oa,[e("span",ia,b(n.name.slice(-1)),1)])],46,ta))),128))])]),a[3]||(a[3]=e("div",{class:"mobile-network-msg"},[e("p",null,"正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。")],-1))]))}}),la=w(ra,[["__scopeId","data-v-c93faddf"]]),ca={class:"section-block"},ua={class:"genealogy-grid"},ma={class:"parents-row"},da=["src"],ha={class:"name"},va={class:"child-row"},ga=["src"],ka={class:"name"},pa=y({__name:"FamilyTree",props:{familyData:{}},setup(u){const h=u,r="/band-next-gen/",v=l=>{if(!l)return"";const d=l.startsWith("/")?l.slice(1):l;return`${r}${d}`},c=T(()=>h.familyData.map(l=>({...l,child:Array.isArray(l.child)?l.child:[l.child]})));return(l,d)=>(i(),o("section",ca,[d[1]||(d[1]=e("h2",{class:"section-title"},[e("span",null,"亲缘谱")],-1)),e("div",ua,[(i(!0),o(k,null,p(c.value,(g,t)=>(i(),o("div",{key:t,class:"family-unit"},[e("div",ma,[(i(!0),o(k,null,p(g.mother,a=>(i(),o("div",{key:a.name,class:"parent-node"},[e("img",{src:v(a.avatar),class:"avatar-round",loading:"lazy"},null,8,da),e("span",ha,b(a.name),1)]))),128))]),e("div",{class:f(["connector",{"dashed-line":g.type==="adopt"}])},[...d[0]||(d[0]=[e("div",{class:"connector-top"},null,-1),e("div",{class:"connector-bottom"},null,-1)])],2),e("div",va,[(i(!0),o(k,null,p(g.child,a=>(i(),o("div",{key:a.id,class:"child-node"},[e("img",{src:v(a.avatar),class:"avatar-round",loading:"lazy"},null,8,ga),e("span",ka,b(a.name),1)]))),128))])]))),128))]),d[2]||(d[2]=e("div",{class:"section-comment"},"头像尚未导入，暂时以圆圈名字替代",-1))]))}}),_a=w(pa,[["__scopeId","data-v-7a95ee20"]]),ba=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],fa={hazuki:{riko:`莉子(同学)
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
oneesan/muna san`}},ya=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{name:"八幡海铃",avatar:"images/avatar/umiri.png"},{name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{name:"长崎素世",avatar:"images/avatar/soyo.png"},{name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"},{child:{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},mother:[{name:"高松灯",avatar:"images/avatar/tomori.png"},{name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"}],L={characters:ba,callTable:fa,familyTree:ya},wa={class:"relations-view"},za={class:"page-container"},$a=y({__name:"RelationsView",setup(u){const h=T(()=>L.characters.flatMap(t=>t.members)),r=L.callTable,v=L.familyTree,c=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],l=x("section-table"),d=t=>{l.value=t;const a=document.getElementById(t);if(a){const n=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),s=parseInt(n||"60"),m=a.getBoundingClientRect().top+window.pageYOffset-s-20;window.scrollTo({top:m,behavior:"smooth"})}},g=()=>{const a=window.scrollY;for(const n of c){const s=document.getElementById(n.id);if(s){if(window.innerWidth<=768&&n.id==="section-network")continue;const{offsetTop:_,offsetHeight:m}=s;a>=_-300&&a<_+m-300&&(l.value=n.id)}}};return C(()=>{window.addEventListener("scroll",g);const t=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("visible"),t.unobserve(n.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(a=>t.observe(a))},100)}),E(()=>{window.removeEventListener("scroll",g)}),(t,a)=>(i(),o("div",wa,[$(V,{navItems:c,activeSection:l.value,onScrollTo:d},null,8,["activeSection"]),e("div",za,[$(X,{id:"section-table",memberList:h.value,callTable:S(r)},null,8,["memberList","callTable"]),$(la,{id:"section-network",memberList:h.value},null,8,["memberList"]),$(_a,{id:"section-family",familyData:S(v)},null,8,["familyData"])])]))}}),Ta=w($a,[["__scopeId","data-v-5876165b"]]);export{Ta as default};
