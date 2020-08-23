import {VKBotState, VKBotConfig, VKBotConfigState} from './types';
import {createConnect} from './connection'
import {createOn, createCommand, createAddEvent} from './events/messageEvents';
import { createVkBotConfigState } from './config';

export default class Bot {
  private eventState: VKBotState = {
    eventsHandlers: [],
  }

  private configState: VKBotConfigState

  connect: () => void

  constructor(config: VKBotConfig) {
    this.configState = createVkBotConfigState(config)

    this.connect = createConnect(this.configState, this.eventState)
  }
  
  on = createOn(this.eventState)

  command = createCommand(this.eventState)

  addEvent = createAddEvent(this.eventState)
}
