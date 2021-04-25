import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { saveAs } from 'file-saver';

import { cloneSongRequest, getProfileImagePath, getSongPath } from "../../../services/filesService";
import { getSongById } from "../../../services/songsService";
import { decodeEmotionCode } from "../../../helpers/dataInterpretation";
import { getUserByIdRequest } from "../../../services/usersService";
import { Link } from "react-router-dom";
import { types } from "../../../models/types/types";
import { createResponseNotification } from "../../../helpers/create-notification";

const initialState = {
    song:{
        id:'',
        title:'',
        emotion_code:0,
        size:1,
        duration:0
    },
    user:{
        username:'',
        pp:''
    }
}

export const SongExtContainer = ({id}) => {
    const [song, setSong] = useState(initialState.song);
    const [user, setUser] = useState(initialState.user);
    const [emotion, setEmotion] = useState(types.EMOTIONS.ALARMED);

    useEffect(() => {
        const loadSongData = async () => {
            const resp = await getSongById(id);
            const s = resp.data.song;

            if(s){
                const resp2 = await getUserByIdRequest(s.user_id);
                const image = await getProfileImagePath(s.user_id);
                
                setEmotion(decodeEmotionCode(s.emotion_code));
                setUser({...resp2.data.user, pp:image});
                setSong(s);
            }
            else{
                //redirect to 404
            }
        }

        loadSongData();
    }, [id]);

    const handleCloneSong = async () => {
        const resp = await cloneSongRequest(song.id);
        createResponseNotification(resp);
    }

    return(
        <div className="d-flex justify-content-center mt-3">

            { song.id && 
                (
                    <div className="d-flex justify-content-center align-items-center song-view-container animate__animated animate__slideInUp">

                        <div className="mr-5">

                            <div>
                                <img src={user.pp} alt={user.username} className="m-3 white-border" />
                            </div>

                            <div className="text-center">
                                <Link
                                    className="link-white"
                                    to={`/view/users/${user.id}`}>
                                        Checkout my other creations
                                </Link>
                            </div>

                        </div>

                        <div>

                            <h2 className="text-center font-italic">This is my song</h2>

                            <div className="d-flex justify-content-center align-items-center">
                                <AudioPlayer
                                    src={id !== ''? getSongPath(id):''}
                                    showJumpControls={false}
                                    customControlsSection={['MAIN_CONTROLS','VOLUME_CONTROLS']}
                                    customProgressBarSection={['PROGRESS_BAR']}
                                    layout='horizontal-reverse'
                                    showDownloadProgress={false}
                                />

                                <i  onClick={() => {saveAs(getSongPath(song.id), song.title)}}
                                    className="fa fa-arrow-alt-circle-down ml-2 clickable_item"></i>

                                <i  onClick={handleCloneSong}
                                    className="far fa-copy ml-3 clickable_item"></i>

                            </div>

                            <div className="mb-3">
                                <p className="m-1 mt-3">
                                    Title:      <span className="font-italic ml-1 song-title-display">{song.title}</span>
                                </p>
                                <p className={`m-1 ${emotion.class}`}>
                                    Emotion:    
                                        <span className="font-italic ml-1 text-capitalize">
                                            {emotion.name}
                                        </span>
                                </p>
                                <p className="m-1">
                                    Duration:   <span className="font-italic ml-1">{song.duration}s</span>
                                </p>
                                <p className="m-1">
                                    Size:       <span className="font-italic ml-1">{(song.size/1048576).toFixed(2)}M</span>
                                </p>
                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    )
}