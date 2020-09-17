import React, { Component } from 'react';
import './Frame.scss';
import { Paper } from '@material-ui/core';
import Titlebar from './titlebar/Titlebar';
import BottomBar from './bottom-bar/BottomBar';

class Frame extends Component {
    render() {
        return (
            <Paper square className={'Frame'}>
                <Titlebar />
                <div className="main">
                    {this.props.children}
                </div>
                <BottomBar />
            </Paper>
        );
    }
}

export default Frame;
