import { Tournament } from './types';
import { writeFile, readFile, mkdir } from 'node:fs/promises';

/**
 *
 *
 * @export
 * @param {Array<Tournament>} touraments
 */
export async function writeTournaments(
  touraments: Array<Tournament>
): Promise<void> {
  await mkdir('data', { recursive: true });
  await writeFile(
    'data/pba-tournaments.json',
    JSON.stringify(touraments, null, 1),
    'utf8'
  );
}

export async function writeICS(icsString: string = ''): Promise<void> {
  await writeFile('pba-tournaments.ics', icsString);
}

/**
 *
 *
 * @export
 * @return {*}  {Promise<string>}
 */
export async function getFile(filePath: string): Promise<string> {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading from ${filePath}: ${error}`);
    return '';
  }
}
