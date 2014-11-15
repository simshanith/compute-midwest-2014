define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (paths, voidLink) {
function pagevar(key, value) { var undef; return (value===undef) ? locals[key] || null : locals[key] = value; }
paths = pagevar('paths') || {};
voidLink = 'javascript:void(0);'







































}.call(this,"paths" in locals_for_with?locals_for_with.paths:typeof paths!=="undefined"?paths:undefined,"voidLink" in locals_for_with?locals_for_with.voidLink:typeof voidLink!=="undefined"?voidLink:undefined));;return buf.join("");
}

});