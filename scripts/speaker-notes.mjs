// Route original AsciiDoc blocks to the slide discussing them, without summarising them.
const routes = [
 { _presentación:0, _datos_de_la_asignatura:0, _temario:0, _evaluación:1, _bibliografía:0,
 _un_poco_de_historia:2, _vannevar_bush:3, _ivan_sutherland:4, _douglas_engelbart:2,
 _alan_kay:2, _steve_jobs:2, _bill_gates:2, _steve_jobs_again:2, _sam_altman:2,
 _un_poco_de_teoría:5, _interfaces_de_usuario:5, _aprendibilidad:7, _disciplinas_involucradas:8, _teorías_de_la_interacción:8, _affordances_y_feedback:6, _temario_detallado:10 },
 { _estilos_de_interacción:0, _manipulación_directa:0, _características_de_la_manipulación_directa:0,
 _ejemplos_de_manipulación_directa:0, _futuro_de_la_manipulación_directa:2, _distancia_traslacional:1,
 _lenguajes_de_comandos:3, _lenguajes_de_programación_visual:5, _lenguajes_de_bloques:5,
 _lenguajes_de_construcción_y_modelado:6, _lenguaje_humano:7, _entornos_inmersivos:8 },
 { _end_user_development:0, _end_user_programming:1, _computational_thinking:2,
 _low_code:3, _embodiment_o_encarnación:4, _programación_literaria:5,
 _herramientas:10, _herramientas_gui:6, _lenguajes_block_based:7, _lenguajes_data_flow:8, _lenguajes_mixtos:9 },
 { _ux_e_inteligencia_artificial:0, _evolución_del_eud:0, _la_ia_y_el_futuro_de_las_ui:2,
 _la_ia_como_sistema_operativo:3, _el_experimento_de_la_interfaz_universal:4,
 _el_paradigma_de_la_entrada_y_salida:1, _agentes_autónomos:5, _autonomía_parcial:6,
 _aplicaciones_parcialmente_autónomas:7, _atar_en_corto_a_la_ia:9 }
];
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function distributeNotes(section, index, count) {
 const assigned=Array.from({length:count},()=>[]), sections=new Map(), all=[];
 function walk(node){
  const id=node.getId(), records=[];
  for(const [i,block] of node.getBlocks().entries()){
   if(block.getContext()==='section'){walk(block);continue;}
   const record={key:`${id}:${i}`,id,title:node.getTitle(),html:block.convert()};
   records.push(record);all.push(record);
   let target=routes[index][id];
   if(target===undefined) throw Error(`No speaker notes route for ${id}`);
   const plain=record.html.replace(/<[^>]*>/g,' ').toLowerCase();
   if(index===0 && id==='_un_poco_de_teoría'){
    if(/affordance|feedback|asequibilidades|retroalimentación/.test(plain)) target=6;
    else if(/learnab|aprendib|ratón|pantalla táctil|interfaz de voz/.test(plain)) target=7;
    else if(/disciplina|psicología|sociología|semiótica|teoría de la actividad|modelos conceptuales/.test(plain)) target=8;
    else if(/¿|&#191;/.test(plain)) target=9;
   }
   if(index===3 && id==='_aplicaciones_parcialmente_autónomas' && /control deslizante|autonomy slider/.test(plain)) target=8;
   assigned[target].push(record);
  }
  sections.set(id,records);
 }
 walk(section);
 function render(records){
  return records.map(r=>`<div data-note-source="${escape(r.key)}"><h3>${r.title}</h3>${r.html}</div>`).join('');
 }
 // Some slides compare concepts already explained elsewhere: repeat just those source blocks.
 const context = [
  {9:['_aprendibilidad']},
  {4:['_manipulación_directa','_lenguajes_de_comandos'],9:['_lenguaje_humano','_entornos_inmersivos']},
  {},
  {8:['_aplicaciones_parcialmente_autónomas'],10:['_autonomía_parcial','_atar_en_corto_a_la_ia']}
 ][index];
 for(const [slide,ids] of Object.entries(context)){
  if(!assigned[slide].length) assigned[slide].push(...ids.flatMap(id=>sections.get(id)||[]));
 }
 for(let i=0;i<count;i++) if(!assigned[i].length) throw Error(`Slide ${index}:${i} has no source notes`);
 const covered=new Set(assigned.flat().map(r=>r.key));
 if(all.some(r=>!covered.has(r.key))) throw Error(`Unassigned source notes in topic ${index}`);
 return {
  slides:assigned.map(render),
  forSection:id=>render(sections.get(id)||[]),
  sourceKeys:all.map(r=>r.key),
  assignedKeys:[...covered]
 };
}
