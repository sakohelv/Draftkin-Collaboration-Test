import {config} from './config.js';
const key='draftkin-collab-test-session-v1';
export class Cloud{
 constructor(){try{this.session=JSON.parse(sessionStorage.getItem(key)||'null');}catch{}this.refreshing=null;this.epoch=0;}
 persist(){if(this.session)sessionStorage.setItem(key,JSON.stringify(this.session));else sessionStorage.removeItem(key);}
 async raw(path,{method='GET',body,token,headers={},binary=false}={}){
  let response;try{response=await fetch(config.url+path,{method,headers:{apikey:config.key,...(token?{Authorization:'Bearer '+token}:{}),...(body instanceof Blob?{}:body===undefined?{}:{'Content-Type':'application/json'}),...headers},body:body===undefined?undefined:body instanceof Blob?body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});}catch{throw Error('Cloud connection unavailable. Your unsaved work is kept in this browser.');}
  if(!response.ok){let problem={};try{problem=await response.json();}catch{}const error=Error(problem.message||problem.msg||problem.error_description||'The cloud could not complete this action.');error.code=problem.code||problem.error_code;error.status=response.status;throw error;}
  return binary?response.blob():response.status===204?null:response.json();
 }
 async authenticate({email,password,name},signup=false){const result=await this.raw(signup?'/auth/v1/signup':'/auth/v1/token?grant_type=password',{method:'POST',body:{email,password,...(signup?{data:{display_name:name}}:{})}});if(!result.access_token)throw Error('This account needs email verification before signing in. Use an existing test account or contact the project owner.');this.session=result;this.session.expires_at=Date.now()/1000+result.expires_in;this.epoch++;this.persist();return result.user;}
 async token(){if(!this.session)throw Error('Sign in first.');if((this.session.expires_at||0)<Date.now()/1000+60){this.refreshing??=this.refresh().finally(()=>{this.refreshing=null;});await this.refreshing;}return this.session.access_token;}
 async refresh(){const session=this.session,epoch=this.epoch;const next=await this.raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token}});if(epoch!==this.epoch)return;this.session=next;this.session.expires_at=Date.now()/1000+next.expires_in;this.persist();}
 async request(path,options={}){const epoch=this.epoch;let result;try{result=await this.raw(path,{...options,token:await this.token()});}catch(e){if(e.status!==401)throw e;await this.refresh();result=await this.raw(path,{...options,token:await this.token()});}if(epoch!==this.epoch)throw Error('The signed-in account changed.');return result;}
 rpc(action,args={}){const body={action,args:{...args,...(['list','get','heartbeat'].includes(action)?{}:{operationId:args.operationId||crypto.randomUUID()})}};return this.request('/rest/v1/rpc/'+config.rpc,{method:'POST',body});}
 async signout(){try{await this.request('/auth/v1/logout?scope=local',{method:'POST'});}catch{}this.epoch++;this.session=null;this.persist();}
 async upload(projectId,file){if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('Choose a PNG, JPG or WebP image smaller than 5 MB.');const path=projectId+'/'+crypto.randomUUID()+'.'+({'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[file.type]);await this.request('/storage/v1/object/'+config.bucket+'/'+path,{method:'POST',body:file,headers:{'Content-Type':file.type,'x-upsert':'false'}});await this.rpc('asset_register',{projectId,path});return path;}
 image(path){return this.request('/storage/v1/object/authenticated/'+config.bucket+'/'+path,{binary:true});}
}
