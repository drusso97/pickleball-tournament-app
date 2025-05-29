// src/components/StandingsTable.tsx
import React from 'react';
import {Standings} from '@/types';

type StandingsTableProps = {
    standings: Standings;
};

export default function StandingsTable({standings}: StandingsTableProps) {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Standings</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="border px-4 py-2 text-left">Player</th>
                    <th className="border px-4 py-2 text-left">Wins</th>
                    <th className="border px-4 py-2 text-left">Losses</th>
                    <th className="border px-4 py-2 text-left">PF</th>
                    <th className="border px-4 py-2 text-left">PA</th>
                    <th className="border px-4 py-2 text-left">PD</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(standings)
                    .sort(([, a], [, b]) =>
                        b.wins !== a.wins
                            ? b.wins - a.wins
                            : b.pointDifferential !== a.pointDifferential
                                ? b.pointDifferential - a.pointDifferential
                                : b.pointsScored - a.pointsScored
                    )
                    .map(([playerId, record]) => (
                        <tr key={playerId}>
                            <td className="border px-4 py-2">{record.name}</td>
                            <td className="border px-4 py-2">{record.wins}</td>
                            <td className="border px-4 py-2">{record.losses}</td>
                            <td className="border px-4 py-2">{record.pointsScored}</td>
                            <td className="border px-4 py-2">{record.pointsAllowed}</td>
                            <td className="border px-4 py-2">{record.pointDifferential}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}