/* eslint-env browser */
/* @flow */

import React from 'react';
import {View, TextInput, Button} from '../ui';
import autobind from 'class-autobind';

import type Article from './ArticleType';

const {Component} = React;

type Props = {
  articles: Array<Article>;
  selectedIndex: number;
  onArticleSelect: (index: number) => {};
  onCreate: () => {};
};

type State = {
  searchText: string,
};
export default class ArticleListView extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    this.state = {
      searchText: '',
    };
    autobind(this);
  }
  render() {
    let {articles, onCreate} = this.props;
    let {searchText} = this.state;
    return (
      <View className="article-list">
        <View className="article-add">
          <Button label="Add Article" onClick={onCreate} />
        </View>
        <View className="article-search">
          <TextInput value={this.state.searchText} placeholder="Search" onChange={this._setSearchText} />
        </View>
        {articles.map((article, i) => {
          if (article.title.toLowerCase().includes(searchText.toLowerCase())) {
            return this._renderItem(article, i);
          }
        })
        }
      </View>
    );
  }

  _renderItem(article: Article, index: number): Array<Component> {
    let {selectedIndex} = this.props;
    let className = 'list-item';
    if (index === selectedIndex) {
      className += ' selected';
    }
    const onClick = () => {
      this.props.onArticleSelect(index);
    };
    return (
        <View key={String(index)} className={className} onClick={onClick}>
          {article.title}
        </View>
      );
  }
  _setSearchText(event) {
    let text = event.target.value;
    this.setState({
      searchText: text,
    });
  }
}
