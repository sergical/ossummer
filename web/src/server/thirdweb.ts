import { Engine } from '@thirdweb-dev/engine';

export const engine = new Engine({
  url: process.env.NEXT_PRIVATE_THIRDWEB_ENGINE_URL as string,
  accessToken: process.env.NEXT_PRIVATE_THIRDWEB_ENGINE_ACCESS_TOKEN as string,
});
