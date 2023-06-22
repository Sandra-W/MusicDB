import { useState, useEffect } from 'react';

//Custom hook. For reusability of code. 
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    //Runs the following function every re-render. Eg. anytime the data changes. 
    useEffect(() => {  
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if(!res.ok){
                        throw Error('Could not fetch the data for that resource.');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setError(err.message);
                    setIsPending(false);
                })
        }, 0);

    //Empty array signifies that the useEffect only fires upon the initial load.
    //Fires everytime the url changes to get data from the new endpoint.
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;