import { DEFAULT_URL } from '@/constants';
import type { Metadata } from 'next';

type MetaTagsProps = {
  title: string;
  description: string;
  frame?: Record<string, string> | Record<string, never>;
  images: string | string[];
  url?: string;
  pathname: string;
};

export const generateMetadata = ({
  title = 'Open Source Summer',
  description = 'Contribute to open source, get rewarded!',
  frame = {},
  images,
  url = 'https://ossummer.xyz',
  pathname,
}: MetaTagsProps): Metadata => {
  const i = Array.isArray(images) ? images : [images];
  return {
    metadataBase: new URL(DEFAULT_URL),
    title,
    description,
    openGraph: {
      url: `${url}${pathname ?? ''}`,
      title,
      description,
      images: i.map((img) => `${url}/social/${img}`),
    },
    other: {
      ...frame,
    },
  };
};
