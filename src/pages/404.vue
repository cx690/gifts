<template>
	<a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
		<template #extra>
			<router-link to="/desk">
				<a-button type="primary">
					返回首页
				</a-button>
			</router-link>
		</template>
	</a-result>
</template>

<script>
	export default {
		name: '404'
	}
</script>
