/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class ControlRoomDashboardStrategy extends HTMLElement {
    static getCreateSuggestions() {
        return {
            title: "ControlRoom",
            icon: "mdi:home-automation"
        };
    }
    static async generate(config, _hass) {
        return {
            title: config.title || "ControlRoom",
            views: [
                {
                    title: "ControlRoom",
                    path: "home",
                    type: "panel",
                    icon: "mdi:home-automation",
                    cards: [
                        {
                            type: "custom:controlroom-dashboard"
                        }
                    ]
                }
            ]
        };
    }
}
ControlRoomDashboardStrategy.noEditor = true;
if (!customElements.get("ll-strategy-dashboard-controlroom")) {
    customElements.define("ll-strategy-dashboard-controlroom", ControlRoomDashboardStrategy);
}
window.customStrategies = window.customStrategies || [];
if (!window.customStrategies.some((strategy) => strategy.type === "controlroom")) {
    window.customStrategies.push({
        type: "controlroom",
        strategyType: "dashboard",
        name: "ControlRoom Dashboard",
        description: "Premium intelligent smart home dashboard with automatic Home Assistant integration.",
        documentationURL: "https://github.com/thaianyboas/controlroom-dashboard"
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const translations = {
    en: {
        home: "Home",
        rooms: "Rooms",
        devices: "Devices",
        energy: "Energy",
        security: "Security",
        cameras: "Cameras",
        media: "Media",
        automation: "Automation",
        calendar: "Calendar",
        settings: "Settings",
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        subtitle: "Your intelligent home, beautifully connected.",
        connected: "Home Assistant connected",
        waiting: "Waiting for Home Assistant",
        homeLabel: "Your home",
        people: "People",
        peopleEmpty: "No people registered yet",
        atHome: "Home",
        away: "Away",
        locationUnknown: "Location unknown",
        peopleCount: "people",
        lights: "Lights",
        allLights: "All lights",
        allOn: "All on",
        allOff: "All off",
        brightness: "Brightness",
        lighting: "Lighting",
        allRooms: "All rooms",
        unassigned: "Unassigned",
        groups: "Groups",
        groupsLater: "Group creation in Home Assistant is coming next.",
        lightDetails: "Select a light to adjust it",
        lightsOn: "on",
        lightsOff: "off",
        noLights: "No lights found",
        lightUnavailable: "Unavailable",
        toggleLight: "Toggle light",
        lightActionError: "Could not control the light",
        climate: "Climate",
        comingSoon: "This section is being prepared.",
        brandSubtitle: "Home Assistant",
        online: "Connected",
        offline: "Waiting",
        navigation: "Navigation",
        menu: "Open menu",
        weatherUnavailable: "Weather unavailable",
        clearNight: "Clear night",
        cloudy: "Cloudy",
        exceptional: "Exceptional",
        fog: "Foggy",
        hail: "Hail",
        lightning: "Thunderstorm",
        lightningRainy: "Thunderstorm with rain",
        partlycloudy: "Partly cloudy",
        pouring: "Pouring rain",
        rainy: "Rainy",
        snowy: "Snowy",
        snowyRainy: "Snow and rain",
        sunny: "Sunny",
        windy: "Windy",
        windyVariant: "Windy and cloudy"
    },
    de: {
        home: "Startseite",
        rooms: "Räume",
        devices: "Geräte",
        energy: "Energie",
        security: "Sicherheit",
        cameras: "Kameras",
        media: "Medien",
        automation: "Automatisierung",
        calendar: "Kalender",
        settings: "Einstellungen",
        morning: "Guten Morgen",
        afternoon: "Guten Tag",
        evening: "Guten Abend",
        subtitle: "Dein intelligentes Zuhause. Alles verbunden.",
        connected: "Mit Home Assistant verbunden",
        waiting: "Warte auf Home Assistant",
        homeLabel: "Dein Zuhause",
        people: "Personen",
        peopleEmpty: "Noch keine Personen registriert",
        atHome: "Zuhause",
        away: "Abwesend",
        locationUnknown: "Standort unbekannt",
        peopleCount: "Personen",
        lights: "Lichter",
        allLights: "Alle Lichter",
        allOn: "Alle an",
        allOff: "Alle aus",
        brightness: "Helligkeit",
        lighting: "Beleuchtung",
        allRooms: "Alle Räume",
        unassigned: "Ohne Raum",
        groups: "Gruppen",
        groupsLater: "Gruppen im Home Assistant erstellen: nächster Schritt.",
        lightDetails: "Licht auswählen und einstellen",
        lightsOn: "an",
        lightsOff: "aus",
        noLights: "Keine Lichter gefunden",
        lightUnavailable: "Nicht verfügbar",
        toggleLight: "Licht schalten",
        lightActionError: "Licht konnte nicht geschaltet werden",
        climate: "Klima",
        comingSoon: "Dieser Bereich wird vorbereitet.",
        brandSubtitle: "Home Assistant",
        online: "Verbunden",
        offline: "Warten",
        navigation: "Bereiche",
        menu: "Menü öffnen",
        weatherUnavailable: "Wetter nicht verfügbar",
        clearNight: "Klare Nacht",
        cloudy: "Bewölkt",
        exceptional: "Extremwetter",
        fog: "Nebelig",
        hail: "Hagel",
        lightning: "Gewitter",
        lightningRainy: "Gewitter mit Regen",
        partlycloudy: "Teilweise bewölkt",
        pouring: "Starkregen",
        rainy: "Regnerisch",
        snowy: "Schnee",
        snowyRainy: "Schneeregen",
        sunny: "Sonnig",
        windy: "Windig",
        windyVariant: "Windig und bewölkt"
    },
    pt: {
        home: "Início",
        rooms: "Ambientes",
        devices: "Dispositivos",
        energy: "Energia",
        security: "Segurança",
        cameras: "Câmeras",
        media: "Mídia",
        automation: "Automação",
        calendar: "Agenda",
        settings: "Configurações",
        morning: "Bom dia",
        afternoon: "Boa tarde",
        evening: "Boa noite",
        subtitle: "Sua casa inteligente, perfeitamente conectada.",
        connected: "Conectado ao Home Assistant",
        waiting: "Aguardando o Home Assistant",
        homeLabel: "Sua casa",
        people: "Pessoas",
        peopleEmpty: "Nenhuma pessoa cadastrada",
        atHome: "Em casa",
        away: "Ausente",
        locationUnknown: "Localização desconhecida",
        peopleCount: "pessoas",
        lights: "Luzes",
        allLights: "Todas as luzes",
        allOn: "Ligar todas",
        allOff: "Desligar todas",
        brightness: "Brilho",
        lighting: "Iluminação",
        allRooms: "Todos os ambientes",
        unassigned: "Sem ambiente",
        groups: "Grupos",
        groupsLater: "Criação de grupos no Home Assistant: próxima etapa.",
        lightDetails: "Selecione uma luz para ajustar",
        lightsOn: "acesas",
        lightsOff: "apagadas",
        noLights: "Nenhuma luz encontrada",
        lightUnavailable: "Indisponível",
        toggleLight: "Alternar luz",
        lightActionError: "Não foi possível controlar a luz",
        climate: "Climatização",
        comingSoon: "Estamos preparando esta seção.",
        brandSubtitle: "Home Assistant",
        online: "Conectado",
        offline: "Aguardando",
        navigation: "Navegação",
        menu: "Abrir menu",
        weatherUnavailable: "Tempo indisponível",
        clearNight: "Noite limpa",
        cloudy: "Nublado",
        exceptional: "Tempo extremo",
        fog: "Neblina",
        hail: "Granizo",
        lightning: "Tempestade",
        lightningRainy: "Tempestade com chuva",
        partlycloudy: "Parcialmente nublado",
        pouring: "Chuva forte",
        rainy: "Chuvoso",
        snowy: "Nevando",
        snowyRainy: "Neve e chuva",
        sunny: "Ensolarado",
        windy: "Ventando",
        windyVariant: "Ventando e nublado"
    }
};
const pages = [
    { id: "home", icon: "mdi:home-variant" },
    { id: "rooms", icon: "mdi:floor-plan" },
    { id: "devices", icon: "mdi:devices" },
    { id: "energy", icon: "mdi:lightning-bolt-outline" },
    { id: "security", icon: "mdi:shield-check-outline" },
    { id: "cameras", icon: "mdi:cctv" },
    { id: "media", icon: "mdi:play-box-outline" },
    { id: "automation", icon: "mdi:creation" },
    { id: "calendar", icon: "mdi:calendar-month-outline" },
    { id: "settings", icon: "mdi:cog-outline" }
];
const weatherIcons = {
    "clear-night": "mdi:weather-night",
    cloudy: "mdi:weather-cloudy",
    exceptional: "mdi:alert-circle-outline",
    fog: "mdi:weather-fog",
    hail: "mdi:weather-hail",
    lightning: "mdi:weather-lightning",
    "lightning-rainy": "mdi:weather-lightning-rainy",
    partlycloudy: "mdi:weather-partly-cloudy",
    pouring: "mdi:weather-pouring",
    rainy: "mdi:weather-rainy",
    snowy: "mdi:weather-snowy",
    "snowy-rainy": "mdi:weather-snowy-rainy",
    sunny: "mdi:weather-sunny",
    windy: "mdi:weather-windy",
    "windy-variant": "mdi:weather-windy-variant"
};
const weatherKeys = {
    "clear-night": "clearNight",
    cloudy: "cloudy",
    exceptional: "exceptional",
    fog: "fog",
    hail: "hail",
    lightning: "lightning",
    "lightning-rainy": "lightningRainy",
    partlycloudy: "partlycloudy",
    pouring: "pouring",
    rainy: "rainy",
    snowy: "snowy",
    "snowy-rainy": "snowyRainy",
    sunny: "sunny",
    windy: "windy",
    "windy-variant": "windyVariant"
};
// V40: independent transparent miniature objects; no fixed background or baked-in illumination.
const LIGHT_ROOM_TRANSPARENT = {
    'badezimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik00MCA2MmgxNjB2NDJxMCAxMy0xNyAxM0g1OHEtMTggMC0xOC0xM1oiIGZpbGw9InVybCgjd2hpdGUpIiBzdHJva2U9IiM3Yzg5ODYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik00MCA2NnE4MCAxMSAxNjAgMCIgc3Ryb2tlPSIjZmFmOGVmIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNDggNTloMTQ0IiBzdHJva2U9IiNlOGVlZTgiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTcyIDU2VjM1cTAtOSAxMC05aDEzIiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWI4YjMiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTk1IDI2djgiIHN0cm9rZT0iI2FhYjhiMyIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTk0IDM0aDE0IiBzdHJva2U9IiM5YmFiYTYiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik01OSAxMTd2N20xMjEtN3Y3IiBzdHJva2U9IiM4ZTlkOTgiIHN0cm9rZS13aWR0aD0iNyIvPjxlbGxpcHNlIGN4PSIxMTkiIGN5PSI2MiIgcng9IjY0IiByeT0iNyIgZmlsbD0iI2I3YzZiZSIgb3BhY2l0eT0iLjY1Ii8+PC9zdmc+',
    'kuche': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPgo8ZWxsaXBzZSBjeD0iMTE5IiBjeT0iMTMyIiByeD0iMTA0IiByeT0iOCIgZmlsbD0iIzA3MTMxYiIgb3BhY2l0eT0iLjIiLz4KPCEtLSBzdGFuZGFsb25lIG1vZGVybiBjcmVhbSBraXRjaGVuIGNvdW50ZXIgd2l0aCB3b29kIHRvcCwgZnJvbnQgb3ZlbiAtLT4KPHBhdGggZD0iTTM0IDYyIDEzNSA0MCAyMDcgNjQgMTA2IDg4WiIgZmlsbD0iI2I3ODA0ZiIgc3Ryb2tlPSIjZDZhNzdjIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTM0IDYyIDEwNiA4OHYzOUwzNCAxMDFaIiBmaWxsPSIjZTVlNGRiIiBzdHJva2U9IiNiNmJlYjUiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0xMDYgODggMjA3IDY0djM5bC0xMDEgMjRaIiBmaWxsPSIjZDVkOGQwIiBzdHJva2U9IiNhOWIzYWEiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0zNSA2NiAxMDUgOTIiIHN0cm9rZT0iI2Y4ZjNlNiIgc3Ryb2tlLXdpZHRoPSIzIi8+CjwhLS0gY2FiaW5ldCBwYW5lbHMgLS0+CjxwYXRoIGQ9Ik00NSA3NXYyOW0xOC0yMnYyOG0xOC0yMXYyNyIgc3Ryb2tlPSIjYzNjOWMxIiBzdHJva2Utd2lkdGg9IjIiLz4KPCEtLSBvdmVuIGZyb250IGZhY2luZyB2aWV3ZXIgb24gbG9uZyByaWdodCBzaWRlIC0tPgo8cGF0aCBkPSJNMTIxIDg5IDE3MyA3NnYzOWwtNTIgMTJaIiBmaWxsPSIjM2M0NDQ1IiBzdHJva2U9IiM5YmE4YTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTI3IDk2IDE2NiA4NnYyNGwtMzkgMTBaIiBmaWxsPSIjMTcxZTIxIiBzdHJva2U9IiM2ZjgwN2UiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTI5IDk5IDE2NCA5MHYxNmwtMzUgOVoiIGZpbGw9IiMzNDNlNDAiLz4KPHBhdGggZD0iTTEyNyA5MyAxNjYgODMiIHN0cm9rZT0iI2I2YzFiOSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE4MCIgY3k9IjgxIiByPSIyIiBmaWxsPSIjNTk2MzVlIi8+PGNpcmNsZSBjeD0iMTg4IiBjeT0iNzkiIHI9IjIiIGZpbGw9IiM1OTYzNWUiLz4KPCEtLSBmb3VyIGRhcmsgaW5kdWN0aW9uIHpvbmVzIGluIHBlcnNwZWN0aXZlIC0tPgo8cGF0aCBkPSJNOTUgNjAgMTQ0IDQ5bDM3IDEzLTQ4IDEzWiIgZmlsbD0iIzIzMmIyYyIgc3Ryb2tlPSIjNjM3MTZiIiBzdHJva2Utd2lkdGg9IjIiLz4KPGVsbGlwc2UgY3g9IjExNyIgY3k9IjYwIiByeD0iOSIgcnk9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhkOTk5MCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48ZWxsaXBzZSBjeD0iMTQzIiBjeT0iNTUiIHJ4PSI4IiByeT0iMy41IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ZDk5OTAiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGVsbGlwc2UgY3g9IjE1MSIgY3k9IjY1IiByeD0iOSIgcnk9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhkOTk5MCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48ZWxsaXBzZSBjeD0iMTI2IiBjeT0iNzAiIHJ4PSI4IiByeT0iMy41IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ZDk5OTAiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjwhLS0gc2F1Y2VwYW4gd2l0aCBoYW5kbGVzIC0tPgo8ZWxsaXBzZSBjeD0iMTMzIiBjeT0iNDkiIHJ4PSIxMyIgcnk9IjYiIGZpbGw9IiNjNmNmY2EiIHN0cm9rZT0iIzdlOGI4NCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMTIwIDQ5djlxMTMgOCAyNiAwdi05IiBmaWxsPSIjOWZhZWFhIiBzdHJva2U9IiM3ODg3ODAiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGVsbGlwc2UgY3g9IjEzMyIgY3k9IjQ5IiByeD0iMTIiIHJ5PSI0IiBmaWxsPSIjZDZkZGQ3Ii8+PHBhdGggZD0iTTEyMSA1MiAxMTQgNTBtMzEgMiA4LTIiIHN0cm9rZT0iI2E5YjZiMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTMyIDQ1di0zIiBzdHJva2U9IiM1ODY3NjEiIHN0cm9rZS13aWR0aD0iMiIvPgo8IS0tIGtuaWZlIGJsb2NrIGFuZCB3b29kZW4gc3Bvb25zIC0tPgo8cGF0aCBkPSJNNTUgNTQgNzIgNTBsOSA3LTE3IDVaIiBmaWxsPSIjOWI2YTQ2Ii8+PHBhdGggZD0iTTYzIDU0IDYwIDMybTcgMjEgMS0yNW0zIDI0IDgtMjMiIHN0cm9rZT0iI2JjYTc4NiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjAgMzNxLTQtNy0zLTEwbTExIDYtMi04bTEzIDggNS05IiBzdHJva2U9IiNiN2MwYjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjwhLS0gc21hbGwgY3V0dGluZyBib2FyZCAtLT4KPHBhdGggZD0iTTQ0IDYzIDY5IDU4bDExIDUtMjUgNloiIGZpbGw9IiNlMmI3N2QiIHN0cm9rZT0iI2JiODk1OSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==',
    'schlafzimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjUyIiB5PSI1NCIgd2lkdGg9IjEzNSIgaGVpZ2h0PSI0NSIgcng9IjExIiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHBvbHlnb24gcG9pbnRzPSIzOCw4NyAxNzYsODcgMTk5LDEwOSA2MSwxMDkiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwb2x5Z29uIHBvaW50cz0iNjEsMTA5IDE5OSwxMDkgMTk0LDEyNyA1NywxMjciIGZpbGw9IiMyYjM0MzAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHJlY3QgeD0iNjkiIHk9Ijc4IiB3aWR0aD0iNDgiIGhlaWdodD0iMTciIHJ4PSI2IiBmaWxsPSIjZTBkN2M4IiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMjMiIHk9Ijc4IiB3aWR0aD0iNDciIGhlaWdodD0iMTciIHJ4PSI2IiBmaWxsPSIjZDVjOGI3IiBzdHJva2U9Im5vbmUiLz48cG9seWdvbiBwb2ludHM9IjU2LDk4IDE4Myw5OCAxOTUsMTEzIDY3LDExMyIgZmlsbD0iIzljOTI4NiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjY3LDExMyAxOTUsMTEzIDE5MSwxMjQgNjMsMTI0IiBmaWxsPSIjNjU1ZjVhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxyZWN0IHg9IjE4IiB5PSI5MiIgd2lkdGg9IjI5IiBoZWlnaHQ9IjI1IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTk5IiB5PSI5MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI1IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTMxIDU4TDMxIDg4IiBzdHJva2U9IiNhNmE1YTAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBvbHlnb24gcG9pbnRzPSIxNyw1OCA0NSw1OCAzOSw3MCAyMyw3MCIgZmlsbD0idXJsKCNtZXRhbCkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIxMSA2MUwyMTEgODkiIHN0cm9rZT0iI2E2YTVhMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjE5OCw2MCAyMjQsNjAgMjE5LDcxIDIwNCw3MSIgZmlsbD0idXJsKCNtZXRhbCkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+',
    'wohnzimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjQyIiB5PSI1MyIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI1MSIgcng9IjE0IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMjkiIHk9Ijc2IiB3aWR0aD0iMjkiIGhlaWdodD0iNDMiIHJ4PSI5IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTY5IiB5PSI3NiIgd2lkdGg9IjI5IiBoZWlnaHQ9IjQzIiByeD0iOSIgZmlsbD0idXJsKCNjbG90aCkiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjU3IiB5PSI4NCIgd2lkdGg9IjUzIiBoZWlnaHQ9IjI3IiByeD0iNyIgZmlsbD0iIzY0NzI2YSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE2IiB5PSI4NCIgd2lkdGg9IjUxIiBoZWlnaHQ9IjI3IiByeD0iNyIgZmlsbD0iIzY0NzI2YSIgc3Ryb2tlPSJub25lIi8+PHBvbHlnb24gcG9pbnRzPSI0MywxMDcgMTg0LDEwNyAxNzcsMTI1IDQ5LDEyNSIgZmlsbD0iIzMzM2MzNyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjkyLDExMyAxNjAsMTEzIDE3MiwxMjEgMTA0LDEyMSIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSIxMDUiIHk9IjEyMCIgd2lkdGg9IjY1IiBoZWlnaHQ9IjkiIHJ4PSIyIiBmaWxsPSIjNGEzODJlIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTEzIDEyOUwxMTMgMTM1IiBzdHJva2U9IiM1NTUyNGEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTE2MiAxMjlMMTYyIDEzNSIgc3Ryb2tlPSIjNTU1MjRhIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMTEgMzlMMjExIDExNyIgc3Ryb2tlPSIjYTJhNmExIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwb2x5Z29uIHBvaW50cz0iMTkyLDM4IDIyOSwzOCAyMjIsNTggMTk5LDU4IiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZWxsaXBzZSBjeD0iMjExIiBjeT0iMTE3IiByeD0iMTUiIHJ5PSI0IiBmaWxsPSIjM2Q0NTQyIi8+PC9zdmc+',
    'esszimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxwb2x5Z29uIHBvaW50cz0iNTcsODEgMTc0LDgxIDE5NSw5NyA3Nyw5NyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9Ijc3LDk3IDE5NSw5NyAxOTEsMTA0IDc0LDEwNCIgZmlsbD0iIzRiMzMyNyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODcgMTAzTDgzIDEzMiIgc3Ryb2tlPSIjNmU1OTQ0IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xODIgMTAzTDE4NSAxMzIiIHN0cm9rZT0iIzZlNTk0NCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI0NCIgeT0iNzciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgcng9IjQiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNDcgOThMNDQgMTMyIiBzdHJva2U9IiM2MjYzNWIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTY0IDk4TDY4IDEzMiIgc3Ryb2tlPSIjNjI2MzViIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjE4NSIgeT0iNzUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgcng9IjQiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTg4IDk2TDE4NSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjA1IDk2TDIwOSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI3NiIgeT0iMTExIiB3aWR0aD0iMjQiIGhlaWdodD0iMjMiIHJ4PSI0IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTc5IDEzMkw3NiAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNOTYgMTMyTDEwMCAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNTkiIHk9IjExMiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIzIiByeD0iNCIgZmlsbD0idXJsKCNjbG90aCkiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xNjIgMTMzTDE1OSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTc5IDEzM0wxODMgMTMyIiBzdHJva2U9IiM2MjYzNWIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTEyNCAxMEwxMjQgNDgiIHN0cm9rZT0iIzlhOWY5YyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cG9seWdvbiBwb2ludHM9Ijk5LDQ3IDE0OSw0NyAxMzksNjUgMTEwLDY1IiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZWxsaXBzZSBjeD0iMTI0IiBjeT0iNjYiIHJ4PSIxMyIgcnk9IjMiIGZpbGw9IiM0NTRiNDgiLz48L3N2Zz4=',
    'flur': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzUiIHJ4PSIxMDUiIHJ5PSI2IiBmaWxsPSIjMTcyMzIxIiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNNDQgMzEgMTAxIDU0djY2bC01NyA5WiIgZmlsbD0iIzliOTU4NyIvPjxwYXRoIGQ9Ik0xOTYgMzEgMTM5IDU0djY2bDU3IDlaIiBmaWxsPSIjYzNiYWFhIi8+PHBhdGggZD0iTTQ0IDMxIDk5IDEyaDQybDU1IDE5LTU3IDIzaC0zOFoiIGZpbGw9IiNlNWRkZDAiLz48cGF0aCBkPSJNNDQgMTI5IDEwMSAxMjBoMzhsNTcgOS03NiAxMFoiIGZpbGw9IiNiNWExOGIiLz48cGF0aCBkPSJNMTAxIDU0aDM4djY2aC0zOFoiIGZpbGw9IiNlMWQ3YzciLz48cGF0aCBkPSJNNTcgNTMgODkgNjR2NDNsLTMyIDhaIiBmaWxsPSIjNTE0NjNmIi8+PHBhdGggZD0iTTYyIDYxIDgzIDY4djMzbC0yMSA1WiIgZmlsbD0iIzhjNzA1YSIvPjxjaXJjbGUgY3g9Ijc5IiBjeT0iODYiIHI9IjIiIGZpbGw9IiNlYmQ0YTgiLz48cGF0aCBkPSJNMTUxIDY0IDE4MyA1M3Y2MmwtMzItOFoiIGZpbGw9IiM2NTVhNTAiLz48cGF0aCBkPSJNMTU2IDY4IDE3OCA2MXY0NWwtMjItNVoiIGZpbGw9IiNhODhlNzQiLz48Y2lyY2xlIGN4PSIxNjEiIGN5PSI4NiIgcj0iMiIgZmlsbD0iI2YzZGZiYSIvPjxwYXRoIGQ9Ik0xMTUgMTl2MjEiIHN0cm9rZT0iIzg1Nzk2YiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEwNCA0MHExMS0yMCAyMiAwWiIgZmlsbD0iIzM2M2Y0MiIvPjxlbGxpcHNlIGN4PSIxMTUiIGN5PSI0MCIgcng9IjkiIHJ5PSIzIiBmaWxsPSIjZTdjODhmIi8+PHBhdGggZD0iTTEwNCAxMTVoMzJtLTI3IDZoMjIiIHN0cm9rZT0iI2VlZTJjOSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTU5IDExOWgyOCIgc3Ryb2tlPSIjZWRlMmNlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTUzIDExOWgyNyIgc3Ryb2tlPSIjZWRlMmNlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
    'balkon': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik0yOCAxMDEgMTI0IDc3bDkwIDI1LTkzIDI1WiIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSIjYTQ4YzZjIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjggMTAxVjQwbTkzIDg3VjUwbTkzIDUyVjQwIiBzdHJva2U9IiNhYWI3YjMiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yOCA0MmgxODYiIHN0cm9rZT0iI2I5YzhjNSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTMwIDQ3aDE4MXY0OWwtOTAtMjAtOTEgMjBaIiBmaWxsPSIjODViNGI2IiBmaWxsLW9wYWNpdHk9Ii4xNiIgc3Ryb2tlPSIjODI5ZTllIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNzYgNDZ2NDJtODktNDJ2NDIiIHN0cm9rZT0iIzk0YWZhZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTczIDg5bC00LTI2cS0zLTEzIDExLTEzaDIwcTEyIDAgMTIgMTNsLTQgMjZaIiBmaWxsPSJ1cmwoI3NhZ2UpIi8+PHBhdGggZD0iTTgwIDg4IDcyIDExMG0zMi0yMiA3IDIyIiBzdHJva2U9IiNhYWEyOWEiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNDMgODRsLTUtMjFxLTMtMTMgMTEtMTNoMThxMTIgMCAxMiAxM2wtNCAyMVoiIGZpbGw9InVybCgjc2FnZSkiLz48cGF0aCBkPSJNMTQ4IDg0bC04IDI0bTI5LTI0IDggMjQiIHN0cm9rZT0iI2FhYTI5YSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PGVsbGlwc2UgY3g9IjEyNCIgY3k9Ijg2IiByeD0iMTYiIHJ5PSI2IiBmaWxsPSJ1cmwoI3doaXRlKSIvPjxwYXRoIGQ9Ik0xMjQgOTB2MjQiIHN0cm9rZT0iIzljOTU4OSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMTgzIiB5PSI4NiIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIxIiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPjxwYXRoIGQ9Ik0xOTIgODRxLTE1LTE5LTktMzBtOSAzMHExNS0yMCAxMy0zMyIgc3Ryb2tlPSIjNjg4NzY1IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
    'controlraum': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjMyIiB5PSIyMCIgd2lkdGg9IjU4IiBoZWlnaHQ9IjEwNiIgcng9IjUiIGZpbGw9IiMzNDNmNDQiIHN0cm9rZT0iIzhjOWI5YyIvPjxyZWN0IHg9Ijk3IiB5PSIzNCIgd2lkdGg9IjU3IiBoZWlnaHQ9IjkyIiByeD0iNCIgZmlsbD0iIzM0NDE0NiIgc3Ryb2tlPSIjOGM5YjljIi8+PHJlY3QgeD0iMTYxIiB5PSI0NyIgd2lkdGg9IjUwIiBoZWlnaHQ9Ijc5IiByeD0iNCIgZmlsbD0iIzQ0NTI1NyIgc3Ryb2tlPSIjOGM5YjljIi8+PHJlY3QgeD0iMzgiIHk9IjMwIiB3aWR0aD0iNDYiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0MiIgeT0iMzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iMzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNTkgMzZMNzkgMzYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIzOCIgeT0iNDQiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSI0OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQ5IiB5PSI0OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik01OSA1MEw3OSA1MCIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjM4IiB5PSI1OCIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iNDIiIHk9IjYyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iNDkiIHk9IjYyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTU5IDY0TDc5IDY0IiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMzgiIHk9IjcyIiB3aWR0aD0iNDYiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0MiIgeT0iNzYiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iNzYiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNTkgNzhMNzkgNzgiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIzOCIgeT0iODYiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSI5MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQ5IiB5PSI5MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik01OSA5Mkw3OSA5MiIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjM4IiB5PSIxMDAiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSIxMDQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iMTA0IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTU5IDEwNkw3OSAxMDYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMDMiIHk9IjQyIiB3aWR0aD0iNDUiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMDciIHk9IjQ2IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE0IiB5PSI0NiIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgNDhMMTQzIDQ4IiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTAzIiB5PSI1NiIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTA3IiB5PSI2MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjExNCIgeT0iNjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTI0IDYyTDE0MyA2MiIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjEwMyIgeT0iNzAiIHdpZHRoPSI0NSIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjEwNyIgeT0iNzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMTQiIHk9Ijc0IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTEyNCA3NkwxNDMgNzYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMDMiIHk9Ijg0IiB3aWR0aD0iNDUiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMDciIHk9Ijg4IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE0IiB5PSI4OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgOTBMMTQzIDkwIiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTAzIiB5PSI5OCIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTA3IiB5PSIxMDIiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMTQiIHk9IjEwMiIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgMTA0TDE0MyAxMDQiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNjciIHk9IjU1IiB3aWR0aD0iMzgiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzEiIHk9IjU5IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTc4IiB5PSI1OSIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xODggNjFMMjAwIDYxIiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTY3IiB5PSI2OSIgd2lkdGg9IjM4IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTcxIiB5PSI3MyIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3OCIgeT0iNzMiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTg4IDc1TDIwMCA3NSIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjE2NyIgeT0iODMiIHdpZHRoPSIzOCIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3MSIgeT0iODciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzgiIHk9Ijg3IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTE4OCA4OUwyMDAgODkiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNjciIHk9Ijk3IiB3aWR0aD0iMzgiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzEiIHk9IjEwMSIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3OCIgeT0iMTAxIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTE4OCAxMDNMMjAwIDEwMyIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xOSAxMiBWMTExIEgzMCBNMjE1IDE3IFYzOCBIMTg3IFY0NiIgc3Ryb2tlPSIjYjY2ZTU4IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjIzIDEzIFYzMiBIMjAyIFY0NSIgc3Ryb2tlPSIjNjk5Y2I1IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=',
    'generic': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9Ijc3IiB5PSIzNiIgd2lkdGg9Ijg2IiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9InVybCgjbWV0YWwpIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI4NiIgeT0iNDYiIHdpZHRoPSI2OCIgaGVpZ2h0PSI2MSIgcng9IjYiIGZpbGw9IiMyNjM1M2EiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9Ijk2IiB5PSI1NyIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjM0IiByeD0iNCIgZmlsbD0idXJsKCNnbGFzcykiIHN0cm9rZT0ibm9uZSIvPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSI5OCIgcng9IjQiIHJ5PSI0IiBmaWxsPSIjYTZiN2FkIi8+PC9zdmc+',
    'buro': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxyZWN0IHg9IjQxIiB5PSI3MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cGF0aCBkPSJNNDkgODB2MzltMTQzLTM5djM5IiBzdHJva2U9IiM2ODUzNDIiIHN0cm9rZS13aWR0aD0iNyIvPgo8cmVjdCB4PSI4MiIgeT0iMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI1MiIgcng9IjYiIGZpbGw9InVybCgjbWV0YWwpIi8+PHJlY3QgeD0iODkiIHk9IjI3IiB3aWR0aD0iNjYiIGhlaWdodD0iMzciIHJ4PSIzIiBmaWxsPSJ1cmwoI2dsYXNzKSIvPgo8cGF0aCBkPSJNMTE3IDcydjdtLTE3IDBoMzQiIHN0cm9rZT0iIzhiOTk5MiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTcxIDEwOHExLTE5IDE4LTE5aDMycTE1IDAgMTYgMTkiIGZpbGw9InVybCgjZGFyaykiLz48cGF0aCBkPSJNMTA1IDEwOHYxNCIgc3Ryb2tlPSIjNzg4MjdjIiBzdHJva2Utd2lkdGg9IjUiLz4KPHBhdGggZD0iTTE3MCA3MHYtMjVsMTUtMTciIHN0cm9rZT0iI2E5YjFhYSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3MSAyNmgyOGwtNiAxNGgtMThaIiBmaWxsPSJ1cmwoI2RhcmspIi8+CjxyZWN0IHg9IjQ5IiB5PSI1OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0idXJsKCN3aGl0ZSkiLz48L3N2Zz4=',
    'garage': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik0zMSA0OCAxMjAgMTVsODkgMzN2NzRIMzFaIiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSIjOGU5Yzk1IiBzdHJva2Utd2lkdGg9IjMiLz48cmVjdCB4PSI0NCIgeT0iNTAiIHdpZHRoPSIxNTIiIGhlaWdodD0iNjgiIHJ4PSIzIiBmaWxsPSJ1cmwoI2RhcmspIiBzdHJva2U9IiNhMWFiYTQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik00OCA2MGgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDQiIHN0cm9rZT0iIzczODc4MyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTM5IDEyMGgxNjIiIHN0cm9rZT0iIzhkOTg5MiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHJlY3QgeD0iNTUiIHk9IjEwMiIgd2lkdGg9IjE5IiBoZWlnaHQ9IjciIHJ4PSIzIiBmaWxsPSIjZDljNjljIiBvcGFjaXR5PSIuOCIvPjxyZWN0IHg9IjE2NiIgeT0iMTAyIiB3aWR0aD0iMTkiIGhlaWdodD0iNyIgcng9IjMiIGZpbGw9IiNkOWM2OWMiIG9wYWNpdHk9Ii44Ii8+PC9zdmc+',
    'garten': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzMiIHJ4PSI5OSIgcnk9IjciIGZpbGw9IiMyNzNkMzIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0yNSAxMDhRNTYgOTYgOTMgMTA1UTEzNSA5MSAxNjggMTAxUTIwMSAxMDEgMjE5IDExMkwxOTggMTI0UTEzNyAxMzAgNzIgMTI1WiIgZmlsbD0iIzgyOWU3OCIvPjxwYXRoIGQ9Ik0zMiAxMDlRNzMgOTkgMTE2IDEwOVExNjUgMTAwIDIwOSAxMTMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E2Yjk5YSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjcgMTA5VjY1IiBzdHJva2U9IiM3MjU5NDMiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTY3IDg4TDUxIDcyTTY3IDc5TDgzIDYxIiBzdHJva2U9IiM3MjU5NDMiIHN0cm9rZS13aWR0aD0iNSIvPjxjaXJjbGUgY3g9IjUxIiBjeT0iNTMiIHI9IjIzIiBmaWxsPSIjNzE4ZDc3Ii8+PGNpcmNsZSBjeD0iNzUiIGN5PSIzOSIgcj0iMjgiIGZpbGw9IiM5MWE5OGQiLz48Y2lyY2xlIGN4PSI4OSIgY3k9IjU5IiByPSIyMiIgZmlsbD0iIzZlOGM3NiIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iNzIiIHI9IjE4IiBmaWxsPSIjN2U5YzdlIi8+PHBhdGggZD0iTTE2NyAxMDVWNjYiIHN0cm9rZT0iIzc0NWI0NSIgc3Ryb2tlLXdpZHRoPSI4Ii8+PGNpcmNsZSBjeD0iMTUxIiBjeT0iNTMiIHI9IjIzIiBmaWxsPSIjN2M5OTgxIi8+PGNpcmNsZSBjeD0iMTczIiBjeT0iNDEiIHI9IjI2IiBmaWxsPSIjOWNhZjkyIi8+PGNpcmNsZSBjeD0iMTkwIiBjeT0iNjIiIHI9IjIxIiBmaWxsPSIjNmM4Yzc3Ii8+PHBhdGggZD0iTTMyIDExMVEzOSA5MCA0OSA5OE0zNyAxMTVRNDkgOTQgNjEgMTAwTTk5IDExN1ExMDggOTIgMTE3IDEwM00xMTMgMTE3UTEyNSA5NiAxMzcgMTA1TTE5MCAxMTNRMjAwIDkyIDIxMSAxMDIiIHN0cm9rZT0iIzU4N2U2MCIgc3Ryb2tlLXdpZHRoPSI2IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSIxMDkiIGN5PSIxMDgiIHI9IjQiIGZpbGw9IiNkMmExYTEiLz48Y2lyY2xlIGN4PSIxMTkiIGN5PSIxMTAiIHI9IjMiIGZpbGw9IiNlMmM3N2YiLz48Y2lyY2xlIGN4PSIxMzMiIGN5PSIxMTIiIHI9IjMiIGZpbGw9IiNiM2M0YWQiLz48L3N2Zz4=',
    'hobbyraum': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPgo8ZWxsaXBzZSBjeD0iMTIyIiBjeT0iMTI5IiByeD0iMTA0IiByeT0iOSIgZmlsbD0iIzA1MGIxMyIgb3BhY2l0eT0iLjIyIi8+CjwhLS0gd2FybSB3YWxudXQgYmlsbGlhcmRzIHRhYmxlIHdpdGggZ3JlZW4gZmVsdCwgaXNvbWV0cmljIC0tPgo8cGF0aCBkPSJNMjYgNzAgMTYwIDM4IDIxOCA2NSA4NCAxMDNaIiBmaWxsPSIjYTk3NDQyIiBzdHJva2U9IiNkNmEwNjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNDAgNzAgMTU5IDQ2IDIwNCA2NSA4NSA5NVoiIGZpbGw9IiMzNDdhNDIiIHN0cm9rZT0iIzI4NTYzNyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0yNiA3MCA4NCAxMDN2MTNMMjYgODJaIiBmaWxsPSIjNzY1MDM0Ii8+CjxwYXRoIGQ9Ik04NCAxMDMgMjE4IDY1djEzTDg0IDExNloiIGZpbGw9IiM4NjVjMzgiLz4KPHBhdGggZD0iTTM3IDgzdjM4bDEwIDNWODltMTQ2LTh2MzhsLTEwIDNWODVtLTk5IDMwdjE3bDEwIDJ2LTIwIiBmaWxsPSIjNzc1MjM2IiBzdHJva2U9IiM1YzNjMmEiIHN0cm9rZS13aWR0aD0iMSIvPgo8cGF0aCBkPSJNMzQgNzEgMTYwIDQyIiBzdHJva2U9IiNkYmFjNzMiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjciLz4KPCEtLSBwb2NrZXRzIC0tPgo8ZWxsaXBzZSBjeD0iNDAiIGN5PSI3MCIgcng9IjQiIHJ5PSIzIiBmaWxsPSIjMjYzNzJhIi8+PGVsbGlwc2UgY3g9IjE1OSIgY3k9IjQ2IiByeD0iNCIgcnk9IjMiIGZpbGw9IiMyNjM3MmEiLz48ZWxsaXBzZSBjeD0iMjA0IiBjeT0iNjUiIHJ4PSI0IiByeT0iMyIgZmlsbD0iIzI2MzcyYSIvPjxlbGxpcHNlIGN4PSI4NSIgY3k9Ijk1IiByeD0iNCIgcnk9IjMiIGZpbGw9IiMyNjM3MmEiLz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iNTgiIHJ4PSIzLjUiIHJ5PSIyLjUiIGZpbGw9IiMyNjM3MmEiLz48ZWxsaXBzZSBjeD0iMTQ2IiBjeT0iODAiIHJ4PSIzLjUiIHJ5PSIyLjUiIGZpbGw9IiMyNjM3MmEiLz4KPCEtLSBjb2xvcmZ1bCBwb29sIGJhbGxzIC0tPgo8Y2lyY2xlIGN4PSIxMjciIGN5PSI2NiIgcj0iNC40IiBmaWxsPSIjZTZkNWFhIi8+PGNpcmNsZSBjeD0iMTM4IiBjeT0iNzAiIHI9IjQuNCIgZmlsbD0iI2M1NGIzZCIvPjxjaXJjbGUgY3g9IjE0NyIgY3k9IjY1IiByPSI0LjQiIGZpbGw9IiNlOWM4NGMiLz48Y2lyY2xlIGN4PSIxMzciIGN5PSI2MSIgcj0iNC40IiBmaWxsPSIjMmM0MDVkIi8+PGNpcmNsZSBjeD0iMTE0IiBjeT0iNzkiIHI9IjQuMyIgZmlsbD0iI2YyZWNlMCIvPjxjaXJjbGUgY3g9IjEwNSIgY3k9IjcyIiByPSI0IiBmaWxsPSIjN2U0NDY0Ii8+CjwhLS0gY3VlIHN0aWNrcyBsYWlkIGRpYWdvbmFsbHkgYXQgcmVhciAtLT4KPHBhdGggZD0iTTU4IDUwIDE3NCAyNSIgc3Ryb2tlPSIjZDNhNjZlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik02NSA1NCAxODEgMjkiIHN0cm9rZT0iI2QzYTY2ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPCEtLSBoYW5naW5nIHBlbmRhbnRzIC0tPgo8cGF0aCBkPSJNNzIgNXYyNW01MS0yOXYyM201MS0yM3YyMiIgc3Ryb2tlPSIjN2I4MDc4IiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNTggMzBxMTQtMjEgMjggMFoiIGZpbGw9IiMzMDNkM2UiLz48cGF0aCBkPSJNMTA5IDI0cTE0LTIxIDI4IDBaIiBmaWxsPSIjMzAzZDNlIi8+PHBhdGggZD0iTTE2MCAyM3ExNC0yMSAyOCAwWiIgZmlsbD0iIzMwM2QzZSIvPjxlbGxpcHNlIGN4PSI3MiIgY3k9IjMwIiByeD0iMTEiIHJ5PSIyLjgiIGZpbGw9IiNlOGQzYTIiLz48ZWxsaXBzZSBjeD0iMTIzIiBjeT0iMjQiIHJ4PSIxMSIgcnk9IjIuOCIgZmlsbD0iI2U4ZDNhMiIvPjxlbGxpcHNlIGN4PSIxNzQiIGN5PSIyMyIgcng9IjExIiByeT0iMi44IiBmaWxsPSIjZThkM2EyIi8+Cjwvc3ZnPg==',
    'keller': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxyZWN0IHg9IjM2IiB5PSIxOCIgd2lkdGg9IjE2OSIgaGVpZ2h0PSIxMDIiIHJ4PSIzIiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjkzOTAiIHN0cm9rZS13aWR0aD0iNiIvPgo8cGF0aCBkPSJNNDAgNTFoMTYybS0xNjIgMzRoMTYyIiBzdHJva2U9IiM4ODkyOGIiIHN0cm9rZS13aWR0aD0iNiIvPgo8cmVjdCB4PSI0OSIgeT0iMjQiIHdpZHRoPSIzNCIgaGVpZ2h0PSIyNSIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cmVjdCB4PSI5MSIgeT0iMjgiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyMSIgcng9IjIiIGZpbGw9InVybCgjd2hpdGUpIi8+PHJlY3QgeD0iMTI4IiB5PSIyMiIgd2lkdGg9IjU4IiBoZWlnaHQ9IjI3IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPgo8cmVjdCB4PSI0OCIgeT0iNTgiIHdpZHRoPSI0NCIgaGVpZ2h0PSIyNCIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cmVjdCB4PSIxMDAiIHk9IjU2IiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHJ4PSIzIiBmaWxsPSJ1cmwoI21ldGFsKSIvPjxyZWN0IHg9IjEzNCIgeT0iNjAiIHdpZHRoPSI1MSIgaGVpZ2h0PSIyMiIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz4KPHJlY3QgeD0iNTEiIHk9IjkxIiB3aWR0aD0iMzkiIGhlaWdodD0iMjYiIHJ4PSIzIiBmaWxsPSJ1cmwoI3dvb2QpIi8+PHJlY3QgeD0iMTAxIiB5PSI5MyIgd2lkdGg9IjQyIiBoZWlnaHQ9IjI0IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPgo8cGF0aCBkPSJNMTY4IDExNlY5MyIgc3Ryb2tlPSIjODc5NDg4IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMTYwIDk3aDE2bC0zIDE5aC0xMFoiIGZpbGw9InVybCgjbWV0YWwpIi8+PC9zdmc+',
    'pool': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzMiIHJ4PSIxMDQiIHJ5PSI4IiBmaWxsPSIjMzM0YjQ4IiBvcGFjaXR5PSIuMTYiLz48cGF0aCBkPSJNMjUgODkgMTMwIDU1bDkyIDMwLTEwNiAzN1oiIGZpbGw9IiNkNWQzYzgiIHN0cm9rZT0iI2IwYjlhZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTI1IDg5djEzbDkxIDMzdi0xM1oiIGZpbGw9IiM4NzliOTEiLz48cGF0aCBkPSJNMTE2IDEyMnYxM2wxMDYtMzdWODVaIiBmaWxsPSIjNjg3ZTc2Ii8+PHBhdGggZD0iTTQwIDg5IDEzMCA2M2w3NiAyMy05MCAyOVoiIGZpbGw9IiM0NjZlNzMiIHN0cm9rZT0iI2RjZTJkOSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTQ2IDkwcTI1LTggNDQgMCAyNCA4IDQ0LTF0NDMtMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTRjNWMwIiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTU1IDk5cTI1LTkgNDctMXQ0NiAxcTE3LTggMzYtNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODliNGIyIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNNjUgNzlWNDBxMC0xMSAxMS0xMWgxMG0tMjEgMjBoMjEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E3YjZiMSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNODIgMjl2NDMiIHN0cm9rZT0iI2E3YjZiMSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTE3MSA3MVYyOCIgc3Ryb2tlPSIjNzE2OTViIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTU1IDMwcTE2LTI2IDMyIDBaIiBmaWxsPSIjNTE2OTVjIi8+PHBhdGggZD0iTTE3MSA3MWgxNiIgc3Ryb2tlPSIjNzY2YzVlIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=',
};
let ControlRoomDashboard = class ControlRoomDashboard extends i {
    constructor() {
        super(...arguments);
        this.config = {};
        this.activePage = "home";
        this.mobileMenuOpen = false;
        this.settingsSection = "overview";
        this.settingsSearch = "";
        this.crFontSize = 110;
        this.crFontSaving = false;
        this.crFontMessage = "";
        this.crFontRequest = 0;
        this.currentTime = new Date();
        this.openLightColorId = "";
        this.showInlineBrightness = true;
        this.selectedRoom = "";
        this.lightsTab = "lights";
        this.areaNames = {};
        this.lightAreas = {};
        this.allEntityAreas = {};
        this.roomDetail = "";
        this.roomImages = {};
        this.roomImageEditor = false;
        this.roomStyle = "photos";
        this.roomAutoSwitch = false;
        this.roomStyleByArea = {};
        this.roomPhotoUrls = {};
        this.roomStyleEditor = false;
        this.roomStyleSnapshot = "";
        this.roomImageDraft = "";
        this.crTheme = "purple";
        this.crThemeStyle = "glass";
        this.crThemeSource = "controlroom";
        this.crHATheme = "";
        this.crThemeSearch = "";
        this.crThemeFilter = "all";
        this.crThemePage = 0;
        this.crHAMode = "auto";
        this.crThemeSnapshot = "";
        this.crRemoteUser = "";
        this.crCacheUser = "";
        this.crRemoteLoading = false;
        this.crRemoteReady = false;
        this.crRemoteSaving = false;
        this.crDefaultTheme = "purple";
        this.crDefaultFeedback = "";
        this.crDefaultStyle = "glass";
        this.labelOptions = [];
        this.entityLabels = {};
        this.groupMembers = {};
        this.visibilitySettingsOpen = false;
        this.groupMode = "auto";
        this.hiddenEntities = [];
        this.shownEntities = [];
        this.excludedLabels = ["no_dboard"];
        this.onlyUnlabeled = false;
        this.showTypeDescriptions = false;
        this.showStatusDescriptions = false;
        this.settingsInitialized = false;
        this.registryLoaded = false;
        this.registryLoading = false;
        this.welcomeMode = "automatic";
        this.welcomeShowEyebrow = true;
        this.welcomeShowSubtitle = true;
        this.welcomeShowPeople = true;
        this.welcomeShowGreeting = true;
        this.welcomeEyebrow = "";
        this.welcomeSubtitle = "";
        this.smartShowWeather = true;
        this.smartShowClock = true;
        this.smartShowWaste = true;
        this.weatherSource = "auto";
        this.weatherEntity = "";
        this.weatherTempEntity = "";
        this.weatherConditionEntity = "";
        this.clockSource = "local";
        this.clockEntity = "";
        this.clockTimezone = "";
        this.smartExpanded = "weather";
        this.wasteSource = "auto";
        this.wasteEntity = "";
        this.wasteLabel = "";
        this.wasteIcon = "mdi:trash-can-outline";
        this.wasteDateMode = "relative";
        this.wasteSwitchTime = "12:00";
        this.wasteCalendarEvents = [];
        this.wasteLoadedCalendar = "";
        this.wasteLastFetch = 0;
        this.wasteFetching = false;
        // Changes in the settings editor are drafts until explicitly saved.
        this.settingsDirty = false;
        this.settingsSavedNotice = false;
        this.smartDraftSnapshot = "";
        this.welcomeDraftSnapshot = "";
    }
    crFontCacheKey(user) { return `controlroom-font-v34:${user}`; }
    crValidFont(value) {
        const n = Number(value);
        return Number.isFinite(n) && [90, 100, 110, 120].includes(n) ? n : null;
    }
    crRestoreFont(user) {
        try {
            const n = this.crValidFont(localStorage.getItem(this.crFontCacheKey(user)));
            if (n !== null)
                this.crFontSize = n;
        }
        catch { /* storage blocked */ }
    }
    async crSetFontSize(size) {
        if (this.crValidFont(size) === null)
            return;
        this.crFontSize = size;
        const user = this.hass?.user?.id;
        if (user)
            try {
                localStorage.setItem(this.crFontCacheKey(user), String(size));
            }
            catch { /* storage blocked */ }
        if (!user || !this.hass?.callWS) {
            this.crFontMessage = "Lokal gespeichert";
            return;
        }
        const request = ++this.crFontRequest;
        this.crFontSaving = true;
        this.crFontMessage = "";
        try {
            await this.hass.callWS({ type: "controlroom_preferences/set_font", font_size: size });
            if (request === this.crFontRequest)
                this.crFontMessage = "Synchronisiert ✓";
        }
        catch (error) {
            if (request === this.crFontRequest)
                this.crFontMessage = "Lokal gespeichert · Integration aktualisieren";
            console.warn("ControlRoom: font sync requires Preferences v1.1", error);
        }
        finally {
            if (request === this.crFontRequest)
                this.crFontSaving = false;
        }
    }
    renderFontSetting() {
        return b `<div class="cr-font-setting">
      <div class="cr-font-label"><span>${this.renderIcon("mdi:format-size")}<strong>Schriftgröße</strong></span><span class="cr-font-percent">${this.crFontSize}%</span></div>
      <div class="cr-font-choices" role="group" aria-label="Schriftgröße">
        ${[90, 100, 110, 120].map(size => b `<button type="button" class=${size === this.crFontSize ? "active" : ""} aria-pressed=${size === this.crFontSize} @click=${() => { void this.crSetFontSize(size); }}>${size}%</button>`)}
      </div>
      ${this.crFontMessage ? b `<small class="cr-font-status">${this.crFontMessage}</small>` : A}
    </div>`;
    }
    smartSettingsData() {
        return {
            weather: this.smartShowWeather, clock: this.smartShowClock, waste: this.smartShowWaste,
            weatherSource: this.weatherSource, weatherEntity: this.weatherEntity, weatherTempEntity: this.weatherTempEntity,
            weatherConditionEntity: this.weatherConditionEntity, clockSource: this.clockSource, clockEntity: this.clockEntity, clockTimezone: this.clockTimezone,
            source: this.wasteSource, entity: this.wasteEntity, label: this.wasteLabel,
            icon: this.wasteIcon, dateMode: this.wasteDateMode, switchTime: this.wasteSwitchTime
        };
    }
    welcomeSettingsData() {
        return { mode: this.welcomeMode, eyebrow: this.welcomeEyebrow, subtitle: this.welcomeSubtitle,
            showEyebrow: this.welcomeShowEyebrow, showSubtitle: this.welcomeShowSubtitle,
            showPeople: this.welcomeShowPeople, showGreeting: this.welcomeShowGreeting };
    }
    beginSettingsEdit(section) {
        this.settingsSection = section;
        this.smartDraftSnapshot = JSON.stringify(this.smartSettingsData());
        this.welcomeDraftSnapshot = JSON.stringify(this.welcomeSettingsData());
        this.settingsDirty = false;
        this.settingsSavedNotice = false;
    }
    markSettingsDirty() {
        this.settingsDirty = this.settingsSection === "smartbar"
            ? JSON.stringify(this.smartSettingsData()) !== this.smartDraftSnapshot
            : JSON.stringify(this.welcomeSettingsData()) !== this.welcomeDraftSnapshot;
        this.settingsSavedNotice = false;
    }
    cancelSettingsEdit() {
        const section = this.settingsSection;
        if (section === "smartbar" && this.smartDraftSnapshot) {
            const d = JSON.parse(this.smartDraftSnapshot);
            this.smartShowWeather = d.weather;
            this.smartShowClock = d.clock;
            this.smartShowWaste = d.waste;
            this.weatherSource = d.weatherSource;
            this.weatherEntity = d.weatherEntity;
            this.weatherTempEntity = d.weatherTempEntity;
            this.weatherConditionEntity = d.weatherConditionEntity;
            this.clockSource = d.clockSource;
            this.clockEntity = d.clockEntity;
            this.clockTimezone = d.clockTimezone;
            this.wasteSource = d.source;
            this.wasteEntity = d.entity;
            this.wasteLabel = d.label;
            this.wasteIcon = d.icon;
            this.wasteDateMode = d.dateMode;
            this.wasteSwitchTime = d.switchTime;
        }
        if (section === "welcome" && this.welcomeDraftSnapshot) {
            const d = JSON.parse(this.welcomeDraftSnapshot);
            this.welcomeMode = d.mode;
            this.welcomeEyebrow = d.eyebrow;
            this.welcomeSubtitle = d.subtitle;
            this.welcomeShowEyebrow = d.showEyebrow;
            this.welcomeShowSubtitle = d.showSubtitle;
            this.welcomeShowPeople = d.showPeople;
            this.welcomeShowGreeting = d.showGreeting;
        }
        this.settingsDirty = false;
        this.settingsSavedNotice = false;
        this.settingsSection = "overview";
    }
    commitSettingsEdit() {
        if (this.settingsSection === "smartbar") {
            this.saveSmartSettings();
            this.smartDraftSnapshot = JSON.stringify(this.smartSettingsData());
        }
        else if (this.settingsSection === "welcome") {
            this.saveWelcome();
            this.welcomeDraftSnapshot = JSON.stringify(this.welcomeSettingsData());
        }
        this.settingsDirty = false;
        this.settingsSavedNotice = true;
    }
    restoreSmartSettings() {
        try {
            const data = JSON.parse(localStorage.getItem("controlroom-smartbar-v1") || "{}");
            if (["auto", "weather", "sensor"].includes(data.weatherSource))
                this.weatherSource = data.weatherSource;
            if (typeof data.weatherEntity === "string")
                this.weatherEntity = data.weatherEntity;
            if (typeof data.weatherTempEntity === "string")
                this.weatherTempEntity = data.weatherTempEntity;
            if (typeof data.weatherConditionEntity === "string")
                this.weatherConditionEntity = data.weatherConditionEntity;
            if (["local", "sensor"].includes(data.clockSource))
                this.clockSource = data.clockSource;
            if (typeof data.clockEntity === "string")
                this.clockEntity = data.clockEntity;
            if (typeof data.clockTimezone === "string")
                this.clockTimezone = data.clockTimezone;
            if (typeof data.weather === "boolean")
                this.smartShowWeather = data.weather;
            if (typeof data.clock === "boolean")
                this.smartShowClock = data.clock;
            if (typeof data.waste === "boolean")
                this.smartShowWaste = data.waste;
            if (["auto", "calendar", "sensor"].includes(data.source))
                this.wasteSource = data.source;
            if (typeof data.entity === "string")
                this.wasteEntity = data.entity;
            if (typeof data.label === "string")
                this.wasteLabel = data.label;
            if (typeof data.icon === "string")
                this.wasteIcon = data.icon;
            if (["relative", "date", "both"].includes(data.dateMode))
                this.wasteDateMode = data.dateMode;
            if (typeof data.switchTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(data.switchTime))
                this.wasteSwitchTime = data.switchTime;
        }
        catch (error) {
            console.warn("ControlRoom: smart bar preferences unavailable", error);
        }
    }
    saveSmartSettings() {
        try {
            localStorage.setItem("controlroom-smartbar-v1", JSON.stringify({
                weather: this.smartShowWeather, clock: this.smartShowClock, waste: this.smartShowWaste,
                weatherSource: this.weatherSource, weatherEntity: this.weatherEntity, weatherTempEntity: this.weatherTempEntity,
                weatherConditionEntity: this.weatherConditionEntity, clockSource: this.clockSource, clockEntity: this.clockEntity, clockTimezone: this.clockTimezone,
                source: this.wasteSource, entity: this.wasteEntity, label: this.wasteLabel,
                icon: this.wasteIcon, dateMode: this.wasteDateMode, switchTime: this.wasteSwitchTime
            }));
        }
        catch (error) {
            console.warn("ControlRoom: smart bar preferences could not be saved", error);
        }
    }
    restoreWelcome() {
        try {
            const data = JSON.parse(localStorage.getItem("controlroom-welcome-v1") || "{}");
            if (data.mode === "automatic" || data.mode === "shared")
                this.welcomeMode = data.mode;
            for (const [key, field] of [["eyebrow", "welcomeEyebrow"], ["subtitle", "welcomeSubtitle"]]) {
                if (typeof data[key] === "string")
                    this[field] = data[key];
            }
            for (const [key, field] of [["showEyebrow", "welcomeShowEyebrow"], ["showSubtitle", "welcomeShowSubtitle"], ["showPeople", "welcomeShowPeople"], ["showGreeting", "welcomeShowGreeting"]]) {
                if (typeof data[key] === "boolean")
                    this[field] = data[key];
            }
        }
        catch (error) {
            console.warn("ControlRoom: welcome preferences unavailable", error);
        }
    }
    saveWelcome() {
        try {
            localStorage.setItem("controlroom-welcome-v1", JSON.stringify({
                mode: this.welcomeMode, eyebrow: this.welcomeEyebrow, subtitle: this.welcomeSubtitle,
                showEyebrow: this.welcomeShowEyebrow, showSubtitle: this.welcomeShowSubtitle,
                showPeople: this.welcomeShowPeople, showGreeting: this.welcomeShowGreeting
            }));
        }
        catch (error) {
            console.warn("ControlRoom: welcome preferences could not be saved", error);
        }
    }
    restorePreferences() {
        if (this.settingsInitialized)
            return;
        this.settingsInitialized = true;
        try {
            const raw = localStorage.getItem("controlroom-lighting-v1");
            if (!raw)
                return;
            const v = JSON.parse(raw);
            if (v.groupMode === "auto" || v.groupMode === "all" || v.groupMode === "manual")
                this.groupMode = v.groupMode;
            if (Array.isArray(v.hiddenEntities))
                this.hiddenEntities = v.hiddenEntities.filter((x) => typeof x === "string");
            if (Array.isArray(v.shownEntities))
                this.shownEntities = v.shownEntities.filter((x) => typeof x === "string");
            if (Array.isArray(v.excludedLabels))
                this.excludedLabels = v.excludedLabels.filter((x) => typeof x === "string");
            if (typeof v.onlyUnlabeled === "boolean")
                this.onlyUnlabeled = v.onlyUnlabeled;
            if (typeof v.showInlineBrightness === "boolean")
                this.showInlineBrightness = v.showInlineBrightness;
            if (typeof v.showTypeDescriptions === "boolean")
                this.showTypeDescriptions = v.showTypeDescriptions;
            if (typeof v.showStatusDescriptions === "boolean")
                this.showStatusDescriptions = v.showStatusDescriptions;
        }
        catch (error) {
            console.warn("ControlRoom: lighting preferences unavailable", error);
        }
    }
    savePreferences() {
        try {
            localStorage.setItem("controlroom-lighting-v1", JSON.stringify({
                groupMode: this.groupMode, hiddenEntities: this.hiddenEntities, shownEntities: this.shownEntities,
                excludedLabels: this.excludedLabels, onlyUnlabeled: this.onlyUnlabeled, showInlineBrightness: this.showInlineBrightness,
                showTypeDescriptions: this.showTypeDescriptions, showStatusDescriptions: this.showStatusDescriptions
            }));
        }
        catch (error) {
            console.warn("ControlRoom: preferences could not be saved", error);
        }
    }
    toggleEntry(list, id) {
        return list.includes(id) ? list.filter(x => x !== id) : [...list, id];
    }
    setConfig(config) {
        this.config = config;
    }
    getCardSize() {
        return 12;
    }
    // Apply the last verified theme for this HA user before the first paint.
    willUpdate() {
        const user = this.hass?.user?.id;
        if (!user || user === this.crCacheUser)
            return;
        this.crCacheUser = user;
        try {
            const saved = JSON.parse(localStorage.getItem(`controlroom-theme-user-v32:${user}`) || "null");
            if (saved && this.crPalettes().some(p => p.id === saved.theme)) {
                this.crTheme = saved.theme;
                if (["glass", "solid", "minimal"].includes(saved.style))
                    this.crThemeStyle = saved.style;
                this.crRemoteReady = true; // cached presentation; remote still refreshes it
            }
            else {
                this.crRemoteReady = false;
            }
        }
        catch {
            this.crRemoteReady = false;
        }
    }
    cacheVerifiedTheme(user) {
        try {
            localStorage.setItem(`controlroom-theme-user-v32:${user}`, JSON.stringify({ theme: this.crTheme, style: this.crThemeStyle }));
        }
        catch { /* Private mode / storage unavailable */ }
    }
    updated() {
        void this.refreshWasteEvents();
        if (this.hass?.user?.id && this.hass.callWS && this.crRemoteUser !== this.hass.user.id && !this.crRemoteLoading) {
            void this.loadRemoteCRTheme();
        }
        if (this.hass?.callWS && !this.registryLoaded && !this.registryLoading) {
            void this.loadAreaRegistry();
        }
    }
    async loadAreaRegistry() {
        if (!this.hass?.callWS)
            return;
        this.registryLoading = true;
        try {
            const [areasRaw, entitiesRaw, devicesRaw] = await Promise.all([
                this.hass.callWS({ type: "config/area_registry/list" }),
                this.hass.callWS({ type: "config/entity_registry/list" }),
                this.hass.callWS({ type: "config/device_registry/list" })
            ]);
            const areas = areasRaw;
            const entities = entitiesRaw;
            const devices = devicesRaw;
            const deviceArea = new Map(devices.map(d => [d.id, d.area_id || ""]));
            this.areaNames = Object.fromEntries(areas.map(a => [a.area_id, a.name]));
            this.allEntityAreas = Object.fromEntries(entities.map(e => [e.entity_id, e.area_id || (e.device_id ? deviceArea.get(e.device_id) : "") || ""]));
            this.lightAreas = Object.fromEntries(entities.filter(e => e.entity_id.startsWith("light.")).map(e => [
                e.entity_id, e.area_id || (e.device_id ? deviceArea.get(e.device_id) : "") || ""
            ]));
            // Labels live in HA registries, not in hass.states. A failure to read labels
            // must not prevent the rest of the lighting dashboard from loading.
            const deviceLabels = new Map(devices.map(d => [d.id, d.labels || []]));
            this.entityLabels = Object.fromEntries(entities.map(e => [
                e.entity_id, [...new Set([...(e.labels || []), ...(e.device_id ? deviceLabels.get(e.device_id) || [] : [])])]
            ]));
            try {
                const labels = await this.hass.callWS({ type: "config/label_registry/list" });
                this.labelOptions = labels.sort((a, b) => a.name.localeCompare(b.name));
            }
            catch (error) {
                console.warn("ControlRoom: label registry unavailable", error);
            }
            this.registryLoaded = true;
        }
        catch (error) {
            console.warn("ControlRoom: area registry not available", error);
            this.registryLoaded = true;
        }
        finally {
            this.registryLoading = false;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.restorePreferences();
        if (this.hass?.user?.id)
            this.crRestoreFont(this.hass.user.id);
        try {
            const saved = JSON.parse(localStorage.getItem("controlroom-theme-v1") || "{}");
            const standard = JSON.parse(localStorage.getItem("controlroom-theme-default-v1") || "{}");
            this.crDefaultTheme = standard.theme || "purple";
            this.crDefaultStyle = (["glass", "solid", "minimal"].includes(standard.style) ? standard.style : saved.style) || "glass";
            const migrateTheme = (id) => {
                const match = /^signature-(\d+)$/.exec(id);
                if (!match)
                    return id;
                const available = this.crPalettes();
                if (available.some(p => p.id === id))
                    return id;
                const generated = available.filter(p => p.id.startsWith("signature-"));
                return generated.length ? generated[(Number(match[1]) - 1) % generated.length].id : "purple";
            };
            this.crDefaultTheme = migrateTheme(this.crDefaultTheme);
            this.crTheme = migrateTheme(saved.theme || this.crDefaultTheme);
            this.crThemeStyle = (["glass", "solid", "minimal"].includes(saved.style) ? saved.style : this.crDefaultStyle);
            this.crThemeSource = "controlroom";
            this.crHATheme = "";
            this.crHAMode = "auto";
        }
        catch (error) {
            console.warn("ControlRoom: unable to restore theme", error);
        }
        try {
            this.roomImages = JSON.parse(localStorage.getItem("controlroom-room-images-v1") || "{}");
        }
        catch {
            this.roomImages = {};
        }
        try {
            const v = JSON.parse(localStorage.getItem("controlroom-room-style-v1") || "{}");
            if (["3d", "photos", "custom"].includes(v.style))
                this.roomStyle = v.style;
            if (typeof v.auto === "boolean")
                this.roomAutoSwitch = v.auto;
            if (v.byArea && typeof v.byArea === "object")
                this.roomStyleByArea = v.byArea;
            if (v.photos && typeof v.photos === "object")
                this.roomPhotoUrls = v.photos;
            if (v.images && typeof v.images === "object")
                this.roomImages = { ...this.roomImages, ...v.images };
        }
        catch (error) {
            console.warn(error);
        }
        this.restoreWelcome();
        this.restoreSmartSettings();
        this.currentTime = new Date();
        this.clockInterval = setInterval(() => {
            this.currentTime = new Date();
            void this.refreshWasteEvents();
        }, 30000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.clockInterval !== undefined) {
            clearInterval(this.clockInterval);
            this.clockInterval = undefined;
        }
    }
    getLanguage() {
        const language = (this.hass?.language || "en")
            .toLowerCase()
            .split(/[-_]/)[0];
        return language === "de" || language === "pt"
            ? language
            : "en";
    }
    t(key) {
        return translations[this.getLanguage()][key];
    }
    getGreeting() {
        const hour = this.currentTime.getHours();
        if (hour < 12)
            return this.t("morning");
        if (hour < 18)
            return this.t("afternoon");
        return this.t("evening");
    }
    getTime() {
        return new Intl.DateTimeFormat(this.getLanguage(), {
            hour: "2-digit",
            minute: "2-digit"
        }).format(this.currentTime);
    }
    getDate() {
        return new Intl.DateTimeFormat(this.getLanguage(), {
            weekday: "short",
            day: "numeric",
            month: "short"
        }).format(this.currentTime);
    }
    getWeather() {
        const states = this.hass?.states ?? {};
        if (this.weatherSource === "sensor")
            return undefined;
        if (this.weatherEntity)
            return states[this.weatherEntity];
        if (this.config.weather_entity && states[this.config.weather_entity])
            return states[this.config.weather_entity];
        return Object.values(states).find(e => e.entity_id.startsWith("weather.") && !["unknown", "unavailable"].includes(e.state));
    }
    getWeatherTemperature(weather) {
        const sensor = this.weatherSource === "sensor" ? this.hass?.states[this.weatherTempEntity] : undefined;
        const raw = sensor ? Number(sensor.state) : weather?.attributes.temperature;
        if (typeof raw !== "number" || !Number.isFinite(raw))
            return "—";
        const unit = sensor?.attributes.unit_of_measurement ?? weather?.attributes.temperature_unit;
        const displayUnit = typeof unit === "string" ? unit : this.hass?.config?.unit_system?.temperature || "°C";
        return `${Math.round(raw)} ${displayUnit}`;
    }
    getWeatherCondition() {
        const sensor = this.weatherSource === "sensor" ? this.hass?.states[this.weatherConditionEntity] : undefined;
        return sensor?.state || this.getWeather()?.state || "";
    }
    getClockParts() {
        const sensor = this.clockSource === "sensor" ? this.hass?.states[this.clockEntity] : undefined;
        const parsed = sensor && !["unknown", "unavailable"].includes(sensor.state) ? new Date(sensor.state) : undefined;
        const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : this.currentTime;
        const opts = this.clockTimezone.trim() ? { timeZone: this.clockTimezone.trim() } : {};
        try {
            return {
                time: new Intl.DateTimeFormat(this.getLanguage(), { ...opts, hour: "2-digit", minute: "2-digit" }).format(date),
                date: new Intl.DateTimeFormat(this.getLanguage(), { ...opts, weekday: "short", day: "numeric", month: "short" }).format(date)
            };
        }
        catch {
            return { time: this.getTime(), date: this.getDate() };
        }
    }
    getWeatherDescription(condition) {
        const key = weatherKeys[condition];
        return key ? this.t(key) : condition.replace(/-/g, " ");
    }
    navigate(page) {
        if (this.settingsDirty && (this.settingsSection === "smartbar" || this.settingsSection === "welcome"))
            this.cancelSettingsEdit();
        this.activePage = page;
        this.mobileMenuOpen = false;
    }
    renderIcon(icon) {
        return b `<ha-icon .icon=${icon}></ha-icon>`;
    }
    renderWeather() {
        const weather = this.getWeather();
        const condition = this.getWeatherCondition();
        if (!weather && this.weatherSource !== "sensor")
            return A;
        if (this.weatherSource === "sensor" && !this.hass?.states[this.weatherTempEntity])
            return A;
        const icon = weatherIcons[condition] || "mdi:weather-cloudy";
        return b `<div class="weather" title=${weather?.entity_id || this.weatherTempEntity}>
      <div class="weather-icon">${this.renderIcon(icon)}</div>
      <div class="weather-details"><div class="weather-temp">${this.getWeatherTemperature(weather)}</div>
      <div class="weather-condition">${condition ? this.getWeatherDescription(condition) : ""}</div></div>
    </div>`;
    }
    getPeople() {
        return Object.values(this.hass?.states ?? {})
            .filter((entity) => entity.entity_id.startsWith("person."))
            .sort((a, b) => this.getPersonName(a).localeCompare(this.getPersonName(b), this.getLanguage()));
    }
    getPersonName(person) {
        const name = person.attributes.friendly_name;
        return typeof name === "string" && name.trim()
            ? name
            : person.entity_id.substring("person.".length).replace(/_/g, " ");
    }
    getPersonLocation(person) {
        switch (person.state) {
            case "home": return this.t("atHome");
            case "not_home": return this.t("away");
            case "unknown":
            case "unavailable": return this.t("locationUnknown");
            default: return person.state || this.t("locationUnknown");
        }
    }
    getCurrentPerson() {
        const people = this.getPeople();
        const userId = this.hass?.user?.id;
        if (userId) {
            const match = people.find(p => p.attributes.user_id === userId);
            if (match)
                return match;
        }
        const username = this.hass?.user?.name?.trim().toLocaleLowerCase();
        return username ? people.find(p => this.getPersonName(p).trim().toLocaleLowerCase() === username) : undefined;
    }
    renderPersonAvatar(person, large = false) {
        const picture = person.attributes.entity_picture;
        const name = this.getPersonName(person);
        const hasPicture = typeof picture === "string" && /^(\/|https?:\/\/)/.test(picture);
        return b `<span class="pill-avatar ${large ? "avatar-large" : ""}">
      ${hasPicture ? b `<img src=${picture} alt=${name} loading="lazy" />` : b `<span>${name.charAt(0).toUpperCase()}</span>`}
    </span>`;
    }
    renderPeoplePills(people) {
        if (!people.length || !this.welcomeShowPeople)
            return A;
        return b `<div class="people-pills" aria-label=${this.t("people")}>
      ${people.map(person => b `<div class="person-pill" title=${`${this.getPersonName(person)} · ${this.getPersonLocation(person)}`}>
        ${this.renderPersonAvatar(person)}
        <div class="pill-details"><span class="pill-name">${this.getPersonName(person)}</span>
          <span class="pill-location ${person.state === "home" ? "at-home" : ""}">${this.getPersonLocation(person)}</span>
        </div>
      </div>`)}
    </div>`;
    }
    getWasteCandidates() {
        const states = Object.values(this.hass?.states ?? {});
        const calendars = states.filter(e => e.entity_id.startsWith("calendar.") &&
            /müll|mull|abfall|waste|trash|garbage|recycl|tonne|pickup|collection|entsorg|stadtreinigung/i.test(`${e.entity_id} ${String(e.attributes.friendly_name || "")}`));
        const sensors = states.filter(e => e.entity_id.startsWith("sensor.") &&
            /müll|mull|abfall|waste|trash|garbage|recycl|tonne|pickup|collection|entsorg|stadtreinigung|biomüll|restmüll|papier/i.test(`${e.entity_id} ${String(e.attributes.friendly_name || "")}`));
        return [...calendars, ...sensors].sort((a, b) => a.entity_id.localeCompare(b.entity_id));
    }
    getWasteEntity() {
        const states = this.hass?.states ?? {};
        if (this.wasteEntity) {
            const chosen = states[this.wasteEntity];
            if (chosen && (this.wasteSource === "auto" || chosen.entity_id.startsWith(`${this.wasteSource}.`)))
                return chosen;
            return undefined; // Never silently replace a manually selected entity.
        }
        const candidates = this.getWasteCandidates().filter(e => this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
        // Prefer a calendar with a next event; otherwise a sensor with a usable state.
        return candidates.find(e => e.entity_id.startsWith("calendar.") && typeof e.attributes.start_time === "string") ||
            candidates.find(e => e.entity_id.startsWith("sensor.") && !["unknown", "unavailable", ""].includes(e.state)) ||
            candidates[0];
    }
    wasteDay(raw) {
        if (typeof raw === "object" && raw !== null && "date" in raw)
            raw = raw.date;
        if (typeof raw !== "string")
            return "";
        const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
        return match ? match[1] : "";
    }
    wasteDayOffset(day) {
        const today = this.currentTime;
        const parts = day.split("-").map(Number);
        return Math.round((Date.UTC(parts[0], parts[1] - 1, parts[2]) -
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
    }
    wasteIsPast(day) {
        const days = this.wasteDayOffset(day);
        const [h, m] = this.wasteSwitchTime.split(":").map(Number);
        return days < 0 || (days === 0 && (this.currentTime.getHours() * 60 + this.currentTime.getMinutes()) >= h * 60 + m);
    }
    wasteName(raw) {
        const value = raw.replace(/^\s*(abfuhr|leerung|entsorgung|abholung)\s*[:–-]?\s*/i, "").trim();
        if (/restm[uü]ll|schwarze[rns]?\s+tonne|hausm[uü]ll/i.test(value))
            return "Restmüll";
        if (/bio(m[uü]ll)?|braune[rns]?\s+tonne/i.test(value))
            return "Biomüll";
        if (/papier|pappe|blaue[rns]?\s+tonne/i.test(value))
            return "Papier";
        if (/gelbe[rns]?\s+(tonne|sack)|wertstoff|leichtverpackung/i.test(value))
            return "Gelbe Tonne";
        return value || raw;
    }
    async refreshWasteEvents() {
        if (!this.smartShowWaste || !this.hass?.callWS)
            return;
        const entity = this.getWasteEntity();
        const id = entity?.entity_id.startsWith("calendar.") ? entity.entity_id : "";
        if (!id) {
            this.wasteLoadedCalendar = "";
            this.wasteCalendarEvents = [];
            return;
        }
        if (this.wasteFetching || (id === this.wasteLoadedCalendar && Date.now() - this.wasteLastFetch < 300000))
            return;
        this.wasteFetching = true;
        this.wasteLoadedCalendar = id;
        this.wasteLastFetch = Date.now();
        try {
            const start = new Date(this.currentTime);
            start.setDate(start.getDate() - 1);
            const end = new Date(this.currentTime);
            end.setDate(end.getDate() + 60);
            const response = await this.hass.callWS({
                type: "call_service", domain: "calendar", service: "get_events",
                service_data: { entity_id: id, start_date_time: start.toISOString(), end_date_time: end.toISOString() },
                return_response: true
            });
            // HA returns a calendar-keyed response; some versions wrap it in "response".
            const payload = (response?.response && typeof response.response === "object"
                ? response.response : response);
            const container = payload?.[id];
            const events = Array.isArray(container?.events) ? container.events : [];
            if (this.wasteLoadedCalendar === id)
                this.wasteCalendarEvents = events
                    .map(event => ({ summary: String(event.summary || ""), date: this.wasteDay(event.start) }))
                    .filter(event => event.date && event.summary);
        }
        catch (error) {
            console.warn("ControlRoom: calendar.get_events unavailable; using entity fallback", error);
            if (this.wasteLoadedCalendar === id)
                this.wasteCalendarEvents = [];
        }
        finally {
            this.wasteFetching = false;
        }
    }
    getWasteInfo() {
        const entity = this.getWasteEntity();
        if (!entity || ["unknown", "unavailable"].includes(entity.state))
            return undefined;
        const attrs = entity.attributes;
        const name = String(attrs.friendly_name || entity.entity_id.split(".")[1].replace(/_/g, " "));
        const message = attrs.message || attrs.next_collection_type || attrs.waste_type || attrs.type;
        const dateRaw = attrs.start_time || attrs.next_date || attrs.next_collection || attrs.date ||
            attrs.collection_date || attrs.next_pickup || attrs.next_collection_date;
        const date = this.wasteDay(dateRaw || entity.state);
        const events = entity.entity_id.startsWith("calendar.") && this.wasteLoadedCalendar === entity.entity_id
            ? [...this.wasteCalendarEvents] : [];
        if (date && typeof message === "string")
            events.push({ summary: message, date });
        else if (date)
            events.push({ summary: name, date });
        const upcoming = events.filter(e => !this.wasteIsPast(e.date)).sort((a, b) => a.date.localeCompare(b.date));
        if (upcoming.length) {
            const firstDay = upcoming[0].date;
            const sameDay = upcoming.filter(e => e.date === firstDay);
            const names = [...new Set(sameDay.map(e => this.wasteName(e.summary)))];
            const title = this.wasteLabel.trim() || names.join(" + ");
            return { title, when: this.formatWasteWhen(firstDay) };
        }
        // Sensors that expose only a countdown cannot reveal the following pickup.
        // Never keep showing today's collection after the configured cutoff.
        const daysRaw = attrs.days_until_collection ?? attrs.days_until ?? attrs.days_remaining;
        const days = typeof daysRaw === "number" ? daysRaw :
            typeof daysRaw === "string" && /^\d+$/.test(daysRaw) ? Number(daysRaw) :
                entity.entity_id.startsWith("sensor.") && /^\d+$/.test(entity.state) ? Number(entity.state) : undefined;
        if (days !== undefined && Number.isFinite(days) && days >= 0) {
            const future = new Date(this.currentTime);
            future.setDate(future.getDate() + days);
            const day = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, "0")}-${String(future.getDate()).padStart(2, "0")}`;
            if (!this.wasteIsPast(day))
                return { title: this.wasteLabel.trim() || this.wasteName(String(message || name)), when: this.formatWasteWhen(day) };
        }
        return undefined;
    }
    formatWasteWhen(day) {
        const days = this.wasteDayOffset(day);
        const lang = this.getLanguage();
        const relative = days === 0 ? (lang === "de" ? "Heute" : lang === "pt" ? "Hoje" : "Today") :
            days === 1 ? (lang === "de" ? "Morgen" : lang === "pt" ? "Amanhã" : "Tomorrow") :
                lang === "de" ? `In ${days} Tagen` : lang === "pt" ? `Em ${days} dias` : `In ${days} days`;
        const [y, m, d] = day.split("-").map(Number);
        const absolute = new Intl.DateTimeFormat(lang, { day: "2-digit", month: "short" }).format(new Date(y, m - 1, d));
        return this.wasteDateMode === "date" ? absolute : this.wasteDateMode === "both" ? `${relative} · ${absolute}` : relative;
    }
    renderWelcomeSettings() {
        const section = this.settingsSection;
        const categories = [
            { id: "welcome", title: "Begrüßung & Personen", description: "Anrede, Profilbilder und Standorte", icon: "mdi:account-heart-outline", group: "Startseite" },
            { id: "smartbar", title: "Smart Glass Bar", description: "Wetter, Uhr & Datum und Müllabfuhr", icon: "mdi:weather-partly-cloudy", group: "Startseite" },
            { id: "rooms", title: "Räume", description: "Bildstil, Raumfotos und automatische Darstellung", icon: "mdi:home-edit-outline", group: "Darstellung" },
            { id: "themes", title: "Themes", description: "Exklusive ControlRoom-Farbwelten und Designstile", icon: "mdi:palette-outline", group: "Darstellung" },
            { id: "devices", title: "Geräte & Bereiche", description: "Bereiche und Entitäten · in Vorbereitung", icon: "mdi:devices", group: "Geräte & Bereiche" },
            { id: "system", title: "System", description: "Informationen und Verwaltung · in Vorbereitung", icon: "mdi:cog-outline", group: "System" }
        ];
        const matches = categories.filter(c => `${c.title} ${c.description} ${c.group}`.toLocaleLowerCase().includes(this.settingsSearch.toLocaleLowerCase().trim()));
        if (section === "overview")
            return b `<div class="settings-center">
      <div class="settings-intro"><h1>Einstellungen</h1><p>Gestalte dein Zuhause, ganz nach deinen Wünschen.</p></div>
      <label class="settings-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Einstellungen durchsuchen…" .value=${this.settingsSearch} @input=${(e) => { this.settingsSearch = e.target.value; }} aria-label="Einstellungen durchsuchen" /></label>
      ${matches.length ? [...new Set(matches.map(c => c.group))].map(group => b `<section class="settings-category"><h2>${group}</h2><div class="settings-options">${matches.filter(c => c.group === group).map(c => b `<button class="settings-option" @click=${() => { if (c.id === "welcome" || c.id === "smartbar")
                this.beginSettingsEdit(c.id);
            else {
                this.settingsSection = c.id;
                if (c.id === "rooms")
                    this.roomStyleSnapshot = JSON.stringify({ style: this.roomStyle, auto: this.roomAutoSwitch, byArea: this.roomStyleByArea, photos: this.roomPhotoUrls, images: this.roomImages });
                if (c.id === "themes")
                    this.crThemeSnapshot = JSON.stringify(this.crThemeData());
            } }}><span class="settings-option-icon">${this.renderIcon(c.icon)}</span><span class="settings-option-copy"><strong>${c.title}</strong><small>${c.description}</small></span>${this.renderIcon("mdi:chevron-right")}</button>`)}</div>${group === "Darstellung" && (!this.settingsSearch.trim() || "schriftgröße typografie darstellung".includes(this.settingsSearch.toLocaleLowerCase().trim())) ? this.renderFontSetting() : A}</section>`) : b `<p class="settings-empty">Keine passenden Einstellungen gefunden.</p>`}
      <p class="settings-local-note">Änderungen werden auf diesem Browser / Display gespeichert.</p>
    </div>`;
        if (section === "themes")
            return this.renderThemeSettings();
        if (section === "rooms")
            return b `<div class="settings-center"><button class="settings-back" @click=${() => { this.cancelRoomVisualSettings(); this.settingsSection = "overview"; }}>${this.renderIcon("mdi:arrow-left")} Zurück</button>${this.renderRoomStyleEditor(Object.entries(this.areaNames).sort((a, b) => a[1].localeCompare(b[1])))}</div>`;
        if (section === "appearance" || section === "devices" || section === "system")
            return b `<div class="settings-center"><button class="settings-back" @click=${() => { this.settingsSection = "overview"; }}>${this.renderIcon("mdi:arrow-left")} Zurück</button><section class="welcome-settings"><div class="eyebrow">CONTROLROOM</div><h2>${categories.find(c => c.id === section)?.title}</h2><p>Dieser Bereich wird in einer späteren Etappe eingerichtet. Bestehende Einstellungen bleiben unverändert.</p></section></div>`;
        const candidates = this.getWasteCandidates().filter(e => this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
        const wasteInfo = this.getWasteInfo();
        return b `<div class="settings-stack"><button class="settings-back" @click=${() => { this.cancelSettingsEdit(); }}>${this.renderIcon("mdi:arrow-left")} Zurück</button>
      ${section === "welcome" ? b `<section class="welcome-settings">
        <h2>Begrüßung & Personen</h2>
        <p>Personalisierung dieses Browsers / Displays</p>
        <label class="welcome-setting-row"><span>Begrüßungsmodus</span>
          <select .value=${this.welcomeMode} @change=${(e) => { this.welcomeMode = e.target.value; this.markSettingsDirty(); }}>
            <option value="automatic">Automatisch · angemeldete Person</option>
            <option value="shared">Gemeinsam · iSG Display</option>
          </select></label>
        ${[
            ["welcomeShowGreeting", "Begrüßung anzeigen"],
            ["welcomeShowEyebrow", "Bereichstitel anzeigen"],
            ["welcomeShowSubtitle", "Untertitel anzeigen"],
            ["welcomeShowPeople", "Personen und Standorte anzeigen"]
        ].map(([key, label]) => b `<label class="welcome-setting-row"><span>${label}</span>
          <input type="checkbox" .checked=${this[key]} @change=${(e) => { this[key] = e.target.checked; this.markSettingsDirty(); }} /></label>`)}
        <label class="welcome-setting-text">Bereichstitel
          <input type="text" .value=${this.welcomeEyebrow || this.t("homeLabel")} @change=${(e) => { this.welcomeEyebrow = e.target.value; this.markSettingsDirty(); }} /></label>
        <label class="welcome-setting-text">Untertitel
          <input type="text" .value=${this.welcomeSubtitle || this.t("subtitle")} @change=${(e) => { this.welcomeSubtitle = e.target.value; this.markSettingsDirty(); }} /></label>
      </section>` : A}
      ${section === "smartbar" ? b `<section class="welcome-settings">
        <h2>Smart Glass Bar</h2>
        <p>Module und Datenquellen · auf diesem Display gespeichert</p>
        ${[["weather", "Wetter", "smartShowWeather", "mdi:weather-partly-cloudy"], ["clock", "Uhr & Datum", "smartShowClock", "mdi:clock-outline"], ["waste", "Müllabfuhr", "smartShowWaste", "mdi:trash-can-outline"]].map(([id, label, showKey, icon]) => b `
          <div class="smart-settings-module">
            <div class="smart-settings-head">
              <button type="button" class="smart-settings-open" @click=${() => { this.smartExpanded = this.smartExpanded === id ? "weather" : id; }}>${this.renderIcon(icon)}<strong>${label}</strong>${this.renderIcon(this.smartExpanded === id ? "mdi:chevron-up" : "mdi:chevron-down")}</button>
              <label class="smart-settings-toggle"><input type="checkbox" .checked=${this[showKey]} @change=${(e) => { this[showKey] = e.target.checked; this.markSettingsDirty(); }} aria-label=${`${label} anzeigen`}/></label>
            </div>
            ${this.smartExpanded === id ? b `<div class="smart-settings-body">
              ${id === "weather" ? b `
                <label class="welcome-setting-text">Quelle<select .value=${this.weatherSource} @change=${(e) => { this.weatherSource = e.target.value; this.weatherEntity = ""; this.markSettingsDirty(); }}><option value="auto">Automatisch · Wetterintegration</option><option value="weather">Wetter (weather.*)</option><option value="sensor">Sensoren / HACS (sensor.*)</option></select></label>
                ${this.weatherSource !== "sensor" ? b `<label class="welcome-setting-text">Wetter-Entität<select .value=${this.weatherEntity} @change=${(e) => { this.weatherEntity = e.target.value; this.markSettingsDirty(); }}><option value="">Automatisch auswählen</option>${Object.values(this.hass?.states ?? {}).filter(e => e.entity_id.startsWith("weather.")).map(e => b `<option value=${e.entity_id}>${String(e.attributes.friendly_name || e.entity_id)} · ${e.entity_id}</option>`)}</select></label>` : b `
                  <label class="welcome-setting-text">Temperatursensor<select .value=${this.weatherTempEntity} @change=${(e) => { this.weatherTempEntity = e.target.value; this.markSettingsDirty(); }}><option value="">Bitte auswählen</option>${Object.values(this.hass?.states ?? {}).filter(e => e.entity_id.startsWith("sensor.")).map(e => b `<option value=${e.entity_id}>${String(e.attributes.friendly_name || e.entity_id)} · ${e.entity_id}</option>`)}</select></label>
                  <label class="welcome-setting-text">Wettersituation (optional)<select .value=${this.weatherConditionEntity} @change=${(e) => { this.weatherConditionEntity = e.target.value; this.markSettingsDirty(); }}><option value="">Ohne Beschreibung</option>${Object.values(this.hass?.states ?? {}).filter(e => e.entity_id.startsWith("sensor.")).map(e => b `<option value=${e.entity_id}>${String(e.attributes.friendly_name || e.entity_id)} · ${e.entity_id}</option>`)}</select></label>`}
              ` : A}
              ${id === "clock" ? b `
                <label class="welcome-setting-text">Quelle<select .value=${this.clockSource} @change=${(e) => { this.clockSource = e.target.value; this.markSettingsDirty(); }}><option value="local">Gerätezeit · ohne Integration</option><option value="sensor">Datum-/Zeit-Sensor (sensor.*)</option></select></label>
                ${this.clockSource === "sensor" ? b `<label class="welcome-setting-text">Zeit-Entität<select .value=${this.clockEntity} @change=${(e) => { this.clockEntity = e.target.value; this.markSettingsDirty(); }}><option value="">Bitte auswählen</option>${Object.values(this.hass?.states ?? {}).filter(e => e.entity_id.startsWith("sensor.")).map(e => b `<option value=${e.entity_id}>${String(e.attributes.friendly_name || e.entity_id)} · ${e.entity_id}</option>`)}</select></label><p class="settings-note">Der Sensor muss ein gültiges ISO-Datum mit Uhrzeit liefern; sonst wird die Gerätezeit verwendet.</p>` : A}
                <label class="welcome-setting-text">Zeitzone (optional)<input type="text" placeholder="z. B. Europe/Berlin" .value=${this.clockTimezone} @change=${(e) => { this.clockTimezone = e.target.value; this.markSettingsDirty(); }} /></label>
              ` : A}
              ${id === "waste" ? b `
                <label class="welcome-setting-text">Quelle<select .value=${this.wasteSource} @change=${(e) => { this.wasteSource = e.target.value; this.wasteEntity = ""; this.markSettingsDirty(); }}><option value="auto">Automatisch erkennen</option><option value="calendar">Kalender (calendar.*)</option><option value="sensor">Sensor / HACS (sensor.*)</option></select></label>
                <label class="welcome-setting-text">Entität<select .value=${this.wasteEntity} @change=${(e) => { this.wasteEntity = e.target.value; this.markSettingsDirty(); }}><option value="">Automatisch auswählen</option>${candidates.map(e => b `<option value=${e.entity_id}>${String(e.attributes.friendly_name || e.entity_id)} · ${e.entity_id}</option>`)}</select></label>
                <label class="welcome-setting-text">Eigener Name (optional)<input type="text" placeholder="z. B. Biomüll" .value=${this.wasteLabel} @input=${(e) => { this.wasteLabel = e.target.value; this.markSettingsDirty(); }} /></label>
                <label class="welcome-setting-text">Symbol (MDI)<input type="text" placeholder="mdi:trash-can-outline" .value=${this.wasteIcon} @change=${(e) => { this.wasteIcon = e.target.value || "mdi:trash-can-outline"; this.markSettingsDirty(); }} /></label>
                <label class="welcome-setting-text">Automatischer Tageswechsel (Umschaltzeit)<input type="time" .value=${this.wasteSwitchTime} @change=${(e) => { this.wasteSwitchTime = e.target.value || "12:00"; this.markSettingsDirty(); }} /></label>
                <p class="settings-note">Ab 12:00 Uhr (Standard) wird die heutige Abholung übersprungen. Die nächste verfügbare Abholung erscheint automatisch.</p>
                <label class="welcome-setting-text">Datumsanzeige<select .value=${this.wasteDateMode} @change=${(e) => { this.wasteDateMode = e.target.value; this.markSettingsDirty(); }}><option value="relative">Heute / Morgen / in X Tagen</option><option value="date">Datum</option><option value="both">Beides</option></select></label>
                <p class="settings-note">${wasteInfo ? `Vorschau: ${wasteInfo.title} · ${wasteInfo.when}` : "Noch keine gültigen Abholdaten."}</p>
              ` : A}
            </div>` : A}
          </div>`)}
      </section>` : A}
      ${(section === "welcome" || section === "smartbar") ? b `
        <div class="settings-save-bar">
          <div class="settings-save-copy">
            <strong>${this.settingsDirty ? "Ungespeicherte Änderungen" : this.settingsSavedNotice ? "Änderungen gespeichert" : "Alle Änderungen gespeichert"}</strong>
            <small>${this.settingsDirty ? "Erst mit Speichern werden deine Einstellungen dauerhaft übernommen." : "Gespeichert auf diesem Browser / Display."}</small>
          </div>
          <button type="button" class="settings-cancel" @click=${() => this.cancelSettingsEdit()}>${this.renderIcon("mdi:close")} Abbrechen</button>
          <button type="button" class="settings-save" ?disabled=${!this.settingsDirty} @click=${() => this.commitSettingsEdit()}>${this.renderIcon("mdi:content-save-outline")} Speichern</button>
        </div>` : A}
    </div>`;
    }
    renderSmartBar() {
        const weather = this.smartShowWeather && (this.getWeather() || (this.weatherSource === "sensor" && this.hass?.states[this.weatherTempEntity]));
        const clockParts = this.getClockParts();
        const waste = this.smartShowWaste ? this.getWasteInfo() : undefined;
        const parts = [
            weather ? b `<div class="smart-part">${this.renderWeather()}</div>` : A,
            this.smartShowClock ? b `<div class="smart-part"><div class="smart-segment">${this.renderIcon("mdi:clock-outline")}
        <div><strong>${clockParts.time}</strong><small>${clockParts.date}</small></div></div></div>` : A,
            waste ? b `<div class="smart-part"><div class="smart-segment smart-waste">${this.renderIcon(this.wasteIcon.startsWith("mdi:") ? this.wasteIcon : "mdi:trash-can-outline")}
        <div><strong title=${waste.title}>${waste.title}</strong><small>${waste.when}</small></div></div></div>` : A
        ].filter(part => part !== A);
        return parts.length ? b `<div class="smart-bar">${parts.map((part, i) => b `${i ? b `<div class="smart-divider"></div>` : A}${part}`)}</div>` : A;
    }
    getAllLightEntities() {
        return Object.values(this.hass?.states ?? {}).filter(e => e.entity_id.startsWith("light."))
            .sort((a, b) => this.getLightName(a).localeCompare(this.getLightName(b), this.getLanguage()));
    }
    getGroupMembers(light) {
        const ids = light.attributes.entity_id;
        return Array.isArray(ids) ? ids.filter((id) => typeof id === "string" && id.startsWith("light.")) : [];
    }
    getLights() {
        const all = this.getAllLightEntities();
        const stateIds = new Set(all.map(l => l.entity_id));
        const groups = all.filter(l => this.getGroupMembers(l).some(id => stateIds.has(id)));
        const groupedMembers = new Set(groups.flatMap(g => this.getGroupMembers(g)));
        return all.filter(light => {
            const id = light.entity_id;
            const labels = this.entityLabels[id] || [];
            if (this.hiddenEntities.includes(id))
                return false;
            if (this.shownEntities.includes(id))
                return true;
            if (labels.some(label => this.excludedLabels.includes(label)))
                return false;
            if (this.onlyUnlabeled && labels.length)
                return false;
            if (this.groupMode === "manual")
                return true;
            if (this.groupMode === "auto" && groupedMembers.has(id)) {
                // Only suppress a member if at least one containing group is itself visible.
                return !groups.some(g => this.getGroupMembers(g).includes(id) &&
                    !this.hiddenEntities.includes(g.entity_id) &&
                    !((this.entityLabels[g.entity_id] || []).some(label => this.excludedLabels.includes(label))) &&
                    (!this.onlyUnlabeled || !(this.entityLabels[g.entity_id] || []).length));
            }
            return true;
        });
    }
    renderLightingPreferences() {
        const all = this.getAllLightEntities();
        return b `<section class="lighting-preferences">
      <div class="preferences-header"><strong>${this.getLanguage() === "de" ? "Sichtbarkeit & Darstellung" : this.getLanguage() === "pt" ? "Visibilidade e aparência" : "Visibility & appearance"}</strong>
        <button @click=${() => this.visibilitySettingsOpen = false} aria-label="Close">${this.renderIcon("mdi:close")}</button></div>
      <div class="pref-title">${this.getLanguage() === "de" ? "Gruppenanzeige" : "Exibição dos grupos"}</div>
      <div class="pref-modes">
        ${[["auto", "Gruppen bevorzugen"], ["all", "Alle anzeigen"], ["manual", "Manuell"]].map(([id, label]) => b `
          <button class=${this.groupMode === id ? "active" : ""} @click=${() => { this.groupMode = id; this.savePreferences(); }}>${label}</button>`)}
      </div>
      <div class="pref-title">Home Assistant Labels · ${this.labelOptions.length}</div>
      <div class="pref-list">
        ${this.labelOptions.map(label => b `<label class="pref-check"><input type="checkbox"
          .checked=${this.excludedLabels.includes(label.label_id)}
          @change=${() => { this.excludedLabels = this.toggleEntry(this.excludedLabels, label.label_id); this.savePreferences(); }} />
          <span class="pref-label-name" title=${label.name}>${label.name}</span><span class="pref-hint">${this.getLanguage() === "de" ? "Ausblenden" : this.getLanguage() === "pt" ? "Ocultar" : "Hide"}</span></label>`)}
        ${!this.labelOptions.length ? b `<small>${this.registryLoading ? "Labels werden geladen…" : "Keine Labels verfügbar (Registry prüfen)"}</small>` : A}
        <label class="pref-check"><input type="checkbox" .checked=${this.onlyUnlabeled}
          @change=${() => { this.onlyUnlabeled = !this.onlyUnlabeled; this.savePreferences(); }}/><span>${this.getLanguage() === "de" ? "Nur ohne Label" : this.getLanguage() === "pt" ? "Somente sem label" : "Only without label"}</span></label>
      </div>
      <div class="pref-title">${this.getLanguage() === "de" ? "Darstellung" : "Aparência"}</div>
      <div class="pref-list"><label class="pref-check"><input type="checkbox" .checked=${this.showInlineBrightness}
        @change=${() => { this.showInlineBrightness = !this.showInlineBrightness; this.savePreferences(); }}/><span>${this.getLanguage() === "de" ? "Helligkeit direkt in Lichtkarten" : this.getLanguage() === "pt" ? "Brilho direto nos cartões" : "Brightness inside light cards"}</span></label></div>
      <div class="pref-list">
        <label class="pref-check"><input type="checkbox" .checked=${this.showTypeDescriptions}
          @change=${() => { this.showTypeDescriptions = !this.showTypeDescriptions; this.savePreferences(); }}/><span>Gerätetyp anzeigen</span></label>
        <label class="pref-check"><input type="checkbox" .checked=${this.showStatusDescriptions}
          @change=${() => { this.showStatusDescriptions = !this.showStatusDescriptions; this.savePreferences(); }}/><span>Status anzeigen</span></label>
      </div>
      <div class="pref-title">${this.getLanguage() === "de" ? "Einzelne Lichter" : "Luzes individuais"} · ${all.length}</div>
      <div class="pref-entities">${all.map(light => {
            const id = light.entity_id;
            const override = this.hiddenEntities.includes(id) ? "hide" : this.shownEntities.includes(id) ? "show" : "auto";
            const isGroup = this.getGroupMembers(light).length > 0;
            return b `<div class="pref-entity"><span class="pref-entity-name">${this.renderIcon(isGroup ? "mdi:lightbulb-group-outline" : "mdi:lightbulb-outline")}${this.getLightName(light)}<small>${isGroup ? "Gruppe" : ""}</small></span>
          <select .value=${override} aria-label=${this.getLightName(light)} @change=${(ev) => {
                const next = ev.target.value;
                this.hiddenEntities = this.hiddenEntities.filter(x => x !== id);
                this.shownEntities = this.shownEntities.filter(x => x !== id);
                if (next === "hide")
                    this.hiddenEntities = [...this.hiddenEntities, id];
                if (next === "show")
                    this.shownEntities = [...this.shownEntities, id];
                this.savePreferences();
            }}><option value="auto">Auto</option><option value="show">Anzeigen</option><option value="hide">Ausblenden</option></select></div>`;
        })}</div>
    </section>`;
    }
    getLightName(light) {
        const name = light.attributes.friendly_name;
        return typeof name === "string" && name.trim()
            ? name
            : light.entity_id.slice("light.".length).replace(/_/g, " ");
    }
    async toggleLight(light) {
        if (!this.hass?.callService ||
            (light.state !== "on" && light.state !== "off"))
            return;
        try {
            await this.hass.callService("light", light.state === "on" ? "turn_off" : "turn_on", { entity_id: light.entity_id });
        }
        catch (error) {
            console.error(this.t("lightActionError"), error);
        }
    }
    getLightRoom(light) {
        const areaId = this.lightAreas[light.entity_id];
        return areaId && this.areaNames[areaId] ? this.areaNames[areaId] : this.t("unassigned");
    }
    getBrightness(light) {
        const raw = light.attributes.brightness;
        return typeof raw === "number" && Number.isFinite(raw)
            ? Math.round(raw / 255 * 100) : 100;
    }
    supportsBrightness(light) {
        const modes = light.attributes.supported_color_modes;
        return Array.isArray(modes) && modes.some(m => m !== "onoff" && m !== "unknown")
            || (typeof light.attributes.supported_features === "number"
                && (light.attributes.supported_features & 1) !== 0);
    }
    async setLightBrightness(light, value) {
        if (!this.hass?.callService)
            return;
        try {
            await this.hass.callService("light", "turn_on", {
                entity_id: light.entity_id, brightness_pct: value
            });
        }
        catch (error) {
            console.error(this.t("lightActionError"), error);
        }
    }
    supportsColor(light) {
        const modes = light.attributes.supported_color_modes;
        return Array.isArray(modes) && modes.some(m => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(String(m)));
    }
    supportsColorTemperature(light) {
        const modes = light.attributes.supported_color_modes;
        return Array.isArray(modes) && modes.includes("color_temp");
    }
    getColorHex(light) {
        const rgb = light.attributes.rgb_color;
        if (Array.isArray(rgb) && rgb.length >= 3 && rgb.slice(0, 3).every(x => typeof x === "number")) {
            return `#${rgb.slice(0, 3).map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("")}`;
        }
        return "#b38be0";
    }
    async setLightColor(light, hex) {
        if (!this.hass?.callService || !/^#[0-9a-f]{6}$/i.test(hex))
            return;
        const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
        try {
            await this.hass.callService("light", "turn_on", { entity_id: light.entity_id, rgb_color: rgb });
        }
        catch (error) {
            console.error(this.t("lightActionError"), error);
        }
    }
    async setLightTemperature(light, kelvin) {
        if (!this.hass?.callService)
            return;
        try {
            await this.hass.callService("light", "turn_on", { entity_id: light.entity_id, color_temp_kelvin: kelvin });
        }
        catch (error) {
            console.error(this.t("lightActionError"), error);
        }
    }
    async setAllLights(on, lights) {
        if (!this.hass?.callService)
            return;
        const ids = lights.filter(l => l.state === "on" || l.state === "off").map(l => l.entity_id);
        if (!ids.length)
            return;
        try {
            await this.hass.callService("light", on ? "turn_on" : "turn_off", { entity_id: ids });
        }
        catch (error) {
            console.error(this.t("lightActionError"), error);
        }
    }
    pendantLightColor(_lights) {
        // Decorative illumination is deliberately independent from RGB light colors.
        return "#ffe9bc";
    }
    renderPendant(on, brightness = 75, emission = "#fff4dd") {
        // The pendant keeps its signature silhouette. Its light and metallic details
        // follow the selected ControlRoom palette instead of hardcoded purple.
        const theme = this.crResolvedTheme();
        const accent = "#ffe7b5";
        const glowStrength = Math.min(0.72, Math.max(0.30, brightness / 145));
        const metal = theme.light ? "#373b43" : "#292b30";
        const metalShadow = theme.light ? "#17191e" : "#101115";
        const rim = theme.light ? "#626873" : "#555963";
        return b `<svg class="pendant" viewBox="0 0 150 180" aria-hidden="true">
      <defs>
        <radialGradient id="cr-ambient-glow">
          <stop offset="0" stop-color=${accent} stop-opacity=${on ? glowStrength : 0}/>
          <stop offset="1" stop-color=${accent} stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${rim}/>
          <stop offset=".5" stop-color=${metalShadow}/>
          <stop offset="1" stop-color=${metal}/>
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="127" rx="74" ry="52" fill="url(#cr-ambient-glow)"/>
      <path d="M75 0V54" stroke=${rim} stroke-width="2"/>
      <rect x="69" y="51" width="12" height="12" rx="3" fill=${metalShadow}/>
      <path d="M69 60Q45 69 31 111Q75 127 119 111Q105 69 81 60Z"
        fill="url(#cr-metal)" stroke=${rim}/>
      <ellipse cx="75" cy="111" rx="44" ry="8" fill=${on ? "#b79a6a" : metal}/>
      <ellipse cx="75" cy="112" rx="26" ry="4" fill=${on ? emission : rim} opacity=${on ? "0.95" : "0.35"}/>
    </svg>`;
    }
    renderLightsCard() {
        const lights = this.getLights();
        const on = lights.filter(l => l.state === "on").length;
        const available = lights.filter(l => l.state === "on" || l.state === "off").length;
        const lit = lights.filter(l => l.state === "on");
        const avg = lit.length ? lit.reduce((n, l) => n + this.getBrightness(l), 0) / lit.length : 0;
        const language = this.getLanguage();
        const mood = on === 0
            ? (language === "de" ? "Alles ruhig" : language === "pt" ? "Tudo tranquilo" : "Peaceful")
            : on === available
                ? (language === "de" ? "Alles erstrahlt" : language === "pt" ? "Tudo iluminado" : "All illuminated")
                : (language === "de" ? "Gemütlich" : language === "pt" ? "Aconchegante" : "Cozy ambience");
        const countLabel = language === "de"
            ? `${on} von ${available} Lichtern an`
            : language === "pt"
                ? `${on} de ${available} luzes acesas`
                : `${on} of ${available} lights on`;
        return b `
      <article class="overview-card lights-card premium-lights ${on ? "has-light" : ""}">
        <div class="pendant-corner">${this.renderPendant(on > 0, avg, this.pendantLightColor(lights))}</div>
        <div class="premium-lights-content">
          <div class="card-icon">${this.renderIcon("mdi:lightbulb-on-outline")}</div>
          <div class="card-title">${this.t("lights")}</div>
          <div class="premium-mood">${mood}</div>
          <div class="premium-light-status">
            <span class="premium-status-dot ${on ? "lit" : ""}"></span>
            <span>${countLabel}</span>
          </div>
          <div class="premium-actions premium-actions-three">
            <button type="button" class="glass-action" ?disabled=${!available || on === available || !this.hass?.callService}
              @click=${() => this.setAllLights(true, lights)}>
              ${this.renderIcon("mdi:weather-sunny")} ${this.t("allOn")}
            </button>
            <button type="button" class="glass-action" ?disabled=${!on || !this.hass?.callService}
              @click=${() => this.setAllLights(false, lights)}>
              ${this.renderIcon("mdi:weather-night")} ${this.t("allOff")}
            </button>
            <button type="button" class="glass-action premium-light-link" @click=${() => this.navigate("lights")}>
              ${this.t("lighting")} ${this.renderIcon("mdi:arrow-right")}
            </button>
          </div>

        </div>
      </article>
    `;
    }
    renderLightsPage() {
        const lights = this.getLights();
        const on = lights.filter(l => l.state === "on").length;
        const available = lights.filter(l => l.state === "on" || l.state === "off");
        const rooms = [...new Set(lights.map(l => this.getLightRoom(l)))].sort((a, b) => a.localeCompare(b, this.getLanguage()));
        const filtered = this.selectedRoom ? lights.filter(l => this.getLightRoom(l) === this.selectedRoom) : lights;
        const avg = on ? lights.filter(l => l.state === "on").reduce((n, l) => n + this.getBrightness(l), 0) / on : 0;
        return b `
      <section class="lighting-studio">
        <div class="studio-heading">
          <div class="studio-heading-left"><button class="studio-back" @click=${() => this.navigate("home")} aria-label=${this.t("home")}>${this.renderIcon("mdi:arrow-left")}</button><div><div class="eyebrow">CONTROLROOM / SMART HOME</div>
            <h1>${this.t("lighting")}</h1></div></div>
          <button class="studio-settings" @click=${() => this.visibilitySettingsOpen = !this.visibilitySettingsOpen} aria-label="Sichtbarkeit & Darstellung">${this.renderIcon("mdi:tune-variant")}</button>
          <span class="studio-total">${on} ${this.t("lightsOn")} · ${available.length - on} ${this.t("lightsOff")}</span>
        </div>
        ${this.visibilitySettingsOpen ? this.renderLightingPreferences() : A}
        <div class="studio-hero ${on ? "lit" : ""}">
          <div class="studio-hero-info">
            <div class="studio-kicker">${this.getLanguage() === "de" ? "LICHTSTIMMUNG" : this.getLanguage() === "pt" ? "ATMOSFERA DE LUZ" : "LIGHT AMBIENCE"}</div>
            <div class="studio-mood">${on === 0
            ? (this.getLanguage() === "de" ? "Alles in Ruhe" : this.getLanguage() === "pt" ? "Tudo tranquilo" : "Peaceful ambience")
            : on === available.length
                ? (this.getLanguage() === "de" ? "Alles erstrahlt" : this.getLanguage() === "pt" ? "Tudo iluminado" : "Beautifully illuminated")
                : (this.getLanguage() === "de" ? "Gemütlich beleuchtet" : this.getLanguage() === "pt" ? "Iluminação aconchegante" : "Warm and inviting")}</div>
            <div class="studio-mood-subtitle">${on === 0
            ? (this.getLanguage() === "de" ? "Dein Zuhause genießt eine kleine Lichtpause." : this.getLanguage() === "pt" ? "Sua casa descansa em uma atmosfera tranquila." : "Your home is enjoying a peaceful moment.")
            : (this.getLanguage() === "de" ? "Dein Zuhause leuchtet in deiner Stimmung." : this.getLanguage() === "pt" ? "Sua casa iluminada do seu jeito." : "Your home, illuminated your way.")}</div>
            <div class="studio-progress" role="progressbar" aria-label=${this.getLanguage() === "de" ? "Anteil eingeschalteter Lichter" : this.getLanguage() === "pt" ? "Proporção de luzes acesas" : "Proportion of lights on"}
              aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(available.length ? Math.round(on / available.length * 100) : 0)}
              title=${`${on} / ${available.length} ${this.t("lightsOn")}`}>
              <span style=${`width:${available.length ? on / available.length * 100 : 0}%`}></span>
            </div>
            <div class="studio-actions">
              <button ?disabled=${!this.hass?.callService} @click=${() => this.setAllLights(true, lights)}>${this.renderIcon("mdi:weather-sunny")}${this.t("allOn")}</button>
              <button ?disabled=${!this.hass?.callService} @click=${() => this.setAllLights(false, lights)}>${this.renderIcon("mdi:weather-night")}${this.t("allOff")}</button>
            </div>
          </div>
          <div class="studio-pendant">${this.renderPendant(on > 0, avg, this.pendantLightColor(lights))}</div>
        </div>
        <div class="ambient-rooms">
          ${rooms.map(room => {
            const roomLights = lights.filter(l => this.getLightRoom(l) === room);
            const roomOn = roomLights.filter(l => l.state === "on").length;
            return b `<button type="button" class="ambient-room ${roomOn ? "illuminated" : ""}"
              @click=${() => { this.selectedRoom = room; this.openLightColorId = ""; this.lightsTab = "lights"; }}>
              <span class="ambient-room-glow"></span>
              <span class="ambient-room-art" aria-hidden="true">${this.lightingDiorama(room, roomOn > 0)}</span>
              <span class="ambient-room-details"><span class="ambient-room-name">${room}</span>
              <span class="ambient-room-count"><span class="ambient-room-status ${roomOn ? "is-on" : ""}"></span>${roomOn} / ${roomLights.length} ${this.getLanguage() === "de" ? "an" : this.getLanguage() === "pt" ? "acesas" : "on"}</span></span>
            </button>`;
        })}
        </div>
        <div class="studio-tabs">
          <button class=${this.lightsTab === "lights" ? "active" : ""} @click=${() => this.lightsTab = "lights"}>${this.t("lights")}</button>
          <button class=${this.lightsTab === "groups" ? "active" : ""} @click=${() => this.lightsTab = "groups"}>${this.t("groups")}</button>
        </div>
        ${this.lightsTab === "groups" ? b `
          <div class="studio-empty">${this.renderIcon("mdi:lightbulb-group-outline")} ${this.t("groupsLater")}</div>
        ` : b `
          <div class="room-filters">
            <button class=${!this.selectedRoom ? "active" : ""} @click=${() => this.selectedRoom = ""}>${this.t("allRooms")}</button>
            ${rooms.map(room => b `<button class=${this.selectedRoom === room ? "active" : ""}
              @click=${() => { this.selectedRoom = room; this.openLightColorId = ""; }}>${room}</button>`)}
          </div>
          <div class="studio-grid">
            ${filtered.map(light => {
            const active = light.state === "on";
            const available = active || light.state === "off";
            const brightnessEnabled = active && this.supportsBrightness(light) && this.showInlineBrightness;
            const hasColor = this.supportsColor(light) || this.supportsColorTemperature(light);
            const colorOpen = active && this.openLightColorId === light.entity_id;
            const minK = typeof light.attributes.min_color_temp_kelvin === "number" ? light.attributes.min_color_temp_kelvin : 2000;
            const maxK = typeof light.attributes.max_color_temp_kelvin === "number" ? light.attributes.max_color_temp_kelvin : 6500;
            return b `<article class="studio-light ${active ? "active" : ""} ${brightnessEnabled ? "with-brightness" : ""}">
                <div class="studio-light-top">
                  <span class="studio-light-icon">${this.renderIcon(active ? "mdi:lightbulb-on" : "mdi:lightbulb-outline")}</span>
                  <span class="studio-light-name" title=${this.getLightName(light)}>${this.getLightName(light)}</span>
                  <button type="button" class="studio-toggle ${active ? "on" : ""}"
                    ?disabled=${!available || !this.hass?.callService}
                    aria-label=${`${this.t("toggleLight")}: ${this.getLightName(light)}`}
                    aria-pressed=${active ? "true" : "false"} @click=${() => { if (active && this.openLightColorId === light.entity_id)
                this.openLightColorId = ""; void this.toggleLight(light); }}>
                    ${this.renderIcon(active ? "mdi:check-circle" : "mdi:circle-outline")}
                  </button>
                </div>
                ${this.showStatusDescriptions ? b `<span class="studio-light-state-inline">${available ? this.t(active ? "lightsOn" : "lightsOff") : this.t("lightUnavailable")}</span>` : A}
                ${this.showTypeDescriptions ? b `<span class="studio-light-room">${this.getGroupMembers(light).length ? `Gruppe · ${this.getGroupMembers(light).length} Lampen` : "Einzellicht"}</span>` : A}
                ${brightnessEnabled ? b `
                  <div class="studio-inline-brightness">
                    <input class="studio-inline-slider" type="range" min="1" max="100"
                      .value=${String(this.getBrightness(light))}
                      style=${`--light-level:${this.getBrightness(light)}%`}
                      aria-label=${`${this.t("brightness")}: ${this.getLightName(light)}`}
                      ?disabled=${!this.hass?.callService}
                      @change=${(e) => this.setLightBrightness(light, Number(e.target.value))}/>
                    <span class="studio-inline-value">${this.getBrightness(light)}%</span>
                    ${hasColor ? b `<button type="button" class="studio-color-trigger ${colorOpen ? "open" : ""}"
                      title=${this.getLanguage() === "de" ? "Lichtfarbe" : "Cor da luz"}
                      aria-label=${this.getLanguage() === "de" ? "Lichtfarbe" : "Cor da luz"}
                      aria-expanded=${colorOpen ? "true" : "false"}
                      @click=${() => this.openLightColorId = colorOpen ? "" : light.entity_id}>
                      ${this.renderIcon("mdi:palette-outline")}</button>` : A}
                  </div>
                ` : active && hasColor ? b `<button class="studio-color-trigger studio-color-alone" @click=${() => this.openLightColorId = colorOpen ? "" : light.entity_id}>${this.renderIcon("mdi:palette-outline")}</button>` : A}
                ${colorOpen ? b `<div class="studio-inline-colors">
                  ${this.supportsColor(light) ? b `<div class="studio-inline-color-line">
                    <span>${this.getLanguage() === "de" ? "Farbe" : "Cor"}</span>
                    <input type="color" class="studio-color-picker" .value=${this.getColorHex(light)}
                      aria-label=${this.getLanguage() === "de" ? "Lichtfarbe" : "Cor da luz"}
                      @change=${(e) => this.setLightColor(light, e.target.value)}/>
                  </div>` : A}
                  ${this.supportsColorTemperature(light) ? b `<div class="studio-inline-color-line">
                    <span>${this.getLanguage() === "de" ? "Weißtemperatur" : "Temperatura"}</span>
                    <input type="range" class="studio-inline-slider" min=${String(minK)} max=${String(maxK)}
                      .value=${String(typeof light.attributes.color_temp_kelvin === "number" ? light.attributes.color_temp_kelvin : 4000)}
                      aria-label=${this.getLanguage() === "de" ? "Weißtemperatur" : "Temperatura"}
                      @change=${(e) => this.setLightTemperature(light, Number(e.target.value))}/>
                  </div>` : A}
                </div>` : A}
              </article>`;
        })}
          </div>
          ${!filtered.length ? b `<div class="studio-empty">${this.t("noLights")}</div>` : A}
        `}
      </section>
    `;
    }
    renderSidebar() {
        return b `
      <aside class="sidebar ${this.mobileMenuOpen ? "open" : ""}">
        <div class="brand">
          <div class="brand-symbol" aria-label="ControlRoom">
            <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
              <path d="M24 3 40 12v18L24 44 8 34V16Z" fill="none" stroke="#d7b783" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M30 15 22 11 14 18v14l10 7" fill="none" stroke="#f5f0e9" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 22h9v9l-8 5" fill="none" stroke="#d7b783" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="32" cy="22" r="2" fill="#f5f0e9"/>
            </svg>
          </div>
          <div>
            <div class="brand-name">ControlRoom</div>
            <div class="brand-subtitle">
              ${this.t("brandSubtitle")}
            </div>
          </div>
        </div>

        <div class="navigation-label">
          ${this.t("navigation")}
        </div>

        <nav class="navigation">
          ${pages.map((page) => b `
              <button
                class="nav-item ${this.activePage === page.id
            ? "active"
            : ""}"
                type="button"
                @click=${() => this.navigate(page.id)}
              >
                ${this.renderIcon(page.icon)}
                <span>${this.t(page.id)}</span>
              </button>
            `)}
        </nav>

        <div class="sidebar-bottom">
          <div class="user-avatar">
            ${(this.hass?.user?.name || "U")
            .charAt(0)
            .toUpperCase()}
          </div>
          <div class="user-details">
            <div class="user-name">
              ${this.hass?.user?.name || "Home Assistant"}
            </div>
            <div class="user-status">
              <span class="small-dot"></span>
              ${this.hass ? this.t("online") : this.t("offline")}
            </div>
          </div>
        </div>
      </aside>
    `;
    }
    renderHome() {
        const cards = [
            { key: "energy", icon: "mdi:lightning-bolt" },
            { key: "rooms", icon: "mdi:floor-plan" },
            { key: "climate", icon: "mdi:thermostat" },
            { key: "security", icon: "mdi:shield-check-outline" }
        ];
        const currentPerson = this.welcomeMode === "shared" ? undefined : this.getCurrentPerson();
        const otherPeople = this.getPeople().filter(person => !currentPerson || person.entity_id !== currentPerson.entity_id);
        const greetingName = currentPerson ? this.getPersonName(currentPerson) : this.hass?.user?.name || "";
        return b `
      <section class="hero">
        ${this.welcomeShowEyebrow ? b `<div class="eyebrow">${this.welcomeEyebrow || this.t("homeLabel")}</div>` : A}
        <div class="hero-content">
          <div class="hero-message">
            ${this.welcomeShowGreeting ? b `<div class="welcome-title">
              ${currentPerson ? this.renderPersonAvatar(currentPerson, true) : A}
              <h1>${this.getGreeting()}${this.welcomeMode === "shared" ? "." : greetingName ? `, ${greetingName}` : "."}</h1>
            </div>` : A}
            ${this.welcomeShowSubtitle ? b `<p>${this.welcomeSubtitle || this.t("subtitle")}</p>` : A}
          </div>
          ${this.renderPeoplePills(otherPeople)}
        </div>
      </section>

      <section class="overview-grid">
        ${cards.map((card) => b `
            <article class="overview-card">
              <div class="card-icon">
                ${this.renderIcon(card.icon)}
              </div>
              <div>
                <div class="card-title">${this.t(card.key)}</div>
                <div class="card-subtitle">
                  ${this.t("comingSoon")}
                </div>
              </div>
            </article>
          `)}
        ${this.renderLightsCard()}
      </section>
    `;
    }
    crThemeData() { return { theme: this.crTheme, style: this.crThemeStyle, source: "controlroom", haTheme: "", haMode: "auto" }; }
    crPalettes() {
        return [
            { id: "black-gold-royal", name: "Black & Gold · Imperial", accent: "#D9B76E", bg: "#050505", surface: "#18140D", text: "#E8C77D" },
            { id: "black-bordeaux-royal", name: "Black & Bordeaux · Prestige", accent: "#C35B76", bg: "#050505", surface: "#1B0D13", text: "#E3A0B1" },
            { id: "purple", name: "Royal Purple", accent: "#a477f5", bg: "#111019", surface: "#282037", text: "#f6f3fb" },
            { id: "blue", name: "Midnight Blue", accent: "#559cff", bg: "#0c1628", surface: "#1c304b", text: "#f5f8ff" },
            { id: "emerald", name: "Emerald", accent: "#43c6a0", bg: "#0c1b19", surface: "#1c3530", text: "#f2fff9" },
            { id: "burgundy", name: "Burgundy", accent: "#ce6c90", bg: "#221219", surface: "#3a222d", text: "#fff4f7" },
            { id: "rose-noir", name: "Rose Noir", accent: "#e3a04b", bg: "#190d17", surface: "#301823", text: "#fff1f4" },
            { id: "gold", name: "Champagne Gold", accent: "#b8ab92", bg: "#1b1b1a", surface: "#2c2b29", text: "#fff9ed" },
            { id: "pearl", name: "Pearl White", accent: "#7664a9", bg: "#f5f3f8", surface: "#ffffff", text: "#30283a" },
            { id: "obsidian", name: "Obsidian", accent: "#b6b9c2", bg: "#101114", surface: "#25272c", text: "#f6f6f8" },
            { id: "sapphire", name: "Sapphire Night", accent: "#70a9ed", bg: "#081425", surface: "#162b43", text: "#f1f7ff" },
            { id: "forest", name: "Forest Luxe", accent: "#b2c79a", bg: "#101c18", surface: "#24382d", text: "#f5f7ef" },
            { id: "terracotta", name: "Terracotta Atelier", accent: "#b85e48", bg: "#faf1e8", surface: "#fffaf5", text: "#322820" },
            { id: "sand", name: "Desert Sand", accent: "#96734b", bg: "#f4e9d7", surface: "#fff9ed", text: "#312b22" },
            { id: "ocean", name: "Ocean Mist", accent: "#277c8c", bg: "#e8f4f4", surface: "#f9ffff", text: "#18323b" },
            { id: "amethyst", name: "Amethyst Velvet", accent: "#c2a1eb", bg: "#1b1429", surface: "#322440", text: "#faf3ff" },
            { id: "copper", name: "Copper Noir", accent: "#d59a72", bg: "#171513", surface: "#30251f", text: "#fff4e9" },
            { id: "sage", name: "Sage Residence", accent: "#657b57", bg: "#f0f2e9", surface: "#fcfdf8", text: "#283229" },
            { id: "arctic", name: "Arctic Silver", accent: "#53778e", bg: "#edf2f6", surface: "#ffffff", text: "#1b2a36" },
            { id: "ruby", name: "Ruby Eclipse", accent: "#ed8794", bg: "#200e18", surface: "#3a202d", text: "#fff4f7" },
            { id: "lavender", name: "Lavender Cloud", accent: "#8068b0", bg: "#f3effa", surface: "#ffffff", text: "#2b2341" },
            { id: "graphite", name: "Graphite Studio", accent: "#c6d0d9", bg: "#171b20", surface: "#2b3038", text: "#f6f8fb" },
            // Signature collections: contrasting ink, metals, jewels, pastels and unexpected pairings.
            // The text color is deliberately a design choice, not always white or charcoal.
            ...(() => {
                const signatures = [
                    ["Black & Gold", "#d9b765", "#090909", "#201b13", "#f2d58d"],
                    ["Bordeaux & Gold", "#e5bf75", "#2b091b", "#49172c", "#f5d99a"],
                    ["Onyx & Platinum", "#c9d1d8", "#090b0e", "#22272c", "#e8edf2"],
                    ["Silver Monochrome", "#555d67", "#e2e5e8", "#f9fafb", "#222830"],
                    ["Scarlet Opera", "#ffb3a6", "#690b16", "#a51928", "#fff0e8"],
                    ["Sunflower Silk", "#785016", "#fff19c", "#fffbd8", "#44300e"],
                    ["Golden Hour", "#53320b", "#f5c652", "#ffe9a0", "#392407"],
                    ["Ruby & Champagne", "#f3c6a0", "#3b0818", "#681b31", "#ffe2c0"],
                    ["Emerald & Brass", "#d8b76e", "#08251e", "#174437", "#f0d79c"],
                    ["Cobalt & Copper", "#e6a676", "#0a1a59", "#203b82", "#f5d3b5"],
                    ["Ivory & Ink", "#242a34", "#f8f1e5", "#fffdf8", "#23262c"],
                    ["Midnight & Neon", "#7dffcf", "#080e18", "#142432", "#d8fff1"],
                    ["Cherry Lacquer", "#ffc4bf", "#530914", "#8f1c2d", "#ffe5e2"],
                    ["Citrus Noir", "#e7ee5b", "#11160c", "#30391a", "#f3f5b4"],
                    ["Lavender & Espresso", "#dfc2f8", "#261621", "#4c3048", "#f8e4ff"],
                    ["Coral & Teal", "#ff9a80", "#092e37", "#155263", "#ffe4d6"],
                    ["Rose & Chocolate", "#6b2e45", "#f4d6d9", "#fff1e9", "#562d3b"],
                    ["Copper Foundry", "#efad78", "#20100c", "#4b271c", "#ffe0b7"],
                    ["Pistachio Cream", "#496633", "#e9f2ca", "#fafbed", "#304629"],
                    ["Ultramarine Pop", "#ffd25d", "#1429a8", "#344bdb", "#fff2bc"],
                    ["Crimson & Ivory", "#fff1d9", "#8c1323", "#b8323b", "#fff3e1"],
                    ["Aubergine & Lime", "#d4f77a", "#26102d", "#4a2354", "#edffb3"],
                    ["Teal & Champagne", "#eacba1", "#07373b", "#17585b", "#fff0d8"],
                    ["Blush & Burgundy", "#7a2642", "#f9dfe6", "#fff3f5", "#672039"],
                    ["Ice & Vermilion", "#c53c28", "#e9f5ff", "#ffffff", "#233747"],
                    ["Saffron & Charcoal", "#ffcb45", "#17191d", "#303338", "#ffedb6"],
                    ["Peacock & Gold", "#e5c477", "#062a38", "#145267", "#ffe5a4"],
                    ["Lilac & Cobalt", "#3454aa", "#e8ddff", "#f7f2ff", "#30305e"],
                    ["Moss & Rose Gold", "#eab7a5", "#1a291b", "#354934", "#f8d8c8"],
                    ["Porcelain & Brass", "#8b662b", "#f9f8f3", "#ffffff", "#403625"],
                    ["Vermilion Studio", "#ffe1a5", "#a72616", "#d54a28", "#fff1d6"],
                    ["Butter & Graphite", "#292d35", "#ffe778", "#fff5bd", "#292d35"],
                    ["Fuchsia Night", "#ff85e1", "#210b28", "#4b1b4b", "#ffe3f8"],
                    ["Cerulean & Sand", "#e7c28c", "#073e73", "#176299", "#fff1d5"],
                    ["Olive & Terracotta", "#bc6248", "#eee9d0", "#faf7e7", "#463c29"],
                    ["Tangerine & Navy", "#ffae57", "#0b1a31", "#1b3552", "#ffe3bd"],
                    ["Mint & Espresso", "#163e34", "#bff4d8", "#e5fff0", "#173a32"],
                    ["Plum & Copper", "#df9a71", "#290e24", "#51203e", "#ffe0c9"],
                    ["Arctic & Electric", "#294bff", "#e9f1ff", "#ffffff", "#1b2c5d"],
                    ["Bronze & Midnight", "#c59b5c", "#101b24", "#293943", "#f0d4a1"],
                    ["Racing Green & Cream", "#f2dfb1", "#052e20", "#17533a", "#fff1cc"],
                    ["Petal & Graphite", "#33333b", "#f9c7d8", "#ffe6ee", "#3b2630"],
                    ["Lemon & Ink", "#f4ed53", "#11151d", "#2a303b", "#fffda9"],
                    ["Indigo & Apricot", "#ffb989", "#211747", "#42316b", "#ffe6d3"],
                    ["Wine & Sage", "#d7e6b1", "#40182d", "#63324b", "#f0f4d5"],
                    ["Pearl & Black", "#151515", "#f5f5f2", "#ffffff", "#151515"],
                    ["Steel & Amber", "#e5a645", "#29313a", "#44505c", "#ffdfa5"],
                    ["Lagoon & Flamingo", "#ff9fae", "#073b42", "#15616b", "#ffe4ea"],
                    ["Marigold & Plum", "#ffc54d", "#281126", "#4d2649", "#ffe7aa"],
                    ["Dusty Blue & Rust", "#a94d33", "#dbe6ed", "#f5f8f9", "#293b4b"],
                    ["Brick & Mint", "#b7ffe4", "#512319", "#7b3b2a", "#dcfff1"],
                    ["Chocolate & Vanilla", "#cfa56b", "#24180f", "#463023", "#ffe9c9"],
                    ["Turquoise & Ink", "#53eadb", "#0a1520", "#163344", "#d5fff8"],
                    ["Poppy & Cream", "#b72e28", "#fff0df", "#fffaf3", "#4e3028"],
                    ["Amethyst & Gold", "#e5c578", "#20102d", "#40274e", "#ffe7b0"],
                    ["Slate & Coral", "#ff9c89", "#182b3a", "#32475a", "#ffe5df"],
                    ["Jade & Ivory", "#205747", "#d9f4e9", "#f7fffb", "#183c32"],
                    ["Papaya & Orchid", "#6e2b71", "#ffd8b0", "#fff0db", "#552d55"],
                    ["Violet & Chartreuse", "#e4fa7d", "#2e1649", "#553070", "#f4ffc2"],
                    ["Flame & Carbon", "#ff734b", "#111214", "#302222", "#ffe1ce"],
                ];
                // Each subsequent collection changes the background and surface, not just the accent.
                // The permutation spreads signature families across every page instead of repeating triples.
                const families = ["Signature"];
                const hex = (value) => [1, 3, 5].map(k => parseInt(value.slice(k, k + 2), 16));
                const rgb = (values) => `#${values.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
                const mix = (a, b, t) => rgb(hex(a).map((v, k) => v * (1 - t) + hex(b)[k] * t));
                // Each signature appears once per collection. Families change the whole visual
                // composition, not just a tiny opacity shift. IDs stay stable for saved themes.
                const generated = Array.from({ length: signatures.length }, (_, i) => {
                    const signature = signatures[i % signatures.length];
                    const family = Math.floor(i / signatures.length);
                    const [name, accent, bg, surface, text] = signature;
                    const mode = family % 9;
                    const variants = [
                        [0, 0, 0], [.13, .27, .16], [.28, .49, .28], [.43, .15, .42],
                        [.08, .61, .08], [.35, .37, .54], [.56, .21, .22], [.20, .73, .40], [.47, .56, .10]
                    ];
                    const [accentBlend, bgBlend, surfaceBlend] = variants[mode];
                    // Stronger variations distinguish Velvet, Lacquer, Satin etc. even at thumbnail size.
                    const accent2 = mix(accent, text, accentBlend);
                    const bg2 = mix(bg, surface, bgBlend);
                    const surface2 = mix(surface, bg, surfaceBlend);
                    const finalAccent = family >= 9 ? mix(accent2, bg, (family - 8) * .018) : accent2;
                    const finalBg = family >= 9 ? mix(bg2, surface, (family - 8) * .032) : bg2;
                    const finalSurface = family >= 9 ? mix(surface2, bg, (family - 8) * .024) : surface2;
                    return { id: `signature-${String(i + 1).padStart(4, "0")}`, name: `${name} · ${families[family % families.length]} ${String(i + 1).padStart(4, "0")}`, accent: finalAccent, bg: finalBg, surface: finalSurface, text };
                });
                return generated;
            })(),
        ];
    }
    // V10: Resolve the selected HA theme locally. Never call setTheme() or mutate document styles.
    crResolvedTheme() {
        const palette = this.crPalettes().find(p => p.id === this.crTheme) || this.crPalettes()[0];
        const registry = this.hass?.themes;
        const selected = this.crHATheme || registry?.theme || "";
        const raw = registry?.themes?.[selected];
        const dark = this.crHAMode === "dark" || (this.crHAMode === "auto" && !!registry?.darkMode);
        const modes = raw?.["modes"];
        const mode = (modes?.[dark ? "dark" : "light"] || raw?.[dark ? "dark" : "light"] || {});
        const values = {};
        const assign = (obj) => {
            if (!obj)
                return;
            for (const [key, val] of Object.entries(obj)) {
                if (typeof val === "string" || typeof val === "number")
                    values[key.replace(/^--/, "")] = String(val).trim();
            }
        };
        assign(raw);
        assign(mode);
        // Resolve var(--some-token, fallback) inside theme definitions, including nested references.
        const resolve = (key, depth = 0) => {
            if (depth > 10)
                return "";
            let val = values[key] || "";
            if (!val)
                return "";
            return val.replace(/var\(\s*--([\w-]+)\s*(?:,\s*([^()]*))?\)/g, (_m, k, fallback) => resolve(k, depth + 1) || fallback?.trim() || "");
        };
        const ha = false;
        const fallback = ha ? (dark ? { accent: "#75a7dc", bg: "#141a22", surface: "#252d37", text: "#f4f6fa", muted: "#b7c0cc" } : { accent: "#386da6", bg: "#f5f6f9", surface: "#ffffff", text: "#202733", muted: "#586474" }) : { accent: palette.accent, bg: palette.bg, surface: palette.surface, text: palette.text, muted: palette.text };
        const pick = (defaultValue, ...keys) => {
            return defaultValue;
        };
        const accent = pick(fallback.accent, "accent-color", "primary-color", "state-icon-color");
        const bg = pick(fallback.bg, "lovelace-background", "primary-background-color");
        const surface = pick(fallback.surface, "ha-card-background", "card-background-color", "secondary-background-color");
        const fg = pick(fallback.text, "primary-text-color");
        const muted = ha ? pick(fallback.muted, "secondary-text-color", "disabled-text-color") : fallback.muted;
        const light = this.crIsLightColor(bg) || (ha && !/^#[0-9a-f]{3,8}$/i.test(bg) && !dark);
        // Some HA themes declare light text over a light background (or the inverse)
        // because their text variables are intended for a different surface.
        const luminance = (color) => {
            const v = color.trim();
            const hex = v.match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);
            let rgb = null;
            if (hex) {
                let h = hex[1];
                if (h.length === 3)
                    h = h.split("").map(c => c + c).join("");
                rgb = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
            }
            else {
                const m = v.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
                if (m)
                    rgb = [+m[1], +m[2], +m[3]];
            }
            if (!rgb)
                return null;
            const c = rgb.map(x => { const n = x / 255; return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4; });
            return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
        };
        const surfaceLum = luminance(surface) ?? luminance(bg);
        const bgLum = luminance(bg);
        const textLum = luminance(fg);
        const ratio = surfaceLum === null || textLum === null ? 99 : (Math.max(surfaceLum, textLum) + 0.05) / (Math.min(surfaceLum, textLum) + 0.05);
        const safeFg = ratio < 4.5 ? ((surfaceLum ?? (light ? 1 : 0)) > 0.18 ? "#17202b" : "#f7f8fc") : fg;
        const bgRatio = bgLum === null || textLum === null ? 99 : (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
        const bgFg = bgRatio < 4.5 ? ((bgLum ?? (light ? 1 : 0)) > 0.18 ? "#17202b" : "#f7f8fc") : fg;
        const onAccent = (luminance(accent) ?? 0.5) > 0.18 ? "#10151d" : "#ffffff";
        // HACS mode: neutral black/white controls, independent of the theme accent.
        const neutral = (value, defaultLight) => ((luminance(value) ?? (defaultLight ? 1 : 0)) > 0.179 ? "#111111" : "#ffffff");
        const neutralBg = neutral(bg, light);
        const neutralSurface = neutral(surface, light);
        const neutralButton = neutralBg === "#111111" ? "#111111" : "#ffffff";
        const neutralButtonText = neutralButton === "#111111" ? "#ffffff" : "#111111";
        const mutedLum = luminance(muted);
        const mutedRatio = surfaceLum === null || mutedLum === null ? 99 : (Math.max(surfaceLum, mutedLum) + 0.05) / (Math.min(surfaceLum, mutedLum) + 0.05);
        const safeMuted = ha ? (mutedRatio < 3 ? ((surfaceLum ?? (light ? 1 : 0)) > 0.18 ? "#485363" : "#bfc8d4") : muted) : muted;
        return { accent, bg, surface, fg: safeFg, bgFg, muted: safeMuted, onAccent, light, ha, resolve, pick, neutralBg, neutralSurface, neutralButton, neutralButtonText };
    }
    crThemeVars() {
        const t = this.crResolvedTheme();
        const radius = this.crThemeStyle === "minimal" ? "9px" : this.crThemeStyle === "solid" ? "15px" : "22px";
        const css = {
            "--cr-font-scale": String(this.crFontSize / 100), "--cr-accent": t.accent, "--cr-bg": t.bg, "--cr-surface": t.surface, "--cr-text": t.fg, "--cr-bg-text": t.bgFg, "--cr-on-accent": t.onAccent, "--cr-muted": t.muted, "--cr-secondary": `color-mix(in srgb, ${t.fg} 77%, ${t.accent} 23%)`,
            "--cr-neutral-bg": t.neutralBg, "--cr-neutral-surface": t.neutralSurface, "--cr-neutral-button": t.neutralButton, "--cr-neutral-button-text": t.neutralButtonText,
            "--cr-is-light": t.light ? "1" : "0", "--cr-radius": radius, "--cr-blur": this.crThemeStyle === "glass" ? "blur(22px)" : "none",
            "--primary-color": t.accent, "--accent-color": t.accent, "--primary-text-color": t.fg, "--secondary-text-color": t.muted,
            "--primary-background-color": t.bg, "--card-background-color": t.surface, "--ha-card-background": t.surface,
            "--paper-item-icon-color": t.accent, "--state-icon-color": t.accent, "--mdc-theme-primary": t.accent, "--mdc-theme-on-primary": t.onAccent
        };
        if (t.ha) {
            // Forward *all* theme tokens to this dashboard's subtree (glass, border, shadow, etc.).
            const registry = this.hass?.themes;
            const raw = registry?.themes?.[this.crHATheme || registry?.theme || ""];
            const dark = this.crHAMode === "dark" || (this.crHAMode === "auto" && !!registry?.darkMode);
            const modes = raw?.["modes"];
            const mode = (modes?.[dark ? "dark" : "light"] || raw?.[dark ? "dark" : "light"] || {});
            for (const source of [raw, mode])
                for (const [key, value] of Object.entries(source || {})) {
                    if ((typeof value === "string" || typeof value === "number") && !key.startsWith("modes")) {
                        const name = `--${key.replace(/^--/, "")}`;
                        css[name] = String(value);
                    }
                }
            // Semantic values win over theme aliases so ControlRoom components remain consistent.
            css["--primary-color"] = t.accent;
            css["--accent-color"] = t.accent;
            css["--primary-background-color"] = t.bg;
            css["--primary-text-color"] = t.fg;
            css["--secondary-text-color"] = t.muted;
            css["--card-background-color"] = t.surface;
            css["--paper-item-icon-color"] = t.accent;
            css["--state-icon-color"] = t.accent;
            css["--mdc-theme-primary"] = t.accent;
            css["--mdc-theme-on-primary"] = t.onAccent;
            css["--ha-card-background"] = t.surface;
        }
        return Object.entries(css).map(([key, value]) => `${key}:${value}`).join(";") + ";";
    }
    crThemeIsLight() { return this.crResolvedTheme().light; }
    crIsLightColor(color) {
        const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (!hex)
            return false;
        const raw = hex[1].length === 3 ? hex[1].split("").map(c => c + c).join("") : hex[1];
        const n = parseInt(raw, 16);
        return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) > 145;
    }
    crAvailableHAThemes() {
        const themes = this.hass?.themes?.themes;
        return themes ? Object.keys(themes).sort((a, b) => a.localeCompare(b)) : [];
    }
    async loadRemoteCRTheme() {
        const user = this.hass?.user?.id;
        if (!user || !this.hass?.callWS || this.crRemoteLoading)
            return;
        this.crRemoteLoading = true;
        try {
            this.crRestoreFont(user);
            const result = await this.hass.callWS({ type: "controlroom_preferences/get" });
            if (this.hass?.user?.id !== user)
                return;
            const valid = (v) => typeof v === "string" && this.crPalettes().some(p => p.id === v);
            const style = (v) => v === "glass" || v === "solid" || v === "minimal";
            if (valid(result.theme))
                this.crTheme = result.theme;
            if (style(result.style))
                this.crThemeStyle = result.style;
            if (valid(result.default_theme))
                this.crDefaultTheme = result.default_theme;
            if (style(result.default_style))
                this.crDefaultStyle = result.default_style;
            const remoteFont = this.crValidFont(result.font_size);
            if (remoteFont !== null) {
                this.crFontSize = remoteFont;
                try {
                    localStorage.setItem(this.crFontCacheKey(user), String(remoteFont));
                }
                catch { /* storage blocked */ }
            }
            this.cacheVerifiedTheme(user);
            this.crRemoteUser = user;
            this.crRemoteReady = true;
            this.requestUpdate();
        }
        catch (error) {
            // Integration missing: retain local settings, retry after a later HA reload.
            this.crRemoteUser = user;
            this.crRemoteReady = true;
            this.requestUpdate();
            console.warn("ControlRoom Preferences: install/configure integration", error);
        }
        finally {
            this.crRemoteLoading = false;
        }
    }
    async persistRemoteCRTheme(makeDefault = false) {
        if (!this.hass?.callWS || !this.hass.user?.id) {
            this.crDefaultFeedback = "Home Assistant Verbindung erforderlich";
            return false;
        }
        this.crRemoteSaving = true;
        try {
            await this.hass.callWS({ type: "controlroom_preferences/set", theme: this.crTheme, style: this.crThemeStyle, default: makeDefault });
            this.crRemoteReady = true;
            this.cacheVerifiedTheme(this.hass.user.id);
            if (makeDefault) {
                this.crDefaultTheme = this.crTheme;
                this.crDefaultStyle = this.crThemeStyle;
            }
            this.crDefaultFeedback = makeDefault ? "Als Standard gespeichert ✓" : "Gespeichert ✓";
            this.requestUpdate();
            return true;
        }
        catch (error) {
            this.crDefaultFeedback = "Synchronisierung fehlgeschlagen – ControlRoom Preferences prüfen";
            console.warn("ControlRoom Preferences: save failed", error);
            this.requestUpdate();
            return false;
        }
        finally {
            this.crRemoteSaving = false;
        }
    }
    cancelCRTheme() {
        if (this.crThemeSnapshot) {
            const v = JSON.parse(this.crThemeSnapshot);
            this.crTheme = v.theme;
            this.crThemeStyle = v.style;
            this.crThemeSource = "controlroom";
            this.crHATheme = "";
            this.crHAMode = "auto";
            try {
                localStorage.setItem("controlroom-theme-v1", this.crThemeSnapshot);
            }
            catch (error) {
                console.warn(error);
            }
        }
        this.crDefaultFeedback = "";
        this.settingsSection = "overview";
    }
    previewAndPersistCRTheme() {
        try {
            localStorage.setItem("controlroom-theme-v1", JSON.stringify(this.crThemeData()));
        }
        catch (error) {
            console.warn("ControlRoom: theme preview could not be persisted", error);
        }
        this.crDefaultFeedback = "";
        this.requestUpdate();
    }
    async saveCRTheme() {
        if (!(await this.persistRemoteCRTheme(false)))
            return;
        try {
            localStorage.setItem("controlroom-theme-v1", JSON.stringify(this.crThemeData()));
        }
        catch (error) {
            console.warn(error);
        }
        this.crThemeSnapshot = JSON.stringify(this.crThemeData());
        this.settingsSection = "overview";
    }
    async setCRThemeAsDefault() {
        if (!(await this.persistRemoteCRTheme(true)))
            return;
        const payload = JSON.stringify(this.crThemeData());
        try {
            localStorage.setItem("controlroom-theme-default-v1", payload);
            localStorage.setItem("controlroom-theme-v1", payload);
        }
        catch (error) {
            console.warn(error);
        }
        this.crThemeSnapshot = payload;
    }
    renderThemeSettings() {
        // Show only one entry per visually equivalent palette; keep the selected palette visible.
        const rawPalettes = this.crPalettes();
        const seen = new Set();
        const all = rawPalettes.filter(p => {
            const key = [p.accent, p.bg, p.surface, p.text].map(v => v.toLowerCase()).join("|");
            if (seen.has(key) && p.id !== this.crTheme)
                return false;
            seen.add(key);
            return true;
        });
        const query = this.crThemeSearch.trim().toLocaleLowerCase();
        const filtered = all.filter(p => {
            if (query && !p.name.toLocaleLowerCase().includes(query))
                return false;
            if (this.crThemeFilter === "light" && !this.crIsLightColor(p.bg))
                return false;
            if (this.crThemeFilter === "dark" && this.crIsLightColor(p.bg))
                return false;
            if (this.crThemeFilter === "favorites" && !["purple", "blue", "emerald", "burgundy", "rose-noir", "gold", "pearl", "obsidian"].includes(p.id))
                return false;
            return true;
        });
        const perPage = 24;
        const pages = Math.max(1, Math.ceil(filtered.length / perPage));
        const page = Math.min(this.crThemePage, pages - 1);
        const visible = filtered.slice(page * perPage, (page + 1) * perPage);
        const selected = all.find(p => p.id === this.crTheme) || all[0];
        return b `<div class="settings-center cr-theme-studio cr-theme-studio-v17">
      <div class="cr-atelier-heading"><button class="cr-atelier-back" type="button" title="Zurück zu Einstellungen" aria-label="Zurück zu Einstellungen" @click=${() => this.cancelCRTheme()}>${this.renderIcon("mdi:arrow-left")}</button><div><div class="cr-room-kicker">CONTROLROOM · DESIGN COLLECTION</div><h2>Theme Atelier</h2><p>${all.length} Farbwelten · Dein persönlicher Look.</p></div></div>
      <div class="cr-theme-current"><span class="cr-theme-current-swatch" style=${`background:linear-gradient(135deg,${selected.bg},${selected.surface} 58%,${selected.accent})`}></span><span><small>AKTUELLE AUSWAHL</small><strong>${selected.name}</strong><small>${this.crThemeStyle === "glass" ? "Glass Premium" : this.crThemeStyle === "solid" ? "Modern Solid" : "Minimal"}</small></span><span class="cr-current-default-indicator">${this.crDefaultTheme === this.crTheme && this.crDefaultStyle === this.crThemeStyle ? b `★ Standard` : A}</span></div>
      ${this.crDefaultFeedback ? b `<div class="cr-default-feedback" role="status">${this.crDefaultFeedback}</div>` : A}
      <section class="cr-style-gallery" aria-label="Visual Style"><div class="cr-style-gallery-head"><span class="cr-room-kicker">OBERFLÄCHEN · LIVE-VORSCHAU</span><h3>Visual Style</h3><p>Wähle die Oberfläche – die Vorschau übernimmt deine aktuelle Farbwelt.</p></div><div class="cr-theme-style-list">${[['glass', 'Glass Premium', 'Transparenz und weiche Glaseffekte'], ['solid', 'Modern Solid', 'Klare, elegante Oberflächen'], ['minimal', 'Minimal', 'Reduziert und kompakt']].map(([id, title, desc]) => b `<button type="button" class="cr-style-option ${id} ${this.crThemeStyle === id ? 'chosen' : ''}" aria-pressed=${this.crThemeStyle === id ? 'true' : 'false'} @click=${() => { this.crThemeStyle = id; this.previewAndPersistCRTheme(); }}><span class="cr-style-scene"><span class="cr-style-scene-header"><i></i><i></i><i></i></span><span class="cr-style-scene-body"><span class="cr-style-scene-main"><i></i><i></i><i></i></span><span class="cr-style-scene-side"><i></i><i></i></span></span></span><span class="cr-style-option-info"><strong>${title}</strong><small>${desc}</small></span>${this.crThemeStyle === id ? b `<span class="cr-style-selected">${this.renderIcon("mdi:check-circle")}</span>` : A}</button>`)}</div></section>
      <div class="cr-theme-tools"><label class="cr-theme-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Farbwelt suchen …" .value=${this.crThemeSearch} @input=${(e) => { this.crThemeSearch = e.target.value; this.crThemePage = 0; }} /></label><div class="cr-theme-filters">${[['all', 'Alle'], ['favorites', 'Klassiker'], ['dark', 'Dunkel'], ['light', 'Hell']].map(([id, name]) => b `<button class=${this.crThemeFilter === id ? 'active' : ''} @click=${() => { this.crThemeFilter = id; this.crThemePage = 0; }}>${name}</button>`)}</div></div>
      <div class="cr-theme-collection-heading"><h3>Farbwelten</h3><span>${filtered.length} Designs · Seite ${page + 1} / ${pages}</span></div>
      <div class="cr-theme-grid">${visible.map(p => b `<button class="cr-theme-choice ${this.crTheme === p.id ? 'chosen' : ''}" @click=${() => { this.crTheme = p.id; this.crThemeSource = "controlroom"; this.previewAndPersistCRTheme(); }}><span class="cr-theme-preview" style=${`background:${p.bg};color:${p.text}`}><span style=${`background:${p.accent}`}></span><i style=${`background:${p.surface};color:${p.text}`}></i><i style=${`background:${p.surface};color:${p.text}`}></i><em class="cr-theme-sample-text" style=${`color:${p.text}`}>Aa</em><b class="cr-theme-sample-action" style=${`background:${p.accent};border:1px solid ${p.text}55`}></b></span><strong>${p.name}</strong>${this.crTheme === p.id ? this.renderIcon("mdi:check-circle") : A}</button>`)}</div>
      ${filtered.length === 0 ? b `<p class="settings-note">Keine Farbwelt gefunden. Probiere einen anderen Suchbegriff.</p>` : A}
      ${pages > 1 ? b `<nav class="cr-theme-pagination" aria-label="Farbwelten Seiten"><button class="cr-page-nav cr-atelier-page-button" ?disabled=${page === 0} @click=${() => { this.crThemePage = Math.max(0, page - 1); }}><span>Zurück</span></button><div class="cr-page-center"><span class="cr-page-eyebrow">KOLLEKTION</span><label class="cr-page-select"><select aria-label="Seite auswählen" .value=${String(page)} @change=${(e) => { this.crThemePage = Number(e.target.value); }}>${Array.from({ length: pages }, (_, i) => b `<option value=${String(i)}>Seite ${i + 1} / ${pages}</option>`)}</select>${this.renderIcon("mdi:chevron-down")}</label><div class="cr-page-progress"><span style=${`width:${((page + 1) / pages) * 100}%`}></span></div></div><button class="cr-page-nav cr-atelier-page-button" ?disabled=${page >= pages - 1} @click=${() => { this.crThemePage = Math.min(pages - 1, page + 1); }}><span>Weiter</span></button></nav>` : A}

      <div class="cr-theme-actions"><span class="cr-theme-action-caption">${selected.name}${this.crDefaultTheme === this.crTheme && this.crDefaultStyle === this.crThemeStyle ? " · Standard" : ""}</span><button type="button" class="cr-set-default" @click=${() => this.setCRThemeAsDefault()}>${this.renderIcon(this.crDefaultTheme === this.crTheme && this.crDefaultStyle === this.crThemeStyle ? "mdi:star" : "mdi:star-outline")} ${this.crDefaultTheme === this.crTheme && this.crDefaultStyle === this.crThemeStyle ? "Als Standard gespeichert" : "Als Standard festlegen"}</button><button @click=${() => this.cancelCRTheme()}>Abbrechen</button><button @click=${() => this.saveCRTheme()}>Speichern</button></div>
    </div>`;
    }
    lightingDiorama(name, illuminated = false) {
        const normalized = name.trim().toLocaleLowerCase('de-DE');
        const unknown = !normalized || /^(ohne raum|unassigned|unknown|sem ambiente|no room)$/.test(normalized);
        const kind = unknown ? 'generic' : this.roomKind(name);
        const fallback = this.roomKind(name.replace(/raum$/i, 'zimmer'));
        const art = LIGHT_ROOM_TRANSPARENT[kind] || LIGHT_ROOM_TRANSPARENT[fallback] || LIGHT_ROOM_TRANSPARENT.generic;
        return b `<span class="cr-light-object-wrap"><img class="cr-light-object" src=${art} alt="" loading="lazy" decoding="async" /><span class="cr-light-emission" aria-hidden="true"></span></span>`;
    }
    roomKind(name) {
        const n = name.toLocaleLowerCase().replace(/([a-z])([A-Z])/g, "$1 $2").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const rules = [
            ["gastezimmer", /gastezimmer|gästezimmer|guest room|quarto de hospedes/], ["kinderzimmer", /kinderzimmer|kids room|nursery|quarto infantil/], ["fitnessraum", /fitnessraum|fitness room|gym|academia/], ["controlraum", /controlraum|controlroom|control room|technikraum|technical room|sala tecnica|sala de controle|serverraum|server room|hauszentrale|smart home hub/], ["pooltechnik", /pooltechnik|piscina tecnica|pumpenraum|pool equipment|pool plant/], ["heizungsraum", /heizungsraum|heizraum|boiler room|heating room|sala de aquecimento/], ["solartechnik", /solartechnik|solar room|pv technik|photovoltaik|inverterraum|sala solar/], ["wintergarten", /wintergarten|conservatory|jardim de inverno/], ["terrasse", /terrasse|terrace|terraco|patio/], ["pool", /pool|piscina|schwimmbad|swimming/], ["garten", /garten|garden|jardim|quintal/], ["wohnzimmer", /wohn|living|lounge|sala/], ["schlafzimmer", /schlaf|bedroom|quarto/],
            ["kuche", /kuche|kitchen|cozinha/], ["badezimmer", /bad|bath|banho|wc|toilet/],
            ["esszimmer", /esszimmer|dining|jantar/], ["balkon", /balkon|balcon/],
            ["flur", /flur|hall|eingang|corredor|foyer/], ["buro", /buro|office|escritorio|arbeitszimmer/],
            ["garage", /garage|garagem|carport/], ["keller", /keller|basement|por[aã]o|adega|cellar/],
            ["waschkuche", /wasch|laundry|lavanderia/], ["hobbyraum", /hobby|spielzimmer|game|fitness|gym/]
        ];
        return rules.find(([, pattern]) => pattern.test(n))?.[0] || "generic";
    }
    roomIcon(name) {
        const icons = { wohnzimmer: "mdi:sofa-outline", schlafzimmer: "mdi:bed-king-outline", kuche: "mdi:chef-hat", badezimmer: "mdi:bathtub-outline", esszimmer: "mdi:table-furniture", balkon: "mdi:flower-outline", flur: "mdi:door-open", buro: "mdi:desk", garage: "mdi:garage-variant", keller: "mdi:archive-outline", waschkuche: "mdi:washing-machine", hobbyraum: "mdi:controller-classic-outline", controlraum: "mdi:server-network", pool: "mdi:pool", garten: "mdi:flower-outline", pooltechnik: "mdi:pump", heizungsraum: "mdi:radiator", solartechnik: "mdi:solar-power", terrasse: "mdi:flower-outline", wintergarten: "mdi:greenhouse", gastezimmer: "mdi:bed-outline", kinderzimmer: "mdi:teddy-bear", fitnessraum: "mdi:dumbbell", generic: "mdi:home-outline" };
        return icons[this.roomKind(name)];
    }
    // V35: original, lightweight vector interiors. No external images or network requests.
    roomArt(areaId, name, premiumLighting = false) {
        const kind = this.roomKind(name);
        const interiors = {
            wohnzimmer: `<path d="M65 120h195v39H65z" fill="#716d5b"/><rect x="78" y="89" width="164" height="53" rx="13" fill="#a99b7e"/><rect x="89" y="99" width="65" height="36" rx="8" fill="#c3b69a"/><rect x="164" y="99" width="65" height="36" rx="8" fill="#c3b69a"/><path d="M79 135v17m161-17v17" stroke="#5c4e43" stroke-width="7"/><path d="M280 56v84" stroke="#b4a18a" stroke-width="5"/><path d="M263 74q18-32 35 0z" fill="#302f31"/><ellipse cx="280" cy="76" rx="19" ry="4" fill="#ffdda1"/><path d="M29 144v-40" stroke="#7d6753" stroke-width="6"/><path d="M29 109q-37-19-12-42 25 6 12 42m0 0q6-42 31-38 10 28-31 38" fill="#657d55"/><rect x="14" y="137" width="31" height="25" rx="5" fill="#98816c"/><rect x="121" y="148" width="78" height="9" rx="5" fill="#6d5342"/>`,
            badezimmer: `<rect x="71" y="106" width="176" height="54" rx="7" fill="#8d8274"/><rect x="82" y="114" width="155" height="15" rx="7" fill="#d7cdbb"/><path d="M157 119v-19q0-11 10-11t10 11" stroke="#d4c3a3" stroke-width="5" fill="none"/><circle cx="165" cy="67" r="42" fill="#272c2a" stroke="#b9a17a" stroke-width="5"/><circle cx="165" cy="67" r="35" fill="#7e897f" opacity=".27"/><path d="M265 65v86" stroke="#bba98f" stroke-width="5"/><path d="M265 79h28v54h-28" fill="#d5c8ad"/><rect x="34" y="142" width="34" height="24" rx="5" fill="#9a8570"/><path d="M50 143q-30-30-8-50 22 18 8 50m0 0q5-37 26-34 8 22-26 34" fill="#657f5e"/>`,
            schlafzimmer: `<rect x="58" y="78" width="204" height="67" rx="12" fill="#756759"/><rect x="66" y="104" width="190" height="50" rx="9" fill="#c2b19b"/><rect x="72" y="98" width="80" height="27" rx="9" fill="#eee0c5"/><rect x="164" y="98" width="80" height="27" rx="9" fill="#eee0c5"/><path d="M67 149v13m186-13v13" stroke="#56483d" stroke-width="7"/><rect x="15" y="122" width="38" height="29" rx="3" fill="#7a6552"/><rect x="270" y="122" width="38" height="29" rx="3" fill="#7a6552"/><path d="M34 119V88m254 31V88" stroke="#c0a88a" stroke-width="4"/><path d="M18 91q16-28 32 0zm254 0q16-28 32 0z" fill="#3e3b39"/><ellipse cx="34" cy="93" rx="16" ry="4" fill="#f9d79e"/><ellipse cx="288" cy="93" rx="16" ry="4" fill="#f9d79e"/>`,
            kuche: `<rect x="24" y="88" width="273" height="70" rx="5" fill="#64665b"/><rect x="24" y="88" width="273" height="12" rx="3" fill="#c7b9a3"/><path d="M94 103v53m85-53v53m-85-27h85m0-27v53" stroke="#999483" stroke-width="2"/><rect x="75" y="118" width="65" height="35" rx="2" fill="#494b45"/><path d="M102 23v35m108-35v35" stroke="#b6a994" stroke-width="3"/><path d="M78 68q24-38 48 0zm108 0q24-38 48 0z" fill="#343536"/><ellipse cx="102" cy="69" rx="24" ry="5" fill="#f9d79e"/><ellipse cx="210" cy="69" rx="24" ry="5" fill="#f9d79e"/><rect x="252" y="71" width="23" height="17" rx="3" fill="#a69b83"/>`,
            esszimmer: `<ellipse cx="164" cy="120" rx="100" ry="21" fill="#8e6b51"/><path d="M157 131v35m-34 0h70" stroke="#79563f" stroke-width="9"/><path d="M164 17v38" stroke="#aea39a" stroke-width="3"/><path d="M126 73q38-56 76 0z" fill="#393a39"/><ellipse cx="164" cy="74" rx="38" ry="7" fill="#ffdda1"/><path d="M46 120v35m0-32q-23-13-31 10v25m267-35q23-13 31 10v25" stroke="#897963" stroke-width="8" fill="none"/><rect x="134" y="103" width="24" height="10" rx="5" fill="#d2b69b"/>`,
            flur: `<rect x="40" y="128" width="246" height="12" rx="3" fill="#8f735d"/><path d="M61 139v26m203-26v26" stroke="#745945" stroke-width="7"/><rect x="110" y="38" width="94" height="84" rx="44" fill="#78877d" opacity=".35" stroke="#d4b38b" stroke-width="5"/><path d="M264 28v30" stroke="#a99d86" stroke-width="3"/><path d="M249 59q15-28 30 0z" fill="#373637"/><ellipse cx="264" cy="61" rx="15" ry="4" fill="#ffdda1"/><rect x="62" y="110" width="23" height="17" rx="3" fill="#b9a58d"/><path d="M73 112q-25-26-8-42 17 13 8 42m0 0q6-29 25-24 5 19-25 24" fill="#70845f"/>`,
            balkon: `<path d="M16 115h294m-270 0v48m42-48v48m42-48v48m42-48v48m42-48v48m42-48v48m42-48v48" stroke="#988b77" stroke-width="5"/><path d="M112 112q18-42 63-25l-9 54h-64z" fill="#b6a58d"/><path d="M116 143v19m45-21v21" stroke="#7c6653" stroke-width="7"/><rect x="194" y="133" width="57" height="9" rx="4" fill="#99785c"/><path d="M221 141v22" stroke="#99785c" stroke-width="6"/><rect x="44" y="140" width="32" height="23" rx="4" fill="#98836b"/><path d="M60 141q-39-42-12-61 23 20 12 61m0 0q10-46 35-32 4 24-35 32" fill="#6c845f"/><path d="M278 36v31" stroke="#b8a88f" stroke-width="3"/><path d="M263 70q15-25 30 0z" fill="#3b3b3b"/><ellipse cx="278" cy="71" rx="15" ry="4" fill="#ffdda1"/>`
        };
        // Detailed, layered SVG miniatures exclusively for Startseite > Lichter.
        // Bereiche > Räume continues using its original independent illustrations.
        const premium = {
            badezimmer: `<ellipse cx="172" cy="164" rx="135" ry="10" fill="#050b09" opacity=".27"/>
        <path d="M66 111h188v12H66z" fill="#e0d4bf"/><path d="M73 123h174v40H73z" fill="#786e60"/><path d="M73 123h174v5H73z" fill="#aa9b83"/><path d="M160 129v34" stroke="#554d43" opacity=".5"/><path d="M73 161h174" stroke="#413b34" stroke-width="3"/>
        <ellipse cx="164" cy="117" rx="47" ry="10" fill="#f1e8d8"/><ellipse cx="164" cy="115" rx="31" ry="5" fill="#b8b4a8"/><path d="M164 113V99q0-9 8-9t8 9" fill="none" stroke="#bda47a" stroke-width="4"/>
        <circle cx="164" cy="59" r="45" fill="#171e1c" stroke="#dbc19a" stroke-width="7"/><circle cx="164" cy="59" r="37" fill="#5e6e66" opacity=".27"/><path d="M139 33q23-13 43 0" fill="none" stroke="#fff6dc" stroke-opacity=".17" stroke-width="4"/>
        <path d="M277 72v79" stroke="#ae9471" stroke-width="5"/><path d="M278 85h24v51h-24" fill="#d5c3a8"/><path d="M278 85h24v6h-24" fill="#f5e7d0"/>
        <rect x="31" y="141" width="33" height="23" rx="5" fill="#a28a71"/><path d="M47 143q-33-27-13-50 25 13 13 50m0 0q6-36 30-33 7 24-30 33" fill="#677f5d"/><rect x="221" y="99" width="11" height="13" rx="2" fill="#c7b89b"/><rect x="223" y="96" width="7" height="4" rx="1" fill="#d9c6a1"/>`,
            wohnzimmer: `<ellipse cx="166" cy="164" rx="155" ry="11" fill="#050b09" opacity=".25"/>
        <path d="M72 107q0-23 23-23h134q23 0 23 23v42H72z" fill="#847964"/><rect x="81" y="101" width="164" height="49" rx="13" fill="#b7a88c"/><rect x="89" y="105" width="70" height="36" rx="10" fill="#cfc1a4"/><rect x="166" y="105" width="70" height="36" rx="10" fill="#c8b89b"/>
        <path d="M73 118q-15-3-15 12v19q0 10 12 10h183q13 0 13-11v-19q0-15-15-12v27H73z" fill="#9b8d76"/><path d="M85 159v7m163-7v7" stroke="#655342" stroke-width="6"/><path d="M190 114l26-6 13 27-29 4z" fill="#734f54"/><path d="M103 112l23-6 14 27-30 5z" fill="#e0c6a3"/>
        <path d="M282 149V69q0-48-41-48" fill="none" stroke="#252624" stroke-width="5"/><path d="M224 45q17-29 35 0z" fill="#2a2c2a" stroke="#6b665b" stroke-width="1.5"/><ellipse cx="241" cy="45" rx="18" ry="4" fill="#ffe4ad"/>
        <ellipse cx="170" cy="150" rx="45" ry="10" fill="#805c44"/><path d="M144 156v10m52-10v10" stroke="#614631" stroke-width="4"/><rect x="166" y="137" width="9" height="13" rx="2" fill="#e7d5b6"/><path d="M170 138q-5-7 1-11 5 6-1 11" fill="#ffe7a6"/>
        <rect x="20" y="140" width="31" height="24" rx="5" fill="#777d68"/><path d="M36 142q-36-29-19-52 26 8 19 52m0 0q7-48 36-42 6 27-36 42m0 0q-9-45-28-34-3 20 28 34" fill="#4d6848"/>`
        };
        const art = interiors[kind] || `<circle cx="165" cy="82" r="51" fill="#9e927d" opacity=".35"/><path d="M103 91l62-54 62 54v65H103z" fill="#8f8774"/><path d="M145 156v-40h40v40" fill="#514b43"/>`;
        return b `<svg class="cr-room-illustration" viewBox="0 0 330 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label=${`Illustration: ${name}`} preserveAspectRatio="xMidYMid meet">
      <defs><radialGradient id=${`cr-light-${areaId}`} cx="70%" cy="48%" r="55%"><stop offset="0%" stop-color="#ffe9bd" stop-opacity=".25"/><stop offset="100%" stop-color="#ffe9bd" stop-opacity="0"/></radialGradient></defs>
      <path d="M0 157h330" stroke="currentColor" opacity=".12"/>
      <defs>
        <linearGradient id=${`cr-premium-material-${areaId}`} x1="0" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="#fff5dd" stop-opacity=".16"/><stop offset=".6" stop-color="#fff5dd" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".19"/></linearGradient>
        <filter id=${`cr-premium-shadow-${areaId}`} x="-20%" y="-30%" width="145%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#050a08" flood-opacity=".33"/></filter>
      </defs>
      <g class="cr-room-interior-shapes" filter=${premiumLighting ? `url(#cr-premium-shadow-${areaId})` : "none"} .innerHTML=${premiumLighting ? (premium[kind] || art) : art}></g>
      ${premiumLighting ? b `<rect x="0" y="0" width="330" height="180" fill=${`url(#cr-premium-material-${areaId})`} opacity=".35" pointer-events="none"/>` : A}
      <ellipse class="cr-room-illustration-light" cx="219" cy="101" rx="133" ry="86" fill=${`url(#cr-light-${areaId})`}/>
    </svg>`;
    }
    saveRoomVisualSettings() {
        try {
            localStorage.setItem("controlroom-room-style-v1", JSON.stringify({ style: this.roomStyle, auto: this.roomAutoSwitch, byArea: this.roomStyleByArea, photos: this.roomPhotoUrls, images: this.roomImages }));
        }
        catch (error) {
            console.warn("ControlRoom: room visual settings not saved", error);
        }
        try {
            localStorage.setItem("controlroom-room-images-v1", JSON.stringify(this.roomImages));
        }
        catch (error) {
            console.warn(error);
        }
        this.roomStyleSnapshot = JSON.stringify(this.roomVisualData());
        this.roomStyleEditor = false;
        this.settingsSection = "overview";
    }
    roomVisualData() { return { style: this.roomStyle, auto: this.roomAutoSwitch, byArea: this.roomStyleByArea, photos: this.roomPhotoUrls, images: this.roomImages }; }
    cancelRoomVisualSettings() {
        if (this.roomStyleSnapshot) {
            const v = JSON.parse(this.roomStyleSnapshot);
            this.roomStyle = v.style;
            this.roomAutoSwitch = v.auto;
            this.roomStyleByArea = v.byArea;
            this.roomPhotoUrls = v.photos;
            this.roomImages = v.images || {};
        }
        this.roomStyleEditor = false;
        this.settingsSection = "overview";
    }
    renderRoomStyleEditor(areas) {
        return b `<div class="cr-room-visual-editor"><div class="cr-room-visual-head"><div class="cr-room-kicker">CONTROLROOM · PERSONALISIERUNG</div><h2>Räume – Bildstil</h2><p>Wähle Premium 3D, Premium Fotos oder eigene Bilder für jeden Raum.</p></div>
      <label class="welcome-setting-text">Standard-Bildstil<select .value=${this.roomStyle} @change=${(e) => this.roomStyle = e.target.value}><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select></label>
      <label class="welcome-setting-row"><span>Automatischer Bildwechsel (täglich, 3D / Fotos)</span><input type="checkbox" .checked=${this.roomAutoSwitch} @change=${(e) => this.roomAutoSwitch = e.target.checked}/></label>
      <p class="settings-note">Premium Fotos enthält 20 fertige Motive. Optional kannst du eine Foto-URL je Raum hinterlegen. Eigene Bilder werden niemals automatisch gewechselt.</p>
      <div class="cr-room-visual-grid">${areas.map(([id, name]) => b `<details class="cr-room-visual-card"><summary><span class="cr-room-visual-title">${this.renderIcon(this.roomIcon(name))}<strong>${name}</strong></span><span class="cr-room-visual-summary">${this.roomStyleByArea[id] === "3d" ? "Premium 3D" : this.roomStyleByArea[id] === "photos" ? "Premium Fotos" : this.roomStyleByArea[id] === "custom" ? "Eigenes Foto" : "Standard"}</span>${this.renderIcon("mdi:chevron-down")}</summary><div class="cr-room-visual-fields"><label>Bildstil<select .value=${this.roomStyleByArea[id] || ""} @change=${(e) => { const v = e.target.value; this.roomStyleByArea = { ...this.roomStyleByArea, [id]: v }; this.requestUpdate(); }}><option value="">Standard</option><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select></label><label>Premium-Foto URL <small>Optional · /local/... oder https://...</small><input type="text" placeholder="Foto-Adresse einfügen" .value=${this.roomPhotoUrls[this.roomKind(name)] || ""} @change=${(e) => { this.roomPhotoUrls = { ...this.roomPhotoUrls, [this.roomKind(name)]: e.target.value }; }}/></label><label>Eigenes Bild <small>Optional · /local/...</small><input type="text" placeholder="Eigenes Bild einfügen" .value=${this.roomImages[id] || ""} @change=${(e) => { this.roomImages = { ...this.roomImages, [id]: e.target.value }; }}/></label></div></details>`)}</div>
      <div class="cr-room-visual-actions"><button @click=${() => this.cancelRoomVisualSettings()}>Abbrechen</button><button @click=${() => this.saveRoomVisualSettings()}>Speichern</button></div></div>`;
    }
    roomEntities(areaId) {
        return Object.values(this.hass?.states || {}).filter(e => {
            if (this.allEntityAreas[e.entity_id] !== areaId)
                return false;
            if (["unavailable", "unknown"].includes(e.state))
                return false;
            const domain = e.entity_id.split(".")[0];
            const name = String(e.attributes.friendly_name || e.entity_id).toLowerCase();
            if (/config|firmware|update|diagnos|debug|overtemp|do not disturb|signal|rssi|linkquality|reboot|restart|identify|calibrat|battery level|last seen|uptime|version|connection|pairing|child lock|led indicator|power on behavior|auto.update/.test(name))
                return false;
            if (domain === "switch")
                return /steckdose|socket|outlet|plug|power strip|strom|sofa|tischlampe|dekolicht|schalter/.test(name) && !/update|config|lock|indicator/.test(name);
            return ["light", "cover", "scene", "climate", "media_player", "vacuum", "fan", "humidifier", "lock", "alarm_control_panel", "switch"].includes(domain);
        });
    }
    async roomLightsToggle(lights, on) {
        if (!this.hass?.callService || !lights.length)
            return;
        try {
            await this.hass.callService("light", on ? "turn_on" : "turn_off", { entity_id: lights.map(e => e.entity_id) });
        }
        catch (error) {
            console.warn("ControlRoom: room lights action failed", error);
        }
    }
    saveRoomImage(areaId) {
        const value = this.roomImageDraft.trim();
        this.roomImages = { ...this.roomImages, [areaId]: value };
        try {
            localStorage.setItem("controlroom-room-images-v1", JSON.stringify(this.roomImages));
        }
        catch (error) {
            console.warn(error);
        }
        this.roomImageEditor = false;
    }
    renderRoomsPage() {
        const areas = Object.entries(this.areaNames).sort((a, b) => a[1].localeCompare(b[1], this.getLanguage()));
        const selected = areas.find(a => a[0] === this.roomDetail);
        const types = [
            { label: "Lampen", domain: "light", icon: "mdi:lightbulb-outline" },
            { label: "Rollos", domain: "cover", icon: "mdi:blinds" },
            { label: "Szenen", domain: "scene", icon: "mdi:palette-outline" },
            { label: "Heizung", domain: "climate", icon: "mdi:thermostat" },
            { label: "Medien", domain: "media_player", icon: "mdi:music-note-outline" },
            { label: "Steckdosen", domain: "switch", icon: "mdi:power-socket-de" },
            { label: "Sonstiges", domain: "other", icon: "mdi:dots-horizontal-circle-outline" }
        ];
        if (selected) {
            const [areaId, name] = selected;
            const entities = this.roomEntities(areaId);
            const lights = entities.filter(e => e.entity_id.startsWith("light."));
            const on = lights.filter(e => e.state === "on").length;
            return b `<section class="cr-rooms-page">
        <button class="cr-room-back" type="button" @click=${(event) => { event.preventDefault(); event.stopPropagation(); this.roomDetail = ""; this.roomImageEditor = false; this.requestUpdate(); }}>${this.renderIcon("mdi:arrow-left")} Alle Räume</button>
        <div class="cr-room-detail-head"><div><h1>${name}</h1><p>${entities.length} Steuerungen · ${on} von ${lights.length} Lichtern an</p></div>
</div>

        <div class="cr-room-detail-hero"><div class="cr-room-detail-art">${this.roomArt(areaId, name)}</div><div><span>RAUMSTATUS</span><h2>${on ? "Gemütlich beleuchtet" : "Alles ruhig"}</h2><p>${lights.length} Lampen · ${entities.length} Steuerungen</p><div class="cr-room-actions"><button ?disabled=${!lights.length} @click=${() => this.roomLightsToggle(lights, true)}>Alle an</button><button ?disabled=${!on} @click=${() => this.roomLightsToggle(lights, false)}>Alle aus</button></div></div></div>
        <div class="cr-room-sections">${types.map(t => {
                const members = entities.filter(e => t.domain === "other" ? !types.some(x => x.domain !== "other" && e.entity_id.startsWith(x.domain + ".")) : e.entity_id.startsWith(t.domain + "."));
                return members.length ? b `<article class="cr-room-section"><header>${this.renderIcon(t.icon)} <strong>${t.label}</strong><span>${members.length}</span></header>
            ${members.length ? members.map(e => b `<div class="cr-room-device"><div><strong>${String(e.attributes.friendly_name || e.entity_id)}</strong><small>${e.state}</small></div>${["light", "switch"].some(d => e.entity_id.startsWith(d + ".")) ? b `<button ?disabled=${!["on", "off"].includes(e.state)} @click=${() => this.hass?.callService?.(e.entity_id.split(".")[0], "toggle", { entity_id: e.entity_id })}>${this.renderIcon(e.state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off-outline")}</button>` : A}</div>`) : b `<p class="cr-room-empty">Keine Geräte zugeordnet</p>`}</article>` : A;
            })}</div>
      </section>`;
        }
        return b `<section class="cr-rooms-page"><div class="cr-rooms-heading"><h1>Räume</h1><p>Dein Zuhause. Jeder Raum, perfekt verbunden.</p></div>
      ${areas.length ? b `<div class="cr-room-grid">${areas.map(([id, name]) => {
            const entities = this.roomEntities(id), lights = entities.filter(e => e.entity_id.startsWith("light.")), on = lights.filter(e => e.state === "on").length;
            const temps = entities.filter(e => e.entity_id.startsWith("sensor.") && (e.attributes.device_class === "temperature" || e.entity_id.includes("temperature"))).find(e => !isNaN(Number(e.state)));
            return b `<button class="cr-room-tile ${on ? "cr-room-lit" : ""}" @click=${() => { this.roomDetail = id; this.roomImageEditor = false; }}>
          <div class="cr-room-tile-art">${this.roomArt(id, name)}<span class="cr-room-tile-arrow">${this.renderIcon("mdi:arrow-top-right")}</span></div>
          <div class="cr-room-tile-body"><h2>${name}</h2><p>${entities.length} Steuerungen ${temps ? b `· ${temps.state} °C` : A}</p><div class="cr-room-tile-footer"><span class="cr-room-led ${on ? "active" : ""}"></span>${on} / ${lights.length} Lampen an</div></div>
        </button>`;
        })}</div>` : b `<div class="cr-room-empty-state">${this.renderIcon("mdi:home-search-outline")}<h2>Keine Räume gefunden</h2><p>Erstelle Bereiche in Home Assistant unter Einstellungen → Bereiche, Labels & Zonen.</p></div>`}
    </section>`;
    }
    renderPage() {
        if (this.activePage === "home")
            return this.renderHome();
        if (this.activePage === "lights")
            return this.renderLightsPage();
        if (this.activePage === "rooms")
            return this.renderRoomsPage();
        if (this.activePage === "settings")
            return this.renderWelcomeSettings();
        const page = pages.find((item) => item.id === this.activePage);
        return b `
      <section class="placeholder-page">
        <div class="placeholder-icon">
          ${page ? this.renderIcon(page.icon) : A}
        </div>
        <h1>${this.t(this.activePage)}</h1>
        <p>${this.t("comingSoon")}</p>
      </section>
    `;
    }
    render() {
        if (this.hass?.user?.id && !this.crRemoteReady && !this.crRemoteLoading && this.crRemoteUser !== this.hass.user.id) {
            // First-time device: use neutral surface rather than painting the wrong theme.
            return b `<div class="cr-first-load" style="min-height:100vh;display:grid;place-items:center;background:#191d20;color:#e8e8e8;font:600 14px system-ui">ControlRoom</div>`;
        }
        return b `
      <div class=${`dashboard cr-theme-${this.crThemeStyle} ${this.crThemeIsLight() ? "cr-theme-light" : ""} ${""}`} style=${this.crThemeVars()}>
        ${this.renderSidebar()}

        <main class="main">
          <header class="topbar">
            <div class="topbar-left">
              <button
                class="menu-button"
                type="button"
                aria-label=${this.t("menu")}
                @click=${() => {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        }}
              >
                ${this.renderIcon("mdi:menu")}
              </button>
              <div class="page-heading">
                ${this.activePage === "settings" ? "" : this.t(this.activePage)}
              </div>
            </div>

            <div class="topbar-right">${this.renderSmartBar()}
            </div>
          </header>

          ${this.renderPage()}
        </main>
      </div>
    `;
    }
};
ControlRoomDashboard.styles = i$3 `
    /* ControlRoom Rooms Premium */
    .cr-rooms-page{padding:clamp(10px,2vw,26px) 0 45px;color:#f5eff9;min-width:0}
    .cr-room-kicker{font-size:10px;letter-spacing:2.4px;color:var(--cr-muted);font-weight:750}
    .cr-rooms-heading h1,.cr-room-detail-head h1{font-size:clamp(29px,3vw,43px);margin:9px 0 5px;font-weight:760;letter-spacing:-1px}
    .cr-rooms-heading p,.cr-room-detail-head p{color:var(--cr-muted);margin:0 0 24px;font-size:13px}
    .cr-room-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:17px}
    .cr-room-tile{min-width:0;padding:0;border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);border-radius:23px;overflow:hidden;background:linear-gradient(150deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));text-align:left;color:inherit;cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s}
    .cr-room-tile:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent);box-shadow:0 16px 45px #09061166}
    .cr-room-tile-art{height:clamp(155px,17vw,220px);position:relative;display:grid;place-items:center;background:radial-gradient(ellipse at 55% 70%,#65477580,transparent 65%),linear-gradient(140deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));overflow:hidden}
    .cr-room-tile-art>ha-icon{--mdc-icon-size:88px;color:var(--cr-text);filter:drop-shadow(0 15px 20px color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-tile-art img,.cr-room-detail-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
    .cr-room-tile-art:has(img) > ha-icon,.cr-room-detail-art:has(img) > ha-icon{position:absolute;opacity:0;pointer-events:none}
    .cr-room-tile-art:has(img[style*="display: none"]) > ha-icon,.cr-room-detail-art:has(img[style*="display: none"]) > ha-icon{opacity:1}
    .cr-room-tile-art:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,color-mix(in srgb,var(--cr-accent) 48%,transparent));pointer-events:none}
    .cr-room-lit .cr-room-tile-art img{filter:brightness(1.1) saturate(1.08)}
    .cr-room-visual-editor{margin:16px 0 22px;padding:22px;border:1px solid #cba7e344;border-radius:20px;background:linear-gradient(145deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-visual-head h2{margin:8px 0;font-size:23px}.cr-room-visual-head p{font-size:12px;color:var(--cr-muted)}
    .cr-room-visual-row{display:grid;grid-template-columns:minmax(130px,1fr) minmax(130px,1fr);gap:10px;padding:12px 0;border-bottom:1px solid #ffffff13}
    .cr-room-visual-row strong{display:flex;align-items:center;gap:7px;font-size:13px}.cr-room-visual-row strong ha-icon{--mdc-icon-size:19px}
    .cr-room-visual-row select,.cr-room-visual-row input{min-width:0;padding:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));border:1px solid #ffffff28;border-radius:10px;color:white}
    .cr-room-visual-row input{grid-column:1/-1}
    .cr-room-visual-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}
    .cr-room-visual-actions button{padding:11px 18px;border:1px solid #cba7e344;border-radius:10px;background:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));color:white;cursor:pointer}
    .cr-room-visual-actions button:last-child{background:var(--cr-accent)}
    @container(max-width:470px){.cr-room-visual-row{grid-template-columns:1fr}.cr-room-visual-row input{grid-column:auto}}
    .cr-room-tile-arrow{position:absolute;right:14px;top:14px;border-radius:50%;background:#ffffff22;padding:8px;display:flex}
    .cr-room-tile-arrow ha-icon{--mdc-icon-size:17px}
    .cr-room-tile-body{padding:18px 19px 17px}
    .cr-room-tile-body h2{font-size:18px;margin:0 0 5px}
    .cr-room-tile-body p{font-size:12px;color:var(--cr-muted);margin:0 0 18px}
    .cr-room-tile-footer{display:flex;align-items:center;gap:8px;color:var(--cr-muted);font-size:11px;border-top:1px solid #ffffff15;padding-top:13px}
    .cr-room-led{height:7px;width:7px;border-radius:50%;background:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent))}
    .cr-room-led.active{background:#eabf82;box-shadow:0 0 11px #eabf82}
    .cr-room-lit .cr-room-tile-art{background:radial-gradient(ellipse at 55% 75%,#aa7c6480,transparent 65%),linear-gradient(140deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-back,.cr-room-image-edit{border:1px solid #ffffff25;background:#ffffff0a;color:#e8ddeb;border-radius:12px;padding:10px 13px;display:inline-flex;gap:8px;align-items:center;cursor:pointer}
    .cr-room-back ha-icon,.cr-room-image-edit ha-icon{--mdc-icon-size:17px}
    .cr-room-detail-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:23px;flex-wrap:wrap}
    .cr-room-detail-hero{display:grid;grid-template-columns:minmax(160px,1fr) minmax(170px,1fr);gap:22px;align-items:center;padding:20px;border-radius:22px;border:1px solid #ffffff20;background:linear-gradient(120deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));margin-bottom:22px}
    .cr-room-detail-art{position:relative;min-width:0;height:230px;display:grid;place-items:center;border-radius:17px;overflow:hidden;background:radial-gradient(ellipse,color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-detail-art>ha-icon{--mdc-icon-size:115px;color:var(--cr-text)}
    .cr-room-detail-hero span{font-size:10px;letter-spacing:1.8px;color:var(--cr-muted)}
    .cr-room-detail-hero h2{font-size:25px;margin:10px 0}
    .cr-room-detail-hero p{color:var(--cr-muted);font-size:13px}
    .cr-room-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}
    .cr-room-actions button,.cr-room-image-form button{background:var(--cr-accent);color:white;border:0;border-radius:10px;padding:10px 15px;cursor:pointer}
    .cr-room-actions button:disabled{opacity:.4;cursor:default}
    .cr-room-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:14px}
    .cr-room-section{background:#ffffff08;border:1px solid #ffffff17;border-radius:17px;padding:17px;min-width:0}
    .cr-room-section header{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid #ffffff17}
    .cr-room-section header ha-icon{color:var(--cr-muted);--mdc-icon-size:20px}
    .cr-room-section header span{margin-left:auto;color:var(--cr-muted);font-size:12px}
    .cr-room-section:has(.cr-room-device){box-shadow:0 10px 30px #00000014}
    .cr-room-device{display:flex;align-items:center;justify-content:space-between;gap:9px;padding:12px 0;border-bottom:1px solid #ffffff0c}
    .cr-room-device strong{display:block;font-size:12px;overflow-wrap:anywhere}
    .cr-room-device small{display:block;color:var(--cr-muted);margin-top:4px;font-size:11px}
    .cr-room-device button{background:none;color:var(--cr-text);border:0;cursor:pointer}
    .cr-room-empty{color:var(--cr-muted);font-size:12px}
    .cr-room-empty-state{padding:65px 20px;text-align:center;color:var(--cr-muted)}
    .cr-room-empty-state>ha-icon{--mdc-icon-size:50px}
    .cr-room-image-form{background:#ffffff0b;border:1px solid #ffffff20;border-radius:15px;padding:17px;margin-bottom:17px;display:grid;gap:10px}
    .cr-room-image-form label{font-size:12px;color:var(--cr-muted)}
    .cr-room-image-form input{width:100%;min-width:0;border:1px solid #ffffff30;border-radius:10px;padding:12px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:white}
    .cr-room-image-form>div{display:flex;gap:10px}
    @media(max-width:640px){.cr-room-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cr-room-tile-art{height:130px}.cr-room-tile-art>ha-icon{--mdc-icon-size:62px}.cr-room-tile-body{padding:12px}.cr-room-tile-body h2{font-size:14px}.cr-room-tile-body p,.cr-room-tile-footer{font-size:10px}.cr-room-detail-hero{grid-template-columns:1fr}.cr-room-detail-art{height:190px}}
    @media(max-width:350px){.cr-room-grid{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.cr-room-tile{transition:none}}


    /* Theme Studio: isolated to this dashboard, preserving original purple default */
    .dashboard { color:var(--cr-text,#f6f3fb); background:radial-gradient(ellipse at 65% 0%,color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 15%,transparent),transparent 48%),var(--cr-bg,#111019); border-radius:var(--cr-radius,22px); }
    .dashboard .sidebar { background:linear-gradient(180deg,color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 13%,transparent),transparent); }
    .dashboard .main { background:transparent; }
    .dashboard .overview-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .settings-option {border-radius:var(--cr-radius,22px);}
    .dashboard.cr-theme-solid .overview-card,.dashboard.cr-theme-solid .cr-room-section,.dashboard.cr-theme-solid .settings-option {background:var(--cr-surface)!important;backdrop-filter:none!important;}
    .dashboard.cr-theme-minimal .overview-card,.dashboard.cr-theme-minimal .cr-room-section,.dashboard.cr-theme-minimal .settings-option {background:color-mix(in srgb,var(--cr-surface) 80%,var(--cr-bg))!important;box-shadow:none!important;backdrop-filter:none!important;}
    .dashboard.cr-theme-glass .overview-card,.dashboard.cr-theme-glass .cr-room-section {backdrop-filter:var(--cr-blur);}
    .dashboard.cr-theme-light .page-heading,.dashboard.cr-theme-light .cr-rooms-heading h1,.dashboard.cr-theme-light .cr-room-tile-body h2,.dashboard.cr-theme-light .settings-intro h1 {color:var(--cr-text);}
    .cr-theme-studio h3{font-size:15px;margin:22px 0 12px;color:var(--cr-text)}
    .cr-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:12px}
    .cr-theme-choice{position:relative;display:grid;gap:10px;text-align:left;padding:9px;border-radius:16px;border:1px solid #ffffff25;background:#ffffff09;color:var(--cr-text);cursor:pointer}
    .cr-theme-choice.chosen,.cr-theme-style-list button.chosen{border-color:var(--cr-accent);box-shadow:0 0 0 1px var(--cr-accent)}
    .cr-theme-choice>ha-icon{position:absolute;right:12px;bottom:13px;color:var(--cr-accent);--mdc-icon-size:16px}
    .cr-theme-preview{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:16px;border-radius:12px;min-height:86px}
    .cr-theme-preview span{grid-column:1/-1;width:45%;height:7px;border-radius:20px}
    .cr-theme-preview i{height:34px;border-radius:8px}
    .cr-theme-choice strong{font-size:12px;padding:0 4px 4px}
    .cr-theme-style-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
    .cr-theme-style-list button{display:grid;gap:6px;position:relative;text-align:left;padding:15px;border:1px solid #ffffff22;border-radius:13px;background:#ffffff09;color:var(--cr-text);cursor:pointer}
    .cr-theme-style-list small{opacity:.7}.cr-theme-style-list ha-icon{position:absolute;right:10px;top:10px;color:var(--cr-accent);--mdc-icon-size:17px}
    .cr-theme-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}
    .cr-theme-actions button{border:1px solid #ffffff30;border-radius:12px;padding:11px 20px;background:#ffffff10;color:var(--cr-text);cursor:pointer}
    .cr-theme-actions button:last-child{background:var(--cr-accent);color:#fff;border-color:transparent}

    :host {
      display: block;
      width: 100%;
      min-height: calc(100dvh - 56px);
      font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
    }

    * { box-sizing: border-box; }
    button { font: inherit; }

    .dashboard {
      display: flex;
      min-height: calc(100dvh - 56px);
      overflow: hidden;
      color: #f6f3fb;
      background:
        radial-gradient(
          ellipse at 65% 0%,
          color-mix(in srgb,var(--cr-accent) 22%,transparent),
          transparent 48%
        ),
        #111019;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 22px;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 250px;
      min-width: 250px;
      padding: 27px 17px 20px;
      background: linear-gradient(
        180deg,
        color-mix(in srgb,var(--cr-accent) 13%,transparent),
        rgba(255,255,255,0.015)
      );
      border-right: 1px solid rgba(255,255,255,0.08);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 10px 30px;
    }

    .brand-symbol {
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--cr-accent), color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)));
      font-size: 25px;
      font-weight: 700;
      box-shadow: 0 8px 24px color-mix(in srgb,var(--cr-accent) 20%,transparent);
    }

    .brand-name {
      font-size: 19px;
      font-weight: 750;
      letter-spacing: -0.05em;
    }

    .brand-subtitle {
      margin-top: 3px;
      color: var(--cr-muted);
      font-size: 11px;
    }

    .navigation-label {
      margin: 0 13px 12px;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
    }

    .navigation {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 15px;
      width: 100%;
      padding: 13px 15px;
      border: 1px solid transparent;
      border-radius: 14px;
      background: transparent;
      color: var(--cr-muted);
      text-align: left;
      cursor: pointer;
      transition: background 180ms, color 180ms;
    }

    .nav-item ha-icon { --mdc-icon-size: 22px; }

    .nav-item:hover {
      background: rgba(255,255,255,0.06);
      color: white;
    }

    .nav-item.active {
      color: white;
      background: linear-gradient(
        110deg,
        color-mix(in srgb,var(--cr-accent) 40%,transparent),
        color-mix(in srgb,var(--cr-accent) 23%,transparent)
      );
      border-color: color-mix(in srgb,var(--cr-accent) 35%,transparent);
      box-shadow:
        inset 0 1px rgba(255,255,255,0.13),
        0 5px 18px rgba(0,0,0,0.12);
    }

    .sidebar-bottom {
      display: flex;
      align-items: center;
      gap: 11px;
      margin-top: auto;
      padding: 14px 10px 4px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .user-avatar {
      display: grid;
      place-items: center;
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
      font-size: 17px;
      font-weight: 700;
    }

    .user-details { min-width: 0; }

    .user-name {
      font-size: 13px;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      color: #b9b5c3;
      font-size: 11px;
    }

    .small-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #48d9a4;
    }

    .main {
      flex: 1;
      min-width: 0;
      padding: 27px 31px 45px;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 44px;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .page-heading {
      font-size: 14px;
      font-weight: 650;
      color: var(--cr-muted);
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .clock, .weather {
      min-height: 72px;
      padding: 12px 17px;
      border-radius: 17px;
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.075);
      backdrop-filter: blur(16px);
    }

    .clock {
      min-width: 94px;
      text-align: right;
    }

    .clock-time {
      font-size: 20px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .clock-date {
      margin-top: 4px;
      font-size: 11px;
      color: var(--cr-muted);
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 13px;
      min-width: 165px;
      background: linear-gradient(
        130deg,
        color-mix(in srgb,var(--cr-accent) 15%,transparent),
        rgba(255,255,255,0.04)
      );
    }

    .weather-icon {
      color: var(--cr-text);
      animation: weatherFloat 4s ease-in-out infinite;
    }

    .weather-icon ha-icon {
      --mdc-icon-size: 38px;
    }

    .weather-temp {
      font-size: 20px;
      font-weight: 700;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .weather-condition {
      margin-top: 4px;
      color: var(--cr-muted);
      font-size: 11px;
      white-space: nowrap;
    }

    .weather-empty {
      color: var(--cr-muted);
      font-size: 12px;
    }

    @keyframes weatherFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    .connection {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 13px;
      border-radius: 15px;
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.075);
      font-size: 12px;
      color: var(--cr-muted);
    }

    .eyebrow {
      color: var(--cr-muted);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-size: 11px;
      font-weight: 700;
    }

    h1 {
      margin: 14px 0 10px;
      font-size: clamp(29px, 3.2vw, 44px);
      letter-spacing: -0.05em;
      font-weight: 750;
    }

    .hero p, .placeholder-page p {
      color: var(--cr-muted);
      font-size: 15px;
      line-height: 1.6;
    }

    .wave {
      display: inline-block;
      margin-left: 5px;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 38px;
    }

    .overview-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 175px;
      padding: 22px;
      border-radius: 22px;
      background: linear-gradient(
        145deg,
        rgba(255,255,255,0.065),
        rgba(255,255,255,0.022)
      );
      border: 1px solid rgba(255,255,255,0.085);
      transition: transform 180ms, border-color 180ms;
    }

    .overview-card:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb,var(--cr-accent) 30%,transparent);
    }

    .card-icon { color: var(--cr-text); }
    .card-icon ha-icon { --mdc-icon-size: 27px; }

    .card-title {
      font-size: 17px;
      font-weight: 650;
    }

    .card-subtitle {
      margin-top: 6px;
      font-size: 12px;
      color: var(--cr-muted);
    }


    .hero-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px 30px;
    }
    .hero-message { min-width: 0; }
    .hero-message h1 { margin-bottom: 10px; }
    .hero-message p { margin: 0; }
    .people-pills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }
    .person-pill {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      max-width: 220px;
      padding: 5px 13px 5px 5px;
      border: 1px solid color-mix(in srgb,var(--cr-accent) 17%,transparent);
      border-radius: 999px;
      background: linear-gradient(120deg, color-mix(in srgb,var(--cr-accent) 17%,transparent), rgba(255,255,255,0.035));
      box-shadow: inset 0 1px rgba(255,255,255,0.04);
    }
    .pill-avatar {
      display: grid;
      place-items: center;
      flex: 0 0 35px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
      color: #fff;
      font-weight: 700;
    }
    .pill-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .pill-details { display: flex; flex-direction: column; min-width: 0; }
    .pill-name, .pill-location {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pill-name { font-size: 12px; font-weight: 650; }
    .pill-location { color: var(--cr-muted); font-size: 11px; font-weight: 600; }
    .pill-location.at-home { color: #67dfb2; }


    .lights-card { gap: 13px; order: 3; }
    .premium-lights { position: relative; min-height: 190px; overflow: hidden; }
    .premium-lights.has-light { border-color: rgba(215,165,104,.32); }
    .premium-lights-content { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; height:100%; }
    .premium-lights .card-icon { color:var(--cr-accent); }
    .pendant-corner { position:absolute; right:-6px; top:-20px; width:135px; pointer-events:none; }
    .pendant { display:block; width:100%; height:auto; }
    .premium-count { font-size:13px; color:var(--cr-muted); }
    .premium-count strong { font-size:28px; color:#fff; }
    .premium-count span { color:var(--cr-muted); }
    /* Home overview: atmosphere first, subtle live light count below. */
    .premium-mood { font-size:clamp(17px,1.6vw,21px);font-weight:750;letter-spacing:-.045em;line-height:1.12;color:#fff3f8;max-width:calc(100% - 48px);text-shadow:0 1px 16px rgba(0,0,0,.18); }
    .premium-light-status { display:flex;align-items:center;gap:7px;min-width:0;font-size:10px;line-height:1.3;color:var(--cr-muted);white-space:nowrap; }
    .premium-status-dot { flex:none;width:6px;height:6px;border-radius:50%;background:var(--cr-muted); }
    .premium-status-dot.lit { background:#f3c384;box-shadow:0 0 10px rgba(245,193,118,.55); }
    .premium-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; }
    .glass-action { display:flex; align-items:center; justify-content:center; gap:6px; padding:9px 11px; color:var(--cr-text); background:color-mix(in srgb,var(--cr-accent) 25%,transparent); border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent); border-radius:999px; cursor:pointer; font-size:11px; }
    .premium-actions-three { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; }
    .premium-actions-three .glass-action { min-width:0; padding:9px 7px; white-space:nowrap; }
    .premium-actions-three .premium-light-link { grid-column:1/-1; }
    .glass-action:disabled { opacity:.45; cursor:not-allowed; }
    .glass-action ha-icon { --mdc-icon-size:16px; }
    .premium-rooms { display:flex; flex-wrap:wrap; gap:5px; }
    .room-chip { display:flex; align-items:center; gap:4px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:5px 8px; border-radius:999px; font-size:10px; color:var(--cr-muted); }
    .room-chip ha-icon { --mdc-icon-size:13px; color:#e6b877; }
    .lighting-studio { max-width:1100px; margin:auto; }
    .studio-heading { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:20px; }
    .studio-heading-left {display:flex;align-items:center;gap:12px;min-width:0;flex:1}
    .studio-back,.studio-settings {display:grid;place-items:center;width:38px;height:38px;flex:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.05);color:var(--cr-text);cursor:pointer}
    .studio-back:hover,.studio-settings:hover {background:color-mix(in srgb,var(--cr-accent) 20%,transparent)}
    .lighting-preferences {margin:0 0 17px;padding:18px;border:1px solid color-mix(in srgb,var(--cr-accent) 22%,transparent);border-radius:20px;background:linear-gradient(130deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface))}
    .preferences-header {display:flex;justify-content:space-between;align-items:center;gap:10px}
    .preferences-header button {border:0;background:transparent;color:var(--cr-muted);cursor:pointer}
    .pref-title {margin:18px 0 9px;color:var(--cr-muted);font-size:12px;font-weight:650}
    .pref-modes {display:flex;gap:7px;flex-wrap:wrap}
    .pref-modes button {padding:8px 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.04);color:var(--cr-text);cursor:pointer;font-size:12px}
    .pref-modes button.active {background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface));border-color:var(--cr-accent);color:var(--cr-text)}
    .pref-list {display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:7px}
    .pref-check {display:flex;align-items:center;gap:9px;min-width:0;padding:9px 11px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025);font-size:12px;color:#e7deee;cursor:pointer}
    .pref-check input {accent-color:var(--cr-accent)}
    .pref-label-name {min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .pref-check input {flex:none} .pref-check .pref-hint {flex:none;white-space:nowrap;margin-left:auto}
    .pref-hint {color:var(--cr-muted);font-size:10px}
    .pref-entities {display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:7px;max-height:270px;overflow-y:auto}
    .pref-entity {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025)}
    .pref-entity-name {display:flex;align-items:center;gap:8px;min-width:0;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .pref-entity-name ha-icon {--mdc-icon-size:17px;color:var(--cr-muted);flex:none}
    .pref-entity-name small {color:var(--cr-muted);font-size:10px}
    .pref-entity select {max-width:105px;padding:6px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#f5eef9;font-size:11px}
    
    .studio-heading h1 { margin:7px 0 0; }
    .studio-total { font-size:12px; color:var(--cr-muted); }
    .studio-hero { position:relative; display:flex; min-height:220px; overflow:hidden; padding:26px 28px; border:0 !important; outline:0 !important; box-shadow:none !important; border-radius:22px; background:linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); min-width:0; }
    .studio-kicker { font-size:11px; font-weight:700; letter-spacing:.15em; color:var(--cr-muted); }
    .studio-mood { margin:13px 0 4px; font-size:clamp(23px,2.6vw,34px); font-weight:750; letter-spacing:-.045em; color:var(--cr-text); line-height:1.15; }
    .studio-mood-subtitle { color:var(--cr-muted); font-size:12px; line-height:1.5; }
    .studio-hero.lit .studio-mood { text-shadow:0 0 28px rgba(247,194,120,.15); }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:7px; margin-top:20px; background:color-mix(in srgb,var(--cr-accent) 20%,transparent); border:1px solid rgba(255,255,255,.07); border-radius:999px; overflow:hidden; cursor:help; }
    .studio-progress span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,var(--cr-accent),var(--cr-text)); box-shadow:0 0 15px color-mix(in srgb,var(--cr-accent) 30%,transparent); transition:width .55s ease; }
    .studio-actions { display:flex; gap:10px; margin-top:19px; }
    .studio-actions button { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; flex:1; min-height:78px; padding:13px 12px; border:1px solid color-mix(in srgb,var(--cr-text) 13%,transparent); border-radius:22px; background:var(--cr-surface); color:var(--cr-text) !important; font-size:13px; font-weight:750; cursor:pointer; text-shadow:none !important; -webkit-text-fill-color:var(--cr-text); box-shadow:0 4px 16px rgba(0,0,0,.045); transition:transform .18s ease,background .18s ease; }
    .studio-actions button:disabled { opacity:.7; cursor:not-allowed; }
    .studio-actions ha-icon { --mdc-icon-size:22px; color:var(--cr-text) !important; }
    .studio-actions button:not(:disabled):hover { background:color-mix(in srgb,var(--cr-accent) 9%,var(--cr-surface)); transform:translateY(-2px); }
    .studio-pendant { position:absolute; right:30px; top:-21px; width:195px; pointer-events:none; }
    @media (min-width:601px) and (max-width:950px) {
      .studio-pendant {right:-12px; width:clamp(125px,19vw,185px);}
      .studio-hero-info {width:calc(100% - 135px);}
    }

    .ambient-rooms { display:grid; grid-template-columns:repeat(auto-fit,minmax(135px,1fr)); gap:10px; margin-top:14px; }
    .ambient-room { position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:7px; min-height:105px; padding:14px; overflow:hidden; border-radius:16px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:var(--cr-muted); text-align:left; cursor:pointer; }
    .ambient-room.illuminated { border-color:rgba(231,178,109,.35); }
    .ambient-room-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(ellipse at 80% 90%,rgba(255,233,190,.17),transparent 72%); transition:opacity 450ms ease; }
    .ambient-room.illuminated .ambient-room-glow { opacity:1; }
    .ambient-room-icon,.ambient-room-name,.ambient-room-count { position:relative; z-index:1; }
    .ambient-room-icon { color:var(--cr-muted); }
    .ambient-room.illuminated .ambient-room-icon { color:#f4c786; }
    /* V36: Lichter-only illustrated room tiles; Räume layout/settings untouched. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(auto-fill,minmax(min(100%,195px),1fr));gap:13px;margin-top:18px}
    .dashboard .ambient-room{min-height:190px;padding:0;display:flex;flex-direction:column;gap:0;align-items:stretch;border-radius:19px;isolation:isolate;background:color-mix(in srgb,var(--cr-surface) 90%,var(--cr-bg));border:1px solid color-mix(in srgb,var(--cr-text) 12%,transparent);color:var(--cr-text);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
    .dashboard .ambient-room:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent);box-shadow:0 13px 30px rgba(0,0,0,.13)}
    .dashboard .ambient-room.illuminated{border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent)}
    .dashboard .ambient-room-art{position:relative;z-index:1;display:grid;place-items:center;width:100%;height:132px;overflow:hidden;background:radial-gradient(ellipse at 50% 100%,color-mix(in srgb,var(--cr-accent) 9%,transparent),transparent 75%)}
    .dashboard .ambient-room-art .cr-room-illustration{width:100%;height:100%;max-width:265px;max-height:145px;display:block;pointer-events:none}
    .dashboard .ambient-room-art .cr-room-illustration-light{opacity:0;transition:opacity .3s ease}
    .dashboard .ambient-room.illuminated .ambient-room-art .cr-room-illustration-light{opacity:1}
    .dashboard .ambient-room-details{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:7px;width:100%;padding:12px 15px 14px;border-top:1px solid color-mix(in srgb,var(--cr-text) 7%,transparent)}
    .dashboard .ambient-room-name{font-size:13px;font-weight:700;color:var(--cr-text);line-height:1.25}
    .dashboard .ambient-room-count{display:flex;align-items:center;gap:7px;color:var(--cr-muted);font-size:11px}
    .dashboard .ambient-room-status{width:7px;height:7px;flex:none;border-radius:50%;background:color-mix(in srgb,var(--cr-muted) 70%,transparent)}
    .dashboard .ambient-room-status.is-on{background:var(--cr-accent);box-shadow:0 0 10px var(--cr-accent)}
    @media(max-width:520px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.dashboard .ambient-room{min-height:165px}.dashboard .ambient-room-art{height:110px}.dashboard .ambient-room-details{padding:10px 11px 12px}}
    @media(prefers-reduced-motion:reduce){.dashboard .ambient-room{transition:none}.dashboard .ambient-room-art .cr-room-illustration-light{transition:none}}
    /* V38: original premium rendered dioramas; text and state remain native and live. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(auto-fit,minmax(min(100%,245px),1fr));gap:16px}
    .dashboard .ambient-room{min-height:228px;border-radius:21px;overflow:hidden;background:#15271f;border:1px solid rgba(220,223,188,.23);box-shadow:inset 0 1px rgba(255,255,255,.04)}
    .dashboard .ambient-room-art{height:175px;background:#172b22;display:block;overflow:hidden;isolation:isolate}
    .dashboard .ambient-room-art::after{content:"";position:absolute;inset:35% 0 0;pointer-events:none;background:linear-gradient(to bottom,transparent 5%,rgba(11,27,21,.24) 65%,rgba(11,27,21,.82) 100%);z-index:2}
    .dashboard .ambient-room-art .cr-light-diorama{display:block;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.92) brightness(.87);transition:filter .35s ease,transform .35s ease}
    .dashboard .ambient-room.illuminated .cr-light-diorama{filter:saturate(1.05) brightness(1.06)}
    .dashboard .ambient-room:hover .cr-light-diorama{transform:scale(1.045)}
    .dashboard .ambient-room-glow{opacity:0!important}
    .dashboard .ambient-room-details{background:#14281f;border-top:0;padding:12px 15px 15px;gap:6px}
    .dashboard .ambient-room-name{font-size:calc(15px * var(--cr-font-scale,1));font-weight:700}
    .dashboard .ambient-room-count{font-size:calc(12px * var(--cr-font-scale,1))}
    @media(max-width:520px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.dashboard .ambient-room{min-height:184px}.dashboard .ambient-room-art{height:119px}.dashboard .ambient-room-details{padding:10px 11px 12px}}
    @media(prefers-reduced-motion:reduce){.dashboard .ambient-room-art .cr-light-diorama{transition:none}}

    /* V39: compact responsive lighting cards, real OFF/ON image switching. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:14px}
    .dashboard .ambient-room{min-width:0;min-height:0;border-radius:15px;overflow:hidden;box-shadow:none}
    .dashboard .ambient-room-art{height:auto;aspect-ratio:1.85/1;min-height:0}
    .dashboard .ambient-room-art .cr-light-diorama{filter:none;transform:none}
    .dashboard .ambient-room.illuminated .cr-light-diorama{filter:none}
    .dashboard .ambient-room-art::after{inset:52% 0 0;background:linear-gradient(transparent,rgba(9,25,20,.36))}
    .dashboard .ambient-room-details{padding:9px 11px 10px;gap:4px}
    .dashboard .ambient-room-name{font-size:calc(12px * var(--cr-font-scale,1));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .dashboard .ambient-room-count{font-size:calc(10px * var(--cr-font-scale,1))}
    .dashboard .ambient-room.illuminated{border-color:rgba(239,221,172,.44);box-shadow:0 0 18px rgba(255,231,182,.055)}
    @media(max-width:1100px){.dashboard .ambient-rooms{grid-template-columns:repeat(4,minmax(0,1fr))}}
    @media(max-width:850px){.dashboard .ambient-rooms{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:540px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.dashboard .ambient-room-art{aspect-ratio:1.7/1}.dashboard .ambient-room-details{padding:8px 9px 9px}}
    /* V40: transparent object miniatures, native theme surface and live warm emission. */
    .dashboard .ambient-room{background:color-mix(in srgb,var(--cr-surface) 86%,var(--cr-bg))!important;border-color:color-mix(in srgb,var(--cr-text) 12%,transparent)!important}
    .dashboard .ambient-room.illuminated{border-color:color-mix(in srgb,var(--cr-accent) 48%,transparent)!important}
    .dashboard .ambient-room-art{background:transparent!important;overflow:visible;isolation:isolate;display:grid;place-items:center}
    .dashboard .ambient-room-art::after{display:none!important}
    .dashboard .cr-light-object-wrap{position:relative;display:block;width:100%;height:100%;min-height:85px;isolation:isolate}
    .dashboard .cr-light-object{display:block;width:100%;height:100%;object-fit:contain;object-position:center;position:relative;z-index:2;filter:drop-shadow(0 7px 5px rgba(0,0,0,.20));transition:filter .35s ease,transform .35s ease}
    .dashboard .cr-light-emission{position:absolute;z-index:1;inset:8% 13% 3%;background:radial-gradient(ellipse at 53% 42%,rgba(255,248,222,.84) 0%,rgba(255,226,158,.45) 34%,rgba(255,213,135,.12) 58%,transparent 82%);filter:blur(9px);opacity:0;transition:opacity .35s ease;pointer-events:none}
    .dashboard .ambient-room.illuminated .cr-light-emission{opacity:1;filter:blur(12px);transform:scale(1.22)}
    .dashboard .ambient-room.illuminated .cr-light-object{filter:drop-shadow(0 7px 5px rgba(0,0,0,.20)) brightness(1.16)}
    .dashboard .ambient-room:hover .cr-light-object{transform:translateY(-2px)}
    .dashboard .ambient-room-details{background:transparent!important;border-top:1px solid color-mix(in srgb,var(--cr-text) 8%,transparent)!important}
    .dashboard .ambient-room-glow{opacity:0!important}
    @media(prefers-reduced-motion:reduce){.dashboard .cr-light-object,.dashboard .cr-light-emission{transition:none}}




    .ambient-room-name { font-size:12px; font-weight:650; }
    .ambient-room-count { color:var(--cr-muted); font-size:11px; }
    @media (prefers-reduced-motion:reduce) { .ambient-room-glow { transition:none; } }
    .studio-tabs { display:grid; grid-template-columns:1fr 1fr; margin:18px 0 12px; padding:4px; border-radius:999px; background:rgba(255,255,255,.035); }
    .studio-tabs button { border:0; padding:9px; border-radius:999px; color:var(--cr-muted); background:transparent; cursor:pointer; }
    .studio-tabs button.active { background:color-mix(in srgb,var(--cr-accent) 20%,var(--cr-surface)); color:var(--cr-text); }
    .room-filters { display:flex; gap:7px; overflow-x:auto; padding-bottom:12px; }
    .room-filters button { white-space:nowrap; padding:7px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:transparent; color:var(--cr-muted); cursor:pointer; }
    .room-filters button.active { background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface)); color:var(--cr-text); border-color:var(--cr-accent); }
    .studio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .studio-light { position:relative; min-height:100px; padding:12px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:color-mix(in srgb,var(--cr-accent) 65%,transparent); background:color-mix(in srgb,var(--cr-accent) 14%,transparent); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:30px; height:30px; border-radius:11px; color:var(--cr-muted); background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:var(--cr-accent); background:color-mix(in srgb,var(--cr-accent) 16%,transparent); }
    .studio-light-state { position:absolute; right:14px; top:16px; color:var(--cr-muted); font-size:10px; }
    .studio-light.active .studio-light-state { color:#87d5ad; }
    .studio-light-name { margin-top:8px; font-size:14px; font-weight:650; }
    .studio-light-room { margin-top:4px; color:var(--cr-muted); font-size:11px; }
    .studio-light-level { margin-top:5px; color:var(--cr-muted); font-size:11px; }
    .studio-toggle { position:absolute; right:12px; bottom:12px; padding:4px; border:0; background:transparent; color:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); cursor:pointer; }
    .studio-toggle.on { color:var(--cr-text); }
    .studio-toggle ha-icon { --mdc-icon-size:23px; }
    .studio-detail { position:relative; margin-top:15px; padding:22px; border-radius:20px; border:1px solid color-mix(in srgb,var(--cr-accent) 25%,transparent); background:color-mix(in srgb,var(--cr-accent) 10%,transparent); }
    .studio-detail-head h2 { margin:6px 0; font-size:20px; }
    .studio-detail-head span { font-size:12px; color:var(--cr-muted); }
    .studio-detail .studio-toggle { top:20px; bottom:auto; }
    .studio-color-row {display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.035)}
    .studio-color-row strong {display:block;font-size:12px;font-weight:600}
    .studio-color-row small {display:block;margin-top:4px;color:var(--cr-muted);font-size:11px}
    .studio-color-picker {width:45px;height:37px;padding:3px;border:1px solid rgba(255,255,255,.2);border-radius:11px;background:rgba(255,255,255,.06);cursor:pointer}
    .studio-temp-range {display:flex;align-items:center;gap:12px;color:var(--cr-text)}
    .studio-temp-range ha-icon {--mdc-icon-size:18px}
    .studio-temp-range input {flex:1;min-width:0}
    .brightness-label { display:flex; justify-content:space-between; margin-top:22px; margin-bottom:12px; font-size:13px; }
    .brightness-slider { width:100%; accent-color:var(--cr-text); cursor:pointer; }
    .studio-empty { display:flex; align-items:center; gap:12px; padding:25px; color:var(--cr-muted); border:1px solid rgba(255,255,255,.08); border-radius:18px; }
    @media (max-width:600px) {
      .studio-grid { grid-template-columns:1fr; }
      .studio-hero-info { width:80%; }
      .studio-pendant { right:-40px; opacity:.6; }
      .studio-heading { align-items:start; flex-direction:column; }
    }

    .overview-card:nth-child(3) { order: 4; }
    .overview-card:nth-child(4) { order: 5; }
    .lights-card-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .lights-summary { display: flex; align-items: baseline; gap: 5px; color: var(--cr-muted); font-size: 11px; white-space: nowrap; }
    .lights-count { font-size: 20px; color: var(--cr-text); font-weight: 750; }
    .lights-summary-separator { color: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); }
    .light-list { display: flex; flex-direction: column; gap: 7px; max-height: 245px; overflow-y: auto; padding-right: 2px; }
    .light-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: rgba(255,255,255,.035); color: #c6bfce; text-align: left; cursor: pointer; transition: background 160ms, border-color 160ms; }
    .light-row:hover:not(:disabled) { background: color-mix(in srgb,var(--cr-accent) 12%,transparent); border-color: color-mix(in srgb,var(--cr-accent) 30%,transparent); }
    .light-row:focus-visible { outline: 2px solid var(--cr-text); outline-offset: 2px; }
    .light-row:disabled { opacity: .48; cursor: not-allowed; }
    .light-row.is-on { background: color-mix(in srgb,var(--cr-accent) 12%,transparent); border-color: color-mix(in srgb,var(--cr-accent) 18%,transparent); }
    .light-row-icon { display: flex; color: var(--cr-muted); }
    .light-row.is-on .light-row-icon { color: var(--cr-text); }
    .light-row-icon ha-icon { --mdc-icon-size: 20px; }
    .light-row-name { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
    .light-row-status { font-size: 10px; color: var(--cr-muted); }
    .light-row-switch { display: flex; align-items: center; flex: 0 0 31px; height: 18px; padding: 2px; border-radius: 999px; background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); }
    .light-row-switch span { width: 14px; height: 14px; border-radius: 50%; background: #d6d0dd; transition: transform 160ms; }
    .light-row-switch.on { background: var(--cr-accent); }
    .light-row-switch.on span { transform: translateX(13px); background: #fff; }

    .placeholder-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 55vh;
      text-align: center;
    }

    .placeholder-icon {
      display: grid;
      place-items: center;
      width: 82px;
      height: 82px;
      border-radius: 25px;
      color: var(--cr-text);
      background: color-mix(in srgb,var(--cr-accent) 14%,transparent);
    }

    .placeholder-icon ha-icon { --mdc-icon-size: 39px; }

    .menu-button {
      display: none;
      padding: 8px;
      border: 0;
      background: transparent;
      color: white;
      cursor: pointer;
    }

    @media (max-width: 1100px) {
      .sidebar {
        width: 210px;
        min-width: 210px;
      }

      .main { padding: 25px 22px; }

      .overview-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .connection { display: none; }
    }

    @media (max-width: 750px) {
      .dashboard { border-radius: 0; }

      .sidebar {
        position: fixed;
        z-index: 100;
        top: 0;
        bottom: 0;
        left: 0;
        width: 270px;
        transform: translateX(-100%);
        transition: transform 220ms;
        background: color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));
        box-shadow: 12px 0 40px rgba(0,0,0,0.3);
      }

      .sidebar.open { transform: translateX(0); }
      .menu-button { display: block; }
      .main { padding: 20px 16px 35px; }
      .topbar { margin-bottom: 30px; }
      .overview-grid { grid-template-columns: 1fr; }
      .overview-card { min-height: 135px; }

      .weather {
        min-width: 0;
        padding: 10px;
      }

      .weather-icon ha-icon { --mdc-icon-size: 29px; }
      .weather-temp { font-size: 16px; }
      .weather-condition { font-size: 10px; }
      .clock { padding: 10px; }
      .clock-time { font-size: 17px; }
    }

    @media (max-width: 450px) {
      .topbar {
        align-items: flex-start;
      }

      .topbar-right { gap: 6px; }

      .weather-condition { display: none; }
      .weather-icon ha-icon { --mdc-icon-size: 25px; }
      .weather { gap: 6px; }
      .clock-date { font-size: 9px; }
    }

    /* Premium Compact V3: inline light controls, no duplicated detail panel */
    .studio-grid { gap:12px; align-items:start; }
    .studio-light { min-height:66px; padding:15px 16px; border-radius:17px; transition:border-color 180ms,background 180ms; }
    .studio-light.active { border-color:color-mix(in srgb,var(--cr-accent) 28%,transparent); background:color-mix(in srgb,var(--cr-accent) 9%,transparent); }
    .studio-light-top { display:flex;align-items:center;gap:12px;min-height:36px; }
    .studio-light-icon { width:36px;height:36px;flex:none; }
    .studio-light-name { margin:0;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px; }
    .studio-light .studio-toggle { position:static;flex:none;display:grid;place-items:center;padding:3px; }
    .studio-light-state-inline,.studio-light-room { display:block;margin:5px 0 0 48px;color:var(--cr-muted);font-size:11px; }
    .studio-inline-brightness { display:flex;align-items:center;gap:11px;margin:12px 0 0 48px;min-width:0; }
    .studio-inline-slider { flex:1;min-width:0;width:100%;height:4px;margin:0;accent-color:var(--cr-accent,var(--cr-text));cursor:pointer; }
    .studio-inline-value { min-width:38px;text-align:right;font-size:12px;color:var(--cr-muted);font-variant-numeric:tabular-nums; }
    .studio-color-trigger { display:grid;place-items:center;flex:none;width:26px;height:26px;padding:2px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:9px;background:rgba(255,255,255,.045);color:var(--cr-accent,var(--cr-muted));cursor:pointer; }
    .studio-color-trigger ha-icon { --mdc-icon-size:17px; }
    .studio-color-trigger.open { background:color-mix(in srgb,var(--cr-accent) 25%,transparent);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent); }
    .studio-color-alone { margin:9px 0 0 48px; }
    .studio-inline-colors { margin:12px 0 0 48px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);display:grid;gap:9px; }
    .studio-inline-color-line { display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--cr-muted);font-size:11px; }
    .studio-inline-color-line .studio-inline-slider { max-width:65%; }
    .studio-inline-color-line .studio-color-picker { width:35px;height:29px; }
    @media (max-width:600px) { .studio-grid { grid-template-columns:1fr; } .studio-hero { padding:22px 18px; } .studio-hero-info { width:80%; } .studio-mood { font-size:23px; } .studio-mood-subtitle { max-width:220px; } .studio-pendant { right:-18px; width:135px; opacity:.85; } }

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
    .settings-center {display:grid;gap:24px;max-width:820px;width:100%;min-width:0}
    .settings-intro h1 {font-size:clamp(27px,4vw,38px);letter-spacing:-.045em;margin:9px 0 6px;color:#f7eefc}
    .settings-intro p,.settings-local-note,.settings-empty {font-size:13px;color:var(--cr-muted);margin:0}
    .settings-search {display:flex;align-items:center;gap:12px;padding:12px 15px;border-radius:15px;background:rgba(255,255,255,.045);border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);color:var(--cr-muted)}
    .settings-search ha-icon {--mdc-icon-size:20px}
    .settings-search input {background:transparent;border:0;outline:0;color:#f7eefc;font:inherit;width:100%;min-width:0}
    .settings-search input::placeholder {color:var(--cr-muted)}
    .settings-category {display:grid;gap:11px;min-width:0}
    .settings-category h2 {font-size:13px;font-weight:700;color:var(--cr-muted);margin:0 0 2px 3px}
    .settings-options {display:grid;gap:9px}
    .settings-option {display:flex;align-items:center;text-align:left;gap:14px;width:100%;min-width:0;padding:16px;border:1px solid color-mix(in srgb,var(--cr-accent) 14%,transparent);border-radius:17px;background:rgba(255,255,255,.035);color:#e9dff0;cursor:pointer;font:inherit;transition:background .15s,border-color .15s}
    .settings-option:hover,.settings-option:focus-visible {background:color-mix(in srgb,var(--cr-accent) 14%,transparent);border-color:color-mix(in srgb,var(--cr-accent) 36%,transparent)}
    .settings-option-icon {display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:13px;background:color-mix(in srgb,var(--cr-accent) 16%,transparent);color:var(--cr-text)}
    .settings-option-icon ha-icon {--mdc-icon-size:22px}
    .settings-option-copy {display:grid;gap:4px;min-width:0;flex:1}
    .settings-option-copy strong {font-size:14px;font-weight:650}
    .settings-option-copy small {font-size:11px;color:var(--cr-muted);line-height:1.5}
    .settings-option>ha-icon {--mdc-icon-size:18px;color:var(--cr-muted)}
    .settings-back {display:flex;align-items:center;gap:8px;justify-self:start;padding:8px 0;border:0;background:transparent;color:var(--cr-text);font:inherit;font-size:13px;cursor:pointer}
    .settings-back ha-icon {--mdc-icon-size:18px}
    @media(max-width:650px){.settings-center{gap:19px}.settings-option{padding:13px;gap:11px}.settings-option-icon{flex-basis:38px;width:38px;height:38px}}
    .settings-stack {display:grid;gap:18px;max-width:740px}
    .settings-stack .welcome-settings {max-width:none}
    .settings-subheading {font-size:13px;font-weight:700;color:var(--cr-text);margin-top:25px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}
    .welcome-setting-text select {width:100%;padding:10px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#fff}
    .welcome-setting-text input {width:100%}
    .settings-note {margin:12px 0 0!important;color:var(--cr-muted)!important;font-size:12px!important}
    .smart-part {display:flex;align-items:center;min-width:0}
    /* Compact information bar and personalized greeting */
    .smart-bar {display:flex;align-items:center;gap:14px;min-height:62px;padding:8px 15px;border:1px solid color-mix(in srgb,var(--cr-accent) 13%,transparent);border-radius:18px;background:color-mix(in srgb,var(--cr-accent) 10%,transparent);backdrop-filter:blur(18px)}
    .smart-bar .weather {min-width:0;min-height:0;padding:0;border:0;background:none;gap:8px;backdrop-filter:none}
    .smart-bar .weather-icon ha-icon {--mdc-icon-size:27px}
    .smart-bar .weather-temp,.smart-segment strong {font-size:15px;font-weight:700;white-space:nowrap}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:10px;color:var(--cr-muted);white-space:nowrap;margin-top:2px}
    .smart-divider {width:1px;height:32px;flex:none;background:color-mix(in srgb,var(--cr-accent) 19%,transparent)}
    .smart-segment {display:flex;align-items:center;gap:9px;min-width:0}
    .smart-segment>ha-icon {--mdc-icon-size:21px;color:var(--cr-muted);flex:none}
    .smart-segment>div {min-width:0}
    .smart-waste strong {display:block;max-width:210px;overflow:hidden;text-overflow:ellipsis}
    .welcome-title {display:flex;align-items:center;gap:14px}
    .welcome-title h1 {margin:12px 0 10px}
    .pill-avatar.avatar-large {flex:0 0 49px;width:49px;height:49px;border:1px solid color-mix(in srgb,var(--cr-accent) 40%,transparent)}
    .welcome-settings {max-width:680px;padding:25px;border:1px solid color-mix(in srgb,var(--cr-accent) 17%,transparent);border-radius:22px;background:rgba(255,255,255,.035)}
    .welcome-settings h2 {margin:12px 0;font-size:24px}
    .welcome-settings p {color:var(--cr-muted);font-size:12px;margin-bottom:24px}
    .welcome-setting-row {display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13px}
    .welcome-setting-row select,.welcome-setting-text input {padding:10px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#fff;max-width:100%}
    .welcome-setting-row input {accent-color:var(--cr-accent)}
    .welcome-setting-text {display:flex;flex-direction:column;gap:8px;margin-top:17px;color:var(--cr-muted);font-size:12px}
    @media(max-width:1100px){.topbar{align-items:flex-start;flex-wrap:wrap}.topbar-right{margin-left:auto}.smart-bar{gap:10px}}
    @media(max-width:650px){.smart-bar{gap:8px;padding:8px}.smart-bar{flex-wrap:wrap}.smart-waste strong{max-width:105px}.smart-bar .weather-condition{display:none}.hero-content{align-items:flex-start}.welcome-title h1{font-size:clamp(24px,6vw,36px)}}

    /* Mobile layout: keep the page title and Smart Glass Bar in separate rows. */
    @media (max-width: 650px) {
      .main { width:100%; min-width:0; padding:18px 16px 32px; }
      .topbar { display:flex; flex-direction:column; align-items:stretch; gap:14px; margin-bottom:32px; }
      .topbar-left { width:100%; min-width:0; justify-content:flex-start; }
      .page-heading { font-size:15px; }
      .topbar-right { display:block; width:100%; min-width:0; margin:0; }
      .smart-bar { width:100%; max-width:100%; min-width:0; min-height:58px; padding:10px 12px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:10px 8px; }
      .smart-part { min-width:0; flex:1 1 auto; }
      .smart-bar .weather { gap:7px; }
      .smart-bar .weather-temp,.smart-segment strong { font-size:13px; }
      .smart-bar .weather-condition,.smart-segment small { font-size:10px; }
      .smart-divider { height:26px; }
      .smart-segment { gap:6px; }
      .smart-segment>ha-icon { --mdc-icon-size:19px; }
      .smart-waste strong { max-width:155px; }
      .hero { min-width:0; }
      .hero-content { display:flex; flex-direction:column; align-items:flex-start; gap:18px; }
      .hero-message { width:100%; min-width:0; }
      .welcome-title { display:flex; align-items:center; gap:11px; min-width:0; }
      .welcome-title h1 { min-width:0; overflow-wrap:anywhere; font-size:clamp(25px,6.5vw,34px); line-height:1.17; letter-spacing:-.045em; }
      .pill-avatar.avatar-large { flex:0 0 43px; width:43px; height:43px; }
      .hero-message p { font-size:13px; line-height:1.55; }
      .people-pills { max-width:100%; }
      .overview-grid { margin-top:28px; gap:13px; }
      .overview-card { min-width:0; }
      .welcome-settings { padding:17px; }
      .welcome-setting-row { flex-wrap:wrap; gap:10px; }
    }
    /* Readable Smart Bar secondary labels across screen sizes */
    .smart-bar .weather-temp,.smart-segment strong {font-size:17px;font-weight:700}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:13px;color:var(--cr-text);line-height:1.35}
    .smart-segment>ha-icon {--mdc-icon-size:24px}
    @media(max-width:650px){.smart-bar .weather-temp,.smart-segment strong{font-size:16px}.smart-bar .weather-condition,.smart-segment small{display:block;font-size:12px}.smart-bar{row-gap:9px}}
    .smart-settings-module{border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);border-radius:15px;background:rgba(255,255,255,.035);overflow:hidden;margin-top:12px}
    .smart-settings-head{display:flex;align-items:center;gap:12px;padding:12px 14px}
    .smart-settings-open{display:flex;align-items:center;gap:10px;flex:1;text-align:left;background:none;border:0;color:var(--cr-text);cursor:pointer;font:inherit}
    .dashboard .smart-settings-head .smart-settings-open,.dashboard .smart-settings-head .smart-settings-open strong{color:var(--cr-text)!important}
    .smart-settings-open strong{flex:1}.smart-settings-open ha-icon{--mdc-icon-size:21px;color:var(--cr-text)}
    .smart-settings-toggle input{accent-color:var(--cr-accent);width:18px;height:18px}
    .smart-settings-body{padding:8px 15px 17px;border-top:1px solid color-mix(in srgb,var(--cr-accent) 12%,transparent);display:grid;gap:12px}
    @media (max-width: 390px) {
      .main { padding-left:12px; padding-right:12px; }
      .smart-bar { justify-content:flex-start; }
      .smart-part { flex:0 1 auto; }
      .smart-divider { display:none; }
      .welcome-title h1 { font-size:24px; }
    }


    .settings-save-bar {position:sticky;bottom:14px;z-index:5;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:14px 16px;border:1px solid color-mix(in srgb,var(--cr-accent) 30%,transparent);border-radius:17px;background:linear-gradient(120deg,color-mix(in srgb,var(--cr-accent) 97%,transparent),color-mix(in srgb,var(--cr-accent) 97%,transparent));box-shadow:0 12px 35px rgba(0,0,0,.3);backdrop-filter:blur(20px)}
    .settings-save-copy {flex:1;min-width:170px;display:grid;gap:3px}
    .settings-save-copy strong {font-size:13px;color:var(--cr-text)}
    .settings-save-copy small {font-size:11px;color:var(--cr-muted);line-height:1.4}
    .settings-cancel,.settings-save {display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 14px;border-radius:11px;border:1px solid color-mix(in srgb,var(--cr-accent) 23%,transparent);font:inherit;font-size:12px;font-weight:650;cursor:pointer}
    .settings-cancel {background:rgba(255,255,255,.05);color:var(--cr-text)}
    .settings-save {background:linear-gradient(120deg,var(--cr-accent,var(--cr-accent)),color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 70%,black));color:white;border-color:color-mix(in srgb,var(--cr-accent) 40%,transparent)}
    .settings-save:disabled {opacity:.45;cursor:not-allowed}
    .settings-save-bar ha-icon {--mdc-icon-size:17px}
    @media(max-width:500px){.settings-save-bar{bottom:8px;padding:12px}.settings-save-copy{flex-basis:100%}.settings-cancel,.settings-save{flex:1}}

    /* ControlRoom mobile compact: overrides only at phone widths. */
    @media (max-width: 650px) {
      .main { padding: 12px 12px 24px; }
      .topbar { gap: 9px; margin-bottom: 18px; }
      .topbar-left { min-height: 28px; }
      .page-heading { font-size: 14px; }
      .smart-bar {
        box-sizing: border-box; display: grid; width: 100%;
        grid-template-columns: minmax(0,1fr) minmax(0,1fr);
        gap: 10px 8px; padding: 12px; min-height: 0;
        border-radius: 17px; align-items: center;
      }
      .smart-bar .smart-part { min-width: 0; width: auto; flex: initial; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: 1 / -1; }
      .smart-bar .smart-divider { display: none; }
      .smart-bar .weather { gap: 7px; }
      .smart-bar .weather-icon ha-icon { --mdc-icon-size: 22px; }
      .smart-bar .weather-temp, .smart-bar .smart-segment strong { font-size: 14px; }
      .smart-bar .weather-condition, .smart-bar .smart-segment small { font-size: 11px; }
      .smart-bar .smart-segment > ha-icon { --mdc-icon-size: 21px; }
      .smart-bar .smart-waste strong { max-width: none; white-space: normal; line-height: 1.25; }
      .hero-content { gap: 10px; }
      .eyebrow { font-size: 10px; }
      .welcome-title { gap: 9px; }
      .welcome-title h1 { font-size: clamp(21px, 5.7vw, 27px); line-height: 1.18; margin: 6px 0; }
      .pill-avatar.avatar-large { flex-basis: 35px; width: 35px; height: 35px; }
      .hero-message p { font-size: 12px; line-height: 1.4; }
      .person-pill { padding: 3px 10px 3px 3px; gap: 7px; }
      .person-pill .pill-avatar { flex-basis: 29px; width: 29px; height: 29px; }
      .overview-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; margin-top: 20px; }
      .overview-card { min-height: 118px; padding: 14px; border-radius: 17px; }
      .card-icon ha-icon { --mdc-icon-size: 22px; }
      .card-title { font-size: 14px; }
      .card-subtitle { font-size: 10px; line-height: 1.35; }
    }
    @media (max-width: 360px) {
      .main { padding-left: 10px; padding-right: 10px; }
      .overview-card { min-height: 110px; padding: 11px; }
      .welcome-title h1 { font-size: 20px; }
      .smart-bar { padding: 10px; }
    }


    /* Adaptive Premium: respond to available dashboard width, not just screen width. */
    .main { container-type: inline-size; min-width: 0; }
    .overview-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 185px), 1fr));
      gap: clamp(10px, 1.4vw, 16px);
    }
    .overview-card {
      min-width: 0;
      min-height: clamp(122px, 13vw, 175px);
      padding: clamp(13px, 1.6vw, 22px);
    }
    .hero-message h1 { overflow-wrap: anywhere; }
    .smart-bar { max-width: 100%; box-sizing: border-box; }
    .smart-part { min-width: 0; }
    .smart-waste strong { overflow-wrap: anywhere; }

    @container (max-width: 720px) {
      .topbar { flex-wrap: wrap; gap: 10px; }
      .topbar-right { max-width: 100%; min-width: 0; }
      .overview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 22px; }
      .overview-card { min-height: 125px; padding: 15px; border-radius: 17px; }
      .hero-content { gap: 12px; }
      .welcome-title h1 { font-size: clamp(21px, 4.5cqw, 30px); line-height: 1.2; }
    }
    @container (max-width: 470px) {
      .topbar { margin-bottom: 16px; }
      .smart-bar {
        display: grid;
        width: 100%;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 10px 8px;
        padding: 11px;
        min-height: 0;
      }
      .smart-bar .smart-part { width: auto; flex: initial; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: 1 / -1; }
      .smart-bar .smart-divider { display: none; }
      .smart-bar .smart-waste strong { max-width: 100%; white-space: normal; }
      .hero-content { gap: 10px; }
      .welcome-title h1 { font-size: clamp(20px, 5.4cqw, 26px); }
      .hero-message p { font-size: 12px; }
      .overview-grid { gap: 9px; margin-top: 18px; }
      .overview-card { min-height: 116px; padding: 12px; }
      .card-title { font-size: 14px; }
      .card-subtitle { font-size: 10px; }
    }
    @container (max-width: 315px) {
      .overview-grid { grid-template-columns: 1fr; }
      .overview-card { min-height: 105px; }
      .smart-bar { grid-template-columns: 1fr; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: auto; }
    }


    /* Theme Studio v2: global palette, not just the navigation */
    .dashboard{background:radial-gradient(ellipse at 65% 0%,color-mix(in srgb,var(--cr-accent) 12%,transparent),transparent 50%),var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .sidebar{background:color-mix(in srgb,var(--cr-surface) 75%,var(--cr-bg))!important;border-right-color:color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .main{background:transparent!important;color:var(--cr-text)!important}
    .dashboard .brand-symbol{background:linear-gradient(135deg,var(--cr-accent),color-mix(in srgb,var(--cr-accent) 45%,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent))))!important;color:#fff!important;box-shadow:0 8px 24px color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .nav-item.active,.dashboard .settings-option:hover{background:color-mix(in srgb,var(--cr-accent) 23%,var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-accent) 50%,transparent)!important}
    .dashboard .nav-item.active ha-icon,.dashboard .nav-item:hover ha-icon{color:var(--cr-accent)!important}
    .dashboard .page-heading,.dashboard .brand-name,.dashboard .cr-rooms-heading h1,.dashboard .cr-room-tile-body h2,.dashboard .cr-room-visual-head h2,.dashboard .settings-center h2,.dashboard .settings-center h3{color:var(--cr-text)!important}
    .dashboard .brand-subtitle,.dashboard .cr-room-tile-body p,.dashboard .cr-room-tile-footer,.dashboard .cr-room-visual-head p,.dashboard .settings-note{color:var(--cr-muted)!important}
    .dashboard .smart-bar,.dashboard .overview-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .settings-option,.dashboard .cr-room-detail-hero{background:color-mix(in srgb,var(--cr-surface) 84%,transparent)!important;border-color:color-mix(in srgb,var(--cr-accent) 19%,transparent)!important;color:var(--cr-text)!important}
    .dashboard .smart-bar{background:color-mix(in srgb,var(--cr-surface) 90%,transparent)!important}
    .dashboard .cr-room-tile-art{background:color-mix(in srgb,var(--cr-surface) 76%,var(--cr-bg))!important}
    .dashboard .cr-room-tile-art img.cr-art-3d,.dashboard .cr-room-detail-art img.cr-art-3d{object-fit:contain!important;object-position:center!important;filter:none!important}
    .dashboard .cr-room-tile-art img.cr-art-photo,.dashboard .cr-room-detail-art img.cr-art-photo{object-fit:contain!important;object-position:center!important;filter:none!important}
    .dashboard .cr-room-tile-art:after{background:linear-gradient(transparent 60%,color-mix(in srgb,var(--cr-bg) 28%,transparent))!important}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen{border-color:var(--cr-accent)!important}
    .dashboard.cr-theme-solid .smart-bar,.dashboard.cr-theme-solid .cr-room-tile{backdrop-filter:none!important;background:var(--cr-surface)!important}
    .dashboard.cr-theme-minimal .smart-bar,.dashboard.cr-theme-minimal .cr-room-tile{box-shadow:none!important;backdrop-filter:none!important}
    .dashboard.cr-theme-light .cr-room-tile-body,.dashboard.cr-theme-light .settings-option{color:var(--cr-text)!important}
    /* Theme Studio v4 — dynamic accent across buttons, toggles and lighting */
    .dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .card-icon-wrap,.dashboard .light-icon,.dashboard .cr-room-tile-arrow,.dashboard .cr-room-actions button:first-child,
    .dashboard .settings-save,.dashboard .studio-color-trigger,.dashboard .studio-inline-slider,.dashboard .light-toggle.active,.dashboard .toggle.active,
    .dashboard .segment.active,.dashboard .tab.active,.dashboard .mode-button.active,.dashboard .scene-button.active,
    .dashboard input[type="range"],.dashboard input[type="checkbox"],.dashboard input[type="radio"]{accent-color:var(--cr-accent)!important}
    .dashboard .cr-room-actions button:first-child,.dashboard .settings-save{background:var(--cr-accent)!important;border-color:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .cr-room-tile-art,.dashboard .cr-room-detail-art{background:color-mix(in srgb,var(--cr-surface) 80%,var(--cr-bg))!important}
    .dashboard .cr-room-tile-art img,.dashboard .cr-room-detail-art img{max-width:100%;max-height:100%;object-fit:contain!important}
    .dashboard .cr-room-tile-art:after{opacity:.25!important}
    /* V35 living illustrations: compact, theme-aware, GPU-free */
    .dashboard .cr-room-illustration{display:block;width:100%;height:100%;max-width:100%;max-height:100%;overflow:visible;color:var(--cr-text);pointer-events:none}
    .dashboard .cr-room-illustration-light{opacity:0;transition:opacity .22s ease}
    .dashboard .cr-room-lit .cr-room-illustration-light{opacity:1}
    .dashboard .cr-room-tile-art:has(.cr-room-illustration){display:grid!important;place-items:center!important;padding:5px 3px 0!important}
    .dashboard .cr-room-detail-art:has(.cr-room-illustration){display:grid!important;place-items:center!important;padding:8px!important}
    .dashboard .cr-room-tile-art:has(.cr-room-illustration):after{display:none!important}
    @media(prefers-reduced-motion:reduce){.dashboard .cr-room-illustration-light{transition:none}}

    .dashboard .cr-room-lit .cr-room-tile-art{background:color-mix(in srgb,var(--cr-accent) 15%,var(--cr-surface))!important}
    .dashboard .cr-room-tile-art>ha-icon,.dashboard .cr-room-detail-art>ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-room-tile,.dashboard .cr-room-detail-hero{overflow:hidden}
    .dashboard .cr-room-tile-body,.dashboard .cr-room-tile-footer{background:transparent!important}
    /* Theme Studio v3 — unified icon and control colors */
    .dashboard ha-icon:not(.cr-keep-color),.dashboard .settings-option-icon ha-icon,.dashboard .overview-card ha-icon,.dashboard .nav-item ha-icon,.dashboard .cr-room-section ha-icon{color:var(--cr-accent)!important}
    .dashboard .settings-option-icon,.dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .nav-item.active{color:var(--cr-accent)!important}
    .dashboard button:focus-visible,.dashboard select:focus-visible{outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .cr-theme-actions .cr-set-default{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid var(--cr-accent)!important;display:inline-flex;align-items:center;gap:7px;font-weight:700}
    .dashboard .cr-theme-actions .cr-set-default *{color:inherit!important}
    @media(max-width:700px){.dashboard .cr-theme-actions{flex-wrap:wrap}.dashboard .cr-theme-actions .cr-theme-action-caption{display:none}.dashboard .cr-theme-actions .cr-set-default{flex:1 1 100%;justify-content:center}}
    .dashboard .cr-theme-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .cr-theme-choice,.dashboard .cr-theme-style-list button{background:color-mix(in srgb,var(--cr-surface) 80%,transparent)!important;color:var(--cr-text)!important}
    .dashboard.cr-theme-glass .overview-card,.dashboard.cr-theme-glass .smart-bar,.dashboard.cr-theme-glass .settings-option,.dashboard.cr-theme-glass .cr-room-tile,.dashboard.cr-theme-glass .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 67%,transparent)!important;backdrop-filter:blur(24px) saturate(145%)!important;box-shadow:0 14px 40px #00000022,inset 0 1px #ffffff18!important;border:1px solid color-mix(in srgb,var(--cr-text) 16%,transparent)!important;border-radius:22px!important}
    .dashboard.cr-theme-solid .overview-card,.dashboard.cr-theme-solid .smart-bar,.dashboard.cr-theme-solid .settings-option,.dashboard.cr-theme-solid .cr-room-tile,.dashboard.cr-theme-solid .cr-room-section{background:var(--cr-surface)!important;backdrop-filter:none!important;box-shadow:0 4px 12px #00000016!important;border:1px solid color-mix(in srgb,var(--cr-text) 11%,transparent)!important;border-radius:15px!important}
    .dashboard.cr-theme-minimal .overview-card,.dashboard.cr-theme-minimal .smart-bar,.dashboard.cr-theme-minimal .settings-option,.dashboard.cr-theme-minimal .cr-room-tile,.dashboard.cr-theme-minimal .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 58%,var(--cr-bg))!important;backdrop-filter:none!important;box-shadow:none!important;border:1px solid color-mix(in srgb,var(--cr-text) 10%,transparent)!important;border-radius:9px!important}
    .dashboard.cr-theme-minimal .overview-card{min-height:85px!important;padding:13px!important}
    .dashboard.cr-theme-minimal .settings-option{padding:11px!important}
    .dashboard.cr-theme-light .nav-item,.dashboard.cr-theme-light .settings-option,.dashboard.cr-theme-light .overview-card{color:var(--cr-text)!important}
    /* V5: room art is always clipped inside its own positioned container. */
    .dashboard .cr-room-detail-art{position:relative!important;isolation:isolate;width:100%;min-width:0;overflow:hidden!important;aspect-ratio:16/9;height:auto!important;max-height:300px}
    .dashboard .cr-room-detail-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center!important;pointer-events:none!important}
    .dashboard .cr-room-tile-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center!important;pointer-events:none!important}
    .dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1.25fr) minmax(180px,.75fr);align-items:center;min-width:0}
    .dashboard .cr-room-back{position:relative;z-index:5;pointer-events:auto;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 22%,transparent)!important}
    .dashboard .cr-room-detail-hero span,.dashboard .cr-room-kicker{color:var(--cr-accent)!important}
    .dashboard .cr-room-detail-hero p,.dashboard .cr-room-detail-head p{color:var(--cr-muted)!important}
    .dashboard .cr-room-sections{position:relative;z-index:1}
    .dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list strong,.dashboard .cr-theme-style-list small{color:var(--cr-text)!important}
    @media(max-width:640px){.dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1fr)}}
    .dashboard.cr-theme-light .nav-item:not(.active) ha-icon{color:color-mix(in srgb,var(--cr-accent) 65%,var(--cr-text))!important}
    /* V6: prevent art and device grids from escaping the room content area. */
    .dashboard .cr-rooms-page{position:relative;min-width:0;max-width:100%;overflow:hidden;color:var(--cr-text)!important}
    .dashboard .cr-room-detail-hero{position:relative;display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr)!important;gap:20px;max-width:100%;padding:16px!important}
    .dashboard .cr-room-detail-art{position:relative!important;display:block!important;width:100%!important;height:148px!important;max-height:148px!important;aspect-ratio:auto!important;overflow:hidden!important}
    .dashboard .cr-room-detail-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}
    .dashboard .cr-room-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));align-items:start;gap:12px;max-width:100%;min-width:0}
    .dashboard .cr-room-section{min-width:0;max-width:100%;overflow:hidden}
    .dashboard .cr-room-back{display:inline-flex;align-items:center;gap:6px;cursor:pointer;z-index:20!important;position:relative!important}
    .dashboard .cr-room-detail-hero,.dashboard .cr-room-section,.dashboard .cr-room-device,.dashboard .cr-room-back{color:var(--cr-text)!important}
    .dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list strong,.dashboard .cr-theme-style-list small{color:var(--cr-text)!important;opacity:1!important}
    .dashboard .cr-theme-studio{color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice{border-color:color-mix(in srgb,var(--cr-text) 25%,transparent)!important}
    .dashboard .cr-theme-studio .cr-theme-choice.chosen{border-color:var(--cr-accent)!important}
    @media(max-width:640px){.dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1fr)!important}.dashboard .cr-room-detail-art{height:160px!important;max-height:160px!important}}
    /* V6: use HA-selected palette throughout the internal ControlRoom shell. */
    .dashboard{background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .main,.dashboard .sidebar{color:var(--cr-text)!important}
    .dashboard .nav-item.active,.dashboard .settings-option:hover{border-color:var(--cr-accent)!important}
    .dashboard .cr-room-kicker,.dashboard .cr-rooms-heading p{color:var(--cr-muted)!important}

    /* V7: semantic colors for every surface, including settings and room details. */
    .dashboard .settings-intro h1,.dashboard .settings-option-copy strong,.dashboard .settings-save-copy strong,
    .dashboard .welcome-title h1,.dashboard .page-heading,.dashboard .cr-room-detail-head h2,
    .dashboard .cr-room-section h3,.dashboard .lights-count{color:var(--cr-text)!important}
    .dashboard .settings-intro p,.dashboard .settings-option-copy small,.dashboard .settings-category h2,
    .dashboard .settings-note,.dashboard .settings-local-note,.dashboard .settings-save-copy small,
    .dashboard .light-row-status,.dashboard .studio-inline-value{color:var(--cr-muted)!important}
    .dashboard .settings-option,.dashboard .settings-search,.dashboard .settings-save-bar,
    .dashboard .welcome-setting-row select,.dashboard .welcome-setting-text input,
    .dashboard .welcome-setting-text select,.dashboard .cr-room-device{
      background:var(--cr-surface)!important;color:var(--cr-text)!important;
      border-color:color-mix(in srgb,var(--cr-text) 15%,transparent)!important}
    .dashboard input,.dashboard select,.dashboard textarea{accent-color:var(--cr-accent);color:var(--cr-text)}
    .dashboard .settings-save,.dashboard .cr-theme-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .settings-cancel,.dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-room-detail-art img.cr-art-3d,.dashboard .cr-room-tile-art img.cr-art-3d{object-fit:contain!important}
    .dashboard .cr-room-detail-art img.cr-art-photo,.dashboard .cr-room-tile-art img.cr-art-photo{object-fit:cover!important}
  
    /* V8: every dashboard surface follows the selected theme, including HA/HACS */
    .dashboard .studio-hero,.dashboard .lighting-preferences{background:linear-gradient(115deg,color-mix(in srgb,var(--cr-bg) 78%,var(--cr-accent)),var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .studio-hero.lit{background:radial-gradient(ellipse at 85% 80%,color-mix(in srgb,var(--cr-accent) 17%,transparent),transparent 55%),linear-gradient(115deg,var(--cr-surface),var(--cr-bg))!important}
    .dashboard .sidebar{background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-surface))!important}
    .dashboard .main{background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio,.dashboard .settings-center,.dashboard .settings-option,.dashboard .studio-hero,.dashboard .studio-mood,.dashboard .studio-mood-subtitle{color:var(--cr-text)!important}
    .dashboard .overview-card,.dashboard .settings-option,.dashboard .cr-room-section,.dashboard .cr-room-tile,.dashboard .studio-room-card{border-color:color-mix(in srgb,var(--cr-text) 11%,transparent)!important}
    .dashboard.cr-theme-light .sidebar,.dashboard.cr-theme-light .main,.dashboard.cr-theme-light .settings-center{color:var(--cr-text)!important}
    .dashboard.cr-theme-light .settings-option,.dashboard.cr-theme-light .overview-card,.dashboard.cr-theme-light .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 92%,var(--cr-bg))!important}
    .dashboard.cr-theme-light .studio-mood,.dashboard.cr-theme-light .studio-mood-subtitle,.dashboard.cr-theme-light .nav-item,.dashboard.cr-theme-light .settings-note{color:var(--cr-text)!important}

    /* V10: bridge HA/HACS theme tokens to custom ControlRoom surfaces only. */
    .dashboard .topbar,.dashboard .studio-mood,.dashboard .settings-center{color:var(--cr-text)!important}
    .dashboard .studio-hero,.dashboard .lighting-preferences,.dashboard .cr-room-tile,.dashboard .cr-room-section,
    .dashboard .overview-card,.dashboard .settings-option,.dashboard .studio-room-card{
      box-shadow:var(--ha-card-box-shadow,0 8px 28px rgba(0,0,0,.10));
      border-radius:var(--ha-card-border-radius,var(--cr-radius));
    }
    .dashboard.cr-theme-light .studio-mood,.dashboard.cr-theme-light .overview-card,
    .dashboard.cr-theme-light .studio-room-card,.dashboard.cr-theme-light .cr-room-tile,
    .dashboard.cr-theme-light .settings-option{color:var(--cr-text)!important}
    /* V9: one scoped color system; no global HA theme mutation */
    .dashboard { color:var(--cr-text)!important; background:var(--cr-bg)!important; }
    .dashboard .sidebar {background:color-mix(in srgb,var(--cr-bg) 74%,var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-text) 10%,transparent)!important}
    .dashboard .main {background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .topbar,.dashboard .topbar-left,.dashboard .cr-theme-studio,.dashboard .settings-center {color:var(--cr-text)!important}
    .dashboard .nav-item.active,.dashboard .settings-nav-item.active {background:color-mix(in srgb,var(--cr-accent) 22%,var(--cr-surface))!important;border-color:var(--cr-accent)!important;color:var(--cr-accent)!important}
    .dashboard .nav-item.active ha-icon,.dashboard .nav-item.active svg {color:var(--cr-accent)!important}
    .dashboard .studio-mood,.dashboard .studio-mood-subtitle,.dashboard .settings-intro h1,.dashboard .page-heading,.dashboard .cr-rooms-heading h1,.dashboard .cr-room-tile-body h2,.dashboard .settings-search input {color:var(--cr-text)!important}
    .dashboard .studio-hero,.dashboard .lighting-preferences {background:linear-gradient(120deg,color-mix(in srgb,var(--cr-accent) 13%,var(--cr-surface)),var(--cr-bg))!important;border-color:color-mix(in srgb,var(--cr-accent) 20%,transparent)!important}
    .dashboard .studio-hero.lit {background:radial-gradient(ellipse at 80% 75%,color-mix(in srgb,var(--cr-accent) 16%,transparent),transparent 58%),linear-gradient(120deg,var(--cr-surface),var(--cr-bg))!important}
    .dashboard .overview-card,.dashboard .studio-room-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .cr-room-device,.dashboard .settings-option,.dashboard .cr-theme-choice,.dashboard .cr-theme-style-list button {background:color-mix(in srgb,var(--cr-surface) 91%,var(--cr-bg))!important;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 12%,transparent)!important}
    .dashboard .overview-card ha-icon,.dashboard .studio-room-card ha-icon,.dashboard .cr-room-device ha-icon,.dashboard .cr-theme-studio ha-icon {color:var(--cr-accent)}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen {border-color:var(--cr-accent)!important;box-shadow:0 0 0 1px var(--cr-accent)!important}
    .dashboard .settings-save,.dashboard .cr-theme-actions button:last-child {background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .settings-cancel,.dashboard .cr-theme-actions button:first-child {background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .settings-note,.dashboard .overview-card small,.dashboard .studio-mood-subtitle {color:var(--cr-muted)!important}
    .dashboard .cr-room-detail-art {position:relative!important;overflow:hidden!important}
    .dashboard .cr-room-detail-art img {max-width:100%!important;max-height:100%!important}
    /* V11: readable text across native HA theme variants; icons follow the chosen theme. */
    .dashboard .settings-center,.dashboard .settings-center h1,.dashboard .settings-center h2,
    .dashboard .settings-center h3,.dashboard .settings-center p,.dashboard .settings-center label,
    .dashboard .settings-center span,.dashboard .settings-center strong,
    .dashboard .cr-theme-studio h2,.dashboard .cr-theme-studio h3,
    .dashboard .cr-theme-studio .welcome-setting-row,
    .dashboard .cr-theme-studio .settings-note,
    .dashboard .cr-theme-studio .cr-theme-style-list strong,
    .dashboard .cr-theme-studio .cr-theme-style-list small,
    .dashboard .cr-theme-studio .cr-theme-choice strong,
    .dashboard .cr-theme-studio .cr-room-visual-head p,
    .dashboard .cr-theme-studio .cr-room-kicker {color:var(--cr-text)!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-theme-studio option,
    .dashboard .cr-theme-studio input {color:var(--cr-text)!important;background:var(--cr-surface)!important;border-color:color-mix(in srgb,var(--cr-text) 20%,transparent)!important}
    .dashboard .cr-theme-studio .cr-theme-choice,
    .dashboard .cr-theme-studio .cr-theme-style-list button {color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview {color:inherit}
    .dashboard .sidebar ha-icon,.dashboard .main ha-icon,
    .dashboard .sidebar svg,.dashboard .main svg {color:var(--cr-accent)!important}
    .dashboard .settings-back,.dashboard .cr-theme-actions button:first-child {color:var(--cr-text)!important}
    .dashboard .cr-theme-actions button:last-child {color:var(--cr-bg)!important}
    .dashboard .settings-center,.dashboard .cr-theme-studio {background:transparent!important}

    /* V12: consistent semantic colors scoped to ControlRoom only. */
    .dashboard .main,.dashboard .sidebar,.dashboard .topbar,.dashboard .settings-center,.dashboard .cr-theme-studio{color:var(--cr-bg-text)!important}
    .dashboard .main .page-heading,.dashboard .main .settings-intro,.dashboard .main .settings-intro h1,.dashboard .main .settings-center h1,.dashboard .main .settings-center h2,.dashboard .main .settings-center h3,.dashboard .main .settings-center p,.dashboard .main .settings-center label,.dashboard .main .settings-center span:not(.cr-theme-preview):not(.cr-theme-preview *),.dashboard .main .settings-center strong,.dashboard .main .settings-center small{color:var(--cr-bg-text)!important}
    .dashboard .sidebar .nav-item,.dashboard .sidebar .nav-item span,.dashboard .sidebar .nav-item strong,.dashboard .sidebar .sidebar-title,.dashboard .sidebar .sidebar-footer{color:var(--cr-bg-text)!important}
    .dashboard .overview-card,.dashboard .overview-card *,.dashboard .settings-option,.dashboard .settings-option *,.dashboard .cr-room-section,.dashboard .cr-room-section *,.dashboard .cr-room-tile-body,.dashboard .cr-room-tile-body *,.dashboard .cr-theme-choice,.dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list button,.dashboard .cr-theme-style-list button strong,.dashboard .cr-theme-style-list button small{color:var(--cr-text)!important}
    .dashboard .sidebar ha-icon,.dashboard .main ha-icon,.dashboard .sidebar svg,.dashboard .main svg,.dashboard .nav-item.active,.dashboard .nav-item.active ha-icon,.dashboard .cr-theme-style-list button.chosen ha-icon,.dashboard .cr-theme-choice.chosen ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-theme-actions button:last-child,.dashboard .settings-save,.dashboard button.primary,.dashboard .cr-room-actions button,.dashboard .cr-room-image-form button,.dashboard .cr-room-visual-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-on-accent)!important;border-color:var(--cr-accent)!important}
    .dashboard .cr-theme-actions button:last-child *,.dashboard .settings-save *,.dashboard button.primary *{color:var(--cr-on-accent)!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-theme-studio input,.dashboard .cr-theme-studio option{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview{color:inherit!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview span,.dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview i{color:inherit!important}
    .dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice.chosen,.dashboard .cr-theme-studio .cr-theme-style-list button.chosen{border-color:var(--cr-accent)!important}


    /* V13: HACS-only neutral interaction layer. Built-in palettes are unchanged. */
    .dashboard.cr-hacs-neutral {--cr-accent:var(--cr-neutral-bg);--cr-on-accent:var(--cr-neutral-button-text);}
    .dashboard.cr-hacs-neutral .sidebar ha-icon,
    .dashboard.cr-hacs-neutral .main ha-icon,
    .dashboard.cr-hacs-neutral .sidebar svg,
    .dashboard.cr-hacs-neutral .main svg,
    .dashboard.cr-hacs-neutral .nav-item.active,
    .dashboard.cr-hacs-neutral .nav-item.active ha-icon,
    .dashboard.cr-hacs-neutral .cr-theme-style-list button.chosen ha-icon,
    .dashboard.cr-hacs-neutral .cr-theme-choice.chosen ha-icon {color:var(--cr-neutral-bg)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child,
    .dashboard.cr-hacs-neutral .settings-save,
    .dashboard.cr-hacs-neutral button.primary,
    .dashboard.cr-hacs-neutral .cr-room-actions button,
    .dashboard.cr-hacs-neutral .cr-room-image-form button,
    .dashboard.cr-hacs-neutral .cr-room-visual-actions button:last-child {background:var(--cr-neutral-button)!important;color:var(--cr-neutral-button-text)!important;border-color:var(--cr-neutral-button)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child *,
    .dashboard.cr-hacs-neutral .settings-save *,
    .dashboard.cr-hacs-neutral button.primary * {color:var(--cr-neutral-button-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice.chosen,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list button.chosen,
    .dashboard.cr-hacs-neutral .nav-item.active {border-color:var(--cr-neutral-bg)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list button {color:var(--cr-bg-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice strong,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list strong,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list small {color:var(--cr-bg-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio select,
    .dashboard.cr-hacs-neutral .cr-theme-studio input {color:var(--cr-text)!important;background:var(--cr-surface)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-preview,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-preview * {color:inherit!important;}


    /* V15: legibility first — readable surfaces regardless of the HA gradient. */
    .dashboard .sidebar,
    .dashboard .main {text-shadow:none!important}
    .dashboard .sidebar .nav-item,
    .dashboard .sidebar .sidebar-title,
    .dashboard .sidebar .sidebar-footer,
    .dashboard .main .settings-intro,
    .dashboard .main .page-heading,
    .dashboard .main .cr-rooms-heading {color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio,
    .dashboard .settings-center {isolation:isolate}
    .dashboard .cr-theme-style-list button,
    .dashboard .cr-theme-choice,
    .dashboard .settings-option,
    .dashboard .overview-card,
    .dashboard .cr-room-section,
    .dashboard .cr-room-device,
    .dashboard .studio-room-card {
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
      backdrop-filter:none!important;
      -webkit-backdrop-filter:none!important;
    }
    .dashboard .cr-theme-style-list button *,
    .dashboard .cr-theme-choice strong,
    .dashboard .settings-option *,
    .dashboard .overview-card *,
    .dashboard .cr-room-section *,
    .dashboard .cr-room-device *,
    .dashboard .studio-room-card * {color:var(--cr-text)!important}
    .dashboard .cr-theme-choice .cr-theme-preview,
    .dashboard .cr-theme-choice .cr-theme-preview * {color:inherit!important}
    .dashboard .cr-theme-actions button:last-child,
    .dashboard .settings-save,
    .dashboard button.primary {color:var(--cr-on-accent)!important}
    .dashboard .cr-theme-actions button:last-child *,
    .dashboard .settings-save *,
    .dashboard button.primary * {color:var(--cr-on-accent)!important}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child,
    .dashboard.cr-hacs-neutral .settings-save,
    .dashboard.cr-hacs-neutral button.primary,
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child *,
    .dashboard.cr-hacs-neutral .settings-save *,
    .dashboard.cr-hacs-neutral button.primary * {color:var(--cr-neutral-button-text)!important}
    /* Premium room cards: no dead band above photo, no giant blank section. */
    .dashboard .cr-room-grid {
      grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr))!important;
      gap:16px!important;
      align-items:stretch;
    }
    .dashboard .cr-room-tile {
      display:flex!important;
      flex-direction:column!important;
      border-radius:18px!important;
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
      min-height:0!important;
      overflow:hidden!important;
      backdrop-filter:none!important;
      -webkit-backdrop-filter:none!important;
    }
    .dashboard .cr-room-tile-art {
      height:auto!important;
      aspect-ratio:16/10!important;
      flex:0 0 auto!important;
      display:block!important;
      background:var(--cr-surface)!important;
      overflow:hidden!important;
    }
    .dashboard .cr-room-tile-art img.cr-art-photo {
      position:absolute!important;inset:0!important;
      width:100%!important;height:100%!important;
      object-fit:cover!important;object-position:center!important;
    }
    .dashboard .cr-room-tile-art img.cr-art-3d {
      position:absolute!important;inset:0!important;
      width:100%!important;height:100%!important;
      object-fit:contain!important;object-position:center!important;
    }
    .dashboard .cr-room-tile-art:after {display:none!important}
    .dashboard .cr-room-tile-arrow {z-index:2!important}
    .dashboard .cr-room-tile-body {
      display:flex!important;
      flex:1 1 auto!important;
      flex-direction:column!important;
      gap:5px!important;
      padding:14px 15px 13px!important;
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-body h2 {
      margin:0!important;font-size:15px!important;
      line-height:1.3!important;color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-body p {
      margin:0!important;font-size:12px!important;
      line-height:1.5!important;color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-footer {
      margin-top:auto!important;padding-top:12px!important;
      color:var(--cr-text)!important;
      font-size:11px!important;
    }
    .dashboard .cr-room-tile-footer * {color:var(--cr-text)!important}
    @media(max-width:640px){
      .dashboard .cr-room-grid {grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}
      .dashboard .cr-room-tile-body {padding:11px!important}
      .dashboard .cr-room-tile-body h2 {font-size:13px!important}
      .dashboard .cr-room-tile-art {aspect-ratio:4/3!important}
    }


    /* V16: readable premium settings, no inherited orange focus or dim text */
    .dashboard .cr-theme-studio,.dashboard .cr-room-visual-editor{color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio h2,.dashboard .cr-theme-studio h3,.dashboard .cr-theme-studio p,.dashboard .cr-theme-studio .settings-note,
    .dashboard .cr-theme-studio .welcome-setting-row>span,.dashboard .cr-room-visual-editor h2,.dashboard .cr-room-visual-editor p,
    .dashboard .cr-room-visual-editor .welcome-setting-text,.dashboard .cr-room-visual-editor .welcome-setting-row>span,
    .dashboard .cr-room-visual-editor .settings-note{color:var(--cr-bg-text)!important;opacity:1!important}
    .dashboard .cr-theme-style-list button,.dashboard .cr-theme-choice{background:var(--cr-surface)!important;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 22%,transparent)!important}
    .dashboard .cr-theme-style-list button strong,.dashboard .cr-theme-style-list button small,.dashboard .cr-theme-choice strong{color:var(--cr-text)!important;opacity:1!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-room-visual-editor select,.dashboard .cr-room-visual-editor input{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-text) 30%,transparent)!important;outline:none!important;box-shadow:none!important;accent-color:var(--cr-accent)!important}
    .dashboard .cr-theme-studio select:focus-visible,.dashboard .cr-room-visual-editor select:focus-visible,.dashboard .cr-room-visual-editor input:focus-visible{outline:2px solid var(--cr-bg-text)!important;outline-offset:2px!important;border-color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio select option,.dashboard .cr-room-visual-editor select option{background:var(--cr-surface);color:var(--cr-text)}
    .dashboard .cr-theme-actions,.dashboard .cr-room-visual-actions{position:sticky!important;bottom:0!important;z-index:30!important;display:flex!important;justify-content:flex-end!important;gap:10px!important;padding:15px!important;margin:22px -10px -10px!important;background:var(--cr-bg)!important;border-top:1px solid color-mix(in srgb,var(--cr-bg-text) 18%,transparent)!important;box-shadow:0 -12px 25px color-mix(in srgb,var(--cr-bg) 70%,transparent)!important;border-radius:14px!important}
    .dashboard .cr-room-visual-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:12px;margin:22px 0}
    .dashboard .cr-room-visual-card{border:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent);border-radius:16px;background:var(--cr-surface);color:var(--cr-text);overflow:hidden;align-self:start}
    .dashboard .cr-room-visual-card summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;padding:17px 15px;min-height:58px}
    .dashboard .cr-room-visual-card summary::-webkit-details-marker{display:none}
    .dashboard .cr-room-visual-title{display:flex;align-items:center;gap:9px;flex:1;min-width:0}
    .dashboard .cr-room-visual-title strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-summary{font-size:11px;opacity:.8;white-space:nowrap;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-card summary ha-icon{color:var(--cr-text)!important;--mdc-icon-size:19px}
    .dashboard .cr-room-visual-card[open] summary>ha-icon:last-child{transform:rotate(180deg)}
    .dashboard .cr-room-visual-fields{display:grid;gap:13px;padding:15px;border-top:1px solid color-mix(in srgb,var(--cr-text) 16%,transparent)}
    .dashboard .cr-room-visual-fields label{display:grid;gap:7px;font-size:12px;font-weight:650;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-fields small{font-weight:400;color:var(--cr-text)!important;opacity:.75}
    .dashboard .cr-room-visual-fields input::placeholder{color:var(--cr-text)!important;opacity:.65!important}
    .dashboard .cr-room-visual-fields input,.dashboard .cr-room-visual-fields select{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:10px}
    .dashboard .cr-room-visual-actions button,.dashboard .cr-theme-actions button{min-height:42px;border-radius:12px;padding:10px 19px;font-weight:650}
    .dashboard .cr-room-visual-actions button:last-child,.dashboard .cr-theme-actions button:last-child{background:var(--cr-neutral-button)!important;color:var(--cr-neutral-button-text)!important;border:1px solid var(--cr-neutral-button)!important}
    .dashboard .cr-room-visual-actions button:first-child,.dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-text) 25%,transparent)!important}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen{border-color:var(--cr-bg-text)!important;box-shadow:inset 0 0 0 1px var(--cr-bg-text)!important}
    .dashboard .cr-theme-choice.chosen>ha-icon,.dashboard .cr-theme-style-list button.chosen>ha-icon{color:var(--cr-text)!important}
    @media(max-width:640px){.dashboard .cr-room-visual-grid{grid-template-columns:1fr}.dashboard .cr-room-visual-summary{max-width:95px;overflow:hidden;text-overflow:ellipsis}}


    .dashboard .cr-theme-preview{position:relative;overflow:hidden}
    .dashboard .cr-theme-preview .cr-theme-sample-text{position:absolute;right:13px;top:9px;font:700 14px/1 sans-serif;opacity:.95;z-index:2}
    .dashboard .cr-theme-preview .cr-theme-sample-action{position:absolute;right:13px;bottom:10px;width:28px;height:10px;border-radius:12px;z-index:2}
    /* V17 — Curated ControlRoom Theme Atelier */
    .dashboard .cr-theme-studio-v17{padding-bottom:115px!important;max-width:1000px!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice{position:relative;min-width:0;text-align:left;transition:transform .18s ease,box-shadow .18s ease}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice:hover{transform:translateY(-3px)}
    .dashboard .cr-theme-current{display:flex;align-items:center;gap:16px;padding:14px;background:var(--cr-surface);border:1px solid color-mix(in srgb,var(--cr-text) 20%,transparent);border-radius:18px;color:var(--cr-text)}
    .dashboard .cr-theme-current-swatch{display:block;width:74px;height:62px;flex-shrink:0;border-radius:12px;border:1px solid color-mix(in srgb,var(--cr-text) 15%,transparent)}
    .dashboard .cr-theme-current>span:nth-child(2){display:flex;flex-direction:column;gap:4px;flex:1;min-width:0}
    .dashboard .cr-theme-current strong{font-size:18px!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-current small{font-size:11px;color:var(--cr-muted)!important}
    .dashboard .cr-theme-current ha-icon{color:var(--cr-text)!important}
    .dashboard .cr-theme-tools{display:grid;gap:12px}
    .dashboard .cr-theme-search{display:flex;align-items:center;gap:9px;background:var(--cr-surface);border:1px solid color-mix(in srgb,var(--cr-text) 22%,transparent);border-radius:13px;padding:10px 13px;color:var(--cr-text)}
    .dashboard .cr-theme-search input{border:0!important;outline:0!important;background:transparent!important;color:var(--cr-text)!important;flex:1;min-width:0;font:inherit}
    .dashboard .cr-theme-search input::placeholder{color:var(--cr-muted)!important}
    .dashboard .cr-theme-filters{display:flex;gap:8px;flex-wrap:wrap}
    .dashboard .cr-theme-filters button,.dashboard .cr-theme-pagination button{padding:9px 14px;border-radius:100px;border:1px solid color-mix(in srgb,var(--cr-text) 22%,transparent);background:var(--cr-surface);color:var(--cr-text);cursor:pointer}
    .dashboard .cr-theme-filters button.active{background:var(--cr-text)!important;color:var(--cr-bg)!important;border-color:var(--cr-text)!important}
    .dashboard .cr-theme-collection-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .dashboard .cr-theme-collection-heading h3{margin:0}
    .dashboard .cr-theme-collection-heading span{font-size:12px;color:var(--cr-muted)}
    .dashboard .cr-theme-pagination{display:flex;align-items:center;justify-content:center;gap:18px;color:var(--cr-text)}
    .dashboard .cr-theme-pagination button:disabled{opacity:.35;cursor:default}
    /* V20: full-width premium pagination, adaptive to mobile and tablets. */
    .dashboard .cr-theme-pagination{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(180px,260px) minmax(0,1fr)!important;align-items:center!important;gap:clamp(8px,2vw,24px)!important;width:100%!important;padding:18px clamp(12px,2vw,24px)!important;box-sizing:border-box!important;margin:16px 0 28px!important;border:1px solid color-mix(in srgb,var(--cr-text) 17%,transparent)!important;border-radius:20px!important;background:color-mix(in srgb,var(--cr-surface) 88%,transparent)!important;box-shadow:0 12px 30px rgba(0,0,0,.08)!important;backdrop-filter:blur(18px)!important}
    .dashboard .cr-theme-pagination .cr-page-nav{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;width:min(100%,210px)!important;padding:13px 18px!important;border-radius:12px!important;font-weight:700!important;background:color-mix(in srgb,var(--cr-accent) 14%,var(--cr-surface))!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-accent) 28%,transparent)!important;transition:transform .15s ease,background .15s ease!important}
    .dashboard .cr-theme-pagination .cr-page-nav:last-child{justify-self:end!important}
    .dashboard .cr-theme-pagination .cr-page-nav:not(:disabled):hover{transform:translateY(-2px)!important;background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface))!important}
    .dashboard .cr-theme-pagination .cr-page-center{display:flex!important;align-items:center!important;flex-direction:column!important;gap:7px!important;min-width:0!important}
    .dashboard .cr-theme-pagination .cr-page-eyebrow{font-size:9px!important;font-weight:800!important;letter-spacing:.18em!important;color:var(--cr-muted)!important}
    .dashboard .cr-theme-pagination .cr-page-select{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:var(--cr-text)!important;position:relative!important}
    .dashboard .cr-theme-pagination .cr-page-select select{appearance:none!important;background:transparent!important;border:0!important;color:var(--cr-text)!important;font:inherit!important;font-weight:800!important;text-align:center!important;cursor:pointer!important;padding:2px 20px 2px 5px!important;outline-offset:3px!important}
    .dashboard .cr-theme-pagination .cr-page-select select option{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-pagination .cr-page-select ha-icon{position:absolute!important;right:0!important;pointer-events:none!important;--mdc-icon-size:15px!important}
    .dashboard .cr-theme-pagination .cr-page-progress{height:4px!important;width:min(100%,210px)!important;border-radius:20px!important;background:color-mix(in srgb,var(--cr-text) 13%,transparent)!important;overflow:hidden!important}
    .dashboard .cr-theme-pagination .cr-page-progress span{display:block!important;height:100%!important;border-radius:20px!important;background:var(--cr-accent)!important;transition:width .2s ease!important}
    @media(max-width:550px){.dashboard .cr-theme-pagination{grid-template-columns:1fr auto 1fr!important;padding:12px 8px!important;gap:5px!important}.dashboard .cr-theme-pagination .cr-page-nav{padding:11px 6px!important;font-size:12px!important;gap:3px!important}.dashboard .cr-theme-pagination .cr-page-select select{font-size:12px!important}.dashboard .cr-theme-pagination .cr-page-eyebrow{font-size:8px!important}}

    .dashboard .cr-theme-studio-v17 .cr-theme-actions{position:fixed!important;bottom:0!important;right:0!important;left:0!important;width:100%!important;box-sizing:border-box!important;margin:0!important;padding:14px max(22px,env(safe-area-inset-right)) calc(14px + env(safe-area-inset-bottom))!important;border-radius:0!important;z-index:9999!important;background:var(--cr-surface)!important;box-shadow:0 -10px 38px rgba(0,0,0,.24)!important;align-items:center!important;backdrop-filter:blur(22px);border-top:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent)!important}

    .dashboard .navigation-label{color:var(--cr-text)!important;opacity:.78!important;font-weight:800!important;letter-spacing:.18em!important;text-shadow:0 1px 2px color-mix(in srgb,var(--cr-bg) 30%,transparent)!important}
    .dashboard .cr-theme-studio-v17{padding-bottom:110px!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice{min-width:0}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
    .dashboard .cr-theme-action-caption{margin-right:auto;color:var(--cr-text);font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    /* V19: all settings save/discard actions use a full-viewport, always-visible footer. */
    .dashboard .settings-save-bar,
    .dashboard .cr-room-visual-actions,
    .dashboard .cr-theme-studio-v17 .cr-theme-actions{
      position:fixed!important;inset:auto 0 0 0!important;width:100%!important;
      max-width:none!important;min-width:0!important;box-sizing:border-box!important;
      margin:0!important;border-radius:0!important;z-index:9999!important;
      padding:12px max(16px,env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))!important;
      background:var(--cr-surface)!important;border:0!important;
      border-top:1px solid color-mix(in srgb,var(--cr-text) 20%,transparent)!important;
      box-shadow:0 -12px 32px rgba(0,0,0,.22)!important;
      display:flex!important;align-items:center!important;justify-content:flex-end!important;
      gap:10px!important;flex-wrap:wrap!important;
    }
    .dashboard .settings-save-bar .settings-save-copy{margin-right:auto!important;flex:1 1 190px!important}
    .dashboard .settings-center:has(.settings-save-bar),
    .dashboard .settings-center:has(.cr-room-visual-actions),
    .dashboard .cr-theme-studio-v17{padding-bottom:130px!important}
    .dashboard .settings-center{width:100%!important;max-width:none!important;box-sizing:border-box!important}
    .dashboard .settings-center .welcome-settings{max-width:1080px!important;width:100%!important;box-sizing:border-box!important}
    @media(max-width:600px){
      .dashboard .settings-save-bar .settings-save-copy{flex-basis:100%!important}
      .dashboard .settings-save-bar .settings-cancel,.dashboard .settings-save-bar .settings-save{flex:1 1 120px!important}
      .dashboard .settings-center:has(.settings-save-bar){padding-bottom:175px!important}
    }
    @media(max-width:700px){.dashboard .cr-theme-studio-v17 .cr-theme-actions{left:0!important;width:100%!important;border-radius:16px 16px 0 0!important}.dashboard .cr-theme-action-caption{display:none}.dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}

    .dashboard .cr-current-default-button{margin-left:auto;flex-shrink:0;display:inline-flex;align-items:center;gap:6px;padding:9px 12px;border:1px solid var(--cr-accent);border-radius:12px;background:var(--cr-surface);color:var(--cr-text);font-weight:700;cursor:pointer;position:relative;z-index:2}
    .dashboard .cr-current-default-button *{color:inherit!important}
    .dashboard .cr-default-feedback{margin:10px 0 0;padding:11px 14px;border:1px solid var(--cr-accent);border-radius:12px;background:var(--cr-surface);color:var(--cr-text);font-weight:700}
    @media(max-width:550px){.dashboard .cr-current-default-button{padding:9px}.dashboard .cr-current-default-button span{display:none}}
    /* V22: Visual Style gallery, with responsive live previews */
    .dashboard .cr-theme-studio-v17{container-type:inline-size;min-width:0!important;width:100%!important;max-width:none!important;box-sizing:border-box!important}
    .dashboard .cr-style-gallery{margin:22px 0 26px;min-width:0}
    .dashboard .cr-style-gallery-head{margin-bottom:15px}
    .dashboard .cr-style-gallery-head h3{margin:5px 0 4px;font-size:19px;color:var(--cr-text)!important}
    .dashboard .cr-style-gallery-head p{margin:0;font-size:12px;color:var(--cr-muted)!important;line-height:1.5}
    .dashboard .cr-style-gallery .cr-theme-style-list{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:13px!important}
    .dashboard .cr-style-gallery .cr-style-option{display:flex!important;flex-direction:column!important;align-items:stretch!important;position:relative!important;min-width:0!important;padding:10px!important;gap:10px!important;text-align:left!important;overflow:hidden!important;border-radius:17px!important;cursor:pointer!important;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important}
    .dashboard .cr-style-gallery .cr-style-option:hover{transform:translateY(-2px)}
    .dashboard .cr-style-gallery .cr-style-option.chosen{border-color:var(--cr-accent)!important;box-shadow:inset 0 0 0 1px var(--cr-accent),0 7px 25px color-mix(in srgb,var(--cr-accent) 14%,transparent)!important}
    .dashboard .cr-style-scene{display:flex;flex-direction:column;gap:9px;position:relative;isolation:isolate;height:115px;min-width:0;overflow:hidden;border-radius:12px;padding:11px;background:linear-gradient(140deg,var(--cr-bg),var(--cr-surface));border:1px solid color-mix(in srgb,var(--cr-text) 13%,transparent)}
    .dashboard .cr-style-scene-header{display:flex;gap:5px;align-items:center}
    .dashboard .cr-style-scene-header i{display:block;width:7px;height:7px;border-radius:50%;background:var(--cr-accent)}
    .dashboard .cr-style-scene-header i:nth-child(2){opacity:.55}.dashboard .cr-style-scene-header i:nth-child(3){opacity:.25}
    .dashboard .cr-style-scene-body{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:8px;flex:1;min-height:0}
    .dashboard .cr-style-scene-main,.dashboard .cr-style-scene-side{display:flex;flex-direction:column;gap:7px;padding:10px;min-width:0;border:1px solid color-mix(in srgb,var(--cr-text) 14%,transparent)}
    .dashboard .cr-style-scene-main i,.dashboard .cr-style-scene-side i{display:block;height:7px;border-radius:6px;background:color-mix(in srgb,var(--cr-text) 20%,transparent)}
    .dashboard .cr-style-scene-main i:first-child{background:var(--cr-accent);width:65%}.dashboard .cr-style-scene-main i:nth-child(2){width:88%}.dashboard .cr-style-scene-main i:nth-child(3){width:55%}.dashboard .cr-style-scene-side i{height:24px}
    .dashboard .cr-style-option.glass .cr-style-scene-main,.dashboard .cr-style-option.glass .cr-style-scene-side{border-radius:13px;background:color-mix(in srgb,var(--cr-text) 10%,transparent);backdrop-filter:blur(12px);box-shadow:inset 0 1px color-mix(in srgb,var(--cr-text) 15%,transparent),0 8px 18px #0002}
    .dashboard .cr-style-option.solid .cr-style-scene-main,.dashboard .cr-style-option.solid .cr-style-scene-side{border-radius:9px;background:var(--cr-surface);box-shadow:0 4px 8px #0001}
    .dashboard .cr-style-option.minimal .cr-style-scene-main,.dashboard .cr-style-option.minimal .cr-style-scene-side{border-radius:3px;background:transparent;border:0;border-top:1px solid color-mix(in srgb,var(--cr-text) 24%,transparent);padding:8px 2px;box-shadow:none}
    .dashboard .cr-style-option-info{display:flex;flex-direction:column;gap:4px;min-width:0;padding:2px 3px 4px}
    .dashboard .cr-style-option-info strong{font-size:13px!important;line-height:1.35}.dashboard .cr-style-option-info small{font-size:11px!important;line-height:1.45}
    .dashboard .cr-style-selected{position:absolute;right:16px;top:16px;color:var(--cr-accent)!important;background:var(--cr-surface);border-radius:50%;padding:3px;display:flex}
    .dashboard .cr-style-selected ha-icon{--mdc-icon-size:19px;color:var(--cr-accent)!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,145px),1fr))!important}
    @container (max-width:650px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @container (max-width:420px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:minmax(0,1fr)!important}.dashboard .cr-style-scene{height:105px}.dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:650px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:400px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}}


    /* V23 — compact, fluid Atelier composition */
    .dashboard .cr-atelier-heading{display:flex;align-items:center;gap:16px;min-width:0;margin:0 0 10px!important}
    .dashboard .cr-atelier-heading h2{font-size:clamp(22px,2.4vw,30px)!important;margin:3px 0!important}
    .dashboard .cr-atelier-heading p{margin:3px 0 0!important;font-size:12px!important;color:var(--cr-muted)!important}
    .dashboard .cr-atelier-back{display:grid!important;place-items:center!important;flex:0 0 42px!important;width:42px!important;height:42px!important;border-radius:14px!important;border:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent)!important;background:var(--cr-surface)!important;color:var(--cr-text)!important;cursor:pointer!important}
    .dashboard .cr-style-gallery{margin:10px 0 18px!important}
    .dashboard .cr-style-gallery-head{margin-bottom:9px!important}
    .dashboard .cr-style-gallery-head h3{font-size:16px!important}
    .dashboard .cr-style-gallery-head p{font-size:11px!important}
    .dashboard .cr-style-gallery .cr-theme-style-list{gap:10px!important}
    .dashboard .cr-style-gallery .cr-style-option{display:grid!important;grid-template-columns:minmax(0,110px) minmax(0,1fr)!important;align-items:center!important;gap:11px!important;min-height:95px!important;padding:9px!important;border-radius:14px!important}
    .dashboard .cr-style-gallery .cr-style-scene{height:72px!important;padding:7px!important;gap:5px!important;border-radius:9px!important}
    .dashboard .cr-style-gallery .cr-style-scene-body{gap:5px!important}
    .dashboard .cr-style-gallery .cr-style-scene-main,.dashboard .cr-style-gallery .cr-style-scene-side{padding:6px!important;gap:4px!important}
    .dashboard .cr-style-gallery .cr-style-scene-side i{height:13px!important}
    .dashboard .cr-style-gallery .cr-style-option-info strong{font-size:12px!important}
    .dashboard .cr-style-gallery .cr-style-option-info small{font-size:10px!important}
    .dashboard .cr-style-gallery .cr-style-selected{top:5px!important;right:5px!important}
    .dashboard .cr-theme-pagination{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)!important;gap:12px!important;align-items:center!important;max-width:100%!important;padding:12px 16px!important;margin:18px 0 26px!important;border-radius:16px!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button{display:inline-flex!important;position:static!important;inset:auto!important;transform:none!important;min-width:0!important;width:auto!important;max-width:160px!important;min-height:42px!important;padding:9px 17px!important;border-radius:12px!important;white-space:nowrap!important;font-size:13px!important;line-height:1.3!important;box-shadow:none!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button:first-child{justify-self:start!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button:last-child{justify-self:end!important}
    .dashboard .cr-theme-pagination .cr-page-center{min-width:110px!important;max-width:200px!important}
    .dashboard .cr-theme-pagination .cr-page-select select{max-width:180px!important}
    @container (max-width:900px){.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-scene{height:78px!important}}
    @container (max-width:500px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:100px minmax(0,1fr)!important}.dashboard .cr-theme-pagination{grid-template-columns:auto minmax(0,1fr) auto!important;gap:5px!important;padding:10px 7px!important}.dashboard .cr-theme-pagination .cr-atelier-page-button{padding:9px 10px!important;font-size:12px!important}.dashboard .cr-theme-pagination .cr-page-center{min-width:0!important}.dashboard .cr-theme-pagination .cr-page-select select{max-width:125px!important;font-size:11px!important}}
    @media(max-width:520px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:95px minmax(0,1fr)!important}}


    /* V27: consistent theme tokens and legible text throughout the dashboard. */
    .dashboard .premium-lights .card-icon,
    .dashboard .studio-light.active .studio-light-icon,
    .dashboard .lights-card .card-icon,
    .dashboard .studio-light-icon ha-icon {color:var(--cr-accent)!important}
    .dashboard .premium-lights.has-light {border-color:color-mix(in srgb,var(--cr-accent) 38%,transparent)!important}
    .dashboard .studio-light.active .studio-light-icon {background:color-mix(in srgb,var(--cr-accent) 17%,var(--cr-surface))!important}
    .dashboard .welcome-title h1,.dashboard .welcome-title,
    .dashboard .welcome-subtitle,.dashboard .welcome-eyebrow,
    .dashboard .hero-content p,.dashboard .person-status,
    .dashboard .person-chip small,.dashboard .brand-subtitle,
    .dashboard .sidebar-subtitle,.dashboard .navigation-label,
    .dashboard .premium-mood,.dashboard .studio-mood,
    .dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle {color:var(--cr-text)!important}
    .dashboard .welcome-subtitle,.dashboard .person-status,
    .dashboard .brand-subtitle,.dashboard .sidebar-subtitle,
    .dashboard .premium-lights .light-count {opacity:.88!important}
    .dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle {text-shadow:none!important}
    .dashboard .lights-card .premium-light-actions button,
    .dashboard .lights-card .light-action,
    .dashboard .studio-light.active {border-color:color-mix(in srgb,var(--cr-accent) 28%,transparent)}


    /* V28: One semantic secondary-color contract for every page and every theme. */
    .dashboard .eyebrow,.dashboard .cr-room-kicker,.dashboard .cr-rooms-heading p,
    .dashboard .cr-room-detail-head p,.dashboard .cr-room-detail-hero p,
    .dashboard .cr-room-detail-hero span:not(.cr-room-kicker),
    .dashboard .welcome-subtitle,.dashboard .welcome-eyebrow,
    .dashboard .brand-subtitle,.dashboard .sidebar-subtitle,
    .dashboard .person-status,.dashboard .person-chip small,
    .dashboard .settings-intro p,.dashboard .settings-local-note,
    .dashboard .settings-note,.dashboard .settings-save-copy small,
    .dashboard .settings-category h2,.dashboard .settings-option-copy small,
    .dashboard .settings-search input::placeholder,
    .dashboard .welcome-settings p,.dashboard .welcome-setting-text,
    .dashboard .cr-room-tile-body p,.dashboard .cr-room-tile-footer,
    .dashboard .cr-room-visual-head p,.dashboard .cr-room-device small,
    .dashboard .cr-theme-collection-heading span,
    .dashboard .cr-style-gallery-head p,.dashboard .cr-atelier-heading p,
    .dashboard .studio-mood-subtitle,.dashboard .studio-inline-value,
    .dashboard .light-row-status,.dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle,
    .dashboard .overview-card small,.dashboard .settings-empty,
    .dashboard .settings-save-copy small,
    .dashboard .user-status {color:var(--cr-secondary)!important;opacity:1!important}
    .dashboard .eyebrow,.dashboard .cr-room-kicker{letter-spacing:.13em}
    .dashboard .settings-search input{color:var(--cr-text)!important}
    .dashboard .settings-save-bar{background:var(--cr-surface)!important}
    .dashboard .settings-save-copy strong{color:var(--cr-text)!important}
    .dashboard .settings-save-bar .settings-save-copy{min-width:0}
    .dashboard .settings-back{color:var(--cr-accent)!important}
    .dashboard .brand-subtitle{color:var(--cr-secondary)!important}
    @media(max-width:600px){
      .dashboard .settings-save-bar .settings-save-copy{flex:1 1 100%!important}
      .dashboard .settings-save-bar .settings-cancel,
      .dashboard .settings-save-bar .settings-save{flex:1 1 0!important}
    }


    /* V33 — Lighting room selectors and filters respect the active Theme Atelier palette. */
    .dashboard .room-filters button {
      background:color-mix(in srgb,var(--cr-surface) 88%,transparent)!important;
      border-color:color-mix(in srgb,var(--cr-text) 17%,transparent)!important;
      color:var(--cr-muted)!important;
    }
    .dashboard .room-filters button.active {
      background:color-mix(in srgb,var(--cr-accent) 25%,var(--cr-surface))!important;
      border-color:var(--cr-accent)!important;
      color:var(--cr-text)!important;
    }
    .dashboard .room-filters button:focus-visible,
    .dashboard .studio-tabs button:focus-visible,
    .dashboard .ambient-room:focus-visible {outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .studio-tabs {background:color-mix(in srgb,var(--cr-surface) 87%,transparent)!important}
    .dashboard .studio-tabs button {color:var(--cr-muted)!important}
    .dashboard .studio-tabs button.active {
      background:color-mix(in srgb,var(--cr-accent) 22%,var(--cr-surface))!important;
      color:var(--cr-text)!important;
    }
    .dashboard .pref-modes button.active {
      background:color-mix(in srgb,var(--cr-accent) 25%,var(--cr-surface))!important;
      border-color:var(--cr-accent)!important;
      color:var(--cr-text)!important;
    }


    /* V34: typography scales independently of component geometry. */
    .dashboard .cr-font-setting{margin-top:9px;padding:12px 13px;border:1px solid color-mix(in srgb,var(--cr-accent) 23%,transparent);border-radius:15px;background:color-mix(in srgb,var(--cr-surface) 90%,var(--cr-accent));display:grid;gap:9px;min-width:0}
    .dashboard .cr-font-label,.dashboard .cr-font-label>span{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .dashboard .cr-font-label strong{font-size:13px;color:var(--cr-text)}
    .dashboard .cr-font-label ha-icon{--mdc-icon-size:18px;color:var(--cr-accent)}
    .dashboard .cr-font-percent{font-size:12px;font-weight:700;color:var(--cr-muted)}
    .dashboard .cr-font-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
    .dashboard .cr-font-choices button{min-width:0;min-height:34px;border:1px solid color-mix(in srgb,var(--cr-text) 12%,transparent);border-radius:9px;background:color-mix(in srgb,var(--cr-surface) 85%,transparent);color:var(--cr-text);font:600 12px inherit;cursor:pointer;touch-action:manipulation}
    .dashboard .cr-font-choices button.active{background:color-mix(in srgb,var(--cr-accent) 23%,var(--cr-surface));border-color:var(--cr-accent);color:var(--cr-text)}
    .dashboard .cr-font-status{color:var(--cr-muted);font-size:10px}
    .dashboard .page-heading{font-size:calc(15px * var(--cr-font-scale))!important}
    .dashboard .nav-item,.dashboard .sidebar-nav button{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .card-title{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .card-subtitle{font-size:calc(10px * var(--cr-font-scale))!important;line-height:1.4!important}
    .dashboard .light-row-name{font-size:calc(12px * var(--cr-font-scale))!important}
    .dashboard .light-row-status{font-size:calc(10px * var(--cr-font-scale))!important}
    .dashboard .studio-light-name{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .studio-light-state-inline,.dashboard .studio-light-room{font-size:calc(11px * var(--cr-font-scale))!important}
    .dashboard .studio-inline-value{font-size:calc(12px * var(--cr-font-scale))!important}
    .dashboard .settings-option-copy strong{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .settings-option-copy small{font-size:calc(11px * var(--cr-font-scale))!important}
    .dashboard .settings-category h2{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .cr-room-tile-body h2{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .smart-bar .weather-condition,.dashboard .smart-bar .smart-segment small{font-size:calc(12px * var(--cr-font-scale))!important}
    @media(max-width:650px){.dashboard .page-heading{font-size:calc(14px * var(--cr-font-scale))!important}.dashboard .card-title{font-size:calc(14px * var(--cr-font-scale))!important}}


    /* V47 — lighting room tiles: unified surface, no image divider, responsive names. */
    .dashboard .ambient-room-details { border-top:0!important; min-width:0!important; }
    .dashboard .ambient-room-art { border-bottom:0!important; box-shadow:none!important; }
    .dashboard .ambient-room { min-width:0!important; }
    .dashboard .ambient-room-name { display:block!important; min-width:0!important; max-width:100%!important; white-space:normal!important; overflow-wrap:anywhere!important; word-break:normal!important; text-overflow:clip!important; line-height:1.2!important; font-size:clamp(10px, 1.02vw, 13px)!important; }
    .dashboard .ambient-room-count { white-space:nowrap!important; }
    @media(max-width:850px) { .dashboard .ambient-room-name { font-size:clamp(10px, 1.65vw, 13px)!important; } }
    @media(max-width:540px) { .dashboard .ambient-room-name { font-size:clamp(10px, 3vw, 13px)!important; } }

`;
__decorate([
    n({ attribute: false })
], ControlRoomDashboard.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], ControlRoomDashboard.prototype, "config", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "activePage", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "mobileMenuOpen", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "settingsSection", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "settingsSearch", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crFontSize", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crFontSaving", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crFontMessage", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "currentTime", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "openLightColorId", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "showInlineBrightness", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "selectedRoom", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "lightsTab", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "areaNames", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "lightAreas", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "allEntityAreas", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomDetail", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomImages", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomImageEditor", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomStyle", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomAutoSwitch", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomStyleByArea", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomPhotoUrls", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomStyleEditor", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "roomImageDraft", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crTheme", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crThemeStyle", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crThemeSource", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crHATheme", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crThemeSearch", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crThemeFilter", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crThemePage", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crHAMode", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crDefaultTheme", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crDefaultFeedback", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "crDefaultStyle", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "labelOptions", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "entityLabels", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "groupMembers", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "visibilitySettingsOpen", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "groupMode", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "hiddenEntities", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "shownEntities", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "excludedLabels", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "onlyUnlabeled", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "showTypeDescriptions", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "showStatusDescriptions", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeMode", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeShowEyebrow", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeShowSubtitle", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeShowPeople", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeShowGreeting", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeEyebrow", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "welcomeSubtitle", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "smartShowWeather", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "smartShowClock", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "smartShowWaste", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "weatherSource", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "weatherEntity", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "weatherTempEntity", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "weatherConditionEntity", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "clockSource", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "clockEntity", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "clockTimezone", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "smartExpanded", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteSource", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteEntity", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteLabel", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteIcon", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteDateMode", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteSwitchTime", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "wasteCalendarEvents", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "settingsDirty", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "settingsSavedNotice", void 0);
ControlRoomDashboard = __decorate([
    t("controlroom-dashboard")
], ControlRoomDashboard);
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "controlroom-dashboard")) {
    window.customCards.push({
        type: "controlroom-dashboard",
        name: "ControlRoom Dashboard",
        description: "Premium intelligent dashboard for Home Assistant",
        preview: true
    });
}

export { ControlRoomDashboard };
//# sourceMappingURL=controlroom-dashboard.js.map
