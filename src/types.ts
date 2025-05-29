export type Player = {
    id: string;
    name: string;
};

export type Match = {
    team1: Player[];
    team2: Player[];
    score: null | {
        team1: number;
        team2: number;
    };
};

export type Round = {
    round: number;
    matches: Match[];
};

export type Standings = {
    [playerId: string]: {
        name: string;
        wins: number;
        losses: number;
        pointsScored: number;
        pointsAllowed: number;
        pointDifferential: number;
    };
};
