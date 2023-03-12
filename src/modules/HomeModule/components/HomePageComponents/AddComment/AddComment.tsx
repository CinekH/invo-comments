import React, { FormEvent, useRef, useState } from 'react'
import './AddComment.scss';
import { addNewComment } from '@/modules/HomeModule/stores/store';
import { useDispatch } from 'react-redux';

import user1 from '../../../../../assets/images/user1.png';

export const AddComment: React.FC = () => {
    const [commentText, setCommentText] = useState<string>('');
    const textareaRef = useRef<any>(null);
    const dispatch = useDispatch();

    const resize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = '29px';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        resize(event);
        setCommentText(event.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addNewComment({
            name: 'Ellie Alvaz',
            text: commentText,
            parentId: null,
        }));
        setCommentText('');
    }

    return (
        <div className={`add-comment${commentText !== '' ? ' add-comment--outline' : ''}`} onClick={() => textareaRef.current?.focus() }>
            <img src={user1} className='add-comment__image' />
            <form className='add-comment__form' action="#" onSubmit={handleSubmit}>
                <textarea ref={textareaRef} className='add-comment__textarea' placeholder='Add comment...' onChange={handleChange} value={commentText}>
                </textarea>
                {commentText.length > 1 ? <button type='submit' className='add-comment__submit'>Submit</button> : null}
            </form>
        </div>
    )
}