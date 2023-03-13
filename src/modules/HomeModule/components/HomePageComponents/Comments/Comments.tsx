import React from 'react'
import { useSelector } from 'react-redux';
import { selectCommentsByParent, TRootState } from '@/modules/HomeModule/stores/store';
import { Comment } from './Comment/Comment';
import './Comments.scss';

interface IComments {
  sorting: string,
  reference: any,
  setReplyTo: React.Dispatch<React.SetStateAction<IReplyTo>>,
  windowSize: number
}

interface IReplyTo {
  replyToName: string | null,
  replyToId: number | null
}

export const Comments: React.FC<IComments> = ({ sorting, reference, setReplyTo, windowSize }) => {
  //get all root comments
  const comments = useSelector((state: TRootState) => selectCommentsByParent(state, null)).sort((a, b) => {
    if (sorting === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });
  
//then render them
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
          reference={reference}
          setReplyTo={setReplyTo}
          windowSize={windowSize}
        />
      ))}
    </div>
  )
}