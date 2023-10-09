import WebWatcher from './watcher'
import { uuid } from '../utils/uuid'
import { EVENT_TRACK_TAG } from '../utils/constant'
import MessagePool, { EventMessage, ClickEventMessage } from './messagePool'
// 点击事件信息


const initPath = (e: MouseEvent) => {
    let path = [];
    let el = e.target as HTMLElement;

    while (el.nodeName.toLowerCase() !== 'body') {
        let selector = el.nodeName.toLowerCase();

        if (el.id) { // element has id
            selector += `#${el.id}`;
        } else if (el.className && typeof el.className === 'string') { // element has class
            selector += '.' + el.className.split(' ').filter(item => !(item.includes('focused') || item.includes('hover'))).join('.');
        } else { // use nth-child 
            const childIndex = Array.prototype.indexOf.call(el.parentNode?.children, el) + 1;
            selector += `:nth-child(${childIndex})`;
        }

        path.unshift(selector);
        el = el.parentNode as HTMLElement;
    }


    path.unshift('body');
    const path_select = path.join('>')

    return path_select

};



export default class HeatmapWatcher {
    watcher: WebWatcher
    messagePool: MessagePool

    constructor(watcher: WebWatcher) {
        this.watcher = watcher
        this.messagePool = watcher.messagePool
        this.watch()
    }
    // 收集点击事件
    watchClickEvent() {
        document.addEventListener('click', (event: MouseEvent) => {
            const message = new ClickEventMessage({ eventType: 'clickHeatmap' })
            const { clientX: x, clientY: y, offsetX, offsetY, } = event;
            const path = initPath(event);
            if (!path.length) return
            console.log("🚀  path:", path)
            message.x = x
            message.y = y
            message.path = path
            message.offsetX = offsetX
            message.offsetY = offsetY
            message.url = location.href

            this.emit(message)
        }, true)
    }

    // 发送数据
    emit(message: EventMessage) {
        this.messagePool.emit(message)
    }

    // 启动监控
    watch() {
        this.watchClickEvent()
    }
}