// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import HiddenCss from './HiddenCss';

const Foo = () => <div>bar</div>;

describe('<HiddenCss />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'div' });
    classes = getClasses(
      <HiddenCss>
        <div />
      </HiddenCss>,
    );
  });

  describe('the generated class names', () => {
    it('should be ok with only', () => {
      const wrapper = shallow(
        <HiddenCss only="sm">
          <div className="foo" />
        </HiddenCss>,
      );

      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.onlySm), true);

      const div = wrapper.childAt(0);
      assert.strictEqual(div.type(), 'div');
      assert.strictEqual(div.props().className, 'foo');
    });

    it('should be ok with only as an array', () => {
      const wrapper = shallow(
        <HiddenCss only={['xs', 'sm']}>
          <div className="foo" />
        </HiddenCss>,
      );

      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.props().className[0], classes.onlyXs);
      assert.strictEqual(wrapper.props().className[1], classes.onlySm);
    });

    it('should be ok with only as an empty array', () => {
      const wrapper = shallow(
        <HiddenCss only={[]}>
          <div className="foo" />
        </HiddenCss>,
      );

      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(Array.isArray(wrapper.props().className), true);
      assert.strictEqual(wrapper.props().className.length, 0);
    });

    it('should be ok with mdDown', () => {
      const wrapper = shallow(
        <HiddenCss mdDown>
          <div className="foo" />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.hasClass(classes.mdDown), true);
    });

    it('should be ok with mdUp', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <div className="foo" />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
    });
  });

  describe('prop: children', () => {
    it('should work when text Node', () => {
      const wrapper = shallow(<HiddenCss mdUp>foo</HiddenCss>);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).text(), 'foo');
    });

    it('should work when Element', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <Foo />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).is(Foo), true);
    });

    it('should work when mixed ChildrenArray', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <Foo />
          <Foo />
          foo
        </HiddenCss>,
      );

      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).is(Foo), true);
      assert.strictEqual(wrapper.childAt(1).is(Foo), true);
      assert.strictEqual(wrapper.childAt(2).text(), 'foo');
    });
  });
});
