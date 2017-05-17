import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ExibitsTable from '../components/exibits-table/exibits-table';
import Button from '../components/button/button';
import autobind from 'autobind-decorator';
import * as actions from '../actions';
import './main.css';
import { DropdownToggle, MenuItem } from 'react-bootstrap';

const cn = require('bem-cn')('exibits-main');

@connect(state => {
    return {
        exibits: state.exibits,
        selectedExibitId: state.selectedExibitId,
        editedExibit: state.editedExibit,
    };
})
export default class Main extends React.Component {
    
    componentWillMount() {
        if (!this.props.exibits) {
            this.props.dispatch(actions.getExibits());
        }
    }

    render() {
        return(
            <section className={cn()}>
                <div className={cn('toolbar')}>
                    { this.props.editedExibit && this.renderEditToolbar() }
                    { !this.props.editedExibit && this.renderMainToolbar() }
                </div>
                <ExibitsTable className={cn('table')} exibits={this.props.exibits} />
            </section>
        );
    }

    renderMainToolbar() {
        const exibitSelected = !(!this.props.selectedExibitId && this.props.selectedExibitId !== 0);
        return (
            <div>
                <Button
                    className={cn('toolbar-button')}
                    role="primary"
                    value="Добавить"
                    onClick={this.handleOnAddClick}
                />
                { exibitSelected && 
                    <Button
                        className={cn('toolbar-button')}
                        role="primary"
                        value="Изменить"
                        onClick={this.handleOnEditClick}
                    />
                }
                { exibitSelected && 
                    <Button
                        className={cn('toolbar-button')}
                        role="primary"
                        value="Удалить"
                        onClick={this.handleOnDeleteClick}
                    />
                }
            </div>
        );
    }

    renderEditToolbar() {
        return (
            <div>
                <Button
                    className={cn('toolbar-button')}
                    role="primary"
                    value="Отменить"
                    onClick={this.handleOnCancelClick}
                />
                <Button
                    className={cn('toolbar-button')}
                    role="primary"
                    value="Сохранить"
                    onClick={this.handleOnSaveClick}
                />
            </div>
        )
    }

    @autobind
    handleOnAddClick() {
        this.props.dispatch(actions.addExibit());
    }

    @autobind
    handleOnEditClick() {
        const exibit = this.props.exibits.filter(exibit => exibit.id === this.props.selectedExibitId)[0];
        this.props.dispatch(actions.editExibit(exibit));
    }

    @autobind
    handleOnDeleteClick() {
        this.props.dispatch(actions.deleteExibit(this.props.selectedExibitId));
    }

    @autobind
    handleOnCancelClick() {
        this.props.dispatch(actions.editExibit(null));
    }

    @autobind
    handleOnSaveClick() {
        this.props.dispatch(actions.saveExibit());
    }
}