import { useEffect } from "react";

const useAPI = (api, { url, method, data, onSuccess, onError }) => {
    useEffect(() => {
        api({ url, method, data }).then(onSuccess).catch(onError);
    }, [api, url, method, data, onSuccess, onError]);
}
