import * as React from 'react';
import Frame from './frame/Frame';
import Router from './router/Router';
import { checkUpdate } from '../../main/util/updater';


function Application() {

    React.useEffect(() => {
        setTimeout(checkUpdate, 1000);
    }, []);


    return (
        <Frame>
            <Router />
        </Frame>
    );
}

export default Application;
