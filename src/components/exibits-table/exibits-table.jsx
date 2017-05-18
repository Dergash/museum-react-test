import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Filter from './filter';
import Search from './search';
import CollapsableText from '../collapsable-text/collapsable-text';
import EditableField from '../editable-field/editable-field';
import Pager from './pager';
import autobind from 'autobind-decorator';
import * as actions from '../../actions';
import './exibits-table.css';

const cn = require('bem-cn')('exibits-table');

@connect(state => {
    return {
        filters: state.filters,
        searchPattern: state.searchPattern,
        selectedExibitId: state.selectedExibitId,
        editedExibit: state.editedExibit,
    };
})
export default class ExibitsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        };
    }

    render() {
        const options = this.props.exibits && this.props.exibits.map(exibit => exibit.origin);
        const editedId = this.props.editedExibit && this.props.editedExibit.id;
        const exibitsToWork = !this.props.exibits ? [] : this.props.exibits
            .filter(exibit => !this.props.filters.length || this.props.filters.indexOf(exibit.origin) > -1)
            .filter(exibit => !this.props.searchPattern.length
                || exibit.name.toUpperCase().indexOf(this.props.searchPattern.toUpperCase()) > -1);
        const exibitsToShow = exibitsToWork
            .filter((exibit, index) => {
                const firstOnPage = (this.state.page - 1) * this.props.itemsOnPage;
                const lastOnPage = (this.state.page - 1) * this.props.itemsOnPage + this.props.itemsOnPage - 1;
                return index >= firstOnPage && index <= lastOnPage;
            }, this);
        return(
            <div className={cn.mix(this.props.className)}>
                <Table hover>
                    <thead>
                        <tr>
                            <th className={cn('column', { name: true })}>
                                <Search title="Название" />
                            </th>
                            <th className={cn('column', { origin: true })}>
                                <Filter
                                    title="Место создания"
                                    options={options}
                                    filters={this.props.filters}
                                    onChange={(e) => this.handleOnFiltersChange(e)}
                                />
                            </th>
                            <th className={cn('column', { organization: true })}>
                                Организация
                            </th>
                            <th className={cn('column', { description: true })}>
                                Описание
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    { !!exibitsToShow && exibitsToShow.map(exibit =>
                        <tr
                            key={exibit.id}
                            data-id={exibit.id}
                            className={cn('row', { selected: this.props.selectedExibitId === exibit.id })}
                            onClick={this.handleOnRowClick}
                        >
                            <td>
                                <EditableField
                                    value={editedId === exibit.id ? this.props.editedExibit.name : exibit.name}
                                    selected={this.props.selectedExibitId !== exibit.id}
                                    edit={editedId === exibit.id}
                                    onChange={this.handleOnNameChange}
                                />
                            </td>
                            <td>
                                <EditableField
                                    value={editedId === exibit.id ? this.props.editedExibit.origin : exibit.origin}
                                    selected={this.props.selectedExibitId !== exibit.id}
                                    edit={editedId === exibit.id}
                                    onChange={this.handleOnOriginChange}
                                />
                            </td>
                            <td>
                                <EditableField
                                    value={editedId === exibit.id ? this.props.editedExibit.organization : exibit.organization}
                                    selected={this.props.selectedExibitId !== exibit.id}
                                    edit={editedId === exibit.id}
                                    onChange={this.handleOnOrganizationChange}
                                />
                            </td>
                            <td>
                                <EditableField
                                    value={editedId === exibit.id ? this.props.editedExibit.description : exibit.description}
                                    selected={this.props.selectedExibitId !== exibit.id}
                                    edit={editedId === exibit.id}
                                    onChange={this.handleOnDescriptionChange}
                                />
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">
                                { exibitsToShow.length > 0 &&
                                    <Pager
                                        className={cn('pager')}
                                        items={exibitsToWork.length}
                                        itemsLimit={this.props.itemsOnPage}
                                        page={this.state.page}
                                        onChange={this.handleOnPageChange}
                                    />
                                }
                            </td>
                        </tr>
                    </tfoot>
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

    @autobind
    handleOnNameChange(name) {
        this.props.dispatch(actions.editExibitChange({
            ...this.props.editedExibit,
            name,
        }));
    }

    @autobind
    handleOnOriginChange(origin) {
        this.props.dispatch(actions.editExibitChange({
            ...this.props.editedExibit,
            origin,
        }));
    }

    @autobind
    handleOnOrganizationChange(organization) {
        this.props.dispatch(actions.editExibitChange({
            ...this.props.editedExibit,
            organization,
        }));
    }

    @autobind
    handleOnDescriptionChange(description) {
        this.props.dispatch(actions.editExibitChange({
            ...this.props.editedExibit,
            description,
        }));
    }

    @autobind
    handleOnPageChange(page) {
        this.setState({
            page,
        });
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

ExibitsTable.defaultProps = {
    itemsOnPage: 4,
};