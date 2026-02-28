import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BarSlider } from '../BarSlider';

describe('Bar slider component.', () => {
  it('Should render the correct percentage given a current value and a full value', () => {
    render(
      <BarSlider
        fullValue={100}
        currentValue={45}
        onChange={() => {}}
      />
    );

    const sliderElement = screen.getByRole('slider');

    expect(sliderElement)
      .toHaveValue('45');
  });
});
