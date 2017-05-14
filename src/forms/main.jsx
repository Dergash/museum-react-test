import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ExibitsTable from '../components/exibits-table/exibits-table';
import * as actions from '../actions';
import './main.css';

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
            <section>
                <ExibitsTable exibits={this.props.exibits} />
            </section>
        );
    }
}