export const INITIAL_STATE = {
    exibits: null,
    filters: [],
    searchPattern: '',
    expandedRowId: null,
};

export default function reduce(state = {}, action) {
    switch (action.type) {
        case 'ADD_EXIBIT': return addExibit(state, action);
        case 'GET_EXIBITS': return state;
        case 'GET_EXIBITS_RESOLVE': return getExibitsResolve(state, action);
        case 'GET_EXIBITS_REJECT': return getExibitsReject(state, action);
        case 'SET_FILTERS': return setFilters(state, action);
        case 'SET_SEARCH_PATTERN': return setSearchPattern(state, action);
        case 'EXPAND_ROW': return expandRow(state, action);
        default: return state;
    }
}

function addExibit(state) {
    const generateId = state.exibits
        .reduce((previous, next) => ( previous > next ? previous : next)).id + 1;
    return {
        ...state,
        exibits: [
            {
                id: generateId,
                name: '',
                organization: '',
                origin: '',
                description: '',
            },
            ...state.exibits,
        ],
    }
}

function getExibitsResolve(state, { exibits }) {
    return {
        ...state,
        exibits,
    };
}

function getExibitsReject(state, { error }) {
    return {
        ...state,
        error,
    };
}

function setFilters(state, { filters }) {
    return {
        ...state,
        filters,
    };
}

function setSearchPattern(state, { searchPattern }) {
    return {
        ...state,
        searchPattern,
    };
}

function expandRow(state, { rowId }) {
    return {
        ...state,
        expandedRowId: rowId,
    };
}