# Upbit API Node
> API wrapper for Upbit

[![npm version](https://badge.fury.io/js/upbit-api-node.svg)](https://badge.fury.io/js/upbit-api-node)
[![Build Status](https://travis-ci.org/wonism/upbit-api-node.svg)](https://travis-ci.org/wonism/upbit-api-node)

## Install
```
$ npm i -S upbit-api-node
```

## Disclaimer
```
I am not responsible for anything done with this.
You use it at your own risk.
There are no warranties or guarantees expressed or implied.
You assume all responsibility and liability.
```

## Quotation APIs
### subscribe(options) => ws
Get websocket instance to subscribe websocket protocol

**Kind**: global function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| options                  | Object   |                                                              |
| options.reconnect        | Function | Callback that is executed when try to reconnect to websocket |
| options.openCallback     | Function | Callback that is executed when websocket is opened           |
| options.messageCallback  | Function | Callback that is executed when message is received           |
| options.subscriptionList | Object   | List that you want to subscribe                              |

### getTicker(markets) => Promise
Get tickers of given markets

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| markets                  | String[] | Element should folow AAA-BBB                                 |

### getMinCandles(market, minutes, count) => Promise
Get candles of given market (time unit: minutes)

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| markets                  | String   | AAA-BBB                                                      |
| minutes                  | Number   | Interval of candle. one of [1, 3, 5, 10, 30, 60]             |
| count                    | Number   | Numbers of candle count you want. 1 - 200                    |

### getCandles(market, timeUnit, count) => Promise
Get candles of given market (time unit: day | week | month)

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| markets                  | String   | AAA-BBB                                                      |
| timeUnit                 | String   | Interval of candle. one of [days, weeks, months]             |
| count                    | Number   | Numbers of candle count you want. 1 - 200                    |

### getTick(market, count) => Promise
Get Tick price of given market

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| markets                  | String   | AAA-BBB                                                      |
| count                    | Number   | Numbers of candle count you want. 1 - 200                    |

### getOrderbook(markets, count) => Promise
Get Orderbook of given market

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| markets                  | String[] | Element should folow AAA-BBB                                 |
| count                    | Number   | Numbers of candle count you want. 1 - 200                    |

### getMarketList() => Promise
Get Market List

**Kind**: global async function

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| n/a                      | n/a      | n/a                                                          |

## Exchange APIs
You need to create instance of Exchange class before using methods

### How to create instance of Exchange class?
```
import { Exchange } from 'upbit-api-node';
const upbitExchange = new Exchange(ACCESS_KEY, SECRET_KEY);
```

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| accessKey                | String   | n\a                                                          |
| secretKey                | String   | n\a                                                          |

- You should go to [Open API Management page](https://upbit.com/mypage/open_api_management) to acquire these keys.

### upbitExchange.getMyAssets() => Promise
Get user's asset information

**Kind**: async method of instance of Exchange

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| n\a                      | n\a      | n\a                                                          |

### upbitExchange.getOrderChance(market) => Promise
Get order chance

**Kind**: async method of instance of Exchange

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| market                   | String   | AAA-BBB                                                      |

### upbitExchange.getOrderList(market?, state, page, orderBy) => Promise
Get user's order list

**Kind**: async method of instance of Exchange

| Param                    | Type             | Description                                                  |
| ------------------------ | ---------------- | ------------------------------------------------------------ |
| market                   | String           | AAA-BBB (Optional)                                           |
| state                    | String           | status of order. one of [wait, done, cancel]                 |
| page                     | String           | page number                                                  |
| orderBy                  | String | Number  | sorting method. one of [asc, desc]                           |

### upbitExchange.getOrder(uuid) => Promise
Get user's specific order

**Kind**: async method of instance of Exchange

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| uuid                     | String   | uuid for order                                               |

### upbitExchange.createOrder(market, side, volume, price, orderType) => Promise
Create order

**Kind**: async method of instance of Exchange

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| market                   | String   | AAA-BBB                                                      |
| side                     | String   | one of [bid, ask] (bid: buy, ask: sell)                      |
| volume                   | String   | amount you want to trade                                     |
| price                    | String   | price you want to trade                                      |
| orderType                | String   | one of [limit]                                               |

### upbitExchange.cancelOrder(uuid) => Promise
Cancel order

**Kind**: async method of instance of Exchange

| Param                    | Type     | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| uuid                     | String   | uuid for order                                               |
