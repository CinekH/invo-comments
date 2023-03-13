import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectCommentsByParent } from '@/modules/HomeModule/stores/store';
import { TRootState } from '@/modules/HomeModule/stores/store';

import { likeComment, unlikeComment, editComment, deleteComment } from '@/modules/HomeModule/stores/store';

import moment from 'moment';

import './Comment.scss';

import user1 from '../../../../../../assets/images/user1.png';
import user2 from '../../../../../../assets/images/user2.png';
import user3 from '../../../../../../assets/images/user3.png';

import { ReactComponent as Dots } from '../../../../../../assets/icons/Dots.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/Like.svg';
import { ReactComponent as Reply } from '../../../../../../assets/icons/Reply.svg';
import { ReactComponent as Trash } from '../../../../../../assets/icons/trash.svg';
import { ReactComponent as Edit } from '../../../../../../assets/icons/edit.svg';

interface IReplyTo {
  replyToName: string | null,
  replyToId: number | null
}

interface IComment {
  text: string,
  name: string,
  id: number,
  date: string,
  liked: boolean,
  likes: number,
  parentId: number | null,
  reference: any,
  setReplyTo: React.Dispatch<React.SetStateAction<IReplyTo>>,
  windowSize: number,
}


export const Comment: React.FC<IComment> = ({ text, name, id, date, liked, likes, parentId, reference, setReplyTo, windowSize }) => {
  const comments = useSelector((state: TRootState) => selectCommentsByParent(state, id));
  const dispatch = useDispatch();
  const textareaRefference = useRef<any>(null);

  const [editedText, setEditedText] = useState<string>(text);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  useEffect(() => {
    textareaRefference.current.style.height = '29px';
    textareaRefference.current.style.height = `${textareaRefference.current.scrollHeight}px`;
  }, [windowSize])


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

  const resize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = '29px';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  const handleLike = () => {
    liked ? dispatch(unlikeComment(id)) : dispatch(likeComment(id))
  }

  const handleEditText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    resize(event);
    setEditedText(event.target.value);
    dispatch(editComment({ id: id, text: event.target.value, name: name, parentId: parentId }))
  }

  const handleReplyClick = () => {
    reference.current?.focus();
    setReplyTo({ replyToId: id, replyToName: name });
  }

  const handleEditButton = () => {
    textareaRefference.current.disabled = false;
    setIsMenuExpanded(false);
  }

  const handleDeleteButton = () => {
    dispatch(deleteComment(id));
  }

  return (
    <article className='comment'>
      <div className='comment__container'>
        <div className='comment__image-container'>
          <img src={getImage()} alt="user" className={`comment__image${name === 'Laurel Fisher' ? ' comment__image--laurel' : ''}`} />
        </div>
        <div className="comment__content">
          <header className='comment__header'>
            <h2 className='comment__name text-big'>{name}{name === 'Ellie Alvaz' ? ' (You)' : ''}</h2>
            <span className='comment__date text-tiny'>{moment(date).fromNow()}</span>
          </header>
          <textarea onChange={handleEditText} className="text-regular comment__text" disabled={true} ref={textareaRefference} value={editedText}></textarea>
        </div>
        <div className='comment__menu'>
          <button className='comment__menu-button' onClick={() => setIsMenuExpanded(prev => !prev)} aria-expanded={isMenuExpanded} aria-label="show additional options">
            <Dots />
          </button>
          <div className='comment__dropdown' aria-hidden={!isMenuExpanded}>
            <button className='comment__dropdown-button' onClick={handleEditButton} aria-label="edit comment">
              <Edit className="comment__dropdown-icon" />
              <span className='text-small'>Edit</span>
            </button>
            <button className='comment__dropdown-button' onClick={handleDeleteButton} aria-label="delete comment">
              <Trash className="comment__dropdown-icon" />
              <span className='text-small'>Delete</span>
            </button>
          </div>
        </div>
        <div className="comment__bottom-menu">
          <div className={`comment__like-container${liked ? ' comment__liked' : ''}`}>
            <button className='comment__button comment__button--like' onClick={handleLike} aria-label="like or unlike comment">
              <Like className='comment__icon comment__icon--like' />
            </button>
            <span className='text-small comment__likes'>{likes}</span>
          </div>
          <button onClick={handleReplyClick} className='comment__button comment__button--reply' aria-label="reply to this comment">
            <Reply className="comment__icon comment__icon--reply" />
            <span className='text-small comment__reply'>Reply</span>
          </button>
        </div>
      </div>
      {comments.length > 0 ?
        <div className='comment__nested'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
              name={comment.name}
              id={comment.id}
              date={comment.date}
              liked={comment.liked}
              likes={comment.likes}
              parentId={comment.parentId}
              reference={reference}
              setReplyTo={setReplyTo}
              windowSize={windowSize}
            />
          ))}
        </div>
        : null}
    </article>
  )
}