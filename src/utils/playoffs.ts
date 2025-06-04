import { Player, Match, Round, Standings } from '@/types';

export function generatePlayoffs(
    standings: Standings,
    allPlayers: Player[],
    startingRound: number
): Round[] {
    const sortedPlayers = Object.entries(standings)
        .sort(([, a], [, b]) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            if ((b.pointDifferential ?? 0) !== (a.pointDifferential ?? 0)) {
                return (b.pointDifferential ?? 0) - (a.pointDifferential ?? 0);
            }
            return (b.pointsScored ?? 0) - (a.pointsScored ?? 0);
        })
        .map(([id, p]) => ({ id, name: p.name }));

    // ✅ Calculate playoff participant count:
    const halfPlayerCount = Math.floor(sortedPlayers.length / 2);
    const roundedToFour = Math.floor(halfPlayerCount / 4) * 4;
    const playoffCount = Math.min(roundedToFour, 8);

    if (playoffCount < 4) return [];

    const topPlayers = sortedPlayers.slice(0, playoffCount);
    return createEliminationRounds(topPlayers, startingRound);
}

function createEliminationRounds(players: Player[], startingRound: number): Round[] {
    const rounds: Round[] = [];
    let currentPlayers = players;
    let roundNumber = startingRound;

    while (currentPlayers.length >= 4) {
        const matches: Match[] = [];

        for (let i = 0; i < currentPlayers.length; i += 4) {
            const group = currentPlayers.slice(i, i + 4);
            if (group.length === 4) {
                matches.push({
                    team1: [group[0], group[1]],
                    team2: [group[2], group[3]],
                    score: null
                });
            }
        }

        rounds.push({ round: roundNumber++, matches });

        // Use placeholder winners for now
        currentPlayers = matches.map((_, i) => ({
            id: `winner-r${roundNumber - 1}-m${i}`,
            name: `Winner of R${roundNumber - 1}M${i}`
        }));
    }

    return rounds;
}
