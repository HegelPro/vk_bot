import { Context } from './events/context';

export type EventHandler<T = any> = (ctx: Context<T>) => void

export interface ConnectionState {
  server: string | undefined,
  key: string | undefined,
}

export interface VKBotState {
  eventsHandlers: EventHandler[]
}

export interface VKBotConfigState {
  pool: VKPoolConfig,
  api: VKApiConfig,
}

export interface VKApiConfig {
  access_token: string,
  v: string,
  group_id: string,
} 

export interface VKPoolConfig {
  act: string,
  wait: number,
  mode: number,
  version: number,
}

export interface VKBotConfig extends
Pick<VKApiConfig, 'access_token' | 'group_id'>,
Partial<Omit<VKApiConfig, 'access_token' | 'group_id'>> {
  pool?: VKPoolConfig,
}