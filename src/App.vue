<template>
	<a-config-provider :locale="locale">
		<div id="app">
			<keep-alive>
				<!-- <router-view :key="$route.fullPath" v-if="$route.meta.cache !== false"></router-view> -->
				<router-view :key="$route.fullPath" v-if="$route.meta.cache"></router-view>
			</keep-alive>
			<!-- <router-view :key="$route.fullPath" v-if="$route.meta.cache === false"></router-view> -->
			<router-view :key="$route.fullPath" v-if="!$route.meta.cache"></router-view>
		</div>
	</a-config-provider>
</template>

<script>
	import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
	export default {
		name: "App",
		data() {
			return {
				locale: zhCN
			};
		}
	};
</script>
<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		width: 100%;
		height: 100%;
	}
</style>
