/* eslint-env browser */
/* @flow */
import React from 'react';
import {View} from '../ui';
import ArticleListView from './ArticleListView';
import ArticleDetailView from './ArticleDetailView';
import ArticleEditView from './ArticleEditView';
import Article from './ArticleType';

const {Component} = React;
type Props = {
  endpoint: string;
}
type State = {
  articles: Array<Article>,
  isLoading: boolean,
  isAdding: boolean,
  isEditing: boolean,
  selectedIndex: number,
}
export default class BlogView extends Component {
  props: Props;
  state: State;
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      articles: [],
      isLoading: true,
      selectedIndex: -1,
      isEditing: false,
    };

    this._selectArticle = this._selectArticle.bind(this);
    this._editArticle = this._editArticle.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
  }

  componentWillMount() {
    fetch(this.props.endpoint).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        articles: data.articles,
        isLoading: false,
      });
    });
  }
  render() {
    let {articles, isLoading} = this.state;
    if (isLoading) {
      return <View className="is-loading">Loading... </View>;
    }
    return (
      <View className="blog">
        <ArticleListView
          articles={articles}
          selectedIndex={this.state.selectedIndex}
          onArticleSelect={this._selectArticle}
        />
        {this._renderDetailView()}
      </View>
    );
  }

  _selectArticle(index) {
    if (this.state.isEditing) {
      return;
    } else if (index === this.state.selectedIndex) {
      this.setState({
        selectedIndex: -1,
      });
    } else {
      this.setState({
        selectedIndex: index,
      });
    }
  }
  _editArticle() {
    this.setState({
      isEditing: true,
    });
  }
  _addArticle() {
    this.setState({
      isAdding: true,
    });
  }
  _cancelEdit() {
    this.setState({
      isEditing: false,
    });
  }
  _saveArticle(newArticle) {
    let {selectedIndex} = this.state;
    let articles = this.state.articles.map((article, index) => {
      return (index === selectedIndex) ? newArticle : article;
    });

    this.setState({articles});
    this.setState({
      isEditing: false,
    });
  }
  _renderDetailView() {
    let {articles} = this.state;
    let selectedArticle = articles[this.state.selectedIndex];
    if (!this.state.isEditing) {
      return (<ArticleDetailView
          article={selectedArticle}
          onEditClick={this._editArticle}
        />);
    } else {
      return (
        <ArticleEditView
          article={selectedArticle}
          onSave={this._saveArticle}
          onCancel={this._cancelEdit}
        />
      );
    }
  }
}
