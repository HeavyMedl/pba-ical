import { transports, format, createLogger } from 'winston';

/**
 *
 *
 * @export
 * @param {*} { level = 'info', label = '' }
 * @return {*}
 */
export default function LoggerFactory({ level = 'info', label = '' }) {
  const trans = [new transports.Console({ level })];
  return createLogger({
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.label({ label: label || 'pba-ical' }),
      format.printf(
        (info) =>
          `[${info.label}] ${info.level} ${info.timestamp}: ${info.message}`
      )
    ),
    transports: trans,
  });
}
