import React from 'react'
import { useSelector } from 'react-redux';
import { selectCommentsByParent, TRootState } from '@/modules/HomeModule/stores/store';
import { Comment } from './Comment/Comment';
import './Comments.scss';

interface IComments {
  sorting: string
}

export const Comments: React.FC<IComments> = ({ sorting }) => {
  const comments = useSelector((state: TRootState) => selectCommentsByParent(state, null)).sort((a, b) => {
    if (sorting === 'date') {
      return b.date.getTime() - a.date.getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  return (
    <div className='comments'>
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
        />
      ))}
    </div>
  )
}