import { parsePodcastInfo } from './parsing.ts';

export const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const fetchPodcast = async (url: string) => {
  const slashIndicator = ':';

  const destination = url.split('https://')[1]
    .split('')
    .map(char => char === '/' ? slashIndicator : char)
    .join('');

  const hostname = import.meta.env.VITE_SERVER_ADDRESS;

  const route = `${hostname}/podcast-${destination}`;

  const response = await fetch(route, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml',
    },
  });

  if (!response.ok) {
    throw new Error(`The RSS feed could not be found or parsed for: ${url}.`);
  }

  const xml = await response.text();

  if (window.DOMParser) {
    const xmlData = new DOMParser()
      .parseFromString(xml, 'text/xml');

    const podcast = parsePodcastInfo(xmlData, url);

    return podcast;
  } else {
    throw new Error('No DOM Parser was found! Only browser environments are supported.');
  }
};

