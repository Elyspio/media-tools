import axios from "axios";
import { yggtorrentUrl } from "../../../config/media/torents";
import { credentials } from "../../../config/media/torents.private";

export class TorrentService {
	public async search(name: string) {

		const { data } = await axios.get("/engine/search", {
			params: {
				name,
				do: "search"
			}, headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
				"x-requested-with": "XMLHttpRequest"
			}
		});

		const t = document.implementation.createHTMLDocument("");
		t.open();
		t.write(data);
		t.close();

		const results: any[] = [];
		t.querySelectorAll(".table-responsive.results tbody tr").forEach(value => {
			console.log("result value", value);
			// results.push({
			// 	url: $(tr).find('#torrent_name').attr('href'),
			// 	name: $(tr).find('#torrent_name').text().trim(),
			// 	size: $($(tr).find('td')[5]).text(),
			// 	downloadurl: this.searchhost + '/engine/download_torrent?id=' + $(tr).find('#get_nfo').attr('target'),
			// })
		});

		return results;

	}

	public async login() {

		const data = await axios({
			method: "POST",
			url: yggtorrentUrl + "/user/login",
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
				"x-requested-with": "XMLHttpRequest"
			},
			data: {
				"id": credentials.username,
				"pass": credentials.password
			}
		});
		console.log("data", data);
	}


}
