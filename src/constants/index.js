// @flow
import type { Subscription } from '../type';

// URL
export const HOST = 'https://api.upbit.com/v1';
export const WSS_HOST = 'wss://api.upbit.com/websocket/v1';

export const GET = 'GET';
export const POST = 'POST';
export const DELETE = 'DELETE';

export const DEFAULT_MARKET = 'KRW-BTC';

// ENUM for Price change
export const EVEN = 'EVEN';
export const RISE = 'RISE';
export const FALL = 'FALL';

// ENUM for time units
export const DAYS = 'days';
export const WEEKS = 'weeks';
export const MONTHS = 'months';

// ENUM for trade type
export const ASK = 'ASK'; // ask
export const BID = 'BID'; // buy

// ENUM for order status
export const WAIT = 'wait';
export const DONE = 'done';
export const CANCEL = 'cancel';

// ENUM for order by
export const ASC = 'asc';
export const DESC = 'desc';

// ENUM for order type
export const LIMIT = 'limit';

// ENUM for web socket message
export const UNIQUE_TICKET = 'UNIQUE_TICKET';

export const subscription: Subscription = {
  intervalId: null,
  subscriptions: {},
};
