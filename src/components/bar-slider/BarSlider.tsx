import type { MouseEvent } from 'react';
import { useState } from 'react';

import styles from './BarSlider.module.css';

import { Button } from 'components/button';
import { ProgressBar } from 'components/progress-bar';

interface Props {
  fullValue: number;
  currentValue: number;
  onValueUpdate: (value: number) => void;
}

export const BarSlider = ({ fullValue, currentValue, onValueUpdate }: Props) => {
  const [ mouseDown, setMouseDown ] = useState(false);

  const updateValue = (event: MouseEvent) => {
    const bar = event.target as HTMLDivElement;

    const { left: barMin, right: barMax } = bar.getBoundingClientRect();

    const barSize = barMax - barMin;
    const distanceFromMin = event.clientX - barMin;

    const percentToSet = distanceFromMin / barSize;

    onValueUpdate(fullValue * percentToSet);
  };

  const progressPercent = (currentValue / fullValue) * 100;

  return (
    <Button
      customStyles={styles.barArea}
      onMouseDown={event => {
        updateValue(event);

        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
      onMouseLeave={() => {
        setMouseDown(false);
      }}
      onMouseMove={event => {
        if (mouseDown) {
          updateValue(event);
        }
      }}
    >
      <div
        className={styles.barSlider}
        style={{
          marginLeft: `${progressPercent}%`,
        }}
      />

      <ProgressBar
        progressPercent={progressPercent}
      />
    </Button>
  );
};
