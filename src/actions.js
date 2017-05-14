import * as api from './api';

export function getExibits() {
    return (dispatch) => {
        dispatch({
            type: 'GET_EXIBITS',
        });
        api.getExibits()
            .then(exibits => {
                dispatch({
                    type: 'GET_EXIBITS_RESOLVE',
                    exibits,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'GET_EXIBITS_REJECT',
                    error,
                });
            });
    }
}