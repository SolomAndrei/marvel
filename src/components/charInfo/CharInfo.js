import './charInfo.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)
    const { charId } = props;

    const { loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        upDateChar()
    }, [])

    useEffect(() => {
        upDateChar()
    }, [charId])

    const upDateChar = () => {
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
             }

    const onCharLoaded = (char) => {
        setChar(char)       
    }

    

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error && !char ? <ErrorMessage /> : null;
    const spinner = loading && !error ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const newArr = comics.slice(0, 10)

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {newArr.length > 0 ? null : "There is no comics whith this character"}
                {newArr.map((item, i) => {

                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;