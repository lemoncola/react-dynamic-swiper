'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SwiperLib = require('./SwiperLib');

var _SwiperLib2 = _interopRequireDefault(_SwiperLib);

var _Slide = require('./Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _swiperEvents = require('./swiperEvents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoolOrElementType = _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element]);

var Swiper = function (_Component) {
  _inherits(Swiper, _Component);

  function Swiper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Swiper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this._swiper = null, _this._nextButton = null, _this._prevButton = null, _this._pagination = null, _this._scrollBar = null, _this._container = null, _this._slidesCount = 0, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Swiper, [{
    key: '_initSwiper',


    /**
     * Initialize Swiper instance.
     * @private
     */
    value: function _initSwiper() {
      var _this2 = this;

      var _props = this.props;
      var swiperOptions = _props.swiperOptions;
      var navigation = _props.navigation;
      var pagination = _props.pagination;
      var scrollBar = _props.scrollBar;
      var onInitSwiper = _props.onInitSwiper;

      var opts = {};

      if (pagination) opts.pagination = this._pagination;
      if (scrollBar) opts.scrollBar = this._scrollbar;
      if (navigation) {
        opts.prevButton = this._prevButton;
        opts.nextButton = this._nextButton;
      }

      this._swiper = new _SwiperLib2.default(this._container, _extends(opts, swiperOptions));

      this._swiper.on('onSlideChangeEnd', function () {
        var activeSlide = _this2._getSlideChildren()[_this2._swiper.activeIndex];
        if (activeSlide && activeSlide.props.onActive) {
          activeSlide.props.onActive(_this2._swiper);
        }
      });

      this._delegateSwiperEvents();
      onInitSwiper(this._swiper);
    }

    /**
     * Delegates all swiper events to event handlers passed in props.
     * @private
     */

  }, {
    key: '_delegateSwiperEvents',
    value: function _delegateSwiperEvents() {
      var _this3 = this;

      _swiperEvents.events.forEach(function (event) {
        _this3._swiper.on(event, function () {
          if (this.props[event] && typeof this.props[event] === 'function') {
            this.props[event].apply(null, arguments);
          }
        }.bind(_this3));
      });
    }

    /**
     * Filter out non-Slide children.
     * @private
     * @param {?Array<Element>} Children Child elements, if omitted uses own children.
     * @return {Array}
     */

  }, {
    key: '_getSlideChildren',
    value: function _getSlideChildren(children) {
      children = children || this.props.children;
      return _react.Children.toArray(children).filter(function (child) {
        return child.type === _Slide2.default;
      });
    }

    /**
     * Render an optional element. If predicate is false returns `null`, if true
     * renders a cloned `node` (if truthy), or a `div` with the given `className`.
     * @private
     * @param  {Boolean}  predicate Should render?
     * @param  {String}   className Classname for `div`
     * @param  {Function} refFn     Function for `ref` of cloned `node` or `div`
     * @param  {Element}  node      Optional element.
     * @return {Element}
     */

  }, {
    key: '_renderOptional',
    value: function _renderOptional(predicate, className, refFn, node) {
      if (!predicate) return null;
      if (node) return _react2.default.cloneElement(node, { ref: refFn });
      return _react2.default.createElement('div', { className: className, ref: refFn });
    }

    /**
     * Determines whether `swiper` should be re-initialized, or not, based on
     * `prevProps`.
     * @private
     * @param  {Object} prevProps Previous props.
     * @return {Boolean}
     */

  }, {
    key: '_shouldReInitialize',
    value: function _shouldReInitialize(prevProps) {
      return !(0, _deepEqual2.default)(prevProps.swiperOptions, this.props.swiperOptions) || prevProps.navigation !== this.props.navigation || prevProps.nextButton !== this.props.nextButton || prevProps.prevButton !== this.props.prevButton || prevProps.pagination !== this.props.pagination || prevProps.scrollBar !== this.props.scrollBar;
    }

    /**
     * Access internal Swiper instance.
     * @return {Swiper}
     */

  }, {
    key: 'swiper',
    value: function swiper() {
      return this._swiper;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initSwiper();
      this._slidesCount = this._getSlideChildren().length;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._swiper.destroy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var shouldReInitialize = this._shouldReInitialize(prevProps);
      var nextSlidesCount = this._getSlideChildren().length;

      if (shouldReInitialize) {
        this._slidesCount = nextSlidesCount;
        this._swiper.destroy(true, true);
        return this._initSwiper();
      }

      if (nextSlidesCount !== this._slidesCount) {
        this.swiper().update();
        this._slidesCount = nextSlidesCount;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props;
      var className = _props2.className;
      var wrapperClassName = _props2.wrapperClassName;
      var pagination = _props2.pagination;
      var navigation = _props2.navigation;
      var prevButton = _props2.prevButton;
      var nextButton = _props2.nextButton;
      var scrollBar = _props2.scrollBar;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('swiper-container', className),
          ref: function ref(node) {
            return _this4._container = node;
          }
        },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('swiper-wrapper', wrapperClassName) },
          this._getSlideChildren()
        ),
        this._renderOptional(pagination, 'swiper-pagination', function (node) {
          return _this4._pagination = node;
        }, typeof pagination === 'boolean' ? false : pagination),
        this._renderOptional(navigation, 'swiper-button-prev', function (node) {
          return _this4._prevButton = node;
        }, prevButton),
        this._renderOptional(navigation, 'swiper-button-next', function (node) {
          return _this4._nextButton = node;
        }, nextButton),
        this._renderOptional(scrollBar, 'swiper-scrollbar', function (node) {
          return _this4._scrollBar = node;
        }, typeof scrollBar === 'boolean' ? false : scrollBar)
      );
    }
  }]);

  return Swiper;
}(_react.Component);

Swiper.propTypes = _extends({
  wrapperClassName: _react.PropTypes.string,
  swiperOptions: _react.PropTypes.object,
  navigation: _react.PropTypes.bool,
  prevButton: _react.PropTypes.element,
  nextButton: _react.PropTypes.element,
  pagination: BoolOrElementType,
  scrollBar: BoolOrElementType,
  onInitSwiper: _react.PropTypes.func
}, _swiperEvents.EventPropTypes);
Swiper.defaultProps = {
  swiperOptions: {},
  navigation: true,
  pagination: true,
  scrollBar: false,
  onInitSwiper: function onInitSwiper() {}
};
exports.default = Swiper;