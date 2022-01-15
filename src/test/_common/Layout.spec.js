import React from 'react';
import { assert, expect } from 'chai';
import { shallow } from 'enzyme';
import Layout from '../../_common/Layout';

describe('<Layout />', () =>{
  it('renders correctly', () => {
    const wrapper = shallow(<Layout />);

    const app = wrapper.find('.App');
    const header = app.find('.App-header');

    expect(header.find('span').find('a').prop('href'))
      .to.equal('https://github.com/eyarham/coalition');
    expect(header.find('span').find('a').text())
      .to.equal('code');
    assert.exists(app.find('Outlet'));
  });
});
