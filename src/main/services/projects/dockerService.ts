// @ts-ignore
import dockerHubAPI from "docker-hub-api";
import { docker } from "../../../config/projects/projects.private";
import { Feature } from "./types";
import * as fs from "fs-extra";
import * as path from "path";


export class DockerService {
	public addDockerSupport = async (dockerName: string, description: string, features: Feature[], projectRoot: string) => {
		const dockerFolder = path.join(projectRoot, "docker");
		await Promise.all([
			// this.createRepository(dockerName, description, description),
			this.addDockerfile(features, path.join(dockerFolder, "DockerFile"))
		]);
	};

	private createRepository = async (name: string, description: string, fullDescription: string, visibility: "public" | "private" = "public") => {
		await dockerHubAPI.login(docker.username, docker.password);
		await dockerHubAPI.createRepository(docker.username, name, {
			description,
			full_description: fullDescription,
			is_private: visibility === "private"
		});
	};

	private addDockerfile = async (features: Feature[], output: string) => {

		let file = "";

		if (features.find(f => f.name === "web-back") && features.find(f => f.name === "web-front")) {
			file = "back-front.Dockerfile";
		}

		if (features.find(f => f.name === "web-back") && !features.find(f => f.name === "web-front")) {
			file = "back-only.Dockerfile";
		}

		if (!features.find(f => f.name === "web-back") && features.find(f => f.name === "web-front")) {
			file = "front-only.Dockerfile";
		}

		let p = path.resolve(__dirname, "..", "files", "projects", "dockerfiles", file);
		console.log("trying to read " + p);
		const content = await fs.readFile(p);

		await fs.writeFile(output, content);
	};
}
