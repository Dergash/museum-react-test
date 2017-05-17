import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './checkbox.css';

const cn = require('bem-cn')('checkbox');

export default class Button extends React.Component {
    render() {
        return(
            <div className={cn}>
                <label>
                    <input
                        type="checkbox"
                        className={cn('input')}
                        checked={this.props.checked}
                    />
                    <span className={cn('icon', { checked: this.props.checked })}>
                        <Glyphicon glyph="ok" />
                    </span>
                </label>
            </div>
        );
    }
}

Button.defaultProps = {
    role: '',
    checked: false,
};