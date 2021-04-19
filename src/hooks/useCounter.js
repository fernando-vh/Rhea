import { useCallback, useState } from "react";

export const useCounter = (initialValue = 10, totalValue = 10, minValue = 0) =>{
    const [counter, setCounter] = useState(initialValue);
    const [total, setTotal] = useState(totalValue)

    const increment = () =>{
        if(counter+1 <= total){
            setCounter(counter + 1);
        }
    }

    const decrement = () =>{
        if(counter-1 >= minValue){
            setCounter(counter - 1);
        }
    }

    const reset = () =>{
        setCounter(initialValue);
    }

    const setNewTotal = useCallback( (newValue) => {
        if(newValue !== total){
            setTotal(newValue);
        }
    }, [total])

    return {
        counter,
        total,
        decrement,
        increment,
        setNewTotal,
        reset
    };
}