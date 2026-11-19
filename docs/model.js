export const uid=()=>crypto.randomUUID();
export const clone=value=>structuredClone(value);
export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const stageLabel=stage=>({draft:'Working draft',internal_review:'Internal check',checked:'Checked · ready to send',studio_review:'With Studio',changes_requested:'Changes requested',approved:'Approved'})[stage]||stage;
export const roleLabel=role=>({lighting_lead:'Lighting lead',lighting_editor:'Lighting designer',lighting_reviewer:'Lighting reviewer',studio_reviewer:'Studio reviewer'})[role]||role;
export const textElement=(text='Click to edit text',extra={})=>({id:uid(),kind:'text',x:8,y:12,w:84,h:18,text,size:38,color:'#20252a',bold:true,align:'left',...extra});
export const newSlide=(title='New slide')=>({id:uid(),background:'#ffffff',elements:[textElement(title),textElement('Add your lighting concept, design intent or review notes.',{y:36,h:48,size:23,bold:false})]});
export const newDeck=()=>({schema:1,slides:[newSlide('Lighting concept')]});
export const safeColor=value=>/^#[\da-f]{6}$/i.test(value||'')?value:'#20252a';
export const clamp=(value,min,max)=>Math.min(max,Math.max(min,Number(value)||0));
export function elementStyle(e){return `left:${clamp(e.x,0,99)}%;top:${clamp(e.y,0,99)}%;width:${clamp(e.w,1,100)}%;height:${clamp(e.h,1,100)}%;`;}
export function canvasHtml(slide,{selected='',images=new Map(),editable=false,pins=[]}={}){
 return (slide?.elements||[]).map(e=>`<div class="element ${e.kind==='text'?'text-element':''} ${selected===e.id?'selected':''}" data-element="${escapeHtml(e.id)}" style="${elementStyle(e)}" ${editable?'tabindex="0" role="button" aria-label="Select '+escapeHtml(e.kind==='text'?e.text.slice(0,60):e.kind)+'"':''}>${e.kind==='image'?`<img draggable="false" alt="Presentation image" src="${escapeHtml(images.get(e.asset)||'')}" ${images.has(e.asset)?'':'hidden'}><span class="image-wait" ${images.has(e.asset)?'hidden':''}>Loading image…</span>`:e.kind==='shape'?`<div class="shape" style="background:${safeColor(e.color)};border-radius:${e.rounded?'12px':'0'}"></div>`:`<div class="slide-text" style="font-size:${clamp(e.size,8,120)/9.6}cqw;color:${safeColor(e.color)};font-weight:${e.bold?'700':'400'};text-align:${['left','center','right'].includes(e.align)?e.align:'left'}">${escapeHtml(e.text)}</div>`}${editable&&selected===e.id?'<span class="resize-handle" data-resize="true"></span>':''}</div>`).join('')+pins.map((pin,i)=>`<button class="pin" data-pin="${escapeHtml(pin.id)}" style="left:${clamp(pin.x,0,100)}%;top:${clamp(pin.y,0,100)}%" aria-label="Comment ${i+1}">${i+1}</button>`).join('');
}
