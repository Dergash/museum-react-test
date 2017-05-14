import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        pek: state.pek,
    };
})
export default class Main extends React.Component {
    render() {
        return(
            <h1>{this.props.pek}</h1>
        );
    }
}