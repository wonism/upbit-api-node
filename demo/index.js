import upbit from '../src';

const { getTicker, getMinCandles, getCandles, getTick, getOrderbook, getMarketList, subscribe } = upbit;

(async () => {
  console.log('---------- getTicker() ----------')
  console.log(await getTicker());

  console.log('---------- getMinCandles() ----------')
  console.log(await getMinCandles());

  console.log('---------- getCandles() ----------')
  console.log(await getCandles());

  console.log('---------- getTick() ----------')
  console.log(await getTick());

  console.log('---------- getOrderbook() ----------')
  console.log(await getOrderbook());

  console.log('---------- getOrderbook() ----------')
  console.log(await getMarketList());

  console.log('---------- subscribe() ----------')
  subscribe({
    reconnect: () => {
      console.log('RECONNECT');
    },
    openCallback: () => {
      console.log('OPENED');
    },
    messageCallback: (data) => {
      console.log(data);
    },
    subscriptionList: {
      trade: ['KRW-BTC'],
    },
  });
})();
