import { SongContainer } from "./songContainer"

export const SongsTable = ({songs}) => {
    return(
        <>
            <div className="songs-table text-center">
                <h2 className="mb-4">These are your songs</h2>

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
                        :<div>Loading...</div>
                }
            </div>
        </>
    )
}