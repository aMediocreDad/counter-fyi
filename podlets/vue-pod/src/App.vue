<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { globalCounterSub } from "../../__services__/message.service";

defineProps({
	count: Number,
});

const count = ref(0);
const globalCounter = globalCounterSub("svelte-pod");
let subscription;

onMounted(() => {
	subscription = globalCounter.subscribe((n) => (count.value = n));
});
onBeforeUnmount(() => subscription.unsubscribe);

const decrement = () => globalCounter.update((n) => --n);
const increment = () => globalCounter.update((n) => ++n);
</script>

<template>
	<article class="Vue">
		<button class="decrement" type="button" @click="decrement">&ndash;</button>
		<div class="number">{{ count }}</div>
		<button class="increment" type="button" @click="increment">+</button>
	</article>
</template>
