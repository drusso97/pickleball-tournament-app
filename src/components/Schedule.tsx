import { Player, Round, Standings } from '@/types';

interface ScheduleProps {
    players: Player[];
    schedule: Round[];
    setSchedule: React.Dispatch<React.SetStateAction<Round[]>>;
    standings: Standings;
    setStandings: React.Dispatch<React.SetStateAction<Standings>>;
}

export default function Schedule({
                                     players,
                                     schedule,
                                     setSchedule,
                                     standings,
                                     setStandings,
                                 }: ScheduleProps) {
    if (!schedule.length) return <p>No schedule generated yet.</p>;

    return (
        <div>
            {schedule.map((round) => (
                <div key={round.round} className="mb-4">
                    <h2 className="text-xl font-bold">Round {round.round}</h2>
                    {round.matches.map((match, idx) => (
                        <div key={idx}>
                            {match.team1.map((p) => p.name).join(' & ')} vs{' '}
                            {match.team2.map((p) => p.name).join(' & ')}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
