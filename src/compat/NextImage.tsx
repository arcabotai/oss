import type { CSSProperties, ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: string | { src: string }; priority?: boolean };

export default function NextImage({ src, priority, loading, style, ...props }: Props) {
  const imageStyle: CSSProperties = { color: 'transparent', ...style };
  return <img src={typeof src === 'string' ? src : src.src} loading={priority ? 'eager' : loading} style={imageStyle} {...props} />;
}
