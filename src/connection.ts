import { connectVkPollApi, apiVkRequest } from './api'
import methods from './methods'
import {VKBotState, VKBotConfigState } from './types'
import { createEventHandler } from './events/messageEvents'

const createConnectPoll = (configState: VKBotConfigState, botState: VKBotState) => (connectionState: {
  server: string,
  key: string,
  ts: string,
}) => {
  connectVkPollApi({
    server: connectionState.server,
    key: connectionState.key,
    ts: connectionState.ts,
    ...configState.pool,
  })
    .then(res => res.data)
    .then(({ts, updates}: {
      ts: string,
      updates: any[][],
    }) => {
      createEventHandler(configState.api, botState)(updates)

      createConnectPoll(configState, botState)({...connectionState, ts})
    })
    .catch(() => console.log('Connect Poll Bot Error'))
}

export const createConnect = (configState: VKBotConfigState, botState: VKBotState) => () => {
  apiVkRequest(configState.api)(methods.messages.getLongPollServer)
    .then(res => res.data)
    .then(({response}) => createConnectPoll(configState, botState)(response))
    .catch(() => console.log('Connect Bot Error'))
}
