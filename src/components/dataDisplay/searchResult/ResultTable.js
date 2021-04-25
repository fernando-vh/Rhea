import { useEffect, useState } from "react";
import { useCounter } from "../../../hooks/useCounter";
import { types } from "../../../models/types/types";
import { getBySearchTermRequest } from '../../../services/searchService'
import { ResultContainer } from "./ResultContainer";

export const ResultTable = ({term}) => {
    const [data, setData] = useState([]);
    const {decrement, increment, counter, setNewTotal, total} = useCounter(1,1,1);

    useEffect(()=>{
        const loadSearchData = async () => {
            const query = {
                orderBy:'createdAt:DESC',
                limit:10,
                from:10*(counter-1)
            };

            const resp = await (term.includes('@')
                ? getBySearchTermRequest(types.SEARCH_COMPONENTS.USERS, term.split('@')[1], query)
                : getBySearchTermRequest(types.SEARCH_COMPONENTS.SONGS, term, query));

            const searchResult = resp.data.result;

            if(searchResult){

                const data2 = searchResult.map(r => 
                    {
                        
                        const d = new Date(r.createdAt);
                        const str = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(d);

                        let temp = {
                            id: r.id,
                            type: resp.data.component,
                            createdAt: str
                        }

                        switch (resp.data.component) {
                            case types.SEARCH_COMPONENTS.USERS:
                                temp = {...temp, name:r.username, desc:r.description};
                                break;
                        
                            case types.SEARCH_COMPONENTS.SONGS:
                                temp = {...temp, name:r.title, desc:{
                                    emotionCode:r.emotion_code,
                                    size:(r.size/1048576).toFixed(2),
                                    duration:r.duration
                                }}
                                break;
                            
                            default:;
                        }

                        return temp;
                    }
                );
                setData(data2);
                setNewTotal(Math.floor(resp.data.total/10));
            }
        }

        loadSearchData();

    }, [counter, setNewTotal, term]);

    return(
        <div className="animate__animated animate__fadeIn">
            <div className="search-result-table text-center">

                <div className="to-overlap-container">

                    <div className="to-overlap-comp w-100">
                        <h2 className="mb-4 d-inline">Result for: <small className="ml-1">{term}</small></h2>
                    </div>

                </div>

                <div className="d-flex songs-table-header">
                    <div className="col-3">
                        Name
                    </div>
                    <div className="col-6">
                        Description
                    </div>
                    <div className="col-3">
                        Created at
                    </div>
                </div>

                {
                    data.length > 0
                        ?(
                            data.map(r => 
                                <ResultContainer key={r.id} result={r}/>
                            )
                        )
                        :<div className="m-1">[No results found]</div>
                }
            </div>
            
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-between w-25 text-light align-items-center mb-3">
                    <i 
                        className="fas fa-chevron-left fa-3x clickable_item"
                        onClick={decrement}></i>

                        {counter}/{total}
                    <i 
                        className="fas fa-chevron-right fa-3x clickable_item"
                        onClick={increment}></i>
                </div>

            </div>
            
        </div>
    )
}