"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.getCurrencyExchangeRates = exports.getWalletInfo = void 0;
const node_fetch_1 = require("node-fetch");
exports.getWalletInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get a list of 'Normal' Transactions By Address endpoint: https://etherscan.io/apis#accounts
    const response = yield node_fetch_1.default(`https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.API_KEY}`);
    const body = yield response.json();
    const lastTransaction = new Date(body.result[0].timeStamp * 1000);
    const oneYearBefore = new Date().setFullYear(new Date().getFullYear() - 1);
    const isOldWallet = new Date(oneYearBefore) > lastTransaction;
    res.send({
        isOldWallet,
    });
});
// export let getDollarExchangeRate = async (req: Request, res: Response) => {
//   // Get ether USD last price endpoint: https://etherscan.io/apis#stats
//   const response = await fetch(
//     `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.API_KEY}`
//   );
//   const body = await response.json();
//   const USD = body.result.ethusd;
//   res.send({ USD });
// };
exports.getCurrencyExchangeRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ether EUR last price endpoint : https://min-api.cryptocompare.com/
    const response = yield node_fetch_1.default(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR,USD`);
    const body = yield response.json();
    res.send(body);
});
exports.getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get balance for a single address in WEI endpoint: https://etherscan.io/apis#accounts
    const response = yield node_fetch_1.default(`https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=${process.env.API_KEY}`);
    const body = yield response.json();
    const result = body.result / 1000000000000000000; // Convert response from Wei to Ether
    // Sometimes api do not respond due to account limit requests.
    res.send({
        result,
    });
});
//# sourceMappingURL=status.js.map