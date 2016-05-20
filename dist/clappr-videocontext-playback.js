(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"), require("VideoContext"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr", "VideoContext"], factory);
	else if(typeof exports === 'object')
		exports["ClapprVideoContextPlayback"] = factory(require("Clappr"), require("VideoContext"));
	else
		root["ClapprVideoContextPlayback"] = factory(root["Clappr"], root["VideoContext"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _clappr=__webpack_require__(1);var _videocontext=__webpack_require__(2);var _videocontext2=_interopRequireDefault(_videocontext);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var VideoContextPlayback=function(_Playback){_inherits(VideoContextPlayback,_Playback);_createClass(VideoContextPlayback,[{key:'name',get:function get(){return 'video_context_playback';}}]);function VideoContextPlayback(options){_classCallCheck(this,VideoContextPlayback);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(VideoContextPlayback).call(this,options));_this._context=options.src;_this._lastTimeOnCheck=null;_this._lastDurationOnCheck=null;_this.$el.css({position:"absolute",top:0,bottom:0,left:0,right:0});_this.$el.append(_this._context.canvas);(0,_clappr.$)(_this._context._canvas).css({width:"100%",height:"100%"});_this._updateTimer=setInterval(function(){_this._update();},100);_this.settings={default:['seekbar'],left:["playpause","position","duration"],right:["fullscreen"],seekEnabled:true};_this.trigger(_clappr.Events.PLAYBACK_SETTINGSUPDATE);_this.trigger(_clappr.Events.PLAYBACK_READY,_this.name);options.autoPlay&&_this.play();return _this;}_createClass(VideoContextPlayback,[{key:'play',value:function play(){this._context.play();this.trigger(_clappr.Events.PLAYBACK_PLAY);}},{key:'pause',value:function pause(){this._context.pause();this.trigger(_clappr.Events.PLAYBACK_PAUSE);}},{key:'seek',value:function seek(time){this._context.currentTime=time;}},{key:'seekPercentage',value:function seekPercentage(percentage){this._context.currentTime=this._context.duration*(percentage/100);}},{key:'getDuration',value:function getDuration(){return this._context.duration;}},{key:'isPlaying',value:function isPlaying(){ // TODO add public method to videocontext
	return this._context.state===_videocontext2.default.STATE.PLAYING;}},{key:'isHighDefinitionInUse',value:function isHighDefinitionInUse(){return false;}},{key:'stop',value:function stop(){this._context.pause();this._context.currentTime=0;this.trigger(_clappr.Events.PLAYBACK_STOP);}},{key:'getPlaybackType',value:function getPlaybackType(){ // TODO is this live or vod?
	return _clappr.Playback.VOD;}},{key:'destroy',value:function destroy(){clearInterval(this._updateTimer);}},{key:'_update',value:function _update(){var changed=false;if(this._context.duration!==this._lastDurationOnCheck){changed=true;this._lastDurationOnCheck=this._context.duration;}if(this._context.currentTime!==this._lastTimeOnCheck){changed=true;this._lastTimeOnCheck=this._context.currentTime;}changed&&this.trigger(_clappr.Events.PLAYBACK_TIMEUPDATE,{current:this._context.currentTime,total:this._context.duration},this.name);}},{key:'isReady',get:function get(){return true;}}]);return VideoContextPlayback;}(_clappr.Playback);exports.default=VideoContextPlayback;VideoContextPlayback.canPlay=function(resource){return resource instanceof _videocontext2.default;};module.exports=exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;