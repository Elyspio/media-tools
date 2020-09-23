import React from 'react';
import './Updater.scss';
import { Register } from '../../../../decorators/Module';
import { CircularProgressWithLabel } from '../../../common/progress';
import { StoreState } from '../../../../store/reducer';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { checkUpdate, downloadUpdate } from '../../../../../main/util/updater';

interface State {

}

const mapStateToProps = (state: StoreState) => ({
    progress: state.updater.download
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

@Register({ name: 'Updater' }, connector)
class Updater extends React.Component<ReduxTypes> {

    render() {

        const { progress } = this.props;

        const size = {
            circle: '15rem',
            title: '1.3rem',
            percentage: '2rem'
        };

        return (
            <div className={'Updater'}>


                <div className="progress">
                    <CircularProgressWithLabel size={size} label={(progress || 0) < 100 ? 'Downloading' : 'Downloaded'} value={progress || 0} />

                </div>


                <div className="buttons">
                    <Button color={'primary'} onClick={checkUpdate} variant={'outlined'}>Check for update</Button>
                    <Button color={'primary'} onClick={downloadUpdate} variant={'outlined'}>Download</Button>
                    <Button color={'secondary'} onClick={downloadUpdate} variant={'outlined'} disabled={progress !== 100} >Install</Button>

                </div>


            </div>
        );
    }
}

export default connector(Updater);
