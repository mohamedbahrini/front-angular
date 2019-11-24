import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {
  brokerURL: 'ws://127.0.0.1:15674/ws',

  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },

  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  reconnectDelay: 20000,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};