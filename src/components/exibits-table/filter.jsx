import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Button from '../button/button';
import Checkbox from '../checkbox/checkbox';
import * as actions from '../../actions';
import './filter.css';

const cn = require('bem-cn')('exibits-table-filter');

@connect(state => {
    return {
        filters: state.filters,
    };
})
export default class Filter extends React.Component {
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
                <Button value={this.props.title} icon="filter" onClick={(e) => this.handleOnClick(e)} />
                { this.state.isOpen && 
                    <div className={cn('popup')}>
                        { this.props.options && this.renderOptions() }
                    </div>
                }
            </div>
        );
    }

    renderOptions() {
        return (
            <ul>
                { this.props.options
                    .sort((a, b) => a.localeCompare(b))
                    .map((option, index) => {
                        return (
                            <li key={index} data-option={option} onClick={this.handleOnCheckOption}>
                                <Checkbox checked={this.props.filters.indexOf(option) > -1} />
                                <span className={cn('option')}>
                                    {option || 'Не задано'}
                                </span>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    handleOnClick(event) {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    @autobind
    handleOnCheckOption(event) {
        const option =event.currentTarget.dataset.option;
        const filters = this.props.filters.indexOf(option) > -1
            ? this.props.filters.filter(filter => filter !== option)
            : [
                ...this.props.filters,
                option,
            ];
        this.props.dispatch(actions.setFilters(filters));
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

Filter.defaultProps = {
    options: [],
};