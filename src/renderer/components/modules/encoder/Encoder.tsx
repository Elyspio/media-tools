import React from 'react';
import {StoreState} from "../../../store/reducer";
import {connect} from "react-redux";
import {ModuleDescription} from "../../../store/module/components/action";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {encoders, MediaData} from "./type";
import {MediaService} from "../../../../main/services/media";
import * as fs from "fs-extra"
import * as path from "path";
import List from "@material-ui/core/List";
import Process from "./Process";
import "./Encoder.scss"

interface StateProps {

}

interface DispatchProps {

}

const mapStateToProps = (state: StoreState) => {
    return {}
};
const mapDispatchToProps = (dispatch: Function) => {
    return {}
};


export type ProcessData = {
    media: Media,
    percentage: number
};

interface State {
    medias: Media[]
    format: string
    process: ProcessData[]
}

export interface Media {
    file: File,
    property: MediaData,
}


interface Props {
}

export class Encoder extends React.Component<Props, State> {

    public static info: ModuleDescription = {
        name: "Encoder",
        description: "toto"
    }

    constructor(props: {}) {
        super(props);
        this.state = {
            medias: [],
            format: "hvec_nvenc",
            process: []
        }
    }

    render() {

        let actions = null;
        let options = null;
        let process = null

        if (this.state.medias.length > 0) {

            options = <div className={"options"}>
                <InputLabel
                    id="demo-customized-select-label">Encoder</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.format}
                    onChange={this.onFormatChange}
                >
                    {encoders.map(encoder => <MenuItem
                        value={encoder.value.ffmpeg}>{encoder.type} - {encoder.format}</MenuItem>)}
                </Select>
            </div>


            actions = <div className="actions">
                <Button color={"primary"} onClick={this.encode}>
                    Encode Files
                </Button>
            </div>
        }


        if (this.state.process) {
            process = <List className={"processes"}>
                {this.state.process.map(p => <Process data={p}/>)}
            </List>
        }


        return (
            <div className={"Encoder"}>
                <Button  color={"primary"}>
                    <label htmlFor="fileInput">
                        Select files
                    </label>
                </Button>
                <input type={"file"} multiple={true}
                       id={"fileInput"}
                       style={{display: "none"}}
                       onChange={this.onFileSelect}/>

                {options}
                {actions}
                {process}
            </div>
        );
    }


    private setStateAsync = (newState: ((prevState: Readonly<State>, props: Readonly<Props>) => State) | (Pick<State, any> | State | null)) => new Promise((resolve) => this.setState(newState, resolve));

    private onFormatChange = (e: React.ChangeEvent<{ name?: string; value: any }>) => {
        const encoder = encoders.find(encoder => encoder.value.ffmpeg === e.target.value)
        const process: ProcessData[] = this.state.medias.filter(media => media.property.streams.find(s => s.codec_type = "video")?.codec_name !== encoder?.value.ffprobe).map(media => ({
            percentage: 0,
            media
        }))


        this.setState({
            format: e.target.value,
            process
        })
    }

    private onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = [];
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])
            }

            const media: Media[] = await Promise.all(files.map(async (file) => ({
                file: file,
                property: await new MediaService().getInfo(file)
            })));

            this.setState({
                medias: media,
            })
        }

    }

    private encode = async (): Promise<any> => {

        for (let media of this.state.medias) {
            const output = await this.encodeFile(media);
            const old = path.join(path.dirname(media.file.path), "old")
            await fs.ensureDir(old);
            await fs.move(media.file.path, path.join(old, media.file.name))
            await fs.move(output, media.file.path);
        }
    }

    private encodeFile = (file: Media): Promise<string> => {
        return new Promise(async (resolve) => {

            const process = this.state.process;
            const index = process.findIndex(p => p.media.file.path === file.file.path);

            process[index].percentage = 0;
            await this.setStateAsync({
                process
            })
            const outputPath = path.join(path.dirname(file.file.path), "current.mkv");
            const s = await new MediaService().convert(file, this.state.format, {outputPath: outputPath});
            s.on("progress", async (percentage: number) => {
                console.log("receving progress", percentage)


                process[index].percentage = percentage;
                await this.setStateAsync(prevState => ({
                    ...prevState,
                    process
                }))

            })
            s.on("finished", async () => {
                process[index].percentage = 100;
                await this.setStateAsync({
                    process
                })
                resolve(outputPath);
            })
        })
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Encoder);
