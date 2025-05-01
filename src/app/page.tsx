"use client";

import { useEffect, useState } from 'react';
import PlayerForm from '@/components/PlayerForm';
import PlayerList from "@/components/PlayerList";
import Schedule from '@/components/Schedule';
import StandingsTable from '@/components/StandingsTable';
import { loadFromStorage, saveToStorage, clearStorage } from '@/utils/localStorage';
import { Player, Match, Round, Standings } from '@/types';

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [schedule, setSchedule] = useState<Round[]>([]);
  const [standings, setStandings] = useState<Standings>({});

  useEffect(() => {
    const savedPlayers = loadFromStorage<Player[]>('players') || [];
    const savedSchedule = loadFromStorage<Round[]>('schedule') || [];
    const savedStandings = loadFromStorage<Standings>('standings') || {};

    setPlayers(savedPlayers);
    setSchedule(savedSchedule);
    setStandings(savedStandings);
  }, []);

  useEffect(() => {
    saveToStorage('players', players);
    saveToStorage('schedule', schedule);
    saveToStorage('standings', standings);
  }, [players, schedule, standings]);

  const resetTournament = () => {
    setPlayers([]);
    setSchedule([]);
    setStandings({});
    clearStorage();
  };

  return (
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Doubles Tournament Manager</h1>
        <PlayerForm players={players} setPlayers={setPlayers} />
        <PlayerList players={players} setPlayers={setPlayers} />
        <Schedule
            players={players}
            schedule={schedule}
            setSchedule={setSchedule}
            standings={standings}
            setStandings={setStandings}
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
