"use client";

import { useEffect, useState } from 'react';
import PlayerForm from '@/components/PlayerForm';
import PlayerList from "@/components/PlayerList";
import Schedule from '@/components/Schedule';
import StandingsTable from '@/components/StandingsTable';
import ScheduleGenerator from '@/components/ScheduleGenerator'; // Import your logic class
import { Player, Round, Standings } from '@/types';
import { calculateStandings } from '@/utils/standings';
import {generatePlayoffs} from "@/utils/playoffs";

export default function HomePage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [schedule, setSchedule] = useState<Round[]>([]);
    const [standings, setStandings] = useState<Standings>({});
    const [numRounds, setNumRounds] = useState(1);
    const [playoffsGenerated, setPlayoffsGenerated] = useState(false);

    const resetTournament = () => {
        setPlayers([]);
        setSchedule([]);
        setStandings({});
        setPlayoffsGenerated(false);
    };

    const generateSchedule = () => {
        try {
            if (players.length % 4 !== 0) {
                alert("Number of players must be a multiple of 4 for balanced doubles.");
                return;
            }
            if (numRounds < 1) {
                alert("Please enter a valid number of rounds.");
                return;
            }

            const newSchedule = ScheduleGenerator.generateSchedule(players, numRounds);
            console.log("Generated Schedule:", newSchedule); // LOG IT
            setSchedule(newSchedule);
            setStandings({});
        } catch (error: any) {
            alert(error.message);
        }
    };

    function allMatchesScored(schedule: Round[]): boolean {
        return schedule.every(round =>
            round.matches.every(match => match.score !== null)
        );
    }

    useEffect(() => {
        if (schedule.length && !playoffsGenerated && allMatchesScored(schedule)) {
            const updatedStandings = calculateStandings(schedule);
            setStandings(updatedStandings);

            const playoffRounds = generatePlayoffs(updatedStandings, players, schedule.length);
            if (playoffRounds.length > 0) {
                setSchedule([...schedule, ...playoffRounds]);
                setPlayoffsGenerated(true);
            }
        }
    }, [schedule, playoffsGenerated, players, standings]);

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Doubles Tournament Manager</h1>

            <PlayerForm players={players} setPlayers={setPlayers} />
            <PlayerList players={players} setPlayers={setPlayers} />

            <div className="mb-4 flex items-center gap-4">
                <label className="text-lg">
                    Number of Rounds:
                    <input
                        type="number"
                        min="1"
                        value={numRounds}
                        onChange={(e) => setNumRounds(Number(e.target.value))}
                        className="ml-2 p-1 border rounded w-16"
                    />
                </label>
                <button
                    onClick={generateSchedule}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Generate Schedule
                </button>
            </div>

            <Schedule
                schedule={schedule}
                setSchedule={setSchedule}
                setStandings={setStandings}
                calculateStandings={calculateStandings}
                standings={standings}
                players={players}
                numRegularRounds={numRounds}
            />

            <StandingsTable standings={standings} />

            <button
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
                onClick={resetTournament}
            >
                Reset Tournament
            </button>
        </main>
    );
}
