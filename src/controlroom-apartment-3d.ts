import * as THREE from "three";

type HAState = {state:string;attributes:Record<string,unknown>};
type Hass = {states:Record<string,HAState>};
type Room = {name:string;x:number;z:number;w:number;d:number;color:number};

/** ControlRoom 3D apartment prototype. Geometry is illustrative, NOT the real floor plan. */
export class ControlRoomApartment3D extends HTMLElement {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(39,1,.1,120);
  private renderer?:THREE.WebGLRenderer;
  private stage = document.createElement('div');
  private frame = 0;
  private observer?:ResizeObserver;
  private angle = .73;
  private elevation = .94;
  private radius = 17;
  private dragging = false;
  private pointer = {x:0,y:0};
  private moved = false;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private selectable:THREE.Object3D[]=[];
  private lights = new Map<string,THREE.PointLight>();
  private glow = new Map<string,THREE.Mesh>();
  private _hass?:Hass;
  private roomMap:Room[] = [
    {name:'Wohnzimmer',x:1.5,z:0.6,w:5.0,d:3.8,color:0x62564f},
    {name:'Küche',x:-2.8,z:0.6,w:3.4,d:3.8,color:0x696159},
    {name:'Schlafzimmer',x:1.5,z:-3.1,w:5.0,d:3.2,color:0x58515a},
    {name:'Badezimmer',x:-2.8,z:-3.1,w:3.4,d:3.2,color:0x626c6e},
    {name:'Flur',x:-.7,z:-1.2,w:1.3,d:1.1,color:0x756a5c}
  ];
  static get observedAttributes(){return ['sofalicht','tischlicht'];}
  set hass(value:Hass|undefined){this._hass=value;this.updateLights();}
  get hass(){return this._hass;}
  constructor(){super();this.attachShadow({mode:'open'});}
  connectedCallback(){
    if(this.renderer)return;
    this.shadowRoot!.innerHTML=`<style>
      :host{display:block;position:relative;width:100%;height:clamp(340px,45vw,560px);overflow:hidden;border-radius:22px;background:radial-gradient(ellipse at 55% 35%,#34302e 0%,#1b1b20 62%,#121317 100%);color:#eee;font:500 12px system-ui}
      .stage{position:absolute;inset:0;touch-action:none;cursor:grab}.stage:active{cursor:grabbing}
      .toolbar{position:absolute;right:15px;bottom:15px;display:flex;gap:7px;z-index:2}
      button{border:1px solid #ffffff33;border-radius:10px;background:#16181dcc;color:#eee;padding:9px 12px;font:inherit;cursor:pointer;backdrop-filter:blur(12px)}button:hover{background:#343741}
      .label{position:absolute;left:18px;top:17px;pointer-events:none;z-index:2}.label b{display:block;font-size:15px}.label span{color:#d1c6b9}
      .hint{position:absolute;left:18px;bottom:18px;color:#d1c6b9aa;pointer-events:none;font-size:11px}
      @media(max-width:540px){.hint{display:none}.toolbar{right:9px;bottom:9px}}
    </style><div class="stage"></div><div class="label"><b>Living Spaces · 3D</b><span>Apartment Concept · Prototype</span></div><div class="hint">Ziehen: drehen · Scrollen: zoomen · Raum anklicken: öffnen</div><div class="toolbar"><button data-zoom="in" title="Vergrößern">＋</button><button data-zoom="out" title="Verkleinern">－</button><button data-reset title="Ansicht zurücksetzen">↺</button></div>`;
    this.stage=this.shadowRoot!.querySelector('.stage')!;
    this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'default'});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.55;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.stage.append(this.renderer.domElement);
    this.scene.add(new THREE.AmbientLight(0xffffff,1.65));
    const sun=new THREE.DirectionalLight(0xffead1,2.3);sun.position.set(-5,11,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;this.scene.add(sun);
    const fill=new THREE.DirectionalLight(0xc3d4ff,1);fill.position.set(7,5,-8);this.scene.add(fill);
    this.buildApartment();this.updateCamera();this.updateLights();
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this);
    this.stage.addEventListener('pointerdown',this.down);
    this.stage.addEventListener('pointermove',this.move);
    this.stage.addEventListener('pointerup',this.up);
    this.stage.addEventListener('pointercancel',this.up);
    this.stage.addEventListener('wheel',this.wheel,{passive:false});
    this.shadowRoot!.querySelector('[data-zoom="in"]')!.addEventListener('click',()=>this.zoom(-1));
    this.shadowRoot!.querySelector('[data-zoom="out"]')!.addEventListener('click',()=>this.zoom(1));
    this.shadowRoot!.querySelector('[data-reset]')!.addEventListener('click',()=>{this.angle=.73;this.elevation=.94;this.radius=17;this.updateCamera()});
    this.loop();
  }
  disconnectedCallback(){cancelAnimationFrame(this.frame);this.observer?.disconnect();this.stage.removeEventListener('pointerdown',this.down);this.stage.removeEventListener('pointermove',this.move);this.stage.removeEventListener('pointerup',this.up);this.stage.removeEventListener('pointercancel',this.up);this.stage.removeEventListener('wheel',this.wheel);this.scene.traverse(obj=>{const m=obj as THREE.Mesh;if(m.geometry)m.geometry.dispose();if(m.material){const mats=Array.isArray(m.material)?m.material:[m.material];mats.forEach(x=>x.dispose());}});this.renderer?.dispose();this.renderer?.domElement.remove();this.renderer=undefined;}
  private material(hex:number,roughness=.82){return new THREE.MeshStandardMaterial({color:hex,roughness,metalness:.06});}
  private box(x:number,y:number,z:number,w:number,h:number,d:number,color:number,room?:string){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),this.material(color));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;if(room){mesh.userData.room=room;this.selectable.push(mesh);}this.scene.add(mesh);return mesh;}
  private buildApartment(){
    this.box(-.55,-.24,-1.2,9.8,.34,8.5,0x39383b);
    this.box(-.55,-.39,-1.2,10.0,.16,8.7,0x1d1d22);
    for(const r of this.roomMap){
      this.box(r.x,-.055,r.z,r.w,.11,r.d,r.color,r.name);
      const wall=0xaaa49c;
      // Low cutaway walls, allowing inspection from any angle.
      this.box(r.x-r.w/2,.43,r.z,.105,.95,r.d,wall,r.name);
      this.box(r.x,.43,r.z-r.d/2,r.w,.95,.105,wall,r.name);
      this.box(r.x+r.w/2,.19,r.z,.09,.47,r.d,0x847e78,r.name);
      const lamp=new THREE.PointLight(0xffb96d,0,4.2,2);lamp.position.set(r.x,1.45,r.z);this.scene.add(lamp);this.lights.set(r.name,lamp);
      const shade=new THREE.Mesh(new THREE.SphereGeometry(.13,12,8),this.material(0x272830));shade.position.set(r.x,1.4,r.z);this.scene.add(shade);
    }
    // Wohnzimmer: graphite sofa, coffee table, TV console and wall-mounted TV.
    this.box(1.0,.31,1.8,2.4,.5,.85,0x2a2b32,'Wohnzimmer');
    this.box(1.0,.65,2.12,2.4,.55,.18,0x34343b,'Wohnzimmer');
    this.box(1.0,.24,.45,1.2,.15,.65,0x6b4c39,'Wohnzimmer');
    this.box(2.9,.24,-.68,1.45,.38,.32,0x49372f,'Wohnzimmer');
    this.box(2.9,.77,-.83,1.35,.77,.09,0x181b23,'Wohnzimmer');
    const sofaGlow=new THREE.Mesh(new THREE.PlaneGeometry(2.8,.5),new THREE.MeshBasicMaterial({color:0xffba6a,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));sofaGlow.position.set(1,.43,2.27);this.scene.add(sofaGlow);this.glow.set('sofa',sofaGlow);
    // Kitchen: minimalist counter, island, hob.
    this.box(-3.2,.4,-.52,2.6,.8,.62,0xd6cab7,'Küche');
    this.box(-2.5,.41,1.0,1.5,.82,.82,0x86786a,'Küche');
    this.box(-2.5,.85,1,1.55,.07,.9,0xe0d6c7,'Küche');
    for(let i=0;i<4;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.11,.014,6,24),this.material(0x25272c));ring.rotation.x=-Math.PI/2;ring.position.set(-2.9+(i%2)*.35,.89,.82+Math.floor(i/2)*.35);this.scene.add(ring);}
    // Bedroom: bed, pillows and side tables.
    this.box(1.4,.23,-3.25,2.1,.4,1.65,0x4a3e3a,'Schlafzimmer');
    this.box(1.4,.48,-3.25,1.98,.15,1.55,0xccc0b1,'Schlafzimmer');
    this.box(.85,.58,-3.8,.62,.12,.35,0xe9dfcf,'Schlafzimmer');this.box(1.9,.58,-3.8,.62,.12,.35,0xe9dfcf,'Schlafzimmer');
    // Bathroom: freestanding bathtub.
    this.box(-2.85,.36,-3.25,1.8,.65,.87,0xd2d4d1,'Badezimmer');
    this.box(-2.85,.69,-3.25,1.52,.06,.61,0x8ca5aa,'Badezimmer');
    // Plants and subtle architectural details.
    for(const [x,z] of [[3.35,1.7],[-4.0,-.4]]){this.box(x,.17,z,.36,.34,.36,0x554338);const crown=new THREE.Mesh(new THREE.SphereGeometry(.34,10,8),this.material(0x56654c));crown.position.set(x,.66,z);crown.castShadow=true;this.scene.add(crown);}
  }
  private updateLights(){if(!this.lights.size)return;const states=this._hass?.states||{};const any=(names:string[])=>Object.entries(states).some(([id,s])=>id.startsWith('light.')&&names.some(n=>id.toLowerCase().includes(n))&&s.state==='on');
    const sofa=this.getAttribute('sofalicht');const table=this.getAttribute('tischlicht');
    const onSofa=sofa?states[sofa]?.state==='on':any(['sofalicht','sofa_licht']);
    const onTable=table?states[table]?.state==='on':any(['tischlicht','tisch_licht']);
    for(const [name,light] of this.lights){const on=name==='Wohnzimmer'?(onSofa||onTable):false;light.intensity=on?2.7:0;}
    const glow=this.glow.get('sofa');if(glow){(glow.material as THREE.MeshBasicMaterial).opacity=onSofa?.36:0;}
  }
  private updateCamera(){const t=new THREE.Vector3(-.4,0,-1.1);this.camera.position.set(t.x+this.radius*Math.sin(this.elevation)*Math.cos(this.angle),this.radius*Math.cos(this.elevation),t.z+this.radius*Math.sin(this.elevation)*Math.sin(this.angle));this.camera.lookAt(t);}
  private resize(){if(!this.renderer)return;const w=this.stage.clientWidth,h=this.stage.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
  private loop=()=>{if(!this.renderer)return;this.frame=requestAnimationFrame(this.loop);this.renderer.render(this.scene,this.camera);};
  private down=(e:PointerEvent)=>{this.dragging=true;this.moved=false;this.pointer={x:e.clientX,y:e.clientY};this.stage.setPointerCapture(e.pointerId);};
  private move=(e:PointerEvent)=>{if(!this.dragging)return;const dx=e.clientX-this.pointer.x,dy=e.clientY-this.pointer.y;if(Math.abs(dx)+Math.abs(dy)>2)this.moved=true;this.angle-=dx*.007;this.elevation=THREE.MathUtils.clamp(this.elevation+dy*.006,.28,1.48);this.pointer={x:e.clientX,y:e.clientY};this.updateCamera();};
  private up=(e:PointerEvent)=>{if(!this.dragging)return;this.dragging=false;if(!this.moved)this.pick(e);};
  private pick(e:PointerEvent){if(!this.renderer)return;const r=this.renderer.domElement.getBoundingClientRect();this.mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);this.raycaster.setFromCamera(this.mouse,this.camera);const hits=this.raycaster.intersectObjects(this.selectable,false);const name=hits[0]?.object.userData.room;if(name)this.dispatchEvent(new CustomEvent('room-selected',{detail:{room:name},bubbles:true,composed:true}));}
  private wheel=(e:WheelEvent)=>{e.preventDefault();this.radius=THREE.MathUtils.clamp(this.radius+e.deltaY*.012,7,28);this.updateCamera();};
  private zoom(direction:number){this.radius=THREE.MathUtils.clamp(this.radius+direction*1.5,7,28);this.updateCamera();}
}
if(!customElements.get('controlroom-apartment-3d'))customElements.define('controlroom-apartment-3d',ControlRoomApartment3D);
