import React from 'react';
import './AppBoard.scss';
import { StoreState } from '../../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { Register } from '../../../decorators/Module';
import { setPath } from '../../../store/module/router/action';
import { ModuleDescription } from '../../../store/module/router/reducer';


const mapStateToProps = (state: StoreState) => ({
    apps: Object.values(state.routing.routes)

});
const mapDispatchToProps = (dispatch: Function) => {
    return {
        setCurrent: (path: string) => {
            dispatch(setPath(path));
        }
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

@Register({ name: 'AppBoard',  path: "/", show: false }, connector)
class AppBoard extends React.Component<ConnectedProps<typeof connector>> {
    render() {


        return (
            <div className={'AppBoard'}>
                {this.props.apps.filter(x => x.show !== false).map(app =>
                    <Tooltip title={app.description ?? ''} key={app.name}>
                        <Button color={app.external ? 'secondary' : 'primary'} size={'large'}
                                className={'app'}
                                variant={'outlined'}
                                onClick={() => this.props.setCurrent(app.path)}>
                            {app.name}
                        </Button>
                    </Tooltip>
                )}
            </div>
        );
    }
}

