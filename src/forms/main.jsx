import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
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
                <Grid>
                    <Row>
                        <Col>
                            <h1>{this.props.pek}</h1>
                        </Col>
                    </Row>
                </Grid>
            </section>
        );
    }
}