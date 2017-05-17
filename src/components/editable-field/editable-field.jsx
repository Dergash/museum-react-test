import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './editable-field.css';

const cn = require('bem-cn')('editable-field');

export default class Button extends React.Component {
    render() {
        return(
            <div className={cn}>
                { !this.props.edit && this.props.value }
                { this.props.edit && 
                    <textarea
                        className={cn('input')}
                        type="text"
                        value={this.props.value}
                        onChange={this.handleOnChange}
                    />
                }
            </div>
        );
    }

    @autobind
    handleOnChange(event) {
        this.props.onChange(event.target.value);
    }
}

Button.defaultProps = {
    role: '',
    edit: false,
    onChange: (value) => {},
};