import { VKBotConfig, VKApiConfig, VKPoolConfig, VKBotConfigState } from './types'

const defaultVkApiConfig: Pick<VKApiConfig, 'v'> = {
  v: '5.120',
}

const defaultVkPoolConfig: VKPoolConfig = {
  act: 'a_check',
  wait: 25,
  mode: 128 + 8 + 2,
  version: 2
}

export function createVkBotConfigState({pool, access_token, group_id, ...vkApiConfig}: VKBotConfig): VKBotConfigState {
  return {
    api: {
      ...defaultVkApiConfig,
      access_token,
      group_id,
      ...vkApiConfig,
    },
    pool: {
      ...defaultVkPoolConfig,
      ...pool,
    },
  }
}
