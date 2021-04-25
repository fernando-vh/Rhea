import { useEffect, useState } from "react";
import { useCounter } from "../../../hooks/useCounter";
import { getSongsRequest } from "../../../services/songsService";
import { SongExtRow } from "./SongExtRow";

export const SongExtTable = ({uid}) => {
    const [songs, setSongs] = useState([]);
    const {decrement, increment, counter, setNewTotal, total} = useCounter(1,1,1);

    useEffect(() => {
        const loadSongData = async () => {
            const resp = await getSongsRequest({
                orderBy:'createdAt:DESC',
                userId:uid,
                limit:10,
                from:10*(counter-1)
            });
    
            const s = resp.data.songs;
            if(s){
                setSongs(s);
                setNewTotal(Math.ceil(resp.data.total/10));
            }

        }

        loadSongData();
    }, [counter, setNewTotal, uid]);

    return(
        <div className="songs-view-table text-center animate__animated animate__bounceInRight">

            <div className="to-overlap-container">

                <div className="to-overlap-comp w-100">
                    <h2 className="mb-4 d-inline">These are my songs</h2>
                </div>


                <div className="to-overlap-comp w-100">
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-between text-light align-items-center mb-3">
                            <i 
                                className="fas fa-chevron-left fa clickable_item mr-3"
                                onClick={decrement}></i>

                                {counter}/{total}
                            <i 
                                className="fas fa-chevron-right fa clickable_item ml-3"
                                onClick={increment}></i>
                        </div>

                    </div>
                </div>

            </div>

            <div className="d-flex songs-table-header">
                <div className="col-3">
                    Title
                </div>
                <div className={'col-2'}>
                    Emotion
                </div>
                <div className="col-2">
                    Duration
                </div>
                <div className="col-1">
                    Size
                </div>
                <div className="col-4">
                    Tools
                </div>
            </div>

            {
                songs.length > 0
                    ?(
                        songs.map(s => 
                            <SongExtRow key={s.id} song={s}/>
                        )
                    )
                    :<div className="m-1">[No songs created]</div>
            }
        </div>
    )
}