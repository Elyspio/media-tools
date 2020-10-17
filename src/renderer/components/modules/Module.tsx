import * as React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { ModuleDescription } from '../../store/module/router/reducer';
import './Module.scss';
import { setPath } from '../../store/module/router/action';
import { StoreState } from '../../store/reducer';

type ModuleProps = {
    info: ModuleDescription
}


class Module extends React.Component<ModuleProps & { backHistory: Function }> {
    render() {
        return <div className={'Module'}>
            <div className="bar">
                <IconButton className={'backBtn'}
                            onClick={() => this.props.backHistory()}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant={'h5'} className="title">{this.props.info.name}</Typography>
            </div>
            {this.props.children}
        </div>;
    }
}


const mapStateToProps = (state: StoreState) => ({
    info: state.routing.routes[state.routing.path]
})

const mapDispatchToProps = (dispatch: Function) => ({
    backHistory: () => dispatch(setPath("/"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Module) as any;

