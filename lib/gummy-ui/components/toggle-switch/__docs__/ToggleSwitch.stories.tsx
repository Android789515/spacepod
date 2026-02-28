import preview from '../../../../.storybook/preview';

import { ToggleSwitch } from '../ToggleSwitch';

const meta = preview.meta({
  component: ToggleSwitch,
});

export const Off = meta.story({
  args: {
    fontSize: '.9rem',
    text: 'toggle me',
    toggled: false,
    width: '8em',
    knobColors: {
      off: 'light-dark(#b8b8b9ff, #747374)',
      on: '#e30fb2',
    },
    background: 'light-dark(#ebeaf3, #4d4c4d)',
    borderRadius: '.25em',
  },
});
