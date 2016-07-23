/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.1
 * Copyright (C) 2016 Oliver Nightingale
 * @license MIT
 */
!function(){var t=function(e){var n=new t.Index;return n.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),e&&e.call(n,n),n};t.version="0.7.1",t.utils={},t.utils.warn=function(t){return function(e){t.console&&console.warn&&console.warn(e)}}(this),t.utils.asString=function(t){return void 0===t||null===t?"":t.toString()},t.EventEmitter=function(){this.events={}},t.EventEmitter.prototype.addListener=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=t;if("function"!=typeof e)throw new TypeError("last argument must be a function");n.forEach(function(t){this.hasHandler(t)||(this.events[t]=[]),this.events[t].push(e)},this)},t.EventEmitter.prototype.removeListener=function(t,e){if(this.hasHandler(t)){var n=this.events[t].indexOf(e);this.events[t].splice(n,1),this.events[t].length||delete this.events[t]}},t.EventEmitter.prototype.emit=function(t){if(this.hasHandler(t)){var e=Array.prototype.slice.call(arguments,1);this.events[t].forEach(function(t){t.apply(void 0,e)})}},t.EventEmitter.prototype.hasHandler=function(t){return t in this.events},t.tokenizer=function(e){return arguments.length&&null!=e&&void 0!=e?Array.isArray(e)?e.map(function(e){return t.utils.asString(e).toLowerCase()}):e.toString().trim().toLowerCase().split(t.tokenizer.seperator):[]},t.tokenizer.seperator=/[\s\-]+/,t.tokenizer.load=function(t){var e=this.registeredFunctions[t];if(!e)throw new Error("Cannot load un-registered function: "+t);return e},t.tokenizer.label="default",t.tokenizer.registeredFunctions={"default":t.tokenizer},t.tokenizer.registerFunction=function(e,n){n in this.registeredFunctions&&t.utils.warn("Overwriting existing tokenizer: "+n),e.label=n,this.registeredFunctions[n]=e},t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions={},t.Pipeline.registerFunction=function(e,n){n in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+n),e.label=n,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var n=e.label&&e.label in this.registeredFunctions;n||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var n=new t.Pipeline;return e.forEach(function(e){var i=t.Pipeline.registeredFunctions[e];if(!i)throw new Error("Cannot load un-registered function: "+e);n.add(i)}),n},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){t.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)},this)},t.Pipeline.prototype.after=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");i+=1,this._stack.splice(i,0,n)},t.Pipeline.prototype.before=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");this._stack.splice(i,0,n)},t.Pipeline.prototype.remove=function(t){var e=this._stack.indexOf(t);-1!=e&&this._stack.splice(e,1)},t.Pipeline.prototype.run=function(t){for(var e=[],n=t.length,i=this._stack.length,r=0;n>r;r++){for(var o=t[r],s=0;i>s&&(o=this._stack[s](o,r,t),void 0!==o&&""!==o);s++);void 0!==o&&""!==o&&e.push(o)}return e},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},t.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},t.Vector.Node=function(t,e,n){this.idx=t,this.val=e,this.next=n},t.Vector.prototype.insert=function(e,n){this._magnitude=void 0;var i=this.list;if(!i)return this.list=new t.Vector.Node(e,n,i),this.length++;if(e<i.idx)return this.list=new t.Vector.Node(e,n,i),this.length++;for(var r=i,o=i.next;void 0!=o;){if(e<o.idx)return r.next=new t.Vector.Node(e,n,o),this.length++;r=o,o=o.next}return r.next=new t.Vector.Node(e,n,o),this.length++},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var t,e=this.list,n=0;e;)t=e.val,n+=t*t,e=e.next;return this._magnitude=Math.sqrt(n)},t.Vector.prototype.dot=function(t){for(var e=this.list,n=t.list,i=0;e&&n;)e.idx<n.idx?e=e.next:e.idx>n.idx?n=n.next:(i+=e.val*n.val,e=e.next,n=n.next);return i},t.Vector.prototype.similarity=function(t){return this.dot(t)/(this.magnitude()*t.magnitude())},t.SortedSet=function(){this.length=0,this.elements=[]},t.SortedSet.load=function(t){var e=new this;return e.elements=t,e.length=t.length,e},t.SortedSet.prototype.add=function(){var t,e;for(t=0;t<arguments.length;t++)e=arguments[t],~this.indexOf(e)||this.elements.splice(this.locationFor(e),0,e);this.length=this.elements.length},t.SortedSet.prototype.toArray=function(){return this.elements.slice()},t.SortedSet.prototype.map=function(t,e){return this.elements.map(t,e)},t.SortedSet.prototype.forEach=function(t,e){return this.elements.forEach(t,e)},t.SortedSet.prototype.indexOf=function(t){for(var e=0,n=this.elements.length,i=n-e,r=e+Math.floor(i/2),o=this.elements[r];i>1;){if(o===t)return r;t>o&&(e=r),o>t&&(n=r),i=n-e,r=e+Math.floor(i/2),o=this.elements[r]}return o===t?r:-1},t.SortedSet.prototype.locationFor=function(t){for(var e=0,n=this.elements.length,i=n-e,r=e+Math.floor(i/2),o=this.elements[r];i>1;)t>o&&(e=r),o>t&&(n=r),i=n-e,r=e+Math.floor(i/2),o=this.elements[r];return o>t?r:t>o?r+1:void 0},t.SortedSet.prototype.intersect=function(e){for(var n=new t.SortedSet,i=0,r=0,o=this.length,s=e.length,a=this.elements,h=e.elements;;){if(i>o-1||r>s-1)break;a[i]!==h[r]?a[i]<h[r]?i++:a[i]>h[r]&&r++:(n.add(a[i]),i++,r++)}return n},t.SortedSet.prototype.clone=function(){var e=new t.SortedSet;return e.elements=this.toArray(),e.length=e.elements.length,e},t.SortedSet.prototype.union=function(t){var e,n,i;this.length>=t.length?(e=this,n=t):(e=t,n=this),i=e.clone();for(var r=0,o=n.toArray();r<o.length;r++)i.add(o[r]);return i},t.SortedSet.prototype.toJSON=function(){return this.toArray()},t.Index=function(){this._fields=[],this._ref="id",this.pipeline=new t.Pipeline,this.documentStore=new t.Store,this.tokenStore=new t.TokenStore,this.corpusTokens=new t.SortedSet,this.eventEmitter=new t.EventEmitter,this.tokenizerFn=t.tokenizer,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},t.Index.prototype.on=function(){var t=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,t)},t.Index.prototype.off=function(t,e){return this.eventEmitter.removeListener(t,e)},t.Index.load=function(e){e.version!==t.version&&t.utils.warn("version mismatch: current "+t.version+" importing "+e.version);var n=new this;return n._fields=e.fields,n._ref=e.ref,n.tokenizer=t.tokenizer.load(e.tokenizer),n.documentStore=t.Store.load(e.documentStore),n.tokenStore=t.TokenStore.load(e.tokenStore),n.corpusTokens=t.SortedSet.load(e.corpusTokens),n.pipeline=t.Pipeline.load(e.pipeline),n},t.Index.prototype.field=function(t,e){var e=e||{},n={name:t,boost:e.boost||1};return this._fields.push(n),this},t.Index.prototype.ref=function(t){return this._ref=t,this},t.Index.prototype.tokenizer=function(e){var n=e.label&&e.label in t.tokenizer.registeredFunctions;return n||t.utils.warn("Function is not a registered tokenizer. This may cause problems when serialising the index"),this.tokenizerFn=e,this},t.Index.prototype.add=function(e,n){var i={},r=new t.SortedSet,o=e[this._ref],n=void 0===n?!0:n;this._fields.forEach(function(t){var n=this.pipeline.run(this.tokenizerFn(e[t.name]));i[t.name]=n;for(var o=0;o<n.length;o++){var s=n[o];r.add(s),this.corpusTokens.add(s)}},this),this.documentStore.set(o,r);for(var s=0;s<r.length;s++){for(var a=r.elements[s],h=0,u=0;u<this._fields.length;u++){var l=this._fields[u],c=i[l.name],f=c.length;if(f){for(var d=0,p=0;f>p;p++)c[p]===a&&d++;h+=d/f*l.boost}}this.tokenStore.add(a,{ref:o,tf:h})}n&&this.eventEmitter.emit("add",e,this)},t.Index.prototype.remove=function(t,e){var n=t[this._ref],e=void 0===e?!0:e;if(this.documentStore.has(n)){var i=this.documentStore.get(n);this.documentStore.remove(n),i.forEach(function(t){this.tokenStore.remove(t,n)},this),e&&this.eventEmitter.emit("remove",t,this)}},t.Index.prototype.update=function(t,e){var e=void 0===e?!0:e;this.remove(t,!1),this.add(t,!1),e&&this.eventEmitter.emit("update",t,this)},t.Index.prototype.idf=function(t){var e="@"+t;if(Object.prototype.hasOwnProperty.call(this._idfCache,e))return this._idfCache[e];var n=this.tokenStore.count(t),i=1;return n>0&&(i=1+Math.log(this.documentStore.length/n)),this._idfCache[e]=i},t.Index.prototype.search=function(e){var n=this.pipeline.run(this.tokenizerFn(e)),i=new t.Vector,r=[],o=this._fields.reduce(function(t,e){return t+e.boost},0),s=n.some(function(t){return this.tokenStore.has(t)},this);if(!s)return[];n.forEach(function(e,n,s){var a=1/s.length*this._fields.length*o,h=this,u=this.tokenStore.expand(e).reduce(function(n,r){var o=h.corpusTokens.indexOf(r),s=h.idf(r),u=1,l=new t.SortedSet;if(r!==e){var c=Math.max(3,r.length-e.length);u=1/Math.log(c)}o>-1&&i.insert(o,a*s*u);for(var f=h.tokenStore.get(r),d=Object.keys(f),p=d.length,v=0;p>v;v++)l.add(f[d[v]].ref);return n.union(l)},new t.SortedSet);r.push(u)},this);var a=r.reduce(function(t,e){return t.intersect(e)});return a.map(function(t){return{ref:t,score:i.similarity(this.documentVector(t))}},this).sort(function(t,e){return e.score-t.score})},t.Index.prototype.documentVector=function(e){for(var n=this.documentStore.get(e),i=n.length,r=new t.Vector,o=0;i>o;o++){var s=n.elements[o],a=this.tokenStore.get(s)[e].tf,h=this.idf(s);r.insert(this.corpusTokens.indexOf(s),a*h)}return r},t.Index.prototype.toJSON=function(){return{version:t.version,fields:this._fields,ref:this._ref,tokenizer:this.tokenizerFn.label,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},t.Index.prototype.use=function(t){var e=Array.prototype.slice.call(arguments,1);e.unshift(this),t.apply(this,e)},t.Store=function(){this.store={},this.length=0},t.Store.load=function(e){var n=new this;return n.length=e.length,n.store=Object.keys(e.store).reduce(function(n,i){return n[i]=t.SortedSet.load(e.store[i]),n},{}),n},t.Store.prototype.set=function(t,e){this.has(t)||this.length++,this.store[t]=e},t.Store.prototype.get=function(t){return this.store[t]},t.Store.prototype.has=function(t){return t in this.store},t.Store.prototype.remove=function(t){this.has(t)&&(delete this.store[t],this.length--)},t.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},t.stemmer=function(){var t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",r=n+"[^aeiouy]*",o=i+"[aeiou]*",s="^("+r+")?"+o+r,a="^("+r+")?"+o+r+"("+o+")?$",h="^("+r+")?"+o+r+o+r,u="^("+r+")?"+i,l=new RegExp(s),c=new RegExp(h),f=new RegExp(a),d=new RegExp(u),p=/^(.+?)(ss|i)es$/,v=/^(.+?)([^s])s$/,g=/^(.+?)eed$/,m=/^(.+?)(ed|ing)$/,y=/.$/,S=/(at|bl|iz)$/,w=new RegExp("([^aeiouylsz])\\1$"),k=new RegExp("^"+r+i+"[^aeiouwxy]$"),x=/^(.+?[^aeiou])y$/,b=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,E=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,F=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,_=/^(.+?)(s|t)(ion)$/,z=/^(.+?)e$/,O=/ll$/,P=new RegExp("^"+r+i+"[^aeiouwxy]$"),T=function(n){var i,r,o,s,a,h,u;if(n.length<3)return n;if(o=n.substr(0,1),"y"==o&&(n=o.toUpperCase()+n.substr(1)),s=p,a=v,s.test(n)?n=n.replace(s,"$1$2"):a.test(n)&&(n=n.replace(a,"$1$2")),s=g,a=m,s.test(n)){var T=s.exec(n);s=l,s.test(T[1])&&(s=y,n=n.replace(s,""))}else if(a.test(n)){var T=a.exec(n);i=T[1],a=d,a.test(i)&&(n=i,a=S,h=w,u=k,a.test(n)?n+="e":h.test(n)?(s=y,n=n.replace(s,"")):u.test(n)&&(n+="e"))}if(s=x,s.test(n)){var T=s.exec(n);i=T[1],n=i+"i"}if(s=b,s.test(n)){var T=s.exec(n);i=T[1],r=T[2],s=l,s.test(i)&&(n=i+t[r])}if(s=E,s.test(n)){var T=s.exec(n);i=T[1],r=T[2],s=l,s.test(i)&&(n=i+e[r])}if(s=F,a=_,s.test(n)){var T=s.exec(n);i=T[1],s=c,s.test(i)&&(n=i)}else if(a.test(n)){var T=a.exec(n);i=T[1]+T[2],a=c,a.test(i)&&(n=i)}if(s=z,s.test(n)){var T=s.exec(n);i=T[1],s=c,a=f,h=P,(s.test(i)||a.test(i)&&!h.test(i))&&(n=i)}return s=O,a=c,s.test(n)&&a.test(n)&&(s=y,n=n.replace(s,"")),"y"==o&&(n=o.toLowerCase()+n.substr(1)),n};return T}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),t.generateStopWordFilter=function(t){var e=t.reduce(function(t,e){return t[e]=e,t},{});return function(t){return t&&e[t]!==t?t:void 0}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),t.trimmer=function(t){return t.replace(/^\W+/,"").replace(/\W+$/,"")},t.Pipeline.registerFunction(t.trimmer,"trimmer"),t.TokenStore=function(){this.root={docs:{}},this.length=0},t.TokenStore.load=function(t){var e=new this;return e.root=t.root,e.length=t.length,e},t.TokenStore.prototype.add=function(t,e,n){var n=n||this.root,i=t.charAt(0),r=t.slice(1);return i in n||(n[i]={docs:{}}),0===r.length?(n[i].docs[e.ref]=e,void(this.length+=1)):this.add(r,e,n[i])},t.TokenStore.prototype.has=function(t){if(!t)return!1;for(var e=this.root,n=0;n<t.length;n++){if(!e[t.charAt(n)])return!1;e=e[t.charAt(n)]}return!0},t.TokenStore.prototype.getNode=function(t){if(!t)return{};for(var e=this.root,n=0;n<t.length;n++){if(!e[t.charAt(n)])return{};e=e[t.charAt(n)]}return e},t.TokenStore.prototype.get=function(t,e){return this.getNode(t,e).docs||{}},t.TokenStore.prototype.count=function(t,e){return Object.keys(this.get(t,e)).length},t.TokenStore.prototype.remove=function(t,e){if(t){for(var n=this.root,i=0;i<t.length;i++){if(!(t.charAt(i)in n))return;n=n[t.charAt(i)]}delete n.docs[e]}},t.TokenStore.prototype.expand=function(t,e){var n=this.getNode(t),i=n.docs||{},e=e||[];return Object.keys(i).length&&e.push(t),Object.keys(n).forEach(function(n){"docs"!==n&&e.concat(this.expand(t+n,e))},this),e},t.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.lunr=e()}(this,function(){return t})}();
/*
 * jQuery FlexSlider v2.6.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt","");var c=""!==s.attr("data-thumb-alt")?c=' alt="'+s.attr("data-thumb-alt")+'"':"";if(a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+c+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var d=s.attr("data-thumbcaption");""!==d&&void 0!==d&&(a+='<span class="'+i+'caption">'+d+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,y=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!y||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!y&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,y=!1,x=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),x=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:x,o=d?x:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){x=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-x,y=d?Math.abs(m)<Math.abs(x-o):Math.abs(m)<Math.abs(b-o);var t=500;(!y||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!y&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).innerHeight()},e):t.innerHeight(n.slides.eq(n.animatingTo).innerHeight())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!1||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);
/* skel.js v3.0.1 | (c) skel.io | MIT licensed */
var skel=function(){"use strict";var t={breakpointIds:null,events:{},isInit:!1,obj:{attachments:{},breakpoints:{},head:null,states:{}},sd:"/",state:null,stateHandlers:{},stateId:"",vars:{},DOMReady:null,indexOf:null,isArray:null,iterate:null,matchesMedia:null,extend:function(e,n){t.iterate(n,function(i){t.isArray(n[i])?(t.isArray(e[i])||(e[i]=[]),t.extend(e[i],n[i])):"object"==typeof n[i]?("object"!=typeof e[i]&&(e[i]={}),t.extend(e[i],n[i])):e[i]=n[i]})},newStyle:function(t){var e=document.createElement("style");return e.type="text/css",e.innerHTML=t,e},_canUse:null,canUse:function(e){t._canUse||(t._canUse=document.createElement("div"));var n=t._canUse.style,i=e.charAt(0).toUpperCase()+e.slice(1);return e in n||"Moz"+i in n||"Webkit"+i in n||"O"+i in n||"ms"+i in n},on:function(e,n){var i=e.split(/[\s]+/);return t.iterate(i,function(e){var a=i[e];if(t.isInit){if("init"==a)return void n();if("change"==a)n();else{var r=a.charAt(0);if("+"==r||"!"==r){var o=a.substring(1);if(o in t.obj.breakpoints)if("+"==r&&t.obj.breakpoints[o].active)n();else if("!"==r&&!t.obj.breakpoints[o].active)return void n()}}}t.events[a]||(t.events[a]=[]),t.events[a].push(n)}),t},trigger:function(e){return t.events[e]&&0!=t.events[e].length?(t.iterate(t.events[e],function(n){t.events[e][n]()}),t):void 0},breakpoint:function(e){return t.obj.breakpoints[e]},breakpoints:function(e){function n(t,e){this.name=this.id=t,this.media=e,this.active=!1,this.wasActive=!1}return n.prototype.matches=function(){return t.matchesMedia(this.media)},n.prototype.sync=function(){this.wasActive=this.active,this.active=this.matches()},t.iterate(e,function(i){t.obj.breakpoints[i]=new n(i,e[i])}),window.setTimeout(function(){t.poll()},0),t},addStateHandler:function(e,n){t.stateHandlers[e]=n},callStateHandler:function(e){var n=t.stateHandlers[e]();t.iterate(n,function(e){t.state.attachments.push(n[e])})},changeState:function(e){t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].sync()}),t.vars.lastStateId=t.stateId,t.stateId=e,t.breakpointIds=t.stateId===t.sd?[]:t.stateId.substring(1).split(t.sd),t.obj.states[t.stateId]?t.state=t.obj.states[t.stateId]:(t.obj.states[t.stateId]={attachments:[]},t.state=t.obj.states[t.stateId],t.iterate(t.stateHandlers,t.callStateHandler)),t.detachAll(t.state.attachments),t.attachAll(t.state.attachments),t.vars.stateId=t.stateId,t.vars.state=t.state,t.trigger("change"),t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].active?t.obj.breakpoints[e].wasActive||t.trigger("+"+e):t.obj.breakpoints[e].wasActive&&t.trigger("-"+e)})},generateStateConfig:function(e,n){var i={};return t.extend(i,e),t.iterate(t.breakpointIds,function(e){t.extend(i,n[t.breakpointIds[e]])}),i},getStateId:function(){var e="";return t.iterate(t.obj.breakpoints,function(n){var i=t.obj.breakpoints[n];i.matches()&&(e+=t.sd+i.id)}),e},poll:function(){var e="";e=t.getStateId(),""===e&&(e=t.sd),e!==t.stateId&&t.changeState(e)},_attach:null,attach:function(e){var n=t.obj.head,i=e.element;return i.parentNode&&i.parentNode.tagName?!1:(t._attach||(t._attach=n.firstChild),n.insertBefore(i,t._attach.nextSibling),e.permanent&&(t._attach=i),!0)},attachAll:function(e){var n=[];t.iterate(e,function(t){n[e[t].priority]||(n[e[t].priority]=[]),n[e[t].priority].push(e[t])}),n.reverse(),t.iterate(n,function(e){t.iterate(n[e],function(i){t.attach(n[e][i])})})},detach:function(t){var e=t.element;return t.permanent||!e.parentNode||e.parentNode&&!e.parentNode.tagName?!1:(e.parentNode.removeChild(e),!0)},detachAll:function(e){var n={};t.iterate(e,function(t){n[e[t].id]=!0}),t.iterate(t.obj.attachments,function(e){e in n||t.detach(t.obj.attachments[e])})},attachment:function(e){return e in t.obj.attachments?t.obj.attachments[e]:null},newAttachment:function(e,n,i,a){return t.obj.attachments[e]={id:e,element:n,priority:i,permanent:a}},init:function(){t.initMethods(),t.initVars(),t.initEvents(),t.obj.head=document.getElementsByTagName("head")[0],t.isInit=!0,t.trigger("init")},initEvents:function(){t.on("resize",function(){t.poll()}),t.on("orientationChange",function(){t.poll()}),t.DOMReady(function(){t.trigger("ready")}),window.onload&&t.on("load",window.onload),window.onload=function(){t.trigger("load")},window.onresize&&t.on("resize",window.onresize),window.onresize=function(){t.trigger("resize")},window.onorientationchange&&t.on("orientationChange",window.onorientationchange),window.onorientationchange=function(){t.trigger("orientationChange")}},initMethods:function(){document.addEventListener?!function(e,n){t.DOMReady=n()}("domready",function(){function t(t){for(r=1;t=n.shift();)t()}var e,n=[],i=document,a="DOMContentLoaded",r=/^loaded|^c/.test(i.readyState);return i.addEventListener(a,e=function(){i.removeEventListener(a,e),t()}),function(t){r?t():n.push(t)}}):!function(e,n){t.DOMReady=n()}("domready",function(t){function e(t){for(h=1;t=i.shift();)t()}var n,i=[],a=!1,r=document,o=r.documentElement,s=o.doScroll,c="DOMContentLoaded",d="addEventListener",u="onreadystatechange",l="readyState",f=s?/^loaded|^c/:/^loaded|c/,h=f.test(r[l]);return r[d]&&r[d](c,n=function(){r.removeEventListener(c,n,a),e()},a),s&&r.attachEvent(u,n=function(){/^c/.test(r[l])&&(r.detachEvent(u,n),e())}),t=s?function(e){self!=top?h?e():i.push(e):function(){try{o.doScroll("left")}catch(n){return setTimeout(function(){t(e)},50)}e()}()}:function(t){h?t():i.push(t)}}),Array.prototype.indexOf?t.indexOf=function(t,e){return t.indexOf(e)}:t.indexOf=function(t,e){if("string"==typeof t)return t.indexOf(e);var n,i,a=e?e:0;if(!this)throw new TypeError;if(i=this.length,0===i||a>=i)return-1;for(0>a&&(a=i-Math.abs(a)),n=a;i>n;n++)if(this[n]===t)return n;return-1},Array.isArray?t.isArray=function(t){return Array.isArray(t)}:t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},Object.keys?t.iterate=function(t,e){if(!t)return[];var n,i=Object.keys(t);for(n=0;i[n]&&e(i[n],t[i[n]])!==!1;n++);}:t.iterate=function(t,e){if(!t)return[];var n;for(n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])===!1)break},window.matchMedia?t.matchesMedia=function(t){return""==t?!0:window.matchMedia(t).matches}:window.styleMedia||window.media?t.matchesMedia=function(t){if(""==t)return!0;var e=window.styleMedia||window.media;return e.matchMedium(t||"all")}:window.getComputedStyle?t.matchesMedia=function(t){if(""==t)return!0;var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle;var a="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=a:e.textContent=a,"1px"===i.width}:t.matchesMedia=function(t){if(""==t)return!0;var e,n,i,a,r={"min-width":null,"max-width":null},o=!1;for(i=t.split(/\s+and\s+/),e=0;e<i.length;e++)n=i[e],"("==n.charAt(0)&&(n=n.substring(1,n.length-1),a=n.split(/:\s+/),2==a.length&&(r[a[0].replace(/^\s+|\s+$/g,"")]=parseInt(a[1]),o=!0));if(!o)return!1;var s=document.documentElement.clientWidth,c=document.documentElement.clientHeight;return null!==r["min-width"]&&s<r["min-width"]||null!==r["max-width"]&&s>r["max-width"]||null!==r["min-height"]&&c<r["min-height"]||null!==r["max-height"]&&c>r["max-height"]?!1:!0},navigator.userAgent.match(/MSIE ([0-9]+)/)&&RegExp.$1<9&&(t.newStyle=function(t){var e=document.createElement("span");return e.innerHTML='&nbsp;<style type="text/css">'+t+"</style>",e})},initVars:function(){var e,n,i,a=navigator.userAgent;e="other",n=0,i=[["firefox",/Firefox\/([0-9\.]+)/],["bb",/BlackBerry.+Version\/([0-9\.]+)/],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/],["opera",/OPR\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)/],["edge",/Edge\/([0-9\.]+)/],["safari",/Version\/([0-9\.]+).+Safari/],["chrome",/Chrome\/([0-9\.]+)/],["ie",/MSIE ([0-9]+)/],["ie",/Trident\/.+rv:([0-9]+)/]],t.iterate(i,function(t,i){return a.match(i[1])?(e=i[0],n=parseFloat(RegExp.$1),!1):void 0}),t.vars.browser=e,t.vars.browserVersion=n,e="other",n=0,i=[["ios",/([0-9_]+) like Mac OS X/,function(t){return t.replace("_",".").replace("_","")}],["ios",/CPU like Mac OS X/,function(t){return 0}],["wp",/Windows Phone ([0-9\.]+)/,null],["android",/Android ([0-9\.]+)/,null],["mac",/Macintosh.+Mac OS X ([0-9_]+)/,function(t){return t.replace("_",".").replace("_","")}],["windows",/Windows NT ([0-9\.]+)/,null],["bb",/BlackBerry.+Version\/([0-9\.]+)/,null],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/,null]],t.iterate(i,function(t,i){return a.match(i[1])?(e=i[0],n=parseFloat(i[2]?i[2](RegExp.$1):RegExp.$1),!1):void 0}),t.vars.os=e,t.vars.osVersion=n,t.vars.IEVersion="ie"==t.vars.browser?t.vars.browserVersion:99,t.vars.touch="wp"==t.vars.os?navigator.msMaxTouchPoints>0:!!("ontouchstart"in window),t.vars.mobile="wp"==t.vars.os||"android"==t.vars.os||"ios"==t.vars.os||"bb"==t.vars.os}};return t.init(),t}();!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.skel=e()}(this,function(){return skel});

var routes = (function() {
	var $body = $('body');
	var section = $('#main .inner');

	var bodyClassChange = function(page) {
		$body.removeClass(function(index, css) {
			return (css.match(/(^|\s)page-\S+/g) || []).join(' ');
		});

		$body.addClass('page-' + page);
	};

	var loadErrorPage = function() {
		bodyClassChange('404');
		section.load('src/pages/404.html');
	};

	var changePage = function(page, mode, alterHistory) {
		bodyClassChange(page);

		if (alterHistory === undefined) {
			alterHistory = true;
		}

		// if on initial page load, load content instantly
		if (mode == "init") {
			$body.hide();
			section.load(
				'src/pages/' + page + '.html',
				function(response, status, xhr) {
					if (alterHistory) {
						history.pushState(page, null, page);
					}

					if (status !== "success") {
						loadErrorPage();
					}

					$body.fadeIn(1000);
				}
			);
		}

		// otherwise, change it to the page in parameter
		else {
			section.fadeOut(200, function() {
				setTimeout(function() {
					section.load(
						'src/pages/' + page + '.html',
						function(response, status, xhr) {
							if (alterHistory) {
								history.pushState(page, null, page);
							}

							if (status !== "success") {
								loadErrorPage();
							}

							section.fadeIn(350);
						}
					);
				}, 300);
			});
		}
	};

	// when users go back and forth
	// $(window).on('popstate', function(e) {
	// 	changePage(e.state, "normal", false);
	// 	bodyClassChange(e.state);
	// });

	// load page to correct routes on initial load
	var setInitialRoute = function() {
		if (!sessionStorage.redirect) {
			changePage('home', "init", false);
		} else {
			let url = sessionStorage.redirect;
			delete sessionStorage.redirect;
			let page = url.slice(url.lastIndexOf('/') + 1, url.length);
			changePage(page, "init");
		}
	};

	return {
		changePage: changePage,
		setInitialRoute: setInitialRoute
	};

})();

var search = (function() {
	var model = (function() {
		var getTitle = function(string) {
			var beginning = stringUtil.nth_occurrence(string, '">', 1);
			var end = string.indexOf('</h1>');

			return string.slice(beginning + 2, end);
		};

		var getPage = function(string) {
			var beginning = stringUtil.nth_occurrence(string, '"', 1);
			var end = stringUtil.nth_occurrence(string, '"', 2);
			var page = string.slice(beginning + 1, end);

			return page;
		};

		var getBody = function(string) {
			var lookingFor = '</h1>';
			var beginning = stringUtil.nth_occurrence(string, lookingFor, 1);
			var body = string.slice(beginning + lookingFor.length, string.length);

			return stringUtil.stripHTML(body);
		};

		// initialize + build search index
		var searchIndex = lunr(function() {
			this.ref('page');
			this.field('title');
			this.field('body');
		});

		var store = {};

		var buildIndex = function(index) {
			$.ajax(
				{
					url: 'src/js/core/search/searchindex.html',
					success: function(result) {
						// get collection of text in array format
						resultsArray = result.split('h1 id=');

						for (var x = 0; x < resultsArray.length; x++) {
							// decode HTML
							var decoded = stringUtil.decodeHTML(resultsArray[x]);
							var currentTitle = getTitle(decoded);
							var currentPage = getPage(decoded);
							var currentBody = stringUtil.cutString(getBody(decoded), 300);
							currentBody += '...';

							// add each article to search index
							searchIndex.add({
								body: currentBody.slice(0, 5),
								page: currentPage,
								title: currentTitle
							});

							// add it to our data store
							store[currentPage] = {
								body: currentBody,
								title: currentTitle,
								urlTitle: currentPage
							};
						}
					}
				}
			);
		};

		var getSearchResults = function(term) {
			var resultsArray = searchIndex.search(term);

			return resultsArray.map(function(result) {
				return store[result.ref];
			});
		};

		return {
			buildIndex: buildIndex,
			getSearchResults: getSearchResults
		};
	})();

	var view = (function(getSearchResults, getBody) {
		var $searchContainer = $('.search-container');
		var $searchInput = $('.search-input');

		$('.open-search').on(
			'click',
			function(e) {
				e.preventDefault();
				toggleSearch('show');
			}
		);

		$searchInput.on(
			'keyup',
			function() {
				var currentSearch = $(this).val();
				var searchResults = getSearchResults(currentSearch);
				populateResults(searchResults);
			}
		);

		$('.search-results-container').on(
			'click',
			'article',
			function(e) {
				toggleSearch('hide');
				routes.changePage($(this).attr('class'));
			}
		);

		var toggleSearch = function(mode) {
			$searchContainer.removeClass('hide show');

			if (mode === 'hide') {
				$searchContainer.addClass('hide');
			}
			else if (mode === 'show') {
				$searchContainer.addClass('show');
				$('.search-input').focus();
			}
		};

		var populateResults = function(seachResultsArray) {
			var $resultsContainer = $('.search-results-container');
			var html = '';

			for (var x = 0; x < seachResultsArray.length; x++) {
				html += '<article class="' + seachResultsArray[x].urlTitle + '"">';
				html += '<h2>';
				html += seachResultsArray[x].title;
				html += '</h2>';
				html += '<p>';
				html += seachResultsArray[x].body;
				html += '</p>';
				html += '</article>';
			}

			$resultsContainer.html(html);
		};

		return {
			toggleSearch: toggleSearch
		};

	})(model.getSearchResults, model.getBody);

	return {
		buildIndex: model.buildIndex,
		toggleSearch: view.toggleSearch
	};
})();

var stringUtil = (function() {
	var cutString = function(s, n) {
		var cut = s.indexOf(' ', n);
		if (cut == -1) {
			return s;
		}
		return s.substring(0, cut);
	};

	var decodeHTML = function(html) {
		var txt = document.createElement('textarea');

		txt.innerHTML = html;
		return txt.value;
	};

	var nth_occurrence = function(string, char, nth) {
		var first_index = string.indexOf(char);
		var length_up_to_first_index = first_index + 1;

		if (nth == 1) {
			return first_index;
		}
		else {
			var string_after_first_occurrence = string.slice(length_up_to_first_index);
			var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);

			if (next_occurrence === -1) {
				return -1;
			} else {
				return length_up_to_first_index + next_occurrence;
			}
		}
	};

	var replaceAll = function(string, search, replacement) {
	    return string.replace(new RegExp(search, 'g'), replacement);
	};

	var removeFileName = function(fileString) {
		return fileString.slice(0, fileString.indexOf('.'));
	};

	var stripHTML = function(html) {
		var tmp = document.createElement('div');

		tmp.innerHTML = html;

		return tmp.textContent || tmp.innerText || '';
	};

	var toTitleCase = function (str) {
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	return {
		cutString: cutString,
		decodeHTML: decodeHTML,
		nth_occurrence: nth_occurrence,
		replaceAll: replaceAll,
		removeFileName: removeFileName,
		stripHTML: stripHTML,
		toTitleCase: toTitleCase
	};
})();
/*
	core.js
	Manages application-wide functionality
*/

var core = (function() {

	// set initial URL route
	routes.setInitialRoute();

	// build our index
	search.buildIndex();

})(search, routes);
/*
	phantom.js
	For theme functionality
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Touch?
		if (skel.vars.touch)
			$body.addClass('is-touch');

		// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
		$form.find('textarea').each(function() {

			var $this = $(this),
				$wrapper = $('<div class="textarea-wrapper"></div>'),
				$submits = $this.find('input[type="submit"]');

			$this
				.wrap($wrapper)
				.attr('rows', 1)
				.css('overflow', 'hidden')
				.css('resize', 'none')
				.on('keydown', function(event) {

					if (event.keyCode == 13 && event.ctrlKey) {

						event.preventDefault();
						event.stopPropagation();

						$(this).blur();

					}

				})
				.on('blur focus', function() {
					$this.val($.trim($this.val()));
				})
				.on('input blur focus --init', function() {

					$wrapper
						.css('height', $this.height());

					$this
						.css('height', 'auto')
						.css('height', $this.prop('scrollHeight') + 'px');

				})
				.on('keyup', function(event) {

					if (event.keyCode == 9)
						$this
						.select();

				})
				.triggerHandler('--init');

			// Fix.
			if (skel.vars.browser == 'ie' || skel.vars.mobile)
				$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

		});

		// Fix: Placeholder polyfill.
		$form.placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function() {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				if (href == '#menu')
					return;

				window.setTimeout(function() {
					window.location.href = href;
				}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {
				event.stopPropagation();
				event.preventDefault();

				$menu._toggle();

			})
			.on('click', function(event) {
				$menu._hide();
			})
			.on('keydown', function(event) {
				// Hide on escape.
				if (event.keyCode == 27)
					$menu._hide();

			});

	});

})(jQuery);

var navigation = (function() {

	var model = (function() {
		var getNavigationStructure = function() {
			return new Promise(function(resolve, reject) {
				$.ajax(
					{
						url: 'src/js/ui/navigation/navigation.json',
						success: function(result) {
							resolve(result);
						},
						error: function(err) {
							console.error(err);
						}
					}
				);
			});
		};

		return {
			getNavigationStructure: getNavigationStructure
		};
	})();

	var controller = (function(model) {
		var formatFileName = function(file) {
			var formattedName = file;

			// remove file name
			formattedName = stringUtil.removeFileName(formattedName);

			// make title case
			formattedName = stringUtil.toTitleCase(formattedName);

			// // remove "-"
			formattedName = stringUtil.replaceAll(formattedName, "-", " ");

			return formattedName;
		};

		var buildNavigation = function(navSelector) {
			model.getNavigationStructure()
				.then(function(navigationStructureJSON) {
					var topNav = '<ul>';
					var bottomNav = '<ul>';

					for (var property in navigationStructureJSON) {
						if (navigationStructureJSON.hasOwnProperty(property)) {

							// if this has object within it, build out a subnav
							if (typeof navigationStructureJSON[property] === "object") {
								var subNavObject = navigationStructureJSON[property];
								var categoryName = property;

								topNav += '<li class="category">' + property;
								topNav += '<ul>';

								for (var subNavProperty in subNavObject) {
									if (subNavObject.hasOwnProperty(subNavProperty)) {
										topNav += '<li>';
										topNav += '<a class="' + stringUtil.removeFileName(subNavProperty) + '" href="#">' + formatFileName(subNavProperty) + '</a>';
										topNav += '</li>';
									}
								}

								topNav += '</ul></li>';
							}

							// otherwise, just list out the links on the main nav at the bottom
							else {
								bottomNav += '<li>';
								bottomNav += '<a href="#" class="' + property + '">' + formatFileName(property) + '</a>';
								bottomNav += '</li>';
							}
						}
					}

					topNav += '</ul>';
					bottomNav += '</ul>';

					return topNav + bottomNav;
				})
				.then(function(navigationHTML) {
					$(navSelector).html(navigationHTML);
				});
		};

		return {
			buildNavigation: buildNavigation
		};
	})(model);

	var view = (function(){
		var $navMenu = $('nav#menu');
        var $body = $('body');

		$navMenu.on("click", 'a', function(e) {
	        var $section_name = $(this).attr('class');

	        e.stopPropagation();
	        e.preventDefault();
	        $('nav#menu a').removeClass('active');
	        $(this).addClass('active');
	        $('a.close').trigger('click');
	        routes.changePage($section_name);
	    });

	    $('a.logo').on('click', function(e) {
	        e.preventDefault();
	        routes.changePage('home');
	    });

	})();

	return {
		buildNavigation: controller.buildNavigation
	};

})(routes);

(function($) {

	/**
	 * Generate an indented list of links from a nav. Meant for use with panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var $this = $(this);
		$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var $this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
				'class="link depth-' + indent + '"' +
				((typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
				((typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
				'<span class="indent-' + indent + '"></span>' +
				$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// No elements?
		if (this.length == 0)
			return $this;

		// Multiple elements?
		if (this.length > 1) {

			for (var i = 0; i < this.length; i++)
				$(this[i]).panel(userConfig);

			return $this;

		}

		// Vars.
		var $this = $(this),
			$body = $('body'),
			$window = $(window),
			id = $this.attr('id'),
			config;

		// Config.
		config = $.extend({

			// Delay.
			delay: 0,

			// Hide panel on link click.
			hideOnClick: false,

			// Hide panel on escape keypress.
			hideOnEscape: false,

			// Hide panel on swipe.
			hideOnSwipe: false,

			// Reset scroll position on hide.
			resetScroll: false,

			// Reset forms on hide.
			resetForms: false,

			// Side of viewport the panel will appear.
			side: null,

			// Target element for "class".
			target: $this,

			// Class to toggle.
			visibleClass: 'visible'

		}, userConfig);

		// Expand "target" if it's not a jQuery object already.
		if (typeof config.target != 'jQuery')
			config.target = $(config.target);

		// Panel.

		// Methods.
		$this._hide = function(event) {

			// Already hidden? Bail.
			if (!config.target.hasClass(config.visibleClass))
				return;

			// If an event was provided, cancel it.
			if (event) {

				event.preventDefault();
				event.stopPropagation();

			}

			// Hide.
			config.target.removeClass(config.visibleClass);

			// Post-hide stuff.
			window.setTimeout(function() {

				// Reset scroll position.
				if (config.resetScroll)
					$this.scrollTop(0);

				// Reset forms.
				if (config.resetForms)
					$this.find('form').each(function() {
						this.reset();
					});

			}, config.delay);

		};

		// Vendor fixes.
		$this
			.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
			.css('-webkit-overflow-scrolling', 'touch');

		// Hide on click.
		if (config.hideOnClick) {

			$this.find('a')
				.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

			$this
				.on('click', 'a', function(event) {

					var $a = $(this),
						href = $a.attr('href'),
						target = $a.attr('target');

					if (!href || href == '#' || href == '' || href == '#' + id)
						return;

					// Cancel original event.
					event.preventDefault();
					event.stopPropagation();

					// Hide panel.
					$this._hide();

					// Redirect to href.
					window.setTimeout(function() {

						if (target == '_blank')
							window.open(href);
						else
							window.location.href = href;

					}, config.delay + 10);

				});

		}

		// Event: Touch stuff.
		$this.on('touchstart', function(event) {

			$this.touchPosX = event.originalEvent.touches[0].pageX;
			$this.touchPosY = event.originalEvent.touches[0].pageY;

		})

		$this.on('touchmove', function(event) {

			if ($this.touchPosX === null || $this.touchPosY === null)
				return;

			var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
				diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
				th = $this.outerHeight(),
				ts = ($this.get(0).scrollHeight - $this.scrollTop());

			// Hide on swipe?
			if (config.hideOnSwipe) {

				var result = false,
					boundary = 20,
					delta = 50;

				switch (config.side) {

					case 'left':
						result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
						break;

					case 'right':
						result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
						break;

					case 'top':
						result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
						break;

					case 'bottom':
						result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
						break;

					default:
						break;

				}

				if (result) {

					$this.touchPosX = null;
					$this.touchPosY = null;
					$this._hide();

					return false;

				}

			}

			// Prevent vertical scrolling past the top or bottom.
			if (($this.scrollTop() < 0 && diffY < 0) || (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

				event.preventDefault();
				event.stopPropagation();

			}

		});

		// Event: Prevent certain events inside the panel from bubbling.
		$this.on('click touchend touchstart touchmove', function(event) {
			event.stopPropagation();
		});

		// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
		$this.on('click', 'a[href="#' + id + '"]', function(event) {

			event.preventDefault();
			event.stopPropagation();

			config.target.removeClass(config.visibleClass);

		});

		// Body.

		// Event: Hide panel on body click/tap.
		$body.on('click touchend', function(event) {
			$this._hide(event);
		});

		// Event: Toggle.
		$body.on('click', 'a[href="#' + id + '"]', function(event) {

			event.preventDefault();
			event.stopPropagation();

			config.target.toggleClass(config.visibleClass);

		});

		// Window.

		// Event: Hide on ESC.
		if (config.hideOnEscape)
			$window.on('keydown', function(event) {

				if (event.keyCode == 27)
					$this._hide(event);

			});

		return $this;

	};

	/**
	 * Apply "placeholder" attribute polyfill to one or more forms.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.placeholder = function() {

		// Browser natively supports placeholders? Bail.
		if (typeof(document.createElement('input')).placeholder != 'undefined')
			return $(this);

		// No elements?
		if (this.length == 0)
			return $this;

		// Multiple elements?
		if (this.length > 1) {

			for (var i = 0; i < this.length; i++)
				$(this[i]).placeholder();

			return $this;

		}

		// Vars.
		var $this = $(this);

		// Text, TextArea.
		$this.find('input[type=text],textarea')
			.each(function() {

				var i = $(this);

				if (i.val() == '' || i.val() == i.attr('placeholder'))
					i
					.addClass('polyfill-placeholder')
					.val(i.attr('placeholder'));

			})
			.on('blur', function() {

				var i = $(this);

				if (i.attr('name').match(/-polyfill-field$/))
					return;

				if (i.val() == '')
					i
					.addClass('polyfill-placeholder')
					.val(i.attr('placeholder'));

			})
			.on('focus', function() {

				var i = $(this);

				if (i.attr('name').match(/-polyfill-field$/))
					return;

				if (i.val() == i.attr('placeholder'))
					i
					.removeClass('polyfill-placeholder')
					.val('');

			});

		// Password.
		$this.find('input[type=password]')
			.each(function() {

				var i = $(this);
				var x = $(
					$('<div>')
					.append(i.clone())
					.remove()
					.html()
					.replace(/type="password"/i, 'type="text"')
					.replace(/type=password/i, 'type=text')
				);

				if (i.attr('id') != '')
					x.attr('id', i.attr('id') + '-polyfill-field');

				if (i.attr('name') != '')
					x.attr('name', i.attr('name') + '-polyfill-field');

				x.addClass('polyfill-placeholder')
					.val(x.attr('placeholder')).insertAfter(i);

				if (i.val() == '')
					i.hide();
				else
					x.hide();

				i
					.on('blur', function(event) {

						event.preventDefault();

						var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

						if (i.val() == '') {

							i.hide();
							x.show();

						}

					});

				x
					.on('focus', function(event) {

						event.preventDefault();

						var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

						x.hide();

						i
							.show()
							.focus();

					})
					.on('keypress', function(event) {

						event.preventDefault();
						x.val('');

					});

			});

		// Events.
		$this
			.on('submit', function() {

				$this.find('input[type=text],input[type=password],textarea')
					.each(function(event) {

						var i = $(this);

						if (i.attr('name').match(/-polyfill-field$/))
							i.attr('name', '');

						if (i.val() == i.attr('placeholder')) {

							i.removeClass('polyfill-placeholder');
							i.val('');

						}

					});

			})
			.on('reset', function(event) {

				event.preventDefault();

				$this.find('select')
					.val($('option:first').val());

				$this.find('input,textarea')
					.each(function() {

						var i = $(this),
							x;

						i.removeClass('polyfill-placeholder');

						switch (this.type) {

							case 'submit':
							case 'reset':
								break;

							case 'password':
								i.val(i.attr('defaultValue'));

								x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

								if (i.val() == '') {
									i.hide();
									x.show();
								} else {
									i.show();
									x.hide();
								}

								break;

							case 'checkbox':
							case 'radio':
								i.attr('checked', i.attr('defaultValue'));
								break;

							case 'text':
							case 'textarea':
								i.val(i.attr('defaultValue'));

								if (i.val() == '') {
									i.addClass('polyfill-placeholder');
									i.val(i.attr('placeholder'));
								}

								break;

							default:
								i.val(i.attr('defaultValue'));
								break;

						}
					});

			});

		return $this;

	};

	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * @param {jQuery} $elements Elements (or selector) to move.
	 * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
	 */
	$.prioritize = function($elements, condition) {

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
		if (typeof $elements != 'jQuery')
			$elements = $($elements);

		// Step through elements.
		$elements.each(function() {

			var $e = $(this),
				$p,
				$parent = $e.parent();

			// No parent? Bail.
			if ($parent.length == 0)
				return;

			// Not moved? Move it.
			if (!$e.data(key)) {

				// Condition is false? Bail.
				if (!condition)
					return;

				// Get placeholder (which will serve as our point of reference for when this element needs to move back).
				$p = $e.prev();

				// Couldn't find anything? Means this element's already at the top, so bail.
				if ($p.length == 0)
					return;

				// Move element to top of parent.
				$e.prependTo($parent);

				// Mark element as moved.
				$e.data(key, $p);

			}

			// Moved already?
			else {

				// Condition is true? Bail.
				if (condition)
					return;

				$p = $e.data(key);

				// Move element back to its original location (using our placeholder).
				$e.insertAfter($p);

				// Unmark element as moved.
				$e.removeData(key);

			}

		});

	};

})(jQuery);

var background = (function() {
	$('.flexslider').flexslider(
		{
			controlNav: false,
			directionNav: false,
			randomize: true
		}
	);
})();

/*
	keyboard.js
	Manages keyboard shortcuts
*/

var keyboard = (function() {

    $(document).keyup(function(e) {
    	// escape key
        if (e.keyCode == 27) {
            search.toggleSearch('hide');
        }

        else if (e.keyCode == 191) {
            search.toggleSearch('show');
        }

    });

})(search);

var init = (function() {

	navigation.buildNavigation('#menu');

})();