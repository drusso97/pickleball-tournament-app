import { Round, Match, Player, Standings } from '@/types';

export function generatePlayoffs(
    standings: { [playerId: string]: any },
    players: Player[],
    currentRoundNumber: number
): Round[] {
    // Sort top 4 by wins, then PD, then PF
    const sorted = Object.values(standings)
        .sort((a, b) =>
            b.wins - a.wins ||
            b.pointDifferential - a.pointDifferential ||
            b.pointsScored - a.pointsScored
        );

    const top4 = sorted.slice(0, 4);
    if (top4.length < 4) throw new Error("Not enough players for playoffs");

    // Make 2 teams per match (1&4 vs 2&3)
    const [p1, p2, p3, p4] = top4;

    const semifinals: Round = {
        round: currentRoundNumber + 1,
        matches: [
            {
                team1: [p1, p4],
                team2: [p2, p3],
                score: null
            }
        ]
    };

    return [semifinals];
}