import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, FormControl, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Button from '../button/button';
import * as actions from '../../actions';
import './search.css';

const cn = require('bem-cn')('exibits-table-search');

@connect(state => {
    return {
        searchPattern: state.searchPattern,
    };
})
export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentOnClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentOnClick);
    }

    render() {
        return(
            <div ref={(popup) => this.popup = popup}>
                <Button value={this.props.title} icon="search" onClick={(e) => this.handleOnClick(e)} />
                { this.state.isOpen && 
                    <div className={cn('popup')}>
                            <Form inline>
                            <FormControl
                                id="formControlsText"
                                inputRef={(searchField) => this.searchField = searchField}
                                type="text"
                                value={this.props.searchPattern}
                                onChange={this.handleOnChange}
                            />
                            </Form>
                    </div>
                }
            </div>
        );
    }

    handleOnClick(event) {
        this.setState({
            isOpen: !this.state.isOpen,
        }, () => {
            this.state.isOpen && this.searchField.focus();
        })
    }

    @autobind
    handleOnChange(event) {
        this.props.dispatch(actions.setSearchPattern(event.target.value));
    }

    @autobind
    handleDocumentOnClick(event) {
        if (this.state.isOpen && !this.popup.contains(event.target)) {
            this.setState({
                isOpen: false,
            })
        }
    }
}

Search.defaultProps = {
    searchPattern: '',
};