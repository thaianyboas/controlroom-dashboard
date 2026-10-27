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
        navigation: "Navigation",
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
let ControlRoomDashboard = class ControlRoomDashboard extends i {
    constructor() {
        super(...arguments);
        this.config = {};
        this.activePage = "home";
        this.mobileMenuOpen = false;
        this.settingsSection = "overview";
        this.settingsSearch = "";
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
        this.roomStyle = "3d";
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
        this.crThemeSnapshot = "";
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
    updated() {
        void this.refreshWasteEvents();
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
        try {
            const v = JSON.parse(localStorage.getItem("controlroom-theme-v1") || "{}");
            this.crTheme = v.theme || "purple";
            this.crThemeStyle = v.style || "glass";
            this.crThemeSource = v.source || "controlroom";
            this.crHATheme = v.haTheme || "";
        }
        catch (error) {
            console.warn(error);
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
            { id: "themes", title: "Themes", description: "Farben, Designstile und Home Assistant / HACS", icon: "mdi:palette-outline", group: "Darstellung" },
            { id: "devices", title: "Geräte & Bereiche", description: "Bereiche und Entitäten · in Vorbereitung", icon: "mdi:devices", group: "Geräte & Bereiche" },
            { id: "system", title: "System", description: "Informationen und Verwaltung · in Vorbereitung", icon: "mdi:cog-outline", group: "System" }
        ];
        const matches = categories.filter(c => `${c.title} ${c.description} ${c.group}`.toLocaleLowerCase().includes(this.settingsSearch.toLocaleLowerCase().trim()));
        if (section === "overview")
            return b `<div class="settings-center">
      <div class="settings-intro"><div class="eyebrow">CONTROLROOM</div><h1>Einstellungen</h1><p>Gestalte dein Zuhause, ganz nach deinen Wünschen.</p></div>
      <label class="settings-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Einstellungen durchsuchen…" .value=${this.settingsSearch} @input=${(e) => { this.settingsSearch = e.target.value; }} aria-label="Einstellungen durchsuchen" /></label>
      ${matches.length ? [...new Set(matches.map(c => c.group))].map(group => b `<section class="settings-category"><h2>${group}</h2><div class="settings-options">${matches.filter(c => c.group === group).map(c => b `<button class="settings-option" @click=${() => { if (c.id === "welcome" || c.id === "smartbar")
                this.beginSettingsEdit(c.id);
            else {
                this.settingsSection = c.id;
                if (c.id === "rooms")
                    this.roomStyleSnapshot = JSON.stringify(this.roomVisualData());
                if (c.id === "themes")
                    this.crThemeSnapshot = JSON.stringify(this.crThemeData());
            } }}><span class="settings-option-icon">${this.renderIcon(c.icon)}</span><span class="settings-option-copy"><strong>${c.title}</strong><small>${c.description}</small></span>${this.renderIcon("mdi:chevron-right")}</button>`)}</div></section>`) : b `<p class="settings-empty">Keine passenden Einstellungen gefunden.</p>`}
      <p class="settings-local-note">Änderungen werden auf diesem Browser / Display gespeichert.</p>
    </div>`;
        if (section === "themes")
            return this.renderThemeSettings();
        if (section === "rooms")
            return b `<div class="settings-center"><button class="settings-back" @click=${() => { this.cancelRoomVisualSettings(); this.settingsSection = "overview"; }}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>${this.renderRoomStyleEditor(Object.entries(this.areaNames).sort((a, b) => a[1].localeCompare(b[1])))}</div>`;
        if (section === "appearance" || section === "devices" || section === "system")
            return b `<div class="settings-center"><button class="settings-back" @click=${() => { this.settingsSection = "overview"; }}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button><section class="welcome-settings"><div class="eyebrow">CONTROLROOM</div><h2>${categories.find(c => c.id === section)?.title}</h2><p>Dieser Bereich wird in einer späteren Etappe eingerichtet. Bestehende Einstellungen bleiben unverändert.</p></section></div>`;
        const candidates = this.getWasteCandidates().filter(e => this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
        const wasteInfo = this.getWasteInfo();
        return b `<div class="settings-stack"><button class="settings-back" @click=${() => { this.cancelSettingsEdit(); }}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>
      ${section === "welcome" ? b `<section class="welcome-settings">
        <div class="eyebrow">Startseite</div><h2>Begrüßung & Personen</h2>
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
        <div class="eyebrow">Startseite</div><h2>Smart Glass Bar</h2>
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
    renderPendant(on, brightness = 75) {
        return b `<svg class="pendant" viewBox="0 0 150 180" aria-hidden="true">
      <defs>
        <radialGradient id="cr-ambient-glow">
          <stop offset="0" stop-color="#ffcd82" stop-opacity=${on ? brightness / 115 : 0}/>
          <stop offset="1" stop-color="#ffcd82" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#62535c"/>
          <stop offset=".5" stop-color="#1b1920"/>
          <stop offset="1" stop-color="#49414b"/>
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="127" rx="74" ry="52" fill="url(#cr-ambient-glow)"/>
      <path d="M75 0V54" stroke="#716777" stroke-width="2"/>
      <rect x="69" y="51" width="12" height="12" rx="3" fill="#302a32"/>
      <path d="M69 60Q45 69 31 111Q75 127 119 111Q105 69 81 60Z"
        fill="url(#cr-metal)" stroke="#6c5a68"/>
      <ellipse cx="75" cy="111" rx="44" ry="8" fill=${on ? "#ffd18b" : "#403842"}/>
      <ellipse cx="75" cy="112" rx="26" ry="4" fill=${on ? "#fff1ca" : "#514650"}/>
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
        <div class="pendant-corner">${this.renderPendant(on > 0, avg)}</div>
        <div class="premium-lights-content">
          <div class="card-icon">${this.renderIcon("mdi:lightbulb-on-outline")}</div>
          <div class="card-title">${this.t("lights")}</div>
          <div class="premium-mood">${mood}</div>
          <div class="premium-light-status">
            <span class="premium-status-dot ${on ? "lit" : ""}"></span>
            <span>${countLabel}</span>
          </div>
          <div class="premium-actions">
            <button type="button" class="glass-action" ?disabled=${!on || !this.hass?.callService}
              @click=${() => this.setAllLights(false, lights)}>
              ${this.renderIcon("mdi:power")} ${this.t("allOff")}
            </button>
            <button type="button" class="glass-action" @click=${() => this.navigate("lights")}>
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
          <div class="studio-pendant">${this.renderPendant(on > 0, avg)}</div>
        </div>
        <div class="ambient-rooms">
          ${rooms.map(room => {
            const roomLights = lights.filter(l => this.getLightRoom(l) === room);
            const roomOn = roomLights.filter(l => l.state === "on").length;
            return b `<button type="button" class="ambient-room ${roomOn ? "illuminated" : ""}"
              @click=${() => { this.selectedRoom = room; this.openLightColorId = ""; this.lightsTab = "lights"; }}>
              <span class="ambient-room-glow"></span>
              <span class="ambient-room-icon">${this.renderIcon("mdi:home-lightbulb-outline")}</span>
              <span class="ambient-room-name">${room}</span>
              <span class="ambient-room-count">${roomOn} / ${roomLights.length}</span>
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
          <div class="brand-symbol">C</div>
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
    crThemeData() { return { theme: this.crTheme, style: this.crThemeStyle, source: this.crThemeSource, haTheme: this.crHATheme }; }
    crPalettes() {
        return [
            { id: "purple", name: "Royal Purple", accent: "#a477f5", bg: "#111019", surface: "#282037", text: "#f6f3fb" },
            { id: "blue", name: "Midnight Blue", accent: "#559cff", bg: "#0c1628", surface: "#1c304b", text: "#f5f8ff" },
            { id: "emerald", name: "Emerald", accent: "#43c6a0", bg: "#0c1b19", surface: "#1c3530", text: "#f2fff9" },
            { id: "burgundy", name: "Burgundy", accent: "#ce6c90", bg: "#221219", surface: "#3a222d", text: "#fff4f7" },
            { id: "gold", name: "Champagne Gold", accent: "#b8ab92", bg: "#1b1b1a", surface: "#2c2b29", text: "#fff9ed" },
            { id: "pearl", name: "Pearl White", accent: "#7664a9", bg: "#f5f3f8", surface: "#ffffff", text: "#30283a" },
            { id: "obsidian", name: "Obsidian", accent: "#b6b9c2", bg: "#101114", surface: "#25272c", text: "#f6f6f8" }
        ];
    }
    crThemeVars() {
        const p = this.crPalettes().find(p => p.id === this.crTheme) || this.crPalettes()[0];
        const registry = this.hass?.themes;
        const selected = this.crHATheme || registry?.theme || "";
        const raw = registry?.themes?.[selected];
        const dark = registry?.darkMode ?? false;
        const chosen = raw ? (raw[dark ? "dark" : "light"] || raw["light"] || raw["dark"] || raw) : undefined;
        const cssValue = (key) => {
            const value = chosen?.[key] ?? chosen?.[`--${key}`];
            if (typeof value === "string" && value.trim())
                return value.trim();
            // Read the HA host's computed CSS variables, not our own themed subtree.
            const host = this.getRootNode() instanceof ShadowRoot ? this.getRootNode().host : document.documentElement;
            const computed = getComputedStyle(host).getPropertyValue(`--${key}`).trim() || getComputedStyle(document.documentElement).getPropertyValue(`--${key}`).trim();
            return computed || "";
        };
        const ha = this.crThemeSource === "ha";
        const pick = (key, fallback) => ha ? (cssValue(key) || fallback) : fallback;
        const accent = pick("accent-color", pick("primary-color", p.accent));
        const bg = pick("primary-background-color", pick("lovelace-background", p.bg));
        const surface = pick("card-background-color", pick("ha-card-background", p.surface));
        const fg = pick("primary-text-color", p.text);
        const muted = pick("secondary-text-color", this.crTheme === "pearl" ? "#746c80" : "#b9b2c6");
        const radius = this.crThemeStyle === "minimal" ? "9px" : this.crThemeStyle === "solid" ? "15px" : "22px";
        return `--cr-accent:${accent};--cr-bg:${bg};--cr-surface:${surface};--cr-text:${fg};--cr-muted:${muted};--cr-radius:${radius};--cr-blur:${this.crThemeStyle === "glass" ? "blur(22px)" : "none"};--primary-color:${accent};--accent-color:${accent};--primary-text-color:${fg};--secondary-text-color:${muted};--primary-background-color:${bg};--card-background-color:${surface};--paper-item-icon-color:${accent};--state-icon-color:${accent};--mdc-theme-primary:${accent};`;
    }
    crAvailableHAThemes() {
        const themes = this.hass?.themes?.themes;
        return themes ? Object.keys(themes).sort((a, b) => a.localeCompare(b)) : [];
    }
    cancelCRTheme() { if (this.crThemeSnapshot) {
        const v = JSON.parse(this.crThemeSnapshot);
        this.crTheme = v.theme;
        this.crThemeStyle = v.style;
        this.crThemeSource = v.source;
        this.crHATheme = v.haTheme;
    } this.settingsSection = "overview"; }
    saveCRTheme() {
        try {
            localStorage.setItem("controlroom-theme-v1", JSON.stringify(this.crThemeData()));
        }
        catch (error) {
            console.warn(error);
        }
        // External theme colors are applied locally; do not change the HA theme for other dashboards.
        this.crThemeSnapshot = JSON.stringify(this.crThemeData());
        this.settingsSection = "overview";
    }
    renderThemeSettings() {
        const available = this.crAvailableHAThemes();
        return b `<div class="settings-center cr-theme-studio">
      <button class="settings-back" @click=${() => this.cancelCRTheme()}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>
      <div class="cr-room-visual-head"><div class="cr-room-kicker">CONTROLROOM · PERSONALISIERUNG</div><h2>Theme Studio</h2><p>Farben, Oberflächen und Home Assistant Themes für dein Dashboard.</p></div>
      <h3>ControlRoom Farbwelten</h3><div class="cr-theme-grid">${this.crPalettes().map(p => b `<button class="cr-theme-choice ${this.crTheme === p.id && this.crThemeSource === "controlroom" ? 'chosen' : ''}" @click=${() => { this.crTheme = p.id; this.crThemeSource = "controlroom"; }}><span class="cr-theme-preview" style=${`background:${p.bg};color:${p.text}`}><span style=${`background:${p.accent}`}></span><i style=${`background:${p.surface}`}></i><i style=${`background:${p.surface}`}></i></span><strong>${p.name}</strong>${this.crTheme === p.id && this.crThemeSource === "controlroom" ? this.renderIcon("mdi:check-circle") : A}</button>`)}</div>
      <h3>Visual Style</h3><div class="cr-theme-style-list">${[['glass', 'Glass Premium', 'Transparenz und weiche Glaseffekte'], ['solid', 'Modern Solid', 'Klare, elegante Oberflächen'], ['minimal', 'Minimal', 'Reduziert und kompakt']].map(([id, title, desc]) => b `<button class=${this.crThemeStyle === id ? 'chosen' : ''} @click=${() => this.crThemeStyle = id}><strong>${title}</strong><small>${desc}</small>${this.crThemeStyle === id ? this.renderIcon("mdi:check-circle") : A}</button>`)}</div>
      <h3>Home Assistant / HACS</h3><p class="settings-note">Folgt den Farbvariablen des aktiven Home Assistant Themes. Installierte HACS-Themes erscheinen nach dem Laden in Home Assistant.</p>
      <label class="welcome-setting-row"><span>Theme-Quelle</span><select .value=${this.crThemeSource} @change=${(e) => this.crThemeSource = e.target.value}><option value="controlroom">ControlRoom Themes</option><option value="ha">Home Assistant / HACS</option></select></label>
      ${this.crThemeSource === "ha" ? b `<label class="welcome-setting-row"><span>HA Theme (optional)</span><select .value=${this.crHATheme} @change=${(e) => this.crHATheme = e.target.value}><option value="">Aktuelles Home Assistant Theme verwenden</option>${available.map(name => b `<option value=${name}>${name}</option>`)}</select></label>` : A}
      <div class="cr-theme-actions"><button @click=${() => this.cancelCRTheme()}>Abbrechen</button><button @click=${() => this.saveCRTheme()}>Speichern</button></div>
    </div>`;
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
    roomArt(areaId, name) {
        const own = this.roomImages[areaId];
        const mode = this.roomStyleByArea[areaId] || this.roomStyle;
        const automatic = this.roomAutoSwitch && !this.roomStyleByArea[areaId] && mode !== "custom";
        const selected = automatic && Math.floor(this.currentTime.getTime() / 86400000) % 2 === 1 ? (mode === "3d" ? "photos" : "3d") : mode;
        const kind = this.roomKind(name);
        const fallback = `/local/controlroom-dashboard/controlroom-rooms-complete-assets/rooms/${kind}.webp`;
        const genericFallback = `/local/controlroom-dashboard/controlroom-rooms-complete-assets/rooms/wohnzimmer.webp`;
        const photoKinds = { pooltechnik: "heizungsraum", solartechnik: "controlraum", wintergarten: "terrasse", generic: "wohnzimmer", esszimmer: "esszimmer" };
        const photoKind = photoKinds[kind] || kind;
        const premiumPhoto = `/local/controlroom-dashboard/controlroom-premium-fotos-20-ambientes/controlroom-premium-fotos/${photoKind}.webp`;
        const image = selected === "custom" ? (own || fallback) : selected === "photos" ? (this.roomPhotoUrls[kind] || premiumPhoto) : fallback;
        return image ? b `<img class=${selected === "3d" ? "cr-art-3d" : "cr-art-photo"} src=${image} alt=${name} loading="lazy" @error=${(e) => { const el = e.target; if (!el.src.includes("complete-assets")) {
            el.src = fallback;
        }
        else if (!el.src.endsWith("/wohnzimmer.webp")) {
            el.src = genericFallback;
        }
        else {
            el.style.display = "none";
        } }}/>${this.renderIcon(this.roomIcon(name))}` : this.renderIcon(this.roomIcon(name));
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
    }
    renderRoomStyleEditor(areas) {
        return b `<div class="cr-room-visual-editor"><div class="cr-room-visual-head"><div class="cr-room-kicker">CONTROLROOM · PERSONALISIERUNG</div><h2>Räume – Bildstil</h2><p>Wähle Premium 3D, Premium Fotos oder eigene Bilder für jeden Raum.</p></div>
      <label class="welcome-setting-text">Standard-Bildstil<select .value=${this.roomStyle} @change=${(e) => this.roomStyle = e.target.value}><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select></label>
      <label class="welcome-setting-row"><span>Automatischer Bildwechsel (täglich, 3D / Fotos)</span><input type="checkbox" .checked=${this.roomAutoSwitch} @change=${(e) => this.roomAutoSwitch = e.target.checked}/></label>
      <p class="settings-note">Premium Fotos enthält 20 fertige Motive. Optional kannst du eine Foto-URL je Raum hinterlegen. Eigene Bilder werden niemals automatisch gewechselt.</p>
      ${areas.map(([id, name]) => b `<div class="cr-room-visual-row"><strong>${this.renderIcon(this.roomIcon(name))} ${name}</strong><select .value=${this.roomStyleByArea[id] || ""} @change=${(e) => { const v = e.target.value; this.roomStyleByArea = { ...this.roomStyleByArea, [id]: v }; }}><option value="">Standard</option><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select><input type="text" placeholder="Optional: anderes Premium-Foto (/local/... oder https://...)" .value=${this.roomPhotoUrls[this.roomKind(name)] || ""} @change=${(e) => { this.roomPhotoUrls = { ...this.roomPhotoUrls, [this.roomKind(name)]: e.target.value }; }}/><input type="text" placeholder="Eigenes Bild für diesen Raum: /local/..." .value=${this.roomImages[id] || ""} @change=${(e) => { this.roomImages = { ...this.roomImages, [id]: e.target.value }; }}/></div>`)}
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
        <button class="cr-room-back" @click=${() => { this.roomDetail = ""; this.roomImageEditor = false; }}>${this.renderIcon("mdi:arrow-left")} Alle Räume</button>
        <div class="cr-room-detail-head"><div><span class="cr-room-kicker">CONTROLROOM · RÄUME</span><h1>${name}</h1><p>${entities.length} Steuerungen · ${on} von ${lights.length} Lichtern an</p></div>
</div>

        <div class="cr-room-detail-hero"><div class="cr-room-detail-art">${this.roomArt(areaId, name)}</div><div><span>RAUMSTATUS</span><h2>${on ? "Gemütlich beleuchtet" : "Alles ruhig"}</h2><p>${lights.length} Lampen · ${entities.length} Steuerungen</p><div class="cr-room-actions"><button ?disabled=${!lights.length} @click=${() => this.roomLightsToggle(lights, true)}>Alle an</button><button ?disabled=${!on} @click=${() => this.roomLightsToggle(lights, false)}>Alle aus</button></div></div></div>
        <div class="cr-room-sections">${types.map(t => {
                const members = entities.filter(e => t.domain === "other" ? !types.some(x => x.domain !== "other" && e.entity_id.startsWith(x.domain + ".")) : e.entity_id.startsWith(t.domain + "."));
                return members.length ? b `<article class="cr-room-section"><header>${this.renderIcon(t.icon)} <strong>${t.label}</strong><span>${members.length}</span></header>
            ${members.length ? members.map(e => b `<div class="cr-room-device"><div><strong>${String(e.attributes.friendly_name || e.entity_id)}</strong><small>${e.state}</small></div>${["light", "switch"].some(d => e.entity_id.startsWith(d + ".")) ? b `<button ?disabled=${!["on", "off"].includes(e.state)} @click=${() => this.hass?.callService?.(e.entity_id.split(".")[0], "toggle", { entity_id: e.entity_id })}>${this.renderIcon(e.state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off-outline")}</button>` : A}</div>`) : b `<p class="cr-room-empty">Keine Geräte zugeordnet</p>`}</article>` : A;
            })}</div>
      </section>`;
        }
        return b `<section class="cr-rooms-page"><div class="cr-rooms-heading"><span class="cr-room-kicker">CONTROLROOM · SMART HOME</span><h1>Räume</h1><p>Dein Zuhause. Jeder Raum, perfekt verbunden.</p></div>
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
        return b `
      <div class=${`dashboard cr-theme-${this.crThemeStyle} ${this.crTheme === "pearl" && this.crThemeSource === "controlroom" ? "cr-theme-light" : ""}`} style=${this.crThemeVars()}>
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
                ${this.t(this.activePage)}
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
    .cr-room-kicker{font-size:10px;letter-spacing:2.4px;color:#b99bcf;font-weight:750}
    .cr-rooms-heading h1,.cr-room-detail-head h1{font-size:clamp(29px,3vw,43px);margin:9px 0 5px;font-weight:760;letter-spacing:-1px}
    .cr-rooms-heading p,.cr-room-detail-head p{color:#a99ab4;margin:0 0 24px;font-size:13px}
    .cr-room-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:17px}
    .cr-room-tile{min-width:0;padding:0;border:1px solid rgba(212,173,236,.15);border-radius:23px;overflow:hidden;background:linear-gradient(150deg,#2a2234,#191521);text-align:left;color:inherit;cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s}
    .cr-room-tile:hover{transform:translateY(-4px);border-color:rgba(207,157,242,.45);box-shadow:0 16px 45px #09061166}
    .cr-room-tile-art{height:clamp(155px,17vw,220px);position:relative;display:grid;place-items:center;background:radial-gradient(ellipse at 55% 70%,#65477580,transparent 65%),linear-gradient(140deg,#393047,#1c1827);overflow:hidden}
    .cr-room-tile-art>ha-icon{--mdc-icon-size:88px;color:#d2b7e5;filter:drop-shadow(0 15px 20px #0e0715)}
    .cr-room-tile-art img,.cr-room-detail-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
    .cr-room-tile-art:has(img) > ha-icon,.cr-room-detail-art:has(img) > ha-icon{position:absolute;opacity:0;pointer-events:none}
    .cr-room-tile-art:has(img[style*="display: none"]) > ha-icon,.cr-room-detail-art:has(img[style*="display: none"]) > ha-icon{opacity:1}
    .cr-room-tile-art:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(14,9,20,.48));pointer-events:none}
    .cr-room-lit .cr-room-tile-art img{filter:brightness(1.1) saturate(1.08)}
    .cr-room-visual-editor{margin:16px 0 22px;padding:22px;border:1px solid #cba7e344;border-radius:20px;background:linear-gradient(145deg,#31243f,#201a2c)}
    .cr-room-visual-head h2{margin:8px 0;font-size:23px}.cr-room-visual-head p{font-size:12px;color:#b9a9c8}
    .cr-room-visual-row{display:grid;grid-template-columns:minmax(130px,1fr) minmax(130px,1fr);gap:10px;padding:12px 0;border-bottom:1px solid #ffffff13}
    .cr-room-visual-row strong{display:flex;align-items:center;gap:7px;font-size:13px}.cr-room-visual-row strong ha-icon{--mdc-icon-size:19px}
    .cr-room-visual-row select,.cr-room-visual-row input{min-width:0;padding:10px;background:#30263c;border:1px solid #ffffff28;border-radius:10px;color:white}
    .cr-room-visual-row input{grid-column:1/-1}
    .cr-room-visual-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}
    .cr-room-visual-actions button{padding:11px 18px;border:1px solid #cba7e344;border-radius:10px;background:#4a365e;color:white;cursor:pointer}
    .cr-room-visual-actions button:last-child{background:#9569b7}
    @container(max-width:470px){.cr-room-visual-row{grid-template-columns:1fr}.cr-room-visual-row input{grid-column:auto}}
    .cr-room-tile-arrow{position:absolute;right:14px;top:14px;border-radius:50%;background:#ffffff22;padding:8px;display:flex}
    .cr-room-tile-arrow ha-icon{--mdc-icon-size:17px}
    .cr-room-tile-body{padding:18px 19px 17px}
    .cr-room-tile-body h2{font-size:18px;margin:0 0 5px}
    .cr-room-tile-body p{font-size:12px;color:#afa2bc;margin:0 0 18px}
    .cr-room-tile-footer{display:flex;align-items:center;gap:8px;color:#c9bed0;font-size:11px;border-top:1px solid #ffffff15;padding-top:13px}
    .cr-room-led{height:7px;width:7px;border-radius:50%;background:#716878}
    .cr-room-led.active{background:#eabf82;box-shadow:0 0 11px #eabf82}
    .cr-room-lit .cr-room-tile-art{background:radial-gradient(ellipse at 55% 75%,#aa7c6480,transparent 65%),linear-gradient(140deg,#453344,#1c1827)}
    .cr-room-back,.cr-room-image-edit{border:1px solid #ffffff25;background:#ffffff0a;color:#e8ddeb;border-radius:12px;padding:10px 13px;display:inline-flex;gap:8px;align-items:center;cursor:pointer}
    .cr-room-back ha-icon,.cr-room-image-edit ha-icon{--mdc-icon-size:17px}
    .cr-room-detail-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:23px;flex-wrap:wrap}
    .cr-room-detail-hero{display:grid;grid-template-columns:minmax(160px,1fr) minmax(170px,1fr);gap:22px;align-items:center;padding:20px;border-radius:22px;border:1px solid #ffffff20;background:linear-gradient(120deg,#33283e,#201a2b);margin-bottom:22px}
    .cr-room-detail-art{height:230px;display:grid;place-items:center;border-radius:17px;overflow:hidden;background:radial-gradient(ellipse,#654875,#282032)}
    .cr-room-detail-art>ha-icon{--mdc-icon-size:115px;color:#d8bce7}
    .cr-room-detail-hero span{font-size:10px;letter-spacing:1.8px;color:#bba8c7}
    .cr-room-detail-hero h2{font-size:25px;margin:10px 0}
    .cr-room-detail-hero p{color:#b8a8c2;font-size:13px}
    .cr-room-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}
    .cr-room-actions button,.cr-room-image-form button{background:#8b65a8;color:white;border:0;border-radius:10px;padding:10px 15px;cursor:pointer}
    .cr-room-actions button:disabled{opacity:.4;cursor:default}
    .cr-room-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:14px}
    .cr-room-section{background:#ffffff08;border:1px solid #ffffff17;border-radius:17px;padding:17px;min-width:0}
    .cr-room-section header{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid #ffffff17}
    .cr-room-section header ha-icon{color:#bba0d3;--mdc-icon-size:20px}
    .cr-room-section header span{margin-left:auto;color:#a9a0b2;font-size:12px}
    .cr-room-section:has(.cr-room-device){box-shadow:0 10px 30px #00000014}
    .cr-room-device{display:flex;align-items:center;justify-content:space-between;gap:9px;padding:12px 0;border-bottom:1px solid #ffffff0c}
    .cr-room-device strong{display:block;font-size:12px;overflow-wrap:anywhere}
    .cr-room-device small{display:block;color:#b0a4bb;margin-top:4px;font-size:11px}
    .cr-room-device button{background:none;color:#d7b6e9;border:0;cursor:pointer}
    .cr-room-empty{color:#998fa3;font-size:12px}
    .cr-room-empty-state{padding:65px 20px;text-align:center;color:#b7a8c4}
    .cr-room-empty-state>ha-icon{--mdc-icon-size:50px}
    .cr-room-image-form{background:#ffffff0b;border:1px solid #ffffff20;border-radius:15px;padding:17px;margin-bottom:17px;display:grid;gap:10px}
    .cr-room-image-form label{font-size:12px;color:#c5b5d2}
    .cr-room-image-form input{width:100%;min-width:0;border:1px solid #ffffff30;border-radius:10px;padding:12px;background:#18131f;color:white}
    .cr-room-image-form>div{display:flex;gap:10px}
    @media(max-width:640px){.cr-room-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cr-room-tile-art{height:130px}.cr-room-tile-art>ha-icon{--mdc-icon-size:62px}.cr-room-tile-body{padding:12px}.cr-room-tile-body h2{font-size:14px}.cr-room-tile-body p,.cr-room-tile-footer{font-size:10px}.cr-room-detail-hero{grid-template-columns:1fr}.cr-room-detail-art{height:190px}}
    @media(max-width:350px){.cr-room-grid{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.cr-room-tile{transition:none}}


    /* Theme Studio: isolated to this dashboard, preserving original purple default */
    .dashboard { color:var(--cr-text,#f6f3fb); background:radial-gradient(ellipse at 65% 0%,color-mix(in srgb,var(--cr-accent,#a477f5) 15%,transparent),transparent 48%),var(--cr-bg,#111019); border-radius:var(--cr-radius,22px); }
    .dashboard .sidebar { background:linear-gradient(180deg,color-mix(in srgb,var(--cr-accent,#a477f5) 13%,transparent),transparent); }
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
          rgba(114, 74, 143, 0.22),
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
        rgba(112, 82, 139, 0.13),
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
      background: linear-gradient(135deg, #a37cc5, #684c84);
      font-size: 25px;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(140,96,181,0.2);
    }

    .brand-name {
      font-size: 19px;
      font-weight: 750;
      letter-spacing: -0.05em;
    }

    .brand-subtitle {
      margin-top: 3px;
      color: #aaa3bb;
      font-size: 11px;
    }

    .navigation-label {
      margin: 0 13px 12px;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #777184;
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
      color: #bdb7c9;
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
        rgba(168,125,197,0.4),
        rgba(115,79,149,0.23)
      );
      border-color: rgba(213,174,239,0.35);
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
      background: #67527d;
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
      color: #c8c2d2;
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
      color: #a9a3b5;
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 13px;
      min-width: 165px;
      background: linear-gradient(
        130deg,
        rgba(152,113,193,0.15),
        rgba(255,255,255,0.04)
      );
    }

    .weather-icon {
      color: #d2b6f2;
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
      color: #bdb5ca;
      font-size: 11px;
      white-space: nowrap;
    }

    .weather-empty {
      color: #bdb5ca;
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
      color: #c5c0d0;
    }

    .eyebrow {
      color: #b5a1cf;
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
      color: #aaa4b8;
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
      border-color: rgba(186,150,213,0.3);
    }

    .card-icon { color: #c2a5e1; }
    .card-icon ha-icon { --mdc-icon-size: 27px; }

    .card-title {
      font-size: 17px;
      font-weight: 650;
    }

    .card-subtitle {
      margin-top: 6px;
      font-size: 12px;
      color: #9993a7;
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
      border: 1px solid rgba(203, 169, 228, 0.17);
      border-radius: 999px;
      background: linear-gradient(120deg, rgba(139, 103, 171, 0.17), rgba(255,255,255,0.035));
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
      background: #6d557e;
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
    .pill-location { color: #bcaed0; font-size: 11px; font-weight: 600; }
    .pill-location.at-home { color: #67dfb2; }


    .lights-card { gap: 13px; order: 3; }
    .premium-lights { position: relative; min-height: 190px; overflow: hidden; }
    .premium-lights.has-light { border-color: rgba(215,165,104,.32); }
    .premium-lights-content { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; height:100%; }
    .premium-lights .card-icon { color:#f1bf77; }
    .pendant-corner { position:absolute; right:-6px; top:-20px; width:135px; pointer-events:none; }
    .pendant { display:block; width:100%; height:auto; }
    .premium-count { font-size:13px; color:#c9bed1; }
    .premium-count strong { font-size:28px; color:#fff; }
    .premium-count span { color:#a99caf; }
    /* Home overview: atmosphere first, subtle live light count below. */
    .premium-mood { font-size:clamp(17px,1.6vw,21px);font-weight:750;letter-spacing:-.045em;line-height:1.12;color:#fff3f8;max-width:calc(100% - 48px);text-shadow:0 1px 16px rgba(0,0,0,.18); }
    .premium-light-status { display:flex;align-items:center;gap:7px;min-width:0;font-size:10px;line-height:1.3;color:#b9adc5;white-space:nowrap; }
    .premium-status-dot { flex:none;width:6px;height:6px;border-radius:50%;background:#81748b; }
    .premium-status-dot.lit { background:#f3c384;box-shadow:0 0 10px rgba(245,193,118,.55); }
    .premium-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; }
    .glass-action { display:flex; align-items:center; justify-content:center; gap:6px; padding:9px 11px; color:#eee2f5; background:rgba(145,109,174,.25); border:1px solid rgba(211,173,239,.2); border-radius:999px; cursor:pointer; font-size:11px; }
    .glass-action:disabled { opacity:.45; cursor:not-allowed; }
    .glass-action ha-icon { --mdc-icon-size:16px; }
    .premium-rooms { display:flex; flex-wrap:wrap; gap:5px; }
    .room-chip { display:flex; align-items:center; gap:4px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:5px 8px; border-radius:999px; font-size:10px; color:#d5c9dd; }
    .room-chip ha-icon { --mdc-icon-size:13px; color:#e6b877; }
    .lighting-studio { max-width:1100px; margin:auto; }
    .studio-heading { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:20px; }
    .studio-heading-left {display:flex;align-items:center;gap:12px;min-width:0;flex:1}
    .studio-back,.studio-settings {display:grid;place-items:center;width:38px;height:38px;flex:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.05);color:#eee2f5;cursor:pointer}
    .studio-back:hover,.studio-settings:hover {background:rgba(169,127,204,.2)}
    .lighting-preferences {margin:0 0 17px;padding:18px;border:1px solid rgba(198,160,224,.22);border-radius:20px;background:linear-gradient(130deg,#292137,#1d1b28)}
    .preferences-header {display:flex;justify-content:space-between;align-items:center;gap:10px}
    .preferences-header button {border:0;background:transparent;color:#cfc0dd;cursor:pointer}
    .pref-title {margin:18px 0 9px;color:#bba9cc;font-size:12px;font-weight:650}
    .pref-modes {display:flex;gap:7px;flex-wrap:wrap}
    .pref-modes button {padding:8px 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.04);color:#d7cbe0;cursor:pointer;font-size:12px}
    .pref-modes button.active {background:rgba(171,128,207,.3);border-color:rgba(211,174,237,.45);color:#fff}
    .pref-list {display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:7px}
    .pref-check {display:flex;align-items:center;gap:9px;min-width:0;padding:9px 11px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025);font-size:12px;color:#e7deee;cursor:pointer}
    .pref-check input {accent-color:#ad83cb}
    .pref-label-name {min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .pref-check input {flex:none} .pref-check .pref-hint {flex:none;white-space:nowrap;margin-left:auto}
    .pref-hint {color:#a899b5;font-size:10px}
    .pref-entities {display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:7px;max-height:270px;overflow-y:auto}
    .pref-entity {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025)}
    .pref-entity-name {display:flex;align-items:center;gap:8px;min-width:0;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .pref-entity-name ha-icon {--mdc-icon-size:17px;color:#c5a7da;flex:none}
    .pref-entity-name small {color:#92849e;font-size:10px}
    .pref-entity select {max-width:105px;padding:6px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#30283c;color:#f5eef9;font-size:11px}
    
    .studio-heading h1 { margin:7px 0 0; }
    .studio-total { font-size:12px; color:#b5a8c1; }
    .studio-hero { position:relative; display:flex; min-height:220px; overflow:hidden; padding:26px 28px; border:1px solid rgba(199,164,225,.2); border-radius:22px; background:linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); }
    .studio-kicker { font-size:11px; font-weight:700; letter-spacing:.15em; color:#c4b1d0; }
    .studio-mood { margin:13px 0 4px; font-size:clamp(23px,2.6vw,34px); font-weight:750; letter-spacing:-.045em; color:#fff5fa; line-height:1.15; }
    .studio-mood-subtitle { color:#c5b5cc; font-size:12px; line-height:1.5; }
    .studio-hero.lit .studio-mood { text-shadow:0 0 28px rgba(247,194,120,.15); }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:7px; margin-top:20px; background:rgba(205,177,221,.2); border:1px solid rgba(255,255,255,.07); border-radius:999px; overflow:hidden; cursor:help; }
    .studio-progress span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#b58bd7,#e4b6f1); box-shadow:0 0 15px rgba(210,163,237,.3); transition:width .55s ease; }
    .studio-actions { display:flex; gap:10px; margin-top:19px; }
    .studio-actions button { display:flex; align-items:center; justify-content:center; gap:9px; flex:1; padding:12px; border:1px solid rgba(255,255,255,.17); border-radius:999px; background:rgba(255,255,255,.035); color:#f1eaf6; cursor:pointer; }
    .studio-actions button:disabled { opacity:.4; }
    .studio-actions ha-icon { --mdc-icon-size:16px; }
    .studio-pendant { position:absolute; right:30px; top:-21px; width:195px; pointer-events:none; }
    .ambient-rooms { display:grid; grid-template-columns:repeat(auto-fit,minmax(135px,1fr)); gap:10px; margin-top:14px; }
    .ambient-room { position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:7px; min-height:105px; padding:14px; overflow:hidden; border-radius:16px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:#c9bfd3; text-align:left; cursor:pointer; }
    .ambient-room.illuminated { border-color:rgba(231,178,109,.35); }
    .ambient-room-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(ellipse at 80% 90%,rgba(247,184,96,.35),transparent 72%); transition:opacity 450ms ease; }
    .ambient-room.illuminated .ambient-room-glow { opacity:1; }
    .ambient-room-icon,.ambient-room-name,.ambient-room-count { position:relative; z-index:1; }
    .ambient-room-icon { color:#9c8bac; }
    .ambient-room.illuminated .ambient-room-icon { color:#f4c786; }
    .ambient-room-name { font-size:12px; font-weight:650; }
    .ambient-room-count { color:#aa9cb6; font-size:11px; }
    @media (prefers-reduced-motion:reduce) { .ambient-room-glow { transition:none; } }
    .studio-tabs { display:grid; grid-template-columns:1fr 1fr; margin:18px 0 12px; padding:4px; border-radius:999px; background:rgba(255,255,255,.035); }
    .studio-tabs button { border:0; padding:9px; border-radius:999px; color:#c7bacf; background:transparent; cursor:pointer; }
    .studio-tabs button.active { background:rgba(194,159,221,.2); color:#fff; }
    .room-filters { display:flex; gap:7px; overflow-x:auto; padding-bottom:12px; }
    .room-filters button { white-space:nowrap; padding:7px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:transparent; color:#c6b9d1; cursor:pointer; }
    .room-filters button.active { background:#e6dbe9; color:#251e2c; }
    .studio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .studio-light { position:relative; min-height:100px; padding:12px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:rgba(203,156,236,.65); background:rgba(158,112,189,.14); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:30px; height:30px; border-radius:11px; color:#a89db5; background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:#f2c887; background:rgba(232,179,96,.16); }
    .studio-light-state { position:absolute; right:14px; top:16px; color:#a99db5; font-size:10px; }
    .studio-light.active .studio-light-state { color:#87d5ad; }
    .studio-light-name { margin-top:8px; font-size:14px; font-weight:650; }
    .studio-light-room { margin-top:4px; color:#a99eb6; font-size:11px; }
    .studio-light-level { margin-top:5px; color:#bca8ca; font-size:11px; }
    .studio-toggle { position:absolute; right:12px; bottom:12px; padding:4px; border:0; background:transparent; color:#756b80; cursor:pointer; }
    .studio-toggle.on { color:#d6b3ed; }
    .studio-toggle ha-icon { --mdc-icon-size:23px; }
    .studio-detail { position:relative; margin-top:15px; padding:22px; border-radius:20px; border:1px solid rgba(191,149,220,.25); background:rgba(146,108,178,.1); }
    .studio-detail-head h2 { margin:6px 0; font-size:20px; }
    .studio-detail-head span { font-size:12px; color:#b7a8c5; }
    .studio-detail .studio-toggle { top:20px; bottom:auto; }
    .studio-color-row {display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.035)}
    .studio-color-row strong {display:block;font-size:12px;font-weight:600}
    .studio-color-row small {display:block;margin-top:4px;color:#a99eb6;font-size:11px}
    .studio-color-picker {width:45px;height:37px;padding:3px;border:1px solid rgba(255,255,255,.2);border-radius:11px;background:rgba(255,255,255,.06);cursor:pointer}
    .studio-temp-range {display:flex;align-items:center;gap:12px;color:#d5b3e9}
    .studio-temp-range ha-icon {--mdc-icon-size:18px}
    .studio-temp-range input {flex:1;min-width:0}
    .brightness-label { display:flex; justify-content:space-between; margin-top:22px; margin-bottom:12px; font-size:13px; }
    .brightness-slider { width:100%; accent-color:#c7a2e4; cursor:pointer; }
    .studio-empty { display:flex; align-items:center; gap:12px; padding:25px; color:#b7a8c5; border:1px solid rgba(255,255,255,.08); border-radius:18px; }
    @media (max-width:600px) {
      .studio-grid { grid-template-columns:1fr; }
      .studio-hero-info { width:80%; }
      .studio-pendant { right:-40px; opacity:.6; }
      .studio-heading { align-items:start; flex-direction:column; }
    }

    .overview-card:nth-child(3) { order: 4; }
    .overview-card:nth-child(4) { order: 5; }
    .lights-card-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .lights-summary { display: flex; align-items: baseline; gap: 5px; color: #bdb4cb; font-size: 11px; white-space: nowrap; }
    .lights-count { font-size: 20px; color: #f4e5ff; font-weight: 750; }
    .lights-summary-separator { color: #766780; }
    .light-list { display: flex; flex-direction: column; gap: 7px; max-height: 245px; overflow-y: auto; padding-right: 2px; }
    .light-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: rgba(255,255,255,.035); color: #c6bfce; text-align: left; cursor: pointer; transition: background 160ms, border-color 160ms; }
    .light-row:hover:not(:disabled) { background: rgba(174,129,207,.12); border-color: rgba(190,150,220,.3); }
    .light-row:focus-visible { outline: 2px solid #d3b3f1; outline-offset: 2px; }
    .light-row:disabled { opacity: .48; cursor: not-allowed; }
    .light-row.is-on { background: rgba(161,117,193,.12); border-color: rgba(194,153,222,.18); }
    .light-row-icon { display: flex; color: #9c8cab; }
    .light-row.is-on .light-row-icon { color: #e2b8ff; }
    .light-row-icon ha-icon { --mdc-icon-size: 20px; }
    .light-row-name { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
    .light-row-status { font-size: 10px; color: #aaa1b6; }
    .light-row-switch { display: flex; align-items: center; flex: 0 0 31px; height: 18px; padding: 2px; border-radius: 999px; background: #494253; }
    .light-row-switch span { width: 14px; height: 14px; border-radius: 50%; background: #d6d0dd; transition: transform 160ms; }
    .light-row-switch.on { background: #9872b6; }
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
      color: #d4b7ee;
      background: rgba(153,108,189,0.14);
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
        background: #211b2c;
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
    .studio-light.active { border-color:rgba(205,163,235,.28); background:rgba(159,112,192,.09); }
    .studio-light-top { display:flex;align-items:center;gap:12px;min-height:36px; }
    .studio-light-icon { width:36px;height:36px;flex:none; }
    .studio-light-name { margin:0;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px; }
    .studio-light .studio-toggle { position:static;flex:none;display:grid;place-items:center;padding:3px; }
    .studio-light-state-inline,.studio-light-room { display:block;margin:5px 0 0 48px;color:#a99eb6;font-size:11px; }
    .studio-inline-brightness { display:flex;align-items:center;gap:11px;margin:12px 0 0 48px;min-width:0; }
    .studio-inline-slider { flex:1;min-width:0;width:100%;height:4px;margin:0;accent-color:var(--cr-accent,#c8a0e6);cursor:pointer; }
    .studio-inline-value { min-width:38px;text-align:right;font-size:12px;color:#c8b6d7;font-variant-numeric:tabular-nums; }
    .studio-color-trigger { display:grid;place-items:center;flex:none;width:26px;height:26px;padding:2px;border:1px solid rgba(215,175,239,.2);border-radius:9px;background:rgba(255,255,255,.045);color:var(--cr-accent,#bda0d2);cursor:pointer; }
    .studio-color-trigger ha-icon { --mdc-icon-size:17px; }
    .studio-color-trigger.open { background:rgba(171,122,206,.25);border-color:rgba(215,175,239,.45); }
    .studio-color-alone { margin:9px 0 0 48px; }
    .studio-inline-colors { margin:12px 0 0 48px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);display:grid;gap:9px; }
    .studio-inline-color-line { display:flex;align-items:center;justify-content:space-between;gap:12px;color:#bfaed0;font-size:11px; }
    .studio-inline-color-line .studio-inline-slider { max-width:65%; }
    .studio-inline-color-line .studio-color-picker { width:35px;height:29px; }
    @media (max-width:600px) { .studio-grid { grid-template-columns:1fr; } .studio-hero { padding:22px 18px; } .studio-hero-info { width:80%; } .studio-mood { font-size:23px; } .studio-mood-subtitle { max-width:220px; } .studio-pendant { right:-38px; opacity:.65; } }

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
    .settings-center {display:grid;gap:24px;max-width:820px;width:100%;min-width:0}
    .settings-intro h1 {font-size:clamp(27px,4vw,38px);letter-spacing:-.045em;margin:9px 0 6px;color:#f7eefc}
    .settings-intro p,.settings-local-note,.settings-empty {font-size:13px;color:#b4a5c4;margin:0}
    .settings-search {display:flex;align-items:center;gap:12px;padding:12px 15px;border-radius:15px;background:rgba(255,255,255,.045);border:1px solid rgba(213,174,239,.15);color:#cbb6dc}
    .settings-search ha-icon {--mdc-icon-size:20px}
    .settings-search input {background:transparent;border:0;outline:0;color:#f7eefc;font:inherit;width:100%;min-width:0}
    .settings-search input::placeholder {color:#9f91ad}
    .settings-category {display:grid;gap:11px;min-width:0}
    .settings-category h2 {font-size:13px;font-weight:700;color:#b9a7c9;margin:0 0 2px 3px}
    .settings-options {display:grid;gap:9px}
    .settings-option {display:flex;align-items:center;text-align:left;gap:14px;width:100%;min-width:0;padding:16px;border:1px solid rgba(213,174,239,.14);border-radius:17px;background:rgba(255,255,255,.035);color:#e9dff0;cursor:pointer;font:inherit;transition:background .15s,border-color .15s}
    .settings-option:hover,.settings-option:focus-visible {background:rgba(161,112,198,.14);border-color:rgba(213,174,239,.36)}
    .settings-option-icon {display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:13px;background:rgba(174,121,214,.16);color:#d9b9f3}
    .settings-option-icon ha-icon {--mdc-icon-size:22px}
    .settings-option-copy {display:grid;gap:4px;min-width:0;flex:1}
    .settings-option-copy strong {font-size:14px;font-weight:650}
    .settings-option-copy small {font-size:11px;color:#aa9bb8;line-height:1.5}
    .settings-option>ha-icon {--mdc-icon-size:18px;color:#9f8cae}
    .settings-back {display:flex;align-items:center;gap:8px;justify-self:start;padding:8px 0;border:0;background:transparent;color:#cbb2df;font:inherit;font-size:13px;cursor:pointer}
    .settings-back ha-icon {--mdc-icon-size:18px}
    @media(max-width:650px){.settings-center{gap:19px}.settings-option{padding:13px;gap:11px}.settings-option-icon{flex-basis:38px;width:38px;height:38px}}
    .settings-stack {display:grid;gap:18px;max-width:740px}
    .settings-stack .welcome-settings {max-width:none}
    .settings-subheading {font-size:13px;font-weight:700;color:#e6d5f4;margin-top:25px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}
    .welcome-setting-text select {width:100%;padding:10px;border:1px solid rgba(211,174,239,.2);border-radius:10px;background:#30263c;color:#fff}
    .welcome-setting-text input {width:100%}
    .settings-note {margin:12px 0 0!important;color:#bcaed0!important;font-size:12px!important}
    .smart-part {display:flex;align-items:center;min-width:0}
    /* Compact information bar and personalized greeting */
    .smart-bar {display:flex;align-items:center;gap:14px;min-height:62px;padding:8px 15px;border:1px solid rgba(215,175,239,.13);border-radius:18px;background:rgba(152,113,193,.095);backdrop-filter:blur(18px)}
    .smart-bar .weather {min-width:0;min-height:0;padding:0;border:0;background:none;gap:8px;backdrop-filter:none}
    .smart-bar .weather-icon ha-icon {--mdc-icon-size:27px}
    .smart-bar .weather-temp,.smart-segment strong {font-size:15px;font-weight:700;white-space:nowrap}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:10px;color:#aaa0b9;white-space:nowrap;margin-top:2px}
    .smart-divider {width:1px;height:32px;flex:none;background:rgba(213,178,236,.19)}
    .smart-segment {display:flex;align-items:center;gap:9px;min-width:0}
    .smart-segment>ha-icon {--mdc-icon-size:21px;color:#c6a5dd;flex:none}
    .smart-segment>div {min-width:0}
    .smart-waste strong {display:block;max-width:210px;overflow:hidden;text-overflow:ellipsis}
    .welcome-title {display:flex;align-items:center;gap:14px}
    .welcome-title h1 {margin:12px 0 10px}
    .pill-avatar.avatar-large {flex:0 0 49px;width:49px;height:49px;border:1px solid rgba(223,190,245,.4)}
    .welcome-settings {max-width:680px;padding:25px;border:1px solid rgba(213,174,239,.17);border-radius:22px;background:rgba(255,255,255,.035)}
    .welcome-settings h2 {margin:12px 0;font-size:24px}
    .welcome-settings p {color:#aaa0b9;font-size:12px;margin-bottom:24px}
    .welcome-setting-row {display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13px}
    .welcome-setting-row select,.welcome-setting-text input {padding:10px;border:1px solid rgba(211,174,239,.2);border-radius:10px;background:#30263c;color:#fff;max-width:100%}
    .welcome-setting-row input {accent-color:#b58bd7}
    .welcome-setting-text {display:flex;flex-direction:column;gap:8px;margin-top:17px;color:#c8b7d6;font-size:12px}
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
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:13px;color:#d7c7e3;line-height:1.35}
    .smart-segment>ha-icon {--mdc-icon-size:24px}
    @media(max-width:650px){.smart-bar .weather-temp,.smart-segment strong{font-size:16px}.smart-bar .weather-condition,.smart-segment small{display:block;font-size:12px}.smart-bar{row-gap:9px}}
    .smart-settings-module{border:1px solid rgba(213,174,239,.15);border-radius:15px;background:rgba(255,255,255,.035);overflow:hidden;margin-top:12px}
    .smart-settings-head{display:flex;align-items:center;gap:12px;padding:12px 14px}
    .smart-settings-open{display:flex;align-items:center;gap:10px;flex:1;text-align:left;background:none;border:0;color:#f4e9fa;cursor:pointer;font:inherit}
    .smart-settings-open strong{flex:1}.smart-settings-open ha-icon{--mdc-icon-size:21px;color:#cda9e8}
    .smart-settings-toggle input{accent-color:#bd8be2;width:18px;height:18px}
    .smart-settings-body{padding:8px 15px 17px;border-top:1px solid rgba(213,174,239,.12);display:grid;gap:12px}
    @media (max-width: 390px) {
      .main { padding-left:12px; padding-right:12px; }
      .smart-bar { justify-content:flex-start; }
      .smart-part { flex:0 1 auto; }
      .smart-divider { display:none; }
      .welcome-title h1 { font-size:24px; }
    }


    .settings-save-bar {position:sticky;bottom:14px;z-index:5;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:14px 16px;border:1px solid rgba(207,164,238,.3);border-radius:17px;background:linear-gradient(120deg,rgba(49,37,66,.97),rgba(31,26,42,.97));box-shadow:0 12px 35px rgba(0,0,0,.3);backdrop-filter:blur(20px)}
    .settings-save-copy {flex:1;min-width:170px;display:grid;gap:3px}
    .settings-save-copy strong {font-size:13px;color:#f6eafd}
    .settings-save-copy small {font-size:11px;color:#c2b0d1;line-height:1.4}
    .settings-cancel,.settings-save {display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 14px;border-radius:11px;border:1px solid rgba(213,174,239,.23);font:inherit;font-size:12px;font-weight:650;cursor:pointer}
    .settings-cancel {background:rgba(255,255,255,.05);color:#dfd2e9}
    .settings-save {background:linear-gradient(120deg,var(--cr-accent,#a579ce),color-mix(in srgb,var(--cr-accent,#8059ac) 70%,black));color:white;border-color:rgba(233,204,255,.4)}
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
    .dashboard .brand-symbol{background:linear-gradient(135deg,var(--cr-accent),color-mix(in srgb,var(--cr-accent) 45%,#17131c))!important;color:#fff!important;box-shadow:0 8px 24px color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
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
    .dashboard .cr-room-lit .cr-room-tile-art{background:color-mix(in srgb,var(--cr-accent) 15%,var(--cr-surface))!important}
    .dashboard .cr-room-tile-art>ha-icon,.dashboard .cr-room-detail-art>ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-room-tile,.dashboard .cr-room-detail-hero{overflow:hidden}
    .dashboard .cr-room-tile-body,.dashboard .cr-room-tile-footer{background:transparent!important}
    /* Theme Studio v3 — unified icon and control colors */
    .dashboard ha-icon:not(.cr-keep-color),.dashboard .settings-option-icon ha-icon,.dashboard .overview-card ha-icon,.dashboard .nav-item ha-icon,.dashboard .cr-room-section ha-icon{color:var(--cr-accent)!important}
    .dashboard .settings-option-icon,.dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .nav-item.active{color:var(--cr-accent)!important}
    .dashboard button:focus-visible,.dashboard select:focus-visible{outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .cr-theme-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .cr-theme-choice,.dashboard .cr-theme-style-list button{background:color-mix(in srgb,var(--cr-surface) 80%,transparent)!important;color:var(--cr-text)!important}
    .dashboard.cr-theme-glass .overview-card,.dashboard.cr-theme-glass .smart-bar,.dashboard.cr-theme-glass .settings-option,.dashboard.cr-theme-glass .cr-room-tile,.dashboard.cr-theme-glass .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 67%,transparent)!important;backdrop-filter:blur(24px) saturate(145%)!important;box-shadow:0 14px 40px #00000022,inset 0 1px #ffffff18!important;border:1px solid color-mix(in srgb,var(--cr-text) 16%,transparent)!important;border-radius:22px!important}
    .dashboard.cr-theme-solid .overview-card,.dashboard.cr-theme-solid .smart-bar,.dashboard.cr-theme-solid .settings-option,.dashboard.cr-theme-solid .cr-room-tile,.dashboard.cr-theme-solid .cr-room-section{background:var(--cr-surface)!important;backdrop-filter:none!important;box-shadow:0 4px 12px #00000016!important;border:1px solid color-mix(in srgb,var(--cr-text) 11%,transparent)!important;border-radius:15px!important}
    .dashboard.cr-theme-minimal .overview-card,.dashboard.cr-theme-minimal .smart-bar,.dashboard.cr-theme-minimal .settings-option,.dashboard.cr-theme-minimal .cr-room-tile,.dashboard.cr-theme-minimal .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 58%,var(--cr-bg))!important;backdrop-filter:none!important;box-shadow:none!important;border:1px solid color-mix(in srgb,var(--cr-text) 10%,transparent)!important;border-radius:9px!important}
    .dashboard.cr-theme-minimal .overview-card{min-height:85px!important;padding:13px!important}
    .dashboard.cr-theme-minimal .settings-option{padding:11px!important}
    .dashboard.cr-theme-light .nav-item,.dashboard.cr-theme-light .settings-option,.dashboard.cr-theme-light .overview-card{color:var(--cr-text)!important}
    .dashboard.cr-theme-light .nav-item:not(.active) ha-icon{color:color-mix(in srgb,var(--cr-accent) 65%,var(--cr-text))!important}

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
