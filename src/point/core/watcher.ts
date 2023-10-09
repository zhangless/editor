
import { parseOption, IOptions } from './option'
import ErrorWatcher from './error'
import EventWatcher from './event'
import RouterWatcher from './router'
import PerformanceWatcher from './performance'
import HeatmapWatcher from './heatmap'
import MessagePool from './messagePool'

/**
 * 前端页面监控器
*/
class XzWebWatcher {

    messagePool: MessagePool
    private _options?: IOptions
    private errorWatcher?: ErrorWatcher
    private eventWatcher?: EventWatcher
    private performanceWatcher?: PerformanceWatcher
    private heatmapWatcher?: HeatmapWatcher


    constructor(option: any = {}) {
        this._options = parseOption(option)
        const {
            requestUrl,
            appName,
            watchEvent,
            watchError,
            watchPerformance,
            watcherHeatmap
        } = this._options

        this.messagePool = new MessagePool(this._options)
        this.eventWatcher = watchEvent ? new EventWatcher(this) : undefined
        this.performanceWatcher = watchPerformance ? new PerformanceWatcher(this) : undefined
        this.heatmapWatcher = watcherHeatmap ? new HeatmapWatcher(this) : undefined
    }



    private init(options: IOptions) {

    }

}

export default XzWebWatcher