// Only active AsciiDoc icon attributes count; commented-out markers are ignored.
const placement = [
 {
  '¿Cuáles de las siguientes interfaces proporcionan representaciones _aprendibles_?': {before:7,context:true},
  '¿Todas las UI proporcionan un comportamiento funcional determinista?': {before:8,answer:5,video:true},
  '¿Qué implica este significante?': {before:6,context:true}
 },
 {
  '¿Son las interfaces interactivas tipo WIMP naturales o aprendibles?': {before:0},
  '¿Qué futuro espera a la manipulación directa?': {before:2},
  '¿Qué distancia traslacional suponen estas UI?': {before:1,context:true}
 },
 {
  '¿Por qué _end-user_?': {before:1},
  '¿Por qué algunos ingenieros prefieren Python y otros Excel?': {before:1},
  '¿Recuerdan a Vannevar Bush?': {before:2,context:true},
  '¿Excel usa alguna encarnación?': {before:5,answer:4,topic:4}
 },
 {}
];
export function collectQuestions(section,index){
 const questions=[];
 function walk(node,sectionId){
  if(!node.getContext) return;
  if(node.getContext()==='section') sectionId=node.getId();
  const blocks=node.getBlocks?.()||[];
  for(const [position,block] of blocks.entries()){
   if(block.getAttribute?.('icon')==='question54px.png'){
    const source=block.getSource(),route=placement[index][source];
    if(!route) throw Error(`Question needs a response slide: ${source}`);
    const next=blocks[position+1];
    let video;
    if(route.video){
     const html=next?.convert()||'';
     const match=html.match(/<a\b[^>]*href="(https:\/\/vimeo\.com\/([0-9]+))"[^>]*>([\s\S]*?)<\/a>/);
     if(!match) throw Error(`Missing source video after question: ${source}`);
     const title=match[3].replace(/<[^>]*>/g,'').replaceAll('&amp;','&');
     video={id:`vimeo-${match[2]}`,title,url:match[1],poster:'images/videos/emotiv-bci.svg',posterAlt:'Ilustración didáctica de una interfaz cerebro-ordenador con EEG portátil',links:[{url:match[1],label:title}]};
    }

    questions.push({id:`question-${index}-${questions.length}`,sectionId,source,text:block.getContent(),before:route.before,answer:route.answer??route.before,topic:route.topic,video,
     context:route.context && next?next.convert():'',notes:block.convert()});
   }
   walk(block,sectionId);
  }
 }
 walk(section,section.getId());
 if(questions.length!==Object.keys(placement[index]).length) throw Error(`Question markers changed in topic ${index}: review placements`);
 return questions;
}
