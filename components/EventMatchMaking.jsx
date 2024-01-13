"use client";
import React, { useEffect,useState } from 'react';
import * as BV from 'brackets-viewer/dist/brackets-viewer.min.js'
import "@components/brackets-viewer.css";
import { InMemoryDatabase } from 'brackets-memory-db';
import { BracketsManager } from 'brackets-manager';




const EventMatchMaking=({teams})=>{
    const [storage,setStorage]=useState();
    const [manager,setManager]=useState();

    const teamNames=teams.map((team)=>team.name);
    teamNames.pop();
    teamNames.pop();
    // console.log(teamNames[0])
//     const teamNames = [
//   "Solar Titans",
//   "Thunder Hawks",
//   "Quantum Warriors",
//   "Velocity Vipers",
//   "Nebula Nomads",
//   "Inferno Dragons",
//   "Zenith Zephyrs",
//   "Galactic Guardians"
// ];
    console.log(teamNames.length)

  	useEffect(() => {
        (async()=>{
            const strg = new InMemoryDatabase();
            const mgr = new BracketsManager(strg);

            await mgr.create.stage({
              tournamentId: 3,
              name: 'Cricket Match',
              type: 'single_elimination',
              seeding: teamNames,
              settings: { grandFinal: 'double' },
            });

            await mgr.update.match({
              id: 0,
              opponent1: { score: "▲", result: 'win' },
              opponent2: { score: "▼" },
            });
            console.log(strg)

            window.bracketsViewer.render({
              stages: strg.data.stage,
              matches: strg.data.match,
              matchGames: strg.data.match_game,
              participants: strg.data.participant,
            },{clear:true});

            setManager(mgr);
            setStorage(strg);
        })()

  	}, []);

    const updateData=async(e)=>{
        await manager.update.match({
            id: 1,
            opponent1: { score: "▲", result: 'win' },
            opponent2: { score: "▼" },
        });
        await manager.update.match({
            id: 2,
            opponent1: { score: "▲", result: 'win' },
            opponent2: { score: "▼" },
        });
        await manager.update.match({
            id: 3,
            opponent1: { score: "▲", result: 'win' },
            opponent2: { score: "▼" },
        });
        await manager.update.match({
            id: 4,
            opponent1: { score: "▲", result: 'win' },
            opponent2: { score: "▼" },
        });
        window.bracketsViewer.render({
            stages: storage.data.stage,
            matches: storage.data.match,
            matchGames: storage.data.match_game,
            participants: storage.data.participant,
        },{clear:true});
    }

    return (
        <>
        <div className="w-5/6 flex flex-col items-center my-20">
            <div className="brackets-viewer w-fit"></div>
            <button onClick={updateData} className="btn_black rounded-sm">Update</button>
        </div>
        </>
    )
}

export default EventMatchMaking;