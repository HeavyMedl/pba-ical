import { getTournaments } from './get';
import { getTournamentsAsObject } from './parse';
import { writeTournaments } from './util';

(async () => {
  const html = await getTournaments();
  await writeTournaments(await getTournamentsAsObject(html));
})();
