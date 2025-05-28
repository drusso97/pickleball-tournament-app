// ScheduleGenerator.ts

import { Player, Match, Round } from '@/types';

export default class ScheduleGenerator {
    static shuffleArray<T>(array: T[]): T[] {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    static generateSchedule(players: Player[], numRounds: number): Round[] {
        if (players.length % 4 !== 0) {
            throw new Error('Number of players must be a multiple of 4 for balanced doubles.');
        }
        if (numRounds < 1) {
            throw new Error('Number of rounds must be at least 1.');
        }

        const schedule: Round[] = [];

        for (let round = 1; round <= numRounds; round++) {
            // Shuffle players each round
            let availablePlayers = this.shuffleArray(players);
            const matches: Match[] = [];

            // While we have at least 4 players left, make matches
            while (availablePlayers.length >= 4) {
                // Remove 4 players to form two teams
                const teamPlayers = availablePlayers.splice(0, 4);
                const team1 = teamPlayers.slice(0, 2);
                const team2 = teamPlayers.slice(2, 4);

                matches.push({
                    team1,
                    team2,
                    score: null,
                });
            }

            schedule.push({ round, matches });
        }

        return schedule;
    }
}
