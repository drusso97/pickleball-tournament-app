export class Player {
}

export type Match = {
    id: string;
    players: Player[];
};

export type Round = {
    matches: Match[];
};

export type Standings = {
    [playerId: string]: {
        name: string;
        wins: number;
        losses: number;
    };
};
