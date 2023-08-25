export type CardType = 'player' | 'badge' | 'lineup';

export interface Club {
  name: string;
}

export interface Card<Type extends CardType> {
  id: number;
  type: Type;
  club: Club;
}

export interface Nationality {
  country: string;
}

export type PlayerPosition =
  | 'goalkeeper'
  | 'defender'
  | 'midfielder'
  | 'forward';

interface Player<Position extends PlayerPosition> extends Card<'player'> {
  name: string;
  position: Position;
  nationality: Nationality;
  axl: number;
  attributes: {
    defense: number;
    control: number;
    attack: number;
  };
}

export interface GoalkeeperPlayer extends Player<'goalkeeper'> {
  penalties: number[];
}

export interface OutfieldPlayer
  extends Player<'defender' | 'midfielder' | 'forward'> {
  penalties: number;
}

export interface BadgeCard extends Card<'badge'> {}
