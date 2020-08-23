import { MessageParams, MessageEvent } from '../events'

export const convertMessage = (params: MessageParams): MessageEvent => ({
  message_id: params[0],
  unnoun_id: params[1],
  peer_id: params[2],
  date: params[3],
  text: params[4],
  metaData: params[5],
  random_id: params[6],
})