"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Login", {
  enumerable: true,
  get: function get() {
    return _Login.default;
  }
});
Object.defineProperty(exports, "useLogin", {
  enumerable: true,
  get: function get() {
    return _useLogin.default;
  }
});
require("./components/style/general.css");
var _Login = _interopRequireDefault(require("../components/Login"));
var _useLogin = _interopRequireDefault(require("./hooks/useLogin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }