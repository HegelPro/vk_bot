import methods from '../methods'
import { apiVkRequest } from '../api'
import { MessageEvent } from '../events'
import { SendMessageOptions } from '../events/context'
import { VKApiConfig } from '../types'

export const send = (apiConfigState: VKApiConfig) => (event: MessageEvent, {message, keyboard, attachment}: SendMessageOptions): Promise<unknown> => {
  const random_id = Math.floor(Math.random() * 10**6)

  return apiVkRequest(apiConfigState)(methods.messages.send, {
    peer_id: event.peer_id,
    message,
    random_id,
    keyboard,
    attachment,
  })
}

export function kkkk() {
  
}