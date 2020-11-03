import React, { Component } from 'react';
import './Projects.scss';
import { SelectFolder } from '../../../common/os';
import TextField from '@material-ui/core/TextField';
import { Button, Container, Input, MenuItem, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Register } from '../../../../decorators/Module';
import { Services } from '../../../../../main/services';
import { Template } from '../../../../../main/services/github/types';

interface State {
    folder?: string
    use: Template[],
    templates: Template[]
    name: string,
    loading: boolean
}


@Register({ name: 'Projects', description: 'Create project from github repositories ', path: '/projects', show: { appboard: true, name: true } })


export class Projects extends Component<{}, State> {

    state : State= {
        use: [],
        templates: [],
        loading: true,
        name: ""
    }

    async componentDidMount() {
        this.setState({
            templates: await Services.github.getTemplates(),
            loading: false
        })
    }

    render() {

        let { folder, use, templates, loading} = this.state;

        return (
            <Container className="Projects">
                <SelectFolder onChange={this.onFolderSelect} mode={'folder'} showSelected />
                {loading && <CircularProgress color={'secondary'} size={'2rem'} />}

                {!loading && <>

                    <Box className="filter">
                        <TextField label={'Name'} onChange={e => this.onNameChange(e.target.value)} />

                        <Box className={'exclusion'}>
                            <InputLabel id="ignoreContentLabel">Use templates</InputLabel>
                            <Select
                                labelId="ignoreContentLabel"
                                id="ignoreContentSelect"
                                multiple
                                MenuProps={{ variant: 'menu' }}
                                value={use}
                                renderValue={(selected: any) => selected.join(', ')}
                                input={<Input />}
                                onChange={e => this.changeTemplateUsed(e.target.value as string[])}
                            >
                                {templates.map(({id, full_name}) => (
                                    <MenuItem key={id} value={id} className={'exclude'}>
                                        <Checkbox checked={use.some(t => t.id === id)} color={'secondary'} />
                                        <Typography className={'item'}>{full_name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>


                    <Button color={'secondary'} className={'RemoveBtn'} variant={'outlined'} onClick={this.create}>Remove</Button>


                </>}


            </Container>
        );
    }

    create = () => {

    };

    private onFolderSelect = async (folder: string) => {
        this.setState(prev => ({
            ...prev,
            folder
        }));
    };

    private onNameChange = (name: string) => {
        this.setState(prev => ({
            ...prev,
            name
        }));
    };

    private changeTemplateUsed = (templates: string[]) => {
        this.setState(prev => ({
            use: prev.templates.length ? templates.map(id => prev.templates.find(t => t.id.toString() === id) as Template) : []
        }));
    };

}

