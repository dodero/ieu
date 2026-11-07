import { collectQuestions } from './questions.mjs';
import { distributeNotes } from './speaker-notes.mjs';
const decks = [
 ['Presentación',[
 ['Aprender haciendo','flow',['Crear|AppInventor','Conversar|n8n','Explorar|Unity','Narrar|Twine','Evaluar|UX']],
 ['Cinco bloques, el mismo peso','weights',['EUD|20 %','Interacción verbal|20 %','Entornos inmersivos|20 %','Videojuegos|20 %','UX|20 %']],
 ['De los documentos a la conversación','timeline',['1945|Memex','1963|Sketchpad','1973|Xerox Alto','1984|Macintosh','2007|iPhone','2022|ChatGPT']],
 ['Memex: enlazar el conocimiento','image',['AsWeMayThink.png','Documentos → asociaciones → recuperación']],
 ['Sketchpad: actuar sobre lo que se ve','image',['history-sketchpad.jpg','Dibujar → modificar → ver el resultado']],
 ['La interfaz conecta dos mundos','flow',['Persona|Percibe y decide','Interfaz|Representa y responde','Ordenador|Ejecuta funciones']],
 ['Affordance y feedback','loop',['Pista visual|¿Qué puedo hacer?','Acción|Lo intento','Respuesta|¿Qué ha ocurrido?']],
 ['Aprendibilidad: descubrir cómo actuar','compare',['Ratón|Acción indirecta','Pantalla táctil|Acción sobre el objeto','Voz|Expresar una intención','Realidad virtual|Actuar en un espacio inmersivo']],
 ['Una interfaz, muchas disciplinas','hub',['Interfaz','Informática','Psicología','Diseño','Ergonomía','Lingüística','Sociología']],
 ['Pregunta para el aula','question',['¿Qué interfaz resulta más fácil de aprender?','Elegid una tarea y comparad ratón, tacto y voz.']],
 ['Temario detallado','flow',['EUD y bloques|Crear herramientas','Interacción verbal|Conversar y combinar modalidades','Entornos inmersivos|Explorar realidad virtual, aumentada y mixta','Videojuegos|Diseñar y aprender jugando','UX|Evaluar la experiencia']]
 ]],
 ['Estilos de interacción',[
 ['Manipulación directa','loop',['Objeto visible|Seleccionar','Acción física|Mover','Feedback inmediato|Comprobar']],
 ['Acercar intención y acción','compare',['Distancia alta|Traducir la intención a una orden','Distancia baja|Actuar sobre el objeto visible']],
 ['Del gesto al resultado','image',['tangible_ui.png','Acción física → representación digital']],
 ['Lenguajes de comandos','flow',['Intención|Buscar archivos','Sintaxis|Expresar una orden','Ejecución|Obtener el resultado']],
 ['Dos formas de controlar','compare',['Manipulación directa|Reconocer · explorar · deshacer','Comandos|Recordar · combinar · automatizar']],
 ['Programar con bloques','blocks',['Evento: pulsar botón','Leer un valor','Si cumple la condición','Mostrar el resultado']],
 ['Construir mediante modelos','flow',['Elementos|Elegir piezas','Relaciones|Conectar','Modelo|Explorar el conjunto']],
 ['Lenguaje humano','flow',['Persona|Expresa una intención','Sistema|Interpreta el contexto','Respuesta|Confirmar o corregir']],
 ['Entornos inmersivos','compare',['Realidad virtual|Entorno simulado','Realidad aumentada|Información sobre el mundo','Realidad mixta|Objetos físicos y digitales']],
 ['Elegir según la tarea','question',['¿Qué estilo usarías para…?','Mover un objeto · repetir cien acciones · explorar un espacio']]
 ]],
 ['End-user development',[
 ['De utilizar a crear','flow',['Necesidad propia|Detectar un problema','Construcción|Adaptar una herramienta','Solución|Probar en contexto']],
 ['End-user programming','loop',['Usuario|Conoce la tarea','Programa|Expresa la solución','Uso real|Verifica el resultado']],
 ['Pensamiento computacional','flow',['Descomponer|Dividir el problema','Abstraer|Elegir lo relevante','Algoritmo|Ordenar los pasos','Evaluar|Probar y corregir']],
 ['Low code','compare',['Configuración visual|Componer lo habitual','Código|Resolver lo específico']],
 ['Embodiment: pensar con el cuerpo','image',['tangible_ui.png','Manipular → percibir → comprender']],
 ['Programación literaria','compare',['Explicación|Por qué y para quién','Código|Cómo se ejecuta']],
 ['Herramientas GUI','flow',['Elegir|Un componente','Configurar|Sus propiedades','Probar|La interacción']],
 ['Lenguajes de bloques','blocks',['Al recibir un evento','Consultar datos','Tomar una decisión','Actualizar la interfaz']],
 ['Lenguajes de flujo de datos','flow',['Entrada|Datos','Transformación|Operación','Salida|Resultado']],
 ['Lenguajes mixtos','compare',['Representación visual|Estructura y conexiones','Representación textual|Detalle y precisión']],
 ['Diseñar para quien conoce el problema','question',['¿Qué debe poder cambiar el usuario?','Identificad una necesidad propia y elegid una herramienta.']]
 ]],
 ['UX e inteligencia artificial',[
 ['Tres generaciones de EUD','timeline',['Código|Escribir','Low / no code|Componer','IA generativa|Describir']],
 ['Entrada y salida son problemas distintos','compare',['Entrada|Expresar una intención en lenguaje natural','Salida|Ver, comparar y controlar resultados']],
 ['Del chat a una interfaz específica','flow',['Intención|Lenguaje natural','Procesamiento|Modelo y herramientas','Resultado|Representación visual']],
 ['El LLM como sistema operativo: una analogía','hub',['LLM','Contexto','Herramientas','Aplicaciones','Datos','Usuario','Memoria']],
 ['La interfaz universal como experimento','timeline',['Plugins|Conectar herramientas','GPTs|Especializar asistentes','Apps|Integrar aplicaciones']],
 ['Un agente encadena acciones','loop',['Objetivo|Definir','Herramientas|Actuar','Resultado|Verificar']],
 ['Autonomía parcial','loop',['IA|Genera una propuesta','Persona|Revisa y decide','Sistema|Aplica el cambio']],
 ['La GUI facilita la auditoría','compare',['Texto continuo|Leer y reconstruir diferencias','Vista especializada|Comparar · aceptar · rechazar']],
 ['Controlar el alcance de la autonomía','autonomy',['Sugerir','Editar un fragmento','Completar una tarea','Actuar como agente']],
 ['Cambios pequeños, revisión rápida','flow',['Petición concreta|Limitar el alcance','Cambio pequeño|Inspeccionar','Verificación|Aceptar o corregir']],
 ['Debate: automatizar sin perder control','question',['¿Dónde debe detenerse el agente?','Definid una acción automática y otra que requiera revisión.']]
 ]]
];
const anchors = [
 ['_temario','_evaluación','_un_poco_de_historia','_vannevar_bush','_ivan_sutherland','_interfaces_de_usuario','_affordances_y_feedback','_aprendibilidad','_disciplinas_involucradas','_aprendibilidad','_temario_detallado'],
 ['_características_de_la_manipulación_directa','_distancia_traslacional','_distancia_traslacional','_lenguajes_de_comandos','_lenguajes_de_comandos','_lenguajes_de_bloques','_lenguajes_de_construcción_y_modelado','_lenguaje_humano','_entornos_inmersivos','_estilos_de_interacción'],
 ['_end_user_development','_end_user_programming','_computational_thinking','_low_code','_embodiment_o_encarnación','_programación_literaria','_herramientas_gui','_lenguajes_block_based','_lenguajes_data_flow','_lenguajes_mixtos','_herramientas'],
 ['_evolución_del_eud','_el_paradigma_de_la_entrada_y_salida','_la_ia_y_el_futuro_de_las_ui','_la_ia_como_sistema_operativo','_el_experimento_de_la_interfaz_universal','_agentes_autónomos','_autonomía_parcial','_aplicaciones_parcialmente_autónomas','_aplicaciones_parcialmente_autónomas','_atar_en_corto_a_la_ia','_autonomía_parcial']
];
// Editorial references select the most relevant headings, at any depth.
// The primary anchor is retained for the linked title; additional references describe comparisons.
const referenceOverrides = {
 '0:2':['_vannevar_bush','_ivan_sutherland','_alan_kay','_steve_jobs','_steve_jobs_again','_sam_altman'],
 '0:8':['_disciplinas_involucradas','_teorías_de_la_interacción'],
 '1:0':['_características_de_la_manipulación_directa','_ejemplos_de_manipulación_directa'],
 '1:4':['_manipulación_directa','_lenguajes_de_comandos'],
 '1:9':['_manipulación_directa','_lenguajes_de_comandos','_lenguaje_humano','_entornos_inmersivos'],
 '2:10':['_herramientas_gui','_lenguajes_block_based','_lenguajes_data_flow','_lenguajes_mixtos'],
 '3:10':['_aplicaciones_parcialmente_autónomas','_atar_en_corto_a_la_ia']
};
const groups = [
 [['1.1','Datos de la asignatura'],['1.2','Un poco de historia'],['1.3','Un poco de teoría'],['1.4','Temario detallado']],
 [['2.1','Manipulación directa'],['2.2','Lenguajes de comandos'],['2.3','Lenguajes de programación visual'],['2.4','Lenguaje humano'],['2.5','Entornos inmersivos']],
 [['3.1','End-User Programming'],['3.2','Computational Thinking'],['3.3','Low code'],['3.4','Embodiment o Encarnación'],['3.5','Programación literaria'],['3.6','Herramientas']],
 [['4.1','Evolución del EUD'],['4.2','La IA y el futuro de las UI'],['4.3','La IA como sistema operativo'],['4.4','Autonomía parcial']]
];
const groupFor = [[0,0,1,1,1,2,2,2,2,2,3],[0,0,0,1,1,2,2,3,4,4],[0,0,1,2,3,4,5,5,5,5,5],[0,1,1,2,2,2,3,3,3,3,3]];
const thumbnails = {
 '1945':'AsWeMayThink.png','1963':'history-sketchpad.jpg','1973':'thumb-xerox.svg','1984':'thumb-macintosh.svg','2007':'thumb-iphone.svg','2022':'thumb-chat.svg',
 'Lenguajes de comandos':['explainshell.png','showthedocs.png','explainshell.png'],
 'Tres generaciones de EUD':['thumb-code.svg','thumb-blocks.svg','thumb-chat.svg'],
 'La interfaz universal como experimento':['thumb-tools.svg','thumb-chat.svg','thumb-apps.svg'],
 'Low code':['thumb-blocks.svg','thumb-code.svg'],
 'Lenguajes mixtos':['thumb-blocks.svg','thumb-code.svg'],
 'Manipulación directa':['mac_trackball.png','game_controllers.png','tabletop.png'],
 'Herramientas GUI':['thumb-apps.svg','thumb-tools.svg','thumb-apps.svg']
};
function thumbnail(title,label,i){
 if(['1945','1963','1973','1984','2007','2022'].includes(label)) return icon(label);
 const file=(typeof thumbnails[label]==='string' ? thumbnails[label] : null) || (Array.isArray(thumbnails[title]) ? thumbnails[title][i] : null);
 return file ? `<img class="card-thumbnail" src="images/${file}" alt="${esc(label)}: ejemplo visual" title="${file.endsWith('.svg')?'Recreación esquemática para docencia':'Imagen de los apuntes'}">` : icon(label);
}
const noEnlargements = new Set(['Acercar intención y acción','Dos formas de controlar','Programar con bloques','Construir mediante modelos','Lenguaje humano','Entornos inmersivos','De utilizar a crear','Cinco bloques, el mismo peso','La interfaz conecta dos mundos','Affordance y feedback','Aprendibilidad: descubrir cómo actuar','Temario detallado','End-user programming','Pensamiento computacional','Low code','Programación literaria','Herramientas GUI','Lenguajes de bloques','Lenguajes de flujo de datos','Lenguajes mixtos']);
const historyImages=['AsWeMayThink.png','history-sketchpad.jpg','history-xerox.jpg','history-macintosh.jpg','history-iphone.png','history-chatgpt.png'];
const productImages=['logo-appinventor.png','logo-n8n.png','logo-unity.svg','logo-twine.png'];
const explanations = {
 Crear:'Construir una aplicación móvil para resolver una necesidad propia.',
 Conversar:'Conectar un agente conversacional con un flujo de trabajo.',
 Explorar:'Crear experiencias de realidad virtual, aumentada o mixta.',
 Narrar:'Diseñar una historia interactiva con decisiones y consecuencias.',
 Evaluar:'Observar el uso y valorar la experiencia de las personas.',
 Persona:'Parte de una intención y comprueba si consigue su objetivo.',
 Interfaz:'Hace visibles las acciones posibles y el estado del sistema.',
 Ordenador:'Transforma las entradas en resultados mediante operaciones.',
 'Pista visual':'La forma del objeto sugiere cómo interactuar con él.',
 Acción:'El usuario prueba una operación sobre la representación.',
 Respuesta:'El sistema permite reconocer el efecto de la acción.',
 Ratón:'El movimiento de la mano controla un puntero en pantalla.',
 'Pantalla táctil':'El gesto se realiza directamente sobre la representación.',
 Voz:'La petición requiere interpretar palabras y contexto.',
 'Realidad virtual':'La mirada, los gestos y los mandos permiten explorar y actuar en el entorno.',
 Descomponer:'Separar una tarea compleja en problemas manejables.',
 Abstraer:'Conservar los datos y relaciones que necesita la solución.',
 Algoritmo:'Definir una secuencia de operaciones que pueda ejecutarse.',
 'Configuración visual':'Combinar componentes y ajustar sus propiedades.',
 Código:'Expresar operaciones que la configuración no cubre.',
 Entrada:'Facilitar que la persona comunique lo que quiere conseguir.',
 Salida:'Mostrar resultados que puedan inspeccionarse y corregirse.',
 IA:'Propone un resultado a partir del objetivo y el contexto.',
 Sistema:'Ejecuta las acciones dentro del alcance permitido.',
 Sugerir:'La persona decide qué propuesta incorpora.',
 'Editar un fragmento':'La herramienta modifica una parte delimitada.',
 'Completar una tarea':'La herramienta encadena pasos con un objetivo acotado.',
 'Actuar como agente':'Delega más acciones y aumenta la necesidad de supervisión.'
};
const paths = {
 memex:'<path d="M7 57h66v16H7zM14 57V39h52v18M18 39L11 14h24l8 25M44 39l4-25h23l-8 25"/><path d="M15 63h14M35 63h14M55 63h10M16 21h14M52 21h13"/>',
 sketchpad:'<rect x="8" y="9" width="57" height="48" rx="4"/><path d="M15 16h43v33H15zM21 41l11-17 18 18zM36 57v13M22 70h29M50 40l23 22M68 57l-4 6"/>',
 create:'<rect x="15" y="8" width="50" height="62" rx="7"/><path d="M40 25v27m-13-14h26"/>',
 chat:'<path d="M10 12h60v40H35L18 66V52h-8z"/><path d="M23 27h34M23 38h24"/>',
 explore:'<path d="M10 22h60v34H48l-8-12-8 12H10z"/><circle cx="24" cy="36" r="5"/><circle cx="56" cy="36" r="5"/>',
 story:'<path d="M40 16v23M40 39L16 60M40 39l24 21"/><circle cx="40" cy="12" r="8"/><rect x="6" y="58" width="20" height="14"/><rect x="54" y="58" width="20" height="14"/>',
 check:'<rect x="12" y="10" width="56" height="60" rx="5"/><path d="M22 38l12 13 25-28"/>',
 person:'<circle cx="40" cy="20" r="12"/><path d="M15 70V58a25 25 0 0150 0v12"/>',
 screen:'<rect x="8" y="12" width="64" height="44" rx="4"/><path d="M40 56v14M24 70h32M20 25h40M20 35h24"/>',
 code:'<path d="M27 23L9 40l18 17M53 23l18 17-18 17M46 15L34 65"/>',
 data:'<ellipse cx="40" cy="18" rx="27" ry="10"/><path d="M13 18v40c0 14 54 14 54 0V18M13 38c0 14 54 14 54 0"/>',
 hand:'<path d="M20 57V34c0-7 9-7 9 0v10-26c0-7 10-7 10 0v25-31c0-7 10-7 10 0v31-23c0-7 10-7 10 0v32c0 20-32 27-39 5z"/>'
};
// Consistent 80 × 80 line icons, drawn for the concepts used by this course.
const conceptIcons = {
 '1945':'memex','1963':'sketchpad','1973':'alto','1984':'macintosh','2007':'iphone','2022':'conversation',
 Memex:'memex',Sketchpad:'sketchpad',Crear:'create',Conversar:'conversation',Explorar:'explore',Narrar:'story',Evaluar:'check',
 EUD:'blocks','EUD y bloques':'blocks','Interacción verbal':'microphone','Entornos inmersivos':'explore',Videojuegos:'gamepad',UX:'eye',
 Persona:'person',Usuario:'person',IA:'spark',Ordenador:'processor',Interfaz:'interface','Pista visual':'eye',Acción:'hand',Respuesta:'check',
 Ratón:'mouse','Pantalla táctil':'touch',Voz:'microphone',
 'Objeto visible':'shapes','Acción física':'hand','Feedback inmediato':'check','Distancia alta':'distance','Distancia baja':'target',
 Intención:'target',Sintaxis:'code',Ejecución:'play','Manipulación directa':'hand',Comandos:'terminal',
 'Evento: pulsar botón':'touch','Leer un valor':'data','Si cumple la condición':'decision','Mostrar el resultado':'eye',
 Elementos:'shapes',Relaciones:'connections',Modelo:'layers',Sistema:'processor',
 'Realidad virtual':'explore','Realidad aumentada':'layers','Realidad mixta':'connections',
 'Necesidad propia':'target',Construcción:'tools',Solución:'check',Programa:'code','Uso real':'eye',
 Descomponer:'decompose',Abstraer:'filter',Algoritmo:'algorithm','Configuración visual':'sliders',Código:'code',
 Explicación:'book',Elegir:'shapes',Configurar:'sliders',Probar:'check',
 'Al recibir un evento':'touch','Consultar datos':'data','Tomar una decisión':'decision','Actualizar la interfaz':'refresh',
 Entrada:'input',Transformación:'filter',Salida:'output','Representación visual':'shapes','Representación textual':'code',
 'Low / no code':'blocks','IA generativa':'spark',Procesamiento:'processor',Resultado:'eye',
 Plugins:'connections',GPTs:'conversation',Apps:'apps',Objetivo:'target',Herramientas:'tools',
 'Texto continuo':'book','Vista especializada':'eye',Sugerir:'spark','Editar un fragmento':'pencil',
 'Completar una tarea':'check','Actuar como agente':'algorithm','Petición concreta':'target','Cambio pequeño':'pencil',Verificación:'check'
};
Object.assign(paths, {
 alto:'<rect x="20" y="7" width="38" height="49" rx="3"/><rect x="26" y="13" width="26" height="34" rx="1"/><path d="M14 62h50l7 11H7zM39 56v6M32 23h14v16H32z"/>',
 macintosh:'<rect x="17" y="7" width="46" height="65" rx="5"/><rect x="24" y="15" width="32" height="28" rx="2"/><path d="M26 53h4M42 53h12M24 64h32M31 23h18v12H31z"/>',
 iphone:'<rect x="24" y="5" width="32" height="70" rx="6"/><path d="M35 12h10M29 19h22v42H29zM34 27h4v4h-4zM43 27h4v4h-4zM34 38h4v4h-4zM43 38h4v4h-4z"/><circle cx="40" cy="68" r="2"/>',
 conversation:'<path d="M7 12h49v31H25L14 54V43H7zM30 50h42v23H51L41 79V73H30M17 23h28M17 32h20M41 59h20"/>',
 processor:'<rect x="20" y="20" width="40" height="40" rx="5"/><path d="M30 30h20v20H30zM28 8v12M40 8v12M52 8v12M28 60v12M40 60v12M52 60v12M8 28h12M8 40h12M8 52h12M60 28h12M60 40h12M60 52h12"/>',
 blocks:'<path d="M10 10h24v8h12v-8h24v22H58v12h12v22H46v-8H34v8H10V44h12V32H10zM10 32h12M58 32h12M34 58h12"/>',
 microphone:'<rect x="29" y="8" width="22" height="39" rx="11"/><path d="M19 34v7a21 21 0 0042 0v-7M40 62v10M26 72h28"/>',
 gamepad:'<path d="M19 23h42l12 33c3 11-7 15-13 6L48 51H32L20 62C14 71 4 67 7 56zM19 32v18M10 41h18"/><circle cx="56" cy="35" r="3"/><circle cx="64" cy="44" r="3"/>',
 eye:'<path d="M5 40s13-23 35-23 35 23 35 23-13 23-35 23S5 40 5 40z"/><circle cx="40" cy="40" r="11"/>',
 target:'<circle cx="36" cy="44" r="27"/><circle cx="36" cy="44" r="16"/><circle cx="36" cy="44" r="5"/><path d="M36 44L69 11M57 11h12v12"/>',
 shapes:'<rect x="8" y="9" width="25" height="25" rx="3"/><circle cx="57" cy="22" r="14"/><path d="M21 48L6 71h30zM47 49h23v22H47z"/>',
 connections:'<circle cx="15" cy="20" r="8"/><circle cx="63" cy="20" r="8"/><circle cx="40" cy="62" r="8"/><path d="M23 20h32M19 27l17 28M59 27L44 55"/>',
 layers:'<path d="M7 25L40 8l33 17-33 17zM7 40l33 17 33-17M7 55l33 17 33-17"/>',
 sliders:'<path d="M15 9v17M15 39v32M40 9v34M40 56v15M65 9v10M65 32v39"/><circle cx="15" cy="32" r="7"/><circle cx="40" cy="50" r="7"/><circle cx="65" cy="25" r="7"/>',
 book:'<path d="M40 17C28 8 14 8 5 13v50c12-5 25-3 35 5 10-8 23-10 35-5V13c-9-5-23-5-35 4zM40 17v51M13 23l18 3M13 34l18 3M49 26l18-3M49 37l18-3"/>',
 decision:'<path d="M40 7l27 26-27 26-27-26zM40 59v15M13 33H4M67 33h9M33 32l6 6 11-13"/>',
 algorithm:'<rect x="23" y="5" width="34" height="17" rx="4"/><path d="M40 22v10M40 32l19 16-19 16-19-16zM21 48H9v25h20M59 48h12v25H51"/>',
 decompose:'<rect x="25" y="6" width="30" height="23" rx="3"/><path d="M40 29v14M12 43h56M12 43v9M40 43v9M68 43v9"/><rect x="3" y="52" width="18" height="20" rx="2"/><rect x="31" y="52" width="18" height="20" rx="2"/><rect x="59" y="52" width="18" height="20" rx="2"/>',
 filter:'<path d="M8 11h64L48 41v25l-16 8V41zM21 23h38"/>',
 tools:'<path d="M56 7a19 19 0 00-19 26L10 60a8 8 0 0011 11l27-27A19 19 0 0073 20L61 32l-13-4-4-13z"/>',
 mouse:'<rect x="22" y="13" width="36" height="59" rx="18"/><path d="M40 13v24M22 37h36M40 13V5"/>',
 touch:'<rect x="11" y="7" width="42" height="61" rx="5"/><path d="M30 58V33c0-7 9-7 9 0v14l8-5 17 10v17M23 28l-6-4M29 22v-7M44 25l7-6"/>',
 interface:'<rect x="8" y="10" width="64" height="60" rx="4"/><path d="M8 23h64M26 23v47M34 34h28M34 44h18"/><rect x="35" y="54" width="24" height="8" rx="2"/>',
 input:'<path d="M45 8h25v64H45M8 40h46M41 27l13 13-13 13"/>',
 output:'<path d="M35 8H10v64h25M26 40h46M59 27l13 13-13 13"/>',
 refresh:'<path d="M65 27A27 27 0 0016 20L7 32M7 13v19h19M15 53a27 27 0 0049 7l9-12M73 67V48H54"/>',
 distance:'<path d="M9 40h62M20 29L9 40l11 11M60 29l11 11-11 11M9 15v10M71 15v10M9 55v10M71 55v10"/>',
 play:'<circle cx="40" cy="40" r="31"/><path d="M32 22l24 18-24 18z"/>',
 terminal:'<rect x="7" y="12" width="66" height="56" rx="5"/><path d="M18 29l12 11-12 11M40 52h21M7 22h66"/>',
 spark:'<path d="M40 6l9 25 25 9-25 9-9 25-9-25-25-9 25-9zM66 7v12M60 13h12"/>',
 pencil:'<path d="M11 57l-4 17 17-4 47-47-13-13zM49 19l13 13M11 57l13 13"/>',
 apps:'<rect x="8" y="8" width="26" height="26" rx="5"/><rect x="46" y="8" width="26" height="26" rx="5"/><rect x="8" y="46" width="26" height="26" rx="5"/><rect x="46" y="46" width="26" height="26" rx="5"/>'
});
function icon(label){
 const key=conceptIcons[label] || 'connections';
 return `<svg class="card-icon" data-icon="${key}" viewBox="0 0 80 80" role="img" aria-label="${esc(label)}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg>`;
}
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
function graphic(kind,items,title){
 if(kind==='image') return `<figure><img src="images/${esc(items[0])}" alt="${esc(items[1])}"><figcaption>${esc(items[1])}</figcaption></figure>`;
 if(kind==='question') return `<div class="question">${esc(items[0])}</div><p class="prompt">${esc(items[1])}</p>`;
 if(kind==='hub') return `<div class="hub"><strong>${esc(items[0])}</strong><div>${items.slice(1).map(s=>`<span class="hub-label">${esc(s)}</span>`).join('')}</div></div>`;
 return `<div class="diagram ${kind}">${items.map((s,i)=>{const [a,b]=s.split('|');return `<div class="node" data-id="node-${i}"><span class="number">${String(i+1).padStart(2,'0')}</span>${thumbnail(title,a,i)}<strong>${esc(a)}</strong>${b?`<span>${esc(b)}</span>`:''}${explanations[a]&&kind!=='weights'&&kind!=='timeline'?`<p class="explanation">${esc(explanations[a])}</p>`:''}</div>${['flow','loop','timeline'].includes(kind)&&i<items.length-1?'<span class="arrow">→</span>':''}`;}).join('')}</div>`;
}
export function renderDeck(index, sourceSection, headings){
 const [title,slides]=decks[index];
 const notes=distributeNotes(sourceSection,index,slides.length);
 const questions=collectQuestions(sourceSection,index);
 const link=(text,id)=>`<a href="apuntes.html#${encodeURIComponent(id)}" target="_blank" rel="noopener">${text}</a>`;
 let previous=-1;
 const content=slides.map(([h,k,v],i)=>{
   const g=groupFor[index][i], [num,name]=groups[index][g];
   const divider=g!==previous?`<section class="divider" aria-label="${esc(num+' '+name)}"><h1>${esc(name)}</h1></section>`:'';
   previous=g;
   const id=anchors[index][i];
   if(!headings[id]) throw Error(`Missing notes section ${id}`);
   const refs=referenceOverrides[`${index}:${i}`] || [id];
   for(const ref of refs) if(!headings[ref]) throw Error(`Missing referenced heading ${ref}`);
   let visual=graphic(k,v,h);
   // Link the heading, and key card labels to their precise historical references.
   if(index===0 && h==='De los documentos a la conversación'){
     ['_vannevar_bush','_ivan_sutherland','_alan_kay','_steve_jobs','_steve_jobs_again','_sam_altman'].forEach((ref,j)=>{
       visual=visual.replace(`<strong>${v[j].split('|')[0]}</strong>`,`<strong>${link(v[j].split('|')[0],ref)}</strong>`);
     });
   }
   const cardReferences={
     '1:4':['_manipulación_directa','_lenguajes_de_comandos']
   }[`${index}:${i}`];
   cardReferences?.forEach((ref,j)=>{
     const label=esc(v[j].split('|')[0]);
     visual=visual.replace(`<strong>${label}</strong>`,`<strong>${link(label,ref)}</strong>`);
   });
   const parentId=`slide-${index}-${i}`;
   const enlargements=[];
   visual=visual.replace(/<svg\b[\s\S]*?<\/svg>|<img\b[^>]*>/g, media=>{
     if(index===3 || noEnlargements.has(h)) return media;
     const n=enlargements.length, target=`image-${index}-${i}-${n}`;
     let enlarged=media;
     // The historical cards use machine icons; their detail slides show the source image.
     if(index===0 && h==='De los documentos a la conversación'){
       enlarged=`<img src="images/${historyImages[n]}" alt="${esc(v[n].split('|')[1])}">`;
     }
     if(index===0 && h==='Aprender haciendo' && n<4){
       enlarged=`<img src="images/${productImages[n]}" alt="${esc(v[n].split('|')[1])}">`;
     }
     const historicalIds=['_vannevar_bush','_ivan_sutherland','_alan_kay','_steve_jobs','_steve_jobs_again','_sam_altman'];
     const detailNotes=index===0 && h==='De los documentos a la conversación' ? notes.forSection(historicalIds[n]) : notes.slides[i];
     const credit=enlarged.includes('history-sketchpad.jpg')?'<a class="image-credit" href="https://www.computerhistory.org/revolution/computer-graphics-music-and-art/15/209/1878" target="_blank" rel="noopener">Ivan Sutherland · Sketchpad, 1962–1963 · MIT Museum / CHM 102652182</a>':'';
     enlargements.push(`<section id="${target}" class="image-detail" aria-label="Imagen ampliada: ${esc(h)}">${enlarged}${credit}<aside class="notes">${detailNotes}</aside><a class="image-return" href="#/${parentId}" aria-label="Volver a ${esc(h)}">Volver</a></section>`);
     return `<a class="image-zoom" href="#/${target}" aria-label="Ampliar imagen: ${esc(h)}">${media}</a>`;
   });
   const main=`<section id="${parentId}" aria-label="${esc(h)}"><p class="eyebrow">${esc(num+' '+name)}</p>${k==='question'?'<div class="question-content">':''}<h2>${link(esc(h),id)}</h2>${visual}${k==='question'?'</div>':''}<footer class="notes-references"><ul>${refs.map(ref=>`<li>${link(esc(headings[ref]),ref)}</li>`).join('')}</ul></footer><aside class="notes">${notes.slides[i]}</aside></section>`;
   const questionSlides=questions.filter(q=>q.before===i).map(q=>{
     if(!headings[q.sectionId]) throw Error(`Missing question heading ${q.sectionId}`);
     const context=q.source==='¿Cuáles de las siguientes interfaces proporcionan representaciones _aprendibles_?'
       ? `<ul class="question-icon-options">${[['Ratón','Ratón'],['Pantalla táctil','Pantalla táctil'],['Voz','Interfaz de voz'],['Realidad virtual','Dispositivo de VR']].map(([symbol,label])=>`<li>${icon(symbol)}<span>${esc(label)}</span></li>`).join('')}</ul>`
       : q.context;
     return `<section id="${q.id}" class="source-question" data-answer="${parentId}" aria-label="${esc(q.source)}"><p class="eyebrow">${esc(num+' '+name)} · Pregunta</p><div class="question-content"><h2>${q.text}</h2><div class="question-context">${context}</div></div><footer class="notes-references"><ul><li>${link(esc(headings[q.sectionId]),q.sectionId)}</li></ul></footer><aside class="notes">${q.notes}<p>El material para responder se desarrolla en «${esc(h)}».</p>${notes.slides[i]}</aside></section>`;
   }).join('');
   return divider+questionSlides+(enlargements.length?`<section class="image-stack">${main}${enlargements.join('')}</section>`:main);
 }).join('');
 const coverTitle=index===0?'Interacción y Experiencia de Usuario':title;
 const mapSlide=index===0?'<section id="map-of-computer-science" class="map-only" data-state="map-only" data-background-image="images/cs_map.png" data-background-size="contain" data-background-color="#ffffff" aria-label="Map of Computer Science"></section>':'';
 return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="reveal.js/dist/reveal.css"><link rel="stylesheet" href="slides.css"></head><body><div class="reveal"><div class="slides"><section class="cover">${index===0?'':'<p class="eyebrow">INTERACCIÓN Y EXPERIENCIA DE USUARIO</p>'}<h1>${coverTitle}</h1></section>${mapSlide}${content}</div></div><script src="reveal.js/dist/reveal.js"></script><script src="reveal.js/dist/plugin/notes.js"></script><script src="reveal.js/dist/plugin/search.js"></script><script>Reveal.initialize({width:1600,height:900,navigationMode:'default',margin:0.04,center:false,hash:true,slideNumber:'c/t',transition:'none',autoAnimate:false,fragments:false,pdfSeparateFragments:false,pdfMaxPagesPerSlide:1,plugins:[RevealNotes,RevealSearch]});</script></body></html>`;
}
