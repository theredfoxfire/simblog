import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import {View, Button} from '../ui';

const {describe, it} = global;
const selectedArticle = {
  title: 'React: Just the UI',
  author: 'React Coder',
  content: 'Lots of people use React as the V in MVC. Since React',
};

import ArticleDetailView from '../blog/ArticleDetailView';

describe('<ArticleDetailViewTest', () => {
  it('should reder view components correctly', () => {
    const wrapper = shallow(<ArticleDetailView
      article={selectedArticle}
      onEditClick={() => {}}
    />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(View).length).toBe(5);
  });
});
