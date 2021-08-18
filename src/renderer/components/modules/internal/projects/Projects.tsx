import React, {Component, ReactNode} from "react";
import "./Projects.scss";
import {SelectFolder} from "../../../common/os";
import TextField from "@material-ui/core/TextField";
import {Button, Container, FormControlLabel, Grid, Input, MenuItem, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import {Register} from "../../../../decorators/Module";
import {resolve} from "inversify-react";
import {Feature} from "../../../../../main/services/projects/types";
import {ProjectBuilder} from "../../../../../main/services/projects/projectBuilder";
import {Logger} from "../../../../../main/util/logger";
import {FeatureService} from "../../../../../main/services/projects/feature.service";
import {DependencyInjectionKeys} from "../../../../../main/services/dependency-injection/dependency-injection.keys";

interface State {
	folder?: string
	useFeatures: string[],
	features: Feature[]
	name: string,
	readme: boolean,
	docker: boolean | string,
	github: boolean | string,
	loading: boolean,
	description: string
	template: boolean
}


@Register({
	name: "Projects",
	description: "Create projects from projects repositories",
	path: "/projects",
	autoResize: {height: true, width: false}
})
export class Projects extends Component<{}, State> {


	@resolve(DependencyInjectionKeys.projects.feature)
	featureService!: FeatureService

	override state: State = {
		useFeatures: [],
		features: [],
		docker: false,
		loading: true,
		readme: false,
		github: false,
		description: "",
		name: "",
		template: false
	};
	private logger = Logger(Projects)

	override async componentDidMount() {
		this.setState({
			features: await this.featureService.getAvailableFeature(),
			loading: false
		});
	}

	override render() {

		const {useFeatures, features, loading, docker, name, readme, description, template, github} = this.state;
		return (
			<Container className="Projects">
				{loading && <CircularProgress color={"secondary"} size={"2rem"}/>}

				{!loading && <>

                    <Box className={"row"}>
                        <TextField
                            label={"Folder name"}
                            error={name.length === 0}
                            style={{width: "30%"}} value={name}
                            onChange={e => this.handleChange("name", e.target.value)}
                        />

                        <TextField
                            label={"Description"}
                            value={description}
                            id={"description"}
                            style={{width: "70%"}}
                            onChange={e => this.handleChange("description", e.target.value)}
                        />
                    </Box>


                    <Box className={"row"}>
                        <InputLabel id="ignoreContentLabel">Use features</InputLabel>
                        <Select
                            labelId="ignoreContentLabel"
                            id="ignoreContentSelect"
                            multiple
                            MenuProps={{variant: "menu"}}
                            value={useFeatures}
                            renderValue={(selected: any) => joinComponents(selected.map((x: string) => <Typography variant={"overline"}>{x}</Typography>))}
                            input={<Input/>}
                            onChange={e => this.handleChange("useFeatures", e.target.value)}
                        >
							{features.map(({name}) => (
								<MenuItem key={name} value={name} className={"exclude"}>
									<Checkbox checked={useFeatures.some(i => i === name)} color={"secondary"}/>
									<Typography className={"item"}>{name}</Typography>
								</MenuItem>
							))}
                        </Select>
                    </Box>

                    <Box className="options row">
                        <Typography color={"primary"}>Options</Typography>
                        <div className="simple-options">
                            <div className={"option"}>
                                <FormControlLabel
                                    control={<Checkbox checked={readme} color={"default"} onChange={(e) => this.handleChange("readme", e.target.checked)} name="readme"/>}
                                    labelPlacement={"start"}
                                    label="Readme"
                                    className={"switch"}
                                />
                            </div>


                        </div>

                        <div className={"option"}>
                            <FormControlLabel
                                control={<Checkbox checked={!!docker} color={"default"} onChange={(e) => this.handleChange("docker", e.target.checked)} name="docker"/>}
                                labelPlacement={"start"}
                                label="Docker"
                                className={"switch"}
                            />

							{docker && <TextField
                                label={"Docker name"}
                                error={typeof docker === "string" && docker.length === 0}
                                defaultValue={name}
                                style={{width: "50%"}}
                                onChange={e => this.handleChange("docker", e.target.value)}
                            />}
                        </div>

                        <div className={"option"}>
                            <FormControlLabel
                                control={<Checkbox checked={!!github} color={"default"} onChange={(e) => this.handleChange("github", e.target.checked)} name="github"/>}
                                labelPlacement={"start"}
                                label="Github"
                                className={"switch"}
                            />

							{github && <TextField
                                label={"Github name"}
                                error={typeof github === "string" && github.length === 0}
                                defaultValue={name}
                                style={{width: "50%"}}
                                onChange={e => this.handleChange("github", e.target.value)}
                            />}

							{github && <FormControlLabel
                                control={<Checkbox
									checked={template}
									color={"default"}
									onChange={(e) => this.handleChange("template", e.target.checked)}
									name="Template"/>
								}
                                labelPlacement={"start"}
                                label="Template"
                                className={"switch"}
                            />}

                        </div>

                    </Box>


                    <Grid container direction={"column"} spacing={1}>

                        <Grid item container alignItems={"center"}>
                            <Grid item xs={4}>
                                <SelectFolder
                                    onChange={(val) => this.handleChange("folder", val)}
                                    mode={"folder"}
                                    label={"Select parent folder"}
                                    variant={"outlined"}
                                    color={"default"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Box pl={2}>
                                    <Typography variant={"subtitle2"}>{this.state.folder}</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid item container>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    color={"primary"}
                                    className={"RemoveBtn"}
                                    variant={"outlined"}
                                    disabled={!this.state.name || this.state.useFeatures.length === 0}
                                    onClick={this.create}>
                                    Create repository
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </>}
			</Container>
		);
	}


	create = () => {
		const {description, docker, github, name, readme, useFeatures, folder, features, template} = this.state;
		const builder = new ProjectBuilder();

		builder.name = name;
		builder.description = description ?? undefined;
		useFeatures.forEach(f => builder.use(features.find(ff => f === ff.name) as Feature));

		if (docker) builder.docker = typeof docker === "string" ? docker : name;
		if (github) builder.github = typeof github === "string" ? github : name;
		if (readme) builder.addReadme();
		if (template) builder.isTemplate();


		return builder.build(folder as string);
	};

	private handleChange(field: keyof State, val: any) {
		this.setState(prev => ({
			...prev,
			[field]: val
		}));
	}
}


function joinComponents(components: ReactNode[]) {
	const ret = Array<ReactNode>();

	components.forEach((component, index) => {
		ret.push(component);
		if (index < components.length - 1) ret.push(<Box display={"inline"} px={2}>|</Box>)
	})

	return ret;


}


