import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl} from "react-bootstrap"
import AudioPlayer from "react-h5-audio-player";
import { createResponseNotification } from "../helpers/create-notification";
import { types } from "../models/types/types"
import { createNewSong, deleteSong, getSongPath } from "../services/filesService";
import {getRandomInt} from '../helpers/util';
import {changeBgImage} from '../actions/ui';
import { useDispatch } from "react-redux";

const initialState = {
    id:'',
    title:'',
    size:1,
    duration:0
}

export const ComposeScreen = ({history}) => {
    const emo = types.EMOTIONS;
    const [currentEmotion, setCurrentEmotion] = useState(emo.ALARMED);
    const [currentSong, setSong] = useState(initialState)
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.SUBROUTES));
    }, [dispatch])

    const handleSongCreation = async (emotion) => {
        setCurrentEmotion(emotion);

        if(currentSong.id !== ''){
            await deleteSong(currentSong.id);
        }

        let payload = title.length > 0
            ?
                {
                    emotionCode:emotion.code,
                    title:title
                }
            :
                {
                    emotionCode:emotion.code
                };

        const resp = await createNewSong(payload);
        createResponseNotification(resp);
        
        if(resp.status === 201){
            setSong(resp.data.song);
        }
    }

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }

    const leavePage = async (ereaseSong) => {
        if(ereaseSong && currentSong.id !== ''){
            await deleteSong(currentSong.id);
        }
        history.push('/dashboard');
    }

    return(
        <div>
            <div className="fancy-title-text">
                Compose your creation
            </div>

            <div className="d-flex justify-content-center align-items-center">

            <div className="composer-form animate__animated animate__zoomIn">
                <h2 className="text-center">Configure your song</h2>
                
                    <div className="mb-1">Song title</div>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Enter title"
                            onChange={handleInputChange}
                            value={title}
                        />
                    </InputGroup>

                    <div className="d-flex justify-content-between">
                        <Button 
                            variant="outline-danger"
                            className="emotion-button"
                            onClick={(e)=>{handleSongCreation(emo.ALARMED)}}>
                                {emo.ALARMED.name}
                        </Button>

                        <Button 
                            variant="outline-warning"
                            className="emotion-button"
                            onClick={(e)=>{handleSongCreation(emo.HAPPY)}}>
                                {emo.HAPPY.name}
                        </Button>

                        <Button 
                            variant="outline-info"
                            className="emotion-button"
                            onClick={(e)=>{handleSongCreation(emo.TIRED)}}>
                                {emo.TIRED.name}
                        </Button>

                        <Button 
                            variant="outline-primary"
                            className="emotion-button"
                            onClick={(e)=>{handleSongCreation(emo.SAD)}}>
                                {emo.SAD.name}
                        </Button>
                    </div>

                    <div className="mt-3">
                        Current emotion: <span className="font-italic">{currentEmotion.name}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <AudioPlayer
                            src={currentSong.id !== ''? getSongPath(currentSong.id):""}
                            autoPlay
                            showJumpControls={false}
                            customControlsSection={['MAIN_CONTROLS','VOLUME_CONTROLS']}
                            customProgressBarSection={['PROGRESS_BAR']}
                            layout='horizontal-reverse'
                            showDownloadProgress={false}
                        />

                        <Button 
                            variant="outline-light"
                            onClick={(event)=>{
                                    const e = [emo.ALARMED, emo.HAPPY, emo.SAD, emo.TIRED];
                                    handleSongCreation(e[getRandomInt(0, 3)], event);
                                }}>
                                <i className="fas fa-dice"></i>
                        </Button>

                        <Button 
                            variant="outline-light"
                            onClick={(e)=>{handleSongCreation(currentEmotion)}}>
                            <i className="fas fa-sync-alt"></i>
                        </Button>

                    </div>

                    <div className="mb-3">
                        <p className="m-1 mt-3">
                            Title:      <span className="font-italic ml-1 song-title-display">{currentSong.title}</span>
                        </p>
                        <p className="m-1">
                            Emotion:    <span className="font-italic ml-1 text-capitalize">{currentEmotion.name}</span>
                        </p>
                        <p className="m-1">
                            Duration:   <span className="font-italic ml-1">{currentSong.duration}s</span>
                        </p>
                        <p className="m-1">
                            Size:       <span className="font-italic ml-1">{(currentSong.size/1048576).toFixed(2)}M</span>
                        </p>
                    </div>

                    <small>*Current song is saved unless you click cancel</small>
                    <div className="d-flex justify-content-center mt-1">
                        <Button 
                            variant="outline-light emotion-button"
                            onClick={() => leavePage()}>
                                Done
                        </Button>

                        <Button 
                            variant="outline-danger emotion-button"
                            onClick={() => leavePage(true)}>
                                Cancel
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}