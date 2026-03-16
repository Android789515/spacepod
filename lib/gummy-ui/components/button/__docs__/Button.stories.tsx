import preview from '../../../../.storybook/preview';

import { Button } from '../Button';

const meta = preview.meta({
  component: Button,
});

export const Default = meta.story({
  args: {
    fontSize: '1rem',
    variant: 'default',
    borderRadius: '.25em',
    children: 'Default',
  },
});

export const Filled = meta.story({
  args: {
    fontSize: '1rem',
    variant: 'filled',
    color: '#e30fb2',
    borderRadius: '.25em',
    children: 'Filled',
  },
});

export const FilledFullWidth = meta.story({
  args: {
    fontSize: '1rem',
    variant: 'filled',
    color: '#e30fb2',
    fullWidth: true,
    borderRadius: '.25em',
    children: 'Filled + Full Width',
  },
  render: args => {
    return (
      <section
        style={{
          width: '25%',
          background: 'light-dark(#ebeaf3, #4d4c4d)',
          padding: '2em',
          borderRadius: '.25em',
        }}
      >
        <Button
          {...args}
        />
      </section>
    );
  },
});

export const Accent = meta.story({
  args: {
    fontSize: '1rem',
    variant: 'accent',
    color: '#e30fb2',
    borderRadius: '.25em',
    children: 'Accent',
  },
});

export const Danger = meta.story({
  args: {
    fontSize: '1rem',
    variant: 'danger',
    borderRadius: '.25em',
    children: 'Danger',
  },
});

export const AllVariants = meta.story({
  render: () => {
    return (
      <ul
        style={{
          display: 'grid',
          gridAutoColumns: 'max-content',
          gridAutoFlow: 'column',
          alignItems: 'baseline',
          columnGap: '3em',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        <li>
          <Button
            fontSize='1rem'
            variant='default'
            borderRadius='.25em'
          >
            Default
          </Button>
        </li>

        <li>
          <Button
            fontSize='1rem'
            variant='filled'
            color='#e30fb2'
            download={{
              name: 'git',
              url: 'https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/Git-2.52.0-64-bit.exe',
            }}
            borderRadius='.25em'
          >
            Download Filled (Downloads Git)
          </Button>
        </li>

        <li>
          <Button
            fontSize='1rem'
            variant='accent'
            color='#e30fb2'
            borderRadius='.25em'
          >
            Accent
          </Button>
        </li>

        <li>
          <Button
            fontSize='1rem'
            variant='danger'
            borderRadius='.25em'
          >
            Danger
          </Button>
        </li>

        <li>
          <Button
            fontSize='1rem'
            variant='danger'
            borderRadius='.25em'
            disabled
          >
            Danger (Disabled)
          </Button>
        </li>
      </ul>
    );
  },
  tags: [ '!dev', '!test' ],
});
