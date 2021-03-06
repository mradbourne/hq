import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import { NotFound } from '../index';

describe('<NotFound />', () => {
  it('should render the page', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    expect(renderedComponent.children.length).toEqual(1);
  });
});
