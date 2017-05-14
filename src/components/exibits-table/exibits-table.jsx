import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

// В больших приложениях к стору цепляю только формы, а в компоненты передаю свойствами
@connect(state => {
    return {
        exibits: state.exibits,
    };
})
export default class ExibitsTable extends React.Component {
    render() {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Место создания</th>
                        <th>Организация</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                { this.props.exibits.map((exibit, index) =>
                    <tr key={index}>
                        <td>{exibit.name}</td>
                        <td>{this.formatOrigin(exibit.city, exibit.country)}</td>
                        <td>{exibit.organization}</td>
                        <td>{exibit.description}</td>
                    </tr>
                    )
                }
                </tbody>
            </Table>
        );
    }

    formatOrigin(country, city) {
        return `${city}${city && country ? ', ' : ''}${country}`;
    }
}
 
