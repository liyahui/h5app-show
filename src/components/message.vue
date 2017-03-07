<template>
  <div class="message">
  	{{text}}
  </div>
</template>

<script>
  export default {
  	props: {
  		text: String
  	}
  }
</script>

<style lang="scss">
	.message {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
