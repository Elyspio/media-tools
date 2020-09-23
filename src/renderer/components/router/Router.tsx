import React, { PureComponent } from 'react';
import { StoreState } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import AppBoard from '../modules/app-board/AppBoard';
import Module from '../modules/Module';
import { getApp } from './components';

import '../modules/external/android-link/AndroidLink';
import '../modules/external/lights/Light';
import '../modules/internal/encoder/Encoder';
import '../modules/internal/purge/Purge';
import '../modules/internal/renamer/Renamer';
import '../modules/internal/updater/Updater';


interface Props extends ConnectedProps<typeof connector> {

}

interface State {
}

class Router extends PureComponent<Props, State> {

    render() {
        const comp = getApp(this.props.current);
        if (comp !== undefined) {
            return <Module info={comp}>
                <comp.component />
            </Module>;
        } else {
            return <AppBoard />;
        }
    }
}

const mapStateToProps = (state: StoreState) => {
    console.log('mapStateToProps', state.components.selected);
    return {
        current: state.components.selected
    };
};

const mapDispatchToProps = (dispatch: Function) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Router);
