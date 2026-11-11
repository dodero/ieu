import { renderClassDeck } from './slides.mjs';
import asciidoctor from '@asciidoctor/core';
import reveal from '@asciidoctor/reveal.js';
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const mode = process.argv[2] || 'all';
if (!['all','notes','slides','html'].includes(mode)) throw Error('Use notes, slides, or html');
const adoc = asciidoctor(); reveal.register();
const source = await readFile('ieu-00-intro.adoc','utf8');
const audiovisualStyles = await readFile(new URL('../css/audiovisual.css', import.meta.url), 'utf8');
const sourceDocument = adoc.load(source,{safe:'safe',attributes:{imagesdir:'images'}});
const headings = Object.fromEntries([...adoc.convert(source,{safe:'safe'}).matchAll(/<h[1-6] id="([^"]+)">(.*?)<\/h[1-6]>/g)].map(m=>[m[1],m[2].replace(/<[^>]+>/g,'')]));
const sections = source.split(/(?=^== [^=])/m).slice(1);
const names = ['presentacion','estilos-interaccion','end-user-development','ux-inteligencia-artificial'];
if(sections.length !== names.length) throw Error('Han cambiado los temas: actualiza names');
await rm('dist', {recursive:true,force:true});
await mkdir('dist', {recursive:true});
await cp('images','dist/images',{recursive:true});
await cp('lecturas','dist/lecturas',{recursive:true});
await cp('node_modules/reveal.js/dist','dist/reveal.js/dist',{recursive:true,dereference:true});
await cp('node_modules/reveal.js/LICENSE','dist/reveal.js/LICENSE');
const browser = mode==='html' ? null : await chromium.launch({
 executablePath: process.env.CHROME_PATH || undefined,
 channel: process.env.CHROME_CHANNEL || undefined,
 chromiumSandbox: process.env.CHROME_NO_SANDBOX !== '1'
});
if(browser) console.log(`PDF browser: ${browser.version()}`);
try {
 const jobs = [];
 // The class deck links to its assigned reading, so even build:slides includes the notes HTML.
 jobs.push(['apuntes',source,false]);
 if(mode !== 'notes') jobs.push(['clase',renderClassDeck(sourceDocument.getSections(),headings),true]);
 await cp('scripts/slides.css','dist/slides.css');
 for(const [name,text,slides] of jobs){
 let html=slides ? text : adoc.convert(text,{backend:'html5',safe:'safe',standalone:true,attributes:{imagesdir:'images',toc:'left','source-highlighter':'highlight.js'}});
 if(!slides) html=html.replace('</head>', `<style id="audiovisual-styles">\n${audiovisualStyles}\n</style>\n</head>`);
 await writeFile(`dist/${name}.html`,html);
 if(browser){
  const page=await browser.newPage();
  // PDF generation only needs local assets, never remote scripts or embedded media.
  await page.route(/^https?:/, route => route.abort());
  await page.goto(pathToFileURL(resolve(`dist/${name}.html`)).href+(slides?'?print-pdf':''),{waitUntil:'networkidle'});
  if(slides) await page.waitForFunction(()=>window.Reveal?.isReady());
  await page.evaluate(()=>document.fonts.ready);
  await page.pdf({path:`dist/${name}.pdf`,printBackground:true,preferCSSPageSize:true,format:slides?undefined:'A4',margin:slides?undefined:{top:'15mm',bottom:'15mm',left:'12mm',right:'12mm'}});
  await page.close();
 }
 }
 const outputs=jobs.map(([name])=>name);
 await writeFile('dist/index.html', '<!doctype html><html lang="es"><meta charset="utf-8"><title>IEU</title><h1>Interacción y Experiencia de Usuario</h1>'+outputs.map(n=>`<p>${n}: <a href="${n}.html">HTML</a>${browser?` · <a href="${n}.pdf">PDF</a>`:''}</p>`).join('')+'</html>');
} finally {if(browser) await browser.close();}
