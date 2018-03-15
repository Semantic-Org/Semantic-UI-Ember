!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(e){function n(e){return t.raw?e:encodeURIComponent(e)}function o(e){return t.raw?e:decodeURIComponent(e)}function i(n,o){var i=t.raw?n:function(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"))
try{return e=decodeURIComponent(e.replace(r," ")),t.json?JSON.parse(e):e}catch(e){}}(n)
return e.isFunction(o)?o(i):i}var r=/\+/g,t=e.cookie=function(r,c,u){if(void 0!==c&&!e.isFunction(c)){if("number"==typeof(u=e.extend({},t.defaults,u)).expires){var f=u.expires,a=u.expires=new Date
a.setTime(+a+864e5*f)}return document.cookie=[n(r),"=",function(e){return n(t.json?JSON.stringify(e):String(e))}(c),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}for(var d=r?void 0:{},p=document.cookie?document.cookie.split("; "):[],s=0,m=p.length;m>s;s++){var x=p[s].split("="),v=o(x.shift()),k=x.join("=")
if(r&&r===v){d=i(k,c)
break}r||void 0===(k=i(k))||(d[v]=k)}return d}
t.defaults={},e.removeCookie=function(n,o){return void 0!==e.cookie(n)&&(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}})
