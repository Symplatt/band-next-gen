import{d as $,c as i,f as n,F as p,i as _,n as f,t as y,e as o,_ as x,r as z,k as N,l as S,p as E,u as M,o as P,b as D,h as L,q as I}from"./index-BISRgQth.js";const R={class:"sidebar"},B={class:"nav-list"},V=["onClick"],A={class:"label"},F=$({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(d){return(h,c)=>(o(),i("nav",R,[c[1]||(c[1]=n("div",{class:"nav-line"},null,-1)),n("ul",B,[(o(!0),i(p,null,_(d.navItems,(v,m)=>(o(),i("li",{key:m,class:f(["nav-item",{active:d.activeSection===v.id}]),onClick:k=>h.$emit("scrollTo",v.id)},[c[0]||(c[0]=n("span",{class:"dot"},null,-1)),n("span",A,y(v.label),1)],10,V))),128))])]))}}),H=x(F,[["__scopeId","data-v-2654a7c4"]]),O={class:"section-block"},q={class:"table-scroll-wrapper"},U={class:"call-table"},W={class:"header-avator"},Y=["src","onLoad"],G={class:"header-char"},j={class:"th-content"},J={class:"td-content"},K=["onMouseenter"],Q={key:0,class:"call-content"},X={class:"romaji"},Z={key:1,class:"dash"},aa=$({__name:"CallTable",props:{memberList:{},callTable:{}},setup(d){const h=d,c="/band-next-gen/",v=z(new Set),m=a=>{if(!a)return"";const u=a.startsWith("/")?a.slice(1):a;return`${c}${u}`},k=a=>{v.value.add(a)},g=z(null),l=z(null),s=(a,u)=>{g.value=a,l.value=u},t=()=>{g.value=null,l.value=null},e=(a,u)=>h.callTable[a]?.[u]||"?";return(a,u)=>(o(),i("section",O,[u[3]||(u[3]=n("h2",{class:"section-title"},[n("span",null,"称呼表")],-1)),n("div",q,[n("table",U,[n("thead",null,[n("tr",W,[u[0]||(u[0]=n("th",{class:"fixed-col"},null,-1)),(o(!0),i(p,null,_(d.memberList,(r,w)=>(o(),i("th",{key:r.id},[n("img",{src:m(r.avatar),class:f(["avatar-square",{loaded:v.value.has(r.id)}]),loading:"lazy",onLoad:b=>k(r.id)},null,42,Y)]))),128))]),u[2]||(u[2]=n("tr",{class:"header-group"},[n("th",{class:"fixed-col"},[n("span",{class:"group-label"},"所属乐队")]),n("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),n("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),n("th",{colspan:"1",class:"group-name other"},"Other")],-1)),n("tr",G,[u[1]||(u[1]=n("th",{class:"corner-header fixed-col"},[n("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(o(!0),i(p,null,_(d.memberList,r=>(o(),i("th",{key:r.id,class:f({"highlight-col":l.value===r.id})},[n("div",j,y(r.name),1)],2))),128))])]),n("tbody",null,[(o(!0),i(p,null,_(d.memberList,(r,w)=>(o(),i("tr",{key:r.id},[n("td",{class:f(["row-header fixed-col",{"highlight-row":g.value===r.id}])},[n("div",J,y(r.name),1)],2),(o(!0),i(p,null,_(d.memberList,(b,C)=>(o(),i("td",{key:b.id,class:f(["cell",{active:g.value===r.id&&l.value===b.id,"cross-highlight":g.value===r.id||l.value===b.id,self:r.id===b.id,"bg-lilith":w<4&&C<4,"bg-gorai":w>=4&&C>=4}]),onMouseenter:Ia=>s(r.id,b.id),onMouseleave:t},[r.id!==b.id?(o(),i("div",Q,[N(y(e(r.id,b.id).split(`
`)[0])+" ",1),n("span",X,y(e(r.id,b.id).split(`
`)[1]||""),1)])):(o(),i("span",Z,"—"))],42,K))),128))]))),128))])])])]))}}),na=x(aa,[["__scopeId","data-v-646fdba7"]]),ea={class:"section-block"},ta={class:"network-container desktop-only"},sa={class:"circle-layout"},ia={class:"lines-layer",viewBox:"0 0 500 500"},oa=["x1","y1","x2","y2"],ra=["onMouseenter"],la={class:"node-circle"},ca={class:"node-text"},ua=$({__name:"RelationNetwork",props:{memberList:{}},setup(d){const h=d,c=z(null),v=S(()=>{const s=[],t=h.memberList.map(e=>e.id);return t.forEach((e,a)=>{a<t.length-1&&s.push({source:e,target:t[a+1]}),a<t.length-2&&s.push({source:e,target:t[a+2]}),a===t.length-1&&s.push({source:e,target:t[0]})}),s}),m=s=>{const t=h.memberList.findIndex(w=>w.id===s);if(t===-1)return{x:250,y:250};const e=h.memberList.length,a=180,r=(360/e*t-90)*Math.PI/180;return{x:250+Math.cos(r)*a,y:250+Math.sin(r)*a}},k=(s,t)=>{const e=h.memberList[s];if(!e)return{};const a=m(e.id);return{left:`${a.x}px`,top:`${a.y}px`}},g=s=>{if(!c.value)return!0;const t=s===c.value,e=v.value.some(a=>a.source===c.value&&a.target===s||a.target===c.value&&a.source===s);return t||e},l=s=>c.value?s.source===c.value||s.target===c.value:!0;return(s,t)=>(o(),i("section",ea,[t[2]||(t[2]=n("h2",{class:"section-title"},[n("span",null,"关系网")],-1)),n("div",ta,[t[1]||(t[1]=N(" 该模块正在制作中，当前仅演示初版效果： ",-1)),n("div",sa,[(o(),i("svg",ia,[(o(!0),i(p,null,_(v.value,(e,a)=>(o(),i("line",{key:a,x1:m(e.source).x,y1:m(e.source).y,x2:m(e.target).x,y2:m(e.target).y,class:f(["network-line",{dimmed:c.value&&!l(e),active:l(e)}])},null,10,oa))),128))])),(o(!0),i(p,null,_(d.memberList,(e,a)=>(o(),i("div",{key:e.id,class:f(["node-wrapper",{dimmed:c.value&&!g(e.id),active:c.value===e.id}]),style:E(k(a,d.memberList.length)),onMouseenter:u=>c.value=e.id,onMouseleave:t[0]||(t[0]=u=>c.value=null)},[n("div",la,[n("span",ca,y(e.name.slice(-1)),1)])],46,ra))),128))])]),t[3]||(t[3]=n("div",{class:"mobile-network-msg"},[n("p",null,"正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。")],-1))]))}}),da=x(ua,[["__scopeId","data-v-c93faddf"]]),ma={class:"section-block"},ha={class:"genealogy-grid"},va={class:"parents-row"},ka=["onClick"],ga=["src"],pa={class:"name"},_a={class:"child-row"},ba=["onClick"],fa=["src"],ya={class:"name"},wa=$({__name:"FamilyTree",props:{familyData:{}},setup(d){const h=d,c=M(),v="/band-next-gen/",m=l=>{if(!l)return"";const s=l.startsWith("/")?l.slice(1):l;return`${v}${s}`},k=l=>{l&&c.push({name:"char-detail",params:{id:l}})},g=S(()=>h.familyData.map(l=>({...l,child:Array.isArray(l.child)?l.child:[l.child]})));return(l,s)=>(o(),i("section",ma,[s[1]||(s[1]=n("h2",{class:"section-title"},[n("span",null,"亲缘谱")],-1)),n("div",ha,[(o(!0),i(p,null,_(g.value,(t,e)=>(o(),i("div",{key:e,class:"family-unit"},[n("div",va,[(o(!0),i(p,null,_(t.mother,a=>(o(),i("div",{key:a.name,class:"parent-node interactive-node",onClick:u=>k(a.id)},[n("img",{src:m(a.avatar),class:"avatar-round",loading:"lazy"},null,8,ga),n("span",pa,y(a.name),1)],8,ka))),128))]),n("div",{class:f(["connector",{"dashed-line":t.type==="adopt"}])},[...s[0]||(s[0]=[n("div",{class:"connector-top"},null,-1),n("div",{class:"connector-bottom"},null,-1)])],2),n("div",_a,[(o(!0),i(p,null,_(t.child,a=>(o(),i("div",{key:a.id,class:"child-node interactive-node",onClick:u=>k(a.id)},[n("img",{src:m(a.avatar),class:"avatar-round",loading:"lazy"},null,8,fa),n("span",ya,y(a.name),1)],8,ba))),128))])]))),128))])]))}}),za=x(wa,[["__scopeId","data-v-a29f7be4"]]),$a=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],xa={hazuki:{riko:`莉子(同学)
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
oneesan/muna san`}},La=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{id:"sakiko",name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{id:"uika",name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{id:"umiri",name:"八幡海铃",avatar:"images/avatar/umiri.png"},{id:"rikki",name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{id:"nyamu",name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{id:"mutsumi",name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{id:"soyo",name:"长崎素世",avatar:"images/avatar/soyo.png"},{id:"anon",name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"},{child:{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},mother:[{id:"tomori",name:"高松灯",avatar:"images/avatar/tomori.png"},{id:"rana",name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"}],T={characters:$a,callTable:xa,familyTree:La},Ta={class:"relations-view"},Sa={class:"page-container"},Ca=$({__name:"RelationsView",setup(d){const h=S(()=>T.characters.flatMap(s=>s.members)),c=T.callTable,v=T.familyTree,m=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],k=z("section-table"),g=s=>{k.value=s;const t=document.getElementById(s);if(t){const e=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),a=parseInt(e||"60"),r=t.getBoundingClientRect().top+window.pageYOffset-a-20;window.scrollTo({top:r,behavior:"smooth"})}},l=()=>{const t=window.scrollY;for(const e of m){const a=document.getElementById(e.id);if(a){if(window.innerWidth<=768&&e.id==="section-network")continue;const{offsetTop:u,offsetHeight:r}=a;t>=u-300&&t<u+r-300&&(k.value=e.id)}}};return P(()=>{window.addEventListener("scroll",l);const s=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),s.unobserve(e.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(t=>s.observe(t))},100)}),D(()=>{window.removeEventListener("scroll",l)}),(s,t)=>(o(),i("div",Ta,[L(H,{navItems:m,activeSection:k.value,onScrollTo:g},null,8,["activeSection"]),n("div",Sa,[L(na,{id:"section-table",memberList:h.value,callTable:I(c)},null,8,["memberList","callTable"]),L(da,{id:"section-network",memberList:h.value},null,8,["memberList"]),L(za,{id:"section-family",familyData:I(v)},null,8,["familyData"])])]))}}),Ea=x(Ca,[["__scopeId","data-v-5876165b"]]);export{Ea as default};
