import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import CollapsableText from '../collapsable-text/collapsable-text';
import './editable-field.css';

const cn = require('bem-cn')('editable-field');

/**
 * contentEditable is kind of tricky, but still manageble with React: 
 * http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/
 * 
 * Implementation pretty the same, except componentWillMount for initial value,
 * edit property and general getDOMNode => ref api change.
 *
 */
export default class EditableField extends React.Component {

    /*
    * If you need to add a new property, please make sure you correctly handle update as with edit property
    */
    shouldComponentUpdate(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            return true;
        }
        if (nextProps.edit !== this.props.edit) {
            return true;
        }
        if (this.input && nextProps.value !== this.input.innerText) {
            return true;
        }
        return false;
    }

    componentWillMount() {
        this.lastValue = this.props.value || '';
    }

    componentDidUpdate() {
        if (this.input && this.input.innerText !== this.lastValue) {
            this.input.innerText = this.lastValue;
        }
    }

    render() {
        return(
            <div className={cn({ collapsed: !!this.props.collapsed })}>
                { !this.props.edit &&
                    <CollapsableText
                        collapsed={this.props.selected}
                        value={this.props.value}
                    />
                }
                { this.props.edit && 
                    <div
                        contentEditable
                        className={cn('input')}
                        onInput={this.handleOnChange}
                        ref={(input) => this.input = input}
                    >
                        {this.props.value}
                    </div>
                }
            </div>
        );
    }

    @autobind
    handleOnChange(event) {
        const value = event.target.innerText;
        if (value !== this.lastValue) {
            this.props.onChange(value);
        }
        this.lastValue = value;
    }
}

EditableField.defaultProps = {
    selected: false,
    edit: false,
    onChange: (value) => {},
};