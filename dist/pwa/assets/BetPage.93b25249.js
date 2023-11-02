import{k as j,c,h as N,ae as oe,i as ne,a7 as Q,a8 as le,l as se,g as re,aP as S,aQ as ie,d as G,al as K,at as d,ar as _,as as n,j as a,aC as l,ay as $,av as U,H as w,ax as T,aB as I,au as k,az as B,aA as z,aU as X,aV as W,an as ue,r as h,o as de,aq as ce,aL as O,F as fe,aM as ge,aG as pe,aE as me,aD as V,aF as be,E as M,y as ve}from"./index.81b5c6af.js";import{Q as ye}from"./QSpinnerTail.24a58a9b.js";import{Q as he}from"./QPage.c02a3015.js";import{C as Y}from"./ClosePopup.ebaf345b.js";import{u as Be}from"./use-quasar.0c9e7fe9.js";import{u as $e}from"./vue-i18n.f87c98fd.js";import{u as _e}from"./app.357af142.js";const Ee=["top","middle","bottom"];var L=j({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>Ee.includes(e)}},setup(e,{slots:t}){const r=c(()=>e.align!==void 0?{verticalAlign:e.align}:null),f=c(()=>{const i=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(i!==void 0?` text-${i}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>N("div",{class:f.value,style:r.value,role:"status","aria-label":e.label},oe(t.default,e.label!==void 0?[e.label]:[]))}});const ke={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function Ce(){const{props:e,proxy:{$q:t}}=re(),r=ne(le,Q);if(r===Q)return console.error("QPageSticky needs to be child of QLayout"),Q;const f=c(()=>{const s=e.position;return{top:s.indexOf("top")>-1,right:s.indexOf("right")>-1,bottom:s.indexOf("bottom")>-1,left:s.indexOf("left")>-1,vertical:s==="top"||s==="bottom",horizontal:s==="left"||s==="right"}}),i=c(()=>r.header.offset),p=c(()=>r.right.offset),g=c(()=>r.footer.offset),o=c(()=>r.left.offset),E=c(()=>{let s=0,m=0;const b=f.value,C=t.lang.rtl===!0?-1:1;b.top===!0&&i.value!==0?m=`${i.value}px`:b.bottom===!0&&g.value!==0&&(m=`${-g.value}px`),b.left===!0&&o.value!==0?s=`${C*o.value}px`:b.right===!0&&p.value!==0&&(s=`${-C*p.value}px`);const v={transform:`translate(${s}, ${m})`};return e.offset&&(v.margin=`${e.offset[1]}px ${e.offset[0]}px`),b.vertical===!0?(o.value!==0&&(v[t.lang.rtl===!0?"right":"left"]=`${o.value}px`),p.value!==0&&(v[t.lang.rtl===!0?"left":"right"]=`${p.value}px`)):b.horizontal===!0&&(i.value!==0&&(v.top=`${i.value}px`),g.value!==0&&(v.bottom=`${g.value}px`)),v}),q=c(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function P(s){const m=se(s.default);return N("div",{class:q.value,style:E.value},e.expand===!0?m:[N("div",m)])}return{$layout:r,getStickyContent:P}}var we=j({name:"QPageSticky",props:ke,setup(e,{slots:t}){const{getStickyContent:r}=Ce();return()=>r(t)}}),Te={isAuthenticated:e=>!!e.token,getToken:e=>e.token},Se={async getBetById(e){const t=await S.get(`/bet/${e}`);if(!t)return"No bets found";if(t.status===200)return t.data},async getBets(){const e=await S.get("/bet");if(!e)return"No bet found";if(e.status===200)return e.data},async createBet(e){const t=await S.post("/bet",e);if(!t)return"Bet creation failed";if(t.status===201)return t.data},async updateBet(e){const t=await S.patch(`/bet/${e.id}`,e);if(!t)return"Bet update failed";if(t.status===200)return t.data},async deleteBet(e){const t=await S.delete(`/bet/${e}`);if(!t)return"Bet delete failed";if(t.status===200)return t.data}};const Ie=ie("bet",{state:()=>({info:null}),getters:Te,actions:Se});const qe=G({name:"BetCardComponent",props:{bet:{type:Object,required:!0},user:{type:Object,required:!0}},emits:["udpateBet"],setup(e,{emit:t}){const r=c(()=>{switch(e.bet.gender){case"male":return"male";case"female":return"female";case"other":return"transgender";default:return""}}),f=c(()=>{switch(e.bet.gender){case"male":return"info";case"female":return"primary";case"other":return"warning";default:return""}});function i(){t("udpateBet",{mode:"update",bet:e.bet})}return{onUpdateBet:i,getIcon:r,getIconColor:f}}}),J=e=>(X("data-v-d500ff7a"),e=e(),W(),e),De={class:"text-capitalize"},Ae=J(()=>l("br",null,null,-1)),Oe=J(()=>l("br",null,null,-1));function Pe(e,t,r,f,i,p){return e.bet&&e.user?(d(),_(z,{key:0,class:U(["bet row items-center q-my-sm",e.user.id===e.bet.user_id?"bg-dark":"bg-secondary"])},{default:n(()=>[a(I,{class:"col q-py-sm"},{default:n(()=>[l("p",{class:U([e.user.id===e.bet.user_id?"text-secondary":"text-primary","text-capitalize"])},[l("small",null,$(e.user.id===e.bet.user_id?e.$t("YOU"):e.bet.name),1)],2),l("p",{class:U(["q-ml-md text-center",e.user.id===e.bet.user_id?"text-primary":"text-accent"])},[l("span",De,[a(w,{name:e.getIcon,size:"2em",color:e.getIconColor},null,8,["name","color"])]),Ae,a(w,{name:"height",color:"primary",size:"1.5rem",class:"q-mr-sm"}),T($(e.bet.height)+" ",1),a(w,{name:"fitness_center",color:"primary",size:"1.5rem",class:"q-mr-sm q-ml-md"}),T($(e.bet.weight)+" ",1),Oe,T(" "+$(e.bet.extra),1)],2)]),_:1}),a(I,{class:"q-py-sm"},{default:n(()=>[e.user.id===e.bet.user_id?(d(),_(k,{key:0,onClick:e.onUpdateBet,flat:"",round:"",color:"primary",icon:"edit"},null,8,["onClick"])):B("",!0)]),_:1})]),_:1},8,["class"])):B("",!0)}var Qe=K(qe,[["render",Pe],["__scopeId","data-v-d500ff7a"]]);const Ue=G({name:"IndexPage",components:{BetCard:Qe},setup(){const e=Be(),t=$e(),r=_e(),f=ue(),i=Ie(),p=h([]),g=h(!1),o=h(!1),E=h(!1),q=h(null),P=c(()=>E.value?`${t.t("CREATE_YOUR_BET")}`:`${t.t("UPDATE_YOUR_BET")}`),s=h(null),m=h(null),b=h(null),C=h(null),v=h(null);function x(){r.$patch({appTitle:"Bet"}),q.value=f.getUserInfo,D()}de(async()=>{x()});async function D(){g.value=!0;try{const u=await i.getBets();p.value=u;const y=p.value.map(A=>A.user_id);E.value=!y.includes(f.user.id)}catch(u){console.log("Failed to get data",u)}finally{g.value=!1}}async function ee(){try{await i.deleteBet(v.value)&&e.notify({type:"positive",message:`${t.t("BET_DELETED")}`,badgeColor:"accent"})}catch{response&&e.notify({type:"negative",message:`${t.t("FAILED_TO_DELETE_BET")}`})}finally{D(),o.value=!1}}async function te(){g.value=!0;const u={gender:s.value,height:m.value,weight:b.value,extra:C.value,userId:f.user.id,id:v.value};try{let y;E.value?(y=await i.createBet(u),y&&e.notify({type:"positive",message:`${t.t("BET_ADDED")}`,badgeColor:"accent"})):(y=await i.updateBet(u),y&&e.notify({type:"positive",message:`${t.t("BET_UPDATED")}`,badgeColor:"accent"})),D()}catch{e.notify({type:"negative",message:`${t.t("FAILED_TO_ADD_BET")}`}),console.log("failed to create bets")}finally{}}async function ae(u){var y,A,R,F,H;s.value=((y=u.bet)==null?void 0:y.gender)||null,m.value=((A=u.bet)==null?void 0:A.height)||null,b.value=((R=u.bet)==null?void 0:R.weight)||null,C.value=((F=u.bet)==null?void 0:F.extra)||null,v.value=((H=u.bet)==null?void 0:H.id)||null,o.value=!o.value}return{onOpenBetDialog:ae,getBets:D,submit:te,bets:p,user:q,loadingBets:g,deleteBet:ee,displayBetDialog:o,displayCreateBetBtn:E,getDialogLabel:P,gender:s,height:m,weight:b,extra:C}}}),Z=e=>(X("data-v-35736583"),e=e(),W(),e),Ve={class:"column"},Le={class:"column items-center"},Ne={class:"text-center"},ze=Z(()=>l("br",null,null,-1)),Re=Z(()=>l("br",null,null,-1)),Fe={class:"card--bet no-wrap column"},He={key:0,class:"no-bet q-mt-lg"},Me={key:1,class:"no-bet q-mt-lg"},Ye={key:2,class:"bet__container"},je={class:"q-ml-sm text-accent"},Ge={class:"q-gutter-sm row justify-between"};function Ke(e,t,r,f,i,p){const g=ce("bet-card");return d(),_(he,{class:"page"},{default:n(()=>[a(ve,null,{default:n(()=>[l("div",Ve,[l("div",Le,[a(z,{class:"col-1-md card bg-grey-lighter padding-none"},{default:n(()=>[a(I,{class:"bg-accent"},{default:n(()=>[l("p",Ne,[T($(e.$t("THE_BEST_ARE_OPEN"))+" ",1),ze,T(" "+$(e.$t("YOU_CAN_CHANGE_THEM_AT_ANY_TIME"))+" ",1),Re,T(" "+$(e.$t("SURPRISE_PREPARATION")),1)])]),_:1})]),_:1}),l("div",Fe,[e.loadingBets?(d(),O("div",He,[a(ye,{color:"accent",size:"2em"})])):B("",!0),!e.bets.length&&!e.loadingBets?(d(),O("div",Me,[l("p",null,$(e.$t("NO_BETS_YET")),1),l("p",null,$(e.$t("BE_THE_FIRST")),1)])):B("",!0),e.bets.length&&!e.loadingBets?(d(),O("div",Ye,[(d(!0),O(fe,null,ge(e.bets,(o,E)=>(d(),_(g,{key:E,bet:o,user:e.user,onUdpateBet:e.onOpenBetDialog},null,8,["bet","user","onUdpateBet"]))),128))])):B("",!0)])]),a(pe,{modelValue:e.displayBetDialog,"onUpdate:modelValue":t[7]||(t[7]=o=>e.displayBetDialog=o),class:"dialog--bet"},{default:n(()=>[a(z,{class:"bg-secondary"},{default:n(()=>[a(I,{class:"row justify-center"},{default:n(()=>[l("p",je,$(e.getDialogLabel),1)]),_:1}),a(I,{class:""},{default:n(()=>[l("form",{onSubmit:t[6]||(t[6]=me((...o)=>e.submit&&e.submit(...o),["prevent"]))},[l("div",Ge,[a(k,{icon:"male",color:"info",onClick:t[0]||(t[0]=o=>e.gender="male")},{default:n(()=>[e.gender==="male"?(d(),_(L,{key:0,rounded:"",color:"dark",floating:""},{default:n(()=>[a(w,{name:"check",color:"white",size:"xs"})]),_:1})):B("",!0)]),_:1}),a(k,{icon:"female",color:"primary",onClick:t[1]||(t[1]=o=>e.gender="female")},{default:n(()=>[e.gender==="female"?(d(),_(L,{key:0,rounded:"",color:"dark",floating:""},{default:n(()=>[a(w,{name:"check",color:"white",size:"xs"})]),_:1})):B("",!0)]),_:1}),a(k,{icon:"transgender",color:"warning",onClick:t[2]||(t[2]=o=>e.gender="other")},{default:n(()=>[e.gender==="other"?(d(),_(L,{key:0,rounded:"",color:"dark",floating:""},{default:n(()=>[a(w,{name:"check",color:"white",size:"xs"})]),_:1})):B("",!0)]),_:1})]),a(V,{modelValue:e.height,"onUpdate:modelValue":t[3]||(t[3]=o=>e.height=o),standout:"","bg-color":"accent",placeholder:e.$t("HEIGHT"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"]),a(V,{modelValue:e.weight,"onUpdate:modelValue":t[4]||(t[4]=o=>e.weight=o),standout:"","bg-color":"accent",placeholder:e.$t("WEIGHT"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"]),a(V,{modelValue:e.extra,"onUpdate:modelValue":t[5]||(t[5]=o=>e.extra=o),standout:"","bg-color":"accent",placeholder:e.$t("EXTRA_OPTIONAL"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"])],32)]),_:1}),a(be,{align:"between"},{default:n(()=>[l("div",null,[e.displayCreateBetBtn?B("",!0):(d(),_(k,{key:0,label:e.$t("DELETE"),color:"info",onClick:e.deleteBet},null,8,["label","onClick"]))]),l("div",null,[M(a(k,{flat:"",label:e.$t("CANCEL"),color:"accent"},null,8,["label"]),[[Y]]),M(a(k,{label:e.$t("LETS_ROLL"),color:"accent",onClick:e.submit,disable:!e.gender||!e.height||!e.weight},null,8,["label","onClick","disable"]),[[Y]])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e.displayCreateBetBtn?(d(),_(we,{key:0,position:"bottom-right",offset:[20,20]},{default:n(()=>[a(k,{label:e.$t("MAKE_A_BET"),rounded:"",color:"accent",onClick:t[8]||(t[8]=o=>e.onOpenBetDialog({mode:"create"}))},null,8,["label"])]),_:1})):B("",!0)])]),_:1})]),_:1})}var at=K(Ue,[["render",Ke],["__scopeId","data-v-35736583"]]);export{at as default};
