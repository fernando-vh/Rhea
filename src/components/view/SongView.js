import { useEffect, useState } from "react";
import { decodeEmotionCode } from "../../helpers/dataInterpretation";
import { getProfileImagePath } from "../../services/filesService";
import { getSongById } from "../../services/songsService";
import { getUserByIdRequest } from "../../services/usersService";
import { SongExtContainer } from "../dataDisplay/external/SongExtContainer"
import { NonExistingContent404 } from "../ui/NonExistingContent404";

export const SongView = ({id}) => {
    const [song, setSong] = useState();

    useEffect(() => {
        const loadSongData = async () => {
            const resp = await getSongById(id);
            const s = resp.data.song;

            if(s){
                const resp2 = await getUserByIdRequest(s.user_id);
                let user = resp2.data.user;

                if(user){
                    const image = await getProfileImagePath(s.user_id);
                    user = {...user, pp:image};
                }
                
                setSong({
                    ...s,
                    user,
                    emotion:decodeEmotionCode(s.emotion_code)});
            }
        }

        loadSongData();
    }, [id]);

    return (
        <div>

            {
                song
                ?(
                    <>
                        <div className="fancy-title-text">
                            Enjoy my creation
                        </div>

                        <SongExtContainer song={song}/>
                    </>
                )
                :(<NonExistingContent404 />)
            }

        </div>
    )
}