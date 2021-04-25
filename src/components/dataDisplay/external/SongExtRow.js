import AudioPlayer from 'react-h5-audio-player';
import { saveAs } from 'file-saver';

import {decodeEmotionCode} from '../../../helpers/dataInterpretation'
import { cloneSongRequest, getSongPath } from '../../../services/filesService';
import { createResponseNotification } from '../../../helpers/create-notification';

export const SongExtRow = ({song}) => {
    const emotion = decodeEmotionCode(song.emotion_code);

    const handleCloneSong = async () => {
        const resp = await cloneSongRequest(song.id);
        createResponseNotification(resp);
    }

    return (
        <div className="song-view-row animate__animated animate__fadeIn">

            <div className="d-flex align-items-center">
                <div className="col-3 cut-text">
                    {song.title}
                </div>
                <div className={`col-2 ${emotion.class}`}>
                    {emotion.name}
                </div>
                <div className="col-2">
                    {song.duration}s
                </div>
                <div className="col-1">
                    {(song.size/1048576).toFixed(2)}M
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

                    <i  onClick={() => {saveAs(getSongPath(song.id), song.title)}}
                        className="fa fa-arrow-alt-circle-down mr-3 clickable_item"></i>

                    <i  onClick={handleCloneSong}
                        className="far fa-copy ml-3 clickable_item"></i>

                </div>
            </div>
            
        </div>
    )
}