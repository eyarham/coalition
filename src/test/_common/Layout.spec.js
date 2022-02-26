import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Layout from '../../_common/Layout';

describe('<Layout />', () =>{
  it('renders correctly', () => {
    const wrapper = shallow(<Layout />);

    const app = wrapper.find('.App');

    assert.exists(app.find('Outlet'));
  });
});
