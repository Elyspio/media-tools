import React, { Component } from 'react';
import './AndroidLink.scss';
import { Register } from '../../../../decorators/Module';

interface State {
}

@Register({ name: 'AndroidLink', external: true, path: '/android-link', show: { appboard: true, name: true } })
export class AndroidLink extends Component<{}, State> {
    state = {};

    private url = 'http://elyspi:5002?theme=dark&no_drawer=true';

    render() {
        return <iframe className={'AndroidLink'}
                       src={this.url}
                       frameBorder="0" />;
    }
}

