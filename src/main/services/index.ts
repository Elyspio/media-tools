import { DialogService } from './dialog/dialogService';
import { MediaService } from './media/mediaService';
import { SystemService } from './system/system';
import { FilesService } from './files/filesService';
import { ConfigurationService } from './configuration/configurationService';
import { GithubService } from './projects/githubService';
import { AjaxService } from './ajax/ajaxService';
import { FeatureService } from './projects/feature';
import { DockerService } from './projects/dockerService';

export const Services = {
    dialog: new DialogService(),
    media: new MediaService(),
    system: new SystemService(),
    files: new FilesService(),
    configuration: new ConfigurationService(),
    projects: {
        github: new GithubService(),
        feature: new FeatureService(),
        docker: new DockerService()
    },
    ajax: new AjaxService()
};
