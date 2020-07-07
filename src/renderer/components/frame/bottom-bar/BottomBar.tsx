import React, {Component} from 'react';
import './BottomBar.scss'
import {SystemService} from "../../../../main/services/system/system";
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


interface State {
    cpuLoad?: number,
    gpuLoad?: number,
    memLoad?: number
}

class BottomBar extends Component<{}, State> {

    state: State = {}

    private timeoutId?: NodeJS.Timeout;

    componentDidMount() {
        this.timeoutId = setInterval(this.getData, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timeoutId as NodeJS.Timeout);
    }

    render() {
        return (
            <Paper className={"BottomBar"}>
                <Box>
                    <span className={"label"}>CPU</span>
                    <span className={"value"}>{this.state.cpuLoad?.toFixed(2) ?? ""}%</span>
                </Box>
                <Box>
                    <span className={"label"}>GPU</span>
                    <span className={"value"}>{this.state.gpuLoad?.toFixed(2) ?? ""}%</span>
                </Box>
                <Box>
                    <span className={"label"}>MEM</span>
                    <span className={"value"}>{this.state.memLoad?.toFixed(2) ?? ""}%</span>
                </Box>

            </Paper>
        );
    }

    private getData = async () => {
        const systemService = SystemService.instance;
        const data = await Promise.all([
            systemService.cpuLoad(),
            systemService.gpuLoad(),
            systemService.memoryUsed(),
        ])

        this.setState({
            cpuLoad: data[0],
            gpuLoad: data[1],
            memLoad: data[2].current
        })
    }


}

export default BottomBar;
