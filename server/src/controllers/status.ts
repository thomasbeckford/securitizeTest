import { Request, Response } from 'express';
import fetch from 'node-fetch';

export let getWalletInfo = async (req: Request, res: Response) => {
  // Get a list of 'Normal' Transactions By Address endpoint: https://etherscan.io/apis#accounts
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.API_KEY}`
  );
  const body = await response.json();
  const lastTransaction = new Date(body.result[0].timeStamp * 1000);
  const oneYearBefore = new Date().setFullYear(new Date().getFullYear() - 1);
  const isOldWallet = new Date(oneYearBefore) > lastTransaction;
  res.send({
    isOldWallet,
    status: body.status,
    message: body.message,
  });
};

export let getCurrencyExchangeRates = async (req: Request, res: Response) => {
  // Get ether EUR last price endpoint : https://min-api.cryptocompare.com/
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR,USD`
  );
  const body = await response.json();
  if (body) res.send(body);
};

export let getBalance = async (req: Request, res: Response) => {
  // Get balance for a single address in WEI endpoint: https://etherscan.io/apis#accounts
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=${process.env.API_KEY}`
  );
  const body = await response.json();
  const balance = body.result / 1000000000000000000; // Convert response from Wei to Ether
  // Sometimes api do not respond due to account limit requests.
  res.send({
    balance,
    status: body.status,
    message: body.message,
  });
};
