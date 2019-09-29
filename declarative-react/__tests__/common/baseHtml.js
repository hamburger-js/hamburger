import React from 'react';
import { shallow } from 'enzyme';
import { HStack, VStack, Text, Button, Input } from '../../lib';

describe.each([HStack, VStack, Text, Button, Input])('test base html %p', function(Type) {
  it.each(['padding', 'margin'])('should box model correct', function(name) {
    [10, ['left'], ['top'], ['bottom'], ['right'], ['right', 'bottom'], ['horizontal'], ['vertical']].forEach(i => {
      let inputObj = {};
      if (Array.isArray(i)) {
        for (let key of i) {
          inputObj[key] = 10;
        }
      } else {
        inputObj = 10;
      }
      const wrapper = shallow(
        Type()
          [name](inputObj)
          .build(),
      );

      expect(wrapper.props().style).toMatchObject(
        i === 10
          ? {
              [name]: 10,
            }
          : {
              [`${name}Top`]: i.includes('top') || i.includes('vertical') ? 10 : undefined,
              [`${name}Right`]: i.includes('right') || i.includes('horizontal') ? 10 : undefined,
              [`${name}Bottom`]: i.includes('bottom') || i.includes('vertical') ? 10 : undefined,
              [`${name}Left`]: i.includes('left') || i.includes('horizontal') ? 10 : undefined,
            },
      );
    });
  });

  it('should size correct', function() {
    const wrapper = shallow(
      Type()
        .size({ width: 10, height: 20 })
        .build(),
    );
    expect(wrapper.props().style).toMatchObject({
      width: 10,
      height: 20,
    });
  });

  it('should border correct', function() {
    const wrapper = shallow(
      Type()
        .border({ borderRadius: 10, borderColor: 'red', borderWidth: 1 })
        .build(),
    );
    expect(wrapper.props().style).toMatchObject({
      borderRadius: 10,
      borderColor: 'red',
      border: 'solid',
      borderWidth: 1,
    });
  });

  it('should className correct', function() {
    const wrapper = shallow(
      Type()
        .class('class-1')
        .class('class-2')
        .build(),
    );
    expect(wrapper.props().className).toBe('class-1 class-2');
  });

  it('should id correct', function() {
    const wrapper = shallow(
      Type()
        .id('myId')
        .build(),
    );
    expect(wrapper.props().id).toBe('myId');
  });

  it('should use style object success', function() {
    const wrapper = shallow(
      Type()
        .style({ height: 10, color: 'red' })
        .build(),
    );
    expect(wrapper.props().style).toMatchObject({ height: 10, color: 'red' });
  });

  it('should set props success', function() {
    function callback(e) {}
    const wrapper = shallow(
      Type()
        .props({ onClick: callback })
        .build(),
    );

    expect(wrapper.props().onClick).toBe(callback);
  });
});
