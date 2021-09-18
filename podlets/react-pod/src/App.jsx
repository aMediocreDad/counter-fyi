import React, { useEffect, useState } from "react";
import { globalCounterSub } from "../__services__/message.service";

function App() {
	const [count, setCount] = useState(0);
	const globalCounter = globalCounterSub("react-pod");

	useEffect(() => {
		const subscription = globalCounter.subscribe((n) => setCount(n));
		return subscription.unsubscribe;
	}, []);

	const decrement = () => globalCounter.update((n) => --n);
	const increment = () => globalCounter.update((n) => ++n);

	return (
		<article className="React">
			<button className="decrement" type="button" onClick={decrement}>
				&ndash;
			</button>
			<div className="number">{count}</div>
			<button className="increment" type="button" onClick={increment}>
				+
			</button>
		</article>
	);
}

export default App;
