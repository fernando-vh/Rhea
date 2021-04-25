import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useCounter } from "../../../hooks/useCounter";
import { getSongsRequest } from "../../../services/songsService";
import { SongContainer } from "./songContainer"

export const SongsTable = () => {
    const history = useHistory();
    const [songs, setSongs] = useState([]);
    const {decrement, increment, counter, setNewTotal, total} = useCounter(1,1,1);
    const userState = useSelector(state => state.auth);

    const addSongHandler = () => {
        history.push('/composer');
    }

    useEffect(() => {
        const loadSongData = async () => {
            const resp = await getSongsRequest({
                orderBy:'createdAt:DESC',
                userId:userState.uid,
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
    }, [counter, setNewTotal, userState]);

    return(
        <div className="songs-table text-center">

            <div className="to-overlap-container">

                <div className="to-overlap-comp w-100">
                    <h2 className="mb-4 d-inline">These are your songs</h2>
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
                
                <div className="to-overlap-comp">
                    <Button 
                        className="add-button"
                        variant="outline-light"
                        onClick={addSongHandler}>
                            Add +
                    </Button>
                </div>

            </div>

            <div className="d-flex songs-table-header">
                <div className="col-2">
                    Title
                </div>
                <div className={'col-2'}>
                    Emotion
                </div>
                <div className="col-1">
                    Duration
                </div>
                <div className="col-1">
                    Size
                </div>
                <div className="col-6">
                    Actions
                </div>
            </div>

            {
                songs.length > 0
                    ?(
                        songs.map(s => 
                            <SongContainer key={s.id} song={s}/>
                        )
                    )
                    :<div className="m-1">[No songs created]</div>
            }
        </div>
    )
}