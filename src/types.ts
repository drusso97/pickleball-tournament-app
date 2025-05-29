export type Player = {
    id: string;
    name: string;
};

export type Match = {
    team1: Player[];
    team2: Player[];
    score: null | string;
};

export type Round = {
    round: number;
    matches: Match[];
};

export type Standings = {
    [playerId: string]: {
        pointDifferential: number;
        pointsAllowed: number;
        pointsScored: number;
        name: string;
        wins: number;
        losses: number;
    };
};
