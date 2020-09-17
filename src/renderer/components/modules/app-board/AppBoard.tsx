import React from 'react';
import './AppBoard.scss';
import { StoreState } from '../../../store/reducer';
import { connect } from 'react-redux';
import { ModuleDescription, setCurrent } from '../../../store/module/components/action';
import { Button } from '@material-ui/core';
import { listApp } from '../../router/components';
import Tooltip from '@material-ui/core/Tooltip';

interface StateProps {
    components: ModuleDescription[]
}

interface DispatchProps {
    setCurrent: (componentName: string) => void
}

const mapStateToProps = (state: StoreState) => ({});
const mapDispatchToProps = (dispatch: Function) => {
    return {
        setCurrent: (componentName: string) => {
            dispatch(setCurrent(componentName));
        }
    };
};

interface Props extends DispatchProps, StateProps {

}


function AppBoard(props: Props) {


    const apps = listApp();

    return (
        <div className={'AppBoard'}>
            {apps.map(app =>
                <Tooltip title={app.description ?? ''} key={app.name}>
                    <Button color={app.external ? 'secondary' : 'primary'} size={'large'}
                            className={'app'}
                            variant={'outlined'}
                            onClick={() => props.setCurrent(app.name)}
                    >{app.name}
                    </Button>
                </Tooltip>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBoard) as any;
