import { useEffect, useState } from "react";
import { useCounter } from "../../../hooks/useCounter";
import { getSongsRequest } from "../../../services/songsService";
import { SongContainerPublic } from "./songContainerPublic";

export const SongsTablePublic = () => {
    const [songs, setSongs] = useState([]);
    const {decrement, increment, counter, setNewTotal, total} = useCounter(1,1,1);

    useEffect(()=>{
        const loadSongData = async () => {
            const resp = await getSongsRequest({
                orderBy:'createdAt:DESC',
                limit:10,
                from:10*(counter-1)
            });
    
            const s = resp.data.songs;
            if(s){
                setSongs(s);
                setNewTotal(Math.floor(resp.data.total/10));
            }

        }

        loadSongData();

    }, [counter, setNewTotal]);

    return(
        <div>
            <div className="home-welcome-container-text text-center">

                <div className="to-overlap-container">

                    <div className="to-overlap-comp w-100">
                        <h2 className="mb-4 d-inline">Recent songs</h2>
                    </div>

                </div>

                <div className="d-flex songs-table-header">
                    <div className="col-2">
                        Username
                    </div>
                    <div className="col-4">
                        Title
                    </div>
                    <div className='col-2'>
                        Emotion
                    </div>
                    <div className="col-4">
                        Actions
                    </div>
                </div>

                {
                    songs.length > 0
                        ?(
                            songs.map(s => 
                                <SongContainerPublic key={s.id} song={s}/>
                            )
                        )
                        :<div className="m-1">[No songs created]</div>
                }
            </div>
            
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-between w-25 text-light align-items-center mb-3">
                    <i 
                        className="fas fa-chevron-left fa-3x clickable_item"
                        onClick={decrement}></i>

                        {counter}/{total}
                    <i 
                        className="fas fa-chevron-right fa-3x clickable_item"
                        onClick={increment}></i>
                </div>

            </div>
            
        </div>
    )
}