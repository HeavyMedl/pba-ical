import { EventAttributes, createEvents } from 'ics';
import { Tournament } from './types';
import { getFile, writeICS } from './util';
import LoggerFactory from './logger';

const logger = LoggerFactory({ level: 'info' });

(async () => {
  logger.info('Generating iCalendar (pba-tournaments.ics)');
  const tournaments: Tournament[] = JSON.parse(
    await getFile('data/pba-tournaments.json')
  );

  const events: EventAttributes[] = [];

  tournaments.forEach((tournament) => {
    const {
      date: { start = '', end = '' },
      title = '',
      region = '',
      location = '',
      moreInfo = {},
    } = tournament;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const event: EventAttributes = {
      start: [
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() + 1,
        startDate.getUTCDate(),
      ],
      end: [
        endDate.getUTCFullYear(),
        endDate.getUTCMonth() + 1,
        endDate.getUTCDate(),
      ],
      title,
    };
    if (moreInfo.link) {
      event.url = moreInfo.link;
    }
    if (moreInfo.hostCenter) {
      const { hostCenter } = moreInfo;
      event.location = `${hostCenter.name ? hostCenter.name + ' ' : ''}${
        hostCenter.address || location
      }`;
    } else {
      event.location = location;
    }
    let htmlContent = '';
    if (moreInfo.schedule) {
      htmlContent += moreInfo.schedule;
    }
    if (moreInfo.tournamentNotes) {
      htmlContent += moreInfo.tournamentNotes;
    }
    if (moreInfo.prizeFund) {
      htmlContent += moreInfo.prizeFund;
    }
    if (moreInfo.oilPattern) {
      //
    }
    event.busyStatus = 'FREE';
    event.categories = ['bowling', 'indoor sports'];
    // event.description = ''
    event.htmlContent = htmlContent;
    events.push(event);
  });

  const { error, value: icsString } = createEvents(events);

  if (error) {
    console.error(error);
    return;
  }
  writeICS(icsString);
})();