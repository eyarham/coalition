import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Router from '../../_common/Router';

describe('<Router />', () =>{
  it('has 7 routes', () => {
    const wrapper = shallow(<Router />);

    const routes = wrapper.find('Route');
    expect(routes.length).to.equal(10);
    expect(routes.at(0).prop('path')).to.equal('/');
    expect(routes.at(1).prop('path')).to.equal('/');
    expect(routes.at(2).prop('path')).to.equal('/invite');
    expect(routes.at(3).prop('path')).to.equal('/account');
    expect(routes.at(4).prop('path')).to.equal('/coalition/:coalitionId');    
    expect(routes.at(5).prop('path')).to.equal('/browse');
    expect(routes.at(6).prop('path')).to.equal('/admin');
    expect(routes.at(7).prop('path')).to.equal('/rules');
    expect(routes.at(8).prop('path')).to.equal('/dashboard');
    expect(routes.at(9).prop('path')).to.equal('/logout');
  });
});
