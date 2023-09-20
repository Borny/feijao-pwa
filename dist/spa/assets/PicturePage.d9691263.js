import{Q as R}from"./QSpinnerTail.f66b47d0.js";import{c as S,k as x,r,w as ee,A as U,h as C,W,l as te,aG as ne,aE as q,aF as ae,d as Y,ak as G,o as J,ai as K,ap as g,an as B,ao as m,j as i,ax as v,aB as D,ar as Q,aA as z,aq as M,au as h,az as A,aH as oe,a6 as V,aI as ie,aJ as le,am as se,aw as T,at as j,F as re,ay as ue,aK as ce,aL as me,aM as de}from"./index.1a5c9ee6.js";import{Q as fe}from"./QPage.310fd6b8.js";import{u as ge}from"./use-quasar.5c0b7179.js";import{u as ve}from"./vue-i18n.2a29aa07.js";import{u as ye}from"./picture.f6688fe1.js";import{u as pe}from"./app.c126dda0.js";import{C as H}from"./ClosePopup.802ce695.js";const Ce={ratio:[String,Number]};function _e(e,t){return S(()=>{const c=Number(e.ratio||(t!==void 0?t.value:void 0));return isNaN(c)!==!0&&c>0?{paddingBottom:`${100/c}%`}:null})}const he=16/9;var Se=x({name:"QImg",props:{...Ce,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:he},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:t,emit:c}){const y=r(e.initialRatio),f=_e(e,y);let a=null,o=!1;const l=[r(null),r(_())],s=r(0),d=r(!1),p=r(!1),w=S(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),b=S(()=>({width:e.width,height:e.height})),L=S(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),O=S(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));ee(()=>k(),E);function k(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function _(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function E(n){a!==null&&(clearTimeout(a),a=null),p.value=!1,n===null?(d.value=!1,l[s.value^1].value=_()):d.value=!0,l[s.value].value=n}function P({target:n}){o!==!0&&(a!==null&&(clearTimeout(a),a=null),y.value=n.naturalHeight===0?.5:n.naturalWidth/n.naturalHeight,u(n,1))}function u(n,I){o===!0||I===1e3||(n.complete===!0?$(n):a=setTimeout(()=>{a=null,u(n,I+1)},50))}function $(n){o!==!0&&(s.value=s.value^1,l[s.value].value=null,d.value=!1,p.value=!1,c("load",n.currentSrc||n.src))}function X(n){a!==null&&(clearTimeout(a),a=null),d.value=!1,p.value=!0,l[s.value].value=null,l[s.value^1].value=_(),c("error",n)}function F(n){const I=l[n].value,N={key:"img_"+n,class:L.value,style:O.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...I};return s.value===n?(N.class+=" q-img__image--waiting",Object.assign(N,{onLoad:P,onError:X})):N.class+=" q-img__image--loaded",C("div",{class:"q-img__container absolute-full",key:"img"+n},C("img",N))}function Z(){return d.value!==!0?C("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},te(t[p.value===!0?"error":"default"])):C("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():e.noSpinner===!0?void 0:[C(ne,{color:e.spinnerColor,size:e.spinnerSize})])}return E(k()),U(()=>{o=!0,a!==null&&(clearTimeout(a),a=null)}),()=>{const n=[];return f.value!==null&&n.push(C("div",{key:"filler",style:f.value})),p.value!==!0&&(l[0].value!==null&&n.push(F(0)),l[1].value!==null&&n.push(F(1))),n.push(C(W,{name:"q-transition--fade"},Z)),C("div",{class:w.value,style:b.value,role:"img","aria-label":e.alt},n)}}}),De={isAuthenticated:e=>!!e.token,getToken:e=>e.token},$e={async getCommentsByPictureId(e){const t=await q.get(`/comment/${e}`);if(!t)return"No comments found";if(t.status===200)return t.data},async getCommentId(e){const t=await q.get(`/picture/${e}`);if(!t)return"No picture found";if(t.status===201)return t.data},async createComment(e){const t=await q.post("/comment",e);if(!t)return"Comment creation failed";if(t.status===201)return t.data},async deleteComment(e){const t=await q.delete(`/comment/${e}`);if(!t)return"Comment delete failed";if(t.status===200)return t.data}};const Te=ae("comment",{state:()=>({info:null}),getters:De,actions:$e});const we=Y({name:"CommentCardComponent",props:{comment:{type:Object,required:!0}},emits:["deleteComment"],setup(e,{emit:t}){const c=G(),y=r(null),f=S(()=>e.comment.updated_at?`${new Date(e.comment.updated_at).getDate()}-${new Date(e.comment.updated_at).getMonth()}-${new Date(e.comment.updated_at).getYear()}`:null);function a(){y.value=c.user}function o(){t("deleteComment",e.comment.id)}return J(async()=>a()),{onDeleteComment:o,openDeleteCommentDialog:r(!1),user:y,formatDate:f}}}),be={class:"q-ml-sm text-info"};function ke(e,t,c,y,f,a){return e.comment&&e.user?(g(),B(A,{key:0,class:Q(["comment row items-center q-my-sm",e.user.id===e.comment.user_id?"bg-dark":"bg-secondary"])},{default:m(()=>[i(z,{class:"col q-py-sm"},{default:m(()=>[v("p",{class:Q(e.user.id===e.comment.user_id?"text-secondary":"text-dark")},[v("small",null,D(e.user.id===e.comment.user_id?e.$t("YOU"):e.comment.name),1)],2),v("p",{class:Q(["q-ml-md",e.user.id===e.comment.user_id?"text-primary":"text-accent"])},D(e.comment.comment),3)]),_:1}),i(z,{class:"q-py-sm"},{default:m(()=>[e.user.id===e.comment.user_id?(g(),B(M,{key:0,onClick:t[0]||(t[0]=o=>e.openDeleteCommentDialog=!0),flat:"",round:"",color:"primary",icon:"delete"})):h("",!0)]),_:1}),i(ie,{modelValue:e.openDeleteCommentDialog,"onUpdate:modelValue":t[1]||(t[1]=o=>e.openDeleteCommentDialog=o),class:"dialog--comment"},{default:m(()=>[i(A,null,{default:m(()=>[i(z,{class:"row items-center"},{default:m(()=>[v("p",be,D(e.$t("CONFIRM_DELETE_COMMENT")),1)]),_:1}),i(oe,{align:"right"},{default:m(()=>[V(i(M,{flat:"",label:e.$t("NO"),color:"info"},null,8,["label"]),[[H]]),V(i(M,{flat:"",label:e.$t("YES"),color:"info",onClick:e.onDeleteComment},null,8,["label","onClick"]),[[H]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["class"])):h("",!0)}var Ee=K(we,[["render",ke],["__scopeId","data-v-9309d4de"]]);const Ie=Y({name:"PicturePage",components:{CommentCard:Ee},setup(){const e=ge(),t=pe(),c=G(),y=ye(),f=Te(),a=ve(),o=r(null),l=le(),s=r(!1),d=r(!1),p=r(null),w=r([]),b=r(!1),L=S(()=>new Date(o.value.created_at).toLocaleDateString("fr-FR",{month:"short",day:"numeric",year:"numeric"}));function O(){s.value=!0,t.$patch({appTitle:"Accueil"}),k()}J(async()=>{O()}),U(async()=>{b.value=!1});async function k(){const u=l.params.id;try{const $=await y.getPictureById(u);o.value=$.picture,_()}catch{}finally{s.value=!1}}async function _(){d.value=!0;try{const u=await f.getCommentsByPictureId(o.value.id);w.value=u}catch(u){console.log("failed to get comments",u)}finally{d.value=!1}}async function E(){try{await f.createComment({comment:p.value,pictureId:o.value.id,userId:c.user.id}),p.value=null,_(),e.notify({type:"positive",message:`${a.t("COMMENT_ADDED")}`})}catch(u){e.notify({type:"negative",message:`${a.t("FAILED_TO_ADD_COMMENT")}`}),console.log(u,"failed to create comments")}}async function P(u){d.value=!0;try{const $=await f.deleteComment(u);e.notify({type:"positive",message:`${a.t("COMMENT_DELETED")}`}),_()}catch{e.notify({type:"negative",message:`${a.t("FAILED_TO_DELETE_COMMENT")}`}),console.log("failed to delete comment ")}finally{d.value=!1}}return{createComment:E,deleteComment:P,picture:o,isLoading:s,loadingComments:d,commentToCreate:p,comments:w,displayPage:b,formatDate:L}}}),Ne=e=>(me("data-v-7a111604"),e=e(),de(),e),qe={key:0,class:"row justify-center"},Me={key:0,class:"container"},Be={class:"image__label"},Le=Ne(()=>v("br",null,null,-1)),Oe={class:"card--comment no-wrap column"},Pe={key:0,class:"no-comment"},Qe={key:1,class:"no-comment"},ze={key:2,class:"comment__container"},Ae={class:"input__container bg-primary row justify-center"};function Fe(e,t,c,y,f,a){const o=se("comment-card");return g(),B(fe,{class:"page bg-primary"},{default:m(()=>[e.isLoading?(g(),T("div",qe,[i(R,{color:"accent",size:"2em"})])):h("",!0),i(W,null,{default:m(()=>[!e.isLoading&&e.picture?(g(),T("div",Me,[i(A,{class:"card--picture"},{default:m(()=>[i(Se,{class:"image",src:`https://feijao-app.s3.eu-central-1.amazonaws.com/${e.picture.url}`},{default:m(()=>[v("div",Be,[j(D(e.picture.location)+" ",1),Le,j(" "+D(e.formatDate),1)])]),_:1},8,["src"])]),_:1}),v("div",Oe,[e.loadingComments?(g(),T("div",Pe,[i(R,{color:"accent",size:"2em"})])):h("",!0),!e.comments.length&&!e.loadingComments?(g(),T("div",Qe,[v("p",null,D(e.$t("NO_COMMENTS_YET")),1),v("p",null,D(e.$t("BE_THE_FIRST")),1)])):h("",!0),e.comments.length&&!e.loadingComments?(g(),T("div",ze,[(g(!0),T(re,null,ue(e.comments,(l,s)=>(g(),B(o,{key:s,comment:l,onDeleteComment:e.deleteComment},null,8,["comment","onDeleteComment"]))),128))])):h("",!0),v("div",Ae,[i(ce,{onSubmit:e.createComment,rounded:"",standout:"","bg-color":"accent",modelValue:e.commentToCreate,"onUpdate:modelValue":t[0]||(t[0]=l=>e.commentToCreate=l),modelModifiers:{trim:!0},placeholder:e.$t("WHICH_TITLE_WOULD_BE_BEST"),class:"input__comment"},{append:m(()=>[i(M,{onClick:e.createComment,type:"button",color:"primary",disabled:!e.commentToCreate||e.isLoading,round:"",dense:"",flat:"",icon:"send"},null,8,["onClick","disabled"])]),_:1},8,["onSubmit","modelValue","placeholder"])])])])):h("",!0)]),_:1})]),_:1})}var Je=K(Ie,[["render",Fe],["__scopeId","data-v-7a111604"]]);export{Je as default};