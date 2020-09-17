import { DialogService } from './dialog/dialogService';
import { MediaService } from './media/mediaService';
import { SystemService } from './system/system';
import { FilesService } from './files/filesService';

export const Services = {
    dialog: new DialogService(),
    media: new MediaService(),
    system: new SystemService(),
    files: new FilesService()
};
