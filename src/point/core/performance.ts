import WebWatcher from './watcher'
import MessagePool, { EventMessage, TimePerformanceMessage } from './messagePool'
import { uuid } from '../utils/uuid'

export type TimePerformance = {
    fmp: number         // 首屏渲染时间
    fpt?: number         // 白屏时间
    tti?: number         // 首次可交互时间
    ready?: number       // HTML加载完成时间
    onload?: number      // 页面完全加载时间
    firstbyte?: number   // 首包时间
    dns?: number         // dns查询耗时
    appcache?: number    // dns缓存时间
    tcp?: number         // tcp连接耗时
    ttfb?: number        // 请求响应耗时
    trans?: number       // 内容传输耗时    
    dom?: number         // dom解析耗时
    res?: number         // 同步资源加载耗时
    ssllink?: number     // SSL安全连接耗时
    redirect?: number    // 重定向时间
    unloadTime?: number  // 上一个页面的卸载耗时
}

//todo API兼容性判断
const supported = {
    performance: !!window.performance,
    getEntriesByType: !!(window.performance && performance.getEntriesByType),
    PerformanceObserver: 'PerformanceObserver' in window,
    MutationObserver: 'MutationObserver' in window,
    PerformanceNavigationTiming: 'PerformanceNavigationTiming' in window,
};

/**
 * 格式化性能记录,小数位数保留最多两位, 等于0的字段不传输,标记为undefined
 */
function normalizePerformanceRecord(v: number | undefined) {
    if (typeof v === 'number') v === 0 ? undefined : parseFloat(v.toFixed(2));

    return v;
}

export default class PerformanceWatcher {
    watcher: WebWatcher
    messagePool: MessagePool

    constructor(watcher: WebWatcher) {
        this.watcher = watcher
        this.messagePool = watcher.messagePool
        this.watch()
    }

    /**计算首屏渲染时间FMP */
    getFirstPaintTimes() {
        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            let firstPaint, firstContentfulPaint;
            for (const entry of entries) {
                if (entry.name === "first-paint") {
                    firstPaint = entry.startTime;
                } else if (entry.name === "first-contentful-paint") {
                    firstContentfulPaint = entry.startTime;
                }
            }
            const message = new TimePerformanceMessage({ eventType: 'fpt' })
            message.eventId = uuid()
            message.url = window.location.href
            message.time = normalizePerformanceRecord(firstPaint || firstContentfulPaint)
            message.tiggerTime = Date.now()
            this.emit(message)
        });
        observer.observe({ entryTypes: ["paint"] });
    }

    // 首次交互时间
    gettti() {
        let tti = 0
        const performanceObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.entryType === "first-input") {
                    const firstInputTime = entry.startTime;
                    tti = firstInputTime
                    const message = new TimePerformanceMessage({ eventType: 'fit' })
                    message.eventId = uuid()
                    message.url = window.location.href
                    message.time = normalizePerformanceRecord(tti)
                    message.tiggerTime = Date.now()
                    this.emit(message)
                }
            }
        });

        performanceObserver.observe({ type: "first-input", buffered: true });
    }

    /** 兼容v2和v1的perfermanceAPI(优先使用v2)  https://www.w3.org/TR/navigation-timing-2/*/
    supportTimingAPI() {
        let t = window.performance.timing
        return t
    }



    /**记录白屏时间 */
    getwst() {
        const whiteScreenTime = performance.timing.responseStart - performance.timing.navigationStart
        const message = new TimePerformanceMessage({ eventType: 'wst' })
        message.eventId = uuid()
        message.url = window.location.href
        message.time = normalizePerformanceRecord(whiteScreenTime)
        message.tiggerTime = Date.now()
        this.emit(message)
    }


    /**发送首屏渲染数据*/
    postFirstRenderPerformance() {
        this.getwst()
        this.getFirstPaintTimes()
        this.gettti()

    }

    /**发送资源加载性能数据*/
    postResourcePerformance() {

    }

    /**监控页面资源加载性能*/
    observeResource() {

    }

    /**开始监视性能*/
    watch() {
        //! 初始化方法可能在onload事件之后才执行,此时不会触发load事件了,检查document.readyState属性来判断onload事件是否会被触发
        this.postFirstRenderPerformance()
    }

    /**上报数据*/
    emit(message: EventMessage) {
        this.messagePool.emit(message)
    }
}