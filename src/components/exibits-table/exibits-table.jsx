import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Filter from './filter';
import Search from './search';
import CollapsableText from '../collapsable-text/collapsable-text';
import autobind from 'autobind-decorator';
import * as actions from '../../actions';
import './exibits-table.css';

const cn = require('bem-cn')('exibits-table');

@connect(state => {
    return {
        filters: state.filters,
        searchPattern: state.searchPattern,
        selectedExibitId: state.selectedExibitId,
    };
})
export default class ExibitsTable extends React.Component {
    render() {
        const options = this.props.exibits && this.props.exibits.map(exibit => exibit.origin);
        return(
            <div className={cn.mix(this.props.className)}>
                <Table hover>
                    <thead>
                        <tr>
                            <th className={cn('column', { name: true })}>
                                <Search
                                    title="Название"
                                >
                                </Search>
                            </th>
                            <th className={cn('column', { origin: true })}>
                                <Filter
                                    title="Место создания"
                                    options={options}
                                    filters={this.props.filters}
                                    onChange={(e) => this.handleOnFiltersChange(e)}
                                />
                            </th>
                            <th className={cn('column', { organization: true })}>Организация</th>
                            <th className={cn('column', { description: true })}>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.props.exibits && this.props.exibits
                        .filter(exibit => !this.props.filters.length || this.props.filters.indexOf(exibit.origin) > -1)
                        .filter(exibit => !this.props.searchPattern.length
                            || exibit.name.toUpperCase().indexOf(this.props.searchPattern.toUpperCase()) > -1)
                        .map(exibit =>
                        <tr
                            key={exibit.id}
                            data-id={exibit.id}
                            className={cn('row', { selected: this.props.selectedExibitId === exibit.id })}
                            onClick={this.handleOnRowClick}
                        >
                            <td>{exibit.name}</td>
                            <td>{exibit.origin}</td>
                            <td>{exibit.organization}</td>
                            <td>
                                <CollapsableText
                                    collapsed={this.props.selectedExibitId !== exibit.id}
                                    value={exibit.description}
                                />
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

    @autobind
    handleOnRowClick(event) {
        const clickedExibitId = parseInt(event.currentTarget.dataset.id, 10);
        const selectedExibitId = this.props.selectedExibitId !== clickedExibitId ? clickedExibitId : null;
        this.props.dispatch(actions.selectExibit(selectedExibitId));
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