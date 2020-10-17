import { DialogService } from './dialog/dialogService';
import { MediaService } from './media/mediaService';
import { SystemService } from './system/system';
import { FilesService } from './files/filesService';
import { ConfigurationService } from './configuration/configurationService';

export const Services = {
    dialog: new DialogService(),
    media: new MediaService(),
    system: new SystemService(),
    files: new FilesService(),
    configuration: new ConfigurationService()
};
