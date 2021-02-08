type ValueOf<T> = T[keyof T];


export class EventManager<types extends string[], callbackArgs extends any[]> {

	private listeners: {[key in  string]: Array<callbackArgs[number]>} = {}

	on(event: ValueOf<types>, callback: ValueOf<callbackArgs>) {
		const evt = event.toString();
		if(this.listeners[evt] === undefined) this.listeners[evt] = []
		this.listeners[evt].push(callback);
	}

	emit(event: ValueOf<types>, callback: ValueOf<callbackArgs>) {

	}
}

