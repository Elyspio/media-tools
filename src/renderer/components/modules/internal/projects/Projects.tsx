import React, { Component } from 'react';
import './Projects.scss';
import { SelectFolder } from '../../../common/os';
import TextField from '@material-ui/core/TextField';
import { Button, Container, FormControlLabel, Input, MenuItem, Switch, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Register } from '../../../../decorators/Module';
import { Services } from '../../../../../main/services';
import { Feature } from '../../../../../main/services/projects/types';
import { RepositoryBuilder } from '../../../../../main/services/projects/repositoryBuilder';

interface State {
    folder?: string
    use: string[],
    features: Feature[]
    name: string,
    readme: boolean,
    docker?: boolean | string,
    loading: boolean,
    description: string
}


@Register({ name: 'Projects', description: 'Create projects from projects repositories ', path: '/projects', show: { appboard: true, name: true } })
export class Projects extends Component<{}, State> {

    state: State = {
        use: [],
        features: [],
        docker: false,
        loading: true,
        readme: false,
        description: '',
        name: ''
    };

    async componentDidMount() {
        this.setState({
            features: await Services.projects.feature.getAvailableFeature(),
            loading: false
        })
    }

    render() {

        const { use, features, loading, docker, name, readme, description } = this.state;

        return (
            <Container className="Projects">
                {loading && <CircularProgress color={'secondary'} size={'2rem'} />}

                {!loading && <>

                    <Box className={'row'}>
                        <TextField
                            label={'Github name'}
                            error={name.length === 0}
                            style={{ width: '30%' }} value={name}
                            onChange={e => this.handleChange('name', e.target.value)}
                        />

                        <TextField
                            label={'Description'}
                            value={description}
                            id={'description'}
                            style={{ width: '70%' }}
                            onChange={e => this.handleChange('description', e.target.value)}
                        />
                    </Box>


                    <Box className={'row'}>
                        <InputLabel id="ignoreContentLabel">Use features</InputLabel>
                        <Select
                            labelId="ignoreContentLabel"
                            id="ignoreContentSelect"
                            multiple
                            MenuProps={{ variant: 'menu' }}
                            value={use}
                            renderValue={(selected: any) => selected.join(' ')}
                            input={<Input />}
                            onChange={e => this.handleChange('use', e.target.value)}
                        >
                            {features.map(({ name }) => (
                                <MenuItem key={name} value={name} className={'exclude'}>
                                    <Checkbox checked={use.some(i => i === name)} color={'secondary'} />
                                    <Typography className={'item'}>{name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Box className="docker row">
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={!!docker} color={"default"} onChange={(e) => this.handleChange('docker', e.target.checked)} name="checkedA" />}
                                labelPlacement={'start'}
                                label="Docker"
                                className={'switch'}
                            />

                            {docker && <TextField
                                label={'Docker name'}
                                error={typeof docker === "string" && docker.length === 0}
                                defaultValue={name}
                                style={{ width: '70%' }}
                                onChange={e => this.handleChange('docker', e.target.value)}
                            />}
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={readme} color={"default"} onChange={(e) => this.handleChange('readme', e.target.checked)} name="checkedA" />}
                                labelPlacement={'start'}
                                label="Readme"
                                className={'switch'}
                            />
                        </div>
                    </Box>

                    <SelectFolder
                        onChange={(val) => this.handleChange('folder', val)}
                        mode={'folder'}
                        showSelected
                        variant={"outlined"}
                        color={'default'}

                    />

                    <Button
                        color={'primary'}
                        className={'RemoveBtn'}
                        variant={'outlined'}
                        onClick={this.create}>
                        Create repository
                    </Button>
                </>}
            </Container>
        );
    }


    create = () => {
        const { description, docker, name, readme, use, folder, features } = this.state;
        const builder = new RepositoryBuilder();

        builder.githubName = name;
        builder.description = description ?? undefined;
        use.forEach(f => builder.use(features.find(ff => f === ff.name) as Feature));

        if (docker) builder.dockerName = docker as string;
        if (readme) builder.addReadme();

        builder.build(folder as string);
    };

    private handleChange(field: keyof State, val: any) {
        this.setState(prev => ({
            ...prev,
            [field]: val
        }));
    }
}




