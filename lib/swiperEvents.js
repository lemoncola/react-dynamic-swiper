'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPropTypes = exports.events = undefined;

var _react = require('react');

var events = exports.events = ['onInit', 'onSlideChangeStart', 'onSlideChangeEnd', 'onSlideNextStart', 'onSlideNextEnd', 'onSlidePrevStart', 'onSlidePrevEnd', 'onTransitionStart', 'onTransitionEnd', 'onTouchStart', 'onTouchMove', 'onTouchMoveOpposite', 'onSliderMove', 'onTouchEnd', 'onClick', 'onTap', 'onDoubleTap', 'onImagesReady', 'onProgress', 'onReachBeginning', 'onReachEnd', 'onDestroy', 'onSetTranslate', 'onSetTransition', 'onAutoplay', 'onAutoplayStart', 'onAutoplayStop', 'onLazyImageLoad', 'onLazyImageReady', 'onPaginationRendered'];

var EventPropTypes = exports.EventPropTypes = events.reduce(function (obj, event) {
  obj[event] = _react.PropTypes.func;
  return obj;
}, {});