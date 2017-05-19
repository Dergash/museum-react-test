import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from 'redux-mock-store';
import ExibitsTable from '../components/exibits-table/exibits-table';
import { INITIAL_STATE } from '../reducer';

const getStore = (initialState) => mockStore({})(initialState);

const sampleExibits = [
    { id: 0, name: 'первый', organization: '', origin: '', description: '' },
    { id: 1, name: 'второй', organization: '', origin: '', description: '' },
    { id: 2, name: 'тоже', organization: '', origin: '', description: '' },
    { id: 3, name: 'герой', organization: '', origin: '', description: '' },
    { id: 4, name: 'четвертый', organization: '', origin: '', description: '' },
    { id: 5, name: 'пятый', organization: '', origin: '', description: '' },
    { id: 6, name: 'минус пятый', organization: '', origin: '', description: '' },
    { id: 7, name: 'седьмой вообще molodtsom', organization: '', origin: '', description: '' },
];

describe('<ExibitsTable />', () => {
    it('renders when empty', () => {
        const store = getStore(INITIAL_STATE);
        const wrapper = mount(
            <Provider store={store}>
                <ExibitsTable />
            </Provider>
        );
        expect(wrapper.find('.exibits-table').length).toBe(1);
        expect(wrapper.find('.exibits-table__row').length).toBe(0);
    });
    it('renders specific number of exibits on page', () => {
        const store = getStore(INITIAL_STATE);
        const wrapper = mount(
            <Provider store={store}>
                <ExibitsTable exibits={sampleExibits} />
            </Provider>
        );
        const itemsOnPage = wrapper.find(ExibitsTable).props().itemsOnPage;
        expect(wrapper.find('.exibits-table__row').length).toBe(itemsOnPage);
    });
    it('exibits are filtered by search pattern', () => {
        const store = getStore({
            ...INITIAL_STATE,
            searchPattern: 'пятый',
        });
        const wrapper = mount(
            <Provider store={store}>
                <ExibitsTable exibits={sampleExibits} />
            </Provider>
        );
        expect(wrapper.find('.exibits-table__row').length).toBe(2);
        expect(wrapper.find('.exibits-table__row')
            .filterWhere(item => [5, 6].indexOf(item.key) > -1))
            .toBeTruthy();
    });
});