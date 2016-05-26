import React from 'react';

const {Component} = React;

export default class View extends Component {
  render() {
    let {props} = this;
    return (
      <div {...props}>{props.children}</div>
    );
  }
}
