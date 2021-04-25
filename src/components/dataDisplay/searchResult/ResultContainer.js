import { useState } from 'react';
import { useEffect } from 'react';
import { decodeEmotionCode } from '../../../helpers/dataInterpretation';
import { types } from '../../../models/types/types';

export const ResultContainer = ({result}) => {
    const [desc, setDesc] = useState("");

    useEffect(() => {

        switch (result.type) {
            case types.SEARCH_COMPONENTS.SONGS:
                const d = result.desc;
                setDesc( `${decodeEmotionCode(d.emotionCode).name} / ${d.duration}s / ${d.size}M` );
                break;
        
            case types.SEARCH_COMPONENTS.USERS:
                setDesc( result.desc );
                break;

            default:;
        }
    }, [result]);

    return (
        <div className="search-result-container animate__animated animate__fadeIn">

            <div className="d-flex">
                <div className="col-3 cut-text">
                    <span className="link-white">{result.name}</span>
                </div>
                <div className="col-6 cut-text">
                    {desc}
                </div>
                <div className="col-3 cut-text">
                    {result.createdAt}
                </div>
            </div>
            
        </div>
    )
}