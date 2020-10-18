import React, { Component } from 'react';
import './Titlebar.scss';
import { Button } from '@material-ui/core';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import RemoveIcon from '@material-ui/icons/Remove';

import { BrowserWindow, remote } from 'electron';
import { getVersion } from '../../../../main/util/updater';

interface State {
    fullscreen: boolean
}


class Titlebar extends Component<{}, State> {

    state = {
        fullscreen: remote.getCurrentWindow().isFullScreen()
    };

    render() {

        let minimize;
        if (this.state.fullscreen) {
            minimize = <Button
                onClick={() => this.goFullscreen(false)}><FullscreenExitIcon /></Button>;
        } else {
            minimize = <Button
                onClick={() => this.goFullscreen(true)}><FullscreenIcon /></Button>;
        }

        return (
            <div className={'Titlebar'}>
                <span className={'title'} >Media App</span>
                <div>
                    <Button onClick={this.minimize}><RemoveIcon /></Button>
                    {minimize}
                    <Button className={'close'} onClick={this.close}>X</Button>
                </div>

            </div>
        );
    }

    private close(): void {
        if(remote.BrowserWindow.getAllWindows().length > 1) {
            remote.getCurrentWindow().close();
        }
        else {
            remote.app.quit();
            process.exit(0);
        }
    }

    private minimize(): void {
        remote.getCurrentWindow().minimize();
    }

    private goFullscreen(state: boolean): void {
        remote.getCurrentWindow().setFullScreen(state);
        this.setState({
            fullscreen: state
        });
    }
}

export default Titlebar;
