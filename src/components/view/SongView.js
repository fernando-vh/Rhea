import { SongExtContainer } from "../dataDisplay/external/SongExtContainer"

export const SongView = ({id}) => {
    return (
        <div>
            <div className="fancy-title-text">
                Enjoy my creation
            </div>

            <SongExtContainer id={id}/>
        </div>
    )
}