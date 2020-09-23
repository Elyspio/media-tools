import * as React from 'react';
import { Component } from 'react';
import Frame from './frame/Frame';
import Router from './router/Router';
import { checkUpdate } from '../../main/util/updater';

class Application extends Component {

    componentDidMount() {
        setTimeout(checkUpdate, 1000);
    }

    render() {
        return (
            <Frame>
                <Router />
            </Frame>
        );
    }
}


export default Application;
