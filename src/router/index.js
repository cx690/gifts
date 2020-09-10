import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'index',
			redirect: '/desk'
		},
		{
			path: '/404',
			name: 'notFound',
			component: () => import('@/pages/404'),
			meta: {
				title: '页面不存在'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/pages/login'),
			meta: {
				title: '系统登录',
			}
		},
		{
			path: '/desk',
			name: 'desk',
			component: () => import('@/pages/desk'),
			meta: {
				title: '数据统计',
			}
		},
		{
			path: '/demo',
			name: 'demo',
			component: () => import('@/pages/demo'),
			meta: {
				title: '这只是一个demo'
			}
		},
	]
})
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	if (to.matched.length === 0) {
		from.name ? next({
			name: from.name
		}) : next('/404');
	} else {
		next();
		// if (to.name != 'login' && !store.state.userName && !store.state.userId) {

		// } else {
		// 	next(); //如果匹配到正确跳转
		// }
	}
});
// router.afterEach((to, from) => { });
export default router;
