import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ToggleSwitch } from '../ToggleSwitch';

describe('Toggle switch component.', () => {
  const defaultProps = {
    toggled: false,
    width: '4em',
    knobColors: {
      off: 'grey',
      on: 'red',
    },
  };

  it('Should render the text given to it.', () => {
    const text = 'test';

    render(
      <ToggleSwitch
        {...defaultProps}
        text={text}
      />
    );

    const toggleSwitchElement = screen.getByRole('button');

    expect(toggleSwitchElement)
      .toHaveTextContent(text);
  });

  it('Should render whether it\'s off correctly.', () => {
    render(
      <ToggleSwitch
        {...defaultProps}
      />
    );

    const knobElement = screen.getByRole('switch');

    expect(knobElement)
      .toHaveStyle({
        marginLeft: '',
      });
  });

  it('Should render whether it\'s on correctly.', () => {
    render(
      <ToggleSwitch
        {...defaultProps}
        toggled={true}
      />
    );

    const knobElement = screen.getByRole('switch');

    expect(knobElement).toHaveStyle({
      background: 'red',
    })

    const toggleSwitchTextElement = screen.getByRole('note');

    expect(knobElement).toAppearAfter(toggleSwitchTextElement);
  });
});
