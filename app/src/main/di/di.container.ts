import { Container } from "inversify";
import { initDiApis } from "./di.apis";
import { initDiServices } from "./di.service";

export const container = new Container({ defaultScope: "Singleton" });

initDiApis(container);
initDiServices(container);
