import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './collapsable-text.css';

const cn = require('bem-cn')('collapsable-text');

export default class CollapsableText extends React.Component {
    render() {
        return(
            <div className={cn({ collapsed: this.props.collapsed }).mix(this.props.className)}>
                {this.props.value}
            </div>
        );
    }
}

CollapsableText.defaultProps = {
    value: '',
    collapsed: true,
}