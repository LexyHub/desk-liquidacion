interface Props {
  title?: string;
  videoId: string;
}

export default function EmbeddedVideo({ title, videoId }: Props) {
  return (
    <iframe
      className="w-full h-full rounded-b-lg"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
}
