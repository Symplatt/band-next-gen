import{d as N,r as g,c as e,f as a,F as c,i as k,p as r,t as h,j as v,n as p,e as i,_ as x}from"./index-DQXR_qrl.js";const L=[{groupName:"Ex-Lilith",members:[{id:"hazuki",name:"丰川羽月",avatar:"images/avatar/hazuki.png"},{id:"riko",name:"八幡莉子",avatar:"images/avatar/riko.png"},{id:"ameha",name:"若叶天叶",avatar:"images/avatar/ameha.png"},{id:"wakaho",name:"若叶若穗",avatar:"images/avatar/wakaho.png"}]},{groupName:"Go Raiiii",members:[{id:"mirei",name:"椎名美铃",avatar:"images/avatar/mirei.png"},{id:"shizuku",name:"高松雫",avatar:"images/avatar/shizuku.png"},{id:"anna",name:"长崎杏奈",avatar:"images/avatar/anna.png"},{id:"muna",name:"若叶梦那",avatar:"images/avatar/muna.png"}]},{groupName:"Other",members:[{id:"sora",name:"千早空",avatar:"images/avatar/sora.png"}]}],T={hazuki:{riko:`莉子同学(riko san)
莉子(riko)`,ameha:`天叶
(ameha)`,wakaho:`若穗
(wakaho)`,mirei:`小美铃
(mirei chan)`,shizuku:`小雫
(shizuku chan)`,anna:`小杏奈
(anna chan)`,muna:`小梦那
(muna chan)`,sora:`小空
(sora chan)`},riko:{hazuki:`丰川同学
(togawa san)
羽月同学
(hazuki san)`,ameha:`天叶
(ameha)`,wakaho:`若穗
(wakaho)`,mirei:`喂/美铃
(mirei)`,shizuku:`雫雫
(ルル ruru)`,anna:`小安
(ann chan)`,muna:`若叶同学
(wakaba san)`,sora:`小空
(sora chan)`},ameha:{hazuki:`小羽月
(hazuki chan)`,riko:`莉子/小栗子
(riko/koriko)`,wakaho:`若
(waka)`,mirei:`小美铃
(mirei chan)`,shizuku:`雫雫
(ルル ruru chan)`,anna:`小杏奈
(anna chan)`,muna:`小梦那
(muna chan)`,sora:`小空
(sora chan)`},wakaho:{hazuki:`月
(zuki)`,riko:`莉子
(riko)`,ameha:`天
(ame)`,mirei:`美铃铃
(mirin)`,shizuku:`雫雫
(ルル ruru)`,anna:`杏奈
(anna)`,muna:`梦那
(muna)`,sora:`小空
(sora chan)`},shizuku:{hazuki:`小月
(zuki chan)`,riko:`姐姐/莉子
(neesan/riko)`,ameha:`小天
(ame chan)`,wakaho:`小若
(waka chan)`,mirei:`美铃铃
(mirin chan)`,anna:`小安
(ann chan)`,muna:`小猫
(nyanko chan)`,sora:`小空
(sora chan)`},mirei:{hazuki:`羽月姐姐
(hazuki san)`,riko:`栗子/姐姐
(koriko/nee)`,ameha:`天叶
(ameha chan)`,wakaho:`小若穗
(wakaho chan)`,shizuku:`雫雫
(ルル ruru)`,anna:`小安
(ann)`,muna:`梦那
(muna)`,sora:`小空
(sora chan)`},anna:{hazuki:`羽月姐姐
(hazuki san)`,riko:`姐姐/莉子姐姐
(oneesan/riko san)`,ameha:`天叶
(ameha chan)`,wakaho:`小若穗
(wakaho chan)`,shizuku:`雫雫
(ルル ruru chan)`,mirei:`美铃
(mirin)`,muna:`小梦那
(muna chan)`,sora:`小空
(sora chan)`},muna:{hazuki:`羽月姐姐
(hazuki san)`,riko:`姐姐/莉子姐姐
(oneesan/riko san)`,ameha:`天姐
(ame nee)`,wakaho:`若姐
(waka nee)`,shizuku:`小雫
(shizuku chan)`,mirei:`美子
(mi ko)`,anna:`杏子
(ann ko)`,sora:`小空
(sora chan)`},sora:{hazuki:`姐姐/羽月姐姐
(oneesan/hazuki san)`,riko:`姐姐/莉子姐姐
(oneesan/riko san)`,ameha:`姐姐/天叶姐姐
(oneesan/ameha san)`,wakaho:`姐姐/若穗姐姐
(oneesan/wakaho san)`,shizuku:`雫雫
(ルル ruru chan)`,mirei:`姐姐/美铃姐姐
(oneesan/mirei san)`,anna:`姐姐
(neesan)`,muna:`姐姐/梦那姐姐
(oneesan/muna san)`}},_={characters:L,callTable:T},C={class:"relations-view"},R={class:"page-container"},M={class:"section-block"},V={class:"table-scroll-wrapper"},A={class:"call-table"},B={class:"header-avatar"},E=["src"],H={class:"header-group"},$={colspan:"4",class:"group-name-lilith"},D={colspan:"4",class:"group-name-gorai"},F={colspan:"1",class:"group-name-off-stuff"},I={class:"header-char"},O={class:"th-content"},P={class:"td-content"},j=["onMouseenter"],q={key:0},G={key:1,class:"dash"},S=N({__name:"RelationsView",setup(J){const z="/band-next-gen/",d=_.characters.map(o=>o.groupName),m=_.characters.flatMap(o=>o.members),w=_.callTable,u=g(null),l=g(null),b=(o,s)=>{u.value=o,l.value=s},f=()=>{u.value=null,l.value=null},y=(o,s)=>w[o]?.[s]||"?";return(o,s)=>(i(),e("div",C,[s[4]||(s[4]=a("div",{class:"left-bar"},null,-1)),a("div",R,[a("section",M,[s[3]||(s[3]=a("h2",{class:"section-title"},"APPELLATION CHART",-1)),a("div",V,[a("table",A,[a("thead",null,[a("tr",B,[s[0]||(s[0]=a("th",null,null,-1)),(i(!0),e(c,null,k(r(m),n=>(i(),e("th",null,[a("img",{src:`${r(z)}${n.avatar}`,class:"avatar-square"},null,8,E)]))),256))]),a("tr",H,[s[1]||(s[1]=a("th",null,[a("span",null,"所属组合")],-1)),a("th",$,h(r(d)[0]),1),a("th",D,h(r(d)[1]),1),a("th",F,h(r(d)[2]),1)]),a("tr",I,[s[2]||(s[2]=a("th",{class:"corner-header"},[v("称呼"),a("br"),v("↘"),a("br"),v("被称呼")],-1)),(i(!0),e(c,null,k(r(m),n=>(i(),e("th",{key:n.id,class:p({"highlight-col":l.value===n.id})},[a("div",O,[a("span",null,h(n.name),1)])],2))),128))])]),a("tbody",null,[(i(!0),e(c,null,k(r(m),n=>(i(),e("tr",{key:n.id},[a("td",{class:p(["row-header",{"highlight-row":u.value===n.id}])},[a("div",P,[a("span",null,h(n.name),1)])],2),(i(!0),e(c,null,k(r(m),t=>(i(),e("td",{key:t.id,class:p(["cell",{active:u.value===n.id&&l.value===t.id,"cross-highlight":u.value===n.id||l.value===t.id,self:n.id===t.id}]),onMouseenter:K=>b(n.id,t.id),onMouseleave:f},[n.id!==t.id?(i(),e("span",q,h(y(n.id,t.id)),1)):(i(),e("span",G,"—"))],42,j))),128))]))),128))])])])])])]))}}),U=x(S,[["__scopeId","data-v-f81bf31a"]]);export{U as default};
