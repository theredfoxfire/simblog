import React from 'react';
import cx from 'classnames';

const {Component, PropTypes} = React;

export default class Button extends Component {
  render() {
    let {props} = this;
    let {className, ...otherProps} = props;
    className = cx(className, 'button');
    return (
      <button className={className} {...otherProps}>{props.label}</button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};
