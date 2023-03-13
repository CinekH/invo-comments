import React, { FormEvent, useState } from 'react'
import './AddComment.scss';
import { addNewComment } from '@/modules/HomeModule/stores/store';
import { useDispatch } from 'react-redux';

import user1 from '../../../../../assets/images/user1.png';

interface IReplyTo {
    replyToName: string | null,
    replyToId: number | null
}

interface IAddComment {
    replyTo: IReplyTo,
    setReplyTo: React.Dispatch<React.SetStateAction<IReplyTo>>,
    reference: any,
}

export const AddComment: React.FC<IAddComment> = ({ replyTo, setReplyTo, reference }) => {
    const [commentText, setCommentText] = useState<string>('');
    const dispatch = useDispatch();


    //resizing textarea just like in Comment component
    const resize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = '29px';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        resize(event);
        setCommentText(event.target.value);
    }


    //dispatch add new comment action when user submits form
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addNewComment({
            name: 'Ellie Alvaz',
            text: commentText,
            parentId: replyTo.replyToId,
        }));
        setCommentText('');
        setReplyTo({ replyToId: null, replyToName: null });
    }

    return (
        <div className={`add-comment${commentText !== '' ? ' add-comment--outline' : ''}`} onClick={() => reference.current?.focus()}>
            <img src={user1} className='add-comment__image' />
            <p className="add-comment__reply">{replyTo.replyToName !== null ? <><span className='text-tiny add-comment__reply-text'>Reply to <span className='text-small'>{replyTo.replyToName}</span></span></> : ''}</p>
            <form className='add-comment__form' action="#" onSubmit={handleSubmit}>
                <textarea aria-label="type your comment herer" ref={reference} className='add-comment__textarea' placeholder='Add comment...' onChange={handleChange} value={commentText}>
                </textarea>
                {commentText.length > 1 ? <button aria-label="submit new comment" type='submit' className='add-comment__submit'>Submit</button> : null}
            </form>
        </div>
    )
}