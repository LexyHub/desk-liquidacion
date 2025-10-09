import type { FC } from 'react';
import React from 'react';
interface Props {
  title?: string;
  videoId: string;
}

const EmbeddedVideoInner: FC<Props> = ({ title, videoId }) => {
  return (
    <iframe
      className="w-full h-full rounded-b-lg"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title ?? "Vídeo embedido"}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export const EmbeddedVideo = React.memo(EmbeddedVideoInner);
