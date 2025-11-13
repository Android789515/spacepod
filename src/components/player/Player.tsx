import toast from 'react-hot-toast';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useState, useRef, useEffect } from 'react';

import type { EpisodeInfo } from 'pages/episodes';
import type { TimeStamp } from 'pages/podcasts/util';
import { toTimeStamp, timeStampToSeconds } from 'pages/podcasts/util';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface Props {
  readonly episodePlaying: EpisodeInfo;
  readonly render: (props: {
    episodeInfo: EpisodeInfo;
    playerInfo: PlayerInfo;
    setPlayerInfo: Dispatch<SetStateAction<PlayerInfo>>;
  }) => ReactNode;
}

interface PlayerInfo {
  readonly currentTime: TimeStamp;
  readonly duration: TimeStamp;
  readonly playback: 'paused' | 'playing';
}

export const Player = ({ episodePlaying, render }: Props) => {
  const [ playerInfo, setPlayerInfo ] = useLocalStorage<PlayerInfo>({
    key: 'spacepod-player-info',
    defaultValue: {
      currentTime: toTimeStamp(0),
      duration: toTimeStamp(0),
      playback: 'paused',
    },
  });

  const [ loadingToastID, setLoadingToastID ] = useState('');

  useEffect(() => {
    setPlayerInfo(info => {
      return {
        ...info,
        currentTime: toTimeStamp(0),
        playback: 'paused',
      };
    });

    const loadingToast = toast.loading('Queueing Podcast...');

    setLoadingToastID(loadingToast);

    return () => {
      toast.dismiss(loadingToast);

      setLoadingToastID('');
    };
  }, [ episodePlaying.id, setPlayerInfo ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (playerInfo.playback === 'paused') {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [ playerInfo.playback ]);

  useEffect(() => {
    const currentTimeInSeconds = timeStampToSeconds(playerInfo.currentTime);

    if (audioRef.current && (
      currentTimeInSeconds > audioRef.current.currentTime + 1
      || currentTimeInSeconds < audioRef.current.currentTime - 1
    )) {
      audioRef.current.currentTime = currentTimeInSeconds;
    }
  }, [ playerInfo.currentTime ]);

  return (
    <>
      {render({
        episodeInfo: episodePlaying,
        playerInfo,
        setPlayerInfo,
      })}

      <audio
        src={episodePlaying.url}
        ref={audioRef}
        onLoadedMetadata={event => {
          toast.dismiss(loadingToastID);
          setLoadingToastID('');

          toast.success('Podcast Ready To Play');

          const audioElement = event.target as HTMLAudioElement;

          setPlayerInfo(player => {
            return {
              ...player,
              duration: toTimeStamp(audioElement.duration),
            };
          });

          audioElement.currentTime = timeStampToSeconds(playerInfo.currentTime);
        }}
        onTimeUpdate={event => {
          const audioElement = event.target as HTMLAudioElement;

          setPlayerInfo(player => {
            return {
              ...player,
              currentTime: toTimeStamp(audioElement.currentTime),
            };
          });
        }}
      />
    </>
  );
};

