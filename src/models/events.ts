export interface Event {
  id: number;
  name: string;
}

export let EVENTS: Event[] = [
  {
    id: 0,
    name: 'INFORMATIONAL',
  },
  {
    id: 1,
    name: 'WILLIAMSGBM',
  },
  {
    id: 2,
    name: 'BOBASOCIAL',
  },
  {
    id: 3,
    name: 'CDMSMITH',
  },
  {
    id: 4,
    name: 'SQUADREVEALSOCIAL',
  },
  {
    id: 5,
    name: 'RESUMEROAST',
  },
  {
    id: 6,
    name: 'GEVERNOVA',
  },
  {
    id: 7,
    name: 'KIMCHISCAVENGERHUNT',
  },
  {
    id: 8,
    name: 'KDASOCIAL',
  },
  {
    id: 8,
    name: 'SWRIGBM',
  },
  {
    id: 8,
    name: 'SQUIDSQUADGAMES',
  },
];

export const eventMapping: Record<string, string> = {
  '00': 'B&M GBM',
  '01': 'Earth Che Night',
  '02': 'Viet Field Day',
  '03': 'Water Pokémon Go Event',
  '04': 'Fire Gingerbread House Competition',
};
