// @ts-ignore
import dockerHubAPI from "docker-hub-api"
import {docker} from '../../../config/projects.private';
import {Feature} from "./types";
import * as fs from "fs-extra"
import * as path from "path";
import {EOL} from "os"


export class DockerService {
    public addDockerSupport = async (dockerName: string, description: string, features: Feature[], projectRoot: string) => {
        const dockerFolder = path.join(projectRoot, "docker");
        fs.mkdir(dockerFolder)
        await Promise.all([
            this.createRepository(dockerName, description, description),
            this.addDockerfile(features, path.join(dockerFolder, "DockerFile")),
            this.addScript(dockerName, features, path.join(dockerFolder, "docker.sh"))
        ]);
    }

    private createRepository = async (name: string, description: string, fullDescription: string, visibility: "public" | "private" = "public") => {
        await dockerHubAPI.login(docker.username, docker.password);
        await dockerHubAPI.createRepository(docker.username, name, {
            description,
            full_description: fullDescription,
            is_private: visibility === "private"
        })
    }

    private addDockerfile = async (features: Feature[], output: string) => {

        let content = [
            "FROM node:12-alpine",
            "# Create app directory",
            "WORKDIR /app"
        ]

        if (features.find(f => f.name === "web-front")) {
            if (!features.find(f => f.name === "web-back")) {
                throw "You need 'web-back' feature to use docker support"
            }

            content.push(...[
                "# Front",
                "RUN mkdir -p /app/front",
                "COPY front/build ./front/build"
            ])
        }

        if (features.find(f => f.name === "web-back")) {
            content.push(...[
                "# Server",
                "RUN mkdir -p /app/back",
                "COPY back/build ./back",
                "COPY back/package.json ./back/package.json",
                "RUN cd back && npm i --only=production",
                "EXPOSE 4000",
                "WORKDIR /app/back",
                "# Setting environment variables",
                "ENV LOG_FOLDER /app/logs",
                "ENV NODE_ENV production",
                'CMD ["node", "app.js"]'
            ])
        }

        return fs.writeFile(output, content.join(EOL));

    }

    private addScript = async (dockerName: string, features: Feature[], output: string) => {
        const content = [
            '#!/bin/bash',
            'origin=$(pwd)',
            'DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"',
            '{common}',
            '# Check if we are running on WSL (use Powershell to increase performances a lot)',
            `if [ "$(uname -r | sed -n 's/.*\\( *Microsoft *\\).*/\\1/ip')" = 'microsoft' ]; then`,
            '{windows}',
            'else',
            '{linux}',
            'fi',
            'cp "$DIR/DockerFile" "$DIR/../DockerFile"',
            'cd "$DIR/.." && docker buildx build --platform linux/arm64,linux/amd64  -f ./DockerFile  -t elyspio/' + dockerName + ' --push .',
            'rm "$DIR/../DockerFile"',
            'cd $origin',
        ].join(EOL);

        // @ts-ignore
        const featureContent: { [key in Feature["name"]]: { platformDiff: string[], common: string[] } } = {
            "web-back": {platformDiff: ['cd ../back ; yarn build'], common: ['rm -rdf "$DIR/../back/build"']},
            "web-front": {platformDiff: ['cd ../front ; yarn build'], common: ['rm -rdf "$DIR/../front/build"']},
        }


        let common = [];
        let windows = [];
        let linux = [];

        if (features.find(f => f.name === "web-front")) {
            if (!features.find(f => f.name === "web-back")) {
                throw "You need 'web-back' feature to use docker support"
            }
            common.push(...featureContent["web-front"].common)
            windows.push(...featureContent["web-front"].platformDiff.map(str => `powershell.exe ${str}`))
            linux.push(...featureContent["web-front"].platformDiff)
        }

        if (features.find(f => f.name === "web-back")) {
            common.push(...featureContent["web-back"].common)
            windows.push(...featureContent["web-back"].platformDiff.map(str => `powershell.exe ${str}`))
            linux.push(...featureContent["web-back"].platformDiff)
        }

        const returned = content
            .replace("{common}", common.join(EOL))
            .replace("{windows}", windows.join(EOL))
            .replace("{linux}", linux.join(EOL));

        return fs.writeFile(output, returned);
    }
}
