import{Q as $}from"./QSpinnerTail.f9c38acc.js";import{ai as S,d as w,r as u,o as P,am as Q,an as v,ao as o,ap as r,aw as d,j as s,au as h,ax as k,F as B,ay as C,W as I,az as j,as as x,aA as b,aB as z}from"./index.725860d8.js";import{Q as F}from"./QPage.9f7ce624.js";import{u as L}from"./picture.691e210d.js";import{u as M}from"./app.7e412ab7.js";import{u as q}from"./use-quasar.d7b61056.js";const A=w({name:"IndexPage",setup(){const t=q(),p=M(),m=L(),n=u([]),i=u(!1),_=u("background: url('../feijao-pwa/assets/pictures/IMG_20230824_193519_Bokeh.jpg')");function c(){return g()}function a(){i.value=!0,p.$patch({appTitle:"Accueil"}),f()}P(async()=>{a()});function l(e){return`background: url('../feijao-pwa/assets/pictures/${e}')`}function g(){return Math.floor(Math.random()*(20- -20+1))+-20}async function f(){try{const e=await m.getPictures();e||t.notify({message:"Failed to get data",color:"negative",icon:"report_problem",position:"top",timeout:2500}),n.value=e.data,n.value.forEach(y=>{y.rotate=g()})}catch(e){console.log("failed to get data",e),t.notify({message:"Failed to get data",color:"negative",icon:"report_problem",position:"top",timeout:2500})}finally{i.value=!1}}return{getRotation:c,getPicture:l,pictures:n,getData:f,isLoading:i,url:_}}}),N={key:0,class:"row"},T={key:0},V={class:"row justify-center"},D={class:"text-h4 text-center font-caveat text-bold text-primary"};function E(t,p,m,n,i,_){const c=Q("router-link");return r(),v(F,{class:"page row justify-center items-center bg-secondary"},{default:o(()=>[t.isLoading?(r(),d("div",N,[s($,{color:"accent",size:"2em"})])):h("",!0),s(I,null,{default:o(()=>[t.isLoading?h("",!0):(r(),d("div",T,[k("div",V,[(r(!0),d(B,null,C(t.pictures,(a,l)=>(r(),v(j,{key:l,style:x({transform:`rotate(${a.rotate}deg)`}),class:"col-1-md q-ma-lg card bg-grey-lighter"},{default:o(()=>[s(c,{to:`/picture/${a.id}`},{default:o(()=>[s(b,{style:x({backgroundImage:`url('https://feijao-app.s3.eu-central-1.amazonaws.com/${a.url}')`}),class:"card__image"},null,8,["style"]),s(b,{class:"q-py-md bg-grey-lighter"},{default:o(()=>[k("div",D,z(a.title),1)]),_:2},1024)]),_:2},1032,["to"])]),_:2},1032,["style"]))),128))])]))]),_:1})]),_:1})}var O=S(A,[["render",E],["__scopeId","data-v-dd904030"]]);export{O as default};
