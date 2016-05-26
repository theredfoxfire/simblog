/* eslint-env browser */
/* @flow */
import React from 'react';
import {View} from '../ui';
import ArticleListView from './ArticleListView';
import ArticleDetailView from './ArticleDetailView';
import ArticleEditView from './ArticleEditView';
import AddArticleView from './AddArticleView';
import Article from './ArticleType';
import autobind from 'class-autobind';

const ActionType = {
  ADD_POST: 1,
  EDIT_POST: 2,
};
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
    autobind(this);
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
          onCreate={this._addArticle}
        />
        {this._renderDetailView()}
      </View>
    );
  }

  _selectArticle(index: number) {
    let {isEditing, isAdding} = this.state;
    if (isEditing || isAdding) {
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
      selectedIndex: -1,
      isAdding: true,
    });
  }
  _cancelEdit() {
    this.setState({
      isEditing: false,
    });
  }
  _cancelAdd() {
    this.setState({
      isAdding: false,
    });
  }
  _saveArticle(newArticle: Article, actionType: number) {
    let {selectedIndex} = this.state;
    let articles = [];
    if (actionType === ActionType.ADD_POST) {
      articles = this.state.articles;
      articles.push(newArticle);
      this.setState({
        isAdding: false,
      });
      this.setState({articles});
    } else {
      articles = this.state.articles.map((article, index) => {
        return (index === selectedIndex) ? newArticle : article;
      });
      this.setState({
        isEditing: false,
      });
      this.setState({articles});
    }

  }
  _renderDetailView(): Array<Component> {
    let {articles, isEditing, isAdding} = this.state;
    let selectedArticle = articles[this.state.selectedIndex];
    if (isEditing) {
      return (
        <ArticleEditView
          article={selectedArticle}
          onSave={this._saveArticle}
          onCancel={this._cancelEdit}
        />
      );
    } else if (isAdding) {
      return (
        <AddArticleView
          onSave={this._saveArticle}
          onCancel={this._cancelAdd}
        />
      );
    } else {
      return (<ArticleDetailView
          article={selectedArticle}
          onEditClick={this._editArticle}
      />);
    }
  }
}
