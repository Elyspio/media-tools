import React from 'react';
import './AppBoard.scss';
import { StoreState } from '../../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { ModuleDescription, setCurrent } from '../../../store/module/components/action';
import { Button } from '@material-ui/core';
import { listApps } from '../../router/components';
import Tooltip from '@material-ui/core/Tooltip';


const mapStateToProps = (state: StoreState) => ({});
const mapDispatchToProps = (dispatch: Function) => {
    return {
        setCurrent: (componentName: string) => {
            dispatch(setCurrent(componentName));
        }
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);


interface Props extends ConnectedProps<typeof connector> {

}


function AppBoard(props: Props) {


    const apps: { internal: ModuleDescription[], external: ModuleDescription[] } = {
        internal: [],
        external: []
    };

    listApps().forEach(c => {
        if (c.external) apps.external.push(c);
        else apps.internal.push(c);
    });

    apps.external = apps.external.sort((a, b) => a.name.localeCompare(b.name));
    apps.internal = apps.internal.sort((a, b) => a.name.localeCompare(b.name));


    return (
        <div className={'AppBoard'}>
            {[...apps.internal, ...apps.external].map(app =>
                <Tooltip title={app.description ?? ''} key={app.name}>
                    <Button color={app.external ? 'secondary' : 'primary'} size={'large'}
                            className={'app'}
                            variant={'outlined'}
                            onClick={() => props.setCurrent(app.name)}>
                        {app.name}
                    </Button>
                </Tooltip>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBoard) as any;
