require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var templatesCacheLoader = '<a class="compoent m-<@= type @> goods <@= special.direction @>" href="<@= content.goodsUrl @>" target="_blank"><img src="<@= content.picUrl @>" alt="<@= content.title @>"><div class="info"><div class="info-text"><h4 data-text-key="content.title"><@= content.title @></h4><p data-text-key="content.price"><@= content.price @></p></div><span>立即购买</span></div></a>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['tpl/goods'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/goods", [], function () {
          return templatesCacheLoader;
      });
  }
})();
},{}],2:[function(require,module,exports){
(function() {
  var templatesCacheLoader = '<section class="phone-page" data-animate="<@= aniName @>"></section>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['tpl/page'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/page", [], function () {
          return templatesCacheLoader;
      });
  }
})();
},{}],3:[function(require,module,exports){
(function() {
  var templatesCacheLoader = '<a class="picture compoent" href="<@=content.url || \'javascript:void(0)\'@>"><div class="clip-box-wrapper"><div class="img-clip-box"><div class="thumb-box"></div></div></div><div class="img-mask"><img class="real-img" src=""/></div></a>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['tpl/picture'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/picture", [], function () {
          return templatesCacheLoader;
      });
  }
})();
},{}],4:[function(require,module,exports){
(function() {
  var templatesCacheLoader = '<a class="compoent m-<@= type @> <@= special.direction @>" href="<@= content.url || \'javascript:void(0)\' @>" target="_blank"><div data-text-key="content.text" class="tag-text"><span><@= content.text @></span></div><i class="iconfont icon-add ball-scale-multiple"><div></div><div></div><div></div></i></a>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['tpl/tag'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/tag", [], function () {
          return templatesCacheLoader;
      });
  }
})();
},{}],5:[function(require,module,exports){
(function() {
  var templatesCacheLoader = '<a class="compoent m-<@= type @>" target="_blank" href="<@= content.href || \'javascript:void(0)\' @>"><pre data-text-key="content.text"><@= content.text @></pre></a>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['tpl/text'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/text", [], function () {
          return templatesCacheLoader;
      });
  }
})();
},{}],6:[function(require,module,exports){
var CustomEvents = require('./events');
var broadcast = new CustomEvents();
module.exports = broadcast;

},{"./events":9}],7:[function(require,module,exports){
/* jshint ignore:start */
var empty = new Function();
var el = {
    hide: empty,
    show: empty,
    append: empty,
    hasClass: empty,
    remove: empty
};
var Base = {
    "$el": el,
    _hidden: false,
    // enable: function () {
    //     this.$el.show();
    //     return this;
    // },
    // disable: function () {
    //     this.$el.hide();
    //     return this;
    // },
    append: function (ctrs, prepend) {
        var i, len, ctr;
        if (Object.prototype.toString.call(ctrs) === '[object Array]') {
            for (i = 0, len = ctrs.length; i < len; i++) {
                ctr = ctrs[i];
                this._append(ctr, prepend);
            }
        }
        else {
            this._append(ctrs, prepend);
        }
        return this;
    },
    _append: function (ctr, prepend) {
        var method = prepend ? 'prepend' : 'append';
        this.$el[method](ctr.$el);
    },
    appendTo: function (ctr) {
        if (ctr.find) { //ctr == jq/zepto obj
            ctr.append(this.$el);
        }
        else if (ctr.append){ // ctr is controller
            ctr.append(this);
        }
        if (this.$el.hasClass('none')) {
            this.hide();
        }
        return this;
    },
    prependTo: function (ctr) {
        if (ctr.find) { //ctr == jq/zepto obj
            ctr.prepend(this.$el);
        }
        else if (ctr.append){ // ctr is controller
            ctr.append(this, true);
        }
        if (this.$el.hasClass('none')) {
            this.hide();
        }
        return this;
    },
    show: function () {
        if (this._hidden) {
            this.$el.removeClass('none');
            this._hidden = false;
        }
        return this;
    },
    hide: function () {
        if (!this._hidden) {
            this.$el.addClass('none');
            this._hidden = true;
        }
        return this;
    },
    remove: function () {
        if (this.$el) {
            this.$el.remove();
        }
    },
    dispose: function () {
        var name;
        this.fire('disposing');
        if (this.$el) {
            this.$el.remove();
        }
        for (name in this) {
            delete this[name];
        }
    },
    commonUpdate: function (modifyData) {
        var self = this;
        Object.keys(modifyData).forEach(function (key) {
            self.$el.find('[data-text-key="'+ key +'"]').text(modifyData[key]);
            self.$el.find('[data-key="'+ key +'"]').val(modifyData[key]);
        });
    },
    tmplMap: {},
    _template: function (tpl, obj) {
        if (!this.tmplMap[tpl]) {
            this.tmplMap[tpl] = _.template(tpl);
        }
        return this.tmplMap[tpl](obj);
    }
};
Base = $.extend({}, require('./events').prototype, Base);
module.exports = Base;
/* jshint ignore:start */

},{"./events":9}],8:[function(require,module,exports){
/* jshint ignore:start */
function Wrapper (id) {
    var ele = document.getElementById(id);
    this.length = 1;
    this.context = ele;
    this[0] = ele;
}

Wrapper.prototype = {
    constructor: Wrapper.constructor,
    getComputedStyle: function () {
        if ('getComputedStyle' in window) {
            return window.getComputedStyle(this.context);
        }
        else if ('currentStyle' in this.context) {
            return this.context.currentStyle;
        }
    },
    width: function () {
        var width = this.getComputedStyle().width;

        return parseInt(width, 10);
    },
    splice: function () {

    },
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    inArray: function (target, arr) {
        if (this.isArray(arr)) {
            if (arr.indexOf) {
                return arr.indexOf(target);
            }
            else {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] === target) {
                        return i;
                    }
                }
                return -1;
            }
        }
    },
    // on: function (type, func) {
    //     var ele = this[0];
    //     if (ele.addEventListener) {
    //         ele.addEventListener(type, func, false);
    //     }
    //     else {
    //         ele.attachEvent(type, function(evt) {
    //             func.call(ele, evt);
    //         });
    //     }
    // },
    each: function (func) {
        dependence.each({0: this[0]}, func);
    }
}


function dependence (idSel) {
    var id = idSel.substring(1);
    return new Wrapper(id);
}

var extend = function (isDepth, target) {
    var targetIdx = 1, args;

    args = Array.prototype.slice.call(arguments);

    if (Object.prototype.toString.call(isDepth) !== '[object Boolean]') {
        target = isDepth;
        targetIdx = 0;
    }

    for (var i = targetIdx + 1, len = args.length, obj; i < len; i++) {
        obj = args[i];
        for (var name in obj) {
            target[name] = obj[name];
        }
    }
    return target;
};

dependence.extend = extend;

class2type = {};

function type(obj) {
    return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
}

dependence.extend(dependence, {
    fn: Wrapper.prototype,
    // ajax: function (url, opts) {
    //     if (arguments.length == 1) {
    //         opts = url;
    //     }
    //     throw "not implemented yet!!!";
    // }
    each: function (arr, func) {
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            for (var i = 0, len = arr.length; i < len; i++) {
                func(i, arr[i]);
            }
        }
        else {
            for (var name in arr) {
                func(name, arr[name]);
            }
        }
    },
    isFunction: function(value) { return type(value) == "function" }
});

