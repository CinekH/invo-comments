import React, { useState } from 'react'
import './Header.scss';
import { useSelector } from 'react-redux';

import { selectCommentsByParent, TRootState } from '../../../stores/store';

import { ReactComponent as Arrow } from '../../../../../assets/icons/Arrow.svg';

interface IHeader {
    setSorting: React.Dispatch<React.SetStateAction<string>>;
}


export const Header: React.FC<IHeader> = ({ setSorting }) => {
    const comments = useSelector((state: TRootState) => selectCommentsByParent(state, null));
    const [menuExpanded, setMenuExpanded] = useState(false);

    const handleClick = (sortingMethod: string) => {
        setMenuExpanded(false);
        setSorting(sortingMethod);
    }

    return (
        <div className='header'>
            <p className='header__amount'>{comments.length === 1 ? `${comments.length} comment` : `${comments.length} comments`}</p>
            <button className='text-small header__sort' aria-expanded={menuExpanded} onClick={() => setMenuExpanded(prev => !prev)} aria-label="select sorting method">
                <span>Sort by</span>
                <Arrow className={menuExpanded ? 'header__icon rotated' : 'header__icon'} />
            </button>
            <div className='header__dropdown' aria-hidden={!menuExpanded}>
                <button className='text-small header__dropdown-button' onClick={() => handleClick('likes')} aria-label="sort by most likes">Best comments</button>
                <button className='text-small header__dropdown-button' onClick={() => handleClick('date')} aria-label="sort by newest">From the latest</button>
            </div>
        </div>
    )
}