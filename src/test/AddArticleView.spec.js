import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import {View, TextInput, Button} from '../ui';

const {describe, it} = global;

import AddArticleView from '../blog/AddArticleView';

describe('<AddArticleViewTest', () => {
  it('should reder view components correctly', () => {
    const wrapper = shallow(<AddArticleView
      onSave={() => {}}
      onCancel={() => {}}
    />);
    expect(wrapper.find(Button).length).toBe(2);
    expect(wrapper.find(View).length).toBe(8);
    expect(wrapper.find(TextInput).length).toBe(3);
  });
});
