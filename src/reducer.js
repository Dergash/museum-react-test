export const INITIAL_STATE = {
    exibits: null,
    filters: [],
    searchPattern: '',
};

export default function reduce(state = {}, action) {
    switch (action.type) {
        case 'ADD_EXIBIT': return addExibit(state, action);
        case 'GET_EXIBITS': return state;
        case 'GET_EXIBITS_RESOLVE': return getExibitsResolve(state, action);
        case 'GET_EXIBITS_REJECT': return getExibitsReject(state, action);
        case 'SET_FILTERS': return setFilters(state, action);
        case 'SET_SEARCH_PATTERN': return setSearchPattern(state, action);
        default: return state;
    }
}

function addExibit(state) {
    return {
        ...state,
        exibits: [
            {
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