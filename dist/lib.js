"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.normalizeToken = normalizeToken;
exports.validateInput = validateInput;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
function normalizeToken(token) {
  do {
    token = token.replace("+", "_p_");
  } while (token.indexOf("+") > -1);
  do {
    token = token.replace("\\", "_b_");
  } while (token.indexOf("\\") > -1);
  do {
    token = token.replace("/", "_s_");
  } while (token.indexOf("/") > -1);
  do {
    token = token.replace("|", "_pipe_");
  } while (token.indexOf("|") > -1);
  do {
    token = token.replace(".", "_dot_");
  } while (token.indexOf(".") > -1);
  do {
    token = token.replace(":", "_2dot_");
  } while (token.indexOf(":") > -1);
  return token;
}
function validateInput(value, type, label) {
  let ris = {
    validate: true,
    message: ""
  };
  let cType = "|" + type + "|";
  if (cType.indexOf("|obb|") > -1) {
    if (value.trim() === "") {
      ris.validate = false;
      ris.message = label !== "" ? label : "Campo obbligatorio";
    }
  }
  return ris;
}
function formatDate(date) {
  let formato = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "yyyy-MM-dd";
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = "" + d.getFullYear();
  let hour = "" + d.getHours();
  let minute = "" + d.getMinutes();
  let second = "" + d.getSeconds();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;
  if (second.length < 2) second = "0" + second;
  var rr = "";
  formato = formato.replace("yyyy", year);
  formato = formato.replace("MM", month);
  formato = formato.replace("dd", day);
  formato = formato.replace("hh", hour);
  formato = formato.replace("mm", minute);
  formato = formato.replace("ss", second);
  rr = formato;
  return rr;
}