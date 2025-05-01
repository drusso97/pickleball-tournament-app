"use client";

import React from "react";

interface PlayerListProps {
    players: string[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
    return (
        <ul>
            {players.map((player, index) => (
                <li key={index}>{player}</li>
            ))}
        </ul>
    );
};


export default PlayerList;