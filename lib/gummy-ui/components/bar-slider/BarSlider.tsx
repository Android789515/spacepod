import { useEffect, useRef } from 'react';

import styles from './BarSlider.module.css';

interface Props {
  readonly fullValue: number;
  readonly currentValue: number;
  readonly onChange: (newValue: number) => void;
  readonly color?: string;
  readonly borderRadius?: string;
}

export const BarSlider = ({ fullValue, currentValue, onChange, color, borderRadius }: Props) => {
  const sliderRef = useRef<HTMLInputElement | null>(null);

  const borderRadiusWithFallback = borderRadius || 'var(--borderRadius)';

  useEffect(() => {
    if (color && sliderRef.current) {
      document.documentElement.style.setProperty('--rangeSliderThumbColor', color);
      document.documentElement.style.setProperty('--safariBorderRadius', borderRadiusWithFallback)
    }
  }, [ color ]);

  const currentValuePercent = (currentValue / fullValue) * 100;
  const trackBackground = 'light-dark(#cecbcb, #606060)';

  return (
    <input
      className={styles.barSlider}
      type='range'
      value={currentValue}
      min={0}
      max={fullValue}
      onChange={event => {
        const slider = event.target as HTMLInputElement;

        onChange(Number(
          slider.value
        ));
      }}
      style={{
        background: fullValue
          ? `linear-gradient(to right, ${color} ${currentValuePercent}%, ${trackBackground} ${currentValuePercent}%)`
          : trackBackground,
        borderRadius: borderRadiusWithFallback,
      }}
      ref={sliderRef}
    />
  );
};
