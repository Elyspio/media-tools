// @ts-ignore
import dockerHubAPI from "docker-hub-api"
import { docker } from '../../../config/projects.private';

dockerHubAPI.setLoginToken(docker.token);

export class DockerService {
    createRepository(name: string, description: string, fullDescription: string, _private: boolean) {
        dockerHubAPI.createRepository(docker.username, name, {
            description,
            full_description: fullDescription,
            is_private: _private
        })
    }
}
