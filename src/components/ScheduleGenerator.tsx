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
        console.log("generateSchedule called");

        if (players.length % 4 !== 0) {
            throw new Error('Number of players must be a multiple of 4 for balanced doubles.');
        }
        if (numRounds < 1) {
            throw new Error('Number of rounds must be at least 1.');
        }

        let schedule: Round[] = [];
        let usedPairs = new Set<string>();

        for (let round = 1; round <= numRounds; round++) {
            let availablePlayers = this.shuffleArray(players);
            let matches: Match[] = [];

            while (availablePlayers.length >= 4) {
                let [p1, p2, p3, p4] = availablePlayers.splice(0, 4);
                let matchKey = `${p1.id}-${p2.id} vs ${p3.id}-${p4.id}`;
                if (usedPairs.has(matchKey)) continue;

                let team1 = [p1, p2];
                let team2 = [p3, p4];
                matches.push({ team1, team2, score: null });
                usedPairs.add(matchKey);
            }

            schedule.push({ round, matches });
        }

        return schedule;
    }
}
