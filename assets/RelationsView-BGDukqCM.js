import{S as R}from"./SpecialNoteBox-DdtKzr8S.js";import{d as x,c as i,f as e,F as p,j as _,n as b,t as w,e as r,_ as L,r as z,o as E,b as M,v as P,l as I,q as B,u as D,h as $,s as C}from"./index-RquoEb1z.js";const V={class:"sidebar"},O={class:"nav-list"},A=["onClick"],F={class:"label"},H=x({__name:"SidebarNav",props:{navItems:{},activeSection:{}},emits:["scrollTo"],setup(m){return(d,c)=>(r(),i("nav",V,[c[1]||(c[1]=e("div",{class:"nav-line"},null,-1)),e("ul",O,[(r(!0),i(p,null,_(m.navItems,(u,h)=>(r(),i("li",{key:h,class:b(["nav-item",{active:m.activeSection===u.id}]),onClick:k=>d.$emit("scrollTo",u.id)},[c[0]||(c[0]=e("span",{class:"dot"},null,-1)),e("span",F,w(u.label),1)],10,A))),128))])]))}}),W=L(H,[["__scopeId","data-v-2654a7c4"]]),j=x({__name:"SectionTitle",props:{title:{}},setup(m){const d=z(null),c=z(!1);let u=null;return E(()=>{u=new IntersectionObserver(h=>{h[0]?.isIntersecting&&(c.value=!0,d.value&&u&&u.unobserve(d.value))},{threshold:.2}),d.value&&u.observe(d.value)}),M(()=>{u&&u.disconnect()}),(h,k)=>(r(),i("h2",{ref_key:"titleRef",ref:d,class:b(["section-title",{visible:c.value}])},[e("span",null,w(m.title),1)],2))}}),T=L(j,[["__scopeId","data-v-316c9169"]]),q={class:"section-block"},U={class:"table-scroll-wrapper"},Y={class:"call-table"},G={class:"header-avator"},J=["src","onLoad"],K={class:"header-char"},Q={class:"th-content"},X={class:"td-content"},Z=["onMouseenter"],aa={key:0,class:"call-content"},ea={class:"romaji"},na={key:1,class:"dash"},ta=x({__name:"CallTable",props:{memberList:{},callTable:{}},setup(m){const d=m,c="/band-next-gen/",u=z(new Set),h=a=>{if(!a)return"";const o=a.startsWith("/")?a.slice(1):a;return`${c}${o}`},k=a=>{u.value.add(a)},v=z(null),g=z(null),s=(a,o)=>{v.value=a,g.value=o},t=()=>{v.value=null,g.value=null},n=(a,o)=>d.callTable[a]?.[o]||"?";return(a,o)=>(r(),i("section",q,[e("div",U,[e("table",Y,[e("thead",null,[e("tr",G,[o[0]||(o[0]=e("th",{class:"fixed-col"},null,-1)),(r(!0),i(p,null,_(m.memberList,(l,f)=>(r(),i("th",{key:l.id},[e("img",{src:h(l.avatar),class:b(["avatar-square",{loaded:u.value.has(l.id)}]),loading:"lazy",onLoad:y=>k(l.id)},null,42,J)]))),128))]),o[2]||(o[2]=e("tr",{class:"header-group"},[e("th",{class:"fixed-col"},[e("span",{class:"group-label"},"所属乐队")]),e("th",{colspan:"4",class:"group-name lilith"},"Ex-Lilith"),e("th",{colspan:"4",class:"group-name gorai"},"Go Raiiii"),e("th",{colspan:"1",class:"group-name other"},"Other")],-1)),e("tr",K,[o[1]||(o[1]=e("th",{class:"corner-header fixed-col"},[e("span",{class:"corner-comment"},"称呼→被称呼")],-1)),(r(!0),i(p,null,_(m.memberList,l=>(r(),i("th",{key:l.id,class:b({"highlight-col":g.value===l.id})},[e("div",Q,w(l.name),1)],2))),128))])]),e("tbody",null,[(r(!0),i(p,null,_(m.memberList,(l,f)=>(r(),i("tr",{key:l.id},[e("td",{class:b(["row-header fixed-col",{"highlight-row":v.value===l.id}])},[e("div",X,w(l.name),1)],2),(r(!0),i(p,null,_(m.memberList,(y,N)=>(r(),i("td",{key:y.id,class:b(["cell",{active:v.value===l.id&&g.value===y.id,"cross-highlight":v.value===l.id||g.value===y.id,self:l.id===y.id,"bg-lilith":f<4&&N<4,"bg-gorai":f>=4&&N>=4}]),onMouseenter:Ba=>s(l.id,y.id),onMouseleave:t},[l.id!==y.id?(r(),i("div",aa,[P(w(n(l.id,y.id).split(`
`)[0])+" ",1),e("span",ea,w(n(l.id,y.id).split(`
`)[1]||""),1)])):(r(),i("span",na,"—"))],42,Z))),128))]))),128))])])])]))}}),sa=L(ta,[["__scopeId","data-v-2b8b038b"]]),oa={class:"section-block"},ia={class:"network-container desktop-only"},ra={class:"circle-layout"},la={class:"lines-layer",viewBox:"0 0 500 500"},ca=["x1","y1","x2","y2"],ua=["onMouseenter"],da={class:"node-circle"},ma={class:"node-text"},ha=x({__name:"RelationNetwork",props:{memberList:{}},setup(m){const d=m,c=z(null),u=I(()=>{const s=[],t=d.memberList.map(n=>n.id);return t.forEach((n,a)=>{a<t.length-1&&s.push({source:n,target:t[a+1]}),a<t.length-2&&s.push({source:n,target:t[a+2]}),a===t.length-1&&s.push({source:n,target:t[0]})}),s}),h=s=>{const t=d.memberList.findIndex(f=>f.id===s);if(t===-1)return{x:250,y:250};const n=d.memberList.length,a=180,l=(360/n*t-90)*Math.PI/180;return{x:250+Math.cos(l)*a,y:250+Math.sin(l)*a}},k=(s,t)=>{const n=d.memberList[s];if(!n)return{};const a=h(n.id);return{left:`${a.x}px`,top:`${a.y}px`}},v=s=>{if(!c.value)return!0;const t=s===c.value,n=u.value.some(a=>a.source===c.value&&a.target===s||a.target===c.value&&a.source===s);return t||n},g=s=>c.value?s.source===c.value||s.target===c.value:!0;return(s,t)=>(r(),i("section",oa,[e("div",ia,[t[1]||(t[1]=e("div",{class:"claim"},"该模块正在制作中，当前仅演示初版效果：",-1)),e("div",ra,[(r(),i("svg",la,[(r(!0),i(p,null,_(u.value,(n,a)=>(r(),i("line",{key:a,x1:h(n.source).x,y1:h(n.source).y,x2:h(n.target).x,y2:h(n.target).y,class:b(["network-line",{dimmed:c.value&&!g(n),active:g(n)}])},null,10,ca))),128))])),(r(!0),i(p,null,_(m.memberList,(n,a)=>(r(),i("div",{key:n.id,class:b(["node-wrapper",{dimmed:c.value&&!v(n.id),active:c.value===n.id}]),style:B(k(a,m.memberList.length)),onMouseenter:o=>c.value=n.id,onMouseleave:t[0]||(t[0]=o=>c.value=null)},[e("div",da,[e("span",ma,w(n.name.slice(-1)),1)])],46,ua))),128))])]),t[2]||(t[2]=e("div",{class:"mobile-network-msg"},[e("p",null,"正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。")],-1))]))}}),va=L(ha,[["__scopeId","data-v-2aad472c"]]),ka={class:"section-block"},ga={class:"genealogy-grid"},pa={class:"parents-row"},_a=["onClick"],ba=["src"],fa={class:"name"},ya={class:"child-row"},wa=["onClick"],$a=["src"],za={class:"name"},xa=x({__name:"FamilyTree",props:{familyData:{}},setup(m){const d=m,c=D(),u="/band-next-gen/",h=s=>{const t=["若叶睦","祐天寺若麦"];return s.mother[0].name in t},k=s=>{if(!s)return"";const t=s.startsWith("/")?s.slice(1):s;return`${u}${t}`},v=s=>{s&&c.push({name:"char-detail",params:{id:s}})},g=I(()=>d.familyData.map(s=>({...s,child:Array.isArray(s.child)?s.child:[s.child]})));return(s,t)=>(r(),i("section",ka,[e("div",ga,[(r(!0),i(p,null,_(g.value,(n,a)=>(r(),i("div",{key:a,class:b(["family-unit",{"special-unit":h(n)}])},[e("div",pa,[(r(!0),i(p,null,_(n.mother,o=>(r(),i("div",{key:o.name,class:"parent-node interactive-node",onClick:l=>v(o.id)},[e("img",{src:k(o.avatar),class:"avatar-round",loading:"lazy"},null,8,ba),e("span",fa,w(o.name),1)],8,_a))),128))]),e("div",{class:b(["connector",{"dashed-line":n.type==="adopt"}])},[...t[0]||(t[0]=[e("div",{class:"connector-top"},null,-1),e("div",{class:"connector-bottom"},null,-1)])],2),e("div",ya,[(r(!0),i(p,null,_(n.child,o=>(r(),i("div",{key:o.id,class:"child-node interactive-node",onClick:l=>v(o.id)},[e("img",{src:k(o.avatar),class:"avatar-round",loading:"lazy"},null,8,$a),e("span",za,w(o.name),1)],8,wa))),128))])],2))),128))])]))}}),La=L(xa,[["__scopeId","data-v-8f9a6ce2"]]),Ta=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],Sa={hazuki:{riko:`莉子(同学)
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
oneesan/muna san`}},Ia=[{child:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"}],mother:[{id:"sakiko",name:"丰川祥子",avatar:"images/avatar/sakiko.png"},{id:"uika",name:"三角初华",avatar:"images/avatar/uika.png"}],type:"birth"},{child:[{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}],mother:[{id:"nyamu",name:"祐天寺若麦",avatar:"images/avatar/nyamu.png"},{id:"mutsumi",name:"若叶睦",avatar:"images/avatar/mutsumi.png"}],type:"birth"},{child:[{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"}],mother:[{id:"tomori",name:"高松灯",avatar:"images/avatar/tomori.png"},{id:"rana",name:"要乐奈",avatar:"images/avatar/rana.png"}],type:"adopt"},{child:[{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"}],mother:[{id:"umiri",name:"八幡海铃",avatar:"images/avatar/umiri.png"},{id:"rikki",name:"椎名立希",avatar:"images/avatar/taki.png"}],type:"birth"},{child:[{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}],mother:[{id:"soyo",name:"长崎素世",avatar:"images/avatar/soyo.png"},{id:"anon",name:"千早爱音",avatar:"images/avatar/anon.png"}],type:"birth"}],S={characters:Ta,callTable:Sa,familyTree:Ia},Na={class:"relations-view"},Ca={class:"page-container"},Ea={id:"section-table"},Ma={id:"section-network"},Ra={id:"section-family"},Pa=x({__name:"RelationsView",setup(m){const d=["本页面所展示的立绘皆截取自鹤星发布于各平台的作品","点击亲缘谱中的头像可进入个人详情页"],c=I(()=>S.characters.flatMap(t=>t.members)),u=S.callTable,h=S.familyTree,k=[{id:"section-table",label:"称呼表"},{id:"section-network",label:"关系网"},{id:"section-family",label:"亲缘谱"}],v=z("section-table"),g=t=>{v.value=t;const n=document.getElementById(t);if(n){const a=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),o=parseInt(a||"60"),f=n.getBoundingClientRect().top+window.pageYOffset-o+40;window.scrollTo({top:f,behavior:"smooth"})}},s=()=>{const n=window.scrollY;for(const a of k){const o=document.getElementById(a.id);if(o){if(window.innerWidth<=768&&a.id==="section-network")continue;const{offsetTop:l,offsetHeight:f}=o;n>=l-300&&n<l+f-300&&(v.value=a.id)}}};return E(()=>{window.addEventListener("scroll",s);const t=new IntersectionObserver(n=>{n.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),t.unobserve(a.target))})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".section-title").forEach(n=>t.observe(n))},100)}),M(()=>{window.removeEventListener("scroll",s)}),(t,n)=>{const a=R;return r(),i("div",Na,[$(W,{navItems:k,activeSection:v.value,onScrollTo:g},null,8,["activeSection"]),e("div",Ca,[e("section",Ea,[$(T,{title:"称呼表"}),$(sa,{memberList:c.value,callTable:C(u)},null,8,["memberList","callTable"])]),e("section",Ma,[$(T,{title:"关系网"}),$(va,{memberList:c.value},null,8,["memberList"])]),e("section",Ra,[$(T,{title:"亲缘谱"}),$(La,{familyData:C(h)},null,8,["familyData"])]),$(a,{class:"special-note-box","note-content":d})])])}}}),Oa=L(Pa,[["__scopeId","data-v-07e7d1e5"]]);export{Oa as default};
