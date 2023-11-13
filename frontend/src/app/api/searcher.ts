export interface Searcher {
  id: number;
  name: string;
  short: string;
}
export const Searchers = [
  {
    id: 1,
    name: 'ripgrep',
    short: 'rg',
  },
  {
    id: 2,
    name: 'ugrep',
    short: 'ug',
  },
  {
    id: 3,
    name: 'The Silver Searcher',
    short: 'ag',
  },
];
