"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useLogin = () => {
  const [isLogged, setIsLogged] = (0, _react.useState)(false);
  const getLogged = () => {
    const expirationTime = localStorage.getItem("adk_exptime");
    const token = localStorage.getItem("adk_token");
    if (token) {
      if (expirationTime) {
        const nowexpirationTime = new Date(new Date().getTime() * 1000);
        if (expirationTime < nowexpirationTime) {
          setIsLogged(false);
          return false;
        } else {
          setIsLogged(true);
          return true;
        }
      }
    } else {
      setIsLogged(false);
      return false;
    }
  };
  (0, _react.useEffect)(() => {
    getLogged();
  }, []);
  return {
    isLogged,
    getLogged
  };
};
var _default = useLogin;
exports.default = _default;