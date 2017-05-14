export const INITIAL_STATE = {
    exibits: null,
};

export default function reduce(state = {}, action) {
    switch (action.type) {
        case 'GET_EXIBITS': return state;
        case 'GET_EXIBITS_RESOLVE': return getExibitsResolve(state, action);
        case 'GET_EXIBITS_REJECT': return getExibitsReject(state, action);
        default: return state;
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