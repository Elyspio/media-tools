import React from 'react';
import Button from '@material-ui/core/Button';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { encoders, File, Media, ProcessData } from './type';
import { MediaService } from '../../../../../main/services/media/mediaService';
import * as fs from 'fs-extra';
import * as path from 'path';
import List from '@material-ui/core/List';
import Process from './Process';
import './Encoder.scss';
import { Register } from '../../../../decorators/Module';
import { SelectFolder } from '../../../common/os';
import { Services } from '../../../../../main/services';
import { Alert } from '@material-ui/lab';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Link from '@material-ui/core/Link';
import { withContext } from '../../../common/hoc/withContext';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../../../store/reducer';
import OnFinishAction from './OnFinishAction';


const mapStateToProps = (state: StoreState) => ({
    action: state.encoder.onFinishAction
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

interface State {
    medias: Media[]
    format: string
    process: ProcessData[],
    isSoftInstalled?: boolean,
}

interface Props extends ReduxTypes {
}

const menu = withContext({
    items: [
        {
            label: 'Action',
            show: () => ({close}) => <OnFinishAction close={close} />
        }
    ],
    redux: connector
});

@Register({ name: 'Encoder', description: 'Encode video in different format' }, menu)
export class Encoder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            medias: [],
            format: 'hvec_nvenc',
            process: []
        };
    }

    async componentDidMount() {
        this.setState({
            isSoftInstalled: await Services.media.isFFmpegInstalled()
        });
    }

    render() {

        let actions = null;
        let options = null;
        let process = null;

        if (this.state.medias.length > 0) {

            options = <div className={'options'}>
                <InputLabel
                    id="demo-customized-select-label">Encoder</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.format}
                    onChange={this.onFormatChange}
                >
                    {encoders.map(encoder => <MenuItem
                        value={encoder.value.ffmpeg} key={encoder.value.ffmpeg}>{encoder.type} - {encoder.format}
                    </MenuItem>)}
                </Select>
            </div>;


            actions = <div className="actions">
                <Button color={'secondary'} onClick={this.encode}>
                    Encode Files
                </Button>
            </div>;
        }


        if (this.state.process) {
            process = <List className={'processes'}>
                {this.state.process.map(p => <Process key={p.media.file.name} data={p} />)}
            </List>;
        }


        return (
            <div className={'Encoder'}>

                {this.state.isSoftInstalled === true && <>
                    <SelectFolder onChange={this.onFileSelect} mode={'file'} showSelected />
                    {options}
                    {actions}
                    {process}

                </>}


                {this.state.isSoftInstalled === false && <>
                    <Alert severity="error">
                        <AlertTitle>This module requires FFmpeg</AlertTitle>
                        It can be downloaded <Link href="https://ffmpeg.org/download.html">here</Link>
                    </Alert>
                </>}

                {this.state.isSoftInstalled === undefined && <>
                    <Alert severity="info">
                        <AlertTitle>Please wait</AlertTitle>
                        Checking if FFmpeg is installed
                    </Alert>
                </>}

            </div>
        );
    }

    private setStateAsync = (newState: ((prevState: Readonly<State>, props: Readonly<Props>) => State) | (Pick<State, any> | State | null)) => new Promise((resolve) => this.setState(newState, resolve));

    private onFormatChange = async (e: React.ChangeEvent<{ name?: string; value: any }>) => {


        await this.setStateAsync({
            format: e.target.value
        });

        this.updateProcess();
    };

    private onFileSelect = async (result: string[]) => {
        const files: File[] = result.map(f => ({ name: f.slice(f.lastIndexOf(path.sep)), path: f }));

        const media: Media[] = await Promise.all(files.map(async (file) => ({
            file: file,
            property: await new MediaService().getInfo(file)
        })));

        this.setState({
            medias: media
        });

        if (this.state.format) {
            this.updateProcess();
        }

    };

    private encode = async (): Promise<any> => {

        for (let [i, media] of this.state.medias.entries()) {
            const output = await this.encodeFile(media);
            const old = path.join(path.dirname(media.file.path), 'old');
            await fs.ensureDir(old);
            await fs.move(media.file.path, path.join(old, media.file.name));
            await fs.move(output, media.file.path);
        }

        switch (this.props.action) {
            case "Shutdown": return Services.system.shutdown()
            case "Sleep": return Services.system.sleep()
            case "Hibernate": return Services.system.hibernate()
        }
    };

    private encodeFile = (file: Media): Promise<string> => {
        return new Promise(async (resolve) => {

            const process = this.state.process;
            const index = process.findIndex(p => p.media.file.path === file.file.path);

            process[index].percentage = 0;
            await this.setStateAsync({
                process
            });
            const outputPath = path.join(path.dirname(file.file.path), 'current.mkv');
            const s = await new MediaService().convert(file, this.state.format, { outputPath: outputPath });
            s.on('progress', async (percentage: number) => {
                console.log('receving progress', percentage);


                process[index].percentage = percentage;
                await this.setStateAsync(prevState => ({
                    ...prevState,
                    process
                }));

            });
            s.on('finished', async () => {
                process[index].percentage = 100;
                await this.setStateAsync({
                    process
                });
                resolve(outputPath);
            });
        });
    };

    private updateProcess = () => {
        const encoder = encoders.find(encoder => encoder.value.ffmpeg === this.state.format);
        const process: ProcessData[] = this.state.medias
            .filter(media => media.property.streams.find(s => s.codec_type = 'video')?.codec_name !== encoder?.value.ffprobe)
            .map(media => ({
                percentage: 0,
                media
            }));
        this.setState({
            process
        });

    };

}


