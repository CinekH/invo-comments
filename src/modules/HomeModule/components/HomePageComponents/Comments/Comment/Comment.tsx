import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectCommentsByParent } from '@/modules/HomeModule/stores/store';
import { TRootState } from '@/modules/HomeModule/stores/store';

import { likeComment, unlikeComment } from '@/modules/HomeModule/stores/store';

import moment from 'moment';

import './Comment.scss';

import user1 from '../../../../../../assets/images/user1.png';
import user2 from '../../../../../../assets/images/user2.png';
import user3 from '../../../../../../assets/images/user3.png';

import { ReactComponent as Arrow } from '../../../../../../assets/icons/Arrow.svg';
import { ReactComponent as Dots } from '../../../../../../assets/icons/Dots.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/Like.svg';
import { ReactComponent as Reply } from '../../../../../../assets/icons/Reply.svg';

interface IComment {
  text: string,
  name: string,
  id: number,
  date: Date,
  liked: boolean,
  likes: number,
  parentId: number | null
}


export const Comment: React.FC<IComment> = ({ text, name, id, date, liked, likes, parentId }) => {
  const comments = useSelector((state: TRootState) => selectCommentsByParent(state, id));
  const dispatch = useDispatch();

  const getImage = () => {
    switch (name) {
      case 'Ellie Alvaz':
        return user1;
      case 'Kylee Thomson':
        return user2;
      case 'Laurel Fisher':
        return user3
      default:
        return user1
    }
  }

  const handleLike = () => {
    liked ? dispatch(unlikeComment(id)) : dispatch(likeComment(id))
  }

  return (
    <div className='comment'>
      <div className='comment__image-container'>
        <img src={getImage()} alt="user" className={`comment__image${name === 'Laurel Fisher' ? ' comment__image--laurel' : ''}`} />
      </div>
      <div className="comment__content">
        <header className='comment__header'>
          <h2 className='comment__name text-big'>{name}{name === 'Ellie Alvaz' ? ' (You)' : ''}</h2>
          <span className='comment__date text-tiny'>{moment(date).fromNow()}</span>
        </header>
        <p className="text-regular comment__text">{text}</p>
      </div>
      <div className='comment__menu'>
        <button className='comment__menu-button'>
          <Dots />
        </button>
      </div>
      <div className="comment__bottom-menu">
        <div className={`comment__like-container${liked ? ' comment__liked' : ''}`}>
          <button className='comment__button comment__button--like' onClick={handleLike}>
            <Like className='comment__icon comment__icon--like' />
          </button>
          <span className='text-small comment__likes'>{likes}</span>
        </div>
        <button className='comment__button comment__button--reply'>
          <Reply className="comment__icon comment__icon--reply" />
          <span className='text-small comment__reply'>Reply</span>
        </button>
      </div>
    </div>
  )
}