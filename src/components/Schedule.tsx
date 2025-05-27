import {Round} from "@/types";

export default function Schedule({ schedule }: { schedule: Round[] }) {
    if (!schedule.length) return <p>No schedule generated yet.</p>;

    return (
        <div>
            {schedule.map((round) => (
                <div key={round.round} className="mb-4">
                    <h3 className="font-bold">Round {round.round}</h3>
                    {round.matches.map((match, idx) => (
                        <p key={idx}>
                            {match.team1.join(" & ")} vs {match.team2.join(" & ")}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}
