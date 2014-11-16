'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var compression = require('compression');

var app = express();
app.use(compression());
app.use(serveStatic('public', {
}));

app.use(serveIndex('public', {
  icons: true
}));

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening");
});
