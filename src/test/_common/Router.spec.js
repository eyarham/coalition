import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Router from '../../_common/Router';

describe('<Router />', () =>{
  it('has 5 routes', () => {
    const wrapper = shallow(<Router />);

    const routes = wrapper.find('Route');
    expect(routes.length).to.equal(5);
    expect(routes.at(0).prop('path')).to.equal('/');
    expect(routes.at(1).prop('path')).to.equal('/');
    expect(routes.at(2).prop('path')).to.equal('/invite');
    expect(routes.at(3).prop('path')).to.equal('/account');
    expect(routes.at(4).prop('path')).to.equal('/coalition/:coalitionId');
  });
});
