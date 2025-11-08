import { v4 as newUUID } from 'uuid';

import type { PodcastInfo } from '../Podcasts';
import type { EpisodeInfo } from 'pages/episodes';

interface TagInfo {
  readonly name: string;
  readonly attribute?: string;
  readonly fallbackContent?: string;
}

const parseContentFromTags = (domItem: Element | Document, tags: TagInfo[]) => {
  return tags.map(tag => {
    const fallbackContent = tag.fallbackContent || '';

    const [ firstTag ] = domItem.getElementsByTagName(tag.name);

    if (firstTag) {
      if (tag.attribute) {
        return firstTag.getAttributeNode(tag.attribute)?.textContent
          || fallbackContent;
      } else {
        return firstTag.textContent
          || fallbackContent;
      }
    } else {
      return fallbackContent;
    }
  });
};

export const parsePodcastInfo = (xmlData: Document, podcastURL: string): PodcastInfo => {
  const [ podcastTitle, description ] = parseContentFromTags(xmlData, [
    {
      name: 'title',
      fallbackContent: 'Untitled',
    },
    { name: 'description' },
  ]);

  const items = xmlData.getElementsByTagName('item');

  const episodes: EpisodeInfo[] = [...items].map(item => {
    const [ title, audioSrc, coverArt, description, publishDate, authors ] = parseContentFromTags(item, [
      {
        name: 'title',
        fallbackContent: 'Untitled',
      },
      // Audio src
      {
        name: 'enclosure',
        attribute: 'url',
      },
      {
        name: 'itunes:image',
        attribute: 'href',
      },
      { name: 'description' },
      { name: 'pubDate' },
      // Authors
      { name: 'dc:creator' },
    ]);

    return {
      id: newUUID(),
      title,
      url: audioSrc,
      coverArt,
      description,
      publishDate,
      podcastTitle,
      authors: [authors],
    };
  });

  const [ coverArt ] = xmlData.getElementsByTagName('image');
  const [ coverArtHref ] = coverArt ? parseContentFromTags(coverArt, [
    { name: 'url' },
  ]) : '';

  return {
    id: newUUID(),
    url: podcastURL,
    title: podcastTitle,
    description,
    episodes,
    coverArt: coverArtHref,
    authors: [],
  };
};

