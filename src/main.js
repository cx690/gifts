import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
// import store from './store';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import '@/assets/index.less';
import VueLazyload from 'vue-lazyload'
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
// import VueCompositionApi from "@vue/composition-api";
// Vue.use(VueCompositionApi);

Vue.use(Antd);
Vue.use(VueLazyload)

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.prototype.$bus = Vue.prototype.$bus || new Vue(); //广播事件的中间处理器

new Vue({
	router,
	// store,
	render: h => h(App),
}).$mount('#app')
