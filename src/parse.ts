/* eslint-disable @typescript-eslint/ban-ts-comment */
import { load } from 'cheerio';
import { getMoreInfoHTML, PBA_DOMAIN } from './get';
import { Date, MoreInfo, Tournament } from './types';
import LoggerFactory from './logger';

/** @type {*} */
const logger = LoggerFactory({
  level: 'info',
});

/** @type {*} */
const TABLE_ROW_SELECTOR: string = '#pba-grid table > tbody > tr';

/**
 *
 *
 * @param {string} str
 * @param {string} [delimiter=' ']
 * @return {*}  {(string | undefined)}
 */
function cleanStr(str: string, delimiter: string = ' '): string | undefined {
  return (
    str
      .split(/\s/)
      .filter((x) => x)
      .join(delimiter) || undefined
  );
}

/**
 *
 *
 * @param {string} htmlStr
 * @return {*}  {(string | null)}
 */
function cleanHTML(htmlStr: string | null): string | undefined {
  return htmlStr?.replace(/\n/g, '').trim() ?? undefined;
}

/**
 *
 *
 * @export
 * @param {string} htmlStr
 * @return {*}  {(string | null)}
 */
export function getTournamentTableRows(htmlStr: string): string | null {
  const $ = load(htmlStr);
  return $(TABLE_ROW_SELECTOR).html();
}

/**
 *
 *
 * @param {MoreInfo} moreInfo
 * @param {string} moreInfoHTML
 * @return {*}  {MoreInfo}
 */
function populateMoreInfo(moreInfo: MoreInfo, moreInfoHTML: string): MoreInfo {
  const $$ = load(moreInfoHTML);
  moreInfo.link = `${PBA_DOMAIN}${moreInfo.link}`;
  moreInfo.hostCenter = {
    name: cleanStr($$('.venue').find('.field--name-title').text()),
    address: cleanStr($$('.venue').find('.field--name-field-address').text()),
  };
  moreInfo.schedule = cleanHTML($$('#collapse-schedule').html());
  moreInfo.tournamentNotes = cleanHTML($$('#collapse-tournament-notes').html());
  moreInfo.oilPattern =
    $$('.node--type-oil-pattern')
      .find('span.field--name-title')
      .map((_i, elem) => $$(elem).text())
      .toArray()
      .join(', ') || undefined;
  moreInfo.prizeFund = cleanHTML($$('#collapse-prize-fund').html());
  return moreInfo;
}

/**
 *
 *
 * @export
 * @param {string} htmlStr
 * @return {*}  {Promise<Array<object>>}
 */
export async function getTournamentsAsObject(
  htmlStr: string
): Promise<Array<Tournament>> {
  const tournaments: Array<Tournament> = [];
  const $ = load(htmlStr);
  for (const elem of $(TABLE_ROW_SELECTOR)) {
    const date: Date = {
      start: $(elem)
        .find('td.views-field-field-date-range time')
        .first()
        .attr('datetime'),
      end: $(elem)
        .find('td.views-field-field-date-range time')
        .last()
        .attr('datetime'),
    };
    let moreInfo: MoreInfo = {
      link: $(elem).find('td.views-field-field-show-more-info a').attr('href'),
    };
    const tournament: Tournament = {
      date,
      region: cleanStr($(elem).find('td.views-field-field-region').text()),
      title: cleanStr($(elem).find('td.views-field-title').text()),
      location: cleanStr($(elem).find('td.views-field-field-venue').text()),
    };
    logger.info(`Tournament: ${tournament.title}`);
    if (moreInfo.link) {
      logger.info(
        `There is more information for ${tournament.title}. Making request..`
      );
      // If we have a link to "more info", grab it and add the data
      // to the tournament object
      const moreInfoHTML = await getMoreInfoHTML(moreInfo.link);
      moreInfo = populateMoreInfo(moreInfo, moreInfoHTML);
      tournament.moreInfo = moreInfo;
    }
    tournaments.push(tournament);
  }
  return tournaments;
}
