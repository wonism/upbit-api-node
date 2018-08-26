// @flow
import { OPEN } from 'ws';
import { UNIQUE_TICKET } from '../constants';
import type { Subscription, SubscriptionList } from '../type';

const heartbeat = (state: Subscription): void => {
  Object.values(state.subscriptions).forEach((ws: any) => {
    if (ws.isAlive) {
      ws.isAlive = false;

      if (ws.readyState === OPEN) {
        ws.ping(() => {});
      }
    } else {
      if (ws.readyState === OPEN) {
        ws.terminate();
      }
    }
  });
};

export const handleWsOpen = function handleWsOpen(host: string, state: Subscription, subscriptionList: SubscriptionList, openCallback: ?Function): void {
  if (typeof openCallback === 'function') {
    openCallback(host);
  }

  this.isAlive = true;

  const entries = Object.entries(subscriptionList);
  const messageJson = entries.reduce((prev, [type, codes]) => ([...prev, { type, codes }]), [{ ticket: UNIQUE_TICKET }]);
  const message = JSON.stringify(messageJson);

  this.send(message);

  if (Object.keys(state.subscriptions).length === 0) {
    state.intervalId = setInterval((): void => { heartbeat(state); }, 30000);
  }

  state.subscriptions[host] = this;
};

export const handleWsError = (err: { code: string | number, message: string }): void => {
  console.error(`WebSocket error : ${[err.code, err.message].filter(_ => _).join(',')}`);
};

export const handleWsClose = function handleWsClose(state: Subscription, reconnect: ?Function): void {
  delete state.subscriptions[this.endpoint];

  if (!Object.keys(state.subscriptions).length && state.intervalId) {
    clearInterval(state.intervalId);
  }

  if (typeof reconnect === 'function') {
    reconnect();
  }
};

export const getEndpoint = (host: string, pathname: string, qs?: string): string => (qs ? `${host}/${pathname}?${qs}` : `${host}/${pathname}`);

export const serializeArray = (arr: Array<string>, callback: Function): string => arr.map(callback).join(',');
