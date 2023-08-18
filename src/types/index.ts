export type Date = {
  start: string | undefined;
  end: string | undefined;
};

export type HostCenter = {
  name: string | undefined;
  address: string | undefined;
};

export type MoreInfo = {
  link?: string | undefined | null;
  hostCenter?: HostCenter | undefined | null;
  schedule?: string | undefined | null;
  tournamentNotes?: string | undefined | null;
  oilPattern?: string | undefined | null;
  prizeFund?: string | undefined | null;
};

export type Tournament = {
  date: Date;
  moreInfo?: MoreInfo;
  region: string | undefined;
  title: string | undefined;
  location: string | undefined;
};
