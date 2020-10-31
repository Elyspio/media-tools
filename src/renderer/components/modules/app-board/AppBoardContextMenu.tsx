import * as React from 'react';
import { StoreState } from '../../../store/reducer';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { DialogContent, DialogTitle, InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { setConfig } from '../../../store/module/configuration/action';
import { BaseConfig, Configuration } from '../../../../main/services/configuration/configurationService';

const mapStateToProps = (state: StoreState) => ({
    config: state.config.current
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setShowed: (elem: Configuration['appboard']['show'], config: Configuration) => dispatch(setConfig({
        ...config, appboard: {
            ...config.appboard,
            show: elem
        }
    }))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

type Props = ReduxTypes & { close: () => void };

function AppBoardContextMenu({ config, setShowed, close }: Props) {


    return (
        <div>
            <DialogTitle id="responsive-dialog-title">{'Action when processes are finished'}</DialogTitle>
            <DialogContent>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Show</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={config.appboard.show}
                        onChange={e => setShowed(e.target.value as any, config)}
                        label="Show"
                        multiple={true}
                    >
                        {BaseConfig.appboard.show.map(l => <MenuItem value={l} key={l}>{l}</MenuItem>)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </div>
    );
}

export default connector(AppBoardContextMenu);
