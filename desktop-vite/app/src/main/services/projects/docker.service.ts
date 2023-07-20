import { docker } from "../../../config/projects/projects.private";
import { Feature } from "./types";
import * as path from "path";
import { injectable } from "inversify";

@injectable()
export class DockerService {
	public addDockerSupport = async (dockerName: string, description: string, features: Feature[], projectRoot: string) => {
		const dockerFolder = path.join(projectRoot, "docker");
		await Promise.all([this.addDockerfile(features, path.join(dockerFolder, "DockerFile"))]);
	};

	private addDockerfile = async (features: Feature[], output: string) => {
		let file = "";

		if (features.find((f) => f.name === "web-back") && features.find((f) => f.name === "web-front")) {
			file = "back-front.Dockerfile";
		}

		if (features.find((f) => f.name === "web-back") && !features.find((f) => f.name === "web-front")) {
			file = "back-only.Dockerfile";
		}

		if (!features.find((f) => f.name === "web-back") && features.find((f) => f.name === "web-front")) {
			file = "front-only.Dockerfile";
		}

		const p = path.resolve(__dirname, "..", "files", "projects", "dockerfiles", file);
		console.log("trying to read " + p);
		// const content = await fs.readFile(p);
		//
		// await fs.writeFile(output, content);
	};
}
