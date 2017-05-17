export const INITIAL_STATE = {
    exibits: null,
    filters: [],
    searchPattern: '',
    selectedExibitId: null,
    editedExibit: null,
};

export default function reduce(state = {}, action) {
    switch (action.type) {
        case 'SELECT_EXIBIT': return selectExibit(state, action);
        case 'ADD_EXIBIT': return addExibit(state, action);
        case 'EDIT_EXIBIT': return editExibit(state, action);
        case 'EDIT_EXIBIT_CHANGE': return editExibitChange(state, action);
        case 'DELETE_EXIBIT': return deleteExibit(state, action);
        case 'SAVE_EXIBIT': return saveExibit(state, action);
        case 'GET_EXIBITS': return state;
        case 'GET_EXIBITS_RESOLVE': return getExibitsResolve(state, action);
        case 'GET_EXIBITS_REJECT': return getExibitsReject(state, action);
        case 'SET_FILTERS': return setFilters(state, action);
        case 'SET_SEARCH_PATTERN': return setSearchPattern(state, action);
        default: return state;
    }
}

function addExibit(state) {
    const generateId = state.exibits
        .map(exibit => exibit.id)
        .reduce((previous, next) => ( next > previous ? next : previous)) + 1;
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

function editExibit(state, { exibit }) {
    return {
        ...state,
        editedExibit: exibit,
    };
}

function editExibitChange(state, { exibit }) {
    return {
        ...state,
        editedExibit: exibit,
    };
}

function deleteExibit(state, { exibitId }) {
    return {
        ...state,
        exibits: state.exibits.filter(exibit => exibit.id !== exibitId),
    };
}

function saveExibit(state) {
    return {
        ...state,
        editedExibit: null,
        exibits: state.exibits.map(exibit => exibit.id === state.editedExibit.id ? state.editedExibit : exibit),
    };
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

function selectExibit(state, { exibitId }) {
    return {
        ...state,
        selectedExibitId: (state.editedExibit) ? state.editedExibit.id : exibitId,
    };
}