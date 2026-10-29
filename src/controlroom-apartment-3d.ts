import * as THREE from "three";

type HAState = {state:string;attributes:Record<string,unknown>};
type Hass = {states:Record<string,HAState>};
type Pt = [number,number];
type Room = {name:string;points:Pt[];floor:number};
type Segment = {a:Pt;b:Pt;kind?:'window'|'door'|'opening';room?:string};

/** V58 architectural correction model. Coordinates are traced from the supplied floor plan,
 *  not an architect's measured CAD survey. No furniture is added in this stage. */
export class ControlRoomApartment3D extends HTMLElement {
  private scene=new THREE.Scene();
  private camera:THREE.Camera=new THREE.PerspectiveCamera(37,1,.1,160);
  private viewMode:"top"|"3d"|"inside"="3d";
  private wallsVisible=true;
  private walls:THREE.Object3D[]=[];
  private editor=false;
  private selectedWall=-1;
  private history:Segment[][]=[];
  private future:Segment[][]=[];
  private wallDrag?:{index:number;mode:'move'|'a'|'b';start:Pt;original:Segment};
  private pixelsPerMeter=100;
  private unit:'m'|'cm'|'ft'='m';
  private readonly settingsKey='controlroom-apartment-studio-units-v1';
  private readonly storageKey='controlroom-apartment-studio-v1';
  private editableSegments?:Segment[];
  private focusRoom?:string;
  private renderer?:THREE.WebGLRenderer;
  private stage=document.createElement('div');
  private observer?:ResizeObserver;
  private frame=0;
  private angle=.76;
  private elevation=.62;
  private radius=23;
  private dragging=false;
  private moved=false;
  private pointer={x:0,y:0};
  private raycaster=new THREE.Raycaster();
  private mouse=new THREE.Vector2();
  private selectable:THREE.Object3D[]=[];
  private _hass?:Hass;
  private materials:THREE.Material[]=[];
  private geometries:THREE.BufferGeometry[]=[];
  private center=new THREE.Vector3(0,0,0);
  static get observedAttributes(){return ['sofalicht','tischlicht'];}
  set hass(v:Hass|undefined){this._hass=v;}
  get hass(){return this._hass;}
  constructor(){super();this.attachShadow({mode:'open'});}
  private readonly rooms:Room[]=[
    {name:'Schlafzimmer',points:[[127,68],[281,68],[281,259],[127,259]],floor:0xc5b49f},
    {name:'Badezimmer',points:[[115,271],[211,271],[211,443],[115,443]],floor:0x4c625b},
    {name:'Flur',points:[[212,261],[297,261],[297,299],[408,299],[408,379],[212,379]],floor:0xbba98f},
    {name:'Wohnzimmer',points:[[212,379],[316,379],[316,649],[115,649],[115,445],[212,445]],floor:0xb68c63},
    {name:'Küche',points:[[316,380],[430,380],[430,558],[316,558]],floor:0xb9a58d},
    {name:'Balkon',points:[[316,558],[430,558],[430,650],[316,650]],floor:0x88837a}
  ];
  // The coordinate system below uses the user's marked plan as a tracing guide.
  // X/Y in these lists are IMAGE coordinates, not world metres.
  private readonly segments:Segment[]=[
    // Bedroom perimeter, including the narrow upper window and the door into the hall.
    {a:[127,68],b:[151,68]},{a:[151,68],b:[213,68],kind:'window'},{a:[213,68],b:[281,68]},
    {a:[127,68],b:[127,259]},{a:[281,68],b:[281,259]},
    {a:[127,259],b:[238,259]},{a:[238,259],b:[269,259],kind:'door'},{a:[269,259],b:[281,259]},
    // Bathroom, its internal access and the external left window.
    {a:[115,271],b:[115,310]},{a:[115,310],b:[115,366],kind:'window'},{a:[115,366],b:[115,443]},
    {a:[115,271],b:[211,271]},{a:[115,443],b:[211,443]},
    {a:[211,271],b:[211,301]},{a:[211,301],b:[211,325],kind:'door'},{a:[211,325],b:[211,443]},
    // Entry corridor, stepped exterior contour and front door (upper horizontal opening).
    {a:[281,259],b:[297,259]},{a:[297,259],b:[297,299]},
    {a:[297,299],b:[334,299]},{a:[334,299],b:[375,299],kind:'door'},{a:[375,299],b:[408,299]},
    {a:[408,299],b:[408,379]},
    {a:[211,379],b:[238,379]},{a:[238,379],b:[292,379],kind:'door'},{a:[292,379],b:[316,379]},
    {a:[316,379],b:[343,379]},{a:[343,379],b:[396,379],kind:'door'},{a:[396,379],b:[408,379]},
    // Living room, window along its bottom facade and open passage to kitchen.
    {a:[115,443],b:[115,649]},
    {a:[115,649],b:[139,649]},{a:[139,649],b:[299,649],kind:'window'},{a:[299,649],b:[316,649]},
    {a:[316,379],b:[316,590]},{a:[316,590],b:[316,622],kind:'door'},{a:[316,622],b:[316,650]},
    // Kitchen and its right exterior wall.
    {a:[316,379],b:[430,379]},{a:[430,379],b:[430,558]},
    {a:[316,558],b:[348,558]},{a:[348,558],b:[402,558],kind:'window'},{a:[402,558],b:[430,558]},
    // Balcony is an exterior space, with a low parapet and an open/door access from the living room.
    {a:[316,650],b:[430,650],room:'Balkon'},{a:[430,558],b:[430,650],room:'Balkon'}
  ];
  connectedCallback(){
    if(this.renderer)return;
    this.shadowRoot!.innerHTML=`<style>
      :host{display:block;position:relative;width:100%;height:clamp(390px,52vw,650px);overflow:hidden;border-radius:22px;background:radial-gradient(ellipse at 52% 38%,#353332,#1b1c20 70%,#131519);color:#f2eee9;font:500 12px system-ui}
      .stage{position:absolute;inset:0;touch-action:none;cursor:grab}.stage:active{cursor:grabbing}
      .label{position:absolute;left:18px;top:17px;pointer-events:none;z-index:2}.label b{display:block;font-size:15px}.label span{color:#c8c1b8}
      .hint{position:absolute;left:18px;bottom:18px;color:#c8c1b8;opacity:.75;pointer-events:none;font-size:11px}
      .toolbar{position:absolute;right:15px;bottom:15px;display:flex;gap:7px;z-index:2;flex-wrap:wrap;justify-content:flex-end;max-width:80%}
      .modes{position:absolute;top:15px;right:15px;display:flex;gap:5px;z-index:2;background:#16181dcc;border:1px solid #ffffff25;padding:4px;border-radius:13px;backdrop-filter:blur(12px)}
      .modes button{border:0;background:transparent;padding:8px 11px}.modes button.active{background:#77736688;color:white}
      .studio{display:none;position:absolute;top:65px;right:14px;width:min(290px,calc(100% - 28px));max-height:calc(100% - 145px);overflow:auto;z-index:5;background:#171b20ed;border:1px solid #ffffff30;border-radius:15px;padding:14px;box-sizing:border-box;box-shadow:0 15px 45px #0008}
      :host([studio-mode]){height:100%;min-height:580px;border:1px solid #ffffff1d}
      :host([studio-mode]) .stage{right:315px}
      :host([studio-mode]) .studio{display:block;top:72px;right:14px;bottom:70px;max-height:none;width:288px;overflow:auto}
      :host([studio-mode]) .toolbar{right:326px}
      :host([studio-mode]) .modes{right:326px}
      :host([studio-mode]) [data-studio]{display:none}
      @media(max-width:850px){:host([studio-mode]) .stage{right:0;bottom:300px}:host([studio-mode]) .studio{top:auto;bottom:8px;left:10px;right:10px;width:auto;height:285px;max-height:none}:host([studio-mode]) .toolbar{right:10px;bottom:310px}:host([studio-mode]) .modes{right:10px}}
      .studio.open{display:block}.studio h3{font-size:14px;margin:0 0 9px}.studio p{color:#bcb8b0;line-height:1.5;font-size:11px}
      .studio .actions{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}
      .studio input,.studio select{width:100%;box-sizing:border-box;background:#242930;color:#fff;border:1px solid #ffffff35;border-radius:8px;padding:7px;margin:3px 0 8px;font:inherit}
      .studio label{display:block;color:#d5d1c9;font-size:11px}
      .studio button{padding:7px 9px;font-size:11px}
      .studio .measure{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .studio .tip{background:#26332f;border:1px solid #5b8c77;border-radius:9px;padding:9px}
      .studio .danger{border-color:#b66a6a;color:#ffcccc}
      .roomname{position:absolute;left:18px;bottom:45px;color:#f3ece3;font-size:12px;z-index:2;pointer-events:none}
      button{border:1px solid #ffffff33;border-radius:10px;background:#16181dcc;color:#eee;padding:9px 12px;font:inherit;cursor:pointer;backdrop-filter:blur(12px)}button:hover{background:#343741}
      @media(max-width:540px){.hint{display:none}.toolbar{right:9px;bottom:9px;max-width:95%}.label{left:12px;top:12px}.modes{top:58px;left:10px;right:auto}}
    </style><div class="stage"></div><div class="label"><b>Living Spaces · Architektur</b><span>V62 · Floor Studio · Drag & Maße</span></div><div class="hint">Ziehen: drehen · Scrollen: zoomen · Raum anklicken: fokussieren</div><div class="roomname" id="roomname">Gesamte Wohnung</div><div class="studio" id="studio">
      <h3>ControlRoom Floor Studio · V62</h3>
      <p>Na vista Planta: arraste o meio da parede para mover. Arraste uma ponta para aumentar, diminuir ou girar. Também é possível digitar medidas. Salvamento local neste navegador.</p>
      <div id="wall-fields" hidden>
        <label>Início X <input id="ax" type="number" step="1"></label>
        <label>Início Y <input id="ay" type="number" step="1"></label>
        <label>Fim X <input id="bx" type="number" step="1"></label>
        <label>Fim Y <input id="by" type="number" step="1"></label>
        <div class="measure"><label>Comprimento <input id="length" type="number" min="0.01" step="0.01"></label><label>Unidade<select id="units"><option value="m">Metros (m)</option><option value="cm">Centímetros (cm)</option><option value="ft">Pés (ft)</option></select></label></div>
        <p>O comprimento digitado ajusta a ponta final, mantendo a direção da parede.</p>
        <label>Tipo<select id="kind"><option value="wall">Parede</option><option value="window">Janela</option><option value="door">Porta</option><option value="opening">Abertura</option></select></label>
        <div class="actions"><button id="apply-wall">Aplicar</button><button id="delete-wall" class="danger">Excluir</button></div>
      </div>
      <div class="tip">🖱️ Clique e arraste a parede. Perto das pontas: redimensionar. No centro: mover. O comprimento aparece em tempo real.</div>
      <label>Escala da planta — unidades do desenho por metro <input id="scale" type="number" min="1" max="1000" step="1" value="100"></label>
      <p>Calibre a escala com uma parede cuja medida real você conhece. A planta original não tem medidas verificadas.</p>
      <div class="actions"><button id="new-wall">+ Parede</button><button id="undo-wall">↶ Desfazer</button><button id="redo-wall">↷ Refazer</button></div>
      <div class="actions"><button id="save-wall">Salvar local</button><button id="export-wall">Exportar JSON</button><button id="reset-wall" class="danger">Restaurar V58</button></div>
      <p id="studio-status">Clique em uma parede para editar.</p>
    </div><div class="modes"><button data-view="top">▦ Planta</button><button data-view="3d" class="active">⬡ 3D</button><button data-view="inside">◉ Interior</button></div><div class="toolbar"><button data-studio>✎ Studio</button><button data-walls title="Wände ein-/ausblenden">◫ Wände</button><button data-zoom="in" title="Vergrößern">＋</button><button data-zoom="out" title="Verkleinern">－</button><button data-reset title="Ansicht zurücksetzen">↺</button></div>`;
    this.stage=this.shadowRoot!.querySelector('.stage')!;
    this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'default'});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.35;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.stage.append(this.renderer.domElement);
    this.scene.add(new THREE.AmbientLight(0xffffff,1.75));
    const sun=new THREE.DirectionalLight(0xffebd5,2.4);sun.position.set(-6,12,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-13;sun.shadow.camera.right=13;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;this.scene.add(sun);
    const fill=new THREE.DirectionalLight(0xc8d5ec,.9);fill.position.set(8,7,-7);this.scene.add(fill);
    this.loadLocal();
    this.build();this.updateCamera();
    if(this.hasAttribute("studio-mode")){this.editor=true;this.shadowRoot!.querySelector("#studio")!.classList.add("open");this.setView("top");}
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this);
    this.stage.addEventListener('pointerdown',this.down);this.stage.addEventListener('pointermove',this.move);this.stage.addEventListener('pointerup',this.up);this.stage.addEventListener('pointercancel',this.up);this.stage.addEventListener('wheel',this.wheel,{passive:false});
    this.shadowRoot!.querySelector('[data-zoom="in"]')!.addEventListener('click',()=>this.zoom(-1));
    this.shadowRoot!.querySelector('[data-zoom="out"]')!.addEventListener('click',()=>this.zoom(1));
    this.shadowRoot!.querySelector('[data-reset]')!.addEventListener('click',()=>{this.focusRoom=undefined;this.center.set(0,0,0);this.radius=23;this.angle=.76;this.elevation=.62;this.setView(this.viewMode);});
    this.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(button=>button.addEventListener('click',()=>this.setView(button.dataset.view as "top"|"3d"|"inside")));
    this.shadowRoot!.querySelector('[data-walls]')!.addEventListener('click',()=>{this.wallsVisible=!this.wallsVisible;this.walls.forEach(w=>w.visible=this.wallsVisible);this.shadowRoot!.querySelector('[data-walls]')!.textContent=this.wallsVisible?'◫ Wände':'▤ Ohne Wände';});
    this.shadowRoot!.querySelector('[data-studio]')!.addEventListener('click',()=>{
      this.editor=!this.editor;this.shadowRoot!.querySelector('#studio')!.classList.toggle('open',this.editor);
      if(this.editor)this.setView('top');
      this.shadowRoot!.querySelector('[data-studio]')!.textContent=this.editor?'✕ Fechar Studio':'✎ Studio';
    });
    const bind=(id:string,fn:()=>void)=>this.shadowRoot!.querySelector('#'+id)!.addEventListener('click',fn);
    const units=this.shadowRoot!.querySelector<HTMLSelectElement>('#units')!;
    const scale=this.shadowRoot!.querySelector<HTMLInputElement>('#scale')!;
    try { const settings=JSON.parse(localStorage.getItem(this.settingsKey)||'{}');
      if(['m','cm','ft'].includes(settings.unit))this.unit=settings.unit;
      if(Number.isFinite(settings.pixelsPerMeter)&&settings.pixelsPerMeter>0)this.pixelsPerMeter=settings.pixelsPerMeter;
    } catch {/* Use defaults */}
    units.value=this.unit;scale.value=String(this.pixelsPerMeter);
    units.addEventListener('change',()=>{this.unit=units.value as 'm'|'cm'|'ft';this.showWall();});
    scale.addEventListener('change',()=>{const v=Number(scale.value);if(Number.isFinite(v)&&v>0&&v<=1000){this.pixelsPerMeter=v;this.showWall();}else scale.value=String(this.pixelsPerMeter);});
    bind('apply-wall',()=>this.applyWall());
    bind('delete-wall',()=>{if(this.selectedWall<0)return;this.snapshot();this.currentSegments().splice(this.selectedWall,1);this.selectedWall=-1;this.rebuild();this.showWall();});
    bind('new-wall',()=>{this.snapshot();this.currentSegments().push({a:[260,380],b:[300,380]});this.selectedWall=this.currentSegments().length-1;this.rebuild();this.showWall();});
    bind('undo-wall',()=>{if(!this.history.length)return;this.future.push(this.clone());this.editableSegments=this.history.pop();this.selectedWall=-1;this.rebuild();this.showWall();});
    bind('redo-wall',()=>{if(!this.future.length)return;this.history.push(this.clone());this.editableSegments=this.future.pop();this.selectedWall=-1;this.rebuild();this.showWall();});
    bind('save-wall',()=>{try{localStorage.setItem(this.storageKey,JSON.stringify(this.currentSegments()));localStorage.setItem(this.settingsKey,JSON.stringify({unit:this.unit,pixelsPerMeter:this.pixelsPerMeter}));this.status('Salvo neste navegador.');}catch{this.status('Não foi possível salvar no navegador.');}});
    bind('export-wall',()=>{const blob=new Blob([JSON.stringify(this.currentSegments(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='controlroom-apartment-walls.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);this.status('Backup JSON exportado.');});
    bind('reset-wall',()=>{if(!confirm('Restaurar todas as paredes originais da V58?'))return;this.snapshot();this.editableSegments=this.segments.map(s=>({...s,a:[...s.a],b:[...s.b]}));this.selectedWall=-1;this.rebuild();this.showWall();this.status('Base V58 restaurada. Clique em Salvar local para guardar.');});
    this.loop();
  }
  disconnectedCallback(){cancelAnimationFrame(this.frame);this.observer?.disconnect();this.stage.removeEventListener('pointerdown',this.down);this.stage.removeEventListener('pointermove',this.move);this.stage.removeEventListener('pointerup',this.up);this.stage.removeEventListener('pointercancel',this.up);this.stage.removeEventListener('wheel',this.wheel);this.geometries.forEach(g=>g.dispose());this.materials.forEach(m=>m.dispose());this.renderer?.dispose();this.renderer?.domElement.remove();this.renderer=undefined;this.selectable=[];this.scene.clear();}
  private mat(color:number,metalness=0){const m=new THREE.MeshStandardMaterial({color,roughness:.86,metalness});this.materials.push(m);return m;}
  private world(p:Pt){return new THREE.Vector2((p[0]-272)*.024,(p[1]-354)*.024);}
  private cuboid(x:number,y:number,z:number,w:number,h:number,d:number,color:number,room?:string){const g=new THREE.BoxGeometry(w,h,d);this.geometries.push(g);const mesh=new THREE.Mesh(g,this.mat(color));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;if(room){mesh.userData.room=room;this.selectable.push(mesh);}this.scene.add(mesh);return mesh;}
  private line(a:Pt,b:Pt,height:number,color:number,room?:string){const p=this.world(a),q=this.world(b);const length=p.distanceTo(q);if(length<.005)return;const mesh=this.cuboid((p.x+q.x)/2,height/2,(p.y+q.y)/2,length,height,.085,color,room);mesh.rotation.y=-Math.atan2(q.y-p.y,q.x-p.x);this.walls.push(mesh);}
  private floor(room:Room){const shape=new THREE.Shape();room.points.forEach((p,i)=>{const q=this.world(p);if(i===0)shape.moveTo(q.x,-q.y);else shape.lineTo(q.x,-q.y);});shape.closePath();const g=new THREE.ShapeGeometry(shape);this.geometries.push(g);const mesh=new THREE.Mesh(g,this.mat(room.floor));mesh.rotation.x=-Math.PI/2;mesh.position.y=.055;mesh.receiveShadow=true;mesh.userData.room=room.name;this.selectable.push(mesh);this.scene.add(mesh);}
  private build(){
    this.cuboid(0,-.20,0,8.5,.35,15.5,0x302e30);
    this.cuboid(0,-.38,0,8.65,.14,15.65,0x19191e);
    for(const room of this.rooms)this.floor(room);
    for(const [index,seg] of this.currentSegments().entries()){
      const before=this.walls.length;
      const low=seg.room==='Balkon';
      if(seg.kind==='opening')continue;
      if(seg.kind==='door'){
        // Door opening: threshold only, no solid wall crossing the doorway.
        this.line(seg.a,seg.b,.018,0x8b7d6e);
      }else if(seg.kind==='window'){
        // A visible window sill and transparent glass panel, not a solid wall.
        this.line(seg.a,seg.b,.27,0x918b83);
        const a=this.world(seg.a),b=this.world(seg.b),length=a.distanceTo(b);
        const geo=new THREE.BoxGeometry(length,.34,.025);this.geometries.push(geo);
        const glass=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:0xbad4d9,transparent:true,opacity:.27,roughness:.18,metalness:0,depthWrite:false,side:THREE.DoubleSide}));
        this.materials.push(glass.material);glass.position.set((a.x+b.x)/2,.45,(a.y+b.y)/2);glass.rotation.y=-Math.atan2(b.y-a.y,b.x-a.x);this.scene.add(glass);this.walls.push(glass);
      }else this.line(seg.a,seg.b,low?.32:.83,low?0x9b938b:0xc7bdb1,seg.room);
      // Each wall can be selected independently in Studio.
      for(const wall of this.walls.slice(before)){
        wall.userData.wallIndex=index;this.selectable.push(wall);
        if(index===this.selectedWall && wall instanceof THREE.Mesh){(wall.material as THREE.MeshStandardMaterial).color.setHex(0x4fc6a6);}
      }

    }
  }
  private currentSegments(){if(!this.editableSegments)this.editableSegments=this.segments.map(s=>({...s,a:[...s.a] as Pt,b:[...s.b] as Pt}));return this.editableSegments;}
  private clone(){return this.currentSegments().map(s=>({...s,a:[...s.a] as Pt,b:[...s.b] as Pt}));}
  private snapshot(){this.history.push(this.clone());if(this.history.length>60)this.history.shift();this.future=[];}
  private loadLocal(){try{const raw=localStorage.getItem(this.storageKey);if(!raw)return;const value:unknown=JSON.parse(raw);if(Array.isArray(value)&&value.length<500&&value.every((s:any)=>Array.isArray(s.a)&&Array.isArray(s.b)&&s.a.length===2&&s.b.length===2&&[...s.a,...s.b].every((n:unknown)=>typeof n==='number'&&Number.isFinite(n))))this.editableSegments=value as Segment[];}catch{/* Keep default geometry. */}}
  private status(message:string){const el=this.shadowRoot?.querySelector('#studio-status');if(el)el.textContent=message;}
  private showWall(){
    const fields=this.shadowRoot!.querySelector<HTMLElement>('#wall-fields')!;
    const seg=this.currentSegments()[this.selectedWall];fields.hidden=!seg;
    if(!seg){this.status('Selecione uma parede na planta.');return;}
    for(const [id,v] of [['ax',seg.a[0]],['ay',seg.a[1]],['bx',seg.b[0]],['by',seg.b[1]]] as const)(this.shadowRoot!.querySelector('#'+id) as HTMLInputElement).value=String(v);
    (this.shadowRoot!.querySelector('#kind') as HTMLSelectElement).value=seg.kind||'wall';
    (this.shadowRoot!.querySelector('#length') as HTMLInputElement).value=this.lengthInUnit(seg).toFixed(2);
    this.status('Parede '+(this.selectedWall+1)+' selecionada. Ajuste e clique em Aplicar.');
  }
  private lengthInUnit(seg:Segment):number{
    const meters=Math.hypot(seg.b[0]-seg.a[0],seg.b[1]-seg.a[1])/this.pixelsPerMeter;
    return this.unit==='cm'?meters*100:this.unit==='ft'?meters/0.3048:meters;
  }
  private applyWall(){
    if(this.selectedWall<0)return;
    const read=(id:string)=>Number((this.shadowRoot!.querySelector('#'+id) as HTMLInputElement).value);
    const nums=['ax','ay','bx','by'].map(read);
    if(nums.some(n=>!Number.isFinite(n)||n<0||n>1000)){this.status('Use coordenadas entre 0 e 1000.');return;}
    const kind=(this.shadowRoot!.querySelector('#kind') as HTMLSelectElement).value;
    const lengthInput=this.shadowRoot!.querySelector<HTMLInputElement>('#length')!;
    const targetLength=Number(lengthInput.value);
    if(!Number.isFinite(targetLength)||targetLength<=0){this.status('Digite um comprimento maior que zero.');return;}
    const original=this.currentSegments()[this.selectedWall];
    const displayedLength=this.lengthInUnit(original);
    if(Math.abs(targetLength-displayedLength)>0.011){
      const lengthPixels=this.unit==='m'?targetLength*this.pixelsPerMeter:this.unit==='cm'?targetLength*this.pixelsPerMeter/100:targetLength*this.pixelsPerMeter*0.3048;
      const dx=nums[2]-nums[0],dy=nums[3]-nums[1],distance=Math.hypot(dx,dy);
      if(distance<0.00001){this.status('A parede precisa ter uma direção para alterar seu comprimento.');return;}
      nums[2]=nums[0]+dx/distance*lengthPixels;
      nums[3]=nums[1]+dy/distance*lengthPixels;
    }
    this.snapshot();
    const s=this.currentSegments()[this.selectedWall];s.a=[nums[0],nums[1]];s.b=[nums[2],nums[3]];
    s.kind=kind==='wall'?undefined:kind as Segment['kind'];
    this.rebuild();this.showWall();this.status('Parede alterada. Clique em Salvar local para persistir.');
  }
  private rebuild(){
    for(const g of this.geometries)g.dispose();for(const m of this.materials)m.dispose();
    this.geometries=[];this.materials=[];this.scene.children.filter(o=>o instanceof THREE.Mesh).forEach(o=>this.scene.remove(o));
    this.walls=[];this.selectable=[];this.build();
    this.walls.forEach(w=>w.visible=this.wallsVisible);
  }
  private setView(mode:"top"|"3d"|"inside"){
    this.viewMode=mode;
    this.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===mode));
    if(mode==='top'){this.camera=new THREE.OrthographicCamera(-7,7,7,-7,.1,160);this.radius=23;}
    else {this.camera=new THREE.PerspectiveCamera(mode==='inside'?58:37,1,.1,160);this.elevation=mode==='inside'?1.34:.62;this.radius=mode==='inside'?8:23;}
    this.resize();this.updateCamera();
  }
  private updateCamera(){
    const t=this.center;
    if(this.viewMode==='top'){
      const cam=this.camera as THREE.OrthographicCamera;
      cam.position.set(t.x,25,t.z+.001);cam.up.set(0,0,-1);cam.lookAt(t);
      const h=this.stage.clientHeight||500,w=this.stage.clientWidth||900;
      const span=16*(this.radius/23);cam.left=-span*w/h/2;cam.right=span*w/h/2;cam.top=span/2;cam.bottom=-span/2;cam.updateProjectionMatrix();
    }else{
      this.camera.up.set(0,1,0);
      this.camera.position.set(t.x+this.radius*Math.sin(this.elevation)*Math.cos(this.angle),t.y+this.radius*Math.cos(this.elevation),t.z+this.radius*Math.sin(this.elevation)*Math.sin(this.angle));
      this.camera.lookAt(t);
    }
  }
  private resize(){if(!this.renderer)return;const w=this.stage.clientWidth,h=this.stage.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);if(this.camera instanceof THREE.PerspectiveCamera){this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}this.updateCamera();}
  private loop=()=>{if(!this.renderer)return;this.frame=requestAnimationFrame(this.loop);this.renderer.render(this.scene,this.camera);};
   private pointerPlan(e:PointerEvent):Pt|undefined{
     const rect=this.renderer?.domElement.getBoundingClientRect();if(!rect||!rect.width||!rect.height)return;
     const ndc=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
     const ray=new THREE.Raycaster();ray.setFromCamera(ndc,this.camera);
     const hit=new THREE.Vector3();if(!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),hit))return;
     return [hit.x/.024+272,hit.z/.024+354];
   }
   private closestWall(p:Pt):{index:number;mode:'move'|'a'|'b'}|undefined{
     const threshold=14*16*(this.radius/23)/(this.stage.clientHeight||500)/.024;
     let best=threshold,index=-1,mode:'move'|'a'|'b'='move';
     this.currentSegments().forEach((s,i)=>{
       const dx=s.b[0]-s.a[0],dy=s.b[1]-s.a[1],len2=dx*dx+dy*dy;if(len2<.0001)return;
       const t=Math.max(0,Math.min(1,((p[0]-s.a[0])*dx+(p[1]-s.a[1])*dy)/len2));
       const dist=Math.hypot(p[0]-s.a[0]-t*dx,p[1]-s.a[1]-t*dy);
       if(dist<best){best=dist;index=i;mode=t<.17?'a':t>.83?'b':'move';}
     });
     return index>=0?{index,mode}:undefined;
   }
   private down=(e:PointerEvent)=>{
     this.dragging=true;this.moved=false;this.pointer={x:e.clientX,y:e.clientY};
     if(this.editor&&this.viewMode==='top'){
       const point=this.pointerPlan(e);const target=point&&this.closestWall(point);
       if(point&&target){
         this.selectedWall=target.index;this.snapshot();
         const seg=this.currentSegments()[target.index];
         this.wallDrag={index:target.index,mode:target.mode,start:point,original:{...seg,a:[...seg.a] as Pt,b:[...seg.b] as Pt}};
         this.rebuild();this.showWall();
       }
     }
     this.stage.setPointerCapture(e.pointerId);
   };
   private move=(e:PointerEvent)=>{
     if(!this.dragging)return;
     const dx=e.clientX-this.pointer.x,dy=e.clientY-this.pointer.y;
     if(Math.abs(dx)+Math.abs(dy)>2)this.moved=true;
     if(this.wallDrag){
       const point=this.pointerPlan(e);
       if(point){
         const dX=point[0]-this.wallDrag.start[0],dY=point[1]-this.wallDrag.start[1];
         const seg=this.currentSegments()[this.wallDrag.index],orig=this.wallDrag.original;
         if(this.wallDrag.mode==='move'){
           seg.a=[orig.a[0]+dX,orig.a[1]+dY];seg.b=[orig.b[0]+dX,orig.b[1]+dY];
         }else if(this.wallDrag.mode==='a')seg.a=[orig.a[0]+dX,orig.a[1]+dY];
         else seg.b=[orig.b[0]+dX,orig.b[1]+dY];
         this.rebuild();this.showWall();
         this.status('Arrastando parede '+(this.selectedWall+1)+' · '+this.lengthInUnit(seg).toFixed(2)+' '+this.unit);
       }
     }else if(this.viewMode==='top'){
       const scale=16*(this.radius/23)/(this.stage.clientHeight||500);
       this.center.x-=dx*scale;this.center.z-=dy*scale;
     }else{
       this.angle-=dx*.007;this.elevation=THREE.MathUtils.clamp(this.elevation+dy*.006,this.viewMode==='inside'?1.1:.24,1.49);
     }
     this.pointer={x:e.clientX,y:e.clientY};this.updateCamera();
   };
   private up=(e:PointerEvent)=>{
     if(!this.dragging)return;
     this.dragging=false;
     if(this.wallDrag){
       if(!this.moved){this.history.pop();this.future=[];}
       else this.status('Parede ajustada. Clique em Salvar local para guardar.');
       this.wallDrag=undefined;return;
     }
     if(!this.moved)this.pick(e);
   };
  private pick(e:PointerEvent){if(!this.renderer)return;const r=this.renderer.domElement.getBoundingClientRect();this.mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);this.raycaster.setFromCamera(this.mouse,this.camera);const hit=this.raycaster.intersectObjects(this.selectable,false)[0];if(this.editor){
      if(hit?.object.userData.wallIndex!==undefined){
        this.selectedWall=hit.object.userData.wallIndex as number;
        this.rebuild();this.showWall();
      }else this.status('Clique sobre uma parede para selecioná-la.');
      return;
    }
    const name=hit?.object.userData.room;if(name){
      this.focusRoom=name;
      const room=this.rooms.find(r=>r.name===name);
      if(room){const pts=room.points.map(p=>this.world(p));this.center.set(pts.reduce((n,p)=>n+p.x,0)/pts.length,0,pts.reduce((n,p)=>n+p.y,0)/pts.length);this.radius=this.viewMode==='top'?14:this.viewMode==='inside'?5:12;this.updateCamera();}
      this.shadowRoot!.querySelector('#roomname')!.textContent=name+' · ausgewählt';
      // In architecture-review mode, clicking focuses the camera rather than navigating away.
    }}
  private wheel=(e:WheelEvent)=>{e.preventDefault();this.radius=THREE.MathUtils.clamp(this.radius+e.deltaY*.013,this.viewMode==='inside'?2:5,45);this.updateCamera();};
  private zoom(direction:number){this.radius=THREE.MathUtils.clamp(this.radius+direction*2,this.viewMode==='inside'?2:5,45);this.updateCamera();}
}
if(!customElements.get('controlroom-apartment-3d'))customElements.define('controlroom-apartment-3d',ControlRoomApartment3D);
