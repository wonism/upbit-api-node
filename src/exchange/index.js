// @flow
import fetch from 'node-fetch';
import { sign } from 'jsonwebtoken';
import { HOST, GET, POST, DELETE, DEFAULT_MARKET, WAIT, ASC, LIMIT } from '../constants';
import type { Payload, Asset, OrderChance, OrderStatus, OrderBy, OrderType, OrderSide, Order } from '../type';
import { getEndpoint } from '../utils';

export default class Exchange {
  accessKey: string;
  secretKey: string;
  token: string;
  headers: { Authorization: string };

  static getPayload = (accessKey: string, query?: string): Payload => {
    if (query) {
      return { access_key: accessKey, nonce: Date.now(), query };
    }

    return { access_key: accessKey, nonce: Date.now() };
  };

  constructor(accessKey: string, secretKey: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /**
   * Get user's asset information
   * https://api.upbit.com/v1/accounts
   *
   * @async
   * @return {Promise<Object>}
   */
  async getMyAssets(): Promise<Asset> {
    const pathname = 'accounts';
    const endpoint: string = getEndpoint(HOST, pathname);

    const payload = Exchange.getPayload(this.accessKey);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: GET,
      url: endpoint,
      headers,
    };

    const result: Response = await fetch(endpoint, options);
    const data: Asset = await result.json();

    return data;
  }

  /**
   * Get order chance
   * https://api.upbit.com/v1/accounts
   *
   * @async
   * @param {string} market - AAA-BBB
   * @return {Promise<Object>}
   */
  async getOrderChance(market: string = DEFAULT_MARKET): Promise<OrderChance> {
    const pathname = 'orders/chance';
    const qs: string = `market=${market.toUpperCase()}`;
    const endpoint: string = getEndpoint(HOST, pathname, qs);

    const payload = Exchange.getPayload(this.accessKey, qs);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: GET,
      url: endpoint,
      headers,
    };

    const result: Response = await fetch(endpoint, options);
    const data: OrderChance = await result.json();

    return data;
  }

  /**
   * Get user's order list
   * https://api.upbit.com/v1/orders
   *
   * @async
   * @param {string} [market] - AAA-BBB
   * @param {string} state - status of order. one of [wait, done, cancel]
   * @param {number|string} page - page number
   * @param {string} orderBy - sorting method. one of [asc, desc]
   * @return {Promise<Object>}
   */
  async getOrderList(market?: string, state: OrderStatus = WAIT, page: number | string = 1, orderBy: OrderBy = ASC): Promise<Array<Order>> {
    const pathname = 'orders';
    const qs: string = market
      ? `market=${market}&state=${state}&page=${page}&order_by=${orderBy}`
      : `state=${state}&page=${page}&${orderBy}`;
    const endpoint: string = getEndpoint(HOST, pathname, qs);

    const payload = Exchange.getPayload(this.accessKey, qs);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: GET,
      url: endpoint,
      headers,
    };

    const result: Response = await fetch(endpoint, options);
    const data: Array<Order> = await result.json();

    return data;
  }

  /**
   * Get user's specific order
   * https://api.upbit.com/v1/order
   *
   * @async
   * @param {string} uuid - uuid for order
   * @return {Promise<Object>}
   */
  async getOrder(uuid: string): Promise<Order> {
    const pathname = 'order';
    const qs: string = `uuid=${uuid}`;
    const endpoint: string = getEndpoint(HOST, pathname, qs);

    const payload = Exchange.getPayload(this.accessKey, qs);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: GET,
      url: endpoint,
      headers,
    };

    const result: Response = await fetch(endpoint, options);
    const data: Order = await result.json();

    return data;
  }

  /**
   * Create order
   * https://api.upbit.com/v1/orders
   *
   * @async
   * @param {string} market - AAA-BBB
   * @param {string} side - one of [bid, ask] (bid: buy, ask: sell)
   * @param {string} volume - amount you want to trade
   * @param {string} price - price you want to trade
   * @param {string} orderType - one of [limit]
   * @return {Promise<Object>}
   */
  async createOrder(market: string = DEFAULT_MARKET, side: OrderSide, volume: string, price: string, orderType: OrderType = LIMIT): Promise<Order> {
    if (!side || !volume || !price) {
      throw new Error('Invalid data format for creating order. `side`, `volume` and `price` are required.');
    }

    const pathname = 'orders';
    const qs: string = `market=${market}&side=${side}&volume=${volume}&price=${price}&ord_type=${orderType}`;
    const endpoint: string = getEndpoint(HOST, pathname);

    const payload = Exchange.getPayload(this.accessKey, qs);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method: POST,
      url: endpoint,
      headers,
      body: JSON.stringify({
        market,
        side,
        volume,
        price,
        ord_type: orderType,
      }),
    };

    const result: Response = await fetch(endpoint, options);
    const data: Order = await result.json();

    return data;
  }

  /**
   * Cancel order
   * https://api.upbit.com/v1/order
   *
   * @async
   * @param {string} uuid - uuid for order
   * @return {Promise<Object>}
   */
  async cancelOrder(uuid: string): Promise<Order> {
    const pathname = 'order';
    const qs: string = `uuid=${uuid}`;
    const endpoint: string = getEndpoint(HOST, pathname, qs);

    const payload = Exchange.getPayload(this.accessKey, qs);
    const token = sign(payload, this.secretKey);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: DELETE,
      url: endpoint,
      headers,
    };

    const result: Response = await fetch(endpoint, options);
    const data: Order = await result.json();

    return data;
  }
}
