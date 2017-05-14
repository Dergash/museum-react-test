export const INITIAL_STATE = {
    pek: 'Store is up and running',
    exibits: [
        {
            name: 'Фотоаппарат \"Смена\", клаппкамера с автоматически устанавливающейся объективной доской"',
            city: '',
            country: '',
            description: '',
            organization: 'Государственный оптико-механический завод (ГОМЗ)',
        }
    ],
};

export default function reduce(state = {}, action) {
    switch (action.type) {
        default: return state;
    }
}
