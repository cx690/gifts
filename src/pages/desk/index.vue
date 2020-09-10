<template>
	<div class="main">
		<header>
			<a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
		</header>
	</div>
</template>

<script>
	export default {
		name: 'demo',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		mounted() {

		},
		methods: {
			onSearch() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
</style>
