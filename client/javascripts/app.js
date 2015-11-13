import React from "react";
import ReactDOM from "react-dom";
import createHistory from 'history/lib/createHashHistory'
import { Router, Route, IndexRoute } from "react-router";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { torrentReducer, uiReducer } from './reducers/reducers.js';
import GoTorrent from './main.js';
import Transfers from './pages/transfers.js';
import { Chat } from './pages/chat.js';

const reducer = combineReducers({
    routing: routeReducer,
    torrents: torrentReducer,
    ui: uiReducer
});

export const store = createStore(reducer);
const history = createHistory();

syncReduxAndRouter(history, store);

class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={GoTorrent}>
                    <IndexRoute component={Transfers}/>
                    <Route path="transfers" component={Transfers}/>
                    <Route path="chat" component={Chat}/>
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById("content")
);