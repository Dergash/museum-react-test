import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Button from '../button/button';
import * as actions from '../../actions';
import './pager.css';

const cn = require('bem-cn')('exibits-table-pager');

export default class Pager extends React.Component {
    render() {
        return(
            <div className={cn.mix(this.props.className)}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(this.props.items / this.props.itemsLimit)}
                    maxButtons={this.props.itemsLimit}
                    activePage={this.props.page}
                    onSelect={this.handleSelect}
                />
            </div>
        );
    }

    @autobind
    handleSelect(selectedPage) {
        this.props.onChange(selectedPage);
    }
}

Pager.defaultProps = {
    items: 0,
    page: 1,
    onChange: () => {},
};