import createImageUrlBuilder from '@sanity/image-url';
import { client } from './client';

export const urlFor = (source) => createImageUrlBuilder(client).image(source);