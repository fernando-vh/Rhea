import { Button } from "react-bootstrap"
import { useHistory } from "react-router";
import { SongContainer } from "./songContainer"

export const SongsTable = ({songs}) => {
    const history = useHistory();

    const addSongHandler = () => {
        history.push('/composer');
    }

    return(
        <div className="songs-table text-center">

            <div className="to-overlap-container">

                <div className="to-overlap-comp w-100">
                    <h2 className="mb-4 d-inline">These are your songs</h2>
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