import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ExibitsTable from '../components/exibits-table/exibits-table';

import './main.css';

@connect(state => {
    return {
        pek: state.pek,
    };
})
export default class Main extends React.Component {
    render() {
        return(
            <section>
                <ExibitsTable />
            </section>
        );
    }
}