import { readFileSync } from 'node:fs';
const inventory=JSON.parse(readFileSync(new URL('../lecturas/fuentes-audiovisuales.json',import.meta.url),'utf8'));
const byId=new Map(inventory.videos.map(v=>[v.id,v]));
const plain=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&#8217;',"'").replaceAll('&#8220;','“').replaceAll('&#8221;','”');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function collectVideoRecommendations(section,notes){
 const recommendations=[];
 function walk(node){
  if(!node.getContext) return;
  const blocks=node.getBlocks?.()||[];
  for(const [position,block] of blocks.entries()){
   if(block.hasRole?.('audiovisual')){
    const sectionId=node.getId(),key=`${sectionId}:${position}`,html=block.convert();
    const after=notes.slides.findIndex(text=>text.includes(`data-note-source="${key}"`));
    if(after<0) throw Error(`Video recommendation has no matching slide: ${key}`);
    const videos=new Map();
    for(const match of html.matchAll(/<a\b[^>]*href="(https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)){
     const url=plain(match[1]),parsed=new URL(url);
     const id=parsed.hostname==='youtu.be'?parsed.pathname.slice(1):parsed.searchParams.get('v');
     if(!id) continue;
     const metadata=byId.get(id);if(!metadata) throw Error(`Video not present in source inventory: ${id}`);
     if(!videos.has(id))videos.set(id,{...metadata,links:[]});
     const links=videos.get(id).links;if(!links.some(x=>x.url===url))links.push({url,label:plain(match[2])});
    }
    if(!videos.size) throw Error(`Audiovisual block without video links: ${key}`);
    const paragraph=block.getBlocks().find(b=>b.getContext()==='paragraph');
    const text=paragraph?plain(paragraph.convert()).replace(/\s+/g,' ').trim():'';
    // A compact lead on screen; the unabridged material remains in speaker notes.
    const lead=text.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim()||text;
    recommendations.push({key,sectionId,after,title:plain(block.getTitle()),lead,videos:[...videos.values()],notes:html});
   }
   walk(block);
  }
 }
 walk(section);return recommendations;
}
export function renderVideoRecommendation(item,index,number,headings){
 const cards=item.videos.map(video=>{
  const first=video.links[0],chapters=video.links.filter(x=>new URL(x.url).searchParams.has('t'));
  const complementary=video.evidence==='publisher_description_only_complementary_viewing';
  return `<article class="video-card"><a class="video-poster" href="${escape(first.url)}" target="_blank" rel="noopener" aria-label="Ver ${escape(video.title)}"><img src="${escape(video.poster||`images/videos/${video.id}.jpg`)}" alt="${escape(video.posterAlt||`Miniatura del vídeo ${video.title}`)}"><span aria-hidden="true">▶</span></a><h3><a href="${escape(first.url)}" target="_blank" rel="noopener">${escape(video.title)}</a></h3><p class="video-author">${escape(video.author||'')}</p>${chapters.length?`<ul class="video-chapters">${chapters.map(c=>`<li><a href="${escape(c.url)}" target="_blank" rel="noopener">${escape(c.label)}</a></li>`).join('')}</ul>`:''}${complementary?'<p class="video-complementary">Visionado complementario · sin transcripción disponible</p>':''}</article>`;
 }).join('');
 const heading=headings[item.sectionId];if(!heading)throw Error(`Missing video source heading ${item.sectionId}`);
 return `<section id="${escape(item.id||`video-recommendation-${index}-${number}`)}" class="video-recommendation" data-after="${escape(item.afterId||`slide-${index}-${item.after}`)}" aria-label="${escape(item.title)}"><p class="eyebrow">Vídeos recomendados</p><h2>${escape(item.title)}</h2><p class="video-lead">${escape(item.lead)}</p><div class="video-cards">${cards}</div><footer class="notes-references"><ul><li><a href="apuntes.html#${encodeURIComponent(item.sectionId)}" target="_blank" rel="noopener">${escape(heading)}</a></li></ul></footer><aside class="notes">${item.notes}</aside></section>`;
}
