"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const statusController = require("./controllers/status");
require('dotenv').config();
const app = express();
app.set('port', process.env.PORT || 3001);
// DEV: cors enable
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// Endpoints
app.get(`/getwalletinfo`, statusController.getWalletInfo);
// app.get('/getdollarexchangerate', statusController.getDollarExchangeRate);
app.get('/getcurrencyexchangerates', statusController.getCurrencyExchangeRates);
app.get('/getbalance', statusController.getBalance);
const server = app.listen(app.get('port'), () => {
    console.log('App is running on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});
exports.default = server;
//# sourceMappingURL=server.js.map