type Event = {
	[key in string]: (...args: any) => void;
};

export class EventManager<T extends Event = {}> {
	private listeners = new Map<string, Set<(...args: unknown[]) => void>>();

	public on<event extends keyof T>(evt: event, callback: T[event]) {
		const eventName = evt as string;
		const listeners = this.listeners.get(eventName) ?? new Set<(...args: unknown[]) => void>();
		listeners.add(callback as (...args: unknown[]) => void);
		this.listeners.set(eventName, listeners);
	}

	public emit<event extends keyof T>(evt: event, ...params: Parameters<T[event]>) {
		const listeners = this.listeners.get(evt as string);
		if (!listeners) {
			return;
		}

		for (const listener of listeners) {
			listener(...(params as unknown as unknown[]));
		}
	}
}
