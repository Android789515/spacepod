import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button component.', () => {
  it('Renders children passed to it.', () => {
    render(
      <Button
        fontSize='1rem'
        variant='default'
      >
        <span>
          Hello
        </span>
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button)
      .toContainHTML('<span>Hello</span>');
  });

  it('Runs the click handler passed to it', () => {
    const handleClick = vi.fn();

    render(
      <Button
        fontSize='1rem'
        variant='default'
        onClick={handleClick}
      >
        Click me
      </Button>
    );

    const button = screen.getByRole('button');

    button.click();

    expect(handleClick)
      .toHaveBeenCalled();
  });

  it('Is can be disabled.', () => {
    const handleClick = vi.fn();

    render(
      <Button
        fontSize='1rem'
        variant='default'
        disabled
      >
        No Click
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button)
      .toBeDisabled();

    button.click();

    expect(handleClick)
      .toBeCalledTimes(0);
  });

  it('Downloads a file when clicked.', () => {
    const downloadURL = 'https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/Git-2.52.0-64-bit.exe';

    render(
      <Button
        fontSize='1rem'
        variant='default'
        download={{
          name: 'Git Installer for Windows',
          url: downloadURL,
        }}
      >
        File
      </Button>
    );

    const button = screen.getByRole('link');

    expect(button)
      .toHaveAttribute('href', downloadURL);
  });
});
