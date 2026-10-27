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
        this.currentTime = new Date();
        this.selectedLightId = "";
        this.selectedRoom = "";
        this.lightsTab = "lights";
        this.areaNames = {};
        this.lightAreas = {};
        this.registryLoaded = false;
        this.registryLoading = false;
    }
    setConfig(config) {
        this.config = config;
    }
    getCardSize() {
        return 12;
    }
    updated() {
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
            this.lightAreas = Object.fromEntries(entities.filter(e => e.entity_id.startsWith("light.")).map(e => [
                e.entity_id, e.area_id || (e.device_id ? deviceArea.get(e.device_id) : "") || ""
            ]));
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
        this.currentTime = new Date();
        this.clockInterval = setInterval(() => {
            this.currentTime = new Date();
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
        const states = this.hass?.states;
        if (!states)
            return undefined;
        const configured = this.config.weather_entity;
        if (configured)
            return states[configured];
        const candidates = Object.values(states).filter((entity) => entity.entity_id.startsWith("weather.") &&
            entity.state !== "unknown" &&
            entity.state !== "unavailable");
        return candidates[0];
    }
    getWeatherTemperature(weather) {
        const raw = weather.attributes.temperature;
        if (typeof raw !== "number" || !Number.isFinite(raw)) {
            return "—";
        }
        const unit = weather.attributes.temperature_unit;
        const displayUnit = typeof unit === "string"
            ? unit
            : this.hass?.config?.unit_system?.temperature || "°C";
        return `${Math.round(raw)} ${displayUnit}`;
    }
    getWeatherDescription(condition) {
        const key = weatherKeys[condition];
        return key ? this.t(key) : condition.replace(/-/g, " ");
    }
    navigate(page) {
        this.activePage = page;
        this.mobileMenuOpen = false;
    }
    renderIcon(icon) {
        return b `<ha-icon .icon=${icon}></ha-icon>`;
    }
    renderWeather() {
        const weather = this.getWeather();
        if (!weather) {
            return b `
        <div class="weather weather-empty">
          ${this.renderIcon("mdi:weather-cloudy-alert")}
          <span>${this.t("weatherUnavailable")}</span>
        </div>
      `;
        }
        const icon = weatherIcons[weather.state] ||
            "mdi:weather-cloudy";
        return b `
      <div class="weather" title=${weather.entity_id}>
        <div class="weather-icon">
          ${this.renderIcon(icon)}
        </div>
        <div class="weather-details">
          <div class="weather-temp">
            ${this.getWeatherTemperature(weather)}
          </div>
          <div class="weather-condition">
            ${this.getWeatherDescription(weather.state)}
          </div>
        </div>
      </div>
    `;
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
    renderPeoplePills() {
        const people = this.getPeople();
        if (!people.length)
            return A;
        return b `
      <div class="people-pills" aria-label=${this.t("people")}>
        ${people.map((person) => {
            const picture = person.attributes.entity_picture;
            const hasPicture = typeof picture === "string" &&
                (picture.startsWith("/") || picture.startsWith("https://") ||
                    picture.startsWith("http://"));
            const isHome = person.state === "home";
            const name = this.getPersonName(person);
            return b `
            <div class="person-pill" title=${`${name} · ${this.getPersonLocation(person)}`}>
              <div class="pill-avatar">
                ${hasPicture
                ? b `<img src=${picture} alt=${name} loading="lazy" />`
                : b `<span>${name.charAt(0).toUpperCase()}</span>`}
              </div>
              <div class="pill-details">
                <span class="pill-name">${name}</span>
                <span class="pill-location ${isHome ? "at-home" : ""}">
                  ${this.getPersonLocation(person)}
                </span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
    }
    getLights() {
        const states = this.hass?.states ?? {};
        const lights = Object.values(states).filter((entity) => entity.entity_id.startsWith("light."));
        // Exclude a group when all its members are available as individual lights.
        // This avoids counting the same lights twice while keeping individual controls.
        return lights.filter((entity) => {
            const members = entity.attributes.entity_id;
            if (!Array.isArray(members) || members.length === 0)
                return true;
            const lightMembers = members.filter((id) => typeof id === "string" && id.startsWith("light."));
            return !(lightMembers.length > 0 &&
                lightMembers.every((id) => Boolean(states[id])));
        }).sort((a, b) => this.getLightName(a).localeCompare(this.getLightName(b), this.getLanguage()));
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
        const off = lights.filter(l => l.state === "off").length;
        const lit = lights.filter(l => l.state === "on");
        const avg = lit.length ? lit.reduce((n, l) => n + this.getBrightness(l), 0) / lit.length : 0;
        const roomNames = [...new Set(lit.map(l => this.getLightRoom(l)))].slice(0, 3);
        return b `
      <article class="overview-card lights-card premium-lights ${on ? "has-light" : ""}">
        <div class="pendant-corner">${this.renderPendant(on > 0, avg)}</div>
        <div class="premium-lights-content">
          <div class="card-icon">${this.renderIcon("mdi:lightbulb-on-outline")}</div>
          <div class="card-title">${this.t("lights")}</div>
          <div class="premium-count"><strong>${on}</strong> ${this.t("lightsOn")}
            <span>· ${off} ${this.t("lightsOff")}</span>
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
          <div class="premium-rooms">
            ${roomNames.length ? roomNames.map(name => b `
              <span class="room-chip">${this.renderIcon("mdi:lightbulb-on-outline")}${name}</span>
            `) : b `<span class="room-chip">${this.t("noLights") === "" ? "" : `${lights.length} ${this.t("lights")}`}</span>`}
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
        const chosen = lights.find(l => l.entity_id === this.selectedLightId) || filtered[0];
        const avg = on ? lights.filter(l => l.state === "on").reduce((n, l) => n + this.getBrightness(l), 0) / on : 0;
        return b `
      <section class="lighting-studio">
        <div class="studio-heading">
          <div><div class="eyebrow">CONTROLROOM / SMART HOME</div>
            <h1>${this.t("lighting")}</h1></div>
          <span class="studio-total">${on} ${this.t("lightsOn")} · ${available.length - on} ${this.t("lightsOff")}</span>
        </div>
        <div class="studio-hero ${on ? "lit" : ""}">
          <div class="studio-hero-info">
            <div class="studio-kicker">${this.t("lighting")}</div>
            <div class="studio-number"><strong>${on}</strong> / ${available.length} ${this.t("lightsOn")}</div>
            <div class="studio-progress"><span style=${`width:${available.length ? on / available.length * 100 : 0}%`}></span></div>
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
              @click=${() => { this.selectedRoom = room; this.selectedLightId = ""; this.lightsTab = "lights"; }}>
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
              @click=${() => { this.selectedRoom = room; this.selectedLightId = ""; }}>${room}</button>`)}
          </div>
          <div class="studio-grid">
            ${filtered.map(light => {
            const active = light.state === "on";
            const selected = chosen?.entity_id === light.entity_id;
            const available = active || light.state === "off";
            return b `<article class="studio-light ${selected ? "selected" : ""} ${active ? "active" : ""}">
                <button class="studio-light-select" @click=${() => this.selectedLightId = light.entity_id}>
                  <span class="studio-light-icon">${this.renderIcon(active ? "mdi:lightbulb-on" : "mdi:lightbulb-outline")}</span>
                  <span class="studio-light-state">${available ? this.t(active ? "lightsOn" : "lightsOff") : this.t("lightUnavailable")}</span>
                  <span class="studio-light-name">${this.getLightName(light)}</span>
                  <span class="studio-light-room">${this.getLightRoom(light)}</span>
                  <span class="studio-light-level">${this.supportsBrightness(light) ? `${this.getBrightness(light)}%` : ""}</span>
                </button>
                <button type="button" class="studio-toggle ${active ? "on" : ""}"
                  ?disabled=${!available || !this.hass?.callService}
                  aria-label=${`${this.t("toggleLight")}: ${this.getLightName(light)}`}
                  aria-pressed=${active ? "true" : "false"} @click=${() => this.toggleLight(light)}>
                  ${this.renderIcon(active ? "mdi:check-circle" : "mdi:circle-outline")}
                </button>
              </article>`;
        })}
          </div>
          ${chosen ? b `
            <div class="studio-detail">
              <div class="studio-detail-head">
                <div><div class="studio-kicker">${this.t("lightDetails")}</div>
                  <h2>${this.getLightName(chosen)}</h2>
                  <span>${this.getLightRoom(chosen)}</span></div>
                <button class="studio-toggle ${chosen.state === "on" ? "on" : ""}"
                  ?disabled=${(chosen.state !== "on" && chosen.state !== "off") || !this.hass?.callService}
                  @click=${() => this.toggleLight(chosen)}
                  aria-label=${this.t("toggleLight")}>
                  ${this.renderIcon(chosen.state === "on" ? "mdi:check-circle" : "mdi:circle-outline")}
                </button>
              </div>
              ${this.supportsBrightness(chosen) ? b `
                <div class="brightness-label"><span>${this.t("brightness")}</span><strong>${this.getBrightness(chosen)}%</strong></div>
                <input class="brightness-slider" type="range" min="1" max="100"
                  .value=${String(this.getBrightness(chosen))}
                  ?disabled=${!this.hass?.callService}
                  @change=${(e) => this.setLightBrightness(chosen, Number(e.target.value))}/>
              ` : A}
            </div>
          ` : b `<div class="studio-empty">${this.t("noLights")}</div>`}
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
        return b `
      <section class="hero">
        <div class="eyebrow">${this.t("homeLabel")}</div>
        <div class="hero-content">
          <div class="hero-message">
            <h1>
              ${this.getGreeting()},
              ${this.hass?.user?.name || "ControlRoom"}
              <span class="wave">👋</span>
            </h1>
            <p>${this.t("subtitle")}</p>
          </div>
          ${this.renderPeoplePills()}
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
    renderPage() {
        if (this.activePage === "home")
            return this.renderHome();
        if (this.activePage === "lights")
            return this.renderLightsPage();
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
        const connected = Boolean(this.hass);
        return b `
      <div class="dashboard">
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

            <div class="topbar-right">
              ${this.renderWeather()}

              <div class="clock">
                <div class="clock-time">${this.getTime()}</div>
                <div class="clock-date">${this.getDate()}</div>
              </div>

              <div class="connection">
                <span class="small-dot"></span>
                ${connected
            ? this.t("connected")
            : this.t("waiting")}
              </div>
            </div>
          </header>

          ${this.renderPage()}
        </main>
      </div>
    `;
    }
};
ControlRoomDashboard.styles = i$3 `
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
    .premium-lights { position: relative; min-height: 230px; overflow: hidden; }
    .premium-lights.has-light { border-color: rgba(215,165,104,.32); }
    .premium-lights-content { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; height:100%; }
    .premium-lights .card-icon { color:#f1bf77; }
    .pendant-corner { position:absolute; right:-6px; top:-20px; width:135px; pointer-events:none; }
    .pendant { display:block; width:100%; height:auto; }
    .premium-count { font-size:13px; color:#c9bed1; }
    .premium-count strong { font-size:28px; color:#fff; }
    .premium-count span { color:#a99caf; }
    .premium-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; }
    .glass-action { display:flex; align-items:center; justify-content:center; gap:6px; padding:9px 11px; color:#eee2f5; background:rgba(145,109,174,.25); border:1px solid rgba(211,173,239,.2); border-radius:999px; cursor:pointer; font-size:11px; }
    .glass-action:disabled { opacity:.45; cursor:not-allowed; }
    .glass-action ha-icon { --mdc-icon-size:16px; }
    .premium-rooms { display:flex; flex-wrap:wrap; gap:5px; }
    .room-chip { display:flex; align-items:center; gap:4px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:5px 8px; border-radius:999px; font-size:10px; color:#d5c9dd; }
    .room-chip ha-icon { --mdc-icon-size:13px; color:#e6b877; }
    .lighting-studio { max-width:1100px; margin:auto; }
    .studio-heading { display:flex; justify-content:space-between; align-items:end; gap:15px; margin-bottom:20px; }
    .studio-heading h1 { margin:7px 0 0; }
    .studio-total { font-size:12px; color:#b5a8c1; }
    .studio-hero { position:relative; display:flex; min-height:185px; overflow:hidden; padding:22px; border:1px solid rgba(199,164,225,.2); border-radius:22px; background:linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); }
    .studio-kicker { font-size:11px; color:#c4b1d0; }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:5px; background:#51435d; border-radius:999px; overflow:hidden; }
    .studio-progress span { display:block; height:100%; background:#d0a5ed; transition:width .3s; }
    .studio-actions { display:flex; gap:8px; margin-top:15px; }
    .studio-actions button { display:flex; align-items:center; justify-content:center; gap:7px; flex:1; padding:9px; border:1px solid rgba(255,255,255,.17); border-radius:999px; background:rgba(255,255,255,.035); color:#f1eaf6; cursor:pointer; }
    .studio-actions button:disabled { opacity:.4; }
    .studio-actions ha-icon { --mdc-icon-size:16px; }
    .studio-pendant { position:absolute; right:30px; top:-24px; width:170px; }
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
    .studio-light { position:relative; min-height:145px; padding:15px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:rgba(203,156,236,.65); background:rgba(158,112,189,.14); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:35px; height:35px; border-radius:11px; color:#a89db5; background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:#f2c887; background:rgba(232,179,96,.16); }
    .studio-light-state { position:absolute; right:14px; top:16px; color:#a99db5; font-size:10px; }
    .studio-light.active .studio-light-state { color:#87d5ad; }
    .studio-light-name { margin-top:13px; font-size:14px; font-weight:650; }
    .studio-light-room { margin-top:4px; color:#a99eb6; font-size:11px; }
    .studio-light-level { margin-top:10px; color:#bca8ca; font-size:11px; }
    .studio-toggle { position:absolute; right:15px; bottom:15px; padding:4px; border:0; background:transparent; color:#756b80; cursor:pointer; }
    .studio-toggle.on { color:#d6b3ed; }
    .studio-toggle ha-icon { --mdc-icon-size:23px; }
    .studio-detail { position:relative; margin-top:15px; padding:22px; border-radius:20px; border:1px solid rgba(191,149,220,.25); background:rgba(146,108,178,.1); }
    .studio-detail-head h2 { margin:6px 0; font-size:20px; }
    .studio-detail-head span { font-size:12px; color:#b7a8c5; }
    .studio-detail .studio-toggle { top:20px; bottom:auto; }
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

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
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
], ControlRoomDashboard.prototype, "currentTime", void 0);
__decorate([
    r()
], ControlRoomDashboard.prototype, "selectedLightId", void 0);
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
