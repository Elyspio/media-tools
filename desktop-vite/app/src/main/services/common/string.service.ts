import { injectable } from "inversify";

@injectable()
export class StringService {
	public padWithZeros(number: number, length: number) {
		let n: string = "" + number;
		while (n.length < length) {
			n = "0" + n;
		}
		return n;
	}
}
