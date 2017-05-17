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

export function addExibit() {
    return {
        type: 'ADD_EXIBIT',
    };
}

export function setFilters(filters) {
    return {
        type: 'SET_FILTERS',
        filters,
    };
}

export function setSearchPattern(searchPattern) {
    return {
        type: 'SET_SEARCH_PATTERN',
        searchPattern,
    };
}