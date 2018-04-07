import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Provider, observer} from 'mobx-react';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';

import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dashboard from 'Components/Dashboard';

import snackbarStore from 'Stores/SnackbarStore';
import backendStore from 'Stores/BackendStore';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

@observer
class App extends Component {

    render() {

        const muiTheme = getMuiTheme();

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Provider
                        backendStore={backendStore}
                        snackbarStore={snackbarStore}>
                        <HashRouter>
                            <div>
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </div>
                        </HashRouter>
                    </Provider>
                    <Snackbar
                        open={snackbarStore.displayToast}
                        message={snackbarStore.toastMessage}
                        style={{width:'100%', backgroundColor: '#000000', color: '#FFFFFF', justifyContent: 'center'}}
                        bodyStyle={{backgroundColor: '#000000', color: '#FFFFFF'}}
                        autoHideDuration={2500}
                        onRequestClose={snackbarStore.close}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));
