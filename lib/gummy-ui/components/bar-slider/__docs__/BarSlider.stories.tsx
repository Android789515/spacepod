import preview from '../../../../.storybook/preview';

import { BarSlider } from '../BarSlider';

const meta = preview.meta({
  component: BarSlider,
});

export const PartiallyFull = meta.story({
  args: {
    fullValue: 100,
    currentValue: 45,
    onChange: () => {},
    color: '#e30fb2',
    borderRadius: '.45em',
  },
});
