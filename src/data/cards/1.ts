import { GoalkeeperPlayer } from '../../types/Card';
import { ClubData } from '../club-data';

export const card1: GoalkeeperPlayer = {
  id: 1,
  name: '',
  type: 'player',
  position: 'goalkeeper',
  club: ClubData.SPURS,
  nationality: { country: '' },
  attributes: {
    defense: 0,
    control: 0,
    attack: 0,
  },
  axl: 0,
  penalties: [],
};
