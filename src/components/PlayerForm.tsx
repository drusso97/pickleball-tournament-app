import React from 'react';
import { Player } from '@/types';

type PlayerFormProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export default function PlayerForm({ players, setPlayers }: PlayerFormProps) {
    const [name, setName] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const newPlayer: Player = {
                id: crypto.randomUUID(), // or Date.now().toString()
                name,
            };
            setPlayers([...players, newPlayer]);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                placeholder="Enter player name"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Player
            </button>
        </form>
    );
}
