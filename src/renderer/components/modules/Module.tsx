import * as React from 'react';
import { ModuleDescription, setCurrent } from '../../store/module/components/action';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';

import './Module.scss';

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


const mapDispatchToProps = (dispatch: Function) => ({
    backHistory: () => dispatch(setCurrent(undefined))
});

export default connect(null, mapDispatchToProps)(Module) as any;

