import{aO as r,aP as s}from"./index.2d05252b.js";var u={isAuthenticated:t=>!!t.token,getToken:t=>t.token},n={async getPictures(){const t=await r.get("/pictures");if(!t)return"No pictures found";if(t.status===201)return t.data},async getPictureById(t){const e=await r.get(`/picture/${t}`);if(!e)return"No picture found";if(e.status===200)return e.data},async getPictureWithComments(t){const e=await r.get(`/picture-comment/${t}`);if(!e)return"No picture found";if(e.status===200)return e.data},async getPicture(t){const e=await r.get(`/picture/${t}`);if(!e)return"No picture found";if(e.status===201)return e.data}};const i=s("picture",{state:()=>({pictures:null}),getters:u,actions:n});export{i as u};