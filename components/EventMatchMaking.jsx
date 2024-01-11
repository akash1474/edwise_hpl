"use client";
import React, { useEffect,useState } from 'react';
import * as BV from 'brackets-viewer/dist/brackets-viewer.min.js'
import "brackets-viewer/dist/brackets-viewer.min.css";
import { InMemoryDatabase } from 'brackets-memory-db';
import { BracketsManager } from 'brackets-manager';




const EventMatchMaking=()=>{
    const [storage,setStorage]=useState();
    const [manager,setManager]=useState();

  	useEffect(() => {
        (async()=>{
            const strg = new InMemoryDatabase();
            const mgr = new BracketsManager(strg);

            await mgr.create.stage({
              tournamentId: 3,
              name: 'Cricket Match',
              type: 'single_elimination',
              seeding: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8'],
              settings: { grandFinal: 'double' },
            });

            await mgr.update.match({
              id: 0,
              opponent1: { score: 16, result: 'win' },
              opponent2: { score: 12 },
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
            opponent1: { score: 96, result: 'win' },
            opponent2: { score: 77 },
        });
        await manager.update.match({
            id: 2,
            opponent1: { score: 96, result: 'win' },
            opponent2: { score: 77 },
        });
        await manager.update.match({
            id: 3,
            opponent1: { score: 16, result: 'win' },
            opponent2: { score: 7 },
        });
        await manager.update.match({
            id: 4,
            opponent1: { score: 10, result: 'win' },
            opponent2: { score: 7 },
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