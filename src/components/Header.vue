<template>
	<div class='hearder'>{{header}}</div>
</template>

<script>
	export default{
		props:['header'],
	}
</script>

<style scoped>
.hearder{
	font-size: 0.3rem;
	padding:10px 0;
	background: #2196f3;
	font-weight: 700;
	color: #fff;
	margin-bottom: 10px;
}
</style>