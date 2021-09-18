import { MessageBus } from "@podium/browser";

let _val = localStorage.getItem("counter") ?? 0;

export const globalCounterSub = (emitter) => {
	const messageBus = new MessageBus();
	const CHANNEL = "globalCount";
	const TOPIC = "Count";

	// Update internal state
	messageBus.subscribe(CHANNEL, TOPIC, (event) => (_val = event.payload.count));

	const set = (value) => {
		_val = value;
		localStorage.setItem("counter", _val);
		const event = messageBus.publish(CHANNEL, TOPIC, { emitter: emitter, count: _val });
	};

	const update = (fn) => set(fn(_val));

	const subscribe = (fn) => {
		messageBus.subscribe(CHANNEL, TOPIC, (event) => fn(event.payload.count));
		fn(_val);
		return {
			unsubscribe: () =>
				messageBus.unsubscribe(CHANNEL, TOPIC, (event) => fn(event.payload.count)),
		};
	};

	return {
		subscribe,
		update,
	};
};
