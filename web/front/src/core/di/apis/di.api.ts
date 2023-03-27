import { AuthenticationApiClient } from "../../apis/rest/authentication";
import { Container } from "inversify";
import { JwtClient } from "../../apis/rest/authentication/generated";

export const addApis = (container: Container) => {
	container.bind<AuthenticationApiClient>(AuthenticationApiClient).toSelf();
	container.bind<JwtClient>(JwtClient).toSelf();
};
