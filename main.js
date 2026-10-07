const EMAIL='hello@greyone.com'; // replace with the real address
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],L=(a,b,k)=>a+(b-a)*k;
const bt=$('#bt'),sc=$('#sc');let ty,wave=0,talking=0,cur='hero',mx=0,my=0,Y=0,t=0,W=innerWidth,H=innerHeight,burst=0,ready=0;
$('#em').textContent=EMAIL;
function speak(s){clearInterval(ty);let i=0;talking=1;wave=1.8;bt.textContent='';ty=setInterval(()=>{bt.textContent=s.slice(0,++i);if(i>=s.length){clearInterval(ty);talking=0}},16)}
const IDS=['hero','about','work','process','contact'];
const LINES={hero:"Hi, I'm Rex, your site guide. Move your mouse to push the blocks around, or click to blow them apart.",about:"Grey One builds for the long run. Keep scrolling and watch the blocks start to come together.",work:"Hover a project to preview it. These are samples, so swap in your own.",process:"Plan, pour, rise, hand over. Look behind me: the tower is built.",contact:"Ready to break ground? Leave your details and we'll take it from there."};
const PJ=[["Riverside Residences","Residential / concrete frame / finishing",[24,40,30,44,28,38,22,34]],["Meridian Tower","Commercial / high-rise / fit-out",[30,50,36,50,40,50,32,44]],["Foundry Works","Industrial / steel and slab / heavy load",[16,24,16,24,34,24,16,20]],["Orchard Court","Residential / apartments / landscaping",[20,30,26,34,22,30,24,28]],["Harbour Plaza","Commercial / retail / mixed-use",[26,36,46,36,46,36,26,32]],["Old Mill Revival","Renovation / structural repair / restoration",[34,34,16,40,40,16,34,34]]];
const skl=h=>`<svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMax slice"><rect width="120" height="80" fill="#ebe8e2"/>${h.map((v,i)=>`<rect x="${i*15+3}" y="${80-v*1.4}" width="12" height="${v*1.4}" fill="${i==3?'#ffb000':'#16181b'}"/>`).join('')}</svg>`;
$('#rows').innerHTML=PJ.map((p,i)=>`<button class="row" data-i="${i}"><h3>${p[0]}</h3><small>${p[1]}</small></button>`).join('');
const pv=$('#pv');let px=0,py=0,tx=0,ty2=0;
$$('.row').forEach(r=>{const p=PJ[r.dataset.i];r.onmouseenter=()=>{pv.innerHTML=skl(p[2]);pv.style.opacity=1};r.onmouseleave=()=>pv.style.opacity=0;r.onclick=()=>speak(p[0]+" is a sample project. Add its photos, location and timeline here.")});
// word reveal
const rv=$('[data-rv]');rv.innerHTML=rv.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');const ws=$$('.w');
// cursor
const cu=$('#cur');addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;cu.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;tx=e.clientX;ty2=e.clientY});
document.addEventListener('pointerover',e=>{cu.classList.toggle('big',!!e.target.closest('a,button,.row'))});
// nav
function go(id){$('#mn').classList.remove('o');$('#mb').textContent='Menu';scrollTo({top:document.getElementById(id).offsetTop,behavior:'smooth'})}
$$('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();go(a.dataset.go)});
$('#mb').onclick=()=>{const o=$('#mn').classList.toggle('o');$('#mb').textContent=o?'Close':'Menu';$('#mb').setAttribute('aria-expanded',o)};
const nxt=()=>go(IDS[Math.min(IDS.length-1,IDS.indexOf(cur)+1)]);$('#nx').onclick=nxt;$('#tour').onclick=nxt;
$('#gc').onclick=()=>{const j=["Hard hat on, always.","Measure twice, pour once.","Click anywhere in the hero and the blocks scatter.","Rain or shine, we pour."];speak(j[Math.random()*j.length|0])};
$('#gc').onkeydown=e=>{if(e.key=='Enter')$('#gc').click()};
$('#fm').onsubmit=e=>{e.preventDefault();const f=e.target;speak("Opening your email app with the enquiry ready to send.");location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry from '+f.n.value)}&body=${encodeURIComponent('Name: '+f.n.value+'\nContact: '+f.p.value)}`};
// smooth scroll
const setH=()=>{document.body.style.height=sc.offsetHeight+'px'};new ResizeObserver(setH).observe(sc);
// loader
let ln=0;const ld=$('#ld');(function cnt(){ln=Math.min(100,ln+1.6);$('#ldn').textContent=Math.floor(ln);if(ln<100)requestAnimationFrame(cnt);else{ld.style.transform='translateY(-100%)';document.body.classList.add('go');ready=1;speak(LINES.hero)}})();

let R,S,cam,cs,cc,rex,parts={},IM,pcs=[],gr;
try{
const M=(c,r=.8)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
const B=(w,h,d,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);return o};
R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.autoClear=false;
S=new THREE.Scene();S.background=new THREE.Color(0x0c0d0e);S.fog=new THREE.Fog(0x0c0d0e,22,60);
cam=new THREE.PerspectiveCamera(40,1,.1,100);
S.add(new THREE.HemisphereLight(0x8fa0b2,0x15171a,.75));
const dl=new THREE.DirectionalLight(0xffe3b8,1.2);dl.position.set(8,14,10);S.add(dl);
const rl=new THREE.DirectionalLight(0xffb000,.6);rl.position.set(-10,4,-6);S.add(rl);
gr=new THREE.GridHelper(60,60,0x3a3f45,0x23272b);gr.material.transparent=true;gr.material.opacity=0;S.add(gr);
// pieces
const cols=[0x8d9298,0x6e7479,0xa5a9ad,0x585d63,0xffb000],rn=(a,b)=>a+Math.random()*(b-a);
function add(s,t,st,c){pcs.push({s,t:new THREE.Vector3(...t),st,c,home:new THREE.Vector3(rn(-12,12),rn(-2,10),rn(-5,5)),ph:rn(0,6.3),sp:rn(.3,.9),am:rn(.3,.8),rest:[rn(-3,3),rn(-3,3),rn(-3,3)],off:new THREE.Vector3(),v:new THREE.Vector3(),p:new THREE.Vector3()})}
for(let f=0;f<7;f++){const y=f*1.1,st=f/7*.3;add([3.2,.18,2.4],[0,y,0],st,0);
[[-1.45,-1.05],[1.45,-1.05],[-1.45,1.05],[1.45,1.05]].forEach(c=>add([.18,.92,.18],[c[0],y+.55,c[1]],st,1+(f+c[0]>0?1:0)%2));
[-1.45,1.45].forEach(x=>add([.12,.12,2.2],[x,y+.97,0],st,f==6?4:3))}
for(let i=0;i<40;i++){const a=rn(0,6.3),r=rn(3.2,6.5);add([rn(.4,.8),.3,rn(.3,.5)],[Math.cos(a)*r,.15,Math.sin(a)*r],0,i%9?3:4)}
IM=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),M(0xffffff,.75),pcs.length);S.add(IM);
pcs.forEach((p,i)=>IM.setColorAt(i,new THREE.Color(cols[p.c])));
// Rex
cs=new THREE.Scene();cc=new THREE.PerspectiveCamera(32,1/1.3,.1,50);cc.position.set(0,2.2,9.5);cc.lookAt(0,2.05,0);
cs.add(new THREE.HemisphereLight(0xaab8c8,0x222222,.9));const k=new THREE.DirectionalLight(0xffe6c0,1.3);k.position.set(3,6,6);cs.add(k);const rim=new THREE.DirectionalLight(0xffb000,.8);rim.position.set(-5,3,-4);cs.add(rim);
rex=new THREE.Group();cs.add(rex);const body=new THREE.Group();rex.add(body);
const skin=M(.0+0xd9a273,.7),vest=M(0xff9d00,.6),jean=M(0x2d3440);
body.add(B(1,1.2,.6,vest,0,2.1,0),B(1.02,.1,.62,M(0xdddddd),0,1.85,0),B(1.02,.1,.62,M(0xdddddd),0,2.35,0));
[-.26,.26].forEach(x=>body.add(B(.4,1.2,.46,jean,x,.95,0),B(.44,.3,.6,M(0x15171a),x,.3,.07)));
const head=new THREE.Group();head.position.y=3.15;body.add(head);parts.head=head;
head.add(new THREE.Mesh(new THREE.SphereGeometry(.45,24,16),skin));
[-.17,.17].forEach(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.06,10,10),M(0x111111));e.position.set(x,.04,.4);head.add(e)});
const hat=new THREE.Mesh(new THREE.SphereGeometry(.52,24,12,0,Math.PI*2,0,Math.PI/2),M(0xffb000,.4));hat.position.y=.1;head.add(hat);
const br=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.07,24),M(0xffb000,.4));br.position.set(0,.1,.1);head.add(br);head.add(B(.12,.1,.9,M(0xe69d00),0,.62,0));
function arm(x){const a=new THREE.Group();a.position.set(x,2.65,0);a.add(B(.28,1,.28,M(0x3a4048),0,-.45,0));const h=new THREE.Mesh(new THREE.SphereGeometry(.16,12,12),skin);h.position.y=-1;a.add(h);body.add(a);return a}
parts.R=arm(.66);parts.L=arm(-.66);parts.L.add(B(.5,.66,.05,M(0x8a6a3a),-.05,-1,.2));
}catch(err){console.warn(err);R=null;document.body.style.background='radial-gradient(circle at 30% 30%,#23272c,#0c0d0e 70%)'}

