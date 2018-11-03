// @flow
import fetch from 'node-fetch';
import WebSocket from 'ws';
import { HOST, WSS_HOST, DEFAULT_MARKET, subscription } from '../constants';
import type { SubscriptionOption, TimeUnit, Minute, Market, Candle, Tick, Orderbook, MarketInfo } from '../type';
import { handleWsOpen, handleWsError, handleWsClose, getEndpoint, serializeArray } from '../utils';

/**
 * Get websocket instance to subscribe websocket protocol
 *
 * @param {Object} options
 * @param {Function} options.reconnect - Callback that is executed when try to reconnect to websocket
 * @param {Function} options.openCallback - Callback that is executed when websocket is opened
 * @param {Function} options.messageCallback - Callback that is executed when message is received
 * @param {Object} options.subscriptionList - List that you want to subscribe
 * @return {Object} ws - instance of WebSocket
 */
export const subscribe: Function = (options: SubscriptionOption): void => {
  const ws = new WebSocket(WSS_HOST);

  const { reconnect, openCallback, messageCallback, subscriptionList } = options;
  ws.reconnect = !!reconnect;
  ws.endpoint = WSS_HOST;
  ws.isAlive = false;

  ws.on('open', handleWsOpen.bind(ws, WSS_HOST, subscription, subscriptionList, openCallback));
  ws.on('pong', () => { ws.isAlive = true; });
  ws.on('error', handleWsError);
  ws.on('close', handleWsClose.bind(ws, subscription, reconnect));
  ws.on('message', (data: any): void => {
    if (typeof messageCallback === 'function') {
      try {
        messageCallback(JSON.parse(data));
      } catch (error) {
        console.error(`Parse error : ${error.message}`);
      }
    }
  });

  return ws;
};

/**
 * Get tickers of given markets
 * https://api.upbit.com/v1/ticker?markets=KRW-BTC
 *
 * @async
 * @param {String[]} markets - Element should folow AAA-BBB
 * @return {Promise<Object>}
 */
export const getTicker: Function = async (markets: Array<string> = [DEFAULT_MARKET]): Promise<Array<Market>> => {
  const pathname: string = 'ticker';
  const qs: string = `markets=${serializeArray(markets, (_: string): string => _.toUpperCase())}`;
  const endpoint: string = getEndpoint(HOST, pathname, qs);
  const result: Response = await fetch(endpoint);
  const data: Array<Market> = await result.json();

  return data;
};

/**
 * Get candles of given market (time unit: minutes)
 * https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {Number} minutes - Interval of candle. one of [1, 3, 5, 10, 30, 60]
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */
export const getMinCandles: Function = async (market: string = DEFAULT_MARKET, minutes: Minute = 5, count: number = 3): Promise<Array<Candle>> => {
  if (count > 200) {
    throw new Error(`Invalid data for count. ${count} must under 200`);
  }

  const pathname: string = `candles/minutes/${minutes}`;
  const qs: string = `market=${market.toUpperCase()}&count=${count}`;
  const endpoint: string = getEndpoint(HOST, pathname, qs);
  const result: Response = await fetch(endpoint);
  const data: Array<Candle> = await result.json();

  return data;
};

/**
 * Get candles of given market (time unit: day | week | month)
 * https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {String} timeUnit - Interval of candle. one of [days, weeks, months]
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */
export const getCandles: Function = async (market: string = DEFAULT_MARKET, timeUnit: TimeUnit = 'days', count: number = 3): Promise<Array<Candle>> => {
  if (count > 200) {
    throw new Error(`Invalid data for count. ${count} must under 200`);
  }

  const pathname: string = `candles/${timeUnit}`;
  const qs: string = `market=${market.toUpperCase()}&count=${count}`;
  const endpoint: string = getEndpoint(HOST, pathname, qs);
  const result: Response = await fetch(endpoint);
  const data: Array<Candle> = await result.json();

  return data;
};

/**
 * Get Tick price of given market
 * https://api.upbit.com/v1/trades/ticks?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */
export const getTick: Function = async (market: string = DEFAULT_MARKET, count: number = 3): Promise<Array<Tick>> => {
  const pathname: string = 'trades/ticks';
  const qs: string = `market=${market.toUpperCase()}&count=${count}`;
  const endpoint: string = getEndpoint(HOST, pathname, qs);
  const result: Response = await fetch(endpoint);
  const data: Array<Tick> = await result.json();

  return data;
};

/**
 * Get Orderbook of given market
 * https://api.upbit.com/v1/orderbook?markets=KRW-BTC
 *
 * @async
 * @param {String[]} markets - Element should folow AAA-BBB
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */
export const getOrderbook: Function = async (markets: Array<string> = [DEFAULT_MARKET]): Promise<Array<Orderbook>> => {
  const pathname: string = 'orderbook';
  const qs: string = `markets=${serializeArray(markets, (_: string): string => _.toUpperCase())}`;
  const endpoint: string = getEndpoint(HOST, pathname, qs);
  const result: Response = await fetch(endpoint);
  const data: Array<Orderbook> = await result.json();

  return data;
};

/**
 * Get list of markets available
 * https://api.upbit.com/v1/market/all
 *
 * @async
 * @return {Promise<Object>}
 */
export const getMarketList: Function = async (): Promise<Array<MarketInfo>> => {
  const pathname: string = 'market/all';
  const endpoint: string = getEndpoint(HOST, pathname, null);
  const result: Response = await fetch(endpoint);
  const data: Array<MarketInfo> = await result.json();

  return data;
};