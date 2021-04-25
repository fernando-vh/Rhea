import AudioPlayer from 'react-h5-audio-player';
import { saveAs } from 'file-saver';

import {decodeEmotionCode} from '../../../helpers/dataInterpretation'
import { getSongPath } from '../../../services/filesService';
import { useEffect, useState } from 'react';
import { getUserByIdRequest } from '../../../services/usersService';

const initialState = {
    username:''
}

export const SongContainerPublic = ({song}) => {
    const emotion = decodeEmotionCode(song.emotion_code);

    const [user, setUser] = useState(initialState);

    useEffect(() => {
        const getUserInfo = async () => {
            const resp = await getUserByIdRequest(song.user_id);
            setUser(resp.data.user);
        }

        getUserInfo();
    }, [setUser, song.user_id]);

    return (
        <div className="song-container animate__animated animate__fadeIn">

            <div className="d-flex align-items-center">
                <div className="col-2 cut-text">
                    <span className="link-white">{user.username}</span>
                </div>
                <div className="col-4 cut-text">
                    {song.title}
                </div>
                <div className={`col-2 ${emotion.class}`}>
                    {emotion.name}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">

                    <AudioPlayer
                        src={getSongPath(song.id)}
                        showJumpControls={false}
                        customControlsSection={['MAIN_CONTROLS','VOLUME_CONTROLS']}
                        customProgressBarSection={['PROGRESS_BAR']}
                        layout='horizontal-reverse'
                        showDownloadProgress={false}
                    />

                    <i  onClick={e => {saveAs(getSongPath(song.id), song.title)}}
                        className="fa fa-arrow-alt-circle-down ml-3 clickable_item"></i>

                </div>
            </div>
            
        </div>
    )
}