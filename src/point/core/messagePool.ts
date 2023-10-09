import axios from 'axios'
import { IOptions } from './option'
import { TimePerformance } from './performance'

/**
 * 定义消息池和各种类型的message
*/
export type EventMessage = ClickEventMessage | TimePerformanceMessage


export class ClickEventMessage {
    eventType: string
    eventId: string
    tiggerTime: number
    url: string
    params: any
    title: string
    x: number
    y: number
    path?: string

    offsetY?: number
    offsetX?: number
    [key: string]: any
    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'url', 'params', 'title', 'x', 'y', 'path', 'offsetX', 'offsetY'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}

export class TimePerformanceMessage {
    eventType: string
    eventId: string
    tiggerTime: number
    url: string
    time: number | undefined

    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'tiggerTime', 'time', 'url'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}

export default class MessagePool {
    messagePool: any[]
    options: IOptions
    constructor(options: IOptions) {
        this.messagePool = []
        this.options = options
    }





    send() {
        if (this.messagePool.length) {
            const { requestUrl } = this.options
            const sendPool = this.messagePool.splice(0, 10)

            axios.post(requestUrl, {
                data: sendPool
            })
            requestIdleCallback(this.send.bind(this))
        }
    }


    emit(msg: any) {
        this.messagePool.push(msg)
        requestIdleCallback(this.send.bind(this))
    }
}