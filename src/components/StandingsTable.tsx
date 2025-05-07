// src/components/StandingsTable.tsx
import React from 'react';
import { Standings } from '@/types';

type StandingsTableProps = {
    standings: Standings;
};

export default function StandingsTable({ standings }: StandingsTableProps) {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Standings</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="border px-4 py-2 text-left">Player</th>
                    <th className="border px-4 py-2 text-left">Wins</th>
                    <th className="border px-4 py-2 text-left">Losses</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(standings).map(([playerId, record]) => (
                    <tr key={playerId}>
                        <td className="border px-4 py-2">{record.name}</td>
                        <td className="border px-4 py-2">{record.wins}</td>
                        <td className="border px-4 py-2">{record.losses}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
