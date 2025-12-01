/**
 * External dependencies.
 */
const React = require("react");
const { TextEncoder, TextDecoder } = require("node:util");

global.React = React;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