if (!Function.prototype.bind) {
    var Empty = function () {};
    var _Array_slice_ = Array.prototype.slice;

    Function.prototype.bind = function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (typeof target != 'function') {
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = _Array_slice_.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(_Array_slice_.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(_Array_slice_.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push("$" + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function("binder", "return function (" + boundArgs.join(",") + "){return binder.apply(this,arguments)}")(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    };
}

if (window.jQuery) {
    module.exports = window.jQuery;
}
else if (window.zepto) {
    module.exports = window.zepto;
}
else {
    module.exports = dependence;
}
/* jshint ignore:end*/

},{}],9:[function(require,module,exports){
var $ = require('./dep');

var guid = 1e6;

function CustomEvents () {
}

$.extend(CustomEvents.prototype, {
    _checkListener: function (listeners, func) {
        var listener, len;

        if (!listeners) {
            return -1;
        }

        len = listeners.length;
        if (listeners.indexOf) {
            return listeners.indexOf(func);
        }
        else {
            while (listener = listeners[--len]) {
                if (listener == func) {
                    return len;
                }
            }
        }
        return -1;
    },
    on: function (type, func) {
        var listeners, listener, len;
        if (typeof func != 'function') {
            return this;
        }
        if (!this.__listeners) {
            this.__listeners = {};
        }
        if (!this.__listeners[type]) {
            this.__listeners[type] = [];
        }

        listeners = this.__listeners[type];
        if (this._checkListener(listeners, func) == -1) {
            listeners.push(func);
        }
        return this;
    },
    off: function (type, func) {
        var listeners, listener, idx;

        if (this.__listeners) {
            listeners = this.__listeners[type];
        }

        if ( (idx = this._checkListener(listeners, func)) != -1 ) {
            listeners[idx] = null;
        }

        if (func === true) {
            delete this.__listeners[type];
        }
        return this;
    },
    fire: function (type) {
        var args, len, listener, listeners, i = 0;
        if (!(listeners = this.__listeners && this.__listeners[type]) || !listeners.length) {
            return ;
        }

        args = Array.prototype.slice.call(arguments, 1);
        for (len = listeners.length; i < len; i++) {
            listener = listeners[i];
            if (listener === null) {
                listeners.splice(i, 1);
                len = listeners.length;
                i--;
            }
            else {
                listener.apply(this, args);
            }
        }
    },
    _guid: function () {
        return 'mvc' + guid++;
    },
    dispose: function () {
        var name;
        this.fire('disposing');

        for (name in this) {
            this[name] = null;
            delete this[name];
        }
    }
});

module.exports = CustomEvents;
},{"./dep":8}],10:[function(require,module,exports){
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

Object.isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};
var helper = {

	/**
	* [扁平化data]
	* @param  {[plainObject]} data [description]
	* @return {[plainObject]}      [description]
	* e.g: {"person": {"name": 1}} ---> {"person.name": 1};
	* 	   {"array": [{"name":'xx'},{"name":"dd"}]} ---> {array[0].name: 'xx', array[1].name: 'dd'}
	*/
	flatData: function (data) {
		var result = {};
		function recurse (cur, prop) {
			if (Object(cur) !== cur) {
				result[prop] = cur;
			} else if (Array.isArray(cur)) {
				for(var i=0, l=cur.length; i<l; i++)
					recurse(cur[i], prop + "[" + i + "]");
				if (l === 0)
					result[prop] = [];
			} else {
				var isEmpty = true;
				for (var p in cur) {
					isEmpty = false;
					recurse(cur[p], prop ? prop+"."+p : p);
				}
				if (isEmpty && prop)
					result[prop] = {};
			}
		}
		recurse(data, "");
		return result;
	},
	/**
	 * [重新构造data]
	 * @param  {[flatData]} data [description]
	 * @return {[plainObject]}      [description]
	 */
	unflatData: function (data) {
		if (Object(data) !== data || Array.isArray(data))
			return data;
		var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
		resultholder = {};
		for (var p in data) {
			var cur = resultholder,
			prop = "",
			m;
			while (m = regex.exec(p)) {
				cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
				prop = m[2] || m[1];
			}
			cur[prop] = data[p];
		}
		return resultholder[""] || resultholder;
	}
};

module.exports = helper;
window.helper = window.helper ? $.extend(window.helper, helper) : helper;
},{}],11:[function(require,module,exports){
var events = require('./events');
var helper = require('./helper');

function baseGetter (propName) {
    return this._propVal[propName];
}

function baseSetter (propName, val) {
    //support multiValueUpdate Update
    var pre, isValid = false;
    if (Array.isArray(val) || $.isPlainObject(val)) {
        pre = $.extend(true, {}, this._propVal[propName]);
        this._propVal[propName] ? $.extend(true, this._propVal[propName], helper.unflatData(val)): this._propVal[propName] = val;
        isValid = true
        // return true;
    } else {
        if (this._propVal[propName] !== val) {
            pre = this._propVal[propName];
            this._propVal[propName] = val;
            isValid = true;
            // return true;
        }
    }
    if (isValid) {
        this._prePropVal[propName] = pre;
    }
    return isValid;
}


var baseModel = {
    _prop: function (propName, defaultVal, opts) {
        if (!this._propVal) {
            this._propVal = {};
            this._prePropVal = {};
        }

        this[propName] = function (val) {
            if (typeof val == 'undefined') {
                console.assert(this[propName], propName);
                return this[propName].getter.call(this, propName);
            }
            else {
                if (this[propName].setter.call(this, propName, val)) {
                    this.fire(propName + 'Updated', val, this._prePropVal[propName], propName);
                }
                return this;
            }
        };

        this[propName].getter = opts && typeof opts.getter == 'function' ? opts.getter : baseGetter;
        this[propName].setter = opts && typeof opts.setter == 'function' ? opts.setter : baseSetter;

        if (typeof defaultVal !== 'undefined') {
            this[propName].setter.call(this, propName, defaultVal);
        }

        // this[propName].toString = function () {
        //     return this[propName].getter.call(this, propName);
        // }.bind(this);
    },
    setData: function (fieldArr, datas, alias) {
        alias = alias || {};
        for (var i = 0, len = fieldArr.length, name, data; i < len; i++) {
            name = fieldArr[i];
            if ((data = datas[alias[name] || name]) !== undefined) {
                if (typeof this[name] === 'function') {
                    this[name](data);
                }
                else {
                    this[name] = data;
                }
            }
        }
    }
};

$.extend(baseModel, events.prototype);

module.exports = baseModel;

},{"./events":9,"./helper":10}],12:[function(require,module,exports){
var service = {
    injector: [],
    type: 'ajax',
    init: function (type) {
        return this.setType(type);
    },
    setType: function (type) {
        if (this.type != type) {
            this.type = type;
        }
        return this;
    },
    addInjectRule: function (func) {
        if (typeof func == 'function') {
            this.injector.push(func);
        }
    },
    sendRequest: function (requestObj) {
        var i, len;

        for (i = 0, len = this.injector.length; i < len; i++) {
            this.injector[i](requestObj);
        }

        return this[this.type](requestObj);
    },
    ajax: function (requestObj) {
        return $.ajax(requestObj);
    },
    mtop: function (requestObj) {
        var pro = new $.Deferred(),
            version = requestObj.v;

        lib.mtop.request({
            type: requestObj.type || 'GET',
            api: requestObj.url,
            v: version,
            data: requestObj.data,
            isSec: 1,
            ecode: 1,
        }, this._successHandler(pro), this._failHandler(pro));

        return pro.promise();
    },
    _successHandler: function (pro) {
        return function (resJson, retType) {
            try {
                if (!resJson.ret) {
                    resJson = JSON.parse(resJson);
                }
                service._fullfilledPro(pro, resJson.data);
            }
            catch(e) {
                service._failPro(pro);
            }

            pro = null;
        };
    },
    _failHandler: function (pro) {
        return function (resJson, retType) {
            var error = resJson.ret[0].split('::'),
                errorCode = error[0],
                errorMsg = error[1];

            // alert(error);
            if (errorCode == 'FAIL_SYS_SESSION_EXPIRED') {
                location.href = '//login.waptest.taobao.com/login.htm';
            }

            service._failPro(pro, {
                code: errorCode,
                msg: errorMsg
            });

            pro = null;
        };
    },
    _failPro: function (pro, data) {
        pro.reject(data);
    },
    _fullfilledPro: function (pro, data) {
        pro.resolve(data);
    }
};

module.exports = service;
},{}],13:[function(require,module,exports){
var resetViewport = require('./../../mod/renderer/resetViewport'),
  SlidePage = require('./../../mod/slide/slide')

var entry = {
  init: function() {
    // 编辑器里展现部分的待加载的图片总数（不包括H5编辑器里最后一页店铺名片页的图片）
    this.imgNum = 0
    this.loadedImgNum = 0
    resetViewport('#wrap')
    this._render()
  },
  getFragment: function() {
    // 给直出html和json解析2种方案的业务逻辑自己填充
  },
  // 如果采用服务器端parse json数据生成html，则_render方法侏罗纪不需要执行，可以修改逻辑
  _render: function() {
    // 下面documentfragment是phone-page的父节点
    var $fragment = this.getFragment(),
      bgImgArr = [],
      self = this

    $fragment.children().each(function(k, v) {
      var $phonePage = $(v),
        bgImg = $phonePage.css('background-image').match(/url\((\S+)\)/)
      // match后如果是null，转为''，如果有值，获取匹配
      bgImg = bgImg ? bgImg[1] : ''

      self.imgNum += $phonePage.find('img').not('[src=""]').length
      // 记录css background-image是否加载完
      if (bgImg) {
        // 需要监测加载情况的图片+1
        self.imgNum++
        bgImgArr.push(bgImg)
      }
    })

    // 插入真实dom、背景图片预加载操作都必须最后统一执行
    bgImgArr.forEach(function(v, k) {
      $('<img>').attr('src', v).on('load', self._updateImgLoadStatus)
    })
    $('#wrap').append($fragment).find('img').on('load', self._updateImgLoadStatus)

    // 插入其他额外元素,比如H5编辑器特有的最后一页店铺名片页
    this.appendExtraPage && this.appendExtraPage()
  },
  _updateImgLoadStatus: function(img) {
    // console.log(app.loadedImgNum + '  /  ' +app.imgNum)
    if (app.loadCompleted) return
    app.loadedImgNum++
    var progress = Math.round(app.loadedImgNum / app.imgNum * 100) + '%',
      tid
    $('#J_progress').html(progress)
    if (app.loadedImgNum >= app.imgNum) {
      app.loadCompleted = true
      tid = setTimeout(function(){
        $('#J_loading').hide()
        // 启动翻页组件
        app._initPageSlide()
        clearTimeout(tid)
      }, 200)  // 只是改善体验而已=，=
    }
  },
  _initPageSlide: function() {
    var slide = new SlidePage({
      container: "#wrap"
    })

    slide.enable()
  }
}
module.exports = entry;

},{"./../../mod/renderer/resetViewport":29,"./../../mod/slide/slide":30}],"j/aKKu":[function(require,module,exports){
var factory = require('./../../mod/elements/factory'),
  entry = require('./entry'),
  lastpage = require('./lastpage.json')

console.log(lastpage)
entry.getFragment = function() {
  return factory.parse(window.data)
}
entry.appendExtraPage = function() {
  var $lastPageFragment = factory.parse(lastpage)
  $('#wrap').append($lastPageFragment.$el)
}

module.exports = entry

},{"./../../mod/elements/factory":20,"./entry":13,"./lastpage.json":16}],"h5render_rawjson":[function(require,module,exports){
module.exports=require('j/aKKu');
},{}],16:[function(require,module,exports){
module.exports={
  type: 'page',
  aniName: 'slideUp',
  styles: {
    backgroundImage: 'https://img.alicdn.com/tps/TB1QUm_IFXXXXbCXXXXXXXXXXXX.png'
  },
  elements: [
    {
      type: 'picture',
      content: {
        picUrl: 'https://img.alicdn.com/bao/uploaded/T1u9YvFjFbXXb1upjX.jpg_q90.jpg',
        url: ''
      },
      styles: {
        top: 200,
        left: 140,
        aniName: 'rotateIn',
        delay: '0.5s',
        duration: '1.5s'
      },
      picStyles: {
        width: 40,
        height: 40,
      },
      mask: {
        width: 40,
        height: 40,
        top: 0,
        left: 0,
        type: 'circle'
      }
    },
    {
      type: 'text',
      content: {
        text: '123456',
        url: ''
      },
      styles: {
        color: '#ff5000',
        fontSize: '34px',
        textAlign: 'center',
        backgroundImage: 'https://img.alicdn.com/tps/TB1XSeQIFXXXXXoapXXXXXXXXXX.png',
        padding: '126px 268px',
        bottom: 20,
        left: 20,
        width: 280,
        height: 280,
        duration: '1s',
        aniName: 'fadeIn'
      }
    },
    {
      type: 'text',
      content: {
        text: '进入店铺 >',
        url: '',
      },
      styles: {
        fontSize: '16px',
        backgroundColor: '#b01b14',
        color: '#fff',
        bottom: 55,
        left: 94,
        width: 132,
        height: 38,
        lineHeight: '38px',
        textAlign: 'center',
        duration: '1s',
        aniName: 'fadeIn'
      }
    }
  ]
}

},{}],17:[function(require,module,exports){
var base = require('../../external/ctr'),
	broadcast = require('../../external/broadcast');
var formatter = require('./formatter');
function Element (eleModel) {
	this._init.apply(this, arguments);
}
var fn = $.extend(Element.prototype, base);
fn._init = function (model) {
	//abstract constructor has no parameters by default
	if (arguments.length === 0) {
		return;
	}
	this._id = this._guid();
	this.model = model;
	this.$el = $(this._template(this.tpl, model.data())).data('_id', model._id);
	this.init.apply(this, arguments);
	this._render();
	this._bindEvent();
	return this.$el;
};
fn.type = 'default';
fn.tpl = '<div></div>';
fn._render = function () {
	this._renderStyles();
	this.render();
};
fn._renderStyles = function () {
	var data = formatter.formatStyles(this.model.data().styles);
	this.$el.css(data);
};
fn._bindEvent = function () {
	var self = this;
	this.model.on('dataUpdated', function (modifyData) {
		self.commonUpdate(modifyData);
		var needRerenderStyle = Object.keys(modifyData).some(function (key) {
			return /styles/.test(key);
		});
		needRerenderStyle && self._renderStyles();
		self.update(modifyData);
	});

	this.model.on('disposing', function () {
		self.dispose();
	});

	this.model.on('newModel', function (model) {
		broadcast.fire('newCtr', self, model);
	});

	this.model.on('removeModel', function (model) {
		broadcast.fire('removeCtr', self, model);
	});
	this.bindEvent();
};
//Those method should be overriden if necessory
fn.init = function () {

};
fn.bindEvent = function () {

};
fn.render = function () {

};
fn.update = function () {

};
module.exports = Element;

},{"../../external/broadcast":6,"../../external/ctr":7,"./formatter":21}],18:[function(require,module,exports){
var base = require('../../external/ctr');

function Empty () {
    this.$el = $(document.createDocumentFragment());
}

$.extend(Empty.prototype, base);

module.exports = Empty;
},{"../../external/ctr":7}],19:[function(require,module,exports){
/* jshint ignore:start */
window.data = [
  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      backgroundImage: 'https://img.alicdn.com/tps/TB1xgYPIFXXXXXqXXXXXXXXXXXX.jpg',
      backgroundPosition: '0 165px'
    },
    elements: [
      {
        type: 'text',
        content: {
          text: '',
          url: '',
        },
        styles: {
          background: '#6b6ec8',
          padding: '0px',
          top: 25,
          left: 12,
          width: 6,
          height: 110,
          duration: '1s',
          aniName: 'slideInDown'
        }
      },
      {
        type: 'text',
        content: {
          text: '2015',
          url: '',
        },
        styles: {
          fontSize: '30px',
          lineHeight: 1,
          top: 30,
          left: 31,
          width: 250,
          height: 32,
          delay: '0.4s',
          duration: '1s',
          aniName: 'slideInDown'
        }
      },
      {
        type: 'text',
        content: {
          text: '春夏流行新品首发',
          url: '',
        },
        styles: {
          fontSize: '30px',
          lineHeight: 1,
          top: 69,
          left: 31,
          width: 250,
          height: 32,
          delay: '0.8s',
          duration: '1s',
          aniName: 'slideInDown'
        }
      },
      {
        type: 'text',
        content: {
          text: 'Fashion by asos',
          url: '',
        },
        styles: {
          fontSize: '24px',
          color: '#adadc1',
          lineHeight: 1,
          top: 109,
          left: 31,
          width: 250,
          height: 26,
          delay: '1.2s',
          duration: '1s',
          aniName: 'slideInDown'
        }
      }
    ]
  },
  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      backgroundImage: 'https://img.alicdn.com/tps/TB1u4CUIFXXXXa1aXXXXXXXXXXX.jpg'
    },
    elements: [
      {
        type: 'text',
        content: {
          text: '疯狂的印花\n不一样的美',
          url: '',
        },
        styles: {
          zIndex: 1,
          fontSize: '20px',
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '13px 0 15px 0',
          top: 0,
          left: 60,
          textAlign: 'center',
          width: 180,
          height: 75,
          duration: '1.5s',
          aniName: 'bounceInDown'
        }
      },
      {
        type: 'text',
        content: {
          text: '',
          url: '',
        },
        styles: {
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.8)',
          top: 220,
          left: 130,
          width: 170,
          height: 250,
          delay: '0.4s',
          duration: '1.5s',
          aniName: 'bounceInUp'
        }
      },
      {
        type: 'text',
        content: {
          text: '有灵气气质的菇凉看这里，阿凡达里众神祈祷的那一幕是不是历历在目，夜晚的森林小动物们跑出来嬉戏狂歌围绕在你身边歌唱颂诗你事森林的女儿，用夜做掩护尽情撒欢',
          url: '',
        },
        styles: {
          zIndex: 1,
          fontSize: '14px',
          lineHeight: 1.5,
          top: 280,
          left: 145,
          width: 140,
          height: 200,
          delay: '0.4s',
          duration: '1.5s',
          aniName: 'bounceInUp'
        }
      }
    ]
  },
  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      backgroundImage: 'https://img.alicdn.com/tps/TB1ytzvIFXXXXbFXVXXXXXXXXXX.jpg'
    },
    elements: [
      {
        type: 'text',
        content: {
          text: '',
          url: ''
        },
        styles: {
          background: 'rgba(255, 255, 255, 0.85)',
          bottom: 0,
          left: 0,
          width: 320,
          height: 150,
          delay: '0.5s',
          duration: '1s',
          aniName: 'fadeInUp'
        }
      },
      {
        type: 'text',
        content: {
          text: '美丽的印花搭配什么都很有气场，很好驾驭和搭配。款式廓形大方，版型舒适宽松，其搭配性，组合性以及可塑性，能在不同人中产生无穷的变化，让人一见倾心。让人一见倾心。',
          url: '',
        },
        styles: {
          fontSize: '14px',
          lineHeight: 1.5,
          top: 360,
          bottom: 30,
          left: 20,
          width: 280,
          height: 100,
          delay: '1s',
          duration: '1s',
          aniName: 'fadeInUp'
        }
      }
    ]
  },

  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      backgroundImage: 'https://img.alicdn.com/tps/TB1DlzBIFXXXXXVXFXXXXXXXXXX.jpg'
    },
    elements: [
    {
      type: 'text',
      content: {
        text: '',
        url: ''
      },
      styles: {
        background: '#ff5e5c',
        top: 0,
        left: 20,
        width: 80,
        height: 92,
        duration: '1s',
        aniName: 'slideInDown'
      }
    },
    {
      type: 'text',
      content: {
        text: 'WOMEN',
        url: ''
      },
      styles: {
        fontSize: '14px',
        color: '#fff',
        lineHeight: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        top: 35,
        left: 20,
        width: 80,
        height: 20,
        delay: '0.3s',
        duration: '1s',
        aniName: 'zoomIn'
      }
    },
    {
      type: 'text',
      content: {
        text: '女装新品',
        url: '',
      },
      styles: {
        fontSize: '14px',
        color: '#fff',
        lineHeight: 1,
        textAlign: 'center',
        top: 55,
        left: 20,
        width: 80,
        height: 20,
        delay: '0.6s',
        duration: '1s',
        aniName: 'zoomIn'
      }
    },
    {
      type: 'tag',
      special: {
        direction: 'left',
      },
      content: {
        text: '蝶绒休闲裤',
        url: 'http://www.taobao.com'
      },
      styles: {
        top: 70,
        left: 190,
        color: '#FFF',
        aniName: 'slideInRight',
        delay: '0.9s',
        duration: '1s'
      }
    },
    {
      type: 'tag',
      special: {
        direction: 'right',
      },
      content: {
        text: '个性牛皮女包'
      },
      styles: {
        top:290,
        left: 5,
        color: '#FFF',
        aniName: 'slideInLeft',
        delay: '0.6s',
        duration: '1s'
      }
    },
    {
      type: 'tag',
      special: {
        direction: 'right',
      },
      content: {
        text: '知性哈伦裤 ￥231'
      },
      styles: {
        top: 420,
        left: 80,
        color: '#FFF',
        aniName: 'slideInLeft',
        delay: '0.3s',
        duration: '1s'
      }
    }
    ]
  },
  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      background: '#fff'
    },
    elements: [
    {
      type: 'text',
      content: {
        text: '春夏印花系列',
        url: '',
      },
      styles: {
        fontSize: '20px',
        //color: '#FF0000',
        top: 10,
        left: 15,
        width: 150,
        height: 27,
        delay: '0s',
        duration: '1.5s',
        aniName: 'flipInY',

      }
    },
    {
      type: 'text',
      content: {
        text: '和春天来个约会',
        url: '',
      },
      styles: {
        fontSize: '15px',
        color: '#999',
        top: 35,
        left: 15,
        width: 150,
        height: 20,
        delay: '0.5s',
        duration: '1.5s',
        aniName: 'flipInY',

      }
    },
    {
      type: 'goods',
      special: {
        direction: 'right'
      },
      content: {
        title: '黑色酥胸衣',
        price: '￥125',
        picUrl: 'https://img.alicdn.com/tps/TB1QB6MIFXXXXblXXXXXXXXXXXX.jpg',
        goodsUrl: 'http://detail.tmall.com/item.htm?spm=a230r.1.14.4.KFR9bY&id=45035099196&ns=1&abbucket=8',
      },
      styles: {
        top: 70,
        left: 8,
        rotate: 0,
        aniName: 'zoomIn',
        duration: '1s'
      }
    },
    {
      type: 'goods',
      special: {
        direction: 'bottom'
      },
      content: {
        title: '花朵印花T恤',
        price: '￥215',
        picUrl: 'https://img.alicdn.com/tps/TB1QQLFIFXXXXaFXpXXXXXXXXXX.jpg',
        goodsUrl: 'https://item.taobao.com/item.htm?spm=a230r.1.14.30.Yk0NkP&id=520175799790&ns=1&abbucket=8#detail',
      },
      styles: {
        top: 50,
        left: 200,
        rotate: 0,
        aniName: 'zoomIn',
        delay: '0.3s',
        duration: '1s'
      }
    },
    {
      type: 'goods',
      special: {
        direction: 'right'
      },
      content: {
        title: '机器人斜挎包',
        price: '￥321',
        picUrl: 'https://img.alicdn.com/tps/TB1of6LIFXXXXb1XXXXXXXXXXXX.jpg',
        goodsUrl: 'https://item.taobao.com/item.htm?spm=a230r.1.14.258.QXTsY0&id=43146838673&ns=1&abbucket=8#detail',
      },
      styles: {
        top: 195,
        left: 8,
        rotate: 0,
        aniName: 'zoomIn',
        delay: '0.6s',
        duration: '1s'
      }
    },
    {
      type: 'goods',
      special: {
        direction: 'bottom'
      },
      content: {
        title: '时尚牛皮背包',
        price: '￥234',
        picUrl: 'https://img.alicdn.com/tps/TB1Qb2PIFXXXXXFXXXXXXXXXXXX.jpg',
        goodsUrl: 'https://item.taobao.com/item.htm?spm=a230r.1.14.359.ibidFi&id=520171484484&ns=1&abbucket=8#detail',
      },
      styles: {
        top: 320,
        left: 8,
        rotate: 0,
        aniName: 'zoomIn',
        delay: '0.9s',
        duration: '1s'
      }
    },
    {
      type: 'goods',
      special: {
        direction: 'bottom'
      },
      content: {
        title: '什么蝴蝶结',
        price: '￥98',
        picUrl: 'https://img.alicdn.com/tps/TB1fdTHIFXXXXbfXpXXXXXXXXXX.jpg',
        goodsUrl: 'https://item.taobao.com/item.htm?spm=a230r.1.14.359.ibidFi&id=520171484484&ns=1&abbucket=8#detail',
      },
      styles: {
        top: 320,
        left: 170,
        rotate: 0,
        aniName: 'zoomIn',
        delay: '1.2s',
        duration: '1.3s'
      }
    }
    ]
  },
  {
    type: 'page',
    aniName: 'slideUp',
    styles: {
      backgroundColor: 'red',
    },
    elements: [
    {
      type: 'goods',
      special: {
        direction: 'bottom'
      },
      content: {
        title: '这是一个商品',
        price: '2.00',
        picUrl: '',
        goodsUrl: '',
      },
      styles: {
        top:20,
        left: 200,
        rotate: 0,
        aniName: 'rotateIn',
        delay: '2s',
        duration: '10s'
      }
    },
    {
      type: 'picture',
      content: {
        picUrl: 'https://img.alicdn.com/tps/i4/TB11nqWIpXXXXbwXVXXSYoGNVXX-400-422.jpg',
        url: 'http://www.taobao.com'
      },
      styles: {
        top: 0,
        left: 0,
        rotate: 0,
        aniName: 'rotateIn',
        delay: '0s',
        duration: '3s'
      },
      picStyles: {
        width: 200,
        height: 211,
      },
      mask: {
        width: 50,
        height: 50,
        top: 9,
        left: 103,
        type: 'square'
      }
    },
    {
      type: 'picture',
      content: {
        picUrl: 'https://img.alicdn.com/tps/i4/TB11nqWIpXXXXbwXVXXSYoGNVXX-400-422.jpg',
        url: 'http://www.taobao.com'
      },
      styles: {
        top: 200,
        left: 200,
        rotate: 0,
        aniName: 'rotateIn',
        delay: '0s',
        duration: '3s'
      },
      picStyles: {
        width: 200,
        height: 211,
      },
      mask: {
        width: 50,
        height: 50,
        top: 9,
        left: 103,
        type: 'circle'
      }
    },

    {
      type: 'text',
      content: {
        text: '这里是一个text\n点击去淘宝',
        url: 'http://www.baidu.com',
      },
      styles: {
        lineHeight: '12px',
        fontSize: '12px',
        fontFamily: '',
        color: '#FF0000',
        background: '#000000',
        fontWeight: 'normal',
        textDecoration: 'underline',
        textAlign: 'center',
        padding: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'green',
        top:0,
        left: 0,
        width: 100,
        rotate: 120,
        height: 100,
        delay: '0s',
        duration: '5s',
        aniName: 'zoomIn',

      }
    },
    {
      type: 'tag',
      special: {
        direction: 'right',
      },
      content: {
        text: '这是一个tag'
      },
      styles: {
        top:200,
        left: 10,
        aniName: 'bounceIn',
        delay: '3s',
        duration: '1s'
      }
    }
    ]
  }
];
window.globelConfig = {
  "projectName": '这是一个碉堡的工程',
  "thumbPic": "//img.alicdn.com/tps/i4/TB11nqWIpXXXXbwXVXXSYoGNVXX-400-422.jpg",
  "skin": "normal",
  "category": "test"
};

	/* jshint ignore:end */

},{}],20:[function(require,module,exports){
require('./example');

/* jshint ignore:start */
var factory = {
    noDuplicated: true,
    models: {},
    ctrs: {},
    modelCtrMap: {},
    keyMap: {
        'goods': require('./goods'),
        'page': require('./page'),
        'picture': require('./picture'),
        'tag': require('./tag'),
        'text': require('./text'),
        'default': require('./element'),
        "poster": require('./empty'),
        "empty": require('./empty')
    },
    defaultData: {
        'goods' : {
            type: 'goods'
        },
        'page': {
            type: 'page',
            styles: {
                backgroundColor: '#FFFFFF'
            },
            aniName: 'fadeUp'
        },
        'picture': {
            type: 'picture',
            content: {
                picUrl: '',
                url: ''
            },
            styles: {
                // 避免有些以bottom: 0定位的元素失效
                // top: 0,
                // left: 0,
                rotate: 0,
                aniName: 'zoomIn',
                delay: '0s',
                duration: '1s'
            },
            picStyles: {
                width: 100,
                height: 100,
            },
            mask: {
                width: 50,
                height: 50,
                top: 0,
                left: 0,
                type: 'square'
            }
        },
        'tag': {
            type: 'tag',
            special: {
                direction: 'right',
            },
            content: {
                text: '标签tag'
            },
            styles: {
                top:0,
                left: 0,
                color: '#FFF',
                aniName: 'slideInRight',
                delay: '0s',
                duration: '1s'
            }
        },
        'text': {
            type: 'text',
            content: {
                text: '这里是一个默认的字体\n点击去淘宝',
                url: '',
            },
            styles: {
                lineHeight: 1,
                fontSize: '12px',
                fontFamily: '',
                color: '#333',
                backgroundColor: 'transparent',
                fontWeight: 'normal',
                textAlign: 'left',
                padding: '0px',
                borderWidth: '0px',
                borderStyle: 'solid',
                borderColor: '#333',
                // 避免有些以bottom: 0定位的元素失效
                top: 0,
                left: 0,
                width: 100,
                rotate: 0,
                height: 100,
                aniName: 'flipInY',
                delay: '0s',
                duration: '1s'
            }
        },
        'default': {
            text: '默认文案'
        }
    },
    modelMap: {
        "default": require('./model'),
        "poster": require('../poster/model')
    },
    createModel: function (json) {
        var type = json.type || json;
       var data = json.constructor === String ? $.extend(true, {}, this.defaultData[type]) : $.extend(true, {}, this.defaultData[type], json);
        // var data = json.constructor === String ? $.extend(true, {}, this.defaultData[type]) : json;
        var Constructor = this.modelMap[type] || this.modelMap['default'],
            model;

        model = new Constructor(data);
        model.on('disposing', this._removingModel);

        this.models[model._id] = model;
        this.modelCtrMap[model._id] = [];

        return model;
    },
    createCtr: function (model) {
        var type = model.type || model,
            Constructor = this.keyMap[type],
            id = model._id, ctr, mapArr, ctrs;

        if (this.noDuplicated && (ctrs = this.getCtrsByModel(model))) {
            for (var i = 0; i < ctrs.length; i++) {
                if (Constructor === ctrs[i].constructor) {
                    return ctrs[i];
                }
            }
        }

        ctr = new Constructor(model);
        ctr.on('disposing', this._removingCtr);

        this.ctrs[ctr._id] = ctr;

        if (id) {
            if (!(mapArr = this.modelCtrMap[id])) {
                this.modelCtrMap[id] = [];
                mapArr = this.modelCtrMap[id];
            }

            mapArr.push(ctr._id);
        }

        return ctr;
    },
    parseModel: function (json, parentModel) {
        var model;

        if (Array.isArray(json)) {
            parentModel = parentModel || [];

            for (var i = 0, len = json.length; i < len; i++) {
                this.parseModel(json[i], parentModel);
            }
        }
        else if (json.hasOwnProperty('type')) {
            model = this.createModel(json);

            if (json.elements) {
                this.parseModel(json.elements, model);
            }
            if (parentModel) {
                Array.isArray(parentModel) ? parentModel.push(model) : parentModel.addModel(model);
            }
            else {
                parentModel = model;
            }
        }

        return parentModel.length === 1 ? parentModel[0] : parentModel;
    },
    parseCtr: function (model, rootCtr) {
        var ctr;

        if (Array.isArray(model)) {
            rootCtr = rootCtr || this.createCtr('empty');

            for (var i = 0, len = model.length; i < len; i++) {
                this.parseCtr(model[i], rootCtr);
            }
        }
        else {
            ctr = this.createCtr(model);
            if (!rootCtr) {
                rootCtr = ctr;
            }
            else {
                rootCtr.append(ctr);
            }

            if (model.eles) {
                this.parseCtr(model.eles, ctr);
            }
        }
        return rootCtr;
    },
    parse: function (jsonObj, $dom) {
        var self = this;
        //for banbian
        if (Array.isArray(jsonObj)) {
            $dom = $dom || $(document.createDocumentFragment());
            var rootCtr = this.createCtr('empty');
            jsonObj.forEach(function (json) {
                self.parseCtr(self.parseModel(json), rootCtr);
            });
            return $dom.append(rootCtr.$el);
        } else {
            return this.parseCtr(this.parseModel(jsonObj));
        }
    },
    getCtrsByModel: function (model) {
        var ctrs,
            map = this.modelCtrMap[model._id];
        if (map && map.length) {
            ctrs = [];
            for (var i = 0; i < map.length; i++) {
                ctrs.push(this.ctrs[map[i]]);
            }
        }
        return ctrs;
    },
    getObjById: function (id) {
        return this.models[id] || this.ctrs[id];
    },
    _removingModel: function () {
        factory.models[this._id] = null;
        factory.modelCtrMap[this._id] = null;
    },
    _removingCtr: function () {
        factory.ctrs[this._id] = null;
    }
};

/* jshint ignore:end*/
window.factory = factory;
module.exports = factory;

},{"../poster/model":28,"./element":17,"./empty":18,"./example":19,"./goods":22,"./model":23,"./page":24,"./picture":25,"./tag":26,"./text":27}],21:[function(require,module,exports){
var formatter = {
	formatStyles: function (styles) {
		var plainStyles = Object.create(null);
		var whiteMap = {
			'rotate': function () {
				plainStyles['-webkit-transform'] = 'rotate(' + styles.rotate + 'deg)';
			},
			'delay': function () {
				plainStyles['-webkit-animation-delay'] = styles.delay;
			},
			'aniName': function () {
				plainStyles['-webkit-animation-name'] = styles.aniName;
			},
			'duration': function () {
				plainStyles['-webkit-animation-duration'] = styles.duration;
			},
			'backgroundImage': function () {
				plainStyles['backgroundImage'] = 'url(' + styles.backgroundImage + ')';
			}
		};
		for (var key in styles) {
			whiteMap[key] ? whiteMap[key]() : (plainStyles[key] = styles[key]);
		}
		return plainStyles;
	},
	formatInt: function (value) {
		try {
			value = parseInt(value);
		} catch (e) {
			value = 0;
			throw 'formatInt Exception';
		} 
		return value;
	},
	formatSec: function (val) {
		if (val.substr(val.length - 1, 1) === 's') {
			val = val.slice(0, -1);
		} else {
			val = val + 's';
		}
		return val;
	},
	noop: function (data) {
		return data;
	}
};
window.formatter = formatter;
module.exports = formatter;

},{}],22:[function(require,module,exports){
var Ele = require('./element');
function Goods () {
	this._init.apply(this, arguments);
}

Goods.prototype = new Ele();
Goods.prototype.constructor = Goods;
var fn = Goods.prototype;
fn.super = Ele;
fn.type = 'goods';
fn.tpl = require('../../_template/goods');
fn.bindEvent = function () {
    var that = this;
    this.model.on('dataUpdated', function (newVal, preVal) {
        var picUrl = newVal['content.picUrl'],
            goodsUrl = newVal['content.goodsUrl'],
            oriPicUrl = preVal.content.picUrl,
            oriGoodsUrl = preVal.content.goodsUrl;

        if (newVal.content) {
            if (newVal.content.picUrl) {
                picUrl = newVal.content.picUrl;
            }
            else if (newVal.content.goodsUrl) {
                goodsUrl = newVal.content.goodsUrl;
            }
        }

        if (picUrl && picUrl != oriPicUrl) {
            that.$el.find('img').attr('src', picUrl);
        }

        if (goodsUrl && goodsUrl != oriGoodsUrl) {
            that.$el.attr('href', goodsUrl);
        }
    });
};
module.exports = Goods;
},{"../../_template/goods":1,"./element":17}],23:[function(require,module,exports){
var base = require('../../external/model'),
    p;

function ElementModel (data) {
    var that = this,
        settingData = $.extend({}, data, {elements: null});

    delete settingData.elements;

    this._prop('data', settingData);
    this._prop('status', 'normal');
    this._prop('num', 0);
    this.fields = ['type'];
    this.highIndex = 1;

    this._childDispoingHandler = function () {
        that.removeModel(this);
    };
    this._id = this._guid();
	ElementModel.keyMap[this._id] = this;

    if (this.fields) {
        this.setData(this.fields, settingData);
    }
}

p = $.extend(ElementModel.prototype, base);

ElementModel.keyMap = {};
ElementModel.get = function (_id) {
	return this.keyMap[_id];
};

p.addModel = function (model) {
    if (!this.eles) {
        this.eles = [];
    }
    if (this.indexOf(model) !== -1) {
        return this;
    }

    var index = model.data().styles.zIndex;
    if (index) {
        this.highIndex = this.highIndex > index ? this.highIndex : index;
    }
    this.eles.push(model);
    this.fire('newModel', model);
    model.on('disposing', this._childDispoingHandler);

    return this;
};

p.removeModel = function (model) {
    var idx = this.indexOf(model);

    if (idx > -1) {
        this.eles.splice(idx, 1);
        delete ElementModel.keyMap[model._id];
        // delete model._id;
        this.fire('removeModel', model, idx);
    }

    return this;
};

p.indexOf = function (model) {
    if (this.eles) {
        return this.eles.indexOf(model);
    }

    return -1;
};

p.generateJson = function (needClipData) {
    var json = {};
    if (needClipData) {
       this.clipData ? $.extend(json, this.clipData) : $.extend(json, this.data());
    } else {
       $.extend(json, this.data());
    }
    
    if (this.eles) {
        json.elements = [];
        for (var i = 0, len = this.eles.length; i < len; i++) {
            json.elements.push(this.eles[i].generateJson());
        }
    }

    return json;
};

p.getDescendentByType = function (type, list) {
    if (this.eles) {
        list = list || [];
        for (var i = 0, el; i < this.eles.length; i++) {
            el = this.eles[i];
            if (el.type == type) {
                list.push(el);
            }
            this.eles[i].getDescendentByType(type, list);
        }
    }

    return list;
};

// p.data = function (val) {
//     if (val) {
//         this._setter(val);
//         return this;
//     }
//     else {
//         return this._getter();
//     }
// };

// p._getter = function () {
//     var json = {};

//     if (this.eles) {
//         json.elements = [];
//         for (var i = 0, len = this.eles.length; i < len; i++) {
//             json.elements.push(this.eles[i].data());
//         }
//     }

//     return json;
// };

// p._setter = function (val) {
//     this.setData(val);
//     this.fire('dataUpdated', val);
// };

window.ElementModel = ElementModel;
module.exports = ElementModel;

},{"../../external/model":11}],24:[function(require,module,exports){
var Ele = require('./element');
var broadcast = require('../../external/broadcast');
var fn;

function Page () {
    this._init.apply(this, arguments);
}

fn = $.extend(Page.prototype, Ele.prototype);

fn.type = 'page';
fn.super = Ele;
fn.tpl = require('../../_template/page');
module.exports = Page;

},{"../../_template/page":2,"../../external/broadcast":6,"./element":17}],25:[function(require,module,exports){
var Ele = require('./element');
function Picture () {
	this._init.apply(this, arguments);
}

Picture.prototype = new Ele();
Picture.prototype.constructor = Picture;
var fn = Picture.prototype;
fn.type = 'picture';
fn.super = Ele;
fn.tpl = require('../../_template/picture');

fn.init = function () {
	this.$thumbBox = this.$el.find('.thumb-box');
	this.$realImg = this.$el.find('.real-img');
	this.$imgClipBox = this.$el.find('.img-clip-box');
	this.$imgMask = this.$el.find('.img-mask');
	this.$clipWrapper = this.$el.find('.clip-box-wrapper');
};
fn.generateClipBoxStyle = function () {
	var clipBoxStyle = Object.create(null);
	var data = this.model.data();
	clipBoxStyle.width = data.picStyles.width;
	clipBoxStyle.height= data.picStyles.height;
	//使用backgroundSize100%代替就好
	//clipBoxStyle.backgroundSize = clipBoxStyle.width + 'px ' + clipBoxStyle.height + 'px';
	clipBoxStyle.backgroundImage = 'url(' + data.content.picUrl + ')';
	return clipBoxStyle;
};
fn.generateClipWrapperStyle = function () {
	var wrapper = Object.create(null);
	var data =this.model.data();
	wrapper.top = -data.mask.top;
	wrapper.left = -data.mask.left;
	return wrapper;
};
fn.generateRealImgStyle = function () {
	var style = Object.create(null);
	var data = this.model.data();
	style.width = data.picStyles.width;
	style.height = data.picStyles.height;
	style.top = -data.mask.top;
	style.left = -data.mask.left;
	return style;
};
fn.generateMaskStyle = function () {
	var style = Object.create(null);
	var data = this.model.data();
	var mask = data.mask;
	if (mask.type === 'circle') {
		//当type为circle的时候，width和height必须相等，为了避免再次促发dataupdated事件，必须在外层控制width和height的值
		//e.g: 若果在这里执行width和height的操作,同时使用model.data()抛事件，则又回触发render()函数。
		style.borderRadius = Math.min(mask.width, mask.height) / 2;
	} else {
		style.borderRadius = 0;	
	}
	style.width = data.mask.width;
	style.height = data.mask.height;
	return style;
};
fn.generateThumboxStyle = function () {
	var style = Object.create(null);
	var data = this.model.data();
	var mask = data.mask;
	$.extend(true, style, mask);
	if (mask.type === 'circle') {
		style.borderRadius = Math.min(mask.width, mask.height) / 2;
	} else {
		style.borderRadius = 0;	
	}
	return style;
};
fn.render = function (modifyData) {
	//WARNING: modifyData is flatData like {'mask.top': 70}
	var data = this.model.data();
	var needRerenderClass = true;
	if (modifyData) {
		var modifyDataArray = Object.keys(modifyData);
		var needRerenderClass = modifyDataArray.some(function (key) {
			return /mask.type/.test(key);
		});
	}
	needRerenderClass && this.$el.removeClass('circle square').addClass(data.mask.type);
	this.$thumbBox.css(this.generateThumboxStyle());
	this.$realImg.css(this.generateRealImgStyle()).attr('src', data.content.picUrl);
	this.$imgClipBox.css(this.generateClipBoxStyle());
	this.$imgMask.css(this.generateMaskStyle());
	this.$clipWrapper.css(this.generateClipWrapperStyle());
};
fn.bindEvent = function () {
	var self = this;
	this.model.on('dataUpdated', function (modifyData) {
		self.render(modifyData);
	});
}

module.exports = Picture;
},{"../../_template/picture":3,"./element":17}],26:[function(require,module,exports){
var Ele = require('./element');
function Tag () {
	this._init.apply(this, arguments);
}

Tag.prototype = new Ele();
Tag.prototype.constructor = Tag;
var fn = Tag.prototype;
fn.super = Ele;
fn.type = 'tag';
fn.tpl = require('../../_template/tag');
fn.bindEvent = function () {
    var that = this;
    this.model.on('dataUpdated', function (newVal) {
        var url;
        if ((url = newVal["content.url"]) || (url = newVal.content && newVal.content.url)) {
            that.$el.find('a').attr('href', url);
        }

        if ('special.direction' in newVal) {
            that.$el.removeClass('left right').addClass(newVal['special.direction']);
        }
    });
};

module.exports = Tag;
},{"../../_template/tag":4,"./element":17}],27:[function(require,module,exports){
var Ele = require('./element');
function Text () {
	this._init.apply(this, arguments);
}

Text.prototype = new Ele();
Text.prototype.constructor = Text;
var fn = Text.prototype;
fn.super = Ele;
fn.type = 'text';
fn.tpl = require('../../_template/text');
module.exports = Text;
},{"../../_template/text":5,"./element":17}],28:[function(require,module,exports){
var base = require('../elements/model'),
    service = require('../../external/service'),
    p;

function Poster (id, from, data) {
    this._prop('data');
    this._prop('cover', 'http://g01.alibaba-inc.com/tfscom/TB1PU3kIXXXXXavXXXXXXXXXXXX.tfsprivate.png');
    this._prop('desc');
    this._prop('title');


    this._id = id;

    if (from == 'template') {
        this.templateId = id;
    }
    else {
        this.mzId = id;
    }

    this.type = 'poster';

    this.fetchUrl;
    this.postUrl;
    this.publishUrl;
    this.weitaoUrl;

    this._error = this._error.bind(this);
    this._success = this._success.bind(this);
    this._always = this._always.bind(this);

    this._saveSuccess = this._saveSuccess.bind(this);

    this._publish = this._publish.bind(this);
    this._publishSuccess = this._publishSuccess.bind(this);

    this._weiTaoShare = this._weiTaoShare.bind(this);

    if (data) {
        this.data(data);
    }
}

p = $.extend(Poster.prototype, base.prototype);

p.get = function () {
    var pro;
    this.fire('loading');
    //data load from example.js
    // this.data(data);
    // this._always();

    pro = service
        .sendRequest(this._getGetRequestObj())
        .then(this._success, this._error)
        .always(this._always);

    return pro;
};

p.save = function () {
    var pro;

    //
    // TODO: verified from last save
    //
    this.fire('saving');
    pro = service
        .sendRequest(this._getPostRequestObj())
        .then(this._saveSuccess, this._error)
        .always(this._always);

    return pro;
};

p.generateJson = function () {
    var list = [];

    for (var i = 0, len = this.eles.length, page; i < len; i++) {
        page = this.eles[i];
        list.push(page.generateJson());
    }

    return list;
};

p.getPage = function (num) {
    return this.eles && this.eles[num];
};

p.getPages = function () {
    if (this.eles && this.eles.length) {
        return this.eles;
    }

    return null;
};

p.reOrder = function (oriPos, newPos) {
    var page = this.eles.splice(oriPos, 1)[0];
    this.eles.splice(newPos, 0, page);

    this.fire('reorder', oriPos, newPos);
};

p._getGetRequestObj = function () {
    var obj = {
        url: this.fetchUrl,
        v: '2.0',
        data: {
            mzId: this.mzId,
            templateId: this.templateId
        }
    };
    return obj;
};

p._getPostRequestObj = function (data) {
    var obj = {
        type: 'POST',
        url: this.postUrl,
        v: '2.0',
        data: {
            mzId: this.mzId,
            templateId: this.templateId,
            cover: this.cover(),
            title: this.title(),
            desc: this.desc(),
            contentJson: JSON.stringify(this.generateJson())
        }
    };

    return obj;
};

p._error = function () {
    this.fire('error');
};

p._success = function (data) {
    this.cover(data.content.cover);
    this.desc(data.content.desc);
    this.title(data.content.title);

    this.mzId = data.mzId;
    this.templateId = data.templateId;

    this.data(JSON.parse(data.content.contentJson));

    this.fire('success');
};

p._saveSuccess = function (data) {
    this.mzId = data.result;

    return this.mzId;
};

p._always = function () {
    this.fire('loaded');
};

p.publish = function () {
    var that = this;

    //
    // TODO: verified from last publish
    //
    this.fire('publishing');
    return this.save().then(this._publish, this._error);
};

p._publish = function (mzId) {
    return service.sendRequest(this._getPublishObject()).then(this._publishSuccess, this._error);
};

p._getPublishObject = function () {
    var obj = {
        url: this.publishUrl,
        v: '2.0',
        data: {
            mzId: this.mzId
        }
    }
    return obj;
};

p._publishSuccess = function (data) {
    var url = location.hostname.indexOf('waptest.taobao.com') ? 'http://miaozan.alicdn.com/test_' : 'http://miaozan.alicdn.com/';

    this.publishedUrl = url + data.result + '.html';

    return this.publishedUrl;
};

p.shareToWeitao = function () {
    this.fire('weitaoSharing');
    if (!this.publishedUrl) {
        return this.publish().then(this._weiTaoShare, this._error);
    }
    else {
        return this._weiTaoShare();
    }
};

p._weiTaoShare = function () {
    return service
            .sendRequest(this._getWeitaoRequestObj())
            .then(this._weitaoSuccess, this._error);
};

p._getWeitaoRequestObj = function () {
    var obj = {
        url: this.weitaoUrl,
        v: '2.0',
        data: {
            content: encodeURI(JSON.stringify({
                feedType: '454',
                title: this.title(),
                coverPath: this.cover(),
                detailUrl: this.publishedUrl,
                bizID: this.mzId
            }))
        }
    };

    return obj;
};

p._weitaoSuccess = function (data) {
    console.log(data);
};

module.exports = Poster;
},{"../../external/service":12,"../elements/model":23}],29:[function(require,module,exports){
/**
 * @file resetViewport.js
 * @brief 重设viewport，适应不同屏幕
 * @param container{string} 容器选择器
 * @param viewport{string} viewport meta元素的选择器
 * @author banbian, zangtao.zt@alibaba-inc.com
 * @version 1.0.0
 * @date 2015-06-26
 */

function resetViewport(container, viewport) {
  var vp = viewport || '#J_viewport',
    $wrap = $(container), sh, sw, dr, nr, sc;
  sh = $wrap.height()
  sw = $wrap.width()
  dr = 320 / 486
  //dr = 320 / 568
  nr = sw / sh
  sc = (nr >= dr ? sh / 486 : sw / 320)
  //sc = (nr >= dr ? sh / 568 : sw / 320)
  if (sc != 1) {
    $(vp).attr("content", "width=320, initial-scale=" + sc + ", maximum-scale=" + sc + ", user-scalable=no");
  }
}

module.exports = resetViewport;

},{}],30:[function(require,module,exports){
/*浏览器支持的动画事件*/
var transitionEvent = (function(){
  var t,
      el = document.createElement('fakeelement'),
      transitions = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
      };

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
})();

/*
*@param options(obj)
*@param option.container 容器的选择器
*@param option.page 容器里每一页的选择器,默认是'.phone-page'
*@param option.currentPageClass 当前页的的标志class，默认是'active'
*@param option.attr 标签中data-**的属性名，定义动画名字默认是'animate'
*@param option.delay 标签中默认延迟动画的名字data-*，默认是delay
*@param option.preLoadNum 惰性加载的控制数量
*/
var SlidePage = function(options){
  this.$container = $(options.container)
  this.pageSelector = options.page || '.phone-page'

  /*缓存所有的页面DOM节点*/
  this.pageArray = this.$container.find(this.pageSelector);

  this.currentPageClass = options.currentPageClass || 'active';

  this.attr = options.attr || 'animate';
  this.preLoadNum = options.preLoadNum || 3;

  this.listenPostMessage()
  this.init();
}

SlidePage.prototype.listenPostMessage = function() {
  var self = this
  window.addEventListener('message', function(e){
    //TODO e.origin来源判断、过滤
    if ('nextPage' == e.data) {
      self.nextPage()
    } else if ('prePage' == e.data) {
      self.prePage()
    }
  }, false);
}

SlidePage.prototype.init = function() {

  // 针对页数变化的情况，需要重新获取pageArray
  this.pageArray = this.$container.find(this.pageSelector);
  this.index = 0 ;
  /*缓存子页面的数量*/
  this.pageLength = this.pageArray.length;
  /*标识页面切换的过程中是否正在进行动画*/
  this.isAnimating  = false;
  /*存放所有页面节点的动画队列*/
  this.animationArray = [];
  /*存放所有页面中开启了延迟加载的动画队列*/
  this.childrenNodes = [];
  /*存放页面之中延迟加载的背景图*/
  //this.lazyArray =[];

  var self = this,
      attr = this.attr;

  $.each(this.pageArray,function(index,item){
    var $item = $(item);
    self.animationArray.push($item.data(attr) || 'fadeUp');
    self.childrenNodes.push($item.children(".removeable"));
    //self.lazyArray.push(0);
    $item.css("z-index",index);
  });

  /**首页的动画*/
  this.pageArray.removeClass(this.currentPageClass).eq(this.index).addClass(this.currentPageClass);
  this._showPage(this.index);
};

SlidePage.prototype.preventDefault = function(e) {
  e.preventDefault()
}

// 启用slide功能
SlidePage.prototype.enable = function() {
  var self = this

  // 解决部分Android机型的滑动事件问题,同时阻止拉出白页. 必须用原生写法
  document.addEventListener('touchmove',  this.preventDefault, false)

  this.$container.on('swipeDown', this.pageSelector, function(e){
    e.preventDefault();
    self.prePage();
  })

  this.$container.on('swipeUp', this.pageSelector, function(e){
    e.preventDefault();
    self.nextPage();
  })
  return this
}

// 上翻一页或下翻一页
SlidePage.prototype.flipPage = function(isNextPage) {
  var dirStep = [-1, 1],
      outIndex = this.index,
      inIndex = isNextPage ? (++this.index) : (--this.index),
      outClass = this.animationArray[outIndex] + (isNextPage ? '' : ' out animated'),
      $outNode = this.pageArray.eq(outIndex),
      inClass = this.animationArray[inIndex] + (isNextPage ? ' animated' : ''),
      $inNode = this.pageArray.eq(inIndex),
      self = this;
  this.isAnimating = true;

  // 往前翻时，为了防止本页隐藏的时候出现白屏，先将上一页显示
  !isNextPage && $inNode.addClass(this.currentPageClass);

  if (isNextPage) {
    $inNode.addClass(inClass + ' ' + self.currentPageClass).one(transitionEvent, movePageEnd)
  } else {
    $outNode.addClass(outClass).one(transitionEvent, movePageEnd)
  }

  // 转场动画执行完后的回调
  function movePageEnd(e) {
    // 如果不是翻页动画触发的transitionEvent (比如之前一页里的组件动画执行完触发的) ,则延迟翻页逻辑，等待动画做完
    if (e.animationName == 'slideInUp' || e.animationName == 'slideOutDown') {
      doneAni()
    } else {
      setTimeout(doneAni, 700)
    }

    function doneAni() {
      $outNode.removeClass((isNextPage ? '' : outClass + ' ') + self.currentPageClass);
      // 往下翻时才需要执行
      isNextPage && $inNode.removeClass(inClass);
      self._showPage(inIndex, outIndex);
      self.isAnimating = false;
      self.idxUpdated && self.idxUpdated(inIndex, outIndex);
    }
  }
}
SlidePage.prototype.nextPage = function() {
  if(!this.isAnimating && this.index != this.pageLength -1){
    this.flipPage(true)
  }
};

SlidePage.prototype.prePage = function() {
  if(!this.isAnimating  && this.index != 0){
    this.flipPage(false)
  }
};

SlidePage.prototype._showPage = function(inIndex, outIndex){
  var $childIn = this.childrenNodes[inIndex],
    $childOut = this.childrenNodes[outIndex],
    animateIn = ($childIn.data("animate") || 'fadeUp') + ' animated';
  $childIn.removeClass("removeable").addClass(animateIn);
  if(outIndex!= void 0){
    var animateOut = ($childOut.data('animate') || 'fadeUp') + ' animated';
    $childOut.addClass("removeable").removeClass(animateOut);
  }
};

module.exports = SlidePage;

},{}]},{},["j/aKKu"])