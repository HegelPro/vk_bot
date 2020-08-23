import axios from 'axios'
import { VKPoolConfig, VKApiConfig } from './types'

export const apiVkRequest = (apiConfig: VKApiConfig) => (method: string, params = {}) =>
  axios.get(`https://api.vk.com/method/${method}`, {params: {...apiConfig, ...params}})


export const connectVkPollApi = ({
  server,
  ...params
}: {
  server: string,
  key: string,
  ts: string,
} & VKPoolConfig) => axios.get(`https://${server}`, {params})
