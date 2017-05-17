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

export function selectExibit(exibitId) {
    return {
        type: 'SELECT_EXIBIT',
        exibitId,
    };
}

export function addExibit() {
    return {
        type: 'ADD_EXIBIT',
    };
}

export function editExibit(exibit) {
    return {
        type: 'EDIT_EXIBIT',
        exibit,
    };
}

export function editExibitChange(exibit) {
    return {
        type: 'EDIT_EXIBIT_CHANGE',
        exibit,
    };
}

export function deleteExibit(exibitId) {
    return {
        type: 'DELETE_EXIBIT',
        exibitId,
    };
}

export function saveExibit() {
    return {
        type: 'SAVE_EXIBIT',
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