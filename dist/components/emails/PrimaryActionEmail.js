"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryActionEmailHtml = exports.EmailTemplate = void 0;
var react_1 = __importDefault(require("react"));
var components_1 = require("@react-email/components");
var EmailTemplate = function (_a) {
    var actionLabel = _a.actionLabel, buttonText = _a.buttonText, href = _a.href;
    return (react_1.default.createElement(components_1.Html, null,
        react_1.default.createElement(components_1.Head, null),
        react_1.default.createElement(components_1.Preview, null, "The marketplace for high-quality digital goods."),
        react_1.default.createElement(components_1.Body, { style: main },
            react_1.default.createElement(components_1.Container, { style: container },
                react_1.default.createElement(components_1.Img, { src: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/hippo-newsletter-sign-up.png"), width: "150", height: "150", alt: "DigitalHippo", style: logo }),
                react_1.default.createElement(components_1.Text, { style: paragraph }, "Hi there,"),
                react_1.default.createElement(components_1.Text, { style: paragraph },
                    "Welcome to DigitalHippo, the marketplace for high quality digital goods. Use the button below to ",
                    actionLabel,
                    "."),
                react_1.default.createElement(components_1.Section, { style: btnContainer },
                    react_1.default.createElement(components_1.Button, { style: button, href: href }, buttonText)),
                react_1.default.createElement(components_1.Text, { style: paragraph },
                    "Best,",
                    react_1.default.createElement("br", null),
                    "The DigitalHippo team"),
                react_1.default.createElement(components_1.Hr, { style: hr }),
                react_1.default.createElement(components_1.Text, { style: footer }, "If you did not request this email, you can safely ignore it.")))));
};
exports.EmailTemplate = EmailTemplate;
var PrimaryActionEmailHtml = function (props) {
    return (0, components_1.render)(react_1.default.createElement(exports.EmailTemplate, __assign({}, props)), { pretty: true });
};
exports.PrimaryActionEmailHtml = PrimaryActionEmailHtml;
var main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
var container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};
var logo = {
    margin: "0 auto",
};
var paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};
var btnContainer = {
    textAlign: "center",
};
var button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
};
var hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};
var footer = {
    color: "#8898aa",
    fontSize: "12px",
};
