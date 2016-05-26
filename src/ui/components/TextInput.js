import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

const {Component, PropTypes} = React;

export default class TextInput extends Component {
  render() {
    let {props} = this;
    let {className, multiline, ...otherProps} = props;
    className = cx(className, 'text-input');
    if (multiline) {
      return (
        <textarea {...otherProps} className={className} />
      );
    } else {
      return (
        <input {...otherProps} type="text" className={className} />
      );
    }
  }
  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  multiline: PropTypes.bool,
};
