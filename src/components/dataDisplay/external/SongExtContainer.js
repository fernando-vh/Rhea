import AudioPlayer from "react-h5-audio-player";
import { saveAs } from 'file-saver';

import { cloneSongRequest, getSongPath } from "../../../services/filesService";
import { Link } from "react-router-dom";
import { createResponseNotification } from "../../../helpers/create-notification";

export const SongExtContainer = ({song}) => {

    const handleCloneSong = async () => {
        const resp = await cloneSongRequest(song.id);
        createResponseNotification(resp);
    }

    return(
        <div className="d-flex justify-content-center mt-3">

            <div className="d-flex justify-content-center align-items-center song-view-container animate__animated animate__slideInUp">

                {
                    song.user &&
                    (
                        <div className="mr-5">

                            <div>
                                <img src={song.user.pp} alt={song.user.username} className="m-3 white-border" />
                            </div>

                            <div className="text-center">
                                <Link
                                    className="link-white"
                                    to={`/view/users/${song.user.id}`}>
                                        Checkout my other creations
                                </Link>
                            </div>

                        </div>
                    )
                }

                <div>

                    <h2 className="text-center font-italic">This is my song</h2>

                    <div className="d-flex justify-content-center align-items-center">
                        <AudioPlayer
                            src={getSongPath(song.id)}
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
                            Title:
                                <span className="font-italic ml-1 song-title-display">
                                    {song.title}
                                </span>
                        </p>
                        <p className={`m-1 ${song.emotion.class}`}>
                            Emotion:    
                                <span className="font-italic ml-1 text-capitalize">
                                    {song.emotion.name}
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

        </div>
    )
}