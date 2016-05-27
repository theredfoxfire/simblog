import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import {View, TextInput, Button} from '../ui';

const {describe, it} = global;
const selectedArticle = {
  title: 'React: Just the UI',
  author: 'React Coder',
  content: 'Lots of people use React as the V in MVC. Since React',
};

import ArticleEditView from '../blog/ArticleEditView';

describe('<ArticleEditViewTest', () => {
  it('should reder view components correctly', () => {
    const wrapper = shallow(<ArticleEditView
      article={selectedArticle}
      onSave={() => {}}
      onCancel={() => {}}
    />);
    expect(wrapper.find(Button).length).toBe(3);
    expect(wrapper.find(View).length).toBe(5);
    expect(wrapper.find(TextInput).length).toBe(2);
  });
});
