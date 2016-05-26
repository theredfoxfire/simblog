/* eslint-env browser */
/* @flow */

import React from 'react';
import {View, Button, TextInput} from '../ui';
import autobind from 'class-autobind';

import type Article from './ArticleType';

const ActionType = {
  ADD_POST: 1,
  EDIT_POST: 2,
};
const {Component} = React;

type Props = {
  onSave: (article: Article, actionType: ?number) => {};
  onCancel: () => {};
};
type State = {
  title: string;
  content: string;
};

export default class ArticleEditView extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    this.state = {
      title: '',
      author: '',
      content: '',
    };
    autobind(this);
  }

  render() {
    let {title, author, content} = this.state;
    let {onCancel} = this.props;
    return (
      <View className="article-detail">
        <View className="article-author">Title:</View>
        <View className="article-edit-field">
          <TextInput value={title} onChange={this._onTitleChange} />
        </View>
        <View className="article-author">Author:</View>
        <View className="article-edit-field">
          <TextInput value={author} onChange={this._onAuthorChange} />
        </View>
        <View className="article-author">Content:</View>
        <View className="article-edit-field">
          <TextInput multiline={true} value={content} onChange={this._onContentChange} />
        </View>
        <View className="article-edit-field">
          <Button label="Save" onClick={this._onSave} />
          <Button label="Cancel" onClick={onCancel} />
        </View>
      </View>
    );
  }

  _onTitleChange(event: Object) {
    let newValue = event.target.value;
    this.setState({title: newValue});
  }

  _onContentChange(event: Object) {
    let newValue = event.target.value;
    this.setState({content: newValue});
  }

  _onAuthorChange(event: Object) {
    let newValue = event.target.value;
    this.setState({author: newValue});
  }

  _onSave() {
    let {title, author, content} = this.state;
    let newArticle = {
      title: title,
      author: author,
      content: content,
    };
    this.props.onSave(newArticle, ActionType.ADD_POST);
  }
}
