import {Round, Match, Player, Standings} from "@/types";

type ScheduleProps = {
    schedule: Round[],
    setSchedule: (schedule: Round[]) => void,
    setStandings: (standings: any) => void,
    calculateStandings: (schedule: Round[]) => any,
    players?: Player[],
    standings?: Standings
};

export default function Schedule({
                                     schedule,
                                     setSchedule,
                                     setStandings,
                                     calculateStandings,
                                     players,
                                     standings
                                 }: ScheduleProps) {
    const handleScoreChange = (roundIndex: number, matchIndex: number, team: "team1" | "team2", value: string) => {
        const updatedSchedule = [...schedule];
        const match = updatedSchedule[roundIndex].matches[matchIndex];

        const scoreValue = parseInt(value);
        if (isNaN(scoreValue)) return;

        if (!match.score) match.score = {team1: 0, team2: 0};
        match.score[team] = scoreValue;

        setSchedule(updatedSchedule);
        const updatedStandings = calculateStandings(updatedSchedule);
        setStandings(updatedStandings);
    };

    if (!schedule.length) return <p>No schedule generated yet.</p>;

    return (
        <div>
            {schedule.map((round, rIdx) => (
                <div key={rIdx} className="mb-4">
                    <h2 className="text-xl font-bold">Round {round.round}</h2>
                    {round.matches.map((match, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-4 mb-2">
                            <div className="flex-1">
                                {match.team1.map((p) => p.name).join(" & ")} vs {match.team2.map((p) => p.name).join(" & ")}
                            </div>
                            <input
                                type="number"
                                placeholder="Team 1 Score"
                                className="border p-1 w-16"
                                onChange={(e) =>
                                    handleScoreChange(rIdx, mIdx, "team1", e.target.value)
                                }
                                value={match.score?.team1 ?? ""}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Team 2 Score"
                                className="border p-1 w-16"
                                onChange={(e) =>
                                    handleScoreChange(rIdx, mIdx, "team2", e.target.value)
                                }
                                value={match.score?.team2 ?? ""}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
