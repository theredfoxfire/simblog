import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import {View, TextInput, Button} from '../ui';

const {describe, it} = global;

import ArticleListView from '../blog/ArticleListView';

describe('<ArticleListViewTest: ', () => {
  it('should reder view components correctly', () => {
    const wrapper = shallow(<ArticleListView
      articles={[]}
      selectedIndex={-1}
      onArticleSelect={() => {}}
      onCreate={() => {}}
    />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(View).length).toBe(3);
    expect(wrapper.find(TextInput).length).toBe(1);
  });
});