function rs(){W=innerWidth;H=innerHeight;const cw=W<700?112:230;document.documentElement.style.setProperty('--cw',cw+'px');$('#gc').style.width=cw+'px';$('#gc').style.height=Math.round(cw*1.3)+'px';if(!R)return;R.setSize(W,H);cam.aspect=W/H;cam.updateProjectionMatrix()}
addEventListener('resize',rs);rs();
addEventListener('pointerdown',e=>{if(scrollY<H*.6&&!e.target.closest('button,a'))burst=1});
const dummy=R&&new THREE.Object3D(),mv=R&&new THREE.Vector3(),dir=R&&new THREE.Vector3(),nrm=R&&new THREE.Vector3(),tmp=R&&new THREE.Vector3(),ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;

function loop(){
requestAnimationFrame(loop);t+=.016;
const max=Math.max(1,document.documentElement.scrollHeight-H),p=Math.min(1,scrollY/max);
Y=L(Y,scrollY,.085);sc.style.transform=`translate3d(0,${-Y}px,0)`;
let best='hero';IDS.forEach(id=>{if(document.getElementById(id).offsetTop<=Y+H*.5)best=id});
if(best!=cur){cur=best;if(ready)speak(LINES[cur])}
ws.forEach(w=>{const r=w.getBoundingClientRect(),q=Math.max(0,Math.min(1,(H*.85-r.top)/(H*.4)));w.style.opacity=.16+q*.84});
px=L(px,tx,.14);py=L(py,ty2,.14);pv.style.transform=`translate(${px+24}px,${py-95}px) rotate(${(tx-px)*.05}deg)`;
if(!R)return;
// blocks: scatter -> assemble
burst*=.94;const asmG=Math.min(1,Math.max(0,(p-.1)/.5));
cam.position.set(Math.sin(p*.9-.15+mx*.08)*(17-p*2),3+p*2.5-my*.7,Math.cos(p*.9-.15+mx*.08)*(17-p*2));cam.lookAt(0,2+p*2,0);cam.updateMatrixWorld();
mv.set(mx,-my,.5).unproject(cam);dir.copy(mv).sub(cam.position).normalize();cam.getWorldDirection(nrm);
const d0=-cam.position.dot(nrm)/dir.dot(nrm);mv.copy(cam.position).addScaledVector(dir,Math.max(1,d0));
pcs.forEach((o,i)=>{
 const e=ease(Math.min(1,Math.max(0,(asmG*1.35-o.st)/.7))),fl=1-e;
 tmp.set(o.home.x+Math.sin(t*o.sp+o.ph)*o.am,o.home.y+Math.cos(t*o.sp*1.2+o.ph)*o.am,o.home.z+Math.sin(t*o.sp*.8+o.ph*2)*o.am);
 dir.copy(tmp).sub(mv);const d=dir.length();
 if(fl>.02&&d<3.4)o.v.addScaledVector(dir.normalize(),(3.4-d)/3.4*.05*fl*(1+burst*5));
 if(burst>.5&&fl>.02)o.v.addScaledVector(dir.set(o.home.x,o.home.y-3,o.home.z).normalize(),.04*burst);
 o.v.addScaledVector(o.off,-.035).multiplyScalar(.9);o.off.add(o.v);
 o.p.copy(tmp).lerp(o.t,e).addScaledVector(o.off,fl);
 dummy.position.copy(o.p);
 const w=Math.sin(t*o.sp+o.ph)*.5;dummy.rotation.set((o.rest[0]+w)*fl,(o.rest[1]+w+Math.sin(t*.2+o.ph))*fl,(o.rest[2]+w)*fl);
 dummy.scale.set(...o.s);dummy.updateMatrix();IM.setMatrixAt(i,dummy.matrix)});
IM.instanceMatrix.needsUpdate=true;gr.material.opacity=asmG*.7;
// Rex
wave=Math.max(0,wave-.016);
rex.position.y=Math.sin(t*2)*.03;rex.rotation.y=L(rex.rotation.y,mx*.5-.35,.08);
parts.head.rotation.y=L(parts.head.rotation.y,mx*.5-.2,.1);parts.head.rotation.x=L(parts.head.rotation.x,my*.25+(talking?Math.sin(t*12)*.06:0),.1);
parts.R.rotation.z=L(parts.R.rotation.z,wave>0?2.6+Math.sin(t*13)*.35:.06,.15);
parts.L.rotation.x=L(parts.L.rotation.x,talking?-1.1:-.75,.1);
R.setScissorTest(true);R.setViewport(0,0,W,H);R.setScissor(0,0,W,H);R.clear();R.render(S,cam);
const b=$('#gc').getBoundingClientRect();R.setViewport(b.left,H-b.bottom,b.width,b.height);R.setScissor(b.left,H-b.bottom,b.width,b.height);R.clearDepth();R.render(cs,cc);
}
loop();
