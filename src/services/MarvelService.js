import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey1 = "apikey=1807fe97160976f010afe918dd9ee71f";
    const _apiKey2 = "apikey=c13edf26ec541e2d1ff070c12b829f38";
    const _baseOffset = 210;




    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey2}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey2}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {

        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : "There is no description for this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }





    return { loading, error, getAllCharacters, getCharacter, clearError }


}


export default useMarvelService;