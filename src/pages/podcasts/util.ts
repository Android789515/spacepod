import { v4 as newUUID } from 'uuid';

import type { PodcastInfo } from './Podcasts';
import type { EpisodeInfo } from 'pages/episodes';

const parseTags = (element: Element, tags: string[]) => {
  return tags.map(tag => {
    const [ onlyTag ] = element.getElementsByTagName(tag);

    return onlyTag
  });
};

export const parsePodcastInfo = (xmlData: Document): PodcastInfo => {
  const podcastTitle = xmlData.getElementsByTagName('title')[0]
    .textContent || 'Untitled';

  const podcastDescription = xmlData.getElementsByTagName('description')[0]
    .textContent || '';

  const podcastCoverArt = xmlData.getElementsByTagName('image')[0]
    .getElementsByTagName('url')[0].textContent!;

  const items = xmlData.getElementsByTagName('item');

  const episodes: EpisodeInfo[] = [...items].map(item => {
    const [
      title,
      audioLink,
      coverArt,
      description,
      publishDate,
      authors,
    ] = parseTags(item, [
      'title',
      // url
      'enclosure',
      'itunes:image',
      'description',
      'pubDate',
      // Authors
      'dc:creator',
    ]);
    const url = [...audioLink.attributes].find(attribute => attribute.name === 'url');
    const coverArtHref = [...coverArt.attributes].find(attribute => attribute.name === 'href');

    return {
      id: newUUID(),
      title: title.textContent || 'Untitled',
      url: url!.textContent,
      coverArt: coverArtHref?.textContent || '',
      description: description.textContent || '',
      publishDate: publishDate.textContent || 'No Date',
      podcastTitle: podcastTitle,
      authors: [authors?.textContent || '']
    };
  });

  return {
    id: newUUID(),
    title: podcastTitle,
    description: podcastDescription,
    episodes,
    coverArt: podcastCoverArt,
    authors: [],
  };
};


