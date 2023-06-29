"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _LoginModule = _interopRequireDefault(require("../style/Login.module.css"));
var _axonalib = require("axonalib");
var _axonaui = require("axonaui");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Insert text at cursor position.
 *
 * @param {string} logo
 * @param {string} urlApi
 * @param {string} piva
 * @public
 */

const Login = _ref => {
  let {
    logo,
    onSubmit,
    urlApi,
    piva
  } = _ref;
  const pivaInputRef = (0, _react.useRef)();
  const emailInputRef = (0, _react.useRef)();
  const passwordInputRef = (0, _react.useRef)();
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [isLogin, setIsLogin] = (0, _react.useState)(true);
  const [isError, setIsError] = (0, _react.useState)(false);
  const [isNewUser, setIsNewUser] = (0, _react.useState)(false);
  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };
  async function submitHandler(event) {
    event.preventDefault();
    const enteredPiva = piva ? piva : pivaInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    //fetch login
    await fetch(urlApi + (enteredPiva === "" ? "A" : enteredPiva) + "/" + enteredEmail + "/" + enteredPassword).then(response => {
      return response.json();
    }).then(data => {
      if (data.Errore.length > 0) {
        console.log(data.Errore);
        setIsError(data.Errore);
      } else {
        const normT = (0, _axonalib.normalizeToken)(data.Token);
        const expirationTime = new Date(new Date().getTime() + 14400 * 1000);
        localStorage.setItem("axn_token", normT);
        localStorage.setItem("axn_exptime", expirationTime);
      }
    }).catch(err => {
      console.log(err);
    });
    setIsLoading(false);
    onSubmit();
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_axonaui.Card, null, /*#__PURE__*/_react.default.createElement("img", {
    src: logo,
    alt: "",
    className: _LoginModule.default.authlogo
  }), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: submitHandler
  }, !piva && /*#__PURE__*/_react.default.createElement("div", {
    className: _LoginModule.default.control
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "piva"
  }, "Piva"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "piva",
    ref: pivaInputRef
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _LoginModule.default.control
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "email"
  }, "Email"), /*#__PURE__*/_react.default.createElement("input", {
    type: "email",
    id: "email",
    required: true,
    ref: emailInputRef
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _LoginModule.default.control
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "password"
  }, "Password"), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    id: "password",
    required: true,
    ref: passwordInputRef
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _LoginModule.default.actions
  }, !isLoading && /*#__PURE__*/_react.default.createElement(_axonaui.Button, null, isLogin ? "Login" : "Create Account"), isLoading && /*#__PURE__*/_react.default.createElement("p", null, "Sending request..."), isError && /*#__PURE__*/_react.default.createElement("p", null, isError), isNewUser && /*#__PURE__*/_react.default.createElement(_axonaui.Button, {
    type: "button",
    onClick: switchAuthModeHandler
  }, isLogin ? "Create new account" : "Login with existing account")))));
};
var _default = Login;
exports.default = _default;