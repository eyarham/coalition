import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import App from '../App';

describe('<App />', () =>{
  it('renders correctly', () => {
    const wrapper = shallow(<App />);

    assert.exists(wrapper.find('Router'));
  });
})
