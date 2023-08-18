import fetch from 'node-fetch';
import { RateLimiter } from 'limiter';
import LoggerFactory from './logger';

/** @type {*} */
const logger = LoggerFactory({
  level: 'info',
});

/** @type {*} */
export const PBA_DOMAIN: string = 'https://www.pba.com';

/** @type {*} */
const TOURNAMENT_ENDPOINT: string = `${PBA_DOMAIN}/tournament-schedule`;

/** @type {*} */
const limiter = new RateLimiter({ tokensPerInterval: 5, interval: 3000 });

/**
 *
 *
 * @export
 * @return {*}  {Promise<string>}
 */
export async function getTournaments(): Promise<string> {
  logger.info(`Fetching all tournaments from ${TOURNAMENT_ENDPOINT}`);
  const response = await fetch(TOURNAMENT_ENDPOINT);
  const html = await response.text();
  return html;
}

/**
 *
 *
 * @export
 * @param {string} tournamentPath
 * @return {*}  {Promise<string>}
 */
export async function getMoreInfoHTML(tournamentPath: string): Promise<string> {
  await limiter.removeTokens(1);
  const response = await fetch(`${PBA_DOMAIN}${tournamentPath}`);
  const html = await response.text();
  return html;
}
