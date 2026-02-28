import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { List } from '../List';

describe('List component.', () => {
  it('Renders each item inside the node passed to renderItem.', () => {
    const items = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
    ];

    render(
      <List
        data={items}
        orientation='vertical'
        renderItem={item => {
          return (
            <p>{item.id}</p>
          );
        }}
      />
    );

    const itemParagraphs = screen.getAllByRole('paragraph');

    expect(itemParagraphs)
      .toHaveLength(3);

    itemParagraphs.forEach((paragraph, index) => {
      expect(paragraph)
        .toHaveTextContent(String(index + 1));
    });
  });
});
