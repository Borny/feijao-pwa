import{al as V,an as A,am as L,c as d,r as n,o as P,aA as g,j as r,ar as c,y as k,as as b,aT as I,aN as y,H as v,at as N,ay as q,aO as x,aP as B,aB as F}from"./index.756c98db.js";import{u as M}from"./use-quasar.ef1201d0.js";import{u as Q}from"./app.ec9d5d0a.js";const T={name:"AdminLogin",setup(){const o=M(),s=Q(),t=A(),e=L(),u=d(()=>t.isAuth),m=d(()=>l.value&&l.value.length>=4),a=d(()=>l.value&&l.value.length<6),h=n(""),p=n(""),l=n(null),i=n(!1),f=n(!1);function _(){s.$patch({appTitle:"Login"}),f.value=!0}P(async()=>{_()});async function S(){i.value=!0;try{await t.login(p.value,l.value)||o.notify({message:"Please check your name or password",color:"negative"}),e.replace("/home")}catch{o.notify({message:"Please check your name or password",color:"negative"})}finally{i.value=!1}}return{authStore:t,loginSuccess:h,isAuth:u,submit:S,displayForm:f,name:p,password:l,isPasswordValid:m,passwordTooShort:a,isLoading:i}}},E=o=>(x("data-v-d0001408"),o=o(),B(),o),O={class:"row flex-center container bg-primary"},R=E(()=>F("div",{class:"text-h3 q-ma-xl text-center text-info font-keep-on-truckin"},"Feij\xE3o M\xE1gico",-1));function j(o,s,t,e,u,m){return b(),g("div",O,[r(k,null,{default:c(()=>[e.displayForm?(b(),g("form",{key:0,class:"column items-center form",onSubmit:s[2]||(s[2]=I((...a)=>e.submit&&e.submit(...a),["prevent"]))},[R,r(y,{clearable:"",disable:e.isLoading,type:"text",color:"info","label-color":"info",modelValue:e.name,"onUpdate:modelValue":s[0]||(s[0]=a=>e.name=a),label:o.$t("NAME"),placeholder:o.$t("NAME"),class:"q-mb-sm control",rules:[a=>!!a||"Field is required"]},{prepend:c(()=>[r(v,{color:"info",name:"account_circle"})]),_:1},8,["disable","modelValue","label","placeholder","rules"]),r(y,{clearable:"",disable:e.isLoading,type:"password",color:"info","label-color":"info",placeholder:o.$t("PASSWORD"),label:o.$t("PASSWORD"),modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=a=>e.password=a),class:"q-mb-sm control",rules:[a=>!!a||"Field is required"]},{prepend:c(()=>[r(v,{color:"info",name:"key"})]),_:1},8,["disable","placeholder","label","modelValue","rules"]),r(N,{rounded:"",color:"info","text-color":"primary",label:o.$t("SIGN_IN"),loading:e.isLoading,disabled:!e.name||!e.isPasswordValid||e.isLoading,class:"q-mt-lg",type:"submit"},null,8,["label","loading","disabled"])],32)):q("",!0)]),_:1})])}var W=V(T,[["render",j],["__scopeId","data-v-d0001408"]]);export{W as default};
