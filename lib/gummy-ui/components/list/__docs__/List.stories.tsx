import preview from '../../../../.storybook/preview';

import { List } from '../List';

interface Person {
  readonly id: string;
  readonly name: string;
  readonly occupation: string;
}

const meta = preview.meta({
  component: List<Person>,
});

const dummyData: Person[] = [
  {
    id: '1',
    name: 'Anderson',
    occupation: 'NPC',
  },
  {
    id: '2',
    name: 'Lilly',
    occupation: 'AI',
  },
  {
    id: '3',
    name: '0101la01m',
    occupation: 'Human',
  },
];

export const Horizontal = meta.story({
  args: {
    data: dummyData,
    orientation: 'horizontal',
    renderItem: person => {
      return (
        <span>
          {person.name} is {person.occupation}
        </span>
      );
    },
  },
});

export const Vertical = meta.story({
  args: {
    data: dummyData,
    orientation: 'vertical',
    renderItem: person => {
      return (
        <span>
          {person.name} is {person.occupation}
        </span>
      );
    },
  },
});
