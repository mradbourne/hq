import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage, sectionLoaded } from '../index';
import { Section } from 'web/components/Section';

describe('<HomePage />', () => {
  it('should not render any sections', () => {
    const renderedComponent = shallow(
      <HomePage {...{ categories: [] }} />
    );
    expect(renderedComponent.find(Section).length).toEqual(0);
  });

  it('should render two sections', () => {
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}] }} />
    );
    expect(renderedComponent.find(Section).length).toEqual(2);
  });

  it('should call slideout.toggle()', () => {
    const slideoutMenu = {
      toggle: expect.createSpy()
    };
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}], slideoutMenu }} />
    );
    renderedComponent.find('button').simulate('click');
    expect(slideoutMenu.toggle).toHaveBeenCalled();
  });

  it('setClosestSection should have been called', () => {
    const onSetClosestSection = expect.createSpy();
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}], onSetClosestSection }} />
    );
    renderedComponent.find('.panel').simulate('scroll', { target: { scrollTop: 1000 } });
    expect(onSetClosestSection).toHaveBeenCalled();
  });

  it('initializeSlideoutMenu should have been called', () => {
    const onInitializeSlideoutMenu = expect.createSpy();
    mount(
      <HomePage {...{ categories: [{ sections: [] }, { sections: [] }], currentUser: {}, onInitializeSlideoutMenu }} />
    );
    expect(onInitializeSlideoutMenu).toHaveBeenCalled();
  });

  it('sections length should be `1`', () => {
    const section = {
      id: 1
    };
    const sectionLoadedFn = sectionLoaded(section);
    expect(sectionLoadedFn.length).toEqual(1);
  });
});
