import React from 'react';

const {Component} = React;

export default class Text extends Component {
  render() {
    let {props} = this;
    return (
      <span {...props}>{props.children}</span>
    );
  }
}
