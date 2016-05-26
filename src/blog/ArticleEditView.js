/* eslint-env browser */
/* @flow */

import React from 'react';
import {View, Button, TextInput} from '../ui';
import autobind from 'class-autobind';
const ActionType = {
  ADD_POST: 1,
  EDIT_POST: 2,
};

import type Article from './ArticleType';

const {Component} = React;

type Props = {
  article: Article;
  onSave: () => {};
  onCancel: () => {};
};
type State = {
  title: string;
  content: string;
};

export default class ArticleEditView extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(...arguments);
    let {article} = props;
    this.state = {
      title: article.title,
      content: article.content,
    };
    autobind(this);
  }

  render() {
    let {state} = this;
    let {article, onCancel} = this.props;
    return (
      <View className="article-detail">
        <View className="article-edit-field">
          <TextInput value={state.title} onChange={this._onTitleChange} />
        </View>
        <View className="article-author">Author: {article.author}</View>
        <View className="article-edit-field">
          <TextInput multiline={true} value={state.content} onChange={this._onContentChange} />
        </View>
        <View className="article-edit-field">
          <Button label="Save" onClick={this._onSave} />
          <Button label="Reset" onClick={this._onReset} />
          <Button label="Cancel" onClick={onCancel} />
        </View>
      </View>
    );
  }

  _onTitleChange(event) {
    let newValue = event.target.value;
    this.setState({title: newValue});
  }

  _onContentChange(event) {
    let newValue = event.target.value;
    this.setState({content: newValue});
  }

  _onReset() {
    let {article} = this.props;
    this.setState({
      title: article.title,
      content: article.content,
    });
  }

  _onSave() {
    let {article} = this.props;
    let newArticle = {
      title: this.state.title,
      author: article.author,
      content: this.state.content,
    };
    this.props.onSave(newArticle, ActionType.EDIT_POST);
  }
}
