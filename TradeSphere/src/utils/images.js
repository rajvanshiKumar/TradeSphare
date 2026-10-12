// Image helpers.
//
// Photos are free-licence Unsplash photos, loaded from Unsplash's CDN by photo ID.
// Every image also has a local SVG illustration in public/images that is used
// automatically if the photo cannot be loaded (see components/common/Image.jsx).

const UNSPLASH_CDN = 'https://images.unsplash.com/';

export const FALLBACK_IMAGE = '/images/fallback.svg';

export function photoUrl(photoId, width = 800, height = 800, crop = '') {
  return `${UNSPLASH_CDN}${photoId}?fm=jpg&fit=crop&w=${width}&h=${height}&q=75${crop ? `&crop=${crop}` : ''}`;
}

export const illustrationUrl = (name) => (name ? `/images/${name}.svg` : FALLBACK_IMAGE);

/** { src, fallback } for a record that has an optional `photo` ID and an `illustration` name. */
export function resolveImage({ photo, illustration }, width = 800, height = 800, crop = '') {
  const fallback = illustrationUrl(illustration);
  return { src: photo ? photoUrl(photo, width, height, crop) : fallback, fallback };
}
