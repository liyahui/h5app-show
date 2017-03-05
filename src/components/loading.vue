<template>
	<transition name="fade" appear>
	  <div class="loading">
	  	<div class="loading-main">
		  	<div class="loading-spinner">
				  <div class="loading-bounce1"></div>
				  <div class="loading-bounce2"></div>
				</div>
				<div class="loading-value">
					{{progress}}%
				</div>
	  	</div>
	  </div>
  </transition>
</template>

<script>
  export default {
  	props: {
  		progress: {
  			type: Number,
  			required: true
  		}
  	}
  }
</script>

<style lang="scss">
	.loading {
		width: 100%;
		height: 100%;
		position: relative;
		background: #fafafa;
	}	

	.loading-main {
		width: 4rem;
		position: absolute;
		left: 50%;
		top: 30%;
		margin-left: -2rem;
	}

	.loading-spinner {
	  width: 4rem;
	  height: 4rem;
	  position: relative;
	}

	.loading-value {
		font-size: 0.875rem;
		font-family: Arial;
		color: #49a9ee;
		line-height: 40px;
		text-align: center;
	}

	.loading-bounce1, .loading-bounce2 {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	  background-color: #49a9ee;
	  opacity: 0.6;
	  position: absolute;
	  top: 0;
	  left: 0;
	  
	  animation: sk-bounce 2.0s infinite ease-in-out;
	}

	.loading-bounce2 {
	  animation-delay: -1.0s;
	}

	@keyframes sk-bounce {
	  0%, 100% { 
	    transform: scale(0.0);
	  } 50% { 
	    transform: scale(1.0);
	  }
	}
</style>
