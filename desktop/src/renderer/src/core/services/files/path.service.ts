import { injectable } from "inversify";

@injectable()
export class PathService {
	private readonly sep = "/";

	public join(...paths: string[]): string {
		return paths.join(this.sep);
	}

	public dirname(filePath: string): string {
		return filePath.slice(0, filePath.lastIndexOf("/"));
	}
}
