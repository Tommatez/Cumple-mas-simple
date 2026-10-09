const EVENT={
  title:'Cumpleaños de Lucas (18)',
  start:'2026-10-17T21:00:00-03:00',
  hours:4,
  place:'Salón Voilé Eventos',
  address:'Avenida Remigio López 5073, José C. Paz',
  mapQuery:'Salón Voilé Eventos, Avenida Remigio López 5073, José C. Paz, Buenos Aires, Argentina',
  alias:'18SORPRESA.LUCAS'
};
const $=id=>document.getElementById(id),q=encodeURIComponent(EVENT.mapQuery);$('gmaps').href=`https://www.google.com/maps/search/?api=1&query=${q}`;
$('uber').href = `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${q}`;
$('mapframe').src=`https://www.google.com/maps?q=${q}&output=embed`;

function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2200)}
async function copy(text,ok){
  try{await navigator.clipboard.writeText(text)}
  catch{const a=document.createElement('textarea');a.value=text;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch{}a.remove()}
  toast(ok)
}
$('copyaddr').onclick=()=>copy(`${EVENT.place}, ${EVENT.address}`,'Dirección copiada');
$('copyalias').onclick=()=>copy(EVENT.alias,'Alias copiado');

const T=new Date(EVENT.start),pad=n=>String(n).padStart(2,'0');
function tick(){
  const s=Math.floor((T-Date.now())/1000);
  if(s<=-EVENT.hours*3600){$('cds').hidden=true;$('now').hidden=false;$('now').textContent='La fiesta ya terminó. ¡Gracias por venir!';return}
  if(s<=0){$('cds').hidden=true;$('now').hidden=false;$('now').textContent='¡Es hoy! Nos vemos en la fiesta.';return}
  const v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
  document.querySelectorAll('#cds b').forEach((b,i)=>b.textContent=pad(v[i]));
}
tick();setInterval(tick,1000);

$('ics').onclick=()=>{
  const z=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const end=new Date(T.getTime()+EVENT.hours*3600e3);
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Invitacion//ES','BEGIN:VEVENT',
    'UID:lucas18-'+z(T)+'@invitacion','DTSTAMP:'+z(new Date()),'DTSTART:'+z(T),'DTEND:'+z(end),
    'SUMMARY:'+EVENT.title,'LOCATION:'+(EVENT.place+', '+EVENT.address).replace(/,/g,'\\,'),
    'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='cumple-lucas.ics';
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};