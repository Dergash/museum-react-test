import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './button.css';

const cn = require('bem-cn')('button');

export default class Button extends React.Component {
    render() {
        return(
            <button className={cn({ role: this.props.role }).mix(this.props.className)} onClick={this.props.onClick}>
                { this.props.value }
                { this.props.icon &&
                    <span className={cn('icon')}>
                        <Glyphicon glyph={this.props.icon} />
                    </span>
                }
            </button>
        );
    }
}

Button.defaultProps = {
    role: '',
    value: '',
    icon: '',
    onClick: () => {},
};