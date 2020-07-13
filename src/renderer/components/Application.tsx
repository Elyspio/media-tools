import * as React from 'react';
import {Component} from 'react';
import Frame from "./frame/Frame";
import Router from "./router/Router";

class Application extends Component {
    render() {
        return (
            <Frame>
                <Router/>
            </Frame>
        );
    }
}


export default Application;
