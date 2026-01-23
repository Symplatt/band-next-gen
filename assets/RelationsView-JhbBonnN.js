import{_ as R}from"./SpecialNoteBox-BdcUtOvY.js";import{d as z,c as o,f as n,F as p,i as _,n as b,t as y,e as r,_ as x,r as $,o as E,b as M,p as P,k as I,m as D,u as B,h as w,q as N}from"./index-VhBaUsh0.js";const V={class:"sidebar"},O={class:"nav-list"},A=["onClick"],F={class:"label"},H=z({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(d){return(m,c)=>(r(),o("nav",V,[c[1]||(c[1]=n("div",{class:"nav-line"},null,-1)),n("ul",O,[(r(!0),o(p,null,_(d.navItems,(u,h)=>(r(),o("li",{key:h,class:b(["nav-item",{active:d.activeSection===u.id}]),onClick:v=>m.$emit("scrollTo",u.id)},[c[0]||(c[0]=n("span",{class:"dot"},null,-1)),n("span",F,y(u.label),1)],10,A))),128))])]))}}),W=x(H,[["__scopeId","data-v-2654a7c4"]]),q=z({__name:"SectionTitle",props:{title:{}},setup(d){const m=$(null),c=$(!1);let u=null;return E(()=>{u=new IntersectionObserver(h=>{h[0]?.isIntersecting&&(c.value=!0,m.value&&u&&u.unobserve(m.value))},{threshold:.2}),m.value&&u.observe(m.value)}),M(()=>{u&&u.disconnect()}),(h,v)=>(r(),o("h2",{ref_key:"titleRef",ref:m,class:b(["section-title",{visible:c.value}])},[n("span",null,y(d.title),1)],2))}}),T=x(q,[["__scopeId","data-v-316c9169"]]),U={class:"section-block"},Y={class:"table-scroll-wrapper"},j={class:"call-table"},G={class:"header-avator"},J=["src","onLoad"],K={class:"header-char"},Q={class:"th-content"},X={class:"td-content"},Z=["onMouseenter"],aa={key:0,class:"call-content"},ea={class:"romaji"},na={key:1,class:"dash"},ta=z({__name:"CallTable",props:{memberList:{},callTable:{}},setup(d){const m=d,c="/band-next-gen/",u=$(new Set),h=s=>{if(!s)return"";const i=s.startsWith("/")?s.slice(1):s;return`${c}${i}`},v=s=>{u.value.add(s)},g=$(null),k=$(null),e=(s,i)=>{g.value=s,k.value=i},t=()=>{g.value=null,k.value=null},a=(s,i)=>m.callTable[s]?.[i]||"?";return(s,i)=>(r(),o("section",U,[n("div",Y,[n("table",j,[n("thead",null,[n("tr",G,[i[0]||(i[0]=n("th",{class:"fixed-col"},null,-1)),(r(!0),o(p,null,_(d.memberList,(l,L)=>(r(),o("th",{key:l.id},[n("img",{src:h(l.avatar),class:b(["avatar-square",{loaded:u.value.has(l.id)}]),loading:"lazy",onLoad:f=>v(l.id)},null,42,J)]))),128))]),i[2]||(i[2]=n("tr",{class:"header-group"},[n("th",{class:"fixed-col"},[n("span",{class:"group-label"},"所属乐队")]),n("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),n("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),n("th",{colspan:"1",class:"group-name other"},"Other")],-1)),n("tr",K,[i[1]||(i[1]=n("th",{class:"corner-header fixed-col"},[n("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(r(!0),o(p,null,_(d.memberList,l=>(r(),o("th",{key:l.id,class:b({"highlight-col":k.value===l.id})},[n("div",Q,y(l.name),1)],2))),128))])]),n("tbody",null,[(r(!0),o(p,null,_(d.memberList,(l,L)=>(r(),o("tr",{key:l.id},[n("td",{class:b(["row-header fixed-col",{"highlight-row":g.value===l.id}])},[n("div",X,y(l.name),1)],2),(r(!0),o(p,null,_(d.memberList,(f,C)=>(r(),o("td",{key:f.id,class:b(["cell",{active:g.value===l.id&&k.value===f.id,"cross-highlight":g.value===l.id||k.value===f.id,self:l.id===f.id,"bg-lilith":L<4&&C<4,"bg-gorai":L>=4&&C>=4}]),onMouseenter:Ma=>e(l.id,f.id),onMouseleave:t},[l.id!==f.id?(r(),o("div",aa,[P(y(a(l.id,f.id).split(`
`)[0])+" ",1),n("span",ea,y(a(l.id,f.id).split(`
`)[1]||""),1)])):(r(),o("span",na,"—"))],42,Z))),128))]))),128))])])])]))}}),sa=x(ta,[["__scopeId","data-v-2b8b038b"]]),ia={class:"section-block"},oa={class:"network-container desktop-only"},ra={class:"circle-layout"},la={class:"lines-layer",viewBox:"0 0 500 500"},ca=["x1","y1","x2","y2"],ua=["onMouseenter"],ma={class:"node-circle"},da={class:"node-text"},ha=z({__name:"RelationNetwork",props:{memberList:{}},setup(d){const m=d,c=$(null),u=I(()=>{const e=[],t=m.memberList.map(a=>a.id);return t.forEach((a,s)=>{s<t.length-1&&e.push({source:a,target:t[s+1]}),s<t.length-2&&e.push({source:a,target:t[s+2]}),s===t.length-1&&e.push({source:a,target:t[0]})}),e}),h=e=>{const t=m.memberList.findIndex(L=>L.id===e);if(t===-1)return{x:250,y:250};const a=m.memberList.length,s=180,l=(360/a*t-90)*Math.PI/180;return{x:250+Math.cos(l)*s,y:250+Math.sin(l)*s}},v=(e,t)=>{const a=m.memberList[e];if(!a)return{};const s=h(a.id);return{left:`${s.x}px`,top:`${s.y}px`}},g=e=>{if(!c.value)return!0;const t=e===c.value,a=u.value.some(s=>s.source===c.value&&s.target===e||s.target===c.value&&s.source===e);return t||a},k=e=>c.value?e.source===c.value||e.target===c.value:!0;return(e,t)=>(r(),o("section",ia,[n("div",oa,[t[1]||(t[1]=n("div",{class:"claim"},"该模块正在制作中，当前仅演示初版效果：",-1)),n("div",ra,[(r(),o("svg",la,[(r(!0),o(p,null,_(u.value,(a,s)=>(r(),o("line",{key:s,x1:h(a.source).x,y1:h(a.source).y,x2:h(a.target).x,y2:h(a.target).y,class:b(["network-line",{dimmed:c.value&&!k(a),active:k(a)}])},null,10,ca))),128))])),(r(!0),o(p,null,_(d.memberList,(a,s)=>(r(),o("div",{key:a.id,class:b(["node-wrapper",{dimmed:c.value&&!g(a.id),active:c.value===a.id}]),style:D(v(s,d.memberList.length)),onMouseenter:i=>c.value=a.id,onMouseleave:t[0]||(t[0]=i=>c.value=null)},[n("div",ma,[n("span",da,y(a.name.slice(-1)),1)])],46,ua))),128))])]),t[2]||(t[2]=n("div",{class:"mobile-network-msg"},[n("p",null,"正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。")],-1))]))}}),va=x(ha,[["__scopeId","data-v-2aad472c"]]),ka={class:"section-block"},ga={class:"genealogy-grid"},pa={class:"parents-row"},_a=["onClick"],ba=["src"],fa={class:"name"},ya={class:"child-row"},wa=["onClick"],$a=["src"],za={class:"name"},xa=z({__name:"FamilyTree",props:{familyData:{}},setup(d){const m=d,c=B(),u="/band-next-gen/",h=e=>{const t=["若叶睦","祐天寺若麦"];return e.mother[0].name in t},v=e=>{if(!e)return"";const t=e.startsWith("/")?e.slice(1):e;return`${u}${t}`},g=e=>{e&&c.push({name:"char-detail",params:{id:e}})},k=I(()=>m.familyData.map(e=>({...e,child:Array.isArray(e.child)?e.child:[e.child]})));return(e,t)=>(r(),o("section",ka,[n("div",ga,[(r(!0),o(p,null,_(k.value,(a,s)=>(r(),o("div",{key:s,class:b(["family-unit",{"special-unit":h(a)}])},[n("div",pa,[(r(!0),o(p,null,_(a.mother,i=>(r(),o("div",{key:i.name,class:"parent-node interactive-node",onClick:l=>g(i.id)},[n("img",{src:v(i.avatar),class:"avatar-round",loading:"lazy"},null,8,ba),n("span",fa,y(i.name),1)],8,_a))),128))]),n("div",{class:b(["connector",{"dashed-line":a.type==="adopt"}])},[...t[0]||(t[0]=[n("div",{class:"connector-top"},null,-1),n("div",{class:"connector-bottom"},null,-1)])],2),n("div",ya,[(r(!0),o(p,null,_(a.child,i=>(r(),o("div",{key:i.id,class:"child-node interactive-node",onClick:l=>g(i.id)},[n("img",{src:v(i.avatar),class:"avatar-round",loading:"lazy"},null,8,$a),n("span",za,y(i.name),1)],8,wa))),128))])],2))),128))])]))}}),La=x(xa,[["__scopeId","data-v-588d5ea3"]]),Ta=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],Sa={hazuki:{riko:`莉子(同学)
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
oneesan/muna san`}},Ia=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{id:"sakiko",name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{id:"uika",name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{id:"nyamu",name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{id:"mutsumi",name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"}],mother:[{id:"tomori",name:"高松灯",avatar:"images/avatar/tomori.png"},{id:"rana",name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{id:"umiri",name:"八幡海铃",avatar:"images/avatar/umiri.png"},{id:"rikki",name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{id:"soyo",name:"长崎素世",avatar:"images/avatar/soyo.png"},{id:"anon",name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"}],S={characters:Ta,callTable:Sa,familyTree:Ia},Ca={class:"relations-view"},Na={class:"page-container"},Ea=z({__name:"RelationsView",setup(d){const m=I(()=>S.characters.flatMap(e=>e.members)),c=S.callTable,u=S.familyTree,h=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],v=$("section-table"),g=e=>{v.value=e;const t=document.getElementById(e);if(t){const a=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),s=parseInt(a||"60"),l=t.getBoundingClientRect().top+window.pageYOffset-s-20;window.scrollTo({top:l,behavior:"smooth"})}},k=()=>{const t=window.scrollY;for(const a of h){const s=document.getElementById(a.id);if(s){if(window.innerWidth<=768&&a.id==="section-network")continue;const{offsetTop:i,offsetHeight:l}=s;t>=i-300&&t<i+l-300&&(v.value=a.id)}}};return E(()=>{window.addEventListener("scroll",k);const e=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),e.unobserve(a.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(t=>e.observe(t))},100)}),M(()=>{window.removeEventListener("scroll",k)}),(e,t)=>{const a=R;return r(),o("div",Ca,[w(W,{navItems:h,activeSection:v.value,onScrollTo:g},null,8,["activeSection"]),n("div",Na,[w(T,{title:"称呼表"}),w(sa,{id:"section-table",memberList:m.value,callTable:N(c)},null,8,["memberList","callTable"]),w(T,{title:"关系网"}),w(va,{id:"section-network",memberList:m.value},null,8,["memberList"]),w(T,{title:"亲缘谱"}),w(La,{id:"section-family",familyData:N(u)},null,8,["familyData"]),w(a,{"note-content":"本页面所展示的立绘皆截取自鹤星发布于各平台的作品"})])])}}}),Da=x(Ea,[["__scopeId","data-v-af008796"]]);export{Da as default};
