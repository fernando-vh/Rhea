import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import { saveAs } from 'file-saver';

import {decodeEmotionCode} from '../../../helpers/dataInterpretation'
import { getSongPath } from '../../../services/filesService';
import { updateSongRequest } from '../../../services/songsService';
import { createResponseNotification } from '../../../helpers/create-notification';

export const SongContainer = ({song}) => {
    const emotion = decodeEmotionCode(song.emotion_code);

    const [title, setTitle] = useState(song.title);
    const [disabled, setDisabled] = useState(true);
    const [validTitle, setValidTitle] = useState(song.title);

    const submitTitleChange = async () => {
        setDisabled(true);

        if(title !== validTitle){

            const resp = await updateSongRequest({title}, song.id);
            createResponseNotification(resp);
            
            if(resp.status === 201){
                setValidTitle(title);
            }
            else{
                setTitle(validTitle);
            }

        }
    }

    const submitTitleChangeKeyUp = async (e) => {
        if(e.keyCode === 13){
            submitTitleChange();
        }
    }

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }

    const toggleEditMode = () => {
        setDisabled(!disabled);
    }

    return (
        <div className="song-container animate__animated animate__fadeIn">

            <div className="d-flex align-items-center">
                <div className="col-2">
                    <InputGroup>
                        <FormControl
                            className={`song-title-input${disabled?'':'-focus'}`}
                            type="text"
                            value={title}
                            onBlur={submitTitleChange}
                            onChange={handleInputChange}
                            onKeyUpCapture={submitTitleChangeKeyUp}
                            disabled={disabled}
                        />
                    </InputGroup>
                </div>
                <div className={`col-2 ${emotion.class}`}>
                    {emotion.name}
                </div>
                <div className="col-1">
                    {song.duration}s
                </div>
                <div className="col-1">
                    {(song.size/1048576).toFixed(2)}M
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">

                    <i  onClick={e => {saveAs(getSongPath(song.id), validTitle)}}
                        className="fa fa-arrow-alt-circle-down mr-3 clickable_item"></i>

                    <i  onClick={toggleEditMode}
                        className="fa fa-pencil-alt mr-3 clickable_item"></i>

                    <i className="fa fa-trash-alt mr-2 clickable_item"></i>

                    <AudioPlayer
                        src={getSongPath(song.id)}
                        showJumpControls={false}
                        customControlsSection={['MAIN_CONTROLS','VOLUME_CONTROLS']}
                        customProgressBarSection={['PROGRESS_BAR']}
                        layout='horizontal-reverse'
                        showDownloadProgress={false}
                    />

                </div>
            </div>
            
        </div>
    )
}