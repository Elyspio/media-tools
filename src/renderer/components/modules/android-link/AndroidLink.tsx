import React, {Component} from 'react';
import {ModuleDescription} from "../../../store/module/components/action";
import "./AndroidLink.scss"
import {connect} from "react-redux";
import {StoreState} from "../../../store/reducer";

interface State {
}

export class AndroidLink extends Component<{}, State> {

    public static info: ModuleDescription = {
        name: "AndroidLink",
        description: "toto"
    }

    state = {};

    private url = "http://elyspi:5002?theme=dark&no_drawer=true"

    render() {
        return <iframe className={"AndroidLink"}
                       src={this.url}
                       frameBorder="0"/>
    }
}

