export interface Payload<D> {
  type: string
  data: D
}

export type CreatePayload<D> = (data: D) => Payload<D>
export type PayloadCreator = <D = unknown>(type: string) => CreatePayload<D>
export const payloadCreator: PayloadCreator = (type) => (data) => ({
  type,
  data,
})


// VK
interface MetaData {
  payload?: string
}

export type MessageParams = [number, number, number, number, string, MetaData, number]

export interface MessageEvent {
  message_id: number,
  unnoun_id: number,
  peer_id: number,
  date: number,
  text: string,
  metaData: MetaData,
  random_id: number,
}
