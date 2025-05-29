import { Round, Standings } from "@/types";

export function calculateStandings(schedule: Round[]): Standings {
    const standings: Standings = {};

    for (const round of schedule) {
        for (const match of round.matches) {
            if (!match.score) continue;

            const { team1, team2, score } = match;
            const team1Score = score.team1;
            const team2Score = score.team2;

            // Determine winners/losers
            const team1Won = team1Score > team2Score;
            const team2Won = team2Score > team1Score;

            // Helper to update a single player
            const updatePlayer = (player: { id: any; name: any; }, won: boolean, scored: number, allowed: number) => {
                if (!standings[player.id]) {
                    standings[player.id] = {
                        name: player.name,
                        wins: 0,
                        losses: 0,
                        pointsScored: 0,
                        pointsAllowed: 0,
                        pointDifferential: 0,
                    };
                }
                standings[player.id].wins += won ? 1 : 0;
                standings[player.id].losses += !won ? 1 : 0;
                standings[player.id].pointsScored += scored;
                standings[player.id].pointsAllowed += allowed;
                standings[player.id].pointDifferential =
                    standings[player.id].pointsScored - standings[player.id].pointsAllowed;
            };

            for (const player of team1) {
                updatePlayer(player, team1Won, team1Score, team2Score);
            }

            for (const player of team2) {
                updatePlayer(player, team2Won, team2Score, team1Score);
            }
        }
    }

    return standings;
}
