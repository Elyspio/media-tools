import React, { Component } from 'react';
import './Light.scss';
import { Register } from '../../../../decorators/Module';

interface State {
    url?: string
}

@Register({ name: 'Light', external: true , path: "/light", show: false})
export class Light extends Component<{}, State> {


    state = {
        url: undefined
    };

    async componentDidMount() {
        try {
            await this.fetchTimeout('http://aero.elyspio.fr', 100);
            this.setState({
                url: 'http://aero.elyspio.fr'
            });
        } catch (e) {
            this.setState({
                url: 'http://pi.elyspio.fr'
            });
        }
    }

    render() {
        if (this.state.url) {
            return <iframe className={'Light'}
                           src={this.state.url}
                           frameBorder="0" />;
        }
        return null;
    }

    private fetchTimeout(url: string, timeout: number) {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), timeout)
            )
        ]);
    }
}

