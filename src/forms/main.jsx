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
    };
})
export default class Main extends React.Component {
    
    componentWillMount() {
        if (!this.props.exibits) {
            this.props.dispatch(actions.getExibits());
        }
    }

    render() {
        const exibitSelected = !(!this.props.selectedExibitId && this.props.selectedExibitId !== 0);
        return(
            <section className={cn()}>
                <div className={cn('toolbar')}>
                    <Button className={cn('toolbar-button')} role="primary" value="Добавить" onClick={this.handleOnAddClick} />
                    { exibitSelected && 
                        <Button
                            className={cn('toolbar-button')}
                            role="primary"
                            value="Изменить"
                            
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
                <ExibitsTable className={cn('table')} exibits={this.props.exibits} />
            </section>
        );
    }

    @autobind
    handleOnAddClick() {
        this.props.dispatch(actions.addExibit());
    }

    @autobind
    handleOnDeleteClick() {
        this.props.dispatch(actions.deleteExibit(this.props.selectedExibitId));
    }
}