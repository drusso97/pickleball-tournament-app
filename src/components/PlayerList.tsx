import { Player } from '@/types';

type PlayerListProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export default function PlayerList({ players, setPlayers }: PlayerListProps) {
    const removePlayer = (id: string) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    return (
        <ul className="mb-4">
            {players.map(player => (
                <li key={player.id} className="flex justify-between mb-2">
                    <span>{player.name}</span> {/* ✅ render name here */}
                    <button
                        onClick={() => removePlayer(player.id)}
                        className="text-red-600"
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}
