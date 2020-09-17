import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Services } from '../../../main/services';
import './os.scss';

type Props = {
    showSelected?: boolean,
} & (SelectFile | SelectFolder)

type SelectFile = {
    mode: 'file';
    onChange: (item: string[]) => void
}

type SelectFolder = {
    mode: 'folder';
    onChange: (item: string) => void
}


export function SelectFolder(props: Props) {


    const [files, setFiles] = React.useState<string>('');

    async function openDialog() {
        if (props.mode === 'folder') {
            let choice = await Services.dialog.selectFolder(false);
            console.log('files', files);

            if (choice !== null) {
                props.onChange(choice?.folder as string);
            }
            setFiles(choice ? choice.folder : '');
        }
    }

    function onFileChange(e: any) {
        const files = [];
        if (props.mode === 'file') {
            for (const f of e.target.files) {
                files.push(f.path);
            }
            props.onChange(files);
            setFiles(files[0]);
        }
    }

    return (
        <div className={'SelectFolder'} style={{ margin: '1rem 0' }}>
            <Button className={'header'} color={'primary'} onClick={openDialog} variant={'outlined'}>
                {
                    props.mode === 'folder'
                        ? <p>Select folder</p>
                        : <label htmlFor={'select-file-id'}>Select files</label>
                }
            </Button>

            <input type="file" multiple id={'select-file-id'} hidden={true} onChange={onFileChange} />

            {props.showSelected && <Typography variant={'caption'} noWrap>{files}</Typography>}

        </div>
    );
}
