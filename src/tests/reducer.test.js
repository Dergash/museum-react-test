import React from 'react'
import reducer from '../reducer.js';

const sampleExibits = [
    { id: 3, name: 'Сверло', organization: 'ZCC', origin: 'Китай', description: 'Редкое' },
    { id: 7, name: 'Ульянов Володя', organization: 'РКП(Б)', origin: 'из разночинцев', description: '' },
    { id: 4, name: 'Сверло', organization: 'HAM', origin: 'Германия', description: 'Дорогое' },
];

describe('addExibit', () => {
    it('should append new item with correct id (maxPrevId + 1)', () => {
        const state = {
            exibits: sampleExibits,
        };
        const newExibits = reducer(state, {
            type: 'ADD_EXIBIT',
        }).exibits;
        expect(newExibits).toHaveLength(4);
        expect(newExibits).toContainEqual({ id: 8, name: '', organization: '', origin: '', description: '' });
    });
    it('should work when no exibits exists', () => {
        const state = {
            exibits: [],
        };
        const newState = reducer(state, {
            type: 'ADD_EXIBIT',
        });
        expect(newState.exibits).toContainEqual({ id: 0, name: '', organization: '', origin: '', description: '' });
    });
});

describe('saveExibit', () => {
    it('should replace exibit with matching with editedExibit and clear the latter', () => {
        const state = {
            editedExibit: {
                id: 7,
                name: 'Неульянов Неволодя',
                organization: 'РСДРП',
                origin: 'предприниматель',
                description: '',
            },
            exibits: sampleExibits,
        };
        const newState = reducer(state, {
            type: 'SAVE_EXIBIT',
        });
        expect(newState.editedExibit).toBeNull();
        expect(newState.exibits).toHaveLength(sampleExibits.length);
        expect(newState.exibits).toContainEqual({
            id: 7,
            name: 'Неульянов Неволодя',
            organization: 'РСДРП',
            origin: 'предприниматель',
            description: '',
        });
    });
});
