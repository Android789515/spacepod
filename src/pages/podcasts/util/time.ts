export interface TimeStamp {
  readonly milliseconds: number;
  readonly seconds: number;
  readonly minutes: number;
  readonly hours: number;
}

export const toDoubleDigit = (number: number) => {
  const isSingleDigit = `${number}`.length < 2;

  if (isSingleDigit) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
};

export const toTimeStamp = (timeInSeconds: number) => {
  const [ seconds, milliseconds ] = `${timeInSeconds}`.split('.')
      .map(number => Number(number));

  const minutes = seconds / 60;
  const remainingSeconds = seconds % 60;

  const hours = minutes / 60;
  const remainingMinutes = minutes % 60;

  return {
    milliseconds: milliseconds || 0,
    seconds: remainingSeconds,
    minutes: remainingMinutes,
    hours,
  } as TimeStamp;
};

export const timeStampToSeconds = (timeStamp: TimeStamp) => {
  return Math.floor(timeStamp.hours) * 3600
    + Math.floor(timeStamp.minutes) * 60
    + Math.floor(timeStamp.seconds)
    + Number(`0.${timeStamp.milliseconds}`);
};
