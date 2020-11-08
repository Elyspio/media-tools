import axios from "axios";


export class AjaxService {
	bypassCors = {
		get: <T>(endpoint: string, params?: any) => axios.get<T>(endpoint, { params: params }),
		post: <T>(endpoint: string, params?: any) => axios.post<T>(endpoint, params),
		put: <T>(endpoint: string, params?: any) => axios.put<T>(endpoint, params),
		delete: <T>(endpoint: string, params?: any) => axios.delete<T>(endpoint, { params: params })
	};
}
