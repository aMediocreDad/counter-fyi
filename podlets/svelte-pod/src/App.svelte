<script>
	import { globalCounterSub } from "../../__services__/message.service";

	const count = globalCounterSub("svelte-pod");
	const decrement = () => count.update((n) => --n);
	const increment = () => count.update((n) => ++n);
</script>

<article class="Svelte">
	<button class="decrement" type="button" on:click={decrement}>&ndash;</button>
	<div class="number">{$count}</div>
	<button class="increment" type="button" on:click={increment}>+</button>
</article>
