function sd(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const l in r)if(l!=="default"&&!(l in e)){const i=Object.getOwnPropertyDescriptor(r,l);i&&Object.defineProperty(e,l,i.get?i:{enumerable:!0,get:()=>r[l]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function ud(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ds={exports:{}},Nl={},bs={exports:{}},F={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gr=Symbol.for("react.element"),cd=Symbol.for("react.portal"),dd=Symbol.for("react.fragment"),fd=Symbol.for("react.strict_mode"),pd=Symbol.for("react.profiler"),hd=Symbol.for("react.provider"),md=Symbol.for("react.context"),gd=Symbol.for("react.forward_ref"),vd=Symbol.for("react.suspense"),yd=Symbol.for("react.memo"),xd=Symbol.for("react.lazy"),ma=Symbol.iterator;function wd(e){return e===null||typeof e!="object"?null:(e=ma&&e[ma]||e["@@iterator"],typeof e=="function"?e:null)}var Os={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fs=Object.assign,Ms={};function jn(e,t,n){this.props=e,this.context=t,this.refs=Ms,this.updater=n||Os}jn.prototype.isReactComponent={};jn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};jn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Is(){}Is.prototype=jn.prototype;function go(e,t,n){this.props=e,this.context=t,this.refs=Ms,this.updater=n||Os}var vo=go.prototype=new Is;vo.constructor=go;Fs(vo,jn.prototype);vo.isPureReactComponent=!0;var ga=Array.isArray,As=Object.prototype.hasOwnProperty,yo={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Us(e,t,n){var r,l={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)As.call(t,r)&&!Bs.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];l.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:gr,type:e,key:i,ref:a,props:l,_owner:yo.current}}function kd(e,t){return{$$typeof:gr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function xo(e){return typeof e=="object"&&e!==null&&e.$$typeof===gr}function jd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var va=/\/+/g;function Vl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?jd(""+e.key):t.toString(36)}function Br(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case gr:case cd:a=!0}}if(a)return a=e,l=l(a),e=r===""?"."+Vl(a,0):r,ga(l)?(n="",e!=null&&(n=e.replace(va,"$&/")+"/"),Br(l,t,n,"",function(c){return c})):l!=null&&(xo(l)&&(l=kd(l,n+(!l.key||a&&a.key===l.key?"":(""+l.key).replace(va,"$&/")+"/")+e)),t.push(l)),1;if(a=0,r=r===""?".":r+":",ga(e))for(var s=0;s<e.length;s++){i=e[s];var u=r+Vl(i,s);a+=Br(i,t,n,u,l)}else if(u=wd(e),typeof u=="function")for(e=u.call(e),s=0;!(i=e.next()).done;)i=i.value,u=r+Vl(i,s++),a+=Br(i,t,n,u,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function jr(e,t,n){if(e==null)return e;var r=[],l=0;return Br(e,r,"","",function(i){return t.call(n,i,l++)}),r}function Sd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ve={current:null},Ur={transition:null},Nd={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:Ur,ReactCurrentOwner:yo};function $s(){throw Error("act(...) is not supported in production builds of React.")}F.Children={map:jr,forEach:function(e,t,n){jr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return jr(e,function(){t++}),t},toArray:function(e){return jr(e,function(t){return t})||[]},only:function(e){if(!xo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};F.Component=jn;F.Fragment=dd;F.Profiler=pd;F.PureComponent=go;F.StrictMode=fd;F.Suspense=vd;F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Nd;F.act=$s;F.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Fs({},e.props),l=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=yo.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)As.call(t,u)&&!Bs.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:gr,type:e.type,key:l,ref:i,props:r,_owner:a}};F.createContext=function(e){return e={$$typeof:md,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:hd,_context:e},e.Consumer=e};F.createElement=Us;F.createFactory=function(e){var t=Us.bind(null,e);return t.type=e,t};F.createRef=function(){return{current:null}};F.forwardRef=function(e){return{$$typeof:gd,render:e}};F.isValidElement=xo;F.lazy=function(e){return{$$typeof:xd,_payload:{_status:-1,_result:e},_init:Sd}};F.memo=function(e,t){return{$$typeof:yd,type:e,compare:t===void 0?null:t}};F.startTransition=function(e){var t=Ur.transition;Ur.transition={};try{e()}finally{Ur.transition=t}};F.unstable_act=$s;F.useCallback=function(e,t){return ve.current.useCallback(e,t)};F.useContext=function(e){return ve.current.useContext(e)};F.useDebugValue=function(){};F.useDeferredValue=function(e){return ve.current.useDeferredValue(e)};F.useEffect=function(e,t){return ve.current.useEffect(e,t)};F.useId=function(){return ve.current.useId()};F.useImperativeHandle=function(e,t,n){return ve.current.useImperativeHandle(e,t,n)};F.useInsertionEffect=function(e,t){return ve.current.useInsertionEffect(e,t)};F.useLayoutEffect=function(e,t){return ve.current.useLayoutEffect(e,t)};F.useMemo=function(e,t){return ve.current.useMemo(e,t)};F.useReducer=function(e,t,n){return ve.current.useReducer(e,t,n)};F.useRef=function(e){return ve.current.useRef(e)};F.useState=function(e){return ve.current.useState(e)};F.useSyncExternalStore=function(e,t,n){return ve.current.useSyncExternalStore(e,t,n)};F.useTransition=function(){return ve.current.useTransition()};F.version="18.3.1";bs.exports=F;var y=bs.exports;const Vs=ud(y),Cd=sd({__proto__:null,default:Vs},[y]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ed=y,Pd=Symbol.for("react.element"),_d=Symbol.for("react.fragment"),zd=Object.prototype.hasOwnProperty,Ld=Ed.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Td={key:!0,ref:!0,__self:!0,__source:!0};function Ws(e,t,n){var r,l={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)zd.call(t,r)&&!Td.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Pd,type:e,key:i,ref:a,props:l,_owner:Ld.current}}Nl.Fragment=_d;Nl.jsx=Ws;Nl.jsxs=Ws;Ds.exports=Nl;var o=Ds.exports,yi={},Hs={exports:{}},_e={},Qs={exports:{}},Ks={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,O){var _=z.length;z.push(O);e:for(;0<_;){var D=_-1>>>1,B=z[D];if(0<l(B,O))z[D]=O,z[_]=B,_=D;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var O=z[0],_=z.pop();if(_!==O){z[0]=_;e:for(var D=0,B=z.length,Z=B>>>1;D<Z;){var ce=2*(D+1)-1,Rt=z[ce],Dt=ce+1,kr=z[Dt];if(0>l(Rt,_))Dt<B&&0>l(kr,Rt)?(z[D]=kr,z[Dt]=_,D=Dt):(z[D]=Rt,z[ce]=_,D=ce);else if(Dt<B&&0>l(kr,_))z[D]=kr,z[Dt]=_,D=Dt;else break e}}return O}function l(z,O){var _=z.sortIndex-O.sortIndex;return _!==0?_:z.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,s=a.now();e.unstable_now=function(){return a.now()-s}}var u=[],c=[],m=1,h=null,g=3,k=!1,w=!1,x=!1,C=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(z){for(var O=n(c);O!==null;){if(O.callback===null)r(c);else if(O.startTime<=z)r(c),O.sortIndex=O.expirationTime,t(u,O);else break;O=n(c)}}function v(z){if(x=!1,p(z),!w)if(n(u)!==null)w=!0,le(S);else{var O=n(c);O!==null&&Fe(v,O.startTime-z)}}function S(z,O){w=!1,x&&(x=!1,f(T),T=-1),k=!0;var _=g;try{for(p(O),h=n(u);h!==null&&(!(h.expirationTime>O)||z&&!ee());){var D=h.callback;if(typeof D=="function"){h.callback=null,g=h.priorityLevel;var B=D(h.expirationTime<=O);O=e.unstable_now(),typeof B=="function"?h.callback=B:h===n(u)&&r(u),p(O)}else r(u);h=n(u)}if(h!==null)var Z=!0;else{var ce=n(c);ce!==null&&Fe(v,ce.startTime-O),Z=!1}return Z}finally{h=null,g=_,k=!1}}var E=!1,P=null,T=-1,A=5,b=-1;function ee(){return!(e.unstable_now()-b<A)}function N(){if(P!==null){var z=e.unstable_now();b=z;var O=!0;try{O=P(!0,z)}finally{O?H():(E=!1,P=null)}}else E=!1}var H;if(typeof d=="function")H=function(){d(N)};else if(typeof MessageChannel<"u"){var R=new MessageChannel,M=R.port2;R.port1.onmessage=N,H=function(){M.postMessage(null)}}else H=function(){C(N,0)};function le(z){P=z,E||(E=!0,H())}function Fe(z,O){T=C(function(){z(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){w||k||(w=!0,le(S))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(z){switch(g){case 1:case 2:case 3:var O=3;break;default:O=g}var _=g;g=O;try{return z()}finally{g=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,O){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var _=g;g=z;try{return O()}finally{g=_}},e.unstable_scheduleCallback=function(z,O,_){var D=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?D+_:D):_=D,z){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=_+B,z={id:m++,callback:O,priorityLevel:z,startTime:_,expirationTime:B,sortIndex:-1},_>D?(z.sortIndex=_,t(c,z),n(u)===null&&z===n(c)&&(x?(f(T),T=-1):x=!0,Fe(v,_-D))):(z.sortIndex=B,t(u,z),w||k||(w=!0,le(S))),z},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(z){var O=g;return function(){var _=g;g=O;try{return z.apply(this,arguments)}finally{g=_}}}})(Ks);Qs.exports=Ks;var Rd=Qs.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd=y,Pe=Rd;function j(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gs=new Set,Jn={};function Qt(e,t){hn(e,t),hn(e+"Capture",t)}function hn(e,t){for(Jn[e]=t,e=0;e<t.length;e++)Gs.add(t[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xi=Object.prototype.hasOwnProperty,bd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ya={},xa={};function Od(e){return xi.call(xa,e)?!0:xi.call(ya,e)?!1:bd.test(e)?xa[e]=!0:(ya[e]=!0,!1)}function Fd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Md(e,t,n,r){if(t===null||typeof t>"u"||Fd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ye(e,t,n,r,l,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ue[e]=new ye(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ue[t]=new ye(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ue[e]=new ye(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ue[e]=new ye(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ue[e]=new ye(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ue[e]=new ye(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ue[e]=new ye(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ue[e]=new ye(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ue[e]=new ye(e,5,!1,e.toLowerCase(),null,!1,!1)});var wo=/[\-:]([a-z])/g;function ko(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(wo,ko);ue[t]=new ye(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(wo,ko);ue[t]=new ye(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(wo,ko);ue[t]=new ye(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ue[e]=new ye(e,1,!1,e.toLowerCase(),null,!1,!1)});ue.xlinkHref=new ye("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ue[e]=new ye(e,1,!1,e.toLowerCase(),null,!0,!0)});function jo(e,t,n,r){var l=ue.hasOwnProperty(t)?ue[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Md(t,n,l,r)&&(n=null),r||l===null?Od(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ot=Dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sr=Symbol.for("react.element"),Yt=Symbol.for("react.portal"),Xt=Symbol.for("react.fragment"),So=Symbol.for("react.strict_mode"),wi=Symbol.for("react.profiler"),Ys=Symbol.for("react.provider"),Xs=Symbol.for("react.context"),No=Symbol.for("react.forward_ref"),ki=Symbol.for("react.suspense"),ji=Symbol.for("react.suspense_list"),Co=Symbol.for("react.memo"),ct=Symbol.for("react.lazy"),Js=Symbol.for("react.offscreen"),wa=Symbol.iterator;function Ln(e){return e===null||typeof e!="object"?null:(e=wa&&e[wa]||e["@@iterator"],typeof e=="function"?e:null)}var X=Object.assign,Wl;function In(e){if(Wl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Wl=t&&t[1]||""}return`
`+Wl+e}var Hl=!1;function Ql(e,t){if(!e||Hl)return"";Hl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),a=l.length-1,s=i.length-1;1<=a&&0<=s&&l[a]!==i[s];)s--;for(;1<=a&&0<=s;a--,s--)if(l[a]!==i[s]){if(a!==1||s!==1)do if(a--,s--,0>s||l[a]!==i[s]){var u=`
`+l[a].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=a&&0<=s);break}}}finally{Hl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?In(e):""}function Id(e){switch(e.tag){case 5:return In(e.type);case 16:return In("Lazy");case 13:return In("Suspense");case 19:return In("SuspenseList");case 0:case 2:case 15:return e=Ql(e.type,!1),e;case 11:return e=Ql(e.type.render,!1),e;case 1:return e=Ql(e.type,!0),e;default:return""}}function Si(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xt:return"Fragment";case Yt:return"Portal";case wi:return"Profiler";case So:return"StrictMode";case ki:return"Suspense";case ji:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Xs:return(e.displayName||"Context")+".Consumer";case Ys:return(e._context.displayName||"Context")+".Provider";case No:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Co:return t=e.displayName||null,t!==null?t:Si(e.type)||"Memo";case ct:t=e._payload,e=e._init;try{return Si(e(t))}catch{}}return null}function Ad(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Si(t);case 8:return t===So?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Et(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Zs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Bd(e){var t=Zs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Nr(e){e._valueTracker||(e._valueTracker=Bd(e))}function qs(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Zs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Zr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ni(e,t){var n=t.checked;return X({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ka(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Et(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function eu(e,t){t=t.checked,t!=null&&jo(e,"checked",t,!1)}function Ci(e,t){eu(e,t);var n=Et(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ei(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ei(e,t.type,Et(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ja(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ei(e,t,n){(t!=="number"||Zr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var An=Array.isArray;function sn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Et(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Pi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(j(91));return X({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Sa(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(j(92));if(An(n)){if(1<n.length)throw Error(j(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Et(n)}}function tu(e,t){var n=Et(t.value),r=Et(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Na(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function nu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _i(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?nu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cr,ru=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Cr=Cr||document.createElement("div"),Cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Zn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $n={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ud=["Webkit","ms","Moz","O"];Object.keys($n).forEach(function(e){Ud.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$n[t]=$n[e]})});function lu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||$n.hasOwnProperty(e)&&$n[e]?(""+t).trim():t+"px"}function iu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=lu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var $d=X({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function zi(e,t){if(t){if($d[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(j(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(j(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(j(61))}if(t.style!=null&&typeof t.style!="object")throw Error(j(62))}}function Li(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ti=null;function Eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ri=null,un=null,cn=null;function Ca(e){if(e=xr(e)){if(typeof Ri!="function")throw Error(j(280));var t=e.stateNode;t&&(t=zl(t),Ri(e.stateNode,e.type,t))}}function ou(e){un?cn?cn.push(e):cn=[e]:un=e}function au(){if(un){var e=un,t=cn;if(cn=un=null,Ca(e),t)for(e=0;e<t.length;e++)Ca(t[e])}}function su(e,t){return e(t)}function uu(){}var Kl=!1;function cu(e,t,n){if(Kl)return e(t,n);Kl=!0;try{return su(e,t,n)}finally{Kl=!1,(un!==null||cn!==null)&&(uu(),au())}}function qn(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var Di=!1;if(nt)try{var Tn={};Object.defineProperty(Tn,"passive",{get:function(){Di=!0}}),window.addEventListener("test",Tn,Tn),window.removeEventListener("test",Tn,Tn)}catch{Di=!1}function Vd(e,t,n,r,l,i,a,s,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Vn=!1,qr=null,el=!1,bi=null,Wd={onError:function(e){Vn=!0,qr=e}};function Hd(e,t,n,r,l,i,a,s,u){Vn=!1,qr=null,Vd.apply(Wd,arguments)}function Qd(e,t,n,r,l,i,a,s,u){if(Hd.apply(this,arguments),Vn){if(Vn){var c=qr;Vn=!1,qr=null}else throw Error(j(198));el||(el=!0,bi=c)}}function Kt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function du(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ea(e){if(Kt(e)!==e)throw Error(j(188))}function Kd(e){var t=e.alternate;if(!t){if(t=Kt(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Ea(l),e;if(i===r)return Ea(l),t;i=i.sibling}throw Error(j(188))}if(n.return!==r.return)n=l,r=i;else{for(var a=!1,s=l.child;s;){if(s===n){a=!0,n=l,r=i;break}if(s===r){a=!0,r=l,n=i;break}s=s.sibling}if(!a){for(s=i.child;s;){if(s===n){a=!0,n=i,r=l;break}if(s===r){a=!0,r=i,n=l;break}s=s.sibling}if(!a)throw Error(j(189))}}if(n.alternate!==r)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function fu(e){return e=Kd(e),e!==null?pu(e):null}function pu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=pu(e);if(t!==null)return t;e=e.sibling}return null}var hu=Pe.unstable_scheduleCallback,Pa=Pe.unstable_cancelCallback,Gd=Pe.unstable_shouldYield,Yd=Pe.unstable_requestPaint,q=Pe.unstable_now,Xd=Pe.unstable_getCurrentPriorityLevel,Po=Pe.unstable_ImmediatePriority,mu=Pe.unstable_UserBlockingPriority,tl=Pe.unstable_NormalPriority,Jd=Pe.unstable_LowPriority,gu=Pe.unstable_IdlePriority,Cl=null,Ye=null;function Zd(e){if(Ye&&typeof Ye.onCommitFiberRoot=="function")try{Ye.onCommitFiberRoot(Cl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ue=Math.clz32?Math.clz32:tf,qd=Math.log,ef=Math.LN2;function tf(e){return e>>>=0,e===0?32:31-(qd(e)/ef|0)|0}var Er=64,Pr=4194304;function Bn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function nl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var s=a&~l;s!==0?r=Bn(s):(i&=a,i!==0&&(r=Bn(i)))}else a=n&~l,a!==0?r=Bn(a):i!==0&&(r=Bn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ue(t),l=1<<n,r|=e[n],t&=~l;return r}function nf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Ue(i),s=1<<a,u=l[a];u===-1?(!(s&n)||s&r)&&(l[a]=nf(s,t)):u<=t&&(e.expiredLanes|=s),i&=~s}}function Oi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vu(){var e=Er;return Er<<=1,!(Er&4194240)&&(Er=64),e}function Gl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function vr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ue(t),e[t]=n}function lf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Ue(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function _o(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ue(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var U=0;function yu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var xu,zo,wu,ku,ju,Fi=!1,_r=[],vt=null,yt=null,xt=null,er=new Map,tr=new Map,ft=[],of="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _a(e,t){switch(e){case"focusin":case"focusout":vt=null;break;case"dragenter":case"dragleave":yt=null;break;case"mouseover":case"mouseout":xt=null;break;case"pointerover":case"pointerout":er.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":tr.delete(t.pointerId)}}function Rn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=xr(t),t!==null&&zo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function af(e,t,n,r,l){switch(t){case"focusin":return vt=Rn(vt,e,t,n,r,l),!0;case"dragenter":return yt=Rn(yt,e,t,n,r,l),!0;case"mouseover":return xt=Rn(xt,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return er.set(i,Rn(er.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,tr.set(i,Rn(tr.get(i)||null,e,t,n,r,l)),!0}return!1}function Su(e){var t=Ft(e.target);if(t!==null){var n=Kt(t);if(n!==null){if(t=n.tag,t===13){if(t=du(n),t!==null){e.blockedOn=t,ju(e.priority,function(){wu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function $r(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Mi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ti=r,n.target.dispatchEvent(r),Ti=null}else return t=xr(n),t!==null&&zo(t),e.blockedOn=n,!1;t.shift()}return!0}function za(e,t,n){$r(e)&&n.delete(t)}function sf(){Fi=!1,vt!==null&&$r(vt)&&(vt=null),yt!==null&&$r(yt)&&(yt=null),xt!==null&&$r(xt)&&(xt=null),er.forEach(za),tr.forEach(za)}function Dn(e,t){e.blockedOn===t&&(e.blockedOn=null,Fi||(Fi=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,sf)))}function nr(e){function t(l){return Dn(l,e)}if(0<_r.length){Dn(_r[0],e);for(var n=1;n<_r.length;n++){var r=_r[n];r.blockedOn===e&&(r.blockedOn=null)}}for(vt!==null&&Dn(vt,e),yt!==null&&Dn(yt,e),xt!==null&&Dn(xt,e),er.forEach(t),tr.forEach(t),n=0;n<ft.length;n++)r=ft[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&(n=ft[0],n.blockedOn===null);)Su(n),n.blockedOn===null&&ft.shift()}var dn=ot.ReactCurrentBatchConfig,rl=!0;function uf(e,t,n,r){var l=U,i=dn.transition;dn.transition=null;try{U=1,Lo(e,t,n,r)}finally{U=l,dn.transition=i}}function cf(e,t,n,r){var l=U,i=dn.transition;dn.transition=null;try{U=4,Lo(e,t,n,r)}finally{U=l,dn.transition=i}}function Lo(e,t,n,r){if(rl){var l=Mi(e,t,n,r);if(l===null)li(e,t,r,ll,n),_a(e,r);else if(af(l,e,t,n,r))r.stopPropagation();else if(_a(e,r),t&4&&-1<of.indexOf(e)){for(;l!==null;){var i=xr(l);if(i!==null&&xu(i),i=Mi(e,t,n,r),i===null&&li(e,t,r,ll,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else li(e,t,r,null,n)}}var ll=null;function Mi(e,t,n,r){if(ll=null,e=Eo(r),e=Ft(e),e!==null)if(t=Kt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=du(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ll=e,null}function Nu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Xd()){case Po:return 1;case mu:return 4;case tl:case Jd:return 16;case gu:return 536870912;default:return 16}default:return 16}}var ht=null,To=null,Vr=null;function Cu(){if(Vr)return Vr;var e,t=To,n=t.length,r,l="value"in ht?ht.value:ht.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===l[i-r];r++);return Vr=l.slice(e,1<r?1-r:void 0)}function Wr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zr(){return!0}function La(){return!1}function ze(e){function t(n,r,l,i,a){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?zr:La,this.isPropagationStopped=La,this}return X(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=zr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=zr)},persist:function(){},isPersistent:zr}),t}var Sn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ro=ze(Sn),yr=X({},Sn,{view:0,detail:0}),df=ze(yr),Yl,Xl,bn,El=X({},yr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Do,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bn&&(bn&&e.type==="mousemove"?(Yl=e.screenX-bn.screenX,Xl=e.screenY-bn.screenY):Xl=Yl=0,bn=e),Yl)},movementY:function(e){return"movementY"in e?e.movementY:Xl}}),Ta=ze(El),ff=X({},El,{dataTransfer:0}),pf=ze(ff),hf=X({},yr,{relatedTarget:0}),Jl=ze(hf),mf=X({},Sn,{animationName:0,elapsedTime:0,pseudoElement:0}),gf=ze(mf),vf=X({},Sn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yf=ze(vf),xf=X({},Sn,{data:0}),Ra=ze(xf),wf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jf[e])?!!t[e]:!1}function Do(){return Sf}var Nf=X({},yr,{key:function(e){if(e.key){var t=wf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Do,charCode:function(e){return e.type==="keypress"?Wr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Cf=ze(Nf),Ef=X({},El,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Da=ze(Ef),Pf=X({},yr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Do}),_f=ze(Pf),zf=X({},Sn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lf=ze(zf),Tf=X({},El,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Rf=ze(Tf),Df=[9,13,27,32],bo=nt&&"CompositionEvent"in window,Wn=null;nt&&"documentMode"in document&&(Wn=document.documentMode);var bf=nt&&"TextEvent"in window&&!Wn,Eu=nt&&(!bo||Wn&&8<Wn&&11>=Wn),ba=" ",Oa=!1;function Pu(e,t){switch(e){case"keyup":return Df.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _u(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Jt=!1;function Of(e,t){switch(e){case"compositionend":return _u(t);case"keypress":return t.which!==32?null:(Oa=!0,ba);case"textInput":return e=t.data,e===ba&&Oa?null:e;default:return null}}function Ff(e,t){if(Jt)return e==="compositionend"||!bo&&Pu(e,t)?(e=Cu(),Vr=To=ht=null,Jt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Eu&&t.locale!=="ko"?null:t.data;default:return null}}var Mf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Mf[e.type]:t==="textarea"}function zu(e,t,n,r){ou(r),t=il(t,"onChange"),0<t.length&&(n=new Ro("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Hn=null,rr=null;function If(e){Bu(e,0)}function Pl(e){var t=en(e);if(qs(t))return e}function Af(e,t){if(e==="change")return t}var Lu=!1;if(nt){var Zl;if(nt){var ql="oninput"in document;if(!ql){var Ma=document.createElement("div");Ma.setAttribute("oninput","return;"),ql=typeof Ma.oninput=="function"}Zl=ql}else Zl=!1;Lu=Zl&&(!document.documentMode||9<document.documentMode)}function Ia(){Hn&&(Hn.detachEvent("onpropertychange",Tu),rr=Hn=null)}function Tu(e){if(e.propertyName==="value"&&Pl(rr)){var t=[];zu(t,rr,e,Eo(e)),cu(If,t)}}function Bf(e,t,n){e==="focusin"?(Ia(),Hn=t,rr=n,Hn.attachEvent("onpropertychange",Tu)):e==="focusout"&&Ia()}function Uf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Pl(rr)}function $f(e,t){if(e==="click")return Pl(t)}function Vf(e,t){if(e==="input"||e==="change")return Pl(t)}function Wf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ve=typeof Object.is=="function"?Object.is:Wf;function lr(e,t){if(Ve(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!xi.call(t,l)||!Ve(e[l],t[l]))return!1}return!0}function Aa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ba(e,t){var n=Aa(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Aa(n)}}function Ru(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ru(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Du(){for(var e=window,t=Zr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Zr(e.document)}return t}function Oo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Hf(e){var t=Du(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ru(n.ownerDocument.documentElement,n)){if(r!==null&&Oo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=Ba(n,i);var a=Ba(n,r);l&&a&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Qf=nt&&"documentMode"in document&&11>=document.documentMode,Zt=null,Ii=null,Qn=null,Ai=!1;function Ua(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ai||Zt==null||Zt!==Zr(r)||(r=Zt,"selectionStart"in r&&Oo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qn&&lr(Qn,r)||(Qn=r,r=il(Ii,"onSelect"),0<r.length&&(t=new Ro("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Zt)))}function Lr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var qt={animationend:Lr("Animation","AnimationEnd"),animationiteration:Lr("Animation","AnimationIteration"),animationstart:Lr("Animation","AnimationStart"),transitionend:Lr("Transition","TransitionEnd")},ei={},bu={};nt&&(bu=document.createElement("div").style,"AnimationEvent"in window||(delete qt.animationend.animation,delete qt.animationiteration.animation,delete qt.animationstart.animation),"TransitionEvent"in window||delete qt.transitionend.transition);function _l(e){if(ei[e])return ei[e];if(!qt[e])return e;var t=qt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in bu)return ei[e]=t[n];return e}var Ou=_l("animationend"),Fu=_l("animationiteration"),Mu=_l("animationstart"),Iu=_l("transitionend"),Au=new Map,$a="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _t(e,t){Au.set(e,t),Qt(t,[e])}for(var ti=0;ti<$a.length;ti++){var ni=$a[ti],Kf=ni.toLowerCase(),Gf=ni[0].toUpperCase()+ni.slice(1);_t(Kf,"on"+Gf)}_t(Ou,"onAnimationEnd");_t(Fu,"onAnimationIteration");_t(Mu,"onAnimationStart");_t("dblclick","onDoubleClick");_t("focusin","onFocus");_t("focusout","onBlur");_t(Iu,"onTransitionEnd");hn("onMouseEnter",["mouseout","mouseover"]);hn("onMouseLeave",["mouseout","mouseover"]);hn("onPointerEnter",["pointerout","pointerover"]);hn("onPointerLeave",["pointerout","pointerover"]);Qt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Un));function Va(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Qd(r,t,void 0,e),e.currentTarget=null}function Bu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],u=s.instance,c=s.currentTarget;if(s=s.listener,u!==i&&l.isPropagationStopped())break e;Va(l,s,c),i=u}else for(a=0;a<r.length;a++){if(s=r[a],u=s.instance,c=s.currentTarget,s=s.listener,u!==i&&l.isPropagationStopped())break e;Va(l,s,c),i=u}}}if(el)throw e=bi,el=!1,bi=null,e}function V(e,t){var n=t[Wi];n===void 0&&(n=t[Wi]=new Set);var r=e+"__bubble";n.has(r)||(Uu(t,e,2,!1),n.add(r))}function ri(e,t,n){var r=0;t&&(r|=4),Uu(n,e,r,t)}var Tr="_reactListening"+Math.random().toString(36).slice(2);function ir(e){if(!e[Tr]){e[Tr]=!0,Gs.forEach(function(n){n!=="selectionchange"&&(Yf.has(n)||ri(n,!1,e),ri(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Tr]||(t[Tr]=!0,ri("selectionchange",!1,t))}}function Uu(e,t,n,r){switch(Nu(t)){case 1:var l=uf;break;case 4:l=cf;break;default:l=Lo}n=l.bind(null,t,n,e),l=void 0,!Di||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function li(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;a=a.return}for(;s!==null;){if(a=Ft(s),a===null)return;if(u=a.tag,u===5||u===6){r=i=a;continue e}s=s.parentNode}}r=r.return}cu(function(){var c=i,m=Eo(n),h=[];e:{var g=Au.get(e);if(g!==void 0){var k=Ro,w=e;switch(e){case"keypress":if(Wr(n)===0)break e;case"keydown":case"keyup":k=Cf;break;case"focusin":w="focus",k=Jl;break;case"focusout":w="blur",k=Jl;break;case"beforeblur":case"afterblur":k=Jl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=Ta;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=pf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=_f;break;case Ou:case Fu:case Mu:k=gf;break;case Iu:k=Lf;break;case"scroll":k=df;break;case"wheel":k=Rf;break;case"copy":case"cut":case"paste":k=yf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=Da}var x=(t&4)!==0,C=!x&&e==="scroll",f=x?g!==null?g+"Capture":null:g;x=[];for(var d=c,p;d!==null;){p=d;var v=p.stateNode;if(p.tag===5&&v!==null&&(p=v,f!==null&&(v=qn(d,f),v!=null&&x.push(or(d,v,p)))),C)break;d=d.return}0<x.length&&(g=new k(g,w,null,n,m),h.push({event:g,listeners:x}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",k=e==="mouseout"||e==="pointerout",g&&n!==Ti&&(w=n.relatedTarget||n.fromElement)&&(Ft(w)||w[rt]))break e;if((k||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,k?(w=n.relatedTarget||n.toElement,k=c,w=w?Ft(w):null,w!==null&&(C=Kt(w),w!==C||w.tag!==5&&w.tag!==6)&&(w=null)):(k=null,w=c),k!==w)){if(x=Ta,v="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(x=Da,v="onPointerLeave",f="onPointerEnter",d="pointer"),C=k==null?g:en(k),p=w==null?g:en(w),g=new x(v,d+"leave",k,n,m),g.target=C,g.relatedTarget=p,v=null,Ft(m)===c&&(x=new x(f,d+"enter",w,n,m),x.target=p,x.relatedTarget=C,v=x),C=v,k&&w)t:{for(x=k,f=w,d=0,p=x;p;p=Gt(p))d++;for(p=0,v=f;v;v=Gt(v))p++;for(;0<d-p;)x=Gt(x),d--;for(;0<p-d;)f=Gt(f),p--;for(;d--;){if(x===f||f!==null&&x===f.alternate)break t;x=Gt(x),f=Gt(f)}x=null}else x=null;k!==null&&Wa(h,g,k,x,!1),w!==null&&C!==null&&Wa(h,C,w,x,!0)}}e:{if(g=c?en(c):window,k=g.nodeName&&g.nodeName.toLowerCase(),k==="select"||k==="input"&&g.type==="file")var S=Af;else if(Fa(g))if(Lu)S=Vf;else{S=Uf;var E=Bf}else(k=g.nodeName)&&k.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=$f);if(S&&(S=S(e,c))){zu(h,S,n,m);break e}E&&E(e,g,c),e==="focusout"&&(E=g._wrapperState)&&E.controlled&&g.type==="number"&&Ei(g,"number",g.value)}switch(E=c?en(c):window,e){case"focusin":(Fa(E)||E.contentEditable==="true")&&(Zt=E,Ii=c,Qn=null);break;case"focusout":Qn=Ii=Zt=null;break;case"mousedown":Ai=!0;break;case"contextmenu":case"mouseup":case"dragend":Ai=!1,Ua(h,n,m);break;case"selectionchange":if(Qf)break;case"keydown":case"keyup":Ua(h,n,m)}var P;if(bo)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Jt?Pu(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Eu&&n.locale!=="ko"&&(Jt||T!=="onCompositionStart"?T==="onCompositionEnd"&&Jt&&(P=Cu()):(ht=m,To="value"in ht?ht.value:ht.textContent,Jt=!0)),E=il(c,T),0<E.length&&(T=new Ra(T,e,null,n,m),h.push({event:T,listeners:E}),P?T.data=P:(P=_u(n),P!==null&&(T.data=P)))),(P=bf?Of(e,n):Ff(e,n))&&(c=il(c,"onBeforeInput"),0<c.length&&(m=new Ra("onBeforeInput","beforeinput",null,n,m),h.push({event:m,listeners:c}),m.data=P))}Bu(h,t)})}function or(e,t,n){return{instance:e,listener:t,currentTarget:n}}function il(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=qn(e,n),i!=null&&r.unshift(or(e,i,l)),i=qn(e,t),i!=null&&r.push(or(e,i,l))),e=e.return}return r}function Gt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Wa(e,t,n,r,l){for(var i=t._reactName,a=[];n!==null&&n!==r;){var s=n,u=s.alternate,c=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&c!==null&&(s=c,l?(u=qn(n,i),u!=null&&a.unshift(or(n,u,s))):l||(u=qn(n,i),u!=null&&a.push(or(n,u,s)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Xf=/\r\n?/g,Jf=/\u0000|\uFFFD/g;function Ha(e){return(typeof e=="string"?e:""+e).replace(Xf,`
`).replace(Jf,"")}function Rr(e,t,n){if(t=Ha(t),Ha(e)!==t&&n)throw Error(j(425))}function ol(){}var Bi=null,Ui=null;function $i(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Vi=typeof setTimeout=="function"?setTimeout:void 0,Zf=typeof clearTimeout=="function"?clearTimeout:void 0,Qa=typeof Promise=="function"?Promise:void 0,qf=typeof queueMicrotask=="function"?queueMicrotask:typeof Qa<"u"?function(e){return Qa.resolve(null).then(e).catch(ep)}:Vi;function ep(e){setTimeout(function(){throw e})}function ii(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),nr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);nr(t)}function wt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ka(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Nn=Math.random().toString(36).slice(2),Ge="__reactFiber$"+Nn,ar="__reactProps$"+Nn,rt="__reactContainer$"+Nn,Wi="__reactEvents$"+Nn,tp="__reactListeners$"+Nn,np="__reactHandles$"+Nn;function Ft(e){var t=e[Ge];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[Ge]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ka(e);e!==null;){if(n=e[Ge])return n;e=Ka(e)}return t}e=n,n=e.parentNode}return null}function xr(e){return e=e[Ge]||e[rt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function en(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(j(33))}function zl(e){return e[ar]||null}var Hi=[],tn=-1;function zt(e){return{current:e}}function W(e){0>tn||(e.current=Hi[tn],Hi[tn]=null,tn--)}function $(e,t){tn++,Hi[tn]=e.current,e.current=t}var Pt={},he=zt(Pt),ke=zt(!1),Ut=Pt;function mn(e,t){var n=e.type.contextTypes;if(!n)return Pt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function je(e){return e=e.childContextTypes,e!=null}function al(){W(ke),W(he)}function Ga(e,t,n){if(he.current!==Pt)throw Error(j(168));$(he,t),$(ke,n)}function $u(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(j(108,Ad(e)||"Unknown",l));return X({},n,r)}function sl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Pt,Ut=he.current,$(he,e),$(ke,ke.current),!0}function Ya(e,t,n){var r=e.stateNode;if(!r)throw Error(j(169));n?(e=$u(e,t,Ut),r.__reactInternalMemoizedMergedChildContext=e,W(ke),W(he),$(he,e)):W(ke),$(ke,n)}var Ze=null,Ll=!1,oi=!1;function Vu(e){Ze===null?Ze=[e]:Ze.push(e)}function rp(e){Ll=!0,Vu(e)}function Lt(){if(!oi&&Ze!==null){oi=!0;var e=0,t=U;try{var n=Ze;for(U=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ze=null,Ll=!1}catch(l){throw Ze!==null&&(Ze=Ze.slice(e+1)),hu(Po,Lt),l}finally{U=t,oi=!1}}return null}var nn=[],rn=0,ul=null,cl=0,Le=[],Te=0,$t=null,qe=1,et="";function bt(e,t){nn[rn++]=cl,nn[rn++]=ul,ul=e,cl=t}function Wu(e,t,n){Le[Te++]=qe,Le[Te++]=et,Le[Te++]=$t,$t=e;var r=qe;e=et;var l=32-Ue(r)-1;r&=~(1<<l),n+=1;var i=32-Ue(t)+l;if(30<i){var a=l-l%5;i=(r&(1<<a)-1).toString(32),r>>=a,l-=a,qe=1<<32-Ue(t)+l|n<<l|r,et=i+e}else qe=1<<i|n<<l|r,et=e}function Fo(e){e.return!==null&&(bt(e,1),Wu(e,1,0))}function Mo(e){for(;e===ul;)ul=nn[--rn],nn[rn]=null,cl=nn[--rn],nn[rn]=null;for(;e===$t;)$t=Le[--Te],Le[Te]=null,et=Le[--Te],Le[Te]=null,qe=Le[--Te],Le[Te]=null}var Ee=null,Ce=null,Q=!1,Be=null;function Hu(e,t){var n=Re(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Xa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ee=e,Ce=wt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ee=e,Ce=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=$t!==null?{id:qe,overflow:et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Re(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ee=e,Ce=null,!0):!1;default:return!1}}function Qi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ki(e){if(Q){var t=Ce;if(t){var n=t;if(!Xa(e,t)){if(Qi(e))throw Error(j(418));t=wt(n.nextSibling);var r=Ee;t&&Xa(e,t)?Hu(r,n):(e.flags=e.flags&-4097|2,Q=!1,Ee=e)}}else{if(Qi(e))throw Error(j(418));e.flags=e.flags&-4097|2,Q=!1,Ee=e}}}function Ja(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function Dr(e){if(e!==Ee)return!1;if(!Q)return Ja(e),Q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$i(e.type,e.memoizedProps)),t&&(t=Ce)){if(Qi(e))throw Qu(),Error(j(418));for(;t;)Hu(e,t),t=wt(t.nextSibling)}if(Ja(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ce=wt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ce=null}}else Ce=Ee?wt(e.stateNode.nextSibling):null;return!0}function Qu(){for(var e=Ce;e;)e=wt(e.nextSibling)}function gn(){Ce=Ee=null,Q=!1}function Io(e){Be===null?Be=[e]:Be.push(e)}var lp=ot.ReactCurrentBatchConfig;function On(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var r=n.stateNode}if(!r)throw Error(j(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var s=l.refs;a===null?delete s[i]:s[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,e))}return e}function br(e,t){throw e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Za(e){var t=e._init;return t(e._payload)}function Ku(e){function t(f,d){if(e){var p=f.deletions;p===null?(f.deletions=[d],f.flags|=16):p.push(d)}}function n(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function r(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function l(f,d){return f=Nt(f,d),f.index=0,f.sibling=null,f}function i(f,d,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<d?(f.flags|=2,d):p):(f.flags|=2,d)):(f.flags|=1048576,d)}function a(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,d,p,v){return d===null||d.tag!==6?(d=pi(p,f.mode,v),d.return=f,d):(d=l(d,p),d.return=f,d)}function u(f,d,p,v){var S=p.type;return S===Xt?m(f,d,p.props.children,v,p.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ct&&Za(S)===d.type)?(v=l(d,p.props),v.ref=On(f,d,p),v.return=f,v):(v=Jr(p.type,p.key,p.props,null,f.mode,v),v.ref=On(f,d,p),v.return=f,v)}function c(f,d,p,v){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=hi(p,f.mode,v),d.return=f,d):(d=l(d,p.children||[]),d.return=f,d)}function m(f,d,p,v,S){return d===null||d.tag!==7?(d=Bt(p,f.mode,v,S),d.return=f,d):(d=l(d,p),d.return=f,d)}function h(f,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=pi(""+d,f.mode,p),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Sr:return p=Jr(d.type,d.key,d.props,null,f.mode,p),p.ref=On(f,null,d),p.return=f,p;case Yt:return d=hi(d,f.mode,p),d.return=f,d;case ct:var v=d._init;return h(f,v(d._payload),p)}if(An(d)||Ln(d))return d=Bt(d,f.mode,p,null),d.return=f,d;br(f,d)}return null}function g(f,d,p,v){var S=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(f,d,""+p,v);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Sr:return p.key===S?u(f,d,p,v):null;case Yt:return p.key===S?c(f,d,p,v):null;case ct:return S=p._init,g(f,d,S(p._payload),v)}if(An(p)||Ln(p))return S!==null?null:m(f,d,p,v,null);br(f,p)}return null}function k(f,d,p,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return f=f.get(p)||null,s(d,f,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Sr:return f=f.get(v.key===null?p:v.key)||null,u(d,f,v,S);case Yt:return f=f.get(v.key===null?p:v.key)||null,c(d,f,v,S);case ct:var E=v._init;return k(f,d,p,E(v._payload),S)}if(An(v)||Ln(v))return f=f.get(p)||null,m(d,f,v,S,null);br(d,v)}return null}function w(f,d,p,v){for(var S=null,E=null,P=d,T=d=0,A=null;P!==null&&T<p.length;T++){P.index>T?(A=P,P=null):A=P.sibling;var b=g(f,P,p[T],v);if(b===null){P===null&&(P=A);break}e&&P&&b.alternate===null&&t(f,P),d=i(b,d,T),E===null?S=b:E.sibling=b,E=b,P=A}if(T===p.length)return n(f,P),Q&&bt(f,T),S;if(P===null){for(;T<p.length;T++)P=h(f,p[T],v),P!==null&&(d=i(P,d,T),E===null?S=P:E.sibling=P,E=P);return Q&&bt(f,T),S}for(P=r(f,P);T<p.length;T++)A=k(P,f,T,p[T],v),A!==null&&(e&&A.alternate!==null&&P.delete(A.key===null?T:A.key),d=i(A,d,T),E===null?S=A:E.sibling=A,E=A);return e&&P.forEach(function(ee){return t(f,ee)}),Q&&bt(f,T),S}function x(f,d,p,v){var S=Ln(p);if(typeof S!="function")throw Error(j(150));if(p=S.call(p),p==null)throw Error(j(151));for(var E=S=null,P=d,T=d=0,A=null,b=p.next();P!==null&&!b.done;T++,b=p.next()){P.index>T?(A=P,P=null):A=P.sibling;var ee=g(f,P,b.value,v);if(ee===null){P===null&&(P=A);break}e&&P&&ee.alternate===null&&t(f,P),d=i(ee,d,T),E===null?S=ee:E.sibling=ee,E=ee,P=A}if(b.done)return n(f,P),Q&&bt(f,T),S;if(P===null){for(;!b.done;T++,b=p.next())b=h(f,b.value,v),b!==null&&(d=i(b,d,T),E===null?S=b:E.sibling=b,E=b);return Q&&bt(f,T),S}for(P=r(f,P);!b.done;T++,b=p.next())b=k(P,f,T,b.value,v),b!==null&&(e&&b.alternate!==null&&P.delete(b.key===null?T:b.key),d=i(b,d,T),E===null?S=b:E.sibling=b,E=b);return e&&P.forEach(function(N){return t(f,N)}),Q&&bt(f,T),S}function C(f,d,p,v){if(typeof p=="object"&&p!==null&&p.type===Xt&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Sr:e:{for(var S=p.key,E=d;E!==null;){if(E.key===S){if(S=p.type,S===Xt){if(E.tag===7){n(f,E.sibling),d=l(E,p.props.children),d.return=f,f=d;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ct&&Za(S)===E.type){n(f,E.sibling),d=l(E,p.props),d.ref=On(f,E,p),d.return=f,f=d;break e}n(f,E);break}else t(f,E);E=E.sibling}p.type===Xt?(d=Bt(p.props.children,f.mode,v,p.key),d.return=f,f=d):(v=Jr(p.type,p.key,p.props,null,f.mode,v),v.ref=On(f,d,p),v.return=f,f=v)}return a(f);case Yt:e:{for(E=p.key;d!==null;){if(d.key===E)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){n(f,d.sibling),d=l(d,p.children||[]),d.return=f,f=d;break e}else{n(f,d);break}else t(f,d);d=d.sibling}d=hi(p,f.mode,v),d.return=f,f=d}return a(f);case ct:return E=p._init,C(f,d,E(p._payload),v)}if(An(p))return w(f,d,p,v);if(Ln(p))return x(f,d,p,v);br(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(n(f,d.sibling),d=l(d,p),d.return=f,f=d):(n(f,d),d=pi(p,f.mode,v),d.return=f,f=d),a(f)):n(f,d)}return C}var vn=Ku(!0),Gu=Ku(!1),dl=zt(null),fl=null,ln=null,Ao=null;function Bo(){Ao=ln=fl=null}function Uo(e){var t=dl.current;W(dl),e._currentValue=t}function Gi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function fn(e,t){fl=e,Ao=ln=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function be(e){var t=e._currentValue;if(Ao!==e)if(e={context:e,memoizedValue:t,next:null},ln===null){if(fl===null)throw Error(j(308));ln=e,fl.dependencies={lanes:0,firstContext:e}}else ln=ln.next=e;return t}var Mt=null;function $o(e){Mt===null?Mt=[e]:Mt.push(e)}function Yu(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,$o(t)):(n.next=l.next,l.next=n),t.interleaved=n,lt(e,r)}function lt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var dt=!1;function Vo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Xu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function kt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,I&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,lt(e,n)}return l=r.interleaved,l===null?(t.next=t,$o(r)):(t.next=l.next,l.next=t),r.interleaved=t,lt(e,n)}function Hr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_o(e,n)}}function qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function pl(e,t,n,r){var l=e.updateQueue;dt=!1;var i=l.firstBaseUpdate,a=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var u=s,c=u.next;u.next=null,a===null?i=c:a.next=c,a=u;var m=e.alternate;m!==null&&(m=m.updateQueue,s=m.lastBaseUpdate,s!==a&&(s===null?m.firstBaseUpdate=c:s.next=c,m.lastBaseUpdate=u))}if(i!==null){var h=l.baseState;a=0,m=c=u=null,s=i;do{var g=s.lane,k=s.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:k,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,x=s;switch(g=t,k=n,x.tag){case 1:if(w=x.payload,typeof w=="function"){h=w.call(k,h,g);break e}h=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=x.payload,g=typeof w=="function"?w.call(k,h,g):w,g==null)break e;h=X({},h,g);break e;case 2:dt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=l.effects,g===null?l.effects=[s]:g.push(s))}else k={eventTime:k,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},m===null?(c=m=k,u=h):m=m.next=k,a|=g;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;g=s,s=g.next,g.next=null,l.lastBaseUpdate=g,l.shared.pending=null}}while(!0);if(m===null&&(u=h),l.baseState=u,l.firstBaseUpdate=c,l.lastBaseUpdate=m,t=l.shared.interleaved,t!==null){l=t;do a|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);Wt|=a,e.lanes=a,e.memoizedState=h}}function es(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(j(191,l));l.call(r)}}}var wr={},Xe=zt(wr),sr=zt(wr),ur=zt(wr);function It(e){if(e===wr)throw Error(j(174));return e}function Wo(e,t){switch($(ur,t),$(sr,e),$(Xe,wr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_i(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_i(t,e)}W(Xe),$(Xe,t)}function yn(){W(Xe),W(sr),W(ur)}function Ju(e){It(ur.current);var t=It(Xe.current),n=_i(t,e.type);t!==n&&($(sr,e),$(Xe,n))}function Ho(e){sr.current===e&&(W(Xe),W(sr))}var K=zt(0);function hl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ai=[];function Qo(){for(var e=0;e<ai.length;e++)ai[e]._workInProgressVersionPrimary=null;ai.length=0}var Qr=ot.ReactCurrentDispatcher,si=ot.ReactCurrentBatchConfig,Vt=0,G=null,ne=null,ie=null,ml=!1,Kn=!1,cr=0,ip=0;function de(){throw Error(j(321))}function Ko(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ve(e[n],t[n]))return!1;return!0}function Go(e,t,n,r,l,i){if(Vt=i,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qr.current=e===null||e.memoizedState===null?up:cp,e=n(r,l),Kn){i=0;do{if(Kn=!1,cr=0,25<=i)throw Error(j(301));i+=1,ie=ne=null,t.updateQueue=null,Qr.current=dp,e=n(r,l)}while(Kn)}if(Qr.current=gl,t=ne!==null&&ne.next!==null,Vt=0,ie=ne=G=null,ml=!1,t)throw Error(j(300));return e}function Yo(){var e=cr!==0;return cr=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ie===null?G.memoizedState=ie=e:ie=ie.next=e,ie}function Oe(){if(ne===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=ie===null?G.memoizedState:ie.next;if(t!==null)ie=t,ne=e;else{if(e===null)throw Error(j(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},ie===null?G.memoizedState=ie=e:ie=ie.next=e}return ie}function dr(e,t){return typeof t=="function"?t(e):t}function ui(e){var t=Oe(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var r=ne,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var a=l.next;l.next=i.next,i.next=a}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var s=a=null,u=null,c=i;do{var m=c.lane;if((Vt&m)===m)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(s=u=h,a=r):u=u.next=h,G.lanes|=m,Wt|=m}c=c.next}while(c!==null&&c!==i);u===null?a=r:u.next=s,Ve(r,t.memoizedState)||(we=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,G.lanes|=i,Wt|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ci(e){var t=Oe(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var a=l=l.next;do i=e(i,a.action),a=a.next;while(a!==l);Ve(i,t.memoizedState)||(we=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Zu(){}function qu(e,t){var n=G,r=Oe(),l=t(),i=!Ve(r.memoizedState,l);if(i&&(r.memoizedState=l,we=!0),r=r.queue,Xo(nc.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ie!==null&&ie.memoizedState.tag&1){if(n.flags|=2048,fr(9,tc.bind(null,n,r,l,t),void 0,null),oe===null)throw Error(j(349));Vt&30||ec(n,t,l)}return l}function ec(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function tc(e,t,n,r){t.value=n,t.getSnapshot=r,rc(t)&&lc(e)}function nc(e,t,n){return n(function(){rc(t)&&lc(e)})}function rc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ve(e,n)}catch{return!0}}function lc(e){var t=lt(e,1);t!==null&&$e(t,e,1,-1)}function ts(e){var t=Qe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:dr,lastRenderedState:e},t.queue=e,e=e.dispatch=sp.bind(null,G,e),[t.memoizedState,e]}function fr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ic(){return Oe().memoizedState}function Kr(e,t,n,r){var l=Qe();G.flags|=e,l.memoizedState=fr(1|t,n,void 0,r===void 0?null:r)}function Tl(e,t,n,r){var l=Oe();r=r===void 0?null:r;var i=void 0;if(ne!==null){var a=ne.memoizedState;if(i=a.destroy,r!==null&&Ko(r,a.deps)){l.memoizedState=fr(t,n,i,r);return}}G.flags|=e,l.memoizedState=fr(1|t,n,i,r)}function ns(e,t){return Kr(8390656,8,e,t)}function Xo(e,t){return Tl(2048,8,e,t)}function oc(e,t){return Tl(4,2,e,t)}function ac(e,t){return Tl(4,4,e,t)}function sc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function uc(e,t,n){return n=n!=null?n.concat([e]):null,Tl(4,4,sc.bind(null,t,e),n)}function Jo(){}function cc(e,t){var n=Oe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ko(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function dc(e,t){var n=Oe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ko(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function fc(e,t,n){return Vt&21?(Ve(n,t)||(n=vu(),G.lanes|=n,Wt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}function op(e,t){var n=U;U=n!==0&&4>n?n:4,e(!0);var r=si.transition;si.transition={};try{e(!1),t()}finally{U=n,si.transition=r}}function pc(){return Oe().memoizedState}function ap(e,t,n){var r=St(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hc(e))mc(t,n);else if(n=Yu(e,t,n,r),n!==null){var l=ge();$e(n,e,r,l),gc(n,t,r)}}function sp(e,t,n){var r=St(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hc(e))mc(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,s=i(a,n);if(l.hasEagerState=!0,l.eagerState=s,Ve(s,a)){var u=t.interleaved;u===null?(l.next=l,$o(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=Yu(e,t,l,r),n!==null&&(l=ge(),$e(n,e,r,l),gc(n,t,r))}}function hc(e){var t=e.alternate;return e===G||t!==null&&t===G}function mc(e,t){Kn=ml=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function gc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_o(e,n)}}var gl={readContext:be,useCallback:de,useContext:de,useEffect:de,useImperativeHandle:de,useInsertionEffect:de,useLayoutEffect:de,useMemo:de,useReducer:de,useRef:de,useState:de,useDebugValue:de,useDeferredValue:de,useTransition:de,useMutableSource:de,useSyncExternalStore:de,useId:de,unstable_isNewReconciler:!1},up={readContext:be,useCallback:function(e,t){return Qe().memoizedState=[e,t===void 0?null:t],e},useContext:be,useEffect:ns,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Kr(4194308,4,sc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Kr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Kr(4,2,e,t)},useMemo:function(e,t){var n=Qe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Qe();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=ap.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=Qe();return e={current:e},t.memoizedState=e},useState:ts,useDebugValue:Jo,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=ts(!1),t=e[0];return e=op.bind(null,e[1]),Qe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=G,l=Qe();if(Q){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),oe===null)throw Error(j(349));Vt&30||ec(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,ns(nc.bind(null,r,i,e),[e]),r.flags|=2048,fr(9,tc.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Qe(),t=oe.identifierPrefix;if(Q){var n=et,r=qe;n=(r&~(1<<32-Ue(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=cr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ip++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},cp={readContext:be,useCallback:cc,useContext:be,useEffect:Xo,useImperativeHandle:uc,useInsertionEffect:oc,useLayoutEffect:ac,useMemo:dc,useReducer:ui,useRef:ic,useState:function(){return ui(dr)},useDebugValue:Jo,useDeferredValue:function(e){var t=Oe();return fc(t,ne.memoizedState,e)},useTransition:function(){var e=ui(dr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:Zu,useSyncExternalStore:qu,useId:pc,unstable_isNewReconciler:!1},dp={readContext:be,useCallback:cc,useContext:be,useEffect:Xo,useImperativeHandle:uc,useInsertionEffect:oc,useLayoutEffect:ac,useMemo:dc,useReducer:ci,useRef:ic,useState:function(){return ci(dr)},useDebugValue:Jo,useDeferredValue:function(e){var t=Oe();return ne===null?t.memoizedState=e:fc(t,ne.memoizedState,e)},useTransition:function(){var e=ci(dr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:Zu,useSyncExternalStore:qu,useId:pc,unstable_isNewReconciler:!1};function Ie(e,t){if(e&&e.defaultProps){t=X({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Yi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:X({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rl={isMounted:function(e){return(e=e._reactInternals)?Kt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ge(),l=St(e),i=tt(r,l);i.payload=t,n!=null&&(i.callback=n),t=kt(e,i,l),t!==null&&($e(t,e,l,r),Hr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ge(),l=St(e),i=tt(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=kt(e,i,l),t!==null&&($e(t,e,l,r),Hr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ge(),r=St(e),l=tt(n,r);l.tag=2,t!=null&&(l.callback=t),t=kt(e,l,r),t!==null&&($e(t,e,r,n),Hr(t,e,r))}};function rs(e,t,n,r,l,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!lr(n,r)||!lr(l,i):!0}function vc(e,t,n){var r=!1,l=Pt,i=t.contextType;return typeof i=="object"&&i!==null?i=be(i):(l=je(t)?Ut:he.current,r=t.contextTypes,i=(r=r!=null)?mn(e,l):Pt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Rl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function ls(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rl.enqueueReplaceState(t,t.state,null)}function Xi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Vo(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=be(i):(i=je(t)?Ut:he.current,l.context=mn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Yi(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Rl.enqueueReplaceState(l,l.state,null),pl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function xn(e,t){try{var n="",r=t;do n+=Id(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function di(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ji(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var fp=typeof WeakMap=="function"?WeakMap:Map;function yc(e,t,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){yl||(yl=!0,ao=r),Ji(e,t)},n}function xc(e,t,n){n=tt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Ji(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ji(e,t),typeof r!="function"&&(jt===null?jt=new Set([this]):jt.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function is(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new fp;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Ep.bind(null,e,t,n),t.then(e,e))}function os(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function as(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=tt(-1,1),t.tag=2,kt(n,t,1))),n.lanes|=1),e)}var pp=ot.ReactCurrentOwner,we=!1;function me(e,t,n,r){t.child=e===null?Gu(t,null,n,r):vn(t,e.child,n,r)}function ss(e,t,n,r,l){n=n.render;var i=t.ref;return fn(t,l),r=Go(e,t,n,r,i,l),n=Yo(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,it(e,t,l)):(Q&&n&&Fo(t),t.flags|=1,me(e,t,r,l),t.child)}function us(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!ia(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,wc(e,t,i,r,l)):(e=Jr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:lr,n(a,r)&&e.ref===t.ref)return it(e,t,l)}return t.flags|=1,e=Nt(i,r),e.ref=t.ref,e.return=t,t.child=e}function wc(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(lr(i,r)&&e.ref===t.ref)if(we=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,it(e,t,l)}return Zi(e,t,n,r,l)}function kc(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(an,Ne),Ne|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(an,Ne),Ne|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,$(an,Ne),Ne|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,$(an,Ne),Ne|=r;return me(e,t,l,n),t.child}function jc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Zi(e,t,n,r,l){var i=je(n)?Ut:he.current;return i=mn(t,i),fn(t,l),n=Go(e,t,n,r,i,l),r=Yo(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,it(e,t,l)):(Q&&r&&Fo(t),t.flags|=1,me(e,t,n,l),t.child)}function cs(e,t,n,r,l){if(je(n)){var i=!0;sl(t)}else i=!1;if(fn(t,l),t.stateNode===null)Gr(e,t),vc(t,n,r),Xi(t,n,r,l),r=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var u=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=be(c):(c=je(n)?Ut:he.current,c=mn(t,c));var m=n.getDerivedStateFromProps,h=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==r||u!==c)&&ls(t,a,r,c),dt=!1;var g=t.memoizedState;a.state=g,pl(t,r,a,l),u=t.memoizedState,s!==r||g!==u||ke.current||dt?(typeof m=="function"&&(Yi(t,n,m,r),u=t.memoizedState),(s=dt||rs(t,n,s,r,g,u,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),a.props=r,a.state=u,a.context=c,r=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Xu(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Ie(t.type,s),a.props=c,h=t.pendingProps,g=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=be(u):(u=je(n)?Ut:he.current,u=mn(t,u));var k=n.getDerivedStateFromProps;(m=typeof k=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==h||g!==u)&&ls(t,a,r,u),dt=!1,g=t.memoizedState,a.state=g,pl(t,r,a,l);var w=t.memoizedState;s!==h||g!==w||ke.current||dt?(typeof k=="function"&&(Yi(t,n,k,r),w=t.memoizedState),(c=dt||rs(t,n,c,r,g,w,u)||!1)?(m||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,w,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,w,u)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),a.props=r,a.state=w,a.context=u,r=c):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return qi(e,t,n,r,i,l)}function qi(e,t,n,r,l,i){jc(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return l&&Ya(t,n,!1),it(e,t,i);r=t.stateNode,pp.current=t;var s=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=vn(t,e.child,null,i),t.child=vn(t,null,s,i)):me(e,t,s,i),t.memoizedState=r.state,l&&Ya(t,n,!0),t.child}function Sc(e){var t=e.stateNode;t.pendingContext?Ga(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ga(e,t.context,!1),Wo(e,t.containerInfo)}function ds(e,t,n,r,l){return gn(),Io(l),t.flags|=256,me(e,t,n,r),t.child}var eo={dehydrated:null,treeContext:null,retryLane:0};function to(e){return{baseLanes:e,cachePool:null,transitions:null}}function Nc(e,t,n){var r=t.pendingProps,l=K.current,i=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),$(K,l&1),e===null)return Ki(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Ol(a,r,0,null),e=Bt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=to(n),t.memoizedState=eo,e):Zo(t,a));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return hp(e,t,a,r,s,l,n);if(i){i=r.fallback,a=t.mode,l=e.child,s=l.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Nt(l,u),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?i=Nt(s,i):(i=Bt(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?to(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=eo,r}return i=e.child,e=i.sibling,r=Nt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Zo(e,t){return t=Ol({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Or(e,t,n,r){return r!==null&&Io(r),vn(t,e.child,null,n),e=Zo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hp(e,t,n,r,l,i,a){if(n)return t.flags&256?(t.flags&=-257,r=di(Error(j(422))),Or(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=Ol({mode:"visible",children:r.children},l,0,null),i=Bt(i,l,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&vn(t,e.child,null,a),t.child.memoizedState=to(a),t.memoizedState=eo,i);if(!(t.mode&1))return Or(e,t,a,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(j(419)),r=di(i,r,void 0),Or(e,t,a,r)}if(s=(a&e.childLanes)!==0,we||s){if(r=oe,r!==null){switch(a&-a){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|a)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,lt(e,l),$e(r,e,l,-1))}return la(),r=di(Error(j(421))),Or(e,t,a,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Pp.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,Ce=wt(l.nextSibling),Ee=t,Q=!0,Be=null,e!==null&&(Le[Te++]=qe,Le[Te++]=et,Le[Te++]=$t,qe=e.id,et=e.overflow,$t=t),t=Zo(t,r.children),t.flags|=4096,t)}function fs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Gi(e.return,t,n)}function fi(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function Cc(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(me(e,t,r.children,n),r=K.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fs(e,n,t);else if(e.tag===19)fs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if($(K,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&hl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),fi(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&hl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}fi(t,!0,n,null,i);break;case"together":fi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Gr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function it(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function mp(e,t,n){switch(t.tag){case 3:Sc(t),gn();break;case 5:Ju(t);break;case 1:je(t.type)&&sl(t);break;case 4:Wo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;$(dl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?($(K,K.current&1),t.flags|=128,null):n&t.child.childLanes?Nc(e,t,n):($(K,K.current&1),e=it(e,t,n),e!==null?e.sibling:null);$(K,K.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Cc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),$(K,K.current),r)break;return null;case 22:case 23:return t.lanes=0,kc(e,t,n)}return it(e,t,n)}var Ec,no,Pc,_c;Ec=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};no=function(){};Pc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,It(Xe.current);var i=null;switch(n){case"input":l=Ni(e,l),r=Ni(e,r),i=[];break;case"select":l=X({},l,{value:void 0}),r=X({},r,{value:void 0}),i=[];break;case"textarea":l=Pi(e,l),r=Pi(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ol)}zi(n,r);var a;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var s=l[c];for(a in s)s.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Jn.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(s=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){for(a in s)!s.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&s[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Jn.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&V("scroll",e),i||s===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};_c=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fn(e,t){if(!Q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function gp(e,t,n){var r=t.pendingProps;switch(Mo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(t),null;case 1:return je(t.type)&&al(),fe(t),null;case 3:return r=t.stateNode,yn(),W(ke),W(he),Qo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Dr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(co(Be),Be=null))),no(e,t),fe(t),null;case 5:Ho(t);var l=It(ur.current);if(n=t.type,e!==null&&t.stateNode!=null)Pc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(j(166));return fe(t),null}if(e=It(Xe.current),Dr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Ge]=t,r[ar]=i,e=(t.mode&1)!==0,n){case"dialog":V("cancel",r),V("close",r);break;case"iframe":case"object":case"embed":V("load",r);break;case"video":case"audio":for(l=0;l<Un.length;l++)V(Un[l],r);break;case"source":V("error",r);break;case"img":case"image":case"link":V("error",r),V("load",r);break;case"details":V("toggle",r);break;case"input":ka(r,i),V("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},V("invalid",r);break;case"textarea":Sa(r,i),V("invalid",r)}zi(n,i),l=null;for(var a in i)if(i.hasOwnProperty(a)){var s=i[a];a==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&Rr(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Rr(r.textContent,s,e),l=["children",""+s]):Jn.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&V("scroll",r)}switch(n){case"input":Nr(r),ja(r,i,!0);break;case"textarea":Nr(r),Na(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ol)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=nu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Ge]=t,e[ar]=r,Ec(e,t,!1,!1),t.stateNode=e;e:{switch(a=Li(n,r),n){case"dialog":V("cancel",e),V("close",e),l=r;break;case"iframe":case"object":case"embed":V("load",e),l=r;break;case"video":case"audio":for(l=0;l<Un.length;l++)V(Un[l],e);l=r;break;case"source":V("error",e),l=r;break;case"img":case"image":case"link":V("error",e),V("load",e),l=r;break;case"details":V("toggle",e),l=r;break;case"input":ka(e,r),l=Ni(e,r),V("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=X({},r,{value:void 0}),V("invalid",e);break;case"textarea":Sa(e,r),l=Pi(e,r),V("invalid",e);break;default:l=r}zi(n,l),s=l;for(i in s)if(s.hasOwnProperty(i)){var u=s[i];i==="style"?iu(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&ru(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Zn(e,u):typeof u=="number"&&Zn(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Jn.hasOwnProperty(i)?u!=null&&i==="onScroll"&&V("scroll",e):u!=null&&jo(e,i,u,a))}switch(n){case"input":Nr(e),ja(e,r,!1);break;case"textarea":Nr(e),Na(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Et(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?sn(e,!!r.multiple,i,!1):r.defaultValue!=null&&sn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ol)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return fe(t),null;case 6:if(e&&t.stateNode!=null)_c(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(j(166));if(n=It(ur.current),It(Xe.current),Dr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ge]=t,(i=r.nodeValue!==n)&&(e=Ee,e!==null))switch(e.tag){case 3:Rr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Rr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ge]=t,t.stateNode=r}return fe(t),null;case 13:if(W(K),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Ce!==null&&t.mode&1&&!(t.flags&128))Qu(),gn(),t.flags|=98560,i=!1;else if(i=Dr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(j(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(j(317));i[Ge]=t}else gn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;fe(t),i=!1}else Be!==null&&(co(Be),Be=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||K.current&1?re===0&&(re=3):la())),t.updateQueue!==null&&(t.flags|=4),fe(t),null);case 4:return yn(),no(e,t),e===null&&ir(t.stateNode.containerInfo),fe(t),null;case 10:return Uo(t.type._context),fe(t),null;case 17:return je(t.type)&&al(),fe(t),null;case 19:if(W(K),i=t.memoizedState,i===null)return fe(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Fn(i,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=hl(e),a!==null){for(t.flags|=128,Fn(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(K,K.current&1|2),t.child}e=e.sibling}i.tail!==null&&q()>wn&&(t.flags|=128,r=!0,Fn(i,!1),t.lanes=4194304)}else{if(!r)if(e=hl(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Q)return fe(t),null}else 2*q()-i.renderingStartTime>wn&&n!==1073741824&&(t.flags|=128,r=!0,Fn(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=q(),t.sibling=null,n=K.current,$(K,r?n&1|2:n&1),t):(fe(t),null);case 22:case 23:return ra(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ne&1073741824&&(fe(t),t.subtreeFlags&6&&(t.flags|=8192)):fe(t),null;case 24:return null;case 25:return null}throw Error(j(156,t.tag))}function vp(e,t){switch(Mo(t),t.tag){case 1:return je(t.type)&&al(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return yn(),W(ke),W(he),Qo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ho(t),null;case 13:if(W(K),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));gn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return W(K),null;case 4:return yn(),null;case 10:return Uo(t.type._context),null;case 22:case 23:return ra(),null;case 24:return null;default:return null}}var Fr=!1,pe=!1,yp=typeof WeakSet=="function"?WeakSet:Set,L=null;function on(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){J(e,t,r)}else n.current=null}function ro(e,t,n){try{n()}catch(r){J(e,t,r)}}var ps=!1;function xp(e,t){if(Bi=rl,e=Du(),Oo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,s=-1,u=-1,c=0,m=0,h=e,g=null;t:for(;;){for(var k;h!==n||l!==0&&h.nodeType!==3||(s=a+l),h!==i||r!==0&&h.nodeType!==3||(u=a+r),h.nodeType===3&&(a+=h.nodeValue.length),(k=h.firstChild)!==null;)g=h,h=k;for(;;){if(h===e)break t;if(g===n&&++c===l&&(s=a),g===i&&++m===r&&(u=a),(k=h.nextSibling)!==null)break;h=g,g=h.parentNode}h=k}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ui={focusedElem:e,selectionRange:n},rl=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var x=w.memoizedProps,C=w.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?x:Ie(t.type,x),C);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(v){J(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return w=ps,ps=!1,w}function Gn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&ro(t,n,i)}l=l.next}while(l!==r)}}function Dl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function lo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function zc(e){var t=e.alternate;t!==null&&(e.alternate=null,zc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ge],delete t[ar],delete t[Wi],delete t[tp],delete t[np])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Lc(e){return e.tag===5||e.tag===3||e.tag===4}function hs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Lc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function io(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ol));else if(r!==4&&(e=e.child,e!==null))for(io(e,t,n),e=e.sibling;e!==null;)io(e,t,n),e=e.sibling}function oo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(oo(e,t,n),e=e.sibling;e!==null;)oo(e,t,n),e=e.sibling}var ae=null,Ae=!1;function ut(e,t,n){for(n=n.child;n!==null;)Tc(e,t,n),n=n.sibling}function Tc(e,t,n){if(Ye&&typeof Ye.onCommitFiberUnmount=="function")try{Ye.onCommitFiberUnmount(Cl,n)}catch{}switch(n.tag){case 5:pe||on(n,t);case 6:var r=ae,l=Ae;ae=null,ut(e,t,n),ae=r,Ae=l,ae!==null&&(Ae?(e=ae,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ae.removeChild(n.stateNode));break;case 18:ae!==null&&(Ae?(e=ae,n=n.stateNode,e.nodeType===8?ii(e.parentNode,n):e.nodeType===1&&ii(e,n),nr(e)):ii(ae,n.stateNode));break;case 4:r=ae,l=Ae,ae=n.stateNode.containerInfo,Ae=!0,ut(e,t,n),ae=r,Ae=l;break;case 0:case 11:case 14:case 15:if(!pe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&ro(n,t,a),l=l.next}while(l!==r)}ut(e,t,n);break;case 1:if(!pe&&(on(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){J(n,t,s)}ut(e,t,n);break;case 21:ut(e,t,n);break;case 22:n.mode&1?(pe=(r=pe)||n.memoizedState!==null,ut(e,t,n),pe=r):ut(e,t,n);break;default:ut(e,t,n)}}function ms(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new yp),t.forEach(function(r){var l=_p.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Me(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:ae=s.stateNode,Ae=!1;break e;case 3:ae=s.stateNode.containerInfo,Ae=!0;break e;case 4:ae=s.stateNode.containerInfo,Ae=!0;break e}s=s.return}if(ae===null)throw Error(j(160));Tc(i,a,l),ae=null,Ae=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(c){J(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Rc(t,e),t=t.sibling}function Rc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Me(t,e),We(e),r&4){try{Gn(3,e,e.return),Dl(3,e)}catch(x){J(e,e.return,x)}try{Gn(5,e,e.return)}catch(x){J(e,e.return,x)}}break;case 1:Me(t,e),We(e),r&512&&n!==null&&on(n,n.return);break;case 5:if(Me(t,e),We(e),r&512&&n!==null&&on(n,n.return),e.flags&32){var l=e.stateNode;try{Zn(l,"")}catch(x){J(e,e.return,x)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&eu(l,i),Li(s,a);var c=Li(s,i);for(a=0;a<u.length;a+=2){var m=u[a],h=u[a+1];m==="style"?iu(l,h):m==="dangerouslySetInnerHTML"?ru(l,h):m==="children"?Zn(l,h):jo(l,m,h,c)}switch(s){case"input":Ci(l,i);break;case"textarea":tu(l,i);break;case"select":var g=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?sn(l,!!i.multiple,k,!1):g!==!!i.multiple&&(i.defaultValue!=null?sn(l,!!i.multiple,i.defaultValue,!0):sn(l,!!i.multiple,i.multiple?[]:"",!1))}l[ar]=i}catch(x){J(e,e.return,x)}}break;case 6:if(Me(t,e),We(e),r&4){if(e.stateNode===null)throw Error(j(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(x){J(e,e.return,x)}}break;case 3:if(Me(t,e),We(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{nr(t.containerInfo)}catch(x){J(e,e.return,x)}break;case 4:Me(t,e),We(e);break;case 13:Me(t,e),We(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(ta=q())),r&4&&ms(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(pe=(c=pe)||m,Me(t,e),pe=c):Me(t,e),We(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for(L=e,m=e.child;m!==null;){for(h=L=m;L!==null;){switch(g=L,k=g.child,g.tag){case 0:case 11:case 14:case 15:Gn(4,g,g.return);break;case 1:on(g,g.return);var w=g.stateNode;if(typeof w.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(x){J(r,n,x)}}break;case 5:on(g,g.return);break;case 22:if(g.memoizedState!==null){vs(h);continue}}k!==null?(k.return=g,L=k):vs(h)}m=m.sibling}e:for(m=null,h=e;;){if(h.tag===5){if(m===null){m=h;try{l=h.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=h.stateNode,u=h.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=lu("display",a))}catch(x){J(e,e.return,x)}}}else if(h.tag===6){if(m===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(x){J(e,e.return,x)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;m===h&&(m=null),h=h.return}m===h&&(m=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Me(t,e),We(e),r&4&&ms(e);break;case 21:break;default:Me(t,e),We(e)}}function We(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Lc(n)){var r=n;break e}n=n.return}throw Error(j(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Zn(l,""),r.flags&=-33);var i=hs(e);oo(e,i,l);break;case 3:case 4:var a=r.stateNode.containerInfo,s=hs(e);io(e,s,a);break;default:throw Error(j(161))}}catch(u){J(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wp(e,t,n){L=e,Dc(e)}function Dc(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var l=L,i=l.child;if(l.tag===22&&r){var a=l.memoizedState!==null||Fr;if(!a){var s=l.alternate,u=s!==null&&s.memoizedState!==null||pe;s=Fr;var c=pe;if(Fr=a,(pe=u)&&!c)for(L=l;L!==null;)a=L,u=a.child,a.tag===22&&a.memoizedState!==null?ys(l):u!==null?(u.return=a,L=u):ys(l);for(;i!==null;)L=i,Dc(i),i=i.sibling;L=l,Fr=s,pe=c}gs(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,L=i):gs(e)}}function gs(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:pe||Dl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!pe)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Ie(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&es(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}es(t,a,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var h=m.dehydrated;h!==null&&nr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}pe||t.flags&512&&lo(t)}catch(g){J(t,t.return,g)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function vs(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function ys(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Dl(4,t)}catch(u){J(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(u){J(t,l,u)}}var i=t.return;try{lo(t)}catch(u){J(t,i,u)}break;case 5:var a=t.return;try{lo(t)}catch(u){J(t,a,u)}}}catch(u){J(t,t.return,u)}if(t===e){L=null;break}var s=t.sibling;if(s!==null){s.return=t.return,L=s;break}L=t.return}}var kp=Math.ceil,vl=ot.ReactCurrentDispatcher,qo=ot.ReactCurrentOwner,De=ot.ReactCurrentBatchConfig,I=0,oe=null,te=null,se=0,Ne=0,an=zt(0),re=0,pr=null,Wt=0,bl=0,ea=0,Yn=null,xe=null,ta=0,wn=1/0,Je=null,yl=!1,ao=null,jt=null,Mr=!1,mt=null,xl=0,Xn=0,so=null,Yr=-1,Xr=0;function ge(){return I&6?q():Yr!==-1?Yr:Yr=q()}function St(e){return e.mode&1?I&2&&se!==0?se&-se:lp.transition!==null?(Xr===0&&(Xr=vu()),Xr):(e=U,e!==0||(e=window.event,e=e===void 0?16:Nu(e.type)),e):1}function $e(e,t,n,r){if(50<Xn)throw Xn=0,so=null,Error(j(185));vr(e,n,r),(!(I&2)||e!==oe)&&(e===oe&&(!(I&2)&&(bl|=n),re===4&&pt(e,se)),Se(e,r),n===1&&I===0&&!(t.mode&1)&&(wn=q()+500,Ll&&Lt()))}function Se(e,t){var n=e.callbackNode;rf(e,t);var r=nl(e,e===oe?se:0);if(r===0)n!==null&&Pa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Pa(n),t===1)e.tag===0?rp(xs.bind(null,e)):Vu(xs.bind(null,e)),qf(function(){!(I&6)&&Lt()}),n=null;else{switch(yu(r)){case 1:n=Po;break;case 4:n=mu;break;case 16:n=tl;break;case 536870912:n=gu;break;default:n=tl}n=Uc(n,bc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function bc(e,t){if(Yr=-1,Xr=0,I&6)throw Error(j(327));var n=e.callbackNode;if(pn()&&e.callbackNode!==n)return null;var r=nl(e,e===oe?se:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=wl(e,r);else{t=r;var l=I;I|=2;var i=Fc();(oe!==e||se!==t)&&(Je=null,wn=q()+500,At(e,t));do try{Np();break}catch(s){Oc(e,s)}while(!0);Bo(),vl.current=i,I=l,te!==null?t=0:(oe=null,se=0,t=re)}if(t!==0){if(t===2&&(l=Oi(e),l!==0&&(r=l,t=uo(e,l))),t===1)throw n=pr,At(e,0),pt(e,r),Se(e,q()),n;if(t===6)pt(e,r);else{if(l=e.current.alternate,!(r&30)&&!jp(l)&&(t=wl(e,r),t===2&&(i=Oi(e),i!==0&&(r=i,t=uo(e,i))),t===1))throw n=pr,At(e,0),pt(e,r),Se(e,q()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(j(345));case 2:Ot(e,xe,Je);break;case 3:if(pt(e,r),(r&130023424)===r&&(t=ta+500-q(),10<t)){if(nl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ge(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Vi(Ot.bind(null,e,xe,Je),t);break}Ot(e,xe,Je);break;case 4:if(pt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var a=31-Ue(r);i=1<<a,a=t[a],a>l&&(l=a),r&=~i}if(r=l,r=q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*kp(r/1960))-r,10<r){e.timeoutHandle=Vi(Ot.bind(null,e,xe,Je),r);break}Ot(e,xe,Je);break;case 5:Ot(e,xe,Je);break;default:throw Error(j(329))}}}return Se(e,q()),e.callbackNode===n?bc.bind(null,e):null}function uo(e,t){var n=Yn;return e.current.memoizedState.isDehydrated&&(At(e,t).flags|=256),e=wl(e,t),e!==2&&(t=xe,xe=n,t!==null&&co(t)),e}function co(e){xe===null?xe=e:xe.push.apply(xe,e)}function jp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Ve(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pt(e,t){for(t&=~ea,t&=~bl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ue(t),r=1<<n;e[n]=-1,t&=~r}}function xs(e){if(I&6)throw Error(j(327));pn();var t=nl(e,0);if(!(t&1))return Se(e,q()),null;var n=wl(e,t);if(e.tag!==0&&n===2){var r=Oi(e);r!==0&&(t=r,n=uo(e,r))}if(n===1)throw n=pr,At(e,0),pt(e,t),Se(e,q()),n;if(n===6)throw Error(j(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ot(e,xe,Je),Se(e,q()),null}function na(e,t){var n=I;I|=1;try{return e(t)}finally{I=n,I===0&&(wn=q()+500,Ll&&Lt())}}function Ht(e){mt!==null&&mt.tag===0&&!(I&6)&&pn();var t=I;I|=1;var n=De.transition,r=U;try{if(De.transition=null,U=1,e)return e()}finally{U=r,De.transition=n,I=t,!(I&6)&&Lt()}}function ra(){Ne=an.current,W(an)}function At(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Zf(n)),te!==null)for(n=te.return;n!==null;){var r=n;switch(Mo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&al();break;case 3:yn(),W(ke),W(he),Qo();break;case 5:Ho(r);break;case 4:yn();break;case 13:W(K);break;case 19:W(K);break;case 10:Uo(r.type._context);break;case 22:case 23:ra()}n=n.return}if(oe=e,te=e=Nt(e.current,null),se=Ne=t,re=0,pr=null,ea=bl=Wt=0,xe=Yn=null,Mt!==null){for(t=0;t<Mt.length;t++)if(n=Mt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=l,r.next=a}n.pending=r}Mt=null}return e}function Oc(e,t){do{var n=te;try{if(Bo(),Qr.current=gl,ml){for(var r=G.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}ml=!1}if(Vt=0,ie=ne=G=null,Kn=!1,cr=0,qo.current=null,n===null||n.return===null){re=1,pr=t,te=null;break}e:{var i=e,a=n.return,s=n,u=t;if(t=se,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,m=s,h=m.tag;if(!(m.mode&1)&&(h===0||h===11||h===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var k=os(a);if(k!==null){k.flags&=-257,as(k,a,s,i,t),k.mode&1&&is(i,c,t),t=k,u=c;var w=t.updateQueue;if(w===null){var x=new Set;x.add(u),t.updateQueue=x}else w.add(u);break e}else{if(!(t&1)){is(i,c,t),la();break e}u=Error(j(426))}}else if(Q&&s.mode&1){var C=os(a);if(C!==null){!(C.flags&65536)&&(C.flags|=256),as(C,a,s,i,t),Io(xn(u,s));break e}}i=u=xn(u,s),re!==4&&(re=2),Yn===null?Yn=[i]:Yn.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=yc(i,u,t);qa(i,f);break e;case 1:s=u;var d=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(jt===null||!jt.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var v=xc(i,s,t);qa(i,v);break e}}i=i.return}while(i!==null)}Ic(n)}catch(S){t=S,te===n&&n!==null&&(te=n=n.return);continue}break}while(!0)}function Fc(){var e=vl.current;return vl.current=gl,e===null?gl:e}function la(){(re===0||re===3||re===2)&&(re=4),oe===null||!(Wt&268435455)&&!(bl&268435455)||pt(oe,se)}function wl(e,t){var n=I;I|=2;var r=Fc();(oe!==e||se!==t)&&(Je=null,At(e,t));do try{Sp();break}catch(l){Oc(e,l)}while(!0);if(Bo(),I=n,vl.current=r,te!==null)throw Error(j(261));return oe=null,se=0,re}function Sp(){for(;te!==null;)Mc(te)}function Np(){for(;te!==null&&!Gd();)Mc(te)}function Mc(e){var t=Bc(e.alternate,e,Ne);e.memoizedProps=e.pendingProps,t===null?Ic(e):te=t,qo.current=null}function Ic(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=vp(n,t),n!==null){n.flags&=32767,te=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,te=null;return}}else if(n=gp(n,t,Ne),n!==null){te=n;return}if(t=t.sibling,t!==null){te=t;return}te=t=e}while(t!==null);re===0&&(re=5)}function Ot(e,t,n){var r=U,l=De.transition;try{De.transition=null,U=1,Cp(e,t,n,r)}finally{De.transition=l,U=r}return null}function Cp(e,t,n,r){do pn();while(mt!==null);if(I&6)throw Error(j(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(j(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(lf(e,i),e===oe&&(te=oe=null,se=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Mr||(Mr=!0,Uc(tl,function(){return pn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=De.transition,De.transition=null;var a=U;U=1;var s=I;I|=4,qo.current=null,xp(e,n),Rc(n,e),Hf(Ui),rl=!!Bi,Ui=Bi=null,e.current=n,wp(n),Yd(),I=s,U=a,De.transition=i}else e.current=n;if(Mr&&(Mr=!1,mt=e,xl=l),i=e.pendingLanes,i===0&&(jt=null),Zd(n.stateNode),Se(e,q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(yl)throw yl=!1,e=ao,ao=null,e;return xl&1&&e.tag!==0&&pn(),i=e.pendingLanes,i&1?e===so?Xn++:(Xn=0,so=e):Xn=0,Lt(),null}function pn(){if(mt!==null){var e=yu(xl),t=De.transition,n=U;try{if(De.transition=null,U=16>e?16:e,mt===null)var r=!1;else{if(e=mt,mt=null,xl=0,I&6)throw Error(j(331));var l=I;for(I|=4,L=e.current;L!==null;){var i=L,a=i.child;if(L.flags&16){var s=i.deletions;if(s!==null){for(var u=0;u<s.length;u++){var c=s[u];for(L=c;L!==null;){var m=L;switch(m.tag){case 0:case 11:case 15:Gn(8,m,i)}var h=m.child;if(h!==null)h.return=m,L=h;else for(;L!==null;){m=L;var g=m.sibling,k=m.return;if(zc(m),m===c){L=null;break}if(g!==null){g.return=k,L=g;break}L=k}}}var w=i.alternate;if(w!==null){var x=w.child;if(x!==null){w.child=null;do{var C=x.sibling;x.sibling=null,x=C}while(x!==null)}}L=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,L=a;else e:for(;L!==null;){if(i=L,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Gn(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,L=f;break e}L=i.return}}var d=e.current;for(L=d;L!==null;){a=L;var p=a.child;if(a.subtreeFlags&2064&&p!==null)p.return=a,L=p;else e:for(a=d;L!==null;){if(s=L,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Dl(9,s)}}catch(S){J(s,s.return,S)}if(s===a){L=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,L=v;break e}L=s.return}}if(I=l,Lt(),Ye&&typeof Ye.onPostCommitFiberRoot=="function")try{Ye.onPostCommitFiberRoot(Cl,e)}catch{}r=!0}return r}finally{U=n,De.transition=t}}return!1}function ws(e,t,n){t=xn(n,t),t=yc(e,t,1),e=kt(e,t,1),t=ge(),e!==null&&(vr(e,1,t),Se(e,t))}function J(e,t,n){if(e.tag===3)ws(e,e,n);else for(;t!==null;){if(t.tag===3){ws(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(jt===null||!jt.has(r))){e=xn(n,e),e=xc(t,e,1),t=kt(t,e,1),e=ge(),t!==null&&(vr(t,1,e),Se(t,e));break}}t=t.return}}function Ep(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&n,oe===e&&(se&n)===n&&(re===4||re===3&&(se&130023424)===se&&500>q()-ta?At(e,0):ea|=n),Se(e,t)}function Ac(e,t){t===0&&(e.mode&1?(t=Pr,Pr<<=1,!(Pr&130023424)&&(Pr=4194304)):t=1);var n=ge();e=lt(e,t),e!==null&&(vr(e,t,n),Se(e,n))}function Pp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ac(e,n)}function _p(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(j(314))}r!==null&&r.delete(t),Ac(e,n)}var Bc;Bc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ke.current)we=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return we=!1,mp(e,t,n);we=!!(e.flags&131072)}else we=!1,Q&&t.flags&1048576&&Wu(t,cl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Gr(e,t),e=t.pendingProps;var l=mn(t,he.current);fn(t,n),l=Go(null,t,r,e,l,n);var i=Yo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,je(r)?(i=!0,sl(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Vo(t),l.updater=Rl,t.stateNode=l,l._reactInternals=t,Xi(t,r,e,n),t=qi(null,t,r,!0,i,n)):(t.tag=0,Q&&i&&Fo(t),me(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Gr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Lp(r),e=Ie(r,e),l){case 0:t=Zi(null,t,r,e,n);break e;case 1:t=cs(null,t,r,e,n);break e;case 11:t=ss(null,t,r,e,n);break e;case 14:t=us(null,t,r,Ie(r.type,e),n);break e}throw Error(j(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ie(r,l),Zi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ie(r,l),cs(e,t,r,l,n);case 3:e:{if(Sc(t),e===null)throw Error(j(387));r=t.pendingProps,i=t.memoizedState,l=i.element,Xu(e,t),pl(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=xn(Error(j(423)),t),t=ds(e,t,r,n,l);break e}else if(r!==l){l=xn(Error(j(424)),t),t=ds(e,t,r,n,l);break e}else for(Ce=wt(t.stateNode.containerInfo.firstChild),Ee=t,Q=!0,Be=null,n=Gu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(gn(),r===l){t=it(e,t,n);break e}me(e,t,r,n)}t=t.child}return t;case 5:return Ju(t),e===null&&Ki(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,a=l.children,$i(r,l)?a=null:i!==null&&$i(r,i)&&(t.flags|=32),jc(e,t),me(e,t,a,n),t.child;case 6:return e===null&&Ki(t),null;case 13:return Nc(e,t,n);case 4:return Wo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=vn(t,null,r,n):me(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ie(r,l),ss(e,t,r,l,n);case 7:return me(e,t,t.pendingProps,n),t.child;case 8:return me(e,t,t.pendingProps.children,n),t.child;case 12:return me(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,a=l.value,$(dl,r._currentValue),r._currentValue=a,i!==null)if(Ve(i.value,a)){if(i.children===l.children&&!ke.current){t=it(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){a=i.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=tt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?u.next=u:(u.next=m.next,m.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Gi(i.return,n,t),s.lanes|=n;break}u=u.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(j(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Gi(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}me(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,fn(t,n),l=be(l),r=r(l),t.flags|=1,me(e,t,r,n),t.child;case 14:return r=t.type,l=Ie(r,t.pendingProps),l=Ie(r.type,l),us(e,t,r,l,n);case 15:return wc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ie(r,l),Gr(e,t),t.tag=1,je(r)?(e=!0,sl(t)):e=!1,fn(t,n),vc(t,r,l),Xi(t,r,l,n),qi(null,t,r,!0,e,n);case 19:return Cc(e,t,n);case 22:return kc(e,t,n)}throw Error(j(156,t.tag))};function Uc(e,t){return hu(e,t)}function zp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Re(e,t,n,r){return new zp(e,t,n,r)}function ia(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Lp(e){if(typeof e=="function")return ia(e)?1:0;if(e!=null){if(e=e.$$typeof,e===No)return 11;if(e===Co)return 14}return 2}function Nt(e,t){var n=e.alternate;return n===null?(n=Re(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Jr(e,t,n,r,l,i){var a=2;if(r=e,typeof e=="function")ia(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Xt:return Bt(n.children,l,i,t);case So:a=8,l|=8;break;case wi:return e=Re(12,n,t,l|2),e.elementType=wi,e.lanes=i,e;case ki:return e=Re(13,n,t,l),e.elementType=ki,e.lanes=i,e;case ji:return e=Re(19,n,t,l),e.elementType=ji,e.lanes=i,e;case Js:return Ol(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ys:a=10;break e;case Xs:a=9;break e;case No:a=11;break e;case Co:a=14;break e;case ct:a=16,r=null;break e}throw Error(j(130,e==null?e:typeof e,""))}return t=Re(a,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function Bt(e,t,n,r){return e=Re(7,e,r,t),e.lanes=n,e}function Ol(e,t,n,r){return e=Re(22,e,r,t),e.elementType=Js,e.lanes=n,e.stateNode={isHidden:!1},e}function pi(e,t,n){return e=Re(6,e,null,t),e.lanes=n,e}function hi(e,t,n){return t=Re(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Tp(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Gl(0),this.expirationTimes=Gl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function oa(e,t,n,r,l,i,a,s,u){return e=new Tp(e,t,n,s,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Re(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vo(i),e}function Rp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function $c(e){if(!e)return Pt;e=e._reactInternals;e:{if(Kt(e)!==e||e.tag!==1)throw Error(j(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(je(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(j(171))}if(e.tag===1){var n=e.type;if(je(n))return $u(e,n,t)}return t}function Vc(e,t,n,r,l,i,a,s,u){return e=oa(n,r,!0,e,l,i,a,s,u),e.context=$c(null),n=e.current,r=ge(),l=St(n),i=tt(r,l),i.callback=t??null,kt(n,i,l),e.current.lanes=l,vr(e,l,r),Se(e,r),e}function Fl(e,t,n,r){var l=t.current,i=ge(),a=St(l);return n=$c(n),t.context===null?t.context=n:t.pendingContext=n,t=tt(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=kt(l,t,a),e!==null&&($e(e,l,a,i),Hr(e,l,a)),a}function kl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ks(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function aa(e,t){ks(e,t),(e=e.alternate)&&ks(e,t)}function Dp(){return null}var Wc=typeof reportError=="function"?reportError:function(e){console.error(e)};function sa(e){this._internalRoot=e}Ml.prototype.render=sa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));Fl(e,t,null,null)};Ml.prototype.unmount=sa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Fl(null,e,null,null)}),t[rt]=null}};function Ml(e){this._internalRoot=e}Ml.prototype.unstable_scheduleHydration=function(e){if(e){var t=ku();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ft.length&&t!==0&&t<ft[n].priority;n++);ft.splice(n,0,e),n===0&&Su(e)}};function ua(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Il(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function js(){}function bp(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=kl(a);i.call(c)}}var a=Vc(t,r,e,0,null,!1,!1,"",js);return e._reactRootContainer=a,e[rt]=a.current,ir(e.nodeType===8?e.parentNode:e),Ht(),a}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var c=kl(u);s.call(c)}}var u=oa(e,0,!1,null,null,!1,!1,"",js);return e._reactRootContainer=u,e[rt]=u.current,ir(e.nodeType===8?e.parentNode:e),Ht(function(){Fl(t,u,n,r)}),u}function Al(e,t,n,r,l){var i=n._reactRootContainer;if(i){var a=i;if(typeof l=="function"){var s=l;l=function(){var u=kl(a);s.call(u)}}Fl(t,a,e,l)}else a=bp(n,t,e,l,r);return kl(a)}xu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Bn(t.pendingLanes);n!==0&&(_o(t,n|1),Se(t,q()),!(I&6)&&(wn=q()+500,Lt()))}break;case 13:Ht(function(){var r=lt(e,1);if(r!==null){var l=ge();$e(r,e,1,l)}}),aa(e,1)}};zo=function(e){if(e.tag===13){var t=lt(e,134217728);if(t!==null){var n=ge();$e(t,e,134217728,n)}aa(e,134217728)}};wu=function(e){if(e.tag===13){var t=St(e),n=lt(e,t);if(n!==null){var r=ge();$e(n,e,t,r)}aa(e,t)}};ku=function(){return U};ju=function(e,t){var n=U;try{return U=e,t()}finally{U=n}};Ri=function(e,t,n){switch(t){case"input":if(Ci(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=zl(r);if(!l)throw Error(j(90));qs(r),Ci(r,l)}}}break;case"textarea":tu(e,n);break;case"select":t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}};su=na;uu=Ht;var Op={usingClientEntryPoint:!1,Events:[xr,en,zl,ou,au,na]},Mn={findFiberByHostInstance:Ft,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fp={bundleType:Mn.bundleType,version:Mn.version,rendererPackageName:Mn.rendererPackageName,rendererConfig:Mn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fu(e),e===null?null:e.stateNode},findFiberByHostInstance:Mn.findFiberByHostInstance||Dp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ir=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ir.isDisabled&&Ir.supportsFiber)try{Cl=Ir.inject(Fp),Ye=Ir}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Op;_e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ua(t))throw Error(j(200));return Rp(e,t,null,n)};_e.createRoot=function(e,t){if(!ua(e))throw Error(j(299));var n=!1,r="",l=Wc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=oa(e,1,!1,null,null,n,!1,r,l),e[rt]=t.current,ir(e.nodeType===8?e.parentNode:e),new sa(t)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=fu(t),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return Ht(e)};_e.hydrate=function(e,t,n){if(!Il(t))throw Error(j(200));return Al(null,e,t,!0,n)};_e.hydrateRoot=function(e,t,n){if(!ua(e))throw Error(j(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",a=Wc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Vc(t,null,e,1,n??null,l,!1,i,a),e[rt]=t.current,ir(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Ml(t)};_e.render=function(e,t,n){if(!Il(t))throw Error(j(200));return Al(null,e,t,!1,n)};_e.unmountComponentAtNode=function(e){if(!Il(e))throw Error(j(40));return e._reactRootContainer?(Ht(function(){Al(null,null,e,!1,function(){e._reactRootContainer=null,e[rt]=null})}),!0):!1};_e.unstable_batchedUpdates=na;_e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Il(n))throw Error(j(200));if(e==null||e._reactInternals===void 0)throw Error(j(38));return Al(e,t,n,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function Hc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Hc)}catch(e){console.error(e)}}Hc(),Hs.exports=_e;var Mp=Hs.exports,Ss=Mp;yi.createRoot=Ss.createRoot,yi.hydrateRoot=Ss.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function hr(){return hr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},hr.apply(null,arguments)}var gt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(gt||(gt={}));const Ns="popstate";function Ip(e){e===void 0&&(e={});function t(r,l){let{pathname:i,search:a,hash:s}=r.location;return fo("",{pathname:i,search:a,hash:s},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function n(r,l){return typeof l=="string"?l:jl(l)}return Bp(t,n,null,e)}function Y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ca(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ap(){return Math.random().toString(36).substr(2,8)}function Cs(e,t){return{usr:e.state,key:e.key,idx:t}}function fo(e,t,n,r){return n===void 0&&(n=null),hr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Cn(t):t,{state:n,key:t&&t.key||r||Ap()})}function jl(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Cn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Bp(e,t,n,r){r===void 0&&(r={});let{window:l=document.defaultView,v5Compat:i=!1}=r,a=l.history,s=gt.Pop,u=null,c=m();c==null&&(c=0,a.replaceState(hr({},a.state,{idx:c}),""));function m(){return(a.state||{idx:null}).idx}function h(){s=gt.Pop;let C=m(),f=C==null?null:C-c;c=C,u&&u({action:s,location:x.location,delta:f})}function g(C,f){s=gt.Push;let d=fo(x.location,C,f);c=m()+1;let p=Cs(d,c),v=x.createHref(d);try{a.pushState(p,"",v)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;l.location.assign(v)}i&&u&&u({action:s,location:x.location,delta:1})}function k(C,f){s=gt.Replace;let d=fo(x.location,C,f);c=m();let p=Cs(d,c),v=x.createHref(d);a.replaceState(p,"",v),i&&u&&u({action:s,location:x.location,delta:0})}function w(C){let f=l.location.origin!=="null"?l.location.origin:l.location.href,d=typeof C=="string"?C:jl(C);return d=d.replace(/ $/,"%20"),Y(f,"No window.location.(origin|href) available to create URL for href: "+d),new URL(d,f)}let x={get action(){return s},get location(){return e(l,a)},listen(C){if(u)throw new Error("A history only accepts one active listener");return l.addEventListener(Ns,h),u=C,()=>{l.removeEventListener(Ns,h),u=null}},createHref(C){return t(l,C)},createURL:w,encodeLocation(C){let f=w(C);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:g,replace:k,go(C){return a.go(C)}};return x}var Es;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Es||(Es={}));function Up(e,t,n){return n===void 0&&(n="/"),$p(e,t,n)}function $p(e,t,n,r){let l=typeof t=="string"?Cn(t):t,i=kn(l.pathname||"/",n);if(i==null)return null;let a=Qc(e);Vp(a);let s=null,u=eh(i);for(let c=0;s==null&&c<a.length;++c)s=Zp(a[c],u);return s}function Qc(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let l=(i,a,s)=>{let u={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};u.relativePath.startsWith("/")&&(Y(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Ct([r,u.relativePath]),m=n.concat(u);i.children&&i.children.length>0&&(Y(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Qc(i.children,t,m,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:Xp(c,i.index),routesMeta:m})};return e.forEach((i,a)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))l(i,a);else for(let u of Kc(i.path))l(i,a,u)}),t}function Kc(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,l=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return l?[i,""]:[i];let a=Kc(r.join("/")),s=[];return s.push(...a.map(u=>u===""?i:[i,u].join("/"))),l&&s.push(...a),s.map(u=>e.startsWith("/")&&u===""?"/":u)}function Vp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Jp(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Wp=/^:[\w-]+$/,Hp=3,Qp=2,Kp=1,Gp=10,Yp=-2,Ps=e=>e==="*";function Xp(e,t){let n=e.split("/"),r=n.length;return n.some(Ps)&&(r+=Yp),t&&(r+=Qp),n.filter(l=>!Ps(l)).reduce((l,i)=>l+(Wp.test(i)?Hp:i===""?Kp:Gp),r)}function Jp(e,t){return e.length===t.length&&e.slice(0,-1).every((r,l)=>r===t[l])?e[e.length-1]-t[t.length-1]:0}function Zp(e,t,n){let{routesMeta:r}=e,l={},i="/",a=[];for(let s=0;s<r.length;++s){let u=r[s],c=s===r.length-1,m=i==="/"?t:t.slice(i.length)||"/",h=po({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},m),g=u.route;if(!h)return null;Object.assign(l,h.params),a.push({params:l,pathname:Ct([i,h.pathname]),pathnameBase:ih(Ct([i,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(i=Ct([i,h.pathnameBase]))}return a}function po(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=qp(e.path,e.caseSensitive,e.end),l=t.match(n);if(!l)return null;let i=l[0],a=i.replace(/(.)\/+$/,"$1"),s=l.slice(1);return{params:r.reduce((c,m,h)=>{let{paramName:g,isOptional:k}=m;if(g==="*"){let x=s[h]||"";a=i.slice(0,i.length-x.length).replace(/(.)\/+$/,"$1")}const w=s[h];return k&&!w?c[g]=void 0:c[g]=(w||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:a,pattern:e}}function qp(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ca(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],l="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,s,u)=>(r.push({paramName:s,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),l+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?l+="\\/*$":e!==""&&e!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,t?void 0:"i"),r]}function eh(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ca(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function kn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const th=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,nh=e=>th.test(e);function rh(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:l=""}=typeof e=="string"?Cn(e):e,i;if(n)if(nh(n))i=n;else{if(n.includes("//")){let a=n;n=Gc(n),ca(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+n))}n.startsWith("/")?i=_s(n.substring(1),"/"):i=_s(n,t)}else i=t;return{pathname:i,search:oh(r),hash:ah(l)}}function _s(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(l=>{l===".."?n.length>1&&n.pop():l!=="."&&n.push(l)}),n.length>1?n.join("/"):"/"}function mi(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function lh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function da(e,t){let n=lh(e);return t?n.map((r,l)=>l===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function fa(e,t,n,r){r===void 0&&(r=!1);let l;typeof e=="string"?l=Cn(e):(l=hr({},e),Y(!l.pathname||!l.pathname.includes("?"),mi("?","pathname","search",l)),Y(!l.pathname||!l.pathname.includes("#"),mi("#","pathname","hash",l)),Y(!l.search||!l.search.includes("#"),mi("#","search","hash",l)));let i=e===""||l.pathname==="",a=i?"/":l.pathname,s;if(a==null)s=n;else{let h=t.length-1;if(!r&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;l.pathname=g.join("/")}s=h>=0?t[h]:"/"}let u=rh(l,s),c=a&&a!=="/"&&a.endsWith("/"),m=(i||a===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||m)&&(u.pathname+="/"),u}const Gc=e=>e.replace(/\/\/+/g,"/"),Ct=e=>Gc(e.join("/")),ih=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),oh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ah=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function sh(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Yc=["post","put","patch","delete"];new Set(Yc);const uh=["get",...Yc];new Set(uh);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mr(){return mr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},mr.apply(null,arguments)}const Bl=y.createContext(null),Xc=y.createContext(null),at=y.createContext(null),Ul=y.createContext(null),st=y.createContext({outlet:null,matches:[],isDataRoute:!1}),Jc=y.createContext(null);function ch(e,t){let{relative:n}=t===void 0?{}:t;En()||Y(!1);let{basename:r,navigator:l}=y.useContext(at),{hash:i,pathname:a,search:s}=$l(e,{relative:n}),u=a;return r!=="/"&&(u=a==="/"?r:Ct([r,a])),l.createHref({pathname:u,search:s,hash:i})}function En(){return y.useContext(Ul)!=null}function Pn(){return En()||Y(!1),y.useContext(Ul).location}function Zc(e){y.useContext(at).static||y.useLayoutEffect(e)}function _n(){let{isDataRoute:e}=y.useContext(st);return e?Ch():dh()}function dh(){En()||Y(!1);let e=y.useContext(Bl),{basename:t,future:n,navigator:r}=y.useContext(at),{matches:l}=y.useContext(st),{pathname:i}=Pn(),a=JSON.stringify(da(l,n.v7_relativeSplatPath)),s=y.useRef(!1);return Zc(()=>{s.current=!0}),y.useCallback(function(c,m){if(m===void 0&&(m={}),!s.current)return;if(typeof c=="number"){r.go(c);return}let h=fa(c,JSON.parse(a),i,m.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:Ct([t,h.pathname])),(m.replace?r.replace:r.push)(h,m.state,m)},[t,r,a,i,e])}const fh=y.createContext(null);function ph(e){let t=y.useContext(st).outlet;return t&&y.createElement(fh.Provider,{value:e},t)}function $l(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=y.useContext(at),{matches:l}=y.useContext(st),{pathname:i}=Pn(),a=JSON.stringify(da(l,r.v7_relativeSplatPath));return y.useMemo(()=>fa(e,JSON.parse(a),i,n==="path"),[e,a,i,n])}function hh(e,t){return mh(e,t)}function mh(e,t,n,r){En()||Y(!1);let{navigator:l}=y.useContext(at),{matches:i}=y.useContext(st),a=i[i.length-1],s=a?a.params:{};a&&a.pathname;let u=a?a.pathnameBase:"/";a&&a.route;let c=Pn(),m;if(t){var h;let C=typeof t=="string"?Cn(t):t;u==="/"||(h=C.pathname)!=null&&h.startsWith(u)||Y(!1),m=C}else m=c;let g=m.pathname||"/",k=g;if(u!=="/"){let C=u.replace(/^\//,"").split("/");k="/"+g.replace(/^\//,"").split("/").slice(C.length).join("/")}let w=Up(e,{pathname:k}),x=wh(w&&w.map(C=>Object.assign({},C,{params:Object.assign({},s,C.params),pathname:Ct([u,l.encodeLocation?l.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?u:Ct([u,l.encodeLocation?l.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),i,n,r);return t&&x?y.createElement(Ul.Provider,{value:{location:mr({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:gt.Pop}},x):x}function gh(){let e=Nh(),t=sh(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:l},n):null,null)}const vh=y.createElement(gh,null);class yh extends y.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?y.createElement(st.Provider,{value:this.props.routeContext},y.createElement(Jc.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function xh(e){let{routeContext:t,match:n,children:r}=e,l=y.useContext(Bl);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),y.createElement(st.Provider,{value:t},r)}function wh(e,t,n,r){var l;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,s=(l=n)==null?void 0:l.errors;if(s!=null){let m=a.findIndex(h=>h.route.id&&(s==null?void 0:s[h.route.id])!==void 0);m>=0||Y(!1),a=a.slice(0,Math.min(a.length,m+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<a.length;m++){let h=a[m];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(c=m),h.route.id){let{loaderData:g,errors:k}=n,w=h.route.loader&&g[h.route.id]===void 0&&(!k||k[h.route.id]===void 0);if(h.route.lazy||w){u=!0,c>=0?a=a.slice(0,c+1):a=[a[0]];break}}}return a.reduceRight((m,h,g)=>{let k,w=!1,x=null,C=null;n&&(k=s&&h.route.id?s[h.route.id]:void 0,x=h.route.errorElement||vh,u&&(c<0&&g===0?(Eh("route-fallback"),w=!0,C=null):c===g&&(w=!0,C=h.route.hydrateFallbackElement||null)));let f=t.concat(a.slice(0,g+1)),d=()=>{let p;return k?p=x:w?p=C:h.route.Component?p=y.createElement(h.route.Component,null):h.route.element?p=h.route.element:p=m,y.createElement(xh,{match:h,routeContext:{outlet:m,matches:f,isDataRoute:n!=null},children:p})};return n&&(h.route.ErrorBoundary||h.route.errorElement||g===0)?y.createElement(yh,{location:n.location,revalidation:n.revalidation,component:x,error:k,children:d(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):d()},null)}var qc=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(qc||{}),ed=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ed||{});function kh(e){let t=y.useContext(Bl);return t||Y(!1),t}function jh(e){let t=y.useContext(Xc);return t||Y(!1),t}function Sh(e){let t=y.useContext(st);return t||Y(!1),t}function td(e){let t=Sh(),n=t.matches[t.matches.length-1];return n.route.id||Y(!1),n.route.id}function Nh(){var e;let t=y.useContext(Jc),n=jh(),r=td();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Ch(){let{router:e}=kh(qc.UseNavigateStable),t=td(ed.UseNavigateStable),n=y.useRef(!1);return Zc(()=>{n.current=!0}),y.useCallback(function(l,i){i===void 0&&(i={}),n.current&&(typeof l=="number"?e.navigate(l):e.navigate(l,mr({fromRouteId:t},i)))},[e,t])}const zs={};function Eh(e,t,n){zs[e]||(zs[e]=!0)}function Ph(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function _h(e){let{to:t,replace:n,state:r,relative:l}=e;En()||Y(!1);let{future:i,static:a}=y.useContext(at),{matches:s}=y.useContext(st),{pathname:u}=Pn(),c=_n(),m=fa(t,da(s,i.v7_relativeSplatPath),u,l==="path"),h=JSON.stringify(m);return y.useEffect(()=>c(JSON.parse(h),{replace:n,state:r,relative:l}),[c,h,l,n,r]),null}function zh(e){return ph(e.context)}function He(e){Y(!1)}function Lh(e){let{basename:t="/",children:n=null,location:r,navigationType:l=gt.Pop,navigator:i,static:a=!1,future:s}=e;En()&&Y(!1);let u=t.replace(/^\/*/,"/"),c=y.useMemo(()=>({basename:u,navigator:i,static:a,future:mr({v7_relativeSplatPath:!1},s)}),[u,s,i,a]);typeof r=="string"&&(r=Cn(r));let{pathname:m="/",search:h="",hash:g="",state:k=null,key:w="default"}=r,x=y.useMemo(()=>{let C=kn(m,u);return C==null?null:{location:{pathname:C,search:h,hash:g,state:k,key:w},navigationType:l}},[u,m,h,g,k,w,l]);return x==null?null:y.createElement(at.Provider,{value:c},y.createElement(Ul.Provider,{children:n,value:x}))}function Th(e){let{children:t,location:n}=e;return hh(ho(t),n)}new Promise(()=>{});function ho(e,t){t===void 0&&(t=[]);let n=[];return y.Children.forEach(e,(r,l)=>{if(!y.isValidElement(r))return;let i=[...t,l];if(r.type===y.Fragment){n.push.apply(n,ho(r.props.children,i));return}r.type!==He&&Y(!1),!r.props.index||!r.props.children||Y(!1);let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=ho(r.props.children,i)),n.push(a)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Sl(){return Sl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Sl.apply(null,arguments)}function nd(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function Rh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Dh(e,t){return e.button===0&&(!t||t==="_self")&&!Rh(e)}const bh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Oh=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Fh="6";try{window.__reactRouterVersion=Fh}catch{}const Mh=y.createContext({isTransitioning:!1}),Ih="startTransition",Ls=Cd[Ih];function Ah(e){let{basename:t,children:n,future:r,window:l}=e,i=y.useRef();i.current==null&&(i.current=Ip({window:l,v5Compat:!0}));let a=i.current,[s,u]=y.useState({action:a.action,location:a.location}),{v7_startTransition:c}=r||{},m=y.useCallback(h=>{c&&Ls?Ls(()=>u(h)):u(h)},[u,c]);return y.useLayoutEffect(()=>a.listen(m),[a,m]),y.useEffect(()=>Ph(r),[r]),y.createElement(Lh,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:a,future:r})}const Bh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Uh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ke=y.forwardRef(function(t,n){let{onClick:r,relative:l,reloadDocument:i,replace:a,state:s,target:u,to:c,preventScrollReset:m,viewTransition:h}=t,g=nd(t,bh),{basename:k}=y.useContext(at),w,x=!1;if(typeof c=="string"&&Uh.test(c)&&(w=c,Bh))try{let p=new URL(window.location.href),v=c.startsWith("//")?new URL(p.protocol+c):new URL(c),S=kn(v.pathname,k);v.origin===p.origin&&S!=null?c=S+v.search+v.hash:x=!0}catch{}let C=ch(c,{relative:l}),f=Wh(c,{replace:a,state:s,target:u,preventScrollReset:m,relative:l,viewTransition:h});function d(p){r&&r(p),p.defaultPrevented||f(p)}return y.createElement("a",Sl({},g,{href:w||C,onClick:x||i?r:d,ref:n,target:u}))}),$h=y.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:l=!1,className:i="",end:a=!1,style:s,to:u,viewTransition:c,children:m}=t,h=nd(t,Oh),g=$l(u,{relative:h.relative}),k=Pn(),w=y.useContext(Xc),{navigator:x,basename:C}=y.useContext(at),f=w!=null&&Hh(g)&&c===!0,d=x.encodeLocation?x.encodeLocation(g).pathname:g.pathname,p=k.pathname,v=w&&w.navigation&&w.navigation.location?w.navigation.location.pathname:null;l||(p=p.toLowerCase(),v=v?v.toLowerCase():null,d=d.toLowerCase()),v&&C&&(v=kn(v,C)||v);const S=d!=="/"&&d.endsWith("/")?d.length-1:d.length;let E=p===d||!a&&p.startsWith(d)&&p.charAt(S)==="/",P=v!=null&&(v===d||!a&&v.startsWith(d)&&v.charAt(d.length)==="/"),T={isActive:E,isPending:P,isTransitioning:f},A=E?r:void 0,b;typeof i=="function"?b=i(T):b=[i,E?"active":null,P?"pending":null,f?"transitioning":null].filter(Boolean).join(" ");let ee=typeof s=="function"?s(T):s;return y.createElement(Ke,Sl({},h,{"aria-current":A,className:b,ref:n,style:ee,to:u,viewTransition:c}),typeof m=="function"?m(T):m)});var mo;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(mo||(mo={}));var Ts;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ts||(Ts={}));function Vh(e){let t=y.useContext(Bl);return t||Y(!1),t}function Wh(e,t){let{target:n,replace:r,state:l,preventScrollReset:i,relative:a,viewTransition:s}=t===void 0?{}:t,u=_n(),c=Pn(),m=$l(e,{relative:a});return y.useCallback(h=>{if(Dh(h,n)){h.preventDefault();let g=r!==void 0?r:jl(c)===jl(m);u(e,{replace:g,state:l,preventScrollReset:i,relative:a,viewTransition:s})}},[c,u,m,r,l,n,e,i,a,s])}function Hh(e,t){t===void 0&&(t={});let n=y.useContext(Mh);n==null&&Y(!1);let{basename:r}=Vh(mo.useViewTransitionState),l=$l(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=kn(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=kn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return po(l.pathname,a)!=null||po(l.pathname,i)!=null}const Qh="https://smartcare-hms-backend.vercel.app/api";async function Tt(e,{method:t="GET",body:n,token:r}={}){const l={"Content-Type":"application/json"};r&&(l.Authorization=`Bearer ${r}`);const i=await fetch(`${Qh}${e}`,{method:t,headers:l,body:n?JSON.stringify(n):void 0}),a=await i.json();if(!i.ok||a.success===!1)throw new Error(a.message||"Something went wrong");return a}function Kh({username:e,email:t,password:n,role:r}){return Tt("/auth/register",{method:"POST",body:{username:e,email:t,password:n,role:r}})}function Gh({email:e,password:t}){return Tt("/auth/login",{method:"POST",body:{email:e,password:t}})}const pa="smartcare_token",ha="smartcare_user";function Yh({token:e,user:t}){localStorage.setItem(pa,e),localStorage.setItem(ha,JSON.stringify(t))}function zn(){return localStorage.getItem(pa)}function rd(){const e=localStorage.getItem(ha);return e?JSON.parse(e):null}function ld(){const e=zn();if(!e)throw new Error("Authentication token not found");return Tt("/patients/me",{method:"GET",token:e})}function Xh(){const e=zn();if(!e)throw new Error("Authentication token not found");return Tt("/ai/vitals/me",{method:"GET",token:e})}function Jh(){const e=zn();if(!e)throw new Error("Authentication token not found");return Tt("/ai/my-predictions",{method:"GET",token:e})}function id(){const e=zn();return Tt("/doctors",{method:"GET",token:e})}function od({appointment_code:e,patient_id:t,doctor_id:n,appointment_date:r,appointment_time:l,reason:i}){const a=zn();if(!a)throw new Error("Authentication token not found");return Tt("/appointments",{method:"POST",token:a,body:{appointment_code:e,patient_id:t,doctor_id:n,appointment_date:r,appointment_time:l,reason:i}})}function Zh(e){const t=zn();if(!t)throw new Error("Authentication token not found");return Tt(`/appointments/patient/${e}`,{method:"GET",token:t})}function ad(){localStorage.removeItem(pa),localStorage.removeItem(ha)}function qh(){const e=rd(),t=e==null?void 0:e.role,n=[];t==="PATIENT"&&n.push({label:"Patient",links:[{to:"/patient/health-profile",label:"Health Profile"},{to:"/patient/dashboard",label:"My Dashboard"}]}),t==="DOCTOR"&&n.push({label:"Doctor",links:[{to:"/doctor/dashboard",label:"Doctor Dashboard"}]}),t==="ADMIN"&&n.push({label:"Admin",links:[{to:"/admin/dashboard",label:"Admin Dashboard"}]});const r=()=>{ad(),window.location.href="/login"};return o.jsxs("aside",{className:"sidebar",children:[o.jsxs("div",{className:"sidebar-brand",children:[o.jsx("span",{className:"sidebar-mark",children:"+"}),o.jsx("span",{children:"SmartCare"})]}),o.jsx("nav",{className:"sidebar-nav",children:n.map(l=>o.jsxs("div",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l.label}),l.links.map(i=>o.jsx($h,{to:i.to,className:({isActive:a})=>a?"sidebar-link sidebar-link-active":"sidebar-link",children:i.label},i.to))]},l.label))}),o.jsx("div",{className:"sidebar-footer",children:o.jsx("button",{type:"button",className:"sidebar-link sidebar-logout",onClick:r,children:"Log out"})}),o.jsx("style",{children:`
        .sidebar {
          width: 230px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          padding: 0 8px 24px;
          color: var(--color-primary);
        }

        .sidebar-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .sidebar-nav {
          flex: 1;
        }

        .sidebar-section {
          margin-bottom: 20px;
        }

        .sidebar-section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-ink-soft);
          font-weight: 700;
          padding: 0 8px;
          margin-bottom: 6px;
        }

        .sidebar-link {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink-soft);
          text-decoration: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .sidebar-link:hover {
          background: var(--color-bg);
          color: var(--color-ink);
        }

        .sidebar-link-active {
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid var(--color-line);
          padding-top: 12px;
        }

        .sidebar-logout {
          color: var(--color-danger);
        }

        .sidebar-logout:hover {
          color: var(--color-danger);
        }

        @media (max-width: 900px) {
          .sidebar {
            display: none;
          }
        }
      `})]})}function em(){return o.jsxs("div",{className:"app-shell",children:[o.jsx(qh,{}),o.jsx("main",{className:"main-content",children:o.jsx(zh,{})})]})}const tm=[{title:"Heart Disease",icon:"♥",desc:"AI-based risk screening from your vitals — BP, cholesterol indicators, and history."},{title:"Diabetes",icon:"◈",desc:"Glucose-based risk prediction, matched instantly with an Endocrinologist."},{title:"Kidney Disease",icon:"◐",desc:"Early risk detection so you get routed to a Nephrologist without delay."}],Rs=[{title:"Register",desc:"Create your patient account in under a minute."},{title:"Fill health profile",desc:"Submit your vitals and symptoms."},{title:"Get matched",desc:"AI predicts risk and finds the right specialist."},{title:"Book appointment",desc:"Confirm a slot with your matched doctor."}];function nm(){var H;const e=_n(),t=rd(),n=(t==null?void 0:t.role)||null,[r,l]=y.useState(!1),[i,a]=y.useState(!1),[s,u]=y.useState([]),[c,m]=y.useState(!0),[h,g]=y.useState(""),[k,w]=y.useState(null),[x,C]=y.useState({doctor_id:"",appointment_date:"",appointment_time:"",reason:""}),[f,d]=y.useState(!1),[p,v]=y.useState(""),[S,E]=y.useState("");y.useEffect(()=>{async function R(){try{m(!0),g("");const M=await id();u(M.doctors||[])}catch(M){console.error("Failed to load doctors:",M),g(M.message||"Failed to load doctors from the server.")}finally{m(!1)}}R()},[]),y.useEffect(()=>{async function R(){if(n!=="PATIENT"){w(null);return}try{const M=await ld();w(M.patient)}catch(M){console.error("Failed to load patient profile:",M),E(M.message||"Failed to load patient profile.")}}R()},[n]);const P=()=>{const R=new Date,M=R.getFullYear(),le=String(R.getMonth()+1).padStart(2,"0"),Fe=String(R.getDate()).padStart(2,"0");return`${M}-${le}-${Fe}`},T=()=>{ad(),a(!1),l(!1),e("/")},A=()=>{a(!1),l(!1),n==="ADMIN"?e("/admin/dashboard"):n==="DOCTOR"?e("/doctor/dashboard"):n==="PATIENT"&&e("/patient/dashboard")},b=R=>{const{name:M,value:le}=R.target;C(Fe=>({...Fe,[M]:le})),E(""),v("")},ee=async R=>{if(R.preventDefault(),E(""),v(""),!t){E("Please login as a patient before booking an appointment."),e("/login");return}if(n!=="PATIENT"){E("Only patient accounts can book appointments from this form.");return}if(!(k!=null&&k.id)){E("Patient profile not found. Please complete your patient profile.");return}if(!x.doctor_id||!x.appointment_date||!x.appointment_time){E("Please select a doctor, appointment date and appointment time.");return}if(x.appointment_date<P()){E("Appointment date cannot be in the past.");return}try{d(!0);const M=`APT-${Date.now()}`;await od({appointment_code:M,patient_id:k.id,doctor_id:Number(x.doctor_id),appointment_date:x.appointment_date,appointment_time:x.appointment_time,reason:x.reason.trim()||"Manual appointment booking from home page"}),v(`Appointment booked successfully. Appointment code: ${M}`),C({doctor_id:"",appointment_date:"",appointment_time:"",reason:""})}catch(M){console.error("Appointment booking error:",M),E(M.message||"Failed to book appointment.")}finally{d(!1)}},N=s.filter(R=>R.availability_status==="AVAILABLE");return o.jsxs("div",{className:"home-page",children:[o.jsxs("header",{className:"home-nav",children:[o.jsxs("div",{className:"home-nav-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsxs("nav",{className:`home-nav-links ${r?"home-nav-links-open":""}`,children:[o.jsx("a",{href:"#services",onClick:()=>l(!1),children:"Services"}),o.jsx("a",{href:"#how",onClick:()=>l(!1),children:"How it works"}),o.jsx("a",{href:"#doctors",onClick:()=>l(!1),children:"Doctors"}),o.jsx("a",{href:"#appointment",onClick:()=>l(!1),children:"Appointment"}),o.jsx("a",{href:"#contact",onClick:()=>l(!1),children:"Contact"}),!t&&o.jsxs(o.Fragment,{children:[o.jsx(Ke,{to:"/login",onClick:()=>l(!1),children:"Log in"}),o.jsx(Ke,{to:"/register",onClick:()=>l(!1),children:"Register"})]}),t&&o.jsx("button",{type:"button",className:"mobile-dashboard-link",onClick:A,children:"Dashboard"})]}),o.jsxs("div",{className:"home-nav-actions",children:[t?o.jsxs("div",{className:"profile-menu",children:[o.jsx("button",{type:"button",className:"profile-button",onClick:()=>{a(R=>!R),l(!1)},"aria-label":"Open profile menu","aria-expanded":i,children:o.jsx("span",{className:"profile-icon",children:((H=t.username)==null?void 0:H.charAt(0).toUpperCase())||"U"})}),i&&o.jsxs("div",{className:"profile-dropdown",children:[o.jsxs("div",{className:"profile-info",children:[o.jsx("strong",{children:t.username}),o.jsx("span",{children:t.role})]}),o.jsx("button",{type:"button",onClick:A,children:"Dashboard"}),o.jsx("button",{type:"button",onClick:T,children:"Log out"})]})]}):o.jsxs(o.Fragment,{children:[o.jsx(Ke,{to:"/login",className:"btn btn-outline",children:"Log in"}),o.jsx(Ke,{to:"/register",className:"btn btn-primary",children:"Register"})]}),o.jsxs("button",{type:"button",className:"hamburger-button",onClick:()=>{l(R=>!R),a(!1)},"aria-label":"Toggle navigation menu","aria-expanded":r,children:[o.jsx("span",{}),o.jsx("span",{}),o.jsx("span",{})]})]})]}),o.jsx("section",{className:"home-hero",children:o.jsxs("div",{className:"home-hero-text",children:[o.jsx("span",{className:"home-hero-badge",children:"AI-powered diagnosis matching"}),o.jsxs("h1",{children:["Care that finds ",o.jsx("span",{children:"the right specialist"})," for you."]}),o.jsx("p",{children:"Submit your health profile and let SmartCare's AI model predict your risk for Heart Disease, Diabetes, or Kidney Disease — then connect you with the right doctor, automatically."}),o.jsxs("div",{className:"home-hero-actions",children:[o.jsx(Ke,{to:"/register",className:"btn btn-primary btn-lg",children:"Get Started"}),o.jsx(Ke,{to:"/login",className:"btn btn-ghost btn-lg",children:"Log in"})]}),o.jsxs("div",{className:"home-hero-stats",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"3"}),o.jsx("span",{children:"Conditions screened"})]}),o.jsxs("div",{children:[o.jsx("strong",{children:s.length}),o.jsx("span",{children:"Specialist doctors"})]}),o.jsxs("div",{children:[o.jsx("strong",{children:"24/7"}),o.jsx("span",{children:"Booking access"})]})]})]})}),o.jsxs("section",{id:"services",className:"home-section",children:[o.jsxs("div",{className:"home-section-head",children:[o.jsx("div",{className:"page-eyebrow",children:"What we screen for"}),o.jsx("h2",{className:"home-section-title",children:"Our services"}),o.jsx("p",{className:"home-section-sub",children:"Three well-documented conditions, screened with a trained classification model."})]}),o.jsx("div",{className:"grid grid-3",children:tm.map(R=>o.jsxs("div",{className:"service-card",children:[o.jsx("div",{className:"service-icon",children:R.icon}),o.jsx("h3",{children:R.title}),o.jsx("p",{children:R.desc})]},R.title))})]}),o.jsxs("section",{id:"how",className:"home-section home-section-alt",children:[o.jsxs("div",{className:"home-section-head",children:[o.jsx("div",{className:"page-eyebrow",children:"Simple process"}),o.jsx("h2",{className:"home-section-title",children:"How it works"})]}),o.jsx("div",{className:"home-steps",children:Rs.map((R,M)=>o.jsxs("div",{className:"home-step",children:[o.jsx("div",{className:"home-step-number",children:M+1}),o.jsx("h3",{children:R.title}),o.jsx("p",{children:R.desc}),M<Rs.length-1&&o.jsx("div",{className:"home-step-connector"})]},R.title))})]}),o.jsxs("section",{id:"doctors",className:"home-section",children:[o.jsxs("div",{className:"home-section-head",children:[o.jsx("div",{className:"page-eyebrow",children:"Meet the team"}),o.jsx("h2",{className:"home-section-title",children:"Our doctors"})]}),c&&o.jsx("div",{className:"home-status",children:"Loading doctors..."}),h&&o.jsx("div",{className:"home-error",children:h}),!c&&!h&&s.length===0&&o.jsx("div",{className:"home-status",children:"No doctors available."}),o.jsx("div",{className:"grid grid-3",children:s.map(R=>{const M=R.availability_status==="AVAILABLE",le=(R.name||"Doctor").replace(/^Dr\.\s*/i,"").split(" ").filter(Boolean).map(Fe=>Fe[0]).join("").slice(0,2).toUpperCase();return o.jsxs("div",{className:"doctor-card",children:[o.jsx("div",{className:"doctor-avatar",children:le}),o.jsx("h3",{children:R.name}),o.jsxs("p",{children:[R.specialization||"General Medicine",R.experience?` · ${R.experience}`:""]}),o.jsx("span",{className:`badge ${M?"badge-low":"badge-medium"}`,children:M?"Available":"Unavailable"})]},R.id)})})]}),o.jsxs("section",{id:"appointment",className:"home-appointment-section",children:[o.jsxs("div",{className:"home-section-head",children:[o.jsx("div",{className:"page-eyebrow",children:"Book your visit"}),o.jsx("h2",{className:"home-section-title",children:"Book an appointment"}),o.jsx("p",{className:"home-section-sub",children:"Choose a doctor, select your preferred date and time, and submit your appointment request."})]}),o.jsxs("div",{className:"appointment-layout",children:[o.jsx("div",{className:"appointment-form-card",children:o.jsx("form",{onSubmit:ee,children:o.jsxs("div",{className:"appointment-form-grid",children:[o.jsxs("div",{className:"appointment-field",children:[o.jsx("label",{htmlFor:"doctor_id",children:"Select Doctor"}),o.jsxs("select",{id:"doctor_id",name:"doctor_id",value:x.doctor_id,onChange:b,disabled:f||N.length===0,children:[o.jsx("option",{value:"",children:"Select Doctor"}),N.map(R=>o.jsxs("option",{value:R.id,children:[R.name," — ",R.specialization]},R.id))]})]}),o.jsxs("div",{className:"appointment-field",children:[o.jsx("label",{htmlFor:"appointment_date",children:"Appointment Date"}),o.jsx("input",{id:"appointment_date",type:"date",name:"appointment_date",value:x.appointment_date,min:P(),onChange:b,disabled:f})]}),o.jsxs("div",{className:"appointment-field",children:[o.jsx("label",{htmlFor:"appointment_time",children:"Appointment Time"}),o.jsx("input",{id:"appointment_time",type:"time",name:"appointment_time",value:x.appointment_time,onChange:b,disabled:f})]}),o.jsxs("div",{className:"appointment-field",children:[o.jsx("label",{htmlFor:"reason",children:"Reason for Visit"}),o.jsx("input",{id:"reason",type:"text",name:"reason",value:x.reason,onChange:b,placeholder:"e.g. Routine checkup",disabled:f})]}),S&&o.jsx("div",{className:"appointment-message appointment-message-error",children:S}),p&&o.jsx("div",{className:"appointment-message appointment-message-success",children:p}),o.jsx("button",{type:"submit",className:"btn btn-primary appointment-submit",disabled:f,children:f?"Booking...":"Book Appointment"})]})})}),o.jsxs("div",{className:"appointment-info-card",children:[o.jsx("h3",{children:"Why book with SmartCare?"}),o.jsx("p",{children:"Manage your hospital appointments directly through the SmartCare HMS platform."}),o.jsxs("div",{className:"appointment-info-list",children:[o.jsxs("div",{children:[o.jsx("span",{children:"✓"}),o.jsx("p",{children:"Choose from available doctors"})]}),o.jsxs("div",{children:[o.jsx("span",{children:"✓"}),o.jsx("p",{children:"Select your preferred date and time"})]}),o.jsxs("div",{children:[o.jsx("span",{children:"✓"}),o.jsx("p",{children:"Appointment is stored in the HMS database"})]}),o.jsxs("div",{children:[o.jsx("span",{children:"✓"}),o.jsx("p",{children:"View your appointment from your dashboard"})]}),o.jsxs("div",{children:[o.jsx("span",{children:"✓"}),o.jsx("p",{children:"AI-recommended appointments are also supported"})]})]}),!t&&o.jsxs("div",{className:"appointment-login-note",children:["Please ",o.jsx(Ke,{to:"/login",children:"log in"})," as a patient to book an appointment."]}),t&&n!=="PATIENT"&&o.jsx("div",{className:"appointment-login-note",children:"Appointment booking from this page is available for patient accounts."}),n==="PATIENT"&&k&&o.jsxs("div",{className:"appointment-patient-info",children:[o.jsx("strong",{children:"Booking for:"}),o.jsx("span",{children:k.name}),o.jsxs("small",{children:["Patient ID: ",k.id]})]})]})]})]}),o.jsxs("section",{id:"contact",className:"home-section home-section-alt",children:[o.jsxs("div",{className:"home-section-head",children:[o.jsx("div",{className:"page-eyebrow",children:"Get in touch"}),o.jsx("h2",{className:"home-section-title",children:"Contact us"})]}),o.jsxs("div",{className:"home-contact",children:[o.jsxs("div",{className:"home-contact-card",children:[o.jsx("div",{className:"home-contact-icon",children:"☎"}),o.jsx("strong",{children:"Phone"}),o.jsx("p",{children:"+91 8967333550"}),o.jsx("hr",{}),o.jsx("p",{children:"+91 8145508186"})]}),o.jsxs("div",{className:"home-contact-card",children:[o.jsx("div",{className:"home-contact-icon",children:"✉"}),o.jsx("strong",{children:"Email"}),o.jsx("p",{children:"smartcarehms@gmail.com"}),o.jsx("hr",{}),o.jsx("p",{children:"devsuman.in@gmail.com"})]}),o.jsxs("div",{className:"home-contact-card",children:[o.jsx("div",{className:"home-contact-icon",children:"⚲"}),o.jsx("strong",{children:"Address"}),o.jsx("p",{children:"SmartCare HMS"}),o.jsx("hr",{}),o.jsxs("p",{children:[" ","Haldia Institute of Technology, ICARE Complex, Haldia, Purba Medinipur, West Bengal, India."]})]})]})]}),o.jsxs("footer",{className:"home-footer",children:[o.jsxs("div",{className:"home-nav-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsx("span",{children:"© 2026 SmartCare HMS. Academic project — MCA 3rd semester."})]}),o.jsx("style",{children:`
        /* =====================================================
           GENERAL
        ===================================================== */

        .home-page {
          background: var(--color-bg);
        }

        .auth-mark {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        .home-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-line);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .home-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          color: var(--color-primary);
        }

        .home-nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .home-nav-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-ink-soft);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .home-nav-links a:hover {
          color: var(--color-primary);
        }

        .home-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .home-hero {
          background:
            var(--color-primary)
            url('/health-bg-pattern.svg')
            center / cover
            no-repeat;

          background-blend-mode: soft-light;

          position: relative;

          padding: 110px 40px 90px;

          display: flex;
          justify-content: center;

          overflow: hidden;
        }

        .home-hero::before {
          content: "";
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              160deg,
              rgba(15, 82, 87, 0.94),
              rgba(12, 68, 72, 0.97)
            );
        }

        .home-hero-text {
          position: relative;
          z-index: 1;

          max-width: 680px;

          text-align: center;

          color: white;
        }

        .home-hero-badge {
          display: inline-block;

          font-size: 12px;
          font-weight: 700;

          letter-spacing: 0.04em;

          background: rgba(255, 255, 255, 0.14);

          border: 1px solid rgba(255, 255, 255, 0.3);

          padding: 6px 16px;

          border-radius: 999px;

          margin-bottom: 22px;
        }

        .home-hero-text h1 {
          font-family: var(--font-display);

          font-size: 46px;

          font-weight: 800;

          line-height: 1.22;

          margin-bottom: 20px;
        }

        .home-hero-text h1 span {
          color: #a8e6d8;
        }

        .home-hero-text p {
          font-size: 16px;

          line-height: 1.65;

          color: rgba(255, 255, 255, 0.85);

          margin-bottom: 32px;

          max-width: 560px;

          margin-left: auto;
          margin-right: auto;
        }

        .home-hero-actions {
          display: flex;

          gap: 14px;

          justify-content: center;

          margin-bottom: 48px;
        }

        .btn-lg {
          padding: 13px 26px;
          font-size: 15px;
        }

        .btn-ghost {
          background: rgba(255, 255, 255, 0.12);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .home-hero-stats {
          display: flex;

          justify-content: center;

          gap: 48px;

          border-top: 1px solid rgba(255, 255, 255, 0.2);

          padding-top: 28px;
        }

        .home-hero-stats strong {
          display: block;

          font-family: var(--font-display);

          font-size: 26px;

          font-weight: 800;
        }

        .home-hero-stats span {
          font-size: 12px;

          color: rgba(255, 255, 255, 0.7);
        }

        /* =====================================================
           COMMON SECTIONS
        ===================================================== */

        .home-section {
          padding: 76px 40px;

          max-width: 1100px;

          margin: 0 auto;
        }

        .home-section-alt {
          background: var(--color-surface);

          max-width: none;
        }

        .home-section-alt > * {
          max-width: 1100px;

          margin-left: auto;
          margin-right: auto;
        }

        .home-section-head {
          text-align: center;

          margin-bottom: 44px;
        }

        .home-section-title {
          font-size: 30px;

          margin-top: 6px;

          margin-bottom: 10px;
        }

        .home-section-sub {
          font-size: 15px;

          color: var(--color-ink-soft);

          max-width: 500px;

          margin: 0 auto;

          line-height: 1.6;
        }

        /* =====================================================
           SERVICES
        ===================================================== */

        .service-card {
          background: var(--color-surface);

          border: 1px solid var(--color-line);

          border-radius: var(--radius-lg);

          box-shadow: var(--shadow-card);

          padding: 30px 24px;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 28px rgba(15, 82, 87, 0.14);
        }

        .service-icon {
          width: 52px;
          height: 52px;

          border-radius: 14px;

          background: var(--color-primary-soft);

          color: var(--color-primary);

          font-size: 24px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin: 0 auto 16px;
        }

        .service-card h3 {
          font-size: 17px;

          margin-bottom: 8px;
        }

        .service-card p {
          font-size: 14px;

          color: var(--color-ink-soft);

          line-height: 1.5;

          margin: 0;
        }

        /* =====================================================
           HOW IT WORKS
        ===================================================== */

        .home-steps {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 20px;
        }

        .home-step {
          text-align: center;

          position: relative;

          padding: 0 8px;
        }

        .home-step-number {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          background: var(--color-primary);

          color: white;

          font-weight: 800;

          font-family: var(--font-display);

          display: flex;

          align-items: center;
          justify-content: center;

          margin: 0 auto 14px;

          position: relative;

          z-index: 1;
        }

        .home-step h3 {
          font-size: 15px;

          margin-bottom: 6px;
        }

        .home-step p {
          font-size: 13px;

          color: var(--color-ink-soft);

          margin: 0;

          line-height: 1.5;
        }

        .home-step-connector {
          position: absolute;

          top: 19px;

          left: calc(50% + 30px);

          width: calc(100% - 20px);

          height: 2px;

          background: var(--color-line);
        }

        /* =====================================================
           DOCTORS
        ===================================================== */

        .doctor-card {
          background: var(--color-surface);

          border: 1px solid var(--color-line);

          border-radius: var(--radius-lg);

          box-shadow: var(--shadow-card);

          padding: 28px 20px;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .doctor-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 28px rgba(15, 82, 87, 0.14);
        }

        .doctor-avatar {
          width: 56px;
          height: 56px;

          border-radius: 50%;

          background: var(--color-primary);

          color: white;

          font-weight: 800;

          font-family: var(--font-display);

          font-size: 16px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin: 0 auto 14px;
        }

        .doctor-card h3 {
          font-size: 15px;

          margin-bottom: 4px;
        }

        .doctor-card p {
          font-size: 13px;

          color: var(--color-ink-soft);

          margin-bottom: 12px;
        }

        .home-status {
          text-align: center;

          padding: 20px;

          color: var(--color-ink-soft);
        }

        .home-error {
          max-width: 700px;

          margin: 0 auto 20px;

          padding: 12px 16px;

          border-radius: 8px;

          background: #fff1f1;

          color: #b42318;

          border: 1px solid #f3caca;

          font-size: 14px;

          text-align: center;
        }

        /* =====================================================
           MANUAL APPOINTMENT
        ===================================================== */

        .home-appointment-section {
          padding: 80px 40px;

          background: #dff6f7;
        }

        .appointment-layout {
          max-width: 1100px;

          margin: 0 auto;

          display: grid;

          grid-template-columns: 1.35fr 0.9fr;

          gap: 26px;

          align-items: start;
        }

        .appointment-form-card {
          background: white;

          border-radius: 14px;

          padding: 28px;

          box-shadow:
            0 8px 28px rgba(15, 82, 87, 0.1);

          border: 1px solid var(--color-line);
        }

        .appointment-form-grid {
          display: grid;

          grid-template-columns: repeat(2, 1fr);

          gap: 18px;
        }

        .appointment-field {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }

        .appointment-field label {
          font-size: 13px;

          font-weight: 600;

          color: var(--color-ink);
        }

        .appointment-field input,
        .appointment-field select {
          width: 100%;

          box-sizing: border-box;

          height: 44px;

          border: 1px solid var(--color-line);

          border-radius: 7px;

          background: white;

          padding: 0 12px;

          font-size: 13px;

          color: var(--color-ink);

          outline: none;
        }

        .appointment-field input:focus,
        .appointment-field select:focus {
          border-color: var(--color-primary);

          box-shadow:
            0 0 0 3px rgba(15, 82, 87, 0.08);
        }

        .appointment-field:nth-child(4) {
          grid-column: 1 / -1;
        }

        .appointment-message {
          grid-column: 1 / -1;

          padding: 12px 14px;

          border-radius: 8px;

          font-size: 13px;

          line-height: 1.5;
        }

        .appointment-message-error {
          background: #fff1f1;

          color: #b42318;

          border: 1px solid #f1c6c6;
        }

        .appointment-message-success {
          background: #edf9f3;

          color: #18794e;

          border: 1px solid #b9e4cc;
        }

        .appointment-submit {
          grid-column: 1 / -1;

          width: 100%;

          height: 44px;

          cursor: pointer;
        }

        .appointment-submit:disabled {
          opacity: 0.65;

          cursor: not-allowed;
        }

        .appointment-info-card {
          background: #f8fbff;

          border: 1px solid var(--color-line);

          border-radius: 14px;

          padding: 30px;

          box-shadow:
            0 8px 28px rgba(15, 82, 87, 0.08);
        }

        .appointment-info-card h3 {
          color: #006dcc;

          font-size: 22px;

          margin-bottom: 12px;
        }

        .appointment-info-card > p {
          color: var(--color-ink-soft);

          font-size: 14px;

          line-height: 1.6;

          margin-bottom: 22px;
        }

        .appointment-info-list {
          display: flex;

          flex-direction: column;

          gap: 13px;
        }

        .appointment-info-list div {
          display: flex;

          gap: 10px;

          align-items: flex-start;
        }

        .appointment-info-list span {
          color: var(--color-primary);

          font-weight: 800;

          font-size: 15px;
        }

        .appointment-info-list p {
          margin: 0;

          font-size: 13px;

          color: var(--color-ink-soft);

          line-height: 1.4;
        }

        .appointment-login-note {
          margin-top: 22px;

          padding: 12px 14px;

          background: var(--color-primary-soft);

          border-radius: 8px;

          color: var(--color-ink-soft);

          font-size: 13px;

          line-height: 1.5;
        }

        .appointment-login-note a {
          color: var(--color-primary);

          font-weight: 700;
        }

        .appointment-patient-info {
          margin-top: 20px;

          padding: 14px;

          border-radius: 8px;

          background: #eef8f8;

          display: flex;

          flex-direction: column;

          gap: 4px;

          font-size: 13px;
        }

        .appointment-patient-info strong {
          color: var(--color-primary);
        }

        .appointment-patient-info span {
          font-weight: 700;

          color: var(--color-ink);
        }

        .appointment-patient-info small {
          color: var(--color-ink-soft);
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .home-contact {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 24px;
        }

        .home-contact-card {
          text-align: center;

          background: var(--color-bg);

          border: 1px solid var(--color-line);

          border-radius: var(--radius-md);

          padding: 28px 20px;
        }

        .home-contact-icon {
          width: 44px;
          height: 44px;

          border-radius: 50%;

          background: var(--color-primary-soft);

          color: var(--color-primary);

          font-size: 18px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin: 0 auto 12px;
        }

        .home-contact-card strong {
          display: block;

          font-size: 13px;

          color: var(--color-primary);

          margin-bottom: 6px;
        }

        .home-contact-card p {
          font-size: 14px;

          color: var(--color-ink-soft);

          margin: 0;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .home-footer {
          padding: 32px 40px;

          text-align: center;

          font-size: 13px;

          color: var(--color-ink-soft);

          border-top: 1px solid var(--color-line);

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 10px;
        }

        .home-footer .home-nav-brand {
          justify-content: center;
        }

        /* =====================================================
           PROFILE
        ===================================================== */

        .profile-menu {
          position: relative;
        }

        .profile-button {
          width: 40px;
          height: 40px;

          border: 1px solid var(--color-line);

          border-radius: 50%;

          background: white;

          cursor: pointer;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 0;
        }

        .profile-icon {
          width: 32px;
          height: 32px;

          border-radius: 50%;

          background: var(--color-primary);

          color: white;

          display: flex;

          align-items: center;
          justify-content: center;

          font-weight: 800;

          font-size: 14px;
        }

        .profile-dropdown {
          position: absolute;

          top: calc(100% + 10px);

          right: 0;

          width: 190px;

          background: white;

          border: 1px solid var(--color-line);

          border-radius: 12px;

          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.12);

          padding: 10px;

          z-index: 2000;
        }

        .profile-info {
          display: flex;

          flex-direction: column;

          gap: 3px;

          padding: 10px;

          border-bottom: 1px solid var(--color-line);

          margin-bottom: 6px;
        }

        .profile-info strong {
          font-size: 14px;

          color: var(--color-ink);
        }

        .profile-info span {
          font-size: 11px;

          color: var(--color-ink-soft);
        }

        .profile-dropdown button {
          width: 100%;

          border: 0;

          background: transparent;

          padding: 10px;

          text-align: left;

          border-radius: 8px;

          cursor: pointer;

          font-size: 13px;
        }

        .profile-dropdown button:hover {
          background: var(--color-primary-soft);

          color: var(--color-primary);
        }

        /* =====================================================
           HAMBURGER
        ===================================================== */

        .hamburger-button {
          display: none;

          width: 40px;
          height: 40px;

          border: 1px solid var(--color-line);

          border-radius: 8px;

          background: white;

          cursor: pointer;

          padding: 8px;

          flex-direction: column;

          justify-content: center;

          gap: 5px;
        }

        .hamburger-button span {
          display: block;

          width: 100%;

          height: 2px;

          background: var(--color-primary);

          border-radius: 2px;
        }

        .mobile-dashboard-link {
          display: none;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 860px) {
          .home-nav {
            padding: 14px 20px;

            position: relative;
          }

          .home-nav-actions {
            display: flex;

            align-items: center;

            gap: 8px;
          }

          /* Hide desktop Login/Register */
          .home-nav-actions > .btn {
            display: none;
          }

          /* Show hamburger */
          .hamburger-button {
            display: flex;
          }

          /* Mobile menu */
          .home-nav-links {
            display: none;

            position: absolute;

            top: 100%;

            left: 0;

            right: 0;

            flex-direction: column;

            gap: 0;

            background: white;

            border-bottom: 1px solid var(--color-line);

            box-shadow:
              0 8px 20px rgba(0, 0, 0, 0.08);

            padding: 10px 20px;
          }

          .home-nav-links.home-nav-links-open {
            display: flex;
          }

          .home-nav-links a,
          .home-nav-links button {
            width: 100%;

            padding: 14px 4px;

            border-bottom: 1px solid var(--color-line);

            text-align: left;
          }

          .home-nav-links .mobile-dashboard-link {
            display: block;

            border: 0;

            background: transparent;

            color: var(--color-ink-soft);

            font-size: 14px;

            font-weight: 600;

            cursor: pointer;
          }

          /* Profile stays visible */
          .profile-menu {
            display: block;
          }

          /* Hero */
          .home-hero {
            padding: 80px 24px 60px;
          }

          .home-hero-text h1 {
            font-size: 30px;
          }

          .home-hero-stats {
            gap: 28px;

            flex-wrap: wrap;
          }

          /* Steps */
          .home-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .home-step-connector {
            display: none;
          }

          /* Appointment */
          .home-appointment-section {
            padding: 60px 20px;
          }

          .appointment-layout {
            grid-template-columns: 1fr;
          }

          .appointment-form-grid {
            grid-template-columns: 1fr;
          }

          .appointment-field:nth-child(4) {
            grid-column: auto;
          }

          .appointment-message {
            grid-column: auto;
          }

          .appointment-submit {
            grid-column: auto;
          }

          /* Contact */
          .home-contact {
            grid-template-columns: 1fr;
          }

          .home-section {
            padding: 48px 20px;
          }
        }

        @media (max-width: 560px) {
          .home-nav {
            padding: 12px 14px;
          }

          .home-nav-brand {
            font-size: 14px;
          }

          .auth-mark {
            width: 24px;
            height: 24px;
          }

          .profile-button {
            width: 38px;
            height: 38px;
          }

          .profile-icon {
            width: 30px;
            height: 30px;
          }

          .hamburger-button {
            width: 38px;
            height: 38px;
          }

          .home-hero {
            padding: 65px 18px 50px;
          }

          .home-hero-text h1 {
            font-size: 27px;
          }

          .home-hero-text p {
            font-size: 14px;
          }

          .home-hero-actions {
            flex-direction: column;
          }

          .home-hero-actions .btn {
            width: 100%;
          }

          .home-hero-stats {
            gap: 20px;
          }

          .home-steps {
            grid-template-columns: 1fr;
          }

          .appointment-form-card,
          .appointment-info-card {
            padding: 20px;
          }

          .home-footer {
            padding: 26px 18px;
          }
        }
      `})]})}function rm(){const e=_n(),[t,n]=y.useState({email:"",password:""}),[r,l]=y.useState(""),[i,a]=y.useState(!1),s=c=>{n({...t,[c.target.name]:c.target.value})},u=async c=>{if(c.preventDefault(),l(""),!t.email||!t.password){l("Please fill in both fields.");return}a(!0);try{const m=await Gh({email:t.email,password:t.password});Yh({token:m.token,user:m.user});const h=m.user.role;e(h==="ADMIN"?"/admin/dashboard":h==="DOCTOR"?"/doctor/dashboard":"/patient/dashboard")}catch(m){l(m.message||"Login failed. Please try again.")}finally{a(!1)}};return o.jsxs("div",{className:"auth-page",children:[o.jsxs("div",{className:"auth-panel",children:[o.jsxs("div",{className:"auth-panel-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsxs("div",{className:"auth-panel-copy",children:[o.jsx("h2",{children:"AI-assisted care, matched to the right specialist."}),o.jsx("p",{children:"Submit your health profile and get connected with a doctor suited to your needs — faster, and with more clarity."})]}),o.jsxs("div",{className:"auth-panel-stats",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"3"}),o.jsx("span",{children:"Conditions screened"})]}),o.jsxs("div",{children:[o.jsx("strong",{children:"24/7"}),o.jsx("span",{children:"Appointment booking"})]})]})]}),o.jsx("div",{className:"auth-form-side",children:o.jsxs("div",{className:"auth-card",children:[o.jsxs("div",{className:"auth-mobile-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsx("h1",{className:"page-title",children:"Welcome back"}),o.jsx("p",{className:"page-subtitle",children:"Log in to continue to your dashboard."}),o.jsxs("form",{onSubmit:u,children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"email",children:"Email"}),o.jsx("input",{id:"email",name:"email",type:"email",placeholder:"you@example.com",value:t.email,onChange:s})]}),o.jsxs("div",{className:"form-row",children:[o.jsxs("div",{className:"auth-label-row",children:[o.jsx("label",{htmlFor:"password",children:"Password"}),o.jsx("a",{href:"#",className:"auth-forgot",children:"Forgot password?"})]}),o.jsx("input",{id:"password",name:"password",type:"password",placeholder:"••••••••",value:t.password,onChange:s})]}),r&&o.jsx("p",{className:"auth-error",children:r}),o.jsx("button",{type:"submit",className:"btn btn-primary auth-submit",disabled:i,children:i?"Logging in...":"Log in"})]}),o.jsxs("p",{className:"auth-footer-text",children:["Don't have an account? ",o.jsx(Ke,{to:"/register",children:"Register here"})]})]})}),o.jsx("style",{children:`
        .auth-page {
          min-height: 100vh;
          display: flex;
        }

        .auth-panel {
          flex: 1;
          max-width: 480px;
          background: var(--color-primary) url('/health-bg-pattern.svg') center / cover no-repeat;
          background-blend-mode: soft-light;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 40px;
          position: relative;
        }
        .auth-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,82,87,0.92), rgba(12,68,72,0.96));
        }
        .auth-panel > * { position: relative; z-index: 1; }

        .auth-panel-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
        }
        .auth-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: white;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        .auth-panel-copy h2 {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 14px;
          max-width: 360px;
        }
        .auth-panel-copy p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.82);
          max-width: 340px;
          margin: 0;
        }

        .auth-panel-stats {
          display: flex;
          gap: 32px;
          border-top: 1px solid rgba(255,255,255,0.18);
          padding-top: 22px;
        }
        .auth-panel-stats strong {
          display: block;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
        }
        .auth-panel-stats span {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        .auth-form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg) url('/health-bg-pattern.svg') center / cover no-repeat;
          padding: 20px;
          position: relative;
        }
        .auth-form-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(245, 248, 247, 0.55);
        }
        .auth-form-side .auth-card {
          position: relative;
          z-index: 1;
        }

        .auth-card {
          width: 100%;
          max-width: 380px;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 40px 36px;
        }
        .auth-mobile-brand { display: none; }

        .auth-page .page-title { font-size: 24px; margin-bottom: 4px; }
        .auth-page .page-subtitle { margin-bottom: 26px; }

        .auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .auth-forgot {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
        }
        .auth-forgot:hover { text-decoration: underline; }

        .auth-submit { width: 100%; margin-top: 8px; }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .auth-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 12px;
        }

        .auth-footer-text {
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          margin-top: 22px;
        }
        .auth-footer-text a {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
        }
        .auth-footer-text a:hover { text-decoration: underline; }

        @media (max-width: 860px) {
          .auth-panel { display: none; }
          .auth-mobile-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 16px;
            color: var(--color-primary);
            margin-bottom: 22px;
          }
          .auth-mobile-brand .auth-mark {
            background: var(--color-primary);
            color: white;
          }
        }
      `})]})}function lm(){const e=_n(),[t,n]=y.useState({name:"",email:"",password:"",confirmPassword:"",role:"patient"}),[r,l]=y.useState(""),[i,a]=y.useState(!1),s=c=>{n({...t,[c.target.name]:c.target.value})},u=async c=>{if(c.preventDefault(),l(""),!t.name||!t.email||!t.password||!t.confirmPassword){l("Please fill in all fields.");return}if(t.password!==t.confirmPassword){l("Passwords do not match.");return}a(!0);try{await Kh({username:t.name,email:t.email,password:t.password,role:t.role.toUpperCase()}),e("/login")}catch(m){l(m.message||"Registration failed. Please try again.")}finally{a(!1)}};return o.jsxs("div",{className:"auth-page",children:[o.jsxs("div",{className:"auth-panel",children:[o.jsxs("div",{className:"auth-panel-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsxs("div",{className:"auth-panel-copy",children:[o.jsx("h2",{children:"Join a smarter way to connect with the right care."}),o.jsx("p",{children:"Register as a patient to get AI-assisted risk screening, or as a doctor to manage your matched patients — all in one place."})]}),o.jsxs("div",{className:"auth-panel-stats",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"3"}),o.jsx("span",{children:"Conditions screened"})]}),o.jsxs("div",{children:[o.jsx("strong",{children:"24/7"}),o.jsx("span",{children:"Appointment booking"})]})]})]}),o.jsx("div",{className:"auth-form-side",children:o.jsxs("div",{className:"auth-card",children:[o.jsxs("div",{className:"auth-mobile-brand",children:[o.jsx("span",{className:"auth-mark",children:"+"}),o.jsx("span",{children:"SmartCare HMS"})]}),o.jsx("h1",{className:"page-title",children:"Create your account"}),o.jsx("p",{className:"page-subtitle",children:"Register to get started with SmartCare."}),o.jsxs("form",{onSubmit:u,children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"name",children:"Full name"}),o.jsx("input",{id:"name",name:"name",type:"text",placeholder:"Your full name",value:t.name,onChange:s})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"email",children:"Email"}),o.jsx("input",{id:"email",name:"email",type:"email",placeholder:"you@example.com",value:t.email,onChange:s})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"role",children:"Register as"}),o.jsxs("select",{id:"role",name:"role",value:t.role,onChange:s,children:[o.jsx("option",{value:"patient",children:"Patient"}),o.jsx("option",{value:"doctor",children:"Doctor"})]})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"password",children:"Password"}),o.jsx("input",{id:"password",name:"password",type:"password",placeholder:"••••••••",value:t.password,onChange:s})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"confirmPassword",children:"Confirm password"}),o.jsx("input",{id:"confirmPassword",name:"confirmPassword",type:"password",placeholder:"••••••••",value:t.confirmPassword,onChange:s})]}),r&&o.jsx("p",{className:"auth-error",children:r}),o.jsx("button",{type:"submit",className:"btn btn-primary auth-submit",disabled:i,children:i?"Creating account...":"Create account"})]}),o.jsxs("p",{className:"auth-footer-text",children:["Already have an account? ",o.jsx(Ke,{to:"/login",children:"Log in here"})]})]})}),o.jsx("style",{children:`
        .auth-page {
          min-height: 100vh;
          display: flex;
        }

        .auth-panel {
          flex: 1;
          max-width: 480px;
          background: var(--color-primary) url('/health-bg-pattern.svg') center / cover no-repeat;
          background-blend-mode: soft-light;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 40px;
          position: relative;
        }
        .auth-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,82,87,0.92), rgba(12,68,72,0.96));
        }
        .auth-panel > * { position: relative; z-index: 1; }

        .auth-panel-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
        }
        .auth-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: white;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        .auth-panel-copy h2 {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 14px;
          max-width: 360px;
        }
        .auth-panel-copy p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.82);
          max-width: 340px;
          margin: 0;
        }

        .auth-panel-stats {
          display: flex;
          gap: 32px;
          border-top: 1px solid rgba(255,255,255,0.18);
          padding-top: 22px;
        }
        .auth-panel-stats strong {
          display: block;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
        }
        .auth-panel-stats span {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        .auth-form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg) url('/health-bg-pattern.svg') center / cover no-repeat;
          padding: 20px;
          position: relative;
        }
        .auth-form-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(245, 248, 247, 0.55);
        }
        .auth-form-side .auth-card {
          position: relative;
          z-index: 1;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 40px 36px;
        }
        .auth-mobile-brand { display: none; }

        .auth-page .page-title { font-size: 24px; margin-bottom: 4px; }
        .auth-page .page-subtitle { margin-bottom: 26px; }

        .auth-submit { width: 100%; margin-top: 8px; }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .auth-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 12px;
        }

        .auth-footer-text {
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          margin-top: 22px;
        }
        .auth-footer-text a {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
        }
        .auth-footer-text a:hover { text-decoration: underline; }

        @media (max-width: 860px) {
          .auth-panel { display: none; }
          .auth-mobile-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 16px;
            color: var(--color-primary);
            margin-bottom: 22px;
          }
          .auth-mobile-brand .auth-mark {
            background: var(--color-primary);
            color: white;
          }
        }
      `})]})}const im=["Fatigue","Frequent urination","Excessive thirst","Chest pain","Shortness of breath","Swelling in legs/ankles","Nausea","Blurred vision"];function om(){const e=_n(),[t,n]=y.useState({age:"",height:"",weight:"",bpSys:"",bpDia:"",glucose:"",smoking:"no",familyHistory:"no",symptoms:[]}),[r,l]=y.useState(""),i=u=>{n({...t,[u.target.name]:u.target.value})},a=u=>{n(c=>{const m=c.symptoms.includes(u);return{...c,symptoms:m?c.symptoms.filter(h=>h!==u):[...c.symptoms,u]}})},s=u=>{if(u.preventDefault(),l(""),!t.age||!t.height||!t.weight||!t.bpSys||!t.bpDia||!t.glucose){l("Please fill in all vitals fields.");return}console.log("Health profile submitted:",t),e("/patient/dashboard")};return o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Patient"}),o.jsx("h1",{className:"page-title",children:"Health Profile"}),o.jsx("p",{className:"page-subtitle",children:"Fill in your vitals and symptoms — our AI model will predict your risk and match you with the right doctor."})]}),o.jsxs("form",{onSubmit:s,children:[o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsx("h3",{style:{marginBottom:16},children:"Basic Vitals"}),o.jsxs("div",{className:"grid grid-3",children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"age",children:"Age"}),o.jsx("input",{id:"age",name:"age",type:"number",placeholder:"e.g. 34",value:t.age,onChange:i})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"height",children:"Height (cm)"}),o.jsx("input",{id:"height",name:"height",type:"number",placeholder:"e.g. 170",value:t.height,onChange:i})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"weight",children:"Weight (kg)"}),o.jsx("input",{id:"weight",name:"weight",type:"number",placeholder:"e.g. 78",value:t.weight,onChange:i})]})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsx("h3",{style:{marginBottom:16},children:"Clinical Readings"}),o.jsxs("div",{className:"grid grid-3",children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"bpSys",children:"BP — Systolic"}),o.jsx("input",{id:"bpSys",name:"bpSys",type:"number",placeholder:"e.g. 130",value:t.bpSys,onChange:i})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"bpDia",children:"BP — Diastolic"}),o.jsx("input",{id:"bpDia",name:"bpDia",type:"number",placeholder:"e.g. 85",value:t.bpDia,onChange:i})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"glucose",children:"Glucose (mg/dL)"}),o.jsx("input",{id:"glucose",name:"glucose",type:"number",placeholder:"e.g. 110",value:t.glucose,onChange:i})]})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsx("h3",{style:{marginBottom:16},children:"Habits & Family History"}),o.jsxs("div",{className:"grid grid-2",children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"smoking",children:"Do you smoke?"}),o.jsxs("select",{id:"smoking",name:"smoking",value:t.smoking,onChange:i,children:[o.jsx("option",{value:"no",children:"No"}),o.jsx("option",{value:"yes",children:"Yes"})]})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"familyHistory",children:"Family history of chronic illness?"}),o.jsxs("select",{id:"familyHistory",name:"familyHistory",value:t.familyHistory,onChange:i,children:[o.jsx("option",{value:"no",children:"No"}),o.jsx("option",{value:"yes",children:"Yes"})]})]})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsx("h3",{style:{marginBottom:6},children:"Symptoms"}),o.jsx("p",{style:{fontSize:13,color:"var(--color-ink-soft)",marginBottom:16},children:"Select any symptoms you're currently experiencing."}),o.jsx("div",{className:"symptom-grid",children:im.map(u=>{const c=t.symptoms.includes(u);return o.jsx("button",{type:"button",onClick:()=>a(u),className:c?"symptom-chip symptom-chip-active":"symptom-chip",children:u},u)})})]}),r&&o.jsx("p",{className:"auth-error",style:{marginBottom:16},children:r}),o.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit & Get AI Assessment"})]}),o.jsx("style",{children:`
        .symptom-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .symptom-chip {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-ink-soft);
          cursor: pointer;
        }
        .symptom-chip:hover {
          border-color: var(--color-primary);
        }
        .symptom-chip-active {
          background: var(--color-primary-soft);
          border-color: var(--color-primary);
          color: var(--color-primary);
          font-weight: 700;
        }
      `})]})}function am(){const[e,t]=y.useState(null),[n,r]=y.useState(!0),[l,i]=y.useState(""),[a,s]=y.useState(null),[u,c]=y.useState(!0),[m,h]=y.useState(""),[g,k]=y.useState(null),[w,x]=y.useState(!0),[C,f]=y.useState(""),[d,p]=y.useState([]),[v,S]=y.useState(!0),[E,P]=y.useState([]),[T,A]=y.useState(!1),[b,ee]=y.useState({date:"",time:""}),[N,H]=y.useState("");y.useEffect(()=>{(async()=>{try{r(!0),i("");const D=await ld();t(D.patient)}catch(D){console.error("Failed to load patient profile:",D),i(D.message||"Failed to load patient profile")}finally{r(!1)}})()},[]),y.useEffect(()=>{async function _(){if(e!=null&&e.id)try{const B=((await Zh(e.id)).appointments||[]).map(Z=>({id:Z.id,appointment_code:Z.appointment_code,doctor:Z.doctor_name,specialization:Z.specialization,date:Z.appointment_date?String(Z.appointment_date).slice(0,10):"",time:Z.appointment_time,status:Z.status}));P(B)}catch(D){console.error("Failed to load appointments:",D)}}_()},[e]),y.useEffect(()=>{async function _(){try{const D=await Xh();s(D.vitals)}catch(D){h(D.message||"Failed to load vitals.")}finally{c(!1)}}_()},[]),y.useEffect(()=>{async function _(){try{const D=await Jh(),B=D.predictions&&D.predictions.length>0?D.predictions[0]:null;k(B)}catch(D){f(D.message||"Failed to load AI prediction.")}finally{x(!1)}}_()},[]),y.useEffect(()=>{async function _(){try{const D=await id();p(D.doctors||[])}catch(D){console.error("Failed to load doctors:",D)}finally{S(!1)}}_()},[]);function R(_){if(!_)return null;const D=(_.disease_type||_.prediction_result||"").toLowerCase();return D.includes("heart")?"Cardiology":D.includes("diabetes")?"Endocrinology":D.includes("kidney")?"Nephrology":null}function M(_,D){const B=R(_),Z=D.filter(ce=>ce.availability_status==="AVAILABLE");if(B){const ce=Z.find(Rt=>Rt.specialization===B);if(ce)return ce}return Z.find(ce=>ce.specialization==="General Medicine")||null}const le=M(g,d),Fe=_=>{if(!_)return"";const[D,B]=_.split(":"),Z=Number(D),ce=Z>=12?"PM":"AM",Rt=Z%12||12;return`${String(Rt).padStart(2,"0")}:${B} ${ce}`},z=_=>{ee({...b,[_.target.name]:_.target.value})},O=async _=>{if(_.preventDefault(),H(""),!b.date||!b.time){H("Please select both a date and a time.");return}if(!le){H("No matched doctor available to book with.");return}try{const D=`APT-${Date.now()}`;await od({appointment_code:D,patient_id:e.id,doctor_id:le.id,appointment_date:b.date,appointment_time:b.time,reason:"AI-recommended doctor appointment"});const B={id:D,doctor:le.name,specialization:le.specialization,date:b.date,time:b.time,status:"Pending"};P(Z=>[B,...Z]),A(!1),ee({date:"",time:""})}catch(D){console.error("Failed to book appointment:",D),H(D.message||"Failed to book appointment.")}};return n?o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Patient"}),o.jsx("h1",{className:"page-title",children:"Loading..."}),o.jsx("p",{className:"page-subtitle",children:"Loading your patient profile."})]}),o.jsx("div",{className:"card",children:o.jsx("p",{style:{color:"var(--color-ink-soft)"},children:"Please wait..."})})]}):l?o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Patient"}),o.jsx("h1",{className:"page-title",children:"Unable to load profile"}),o.jsx("p",{className:"page-subtitle",children:"We could not load your patient information."})]}),o.jsx("div",{className:"card",children:o.jsx("p",{className:"auth-error",children:l})})]}):e?o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Patient"}),o.jsxs("h1",{className:"page-title",children:["Welcome, ",e.name.split(" ")[0]]}),o.jsx("p",{className:"page-subtitle",children:"Here's an overview of your health profile and upcoming appointments."})]}),o.jsxs("div",{className:"grid grid-2",style:{marginBottom:20},children:[o.jsxs("div",{className:"card",children:[o.jsx("h3",{style:{marginBottom:12},children:"AI Health Assessment"}),w?o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"Loading AI assessment..."}):C?o.jsx("p",{className:"auth-error",children:C}):g?o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[o.jsxs("span",{className:`badge ${Number(g.risk_percentage)>=70?"badge-high":Number(g.risk_percentage)>=40?"badge-medium":"badge-low"}`,children:[Number(g.risk_percentage)>=70?"HIGH":Number(g.risk_percentage)>=40?"MEDIUM":"LOW"," ","RISK"]}),o.jsxs("span",{style:{fontSize:14,color:"var(--color-ink-soft)"},children:[Number(g.risk_percentage),"% risk score"]})]}),o.jsxs("p",{style:{fontSize:15,marginBottom:4},children:["Predicted condition:"," ",o.jsx("strong",{children:g.prediction_result})]}),o.jsx("p",{style:{fontSize:13,color:"var(--color-ink-soft)"},children:"Based on your submitted vitals and symptoms."})]}):o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"No AI assessment yet. Submit your health profile to get one."})]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{style:{marginBottom:12},children:"Matched Doctor"}),v||w?o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"Finding your matched doctor..."}):le?o.jsxs(o.Fragment,{children:[o.jsx("p",{style:{fontSize:15,marginBottom:4},children:o.jsx("strong",{children:le.name})}),o.jsxs("p",{style:{fontSize:14,color:"var(--color-ink-soft)",marginBottom:14},children:[le.specialization," ·"," ",le.experience_years," years experience"]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[o.jsx("span",{className:"badge badge-low",children:"Available"}),!T&&o.jsx("button",{className:"btn btn-primary",onClick:()=>A(!0),children:"Book Appointment"})]})]}):o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"No available doctor found right now."}),T&&o.jsxs("form",{onSubmit:O,className:"booking-form",children:[o.jsxs("div",{className:"grid grid-2",children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"date",children:"Date"}),o.jsx("input",{id:"date",name:"date",type:"date",value:b.date,onChange:z})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"time",children:"Time"}),o.jsx("input",{id:"time",name:"time",type:"time",value:b.time,onChange:z})]})]}),N&&o.jsx("p",{className:"auth-error",children:N}),o.jsxs("div",{style:{display:"flex",gap:10},children:[o.jsx("button",{type:"submit",className:"btn btn-primary",children:"Confirm Booking"}),o.jsx("button",{type:"button",className:"btn btn-outline",onClick:()=>{A(!1),H("")},children:"Cancel"})]})]})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsx("h3",{style:{marginBottom:16},children:"Health Vitals"}),u?o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"Loading vitals..."}):m?o.jsx("p",{className:"auth-error",children:m}):a?o.jsxs("div",{className:"grid grid-3",children:[o.jsxs("div",{children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:4},children:"BMI"}),o.jsx("p",{style:{fontSize:20,fontWeight:700},children:Number(a.bmi)})]}),o.jsxs("div",{children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:4},children:"Blood Pressure"}),o.jsxs("p",{style:{fontSize:20,fontWeight:700},children:[Number(a.blood_pressure_systolic),"/",Number(a.blood_pressure_diastolic)]})]}),o.jsxs("div",{children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:4},children:"Glucose"}),o.jsxs("p",{style:{fontSize:20,fontWeight:700},children:[Number(a.blood_glucose)," mg/dL"]})]})]}):o.jsx("p",{style:{color:"var(--color-ink-soft)",fontSize:14},children:"No vitals submitted yet."})]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{style:{marginBottom:16},children:"Appointments"}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Doctor"}),o.jsx("th",{children:"Specialization"}),o.jsx("th",{children:"Date"}),o.jsx("th",{children:"Time"}),o.jsx("th",{children:"Status"})]})}),o.jsx("tbody",{children:E.map(_=>o.jsxs("tr",{children:[o.jsx("td",{children:_.doctor}),o.jsx("td",{children:_.specialization}),o.jsx("td",{children:_.date}),o.jsx("td",{children:Fe(_.time)}),o.jsx("td",{children:o.jsx("span",{className:`badge ${_.status==="Completed"?"badge-low":"badge-medium"}`,children:_.status})})]},_.id))})]})]}),o.jsx("style",{children:`
        .booking-form {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-line);
        }
      `})]}):o.jsx("div",{children:o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Patient"}),o.jsx("h1",{className:"page-title",children:"Patient profile not found"}),o.jsx("p",{className:"page-subtitle",children:"No patient profile is associated with your account."})]})})}const Ar={name:"Dr. Anita Verma",specialization:"Endocrinologist",experience:"9 years"},sm=[{id:1,name:"Rahul Sharma",age:34,gender:"Male",predictedDisease:"Diabetes",riskPercentage:62,riskLevel:"medium",lastVisit:"2026-07-15",status:"Pending"},{id:2,name:"Priya Nair",age:51,gender:"Female",predictedDisease:"Diabetes",riskPercentage:84,riskLevel:"high",lastVisit:"2026-07-20",status:"Pending"},{id:3,name:"Sanjay Gupta",age:28,gender:"Male",predictedDisease:"Diabetes",riskPercentage:22,riskLevel:"low",lastVisit:"2026-07-10",status:"Completed"}],um=[{id:1,name:"Dr. Anita Verma",specialization:"Endocrinologist",qualification:"MD, DM Endocrinology",experience:"9 years",fee:600,available:!0},{id:2,name:"Dr. Rohan Das",specialization:"General Physician",qualification:"MBBS, MD",experience:"5 years",fee:400,available:!0},{id:3,name:"Dr. Meera Iyer",specialization:"Cardiologist",qualification:"MD, DM Cardiology",experience:"12 years",fee:800,available:!1},{id:4,name:"Dr. Kabir Khan",specialization:"Nephrologist",qualification:"MD, DM Nephrology",experience:"7 years",fee:700,available:!0}],gi=[{id:1,name:"Rahul Sharma",predictedDisease:"Diabetes",riskLevel:"medium",riskPercentage:62},{id:2,name:"Priya Nair",predictedDisease:"Diabetes",riskLevel:"high",riskPercentage:84},{id:3,name:"Sanjay Gupta",predictedDisease:"Diabetes",riskLevel:"low",riskPercentage:22},{id:4,name:"Fatima Sheikh",predictedDisease:"Heart Disease",riskLevel:"high",riskPercentage:91},{id:5,name:"Arjun Menon",predictedDisease:"Kidney Disease",riskLevel:"medium",riskPercentage:58}],cm=[{id:1,patient:"Rahul Sharma",doctor:"Dr. Anita Verma",specialization:"Endocrinologist",date:"2026-07-29",time:"10:30 AM",status:"Pending"},{id:2,patient:"Rahul Sharma",doctor:"Dr. Rohan Das",specialization:"General Physician",date:"2026-07-15",time:"4:00 PM",status:"Completed"},{id:3,patient:"Priya Nair",doctor:"Dr. Anita Verma",specialization:"Endocrinologist",date:"2026-07-20",time:"11:00 AM",status:"Pending"},{id:4,patient:"Fatima Sheikh",doctor:"Dr. Meera Iyer",specialization:"Cardiologist",date:"2026-07-18",time:"3:30 PM",status:"Cancelled"}];function dm(){const[e,t]=y.useState(sm),n=i=>{t(a=>a.map(s=>s.id===i?{...s,status:"Completed"}:s))},r=e.filter(i=>i.status==="Pending").length,l=e.filter(i=>i.riskLevel==="high").length;return o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Doctor"}),o.jsxs("h1",{className:"page-title",children:["Welcome, ",Ar.name]}),o.jsxs("p",{className:"page-subtitle",children:[Ar.specialization," · ",Ar.experience," experience"]})]}),o.jsxs("div",{className:"grid grid-3",style:{marginBottom:20},children:[o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"Total Patients"}),o.jsx("p",{style:{fontSize:26,fontWeight:800},children:e.length})]}),o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"Pending Appointments"}),o.jsx("p",{style:{fontSize:26,fontWeight:800},children:r})]}),o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"High-Risk Patients"}),o.jsx("p",{style:{fontSize:26,fontWeight:800,color:"var(--color-danger)"},children:l})]})]}),o.jsxs("div",{className:"card",children:[o.jsxs("h3",{style:{marginBottom:16},children:["Patients matching your specialization (",Ar.specialization,")"]}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Patient"}),o.jsx("th",{children:"Age / Gender"}),o.jsx("th",{children:"Predicted Condition"}),o.jsx("th",{children:"Risk"}),o.jsx("th",{children:"Last Visit"}),o.jsx("th",{children:"Status"}),o.jsx("th",{})]})}),o.jsx("tbody",{children:e.map(i=>o.jsxs("tr",{children:[o.jsx("td",{children:i.name}),o.jsxs("td",{children:[i.age," / ",i.gender]}),o.jsx("td",{children:i.predictedDisease}),o.jsx("td",{children:o.jsxs("span",{className:`badge badge-${i.riskLevel}`,children:[i.riskPercentage,"%"]})}),o.jsx("td",{children:i.lastVisit}),o.jsx("td",{children:o.jsx("span",{className:`badge ${i.status==="Completed"?"badge-low":"badge-medium"}`,children:i.status})}),o.jsx("td",{children:i.status==="Pending"&&o.jsx("button",{className:"btn btn-outline",style:{padding:"6px 12px",fontSize:12},onClick:()=>n(i.id),children:"Mark Completed"})})]},i.id))})]})]})]})}const vi={name:"",specialization:"",qualification:"",experience:"",fee:"",available:!0},fm=["All","Pending","Completed","Cancelled"];function pm(){const[e,t]=y.useState(um),[n,r]=y.useState(!1),[l,i]=y.useState(null),[a,s]=y.useState(vi),[u,c]=y.useState(""),[m,h]=y.useState(cm),[g,k]=y.useState("All"),[w,x]=y.useState(""),C=gi.filter(N=>N.riskLevel==="high"),f=g==="All"?m:m.filter(N=>N.status===g),d=gi.filter(N=>N.name.toLowerCase().includes(w.toLowerCase())),p=N=>{window.confirm("Cancel this appointment?")&&h(R=>R.map(M=>M.id===N?{...M,status:"Cancelled"}:M))},v=N=>{const{name:H,value:R}=N.target;s({...a,[H]:R})},S=()=>{s(vi),i(null),c(""),r(!0)},E=N=>{s({name:N.name,specialization:N.specialization,qualification:N.qualification,experience:N.experience,fee:N.fee,available:N.available}),i(N.id),c(""),r(!0)},P=()=>{r(!1),i(null),s(vi),c("")},T=N=>{if(N.preventDefault(),c(""),!a.name||!a.specialization||!a.experience||!a.fee){c("Please fill in all required fields.");return}if(l)t(H=>H.map(R=>R.id===l?{...R,...a}:R));else{const H={id:Date.now(),...a};t(R=>[...R,H])}P()},A=N=>{window.confirm("Remove this doctor? This cannot be undone.")&&t(R=>R.filter(M=>M.id!==N))},b=N=>{t(H=>H.map(R=>R.id===N?{...R,available:!R.available}:R))},ee=N=>N==="Completed"?"badge-low":N==="Cancelled"?"badge-high":"badge-medium";return o.jsxs("div",{children:[o.jsxs("div",{className:"page-header",children:[o.jsx("div",{className:"page-eyebrow",children:"Admin"}),o.jsx("h1",{className:"page-title",children:"Admin Dashboard"}),o.jsx("p",{className:"page-subtitle",children:"Manage doctors, monitor patients, and track hospital activity."})]}),o.jsxs("div",{className:"grid grid-3",style:{marginBottom:20},children:[o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"Total Doctors"}),o.jsx("p",{style:{fontSize:26,fontWeight:800},children:e.length})]}),o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"Total Patients"}),o.jsx("p",{style:{fontSize:26,fontWeight:800},children:gi.length})]}),o.jsxs("div",{className:"card",children:[o.jsx("p",{style:{fontSize:12,color:"var(--color-ink-soft)",marginBottom:6},children:"Total Appointments"}),o.jsx("p",{style:{fontSize:26,fontWeight:800},children:m.length})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[o.jsx("h3",{children:"Manage Doctors"}),!n&&o.jsx("button",{className:"btn btn-primary",onClick:S,children:"+ Add Doctor"})]}),n&&o.jsxs("form",{onSubmit:T,className:"doctor-form",children:[o.jsxs("div",{className:"grid grid-2",children:[o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"name",children:"Full name *"}),o.jsx("input",{id:"name",name:"name",type:"text",placeholder:"Dr. Full Name",value:a.name,onChange:v})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"specialization",children:"Specialization *"}),o.jsx("input",{id:"specialization",name:"specialization",type:"text",placeholder:"e.g. Cardiologist",value:a.specialization,onChange:v})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"qualification",children:"Qualification"}),o.jsx("input",{id:"qualification",name:"qualification",type:"text",placeholder:"e.g. MBBS, MD",value:a.qualification,onChange:v})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"experience",children:"Experience *"}),o.jsx("input",{id:"experience",name:"experience",type:"text",placeholder:"e.g. 5 years",value:a.experience,onChange:v})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"fee",children:"Consultation fee (₹) *"}),o.jsx("input",{id:"fee",name:"fee",type:"number",placeholder:"e.g. 500",value:a.fee,onChange:v})]}),o.jsxs("div",{className:"form-row",children:[o.jsx("label",{htmlFor:"available",children:"Availability"}),o.jsxs("select",{id:"available",name:"available",value:a.available,onChange:N=>s({...a,available:N.target.value==="true"}),children:[o.jsx("option",{value:"true",children:"Available"}),o.jsx("option",{value:"false",children:"Unavailable"})]})]})]}),u&&o.jsx("p",{className:"auth-error",children:u}),o.jsxs("div",{style:{display:"flex",gap:10},children:[o.jsx("button",{type:"submit",className:"btn btn-primary",children:l?"Save Changes":"Add Doctor"}),o.jsx("button",{type:"button",className:"btn btn-outline",onClick:P,children:"Cancel"})]})]}),o.jsxs("table",{style:{marginTop:n?20:0},children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Name"}),o.jsx("th",{children:"Specialization"}),o.jsx("th",{children:"Experience"}),o.jsx("th",{children:"Fee"}),o.jsx("th",{children:"Status"}),o.jsx("th",{})]})}),o.jsx("tbody",{children:e.map(N=>o.jsxs("tr",{children:[o.jsx("td",{children:N.name}),o.jsx("td",{children:N.specialization}),o.jsx("td",{children:N.experience}),o.jsxs("td",{children:["₹",N.fee]}),o.jsx("td",{children:o.jsx("span",{className:`badge ${N.available?"badge-low":"badge-medium"}`,children:N.available?"Available":"Unavailable"})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",gap:6},children:[o.jsx("button",{className:"btn btn-outline",style:{padding:"6px 10px",fontSize:12},onClick:()=>b(N.id),children:"Toggle"}),o.jsx("button",{className:"btn btn-outline",style:{padding:"6px 10px",fontSize:12},onClick:()=>E(N),children:"Edit"}),o.jsx("button",{className:"btn btn-outline",style:{padding:"6px 10px",fontSize:12,color:"var(--color-danger)",borderColor:"var(--color-danger)"},onClick:()=>A(N.id),children:"Remove"})]})})]},N.id))})]})]}),o.jsxs("div",{className:"card",style:{marginBottom:20},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[o.jsx("h3",{children:"All Appointments"}),o.jsx("div",{className:"filter-tabs",children:fm.map(N=>o.jsx("button",{className:g===N?"filter-tab filter-tab-active":"filter-tab",onClick:()=>k(N),children:N},N))})]}),f.length===0?o.jsx("p",{style:{fontSize:14,color:"var(--color-ink-soft)"},children:"No appointments match this filter."}):o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Patient"}),o.jsx("th",{children:"Doctor"}),o.jsx("th",{children:"Specialization"}),o.jsx("th",{children:"Date"}),o.jsx("th",{children:"Time"}),o.jsx("th",{children:"Status"}),o.jsx("th",{})]})}),o.jsx("tbody",{children:f.map(N=>o.jsxs("tr",{children:[o.jsx("td",{children:N.patient}),o.jsx("td",{children:N.doctor}),o.jsx("td",{children:N.specialization}),o.jsx("td",{children:N.date}),o.jsx("td",{children:N.time}),o.jsx("td",{children:o.jsx("span",{className:`badge ${ee(N.status)}`,children:N.status})}),o.jsx("td",{children:N.status==="Pending"&&o.jsx("button",{className:"btn btn-outline",style:{padding:"6px 10px",fontSize:12,color:"var(--color-danger)",borderColor:"var(--color-danger)"},onClick:()=>p(N.id),children:"Cancel"})})]},N.id))})]})]}),o.jsxs("div",{className:"grid grid-2",style:{marginBottom:20,alignItems:"start"},children:[o.jsxs("div",{className:"card",children:[o.jsx("h3",{style:{marginBottom:16},children:"⚠️ High-Risk Patient Alerts"}),C.length===0?o.jsx("p",{style:{fontSize:14,color:"var(--color-ink-soft)"},children:"No high-risk patients right now."}):o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Patient"}),o.jsx("th",{children:"Condition"}),o.jsx("th",{children:"Risk"})]})}),o.jsx("tbody",{children:C.map(N=>o.jsxs("tr",{children:[o.jsx("td",{children:N.name}),o.jsx("td",{children:N.predictedDisease}),o.jsx("td",{children:o.jsxs("span",{className:"badge badge-high",children:[N.riskPercentage,"%"]})})]},N.id))})]})]}),o.jsxs("div",{className:"card",children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,gap:12},children:[o.jsx("h3",{children:"All Patients Overview"}),o.jsx("input",{type:"text",placeholder:"Search by name...",value:w,onChange:N=>x(N.target.value),style:{maxWidth:200}})]}),d.length===0?o.jsxs("p",{style:{fontSize:14,color:"var(--color-ink-soft)"},children:['No patients match "',w,'".']}):o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Patient"}),o.jsx("th",{children:"Condition"}),o.jsx("th",{children:"Risk"})]})}),o.jsx("tbody",{children:d.map(N=>o.jsxs("tr",{children:[o.jsx("td",{children:N.name}),o.jsx("td",{children:N.predictedDisease}),o.jsx("td",{children:o.jsxs("span",{className:`badge badge-${N.riskLevel}`,children:[N.riskPercentage,"%"]})})]},N.id))})]})]})]}),o.jsx("style",{children:`
        .doctor-form {
          background: var(--color-bg);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 20px;
        }
        .filter-tabs {
          display: flex;
          gap: 6px;
        }
        .filter-tab {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          background: white;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-ink-soft);
          cursor: pointer;
        }
        .filter-tab:hover { border-color: var(--color-primary); }
        .filter-tab-active {
          background: var(--color-primary-soft);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
      `})]})}function hm(){return o.jsxs(Th,{children:[o.jsx(He,{path:"/",element:o.jsx(nm,{})}),o.jsx(He,{path:"/login",element:o.jsx(rm,{})}),o.jsx(He,{path:"/register",element:o.jsx(lm,{})}),o.jsxs(He,{element:o.jsx(em,{}),children:[o.jsx(He,{path:"/patient/health-profile",element:o.jsx(om,{})}),o.jsx(He,{path:"/patient/dashboard",element:o.jsx(am,{})}),o.jsx(He,{path:"/doctor/dashboard",element:o.jsx(dm,{})}),o.jsx(He,{path:"/admin/dashboard",element:o.jsx(pm,{})})]}),o.jsx(He,{path:"*",element:o.jsx(_h,{to:"/",replace:!0})})]})}yi.createRoot(document.getElementById("root")).render(o.jsx(Vs.StrictMode,{children:o.jsx(Ah,{children:o.jsx(hm,{})})}));
