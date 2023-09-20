import{i as ee,a1 as U,a2 as te,c as B,l as ae,h as H,g as oe,k as se,aE as T,aF as le,d as z,ai as j,ap as v,an as k,ao as i,j as o,ax as l,aB as p,ar as P,at as S,aA as w,aq as C,au as _,az as q,aL as G,aM as K,ak as ne,r as y,o as re,am as ie,aw as V,F as ue,ay as de,aI as pe,aQ as ce,aR as L,aK as Q,aH as fe,a6 as M,W as ge}from"./index.1a5c9ee6.js";import{Q as me}from"./QSpinnerTail.f66b47d0.js";import{Q as be}from"./QPage.310fd6b8.js";import{C as Y}from"./ClosePopup.802ce695.js";import{u as ye}from"./use-quasar.5c0b7179.js";import{u as ve}from"./vue-i18n.2a29aa07.js";import{u as he}from"./app.c126dda0.js";const Be={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function $e(){const{props:e,proxy:{$q:t}}=oe(),n=ee(te,U);if(n===U)return console.error("QPageSticky needs to be child of QLayout"),U;const $=B(()=>{const s=e.position;return{top:s.indexOf("top")>-1,right:s.indexOf("right")>-1,bottom:s.indexOf("bottom")>-1,left:s.indexOf("left")>-1,vertical:s==="top"||s==="bottom",horizontal:s==="left"||s==="right"}}),u=B(()=>n.header.offset),c=B(()=>n.right.offset),d=B(()=>n.footer.offset),a=B(()=>n.left.offset),h=B(()=>{let s=0,f=0;const g=$.value,E=t.lang.rtl===!0?-1:1;g.top===!0&&u.value!==0?f=`${u.value}px`:g.bottom===!0&&d.value!==0&&(f=`${-d.value}px`),g.left===!0&&a.value!==0?s=`${E*a.value}px`:g.right===!0&&c.value!==0&&(s=`${-E*c.value}px`);const m={transform:`translate(${s}, ${f})`};return e.offset&&(m.margin=`${e.offset[1]}px ${e.offset[0]}px`),g.vertical===!0?(a.value!==0&&(m[t.lang.rtl===!0?"right":"left"]=`${a.value}px`),c.value!==0&&(m[t.lang.rtl===!0?"left":"right"]=`${c.value}px`)):g.horizontal===!0&&(u.value!==0&&(m.top=`${u.value}px`),d.value!==0&&(m.bottom=`${d.value}px`)),m}),A=B(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function O(s){const f=ae(s.default);return H("div",{class:A.value,style:h.value},e.expand===!0?f:[H("div",f)])}return{$layout:n,getStickyContent:O}}var _e=se({name:"QPageSticky",props:Be,setup(e,{slots:t}){const{getStickyContent:n}=$e();return()=>n(t)}}),Ee={isAuthenticated:e=>!!e.token,getToken:e=>e.token},ke={async getBetById(e){const t=await T.get(`/bet/${e}`);if(!t)return"No bets found";if(t.status===200)return t.data},async getBets(){const e=await T.get("/bet");if(!e)return"No bet found";if(e.status===200)return e.data},async createBet(e){const t=await T.post("/bet",e);if(!t)return"Bet creation failed";if(t.status===201)return t.data},async updateBet(e){const t=await T.patch(`/bet/${e.id}`,e);if(!t)return"Bet update failed";if(t.status===200)return t.data},async deleteBet(e){const t=await T.delete(`/bet/${e}`);if(!t)return"Bet delete failed";if(t.status===200)return t.data}};const Te=le("bet",{state:()=>({info:null}),getters:Ee,actions:ke});const Ce=z({name:"BetCardComponent",props:{bet:{type:Object,required:!0},user:{type:Object,required:!0}},emits:["udpateBet"],setup(e,{emit:t}){function n(){t("udpateBet",{mode:"update",bet:e.bet})}return{onUpdateBet:n}}}),Se=e=>(G("data-v-4fd561b4"),e=e(),K(),e),we={class:"text-capitalize"},Ae=Se(()=>l("br",null,null,-1));function De(e,t,n,$,u,c){return e.bet&&e.user?(v(),k(q,{key:0,class:P(["bet row items-center q-my-sm",e.user.id===e.bet.user_id?"bg-dark":"bg-secondary"])},{default:i(()=>[o(w,{class:"col q-py-sm"},{default:i(()=>[l("p",{class:P(e.user.id===e.bet.user_id?"text-secondary":"text-dark")},[l("small",null,p(e.user.id===e.bet.user_id?e.$t("YOU"):e.bet.name),1)],2),l("p",{class:P(["q-ml-md text-center",e.user.id===e.bet.user_id?"text-primary":"text-accent"])},[l("span",we,p(e.bet.gender),1),S(" - "+p(e.bet.height)+" - "+p(e.bet.weight)+" ",1),Ae,S(" "+p(e.bet.extra),1)],2)]),_:1}),o(w,{class:"q-py-sm"},{default:i(()=>[e.user.id===e.bet.user_id?(v(),k(C,{key:0,onClick:e.onUpdateBet,flat:"",round:"",color:"primary",icon:"edit"},null,8,["onClick"])):_("",!0)]),_:1})]),_:1},8,["class"])):_("",!0)}var Ie=j(Ce,[["render",De],["__scopeId","data-v-4fd561b4"]]);const Ve=z({name:"IndexPage",components:{BetCard:Ie},setup(){const e=ye(),t=ve(),n=he(),$=ne(),u=Te(),c=y([]),d=y(!1),a=y(!1),h=y(!1),A=y(null),O=B(()=>h.value?`${t.t("CREATE_YOUR_BET")}`:`${t.t("UPDATE_YOUR_BET")}`),s=y(null),f=y(null),g=y(null),E=y(null),m=y(null);function X(){n.$patch({appTitle:"Bet"}),A.value=$.getUserInfo,D()}re(async()=>{X()});async function D(){d.value=!0;try{const r=await u.getBets();c.value=r;const b=c.value.map(I=>I.user_id);h.value=!b.includes($.user.id)}catch(r){console.log("Failed to get data",r)}finally{d.value=!1}}async function J(){try{await u.deleteBet(m.value)&&e.notify({type:"positive",message:`${t.t("BET_DELETED")}`})}catch{response&&e.notify({type:"negative",message:`${t.t("FAILED_TO_DELETE_BET")}`})}finally{D(),a.value=!1}}async function Z(){d.value=!0;const r={gender:s.value,height:f.value,weight:g.value,extra:E.value,userId:$.user.id,id:m.value};try{let b;h.value?(b=await u.createBet(r),b&&e.notify({type:"positive",message:`${t.t("BET_ADDED")}`})):(b=await u.updateBet(r),b&&e.notify({type:"positive",message:`${t.t("BET_UPDATED")}`})),D()}catch{e.notify({type:"negative",message:`${t.t("FAILED_TO_ADD_BET")}`}),console.log("failed to create bets")}finally{}}async function x(r){var b,I,R,N,F;s.value=((b=r.bet)==null?void 0:b.gender)||null,f.value=((I=r.bet)==null?void 0:I.height)||null,g.value=((R=r.bet)==null?void 0:R.weight)||null,E.value=((N=r.bet)==null?void 0:N.extra)||null,m.value=((F=r.bet)==null?void 0:F.id)||null,a.value=!a.value}return{onOpenBetDialog:x,getBets:D,submit:Z,bets:c,user:A,loadingBets:d,deleteBet:J,displayBetDialog:a,displayCreateBetBtn:h,getDialogLabel:O,gender:s,height:f,weight:g,extra:E}}}),W=e=>(G("data-v-46a8b9cc"),e=e(),K(),e),Oe={class:"column"},Ue={class:"column items-center"},Pe={class:"text-center"},Le=W(()=>l("br",null,null,-1)),Qe=W(()=>l("br",null,null,-1)),qe={class:"card--bet no-wrap column"},Re={key:0,class:"no-bet"},Ne={key:1,class:"no-bet"},Fe={key:2,class:"bet__container"},He={class:"q-ml-sm text-accent"},Me={class:"q-gutter-sm"};function Ye(e,t,n,$,u,c){const d=ie("bet-card");return v(),k(be,{class:"page"},{default:i(()=>[o(ge,null,{default:i(()=>[l("div",Oe,[l("div",Ue,[o(q,{class:"col-1-md card bg-grey-lighter padding-none"},{default:i(()=>[o(w,{class:"bg-accent"},{default:i(()=>[l("p",Pe,[S(p(e.$t("THE_BEST_ARE_OPEN"))+" ",1),Le,S(" "+p(e.$t("YOU_CAN_CHANGE_THEM_AT_ANY_TIME"))+" ",1),Qe,S(" "+p(e.$t("SURPRISE_PREPARATION")),1)])]),_:1})]),_:1}),l("div",qe,[e.loadingBets?(v(),V("div",Re,[o(me,{color:"accent",size:"2em"})])):_("",!0),!e.bets.length&&!e.loadingBets?(v(),V("div",Ne,[l("p",null,p(e.$t("NO_BETS_YET")),1),l("p",null,p(e.$t("BE_THE_FIRST")),1)])):_("",!0),e.bets.length&&!e.loadingBets?(v(),V("div",Fe,[(v(!0),V(ue,null,de(e.bets,(a,h)=>(v(),k(d,{key:h,bet:a,user:e.user,onUdpateBet:e.onOpenBetDialog},null,8,["bet","user","onUdpateBet"]))),128))])):_("",!0)])]),o(pe,{modelValue:e.displayBetDialog,"onUpdate:modelValue":t[7]||(t[7]=a=>e.displayBetDialog=a),class:"dialog--bet"},{default:i(()=>[o(q,{class:"bg-secondary"},{default:i(()=>[o(w,{class:"row justify-center"},{default:i(()=>[l("p",He,p(e.getDialogLabel),1)]),_:1}),o(w,{class:""},{default:i(()=>[l("form",{onSubmit:t[6]||(t[6]=ce((...a)=>e.submit&&e.submit(...a),["prevent"]))},[l("div",Me,[o(L,{modelValue:e.gender,"onUpdate:modelValue":t[0]||(t[0]=a=>e.gender=a),color:"accent","checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",val:"male",label:e.$t("MALE")},null,8,["modelValue","label"]),o(L,{modelValue:e.gender,"onUpdate:modelValue":t[1]||(t[1]=a=>e.gender=a),color:"accent","checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",val:"female",label:e.$t("FEMALE")},null,8,["modelValue","label"]),o(L,{modelValue:e.gender,"onUpdate:modelValue":t[2]||(t[2]=a=>e.gender=a),color:"accent","checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",val:"other",label:e.$t("OTHER")},null,8,["modelValue","label"])]),o(Q,{modelValue:e.height,"onUpdate:modelValue":t[3]||(t[3]=a=>e.height=a),rounded:"",standout:"","bg-color":"accent",placeholder:e.$t("HEIGHT"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"]),o(Q,{modelValue:e.weight,"onUpdate:modelValue":t[4]||(t[4]=a=>e.weight=a),rounded:"",standout:"","bg-color":"accent",placeholder:e.$t("WEIGHT"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"]),o(Q,{modelValue:e.extra,"onUpdate:modelValue":t[5]||(t[5]=a=>e.extra=a),rounded:"",standout:"","bg-color":"accent",placeholder:e.$t("EXTRA_OPTIONAL"),class:"input__bet q-my-sm"},null,8,["modelValue","placeholder"])],32)]),_:1}),o(fe,{align:"between"},{default:i(()=>[l("div",null,[e.displayCreateBetBtn?_("",!0):(v(),k(C,{key:0,label:e.$t("DELETE"),color:"info",onClick:e.deleteBet},null,8,["label","onClick"]))]),l("div",null,[M(o(C,{flat:"",label:e.$t("CANCEL"),color:"accent"},null,8,["label"]),[[Y]]),M(o(C,{label:e.$t("LETS_ROLL"),color:"accent",onClick:e.submit,disable:!e.gender||!e.height||!e.weight},null,8,["label","onClick","disable"]),[[Y]])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e.displayCreateBetBtn?(v(),k(_e,{key:0,position:"bottom-right",offset:[20,20]},{default:i(()=>[o(C,{label:e.$t("MAKE_A_BET"),rounded:"",color:"accent",onClick:t[8]||(t[8]=a=>e.onOpenBetDialog({mode:"create"}))},null,8,["label"])]),_:1})):_("",!0)])]),_:1})]),_:1})}var Ze=j(Ve,[["render",Ye],["__scopeId","data-v-46a8b9cc"]]);export{Ze as default};