type getUriParamOptions = {
	remove?: boolean,
	json?: boolean
}


export function injectParams() {
	const base64 = getUriParam("data");
	const store = atob(base64);
	// @ts-ignore
	window.initialParams = JSON.parse(store);
	const newUrl = location.href.slice(0, location.href.indexOf("?"));
	history.replaceState({path: newUrl}, "", newUrl);
}

export function getUriParam<T = any>(param: string, {json}: getUriParamOptions = {}) {
	let search = (new URL(document.location.href)).searchParams;
	let elem = search.get(param);
	let value: T = (elem && json) ? JSON.parse(elem) : elem;
	return value;

}
