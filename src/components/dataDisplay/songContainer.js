/*
        id:'',
        title:'',
        emotion:2,
        size:2,
        duration:2,
        createdAt:''
*/

import {decodeEmotionCode} from '../../helpers/dataInterpretation'
import { getSongPath } from '../../services/filesService';

export const SongContainer = ({song}) => {
    const emotion = decodeEmotionCode(song.emotion_code);

    return (
        <div className="song-container">

            <div className="d-flex">
                <div className="col-2">
                    {song.title}
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
                <div className="col-6 justify-content-center align-items-center text-center">
                    
                    <i className="fa fa-arrow-alt-circle-down mr-3"></i>
                    <i className="fa fa-pencil-alt mr-3"></i>
                    <i className="fa fa-trash-alt"></i>

                    <audio controls >
                        <source src={getSongPath(song.id)} type="audio/mpeg" />
                    </audio>

                </div>
            </div>
            
        </div>
    )
}