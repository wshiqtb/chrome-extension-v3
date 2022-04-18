import{d as N,E as ee,F as O,w as H,o as L,q as ae,_ as m,O as R,B as w,z as B,I as $,P as Q,a5 as W,C as Y,v as ne,G as te,y as re,m as ue,H as le,i as oe,u as D,t as ce,s as ie,aj as de,ak as se,am as fe,a4 as ve,an as he,ao as pe,ap as be,aq as me,al as A,as as ye,ar as ge}from"../plugin-vue_export-helper.187d9cbf.js";var xe=globalThis&&globalThis.__rest||function(n,e){var t={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(t[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,a=Object.getOwnPropertySymbols(n);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(n,a[r])&&(t[a[r]]=n[a[r]]);return t},ke={prefixCls:String,name:String,id:String,type:String,defaultChecked:{type:[Boolean,Number],default:void 0},checked:{type:[Boolean,Number],default:void 0},disabled:Boolean,tabindex:{type:[Number,String]},readonly:Boolean,autofocus:Boolean,value:Q.any,required:Boolean},Ce=N({name:"Checkbox",inheritAttrs:!1,props:ee(ke,{prefixCls:"rc-checkbox",type:"checkbox",defaultChecked:!1}),emits:["click","change"],setup:function(e,t){var a=t.attrs,r=t.emit,g=t.expose,f=O(e.checked===void 0?e.defaultChecked:e.checked),y=O();H(function(){return e.checked},function(){f.value=e.checked}),L(function(){ae(function(){})}),g({focus:function(){var l;(l=y.value)===null||l===void 0||l.focus()},blur:function(){var l;(l=y.value)===null||l===void 0||l.blur()}});var s=O(),d=function(l){if(!e.disabled){e.checked===void 0&&(f.value=l.target.checked),l.shiftKey=s.value;var C={target:m(m({},e),{checked:l.target.checked}),stopPropagation:function(){l.stopPropagation()},preventDefault:function(){l.preventDefault()},nativeEvent:l};e.checked!==void 0&&(y.value.checked=!!e.checked),r("change",C),s.value=!1}},x=function(l){r("click",l),s.value=l.shiftKey};return function(){var o,l=e.prefixCls,C=e.name,_=e.id,G=e.type,I=e.disabled,p=e.readonly,u=e.tabindex,c=e.autofocus,v=e.value,b=e.required,h=xe(e,["prefixCls","name","id","type","disabled","readonly","tabindex","autofocus","value","required"]),i=a.class,S=a.onFocus,F=a.onBlur,K=a.onKeydown,V=a.onKeypress,T=a.onKeyup,q=Object.keys(m(m({},h),a)).reduce(function(M,P){return(P.substr(0,5)==="aria-"||P.substr(0,5)==="data-"||P==="role")&&(M[P]=h[P]),M},{}),k=R(l,i,(o={},w(o,"".concat(l,"-checked"),f.value),w(o,"".concat(l,"-disabled"),I),o)),U=m(m({name:C,id:_,type:G,readonly:p,disabled:I,tabindex:u,class:"".concat(l,"-input"),checked:!!f.value,autofocus:c,value:v},q),{onChange:d,onClick:x,onFocus:S,onBlur:F,onKeydown:K,onKeypress:V,onKeyup:T,required:b});return B("span",{class:k},[B("input",$({ref:y},U),null),B("span",{class:"".concat(l,"-inner")},null)])}}}),_e=function(){return{name:String,prefixCls:String,options:{type:Array,default:function(){return[]}},disabled:Boolean,id:String}},Se=function(){return m(m({},_e()),{defaultValue:{type:Array},value:{type:Array},onChange:{type:Function},"onUpdate:value":{type:Function}})},Oe=function(){return{prefixCls:String,defaultChecked:{type:Boolean,default:void 0},checked:{type:Boolean,default:void 0},disabled:{type:Boolean,default:void 0},isGroup:{type:Boolean,default:void 0},value:Q.any,name:String,id:String,indeterminate:{type:Boolean,default:void 0},type:{type:String,default:"checkbox"},autofocus:{type:Boolean,default:void 0},onChange:Function,"onUpdate:checked":Function,onClick:Function,skipGroup:{type:Boolean,default:!1}}},Be=function(){return m(m({},Oe()),{indeterminate:{type:Boolean,default:!1}})},Z=Symbol("CheckboxGroupContext"),J=globalThis&&globalThis.__rest||function(n,e){var t={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(t[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,a=Object.getOwnPropertySymbols(n);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(n,a[r])&&(t[a[r]]=n[a[r]]);return t},j=N({name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:Be(),setup:function(e,t){var a=t.emit,r=t.attrs,g=t.slots,f=t.expose,y=W(),s=Y("checkbox",e),d=s.prefixCls,x=s.direction,o=ne(Z,void 0),l=Symbol("checkboxUniId");te(function(){!e.skipGroup&&o&&o.registerValue(l,e.value)}),re(function(){o&&o.cancelValue(l)}),L(function(){ue(e.checked!==void 0||o||e.value===void 0,"Checkbox","`value` is not validate prop, do you mean `checked`?")});var C=function(u){var c=u.target.checked;a("update:checked",c),a("change",u)},_=O(),G=function(){var u;(u=_.value)===null||u===void 0||u.focus()},I=function(){var u;(u=_.value)===null||u===void 0||u.blur()};return f({focus:G,blur:I}),function(){var p,u,c=le((u=g.default)===null||u===void 0?void 0:u.call(g)),v=e.indeterminate,b=e.skipGroup,h=e.id,i=h===void 0?y.id.value:h,S=J(e,["indeterminate","skipGroup","id"]),F=r.onMouseenter,K=r.onMouseleave;r.onInput;var V=r.class,T=r.style,q=J(r,["onMouseenter","onMouseleave","onInput","class","style"]),k=m(m(m({},S),{id:i,prefixCls:d.value}),q);o&&!b?(k.onChange=function(){for(var P=arguments.length,X=new Array(P),E=0;E<P;E++)X[E]=arguments[E];a.apply(void 0,["change"].concat(X)),o.toggleOption({label:c,value:e.value})},k.name=o.name.value,k.checked=o.mergedValue.value.indexOf(e.value)!==-1,k.disabled=e.disabled||o.disabled.value,k.indeterminate=v):k.onChange=C;var U=R((p={},w(p,"".concat(d.value,"-wrapper"),!0),w(p,"".concat(d.value,"-rtl"),x.value==="rtl"),w(p,"".concat(d.value,"-wrapper-checked"),k.checked),w(p,"".concat(d.value,"-wrapper-disabled"),k.disabled),p),V),M=R(w({},"".concat(d.value,"-indeterminate"),v));return B("label",{class:U,style:T,onMouseenter:F,onMouseleave:K},[B(Ce,$($({},k),{},{class:M,ref:_}),null),c.length?B("span",null,[c]):null])}}});function Pe(n,e){var t=typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=oe(n))||e&&n&&typeof n.length=="number"){t&&(n=t);var a=0,r=function(){};return{s:r,n:function(){return a>=n.length?{done:!0}:{done:!1,value:n[a++]}},e:function(d){throw d},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var g=!0,f=!1,y;return{s:function(){t=t.call(n)},n:function(){var d=t.next();return g=d.done,d},e:function(d){f=!0,y=d},f:function(){try{!g&&t.return!=null&&t.return()}finally{if(f)throw y}}}}var z=N({name:"ACheckboxGroup",props:Se(),setup:function(e,t){var a=t.slots,r=t.emit,g=t.expose,f=W(),y=Y("checkbox",e),s=y.prefixCls,d=y.direction,x=O((e.value===void 0?e.defaultValue:e.value)||[]);H(function(){return e.value},function(){x.value=e.value||[]});var o=D(function(){return e.options.map(function(u){return typeof u=="string"||typeof u=="number"?{label:u,value:u}:u})}),l=O(Symbol()),C=O(new Map),_=function(c){C.value.delete(c),l.value=Symbol()},G=function(c,v){C.value.set(c,v),l.value=Symbol()},I=O(new Map);H(l,function(){var u=new Map,c=Pe(C.value.values()),v;try{for(c.s();!(v=c.n()).done;){var b=v.value;u.set(b,!0)}}catch(h){c.e(h)}finally{c.f()}I.value=u});var p=function(c){var v=x.value.indexOf(c.value),b=ie(x.value);v===-1?b.push(c.value):b.splice(v,1),e.value===void 0&&(x.value=b);var h=b.filter(function(i){return I.value.has(i)}).sort(function(i,S){var F=o.value.findIndex(function(V){return V.value===i}),K=o.value.findIndex(function(V){return V.value===S});return F-K});r("update:value",h),r("change",h),f.onFieldChange()};return ce(Z,{cancelValue:_,registerValue:G,toggleOption:p,mergedValue:x,name:D(function(){return e.name}),disabled:D(function(){return e.disabled})}),g({mergedValue:x}),function(){var u,c=e.id,v=c===void 0?f.id.value:c,b=null,h="".concat(s.value,"-group");return o.value&&o.value.length>0&&(b=o.value.map(function(i){var S;return B(j,{prefixCls:s.value,key:i.value.toString(),disabled:"disabled"in i?i.disabled:e.disabled,indeterminate:i.indeterminate,value:i.value,checked:x.value.indexOf(i.value)!==-1,onChange:i.onChange,class:"".concat(h,"-item")},{default:function(){return[i.label===void 0?(S=a.label)===null||S===void 0?void 0:S.call(a,i):i.label]}})})),B("div",{class:[h,w({},"".concat(h,"-rtl"),d.value==="rtl")],id:v},[b||((u=a.default)===null||u===void 0?void 0:u.call(a))])}}});j.Group=z;j.install=function(n){return n.component(j.name,j),n.component(z.name,z),n};const we=n=>(pe("data-v-46171e8c"),n=n(),be(),n),Ie={class:"popup"},Ve=we(()=>A("div",{class:"title"},[A("h1",null,[A("a",{href:"https://axhub.im/",target:"_blank"},"Axhub"),A("span",null,"v1.0.0")]),A("span",null,[A("a",{href:"https://axhub.im/chrome",target:"_blank",rel:"noopener noreferrer"},"\u5B98\u7F51"),A("a",null,"\u767B\u51FA\u4F01\u4E1A\u7248")])],-1)),Ae=ye("\u5F00\u542F\u4E00\u952E\u540C\u6B65\u539F\u578B\u6587\u4EF6"),Fe=N({setup(n){let e=O(!0);const t=a=>{console.log("update check status: ",a)};return(a,r)=>{const g=j;return me(),se("div",Ie,[Ve,B(g,{class:"ax-check",checked:ve(e),"onUpdate:checked":r[0]||(r[0]=f=>he(e)?e.value=f:e=f),onChange:t},{default:fe(()=>[Ae]),_:1},8,["checked"])])}}});var je=de(Fe,[["__scopeId","data-v-46171e8c"]]);ge(je).mount("#popup");
