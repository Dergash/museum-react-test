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
                <Button className={cn('add')} role="primary" value="Добавить" onClick={this.handleOnAddClick} />
                <ExibitsTable className={cn('table')} exibits={this.props.exibits} />
            </section>
        );
    }

    @autobind
    handleOnAddClick() {
        this.props.dispatch(actions.addExibit());
    }
}