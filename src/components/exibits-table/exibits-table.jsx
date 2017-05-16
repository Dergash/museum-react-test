import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Filter from './filter';
import './exibits-table.css';

const cn = require('bem-cn')('exibits-table');

@connect(state => {
    return {
        filters: state.filters,
    };
})
export default class ExibitsTable extends React.Component {
    render() {
        const options = this.props.exibits && this.props.exibits.map(exibit => exibit.origin);
        return(
            <Table responsive className={cn()}>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>
                            <Filter
                                title="Место создания"
                                options={options}
                                filters={this.props.filters}
                                onChange={(e) => this.handleOnFiltersChange(e)}
                            />
                        </th>
                        <th>Организация</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                { this.props.exibits && this.props.exibits
                    .filter(exibit => !this.props.filters.length || this.props.filters.indexOf(exibit.origin) > -1)
                    .map((exibit, index) =>
                    <tr key={index} className={cn('row')}>
                        <td className={cn('column', { name: true })}>{exibit.name}</td>
                        <td className={cn('column', { origin: true })}>{exibit.origin}</td>
                        <td className={cn('column', { organization: true })}>{exibit.organization}</td>
                        <td className={cn('column', { description: true })}>{exibit.description}</td>
                    </tr>
                    )
                }
                </tbody>
            </Table>
        );
    }
}

ExibitsTable.propTypes = {
    exibits: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        organization: PropTypes.string,
        origin: PropTypes.string,
        description: PropTypes.string,
    })),
};