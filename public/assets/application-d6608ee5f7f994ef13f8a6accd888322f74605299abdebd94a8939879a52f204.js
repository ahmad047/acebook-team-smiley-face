/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts
Released under the MIT license
 */;

(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var nonce;

      nonce = null;

      Rails.loadCSPNonce = function() {
        var ref;
        return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
      };

      Rails.cspNonce = function() {
        return nonce != null ? nonce : Rails.loadCSPNonce();
      };

    }).call(this);
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches, preventDefault;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        preventDefault = CustomEvent.prototype.preventDefault;
        CustomEvent.prototype.preventDefault = function() {
          var result;
          result = preventDefault.call(this);
          if (this.cancelable && !this.defaultPrevented) {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function() {
                return true;
              }
            });
          }
          return result;
        };
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;

      cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var ref, response;
          response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if ((options.beforeSend != null) && !options.beforeSend(xhr, options)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          CSRFProtection(xhr);
        }
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.setAttribute('nonce', cspNonce());
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'fieldset[disabled] *')) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      Rails.confirm = function(message, element) {
        return confirm(message);
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = Rails.confirm(message, element);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        if (e instanceof Event) {
          if (isXhrRedirect(e)) {
            return;
          }
          element = e.target;
        } else {
          element = e;
        }
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

      isXhrRedirect = function(event) {
        var ref, xhr;
        xhr = (ref = event.detail) != null ? ref[0] : void 0;
        return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.preventInsignificantClick = function(e) {
        var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        insignificantMetaClick = metaClick && method === 'GET' && !data;
        nonPrimaryMouseClick = (e.button != null) && e.button !== 0;
        if (nonPrimaryMouseClick || insignificantMetaClick) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null)) {
        if (jQuery.rails) {
          throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
        }
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        document.addEventListener('DOMContentLoaded', loadCSPNonce);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define([ "exports" ], factory) : factory(global.ActionCable = {});
})(this, function(exports) {
  "use strict";
  var adapters = {
    logger: self.console,
    WebSocket: self.WebSocket
  };
  var logger = {
    log: function log() {
      if (this.enabled) {
        var _adapters$logger;
        for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
          messages[_key] = arguments[_key];
        }
        messages.push(Date.now());
        (_adapters$logger = adapters.logger).log.apply(_adapters$logger, [ "[ActionCable]" ].concat(messages));
      }
    }
  };
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var now = function now() {
    return new Date().getTime();
  };
  var secondsSince = function secondsSince(time) {
    return (now() - time) / 1e3;
  };
  var clamp = function clamp(number, min, max) {
    return Math.max(min, Math.min(max, number));
  };
  var ConnectionMonitor = function() {
    function ConnectionMonitor(connection) {
      classCallCheck(this, ConnectionMonitor);
      this.visibilityDidChange = this.visibilityDidChange.bind(this);
      this.connection = connection;
      this.reconnectAttempts = 0;
    }
    ConnectionMonitor.prototype.start = function start() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        addEventListener("visibilitychange", this.visibilityDidChange);
        logger.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms");
      }
    };
    ConnectionMonitor.prototype.stop = function stop() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        removeEventListener("visibilitychange", this.visibilityDidChange);
        logger.log("ConnectionMonitor stopped");
      }
    };
    ConnectionMonitor.prototype.isRunning = function isRunning() {
      return this.startedAt && !this.stoppedAt;
    };
    ConnectionMonitor.prototype.recordPing = function recordPing() {
      this.pingedAt = now();
    };
    ConnectionMonitor.prototype.recordConnect = function recordConnect() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      logger.log("ConnectionMonitor recorded connect");
    };
    ConnectionMonitor.prototype.recordDisconnect = function recordDisconnect() {
      this.disconnectedAt = now();
      logger.log("ConnectionMonitor recorded disconnect");
    };
    ConnectionMonitor.prototype.startPolling = function startPolling() {
      this.stopPolling();
      this.poll();
    };
    ConnectionMonitor.prototype.stopPolling = function stopPolling() {
      clearTimeout(this.pollTimeout);
    };
    ConnectionMonitor.prototype.poll = function poll() {
      var _this = this;
      this.pollTimeout = setTimeout(function() {
        _this.reconnectIfStale();
        _this.poll();
      }, this.getPollInterval());
    };
    ConnectionMonitor.prototype.getPollInterval = function getPollInterval() {
      var _constructor$pollInte = this.constructor.pollInterval, min = _constructor$pollInte.min, max = _constructor$pollInte.max, multiplier = _constructor$pollInte.multiplier;
      var interval = multiplier * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1e3);
    };
    ConnectionMonitor.prototype.reconnectIfStale = function reconnectIfStale() {
      if (this.connectionIsStale()) {
        logger.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + secondsSince(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          logger.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          logger.log("ConnectionMonitor reopening");
          this.connection.reopen();
        }
      }
    };
    ConnectionMonitor.prototype.connectionIsStale = function connectionIsStale() {
      return secondsSince(this.pingedAt ? this.pingedAt : this.startedAt) > this.constructor.staleThreshold;
    };
    ConnectionMonitor.prototype.disconnectedRecently = function disconnectedRecently() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };
    ConnectionMonitor.prototype.visibilityDidChange = function visibilityDidChange() {
      var _this2 = this;
      if (document.visibilityState === "visible") {
        setTimeout(function() {
          if (_this2.connectionIsStale() || !_this2.connection.isOpen()) {
            logger.log("ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = " + document.visibilityState);
            _this2.connection.reopen();
          }
        }, 200);
      }
    };
    return ConnectionMonitor;
  }();
  ConnectionMonitor.pollInterval = {
    min: 3,
    max: 30,
    multiplier: 5
  };
  ConnectionMonitor.staleThreshold = 6;
  var INTERNAL = {
    message_types: {
      welcome: "welcome",
      disconnect: "disconnect",
      ping: "ping",
      confirmation: "confirm_subscription",
      rejection: "reject_subscription"
    },
    disconnect_reasons: {
      unauthorized: "unauthorized",
      invalid_request: "invalid_request",
      server_restart: "server_restart"
    },
    default_mount_path: "/cable",
    protocols: [ "actioncable-v1-json", "actioncable-unsupported" ]
  };
  var message_types = INTERNAL.message_types, protocols = INTERNAL.protocols;
  var supportedProtocols = protocols.slice(0, protocols.length - 1);
  var indexOf = [].indexOf;
  var Connection = function() {
    function Connection(consumer) {
      classCallCheck(this, Connection);
      this.open = this.open.bind(this);
      this.consumer = consumer;
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ConnectionMonitor(this);
      this.disconnected = true;
    }
    Connection.prototype.send = function send(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };
    Connection.prototype.open = function open() {
      if (this.isActive()) {
        logger.log("Attempted to open WebSocket, but existing socket is " + this.getState());
        return false;
      } else {
        logger.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + protocols);
        if (this.webSocket) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new adapters.WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };
    Connection.prototype.close = function close() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        allowReconnect: true
      }, allowReconnect = _ref.allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return this.webSocket.close();
      }
    };
    Connection.prototype.reopen = function reopen() {
      logger.log("Reopening WebSocket, current state is " + this.getState());
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error) {
          logger.log("Failed to reopen WebSocket", error);
        } finally {
          logger.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };
    Connection.prototype.getProtocol = function getProtocol() {
      if (this.webSocket) {
        return this.webSocket.protocol;
      }
    };
    Connection.prototype.isOpen = function isOpen() {
      return this.isState("open");
    };
    Connection.prototype.isActive = function isActive() {
      return this.isState("open", "connecting");
    };
    Connection.prototype.isProtocolSupported = function isProtocolSupported() {
      return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
    };
    Connection.prototype.isState = function isState() {
      for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
        states[_key] = arguments[_key];
      }
      return indexOf.call(states, this.getState()) >= 0;
    };
    Connection.prototype.getState = function getState() {
      if (this.webSocket) {
        for (var state in adapters.WebSocket) {
          if (adapters.WebSocket[state] === this.webSocket.readyState) {
            return state.toLowerCase();
          }
        }
      }
      return null;
    };
    Connection.prototype.installEventHandlers = function installEventHandlers() {
      for (var eventName in this.events) {
        var handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };
    Connection.prototype.uninstallEventHandlers = function uninstallEventHandlers() {
      for (var eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };
    return Connection;
  }();
  Connection.reopenDelay = 500;
  Connection.prototype.events = {
    message: function message(event) {
      if (!this.isProtocolSupported()) {
        return;
      }
      var _JSON$parse = JSON.parse(event.data), identifier = _JSON$parse.identifier, message = _JSON$parse.message, reason = _JSON$parse.reason, reconnect = _JSON$parse.reconnect, type = _JSON$parse.type;
      switch (type) {
       case message_types.welcome:
        this.monitor.recordConnect();
        return this.subscriptions.reload();

       case message_types.disconnect:
        logger.log("Disconnecting. Reason: " + reason);
        return this.close({
          allowReconnect: reconnect
        });

       case message_types.ping:
        return this.monitor.recordPing();

       case message_types.confirmation:
        return this.subscriptions.notify(identifier, "connected");

       case message_types.rejection:
        return this.subscriptions.reject(identifier);

       default:
        return this.subscriptions.notify(identifier, "received", message);
      }
    },
    open: function open() {
      logger.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol");
      this.disconnected = false;
      if (!this.isProtocolSupported()) {
        logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
        return this.close({
          allowReconnect: false
        });
      }
    },
    close: function close(event) {
      logger.log("WebSocket onclose event");
      if (this.disconnected) {
        return;
      }
      this.disconnected = true;
      this.monitor.recordDisconnect();
      return this.subscriptions.notifyAll("disconnected", {
        willAttemptReconnect: this.monitor.isRunning()
      });
    },
    error: function error() {
      logger.log("WebSocket onerror event");
    }
  };
  var extend = function extend(object, properties) {
    if (properties != null) {
      for (var key in properties) {
        var value = properties[key];
        object[key] = value;
      }
    }
    return object;
  };
  var Subscription = function() {
    function Subscription(consumer) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var mixin = arguments[2];
      classCallCheck(this, Subscription);
      this.consumer = consumer;
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }
    Subscription.prototype.perform = function perform(action) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      data.action = action;
      return this.send(data);
    };
    Subscription.prototype.send = function send(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };
    Subscription.prototype.unsubscribe = function unsubscribe() {
      return this.consumer.subscriptions.remove(this);
    };
    return Subscription;
  }();
  var Subscriptions = function() {
    function Subscriptions(consumer) {
      classCallCheck(this, Subscriptions);
      this.consumer = consumer;
      this.subscriptions = [];
    }
    Subscriptions.prototype.create = function create(channelName, mixin) {
      var channel = channelName;
      var params = (typeof channel === "undefined" ? "undefined" : _typeof(channel)) === "object" ? channel : {
        channel: channel
      };
      var subscription = new Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };
    Subscriptions.prototype.add = function add(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };
    Subscriptions.prototype.remove = function remove(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };
    Subscriptions.prototype.reject = function reject(identifier) {
      var _this = this;
      return this.findAll(identifier).map(function(subscription) {
        _this.forget(subscription);
        _this.notify(subscription, "rejected");
        return subscription;
      });
    };
    Subscriptions.prototype.forget = function forget(subscription) {
      this.subscriptions = this.subscriptions.filter(function(s) {
        return s !== subscription;
      });
      return subscription;
    };
    Subscriptions.prototype.findAll = function findAll(identifier) {
      return this.subscriptions.filter(function(s) {
        return s.identifier === identifier;
      });
    };
    Subscriptions.prototype.reload = function reload() {
      var _this2 = this;
      return this.subscriptions.map(function(subscription) {
        return _this2.sendCommand(subscription, "subscribe");
      });
    };
    Subscriptions.prototype.notifyAll = function notifyAll(callbackName) {
      var _this3 = this;
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return this.subscriptions.map(function(subscription) {
        return _this3.notify.apply(_this3, [ subscription, callbackName ].concat(args));
      });
    };
    Subscriptions.prototype.notify = function notify(subscription, callbackName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      var subscriptions = void 0;
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [ subscription ];
      }
      return subscriptions.map(function(subscription) {
        return typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : undefined;
      });
    };
    Subscriptions.prototype.sendCommand = function sendCommand(subscription, command) {
      var identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };
    return Subscriptions;
  }();
  var Consumer = function() {
    function Consumer(url) {
      classCallCheck(this, Consumer);
      this._url = url;
      this.subscriptions = new Subscriptions(this);
      this.connection = new Connection(this);
    }
    Consumer.prototype.send = function send(data) {
      return this.connection.send(data);
    };
    Consumer.prototype.connect = function connect() {
      return this.connection.open();
    };
    Consumer.prototype.disconnect = function disconnect() {
      return this.connection.close({
        allowReconnect: false
      });
    };
    Consumer.prototype.ensureActiveConnection = function ensureActiveConnection() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };
    createClass(Consumer, [ {
      key: "url",
      get: function get$$1() {
        return createWebSocketURL(this._url);
      }
    } ]);
    return Consumer;
  }();
  function createWebSocketURL(url) {
    if (typeof url === "function") {
      url = url();
    }
    if (url && !/^wss?:/i.test(url)) {
      var a = document.createElement("a");
      a.href = url;
      a.href = a.href;
      a.protocol = a.protocol.replace("http", "ws");
      return a.href;
    } else {
      return url;
    }
  }
  function createConsumer() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig("url") || INTERNAL.default_mount_path;
    return new Consumer(url);
  }
  function getConfig(name) {
    var element = document.head.querySelector("meta[name='action-cable-" + name + "']");
    if (element) {
      return element.getAttribute("content");
    }
  }
  exports.Connection = Connection;
  exports.ConnectionMonitor = ConnectionMonitor;
  exports.Consumer = Consumer;
  exports.INTERNAL = INTERNAL;
  exports.Subscription = Subscription;
  exports.Subscriptions = Subscriptions;
  exports.adapters = adapters;
  exports.createWebSocketURL = createWebSocketURL;
  exports.logger = logger;
  exports.createConsumer = createConsumer;
  exports.getConfig = getConfig;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

;
