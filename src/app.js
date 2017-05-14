import React from 'react';
import ReactDOM from 'react-dom';
import Main from './forms/main';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer, { INITIAL_STATE } from './reducer';

let store;

if (!store) {
        const plugins = [thunk];
        if (process.env.NODE_ENV !== 'production') {
            plugins.push(createLogger({ collapsed: true }));
        }
        const finalCreateStore = compose(
            applyMiddleware.apply(null, plugins),
            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
                ? window.devToolsExtension()
                : state => state
        )(createStore);
        store = finalCreateStore(reducer, INITIAL_STATE);
}

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('react-app')
);