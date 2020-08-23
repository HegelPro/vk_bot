import FormData = require('form-data')
import fs = require('fs')
import Axios, {AxiosResponse} from 'axios'
import { MessageEvent, Payload } from '.'
import {send} from '../actions'
import { apiVkRequest } from '../api'
import methods from '../methods'
import { VKApiConfig } from '../types'

export interface SendMessageOptions {
  message?: string
  keyboard?: string
  attachment?: string
}

export interface Context<T = unknown> {
  event: MessageEvent

  send: (event: MessageEvent, options: SendMessageOptions) => Promise<unknown>

  payload?: Payload<T>

  reply: (message: string, attachment?: string, keyboard?: string) => Promise<unknown>

  sendMessage: (message: string) => Promise<unknown>

  sendAttachment: (attachment: string) => Promise<unknown>

  loadPhoto: (path: string) => Promise<string | undefined>
  loadDoc: (path: string) => Promise<string | undefined>
}

export const createContext = (apiConfigState: VKApiConfig) => (event: MessageEvent): Context => {
  return {
    event,
    payload: event.metaData.payload && JSON.parse(event.metaData.payload),
    send: (event, options) => send(apiConfigState)(event, options),
    reply: (message, attachment, keyboard) => send(apiConfigState)(event, {message, attachment, keyboard}),
    sendMessage: (message) => send(apiConfigState)(event, {message}),
    sendAttachment: (attachment) => send(apiConfigState)(event, {attachment}),
    loadPhoto: (path) =>
      // TODO - тут ничего не происходит
      apiVkRequest(apiConfigState)(methods.photos.getMessagesUploadServer)
        .then(({data}) => data.response.upload_url)
        .then((url) => {
          const form = new FormData()
          form.append('photo', fs.createReadStream(path))
          return Axios.post(url, form, {
            headers: { 'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}` },
          })
        })
        .then(({data}) => apiVkRequest(apiConfigState)(methods.photos.saveMessagesPhoto, data))
        .then(({data: {response}}: LoadedPhotoResponse) =>
          (response && response[0] && response[0].owner_id && response[0].id) ? `photo${response[0].owner_id}_${response[0].id}` : undefined
        ),
    loadDoc: (path) =>
      apiVkRequest(apiConfigState)(methods.docs.getMessagesUploadServer, {type: 'doc', peer_id: event.peer_id})
        .then(({data}) => data.response.upload_url)
        .then((url) => {
          const form = new FormData()
          form.append('file', fs.createReadStream(path))

          return Axios.post(url, form, {
            headers: { 'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}` },
          })
        })
        .then(({data}) => apiVkRequest(apiConfigState)(methods.docs.save, data))
        .then((data) => {
          console.log(data.data)
          return data
        })
        .then(({data: {response}}: LoadedDocResponse) =>
          response ? `${response.type}${response.doc.owner_id}_${response.doc.id}` : undefined
        )
        
  }
}

type LoadedPhotoResponse = AxiosResponse<{response?: [{owner_id: number, id: number}|undefined]}>
type LoadedDocResponse = AxiosResponse<{response?: {type: 'doc', doc: {
  id: number,
  owner_id: 541615064,
}}}>