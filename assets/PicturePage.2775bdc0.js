import{Q as F}from"./QSpinnerTail.270efa77.js";import{c as S,k as x,r as u,w as ee,x as H,h as C,y as Y,l as te,aR as ne,aP as q,aQ as ae,d as W,an as G,o as J,al as K,at as g,ar as B,as as m,j as i,aC as v,ay as D,av as Q,aB as z,au as M,az as h,aA as R,aF as oe,E as V,aG as ie,aS as le,aq as se,aL as $,ax as j,F as re,aM as ue,aD as ce,aT as me,aU as de}from"./index.c5fc1e0b.js";import{Q as fe}from"./QPage.da39006d.js";import{u as ge}from"./use-quasar.eae894f8.js";import{u as ve}from"./vue-i18n.0cb1d7c8.js";import{u as ye}from"./picture.379b6070.js";import{u as pe}from"./app.ea112d3e.js";import{C as U}from"./ClosePopup.148de6b4.js";const Ce={ratio:[String,Number]};function _e(e,t){return S(()=>{const l=Number(e.ratio||(t!==void 0?t.value:void 0));return isNaN(l)!==!0&&l>0?{paddingBottom:`${100/l}%`}:null})}const he=16/9;var Se=x({name:"QImg",props:{...Ce,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:he},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:t,emit:l}){const y=u(e.initialRatio),f=_e(e,y);let a=null,o=!1;const s=[u(null),u(_())],r=u(0),d=u(!1),p=u(!1),b=S(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),w=S(()=>({width:e.width,height:e.height})),P=S(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),L=S(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));ee(()=>E(),k);function E(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function _(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function k(n){a!==null&&(clearTimeout(a),a=null),p.value=!1,n===null?(d.value=!1,s[r.value^1].value=_()):d.value=!0,s[r.value].value=n}function O({target:n}){o!==!0&&(a!==null&&(clearTimeout(a),a=null),y.value=n.naturalHeight===0?.5:n.naturalWidth/n.naturalHeight,c(n,1))}function c(n,I){o===!0||I===1e3||(n.complete===!0?T(n):a=setTimeout(()=>{a=null,c(n,I+1)},50))}function T(n){o!==!0&&(r.value=r.value^1,s[r.value].value=null,d.value=!1,p.value=!1,l("load",n.currentSrc||n.src))}function X(n){a!==null&&(clearTimeout(a),a=null),d.value=!1,p.value=!0,s[r.value].value=null,s[r.value^1].value=_(),l("error",n)}function A(n){const I=s[n].value,N={key:"img_"+n,class:P.value,style:L.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...I};return r.value===n?(N.class+=" q-img__image--waiting",Object.assign(N,{onLoad:O,onError:X})):N.class+=" q-img__image--loaded",C("div",{class:"q-img__container absolute-full",key:"img"+n},C("img",N))}function Z(){return d.value!==!0?C("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},te(t[p.value===!0?"error":"default"])):C("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():e.noSpinner===!0?void 0:[C(ne,{color:e.spinnerColor,size:e.spinnerSize})])}return k(E()),H(()=>{o=!0,a!==null&&(clearTimeout(a),a=null)}),()=>{const n=[];return f.value!==null&&n.push(C("div",{key:"filler",style:f.value})),p.value!==!0&&(s[0].value!==null&&n.push(A(0)),s[1].value!==null&&n.push(A(1))),n.push(C(Y,{name:"q-transition--fade"},Z)),C("div",{class:b.value,style:w.value,role:"img","aria-label":e.alt},n)}}}),De={isAuthenticated:e=>!!e.token,getToken:e=>e.token},Te={async getCommentsByPictureId(e){const t=await q.get(`/comment/${e}`);if(!t)return"No comments found";if(t.status===200)return t.data},async getCommentId(e){const t=await q.get(`/picture/${e}`);if(!t)return"No picture found";if(t.status===201)return t.data},async createComment(e){const t=await q.post("/comment",e);if(!t)return"Comment creation failed";if(t.status===201)return t.data},async deleteComment(e){const t=await q.delete(`/comment/${e}`);if(!t)return"Comment delete failed";if(t.status===200)return t.data}};const $e=ae("comment",{state:()=>({info:null}),getters:De,actions:Te});const be=W({name:"CommentCardComponent",props:{comment:{type:Object,required:!0}},emits:["deleteComment"],setup(e,{emit:t}){const l=G(),y=u(null),f=S(()=>e.comment.updated_at?`${new Date(e.comment.updated_at).getDate()}-${new Date(e.comment.updated_at).getMonth()}-${new Date(e.comment.updated_at).getYear()}`:null);function a(){y.value=l.user}function o(){t("deleteComment",e.comment.id)}return J(async()=>a()),{onDeleteComment:o,openDeleteCommentDialog:u(!1),user:y,formatDate:f}}}),we={class:"q-ml-sm text-info"};function Ee(e,t,l,y,f,a){return e.comment&&e.user?(g(),B(R,{key:0,class:Q(["comment row items-center q-my-sm",e.user.id===e.comment.user_id?"bg-dark":"bg-secondary"])},{default:m(()=>[i(z,{class:"col q-py-sm"},{default:m(()=>[v("p",{class:Q([e.user.id===e.comment.user_id?"text-secondary":"text-primary","text-capitalize"])},[v("small",null,D(e.user.id===e.comment.user_id?e.$t("YOU"):e.comment.name),1)],2),v("p",{class:Q(["q-ml-md",e.user.id===e.comment.user_id?"text-primary":"text-accent"])},D(e.comment.comment),3)]),_:1}),i(z,{class:"q-py-sm"},{default:m(()=>[e.user.id===e.comment.user_id?(g(),B(M,{key:0,onClick:t[0]||(t[0]=o=>e.openDeleteCommentDialog=!0),flat:"",round:"",color:"primary",icon:"delete"})):h("",!0)]),_:1}),i(ie,{modelValue:e.openDeleteCommentDialog,"onUpdate:modelValue":t[1]||(t[1]=o=>e.openDeleteCommentDialog=o),class:"dialog--comment"},{default:m(()=>[i(R,null,{default:m(()=>[i(z,{class:"row items-center"},{default:m(()=>[v("p",we,D(e.$t("CONFIRM_DELETE_COMMENT")),1)]),_:1}),i(oe,{align:"right"},{default:m(()=>[V(i(M,{flat:"",label:e.$t("NO"),color:"info"},null,8,["label"]),[[U]]),V(i(M,{flat:"",label:e.$t("YES"),color:"info",onClick:e.onDeleteComment},null,8,["label","onClick"]),[[U]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["class"])):h("",!0)}var ke=K(be,[["render",Ee],["__scopeId","data-v-6b5c2d06"]]);const Ie=W({name:"PicturePage",components:{CommentCard:ke},setup(){const e=ge(),t=pe(),l=G(),y=ye(),f=$e(),a=ve(),o=u(null),s=le(),r=u(!1),d=u(!1),p=u(null),b=u([]),w=u(!1),P=S(()=>new Date(o.value.created_at).toLocaleDateString("fr-FR",{month:"short",day:"numeric",year:"numeric"}));function L(){r.value=!0,t.$patch({appTitle:"Accueil"}),E()}J(async()=>{L()}),H(async()=>{w.value=!1});async function E(){const c=s.params.id;try{const T=await y.getPictureById(c);o.value=T.picture,_()}catch{}finally{r.value=!1}}async function _(){d.value=!0;try{const c=await f.getCommentsByPictureId(o.value.id);b.value=c}catch(c){console.log("failed to get comments",c)}finally{d.value=!1}}async function k(){try{await f.createComment({comment:p.value,pictureId:o.value.id,userId:l.user.id,userName:l.user.nickname||l.user.name}),p.value=null,_(),e.notify({type:"positive",message:`${a.t("COMMENT_ADDED")}`})}catch(c){e.notify({type:"negative",message:`${a.t("FAILED_TO_ADD_COMMENT")}`}),console.log(c,"failed to create comments")}}async function O(c){d.value=!0;try{const T=await f.deleteComment(c);e.notify({type:"positive",message:`${a.t("COMMENT_DELETED")}`}),_()}catch{e.notify({type:"negative",message:`${a.t("FAILED_TO_DELETE_COMMENT")}`}),console.log("failed to delete comment ")}finally{d.value=!1}}return{createComment:k,deleteComment:O,picture:o,isLoading:r,loadingComments:d,commentToCreate:p,comments:b,displayPage:w,formatDate:P}}}),Ne=e=>(me("data-v-6c748042"),e=e(),de(),e),qe={key:0,class:"row justify-center"},Me={key:0,class:"container"},Be={class:"image__label"},Pe=Ne(()=>v("br",null,null,-1)),Le={class:"card--comment no-wrap column"},Oe={key:0,class:"no-comment"},Qe={key:1,class:"no-comment"},ze={key:2,class:"comment__container"},Re={class:"input__container bg-primary row justify-center"};function Ae(e,t,l,y,f,a){const o=se("comment-card");return g(),B(fe,{class:"page bg-primary"},{default:m(()=>[e.isLoading?(g(),$("div",qe,[i(F,{color:"accent",size:"2em"})])):h("",!0),i(Y,null,{default:m(()=>[!e.isLoading&&e.picture?(g(),$("div",Me,[i(R,{class:"card--picture"},{default:m(()=>[i(Se,{class:"image",src:`https://feijao-app.s3.eu-central-1.amazonaws.com/${e.picture.url}`},{default:m(()=>[v("div",Be,[j(D(e.picture.location)+" ",1),Pe,j(" "+D(e.formatDate),1)])]),_:1},8,["src"])]),_:1}),v("div",Le,[e.loadingComments?(g(),$("div",Oe,[i(F,{color:"accent",size:"2em"})])):h("",!0),!e.comments.length&&!e.loadingComments?(g(),$("div",Qe,[v("p",null,D(e.$t("NO_COMMENTS_YET")),1),v("p",null,D(e.$t("BE_THE_FIRST")),1)])):h("",!0),e.comments.length&&!e.loadingComments?(g(),$("div",ze,[(g(!0),$(re,null,ue(e.comments,(s,r)=>(g(),B(o,{key:r,comment:s,onDeleteComment:e.deleteComment},null,8,["comment","onDeleteComment"]))),128))])):h("",!0),v("div",Re,[i(ce,{onSubmit:e.createComment,rounded:"",standout:"","bg-color":"accent",modelValue:e.commentToCreate,"onUpdate:modelValue":t[0]||(t[0]=s=>e.commentToCreate=s),modelModifiers:{trim:!0},placeholder:e.$t("WHICH_TITLE_WOULD_BE_BEST"),class:"input__comment"},{append:m(()=>[i(M,{onClick:e.createComment,type:"button",color:"primary",disabled:!e.commentToCreate||e.isLoading,round:"",dense:"",flat:"",icon:"send"},null,8,["onClick","disabled"])]),_:1},8,["onSubmit","modelValue","placeholder"])])])])):h("",!0)]),_:1})]),_:1})}var Je=K(Ie,[["render",Ae],["__scopeId","data-v-6c748042"]]);export{Je as default};
