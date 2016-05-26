/* eslint-env browser */
/* @flow */

import React from 'react';
import {View, Button} from '../ui';

import type Article from './ArticleType';

const {Component} = React;

type Props = {
  article: Article;
  onEditClick: () => {};
};

export default class ArticleDetailView extends Component {
  props: Props;

  render() {
    let {article, onEditClick} = this.props;
    if (article == null) {
      return <View className="article-detail">No article to show.</View>;
    }
    return (
      <View className="article-detail">
        <View className="article-title">{article.title}</View>
        <View className="article-author">Author: {article.author}</View>
        <View className="article-content">{article.content}</View>
        <View><Button label="Edit" onClick={onEditClick} /></View>
      </View>
    );
  }
}
