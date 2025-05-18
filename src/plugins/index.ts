import type { App } from "vue";
import { setupRoute } from '@/router'
import { setupStore } from '@/store'

export default {
    install(app:App<Element>) {
        // 路由(Router)
        setupRoute(app)
        // 状态管理(store)
        setupStore(app)
    }
}
