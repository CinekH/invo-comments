import React, { useState, useRef } from "react";
import { Header } from "../../components/HomePageComponents/Header/Header";
import { Comments } from "../../components/HomePageComponents/Comments/Comments"
import { AddComment } from "../../components/HomePageComponents/AddComment/AddComment";
import "./HomePage.scss";

interface IReplyTo {
  replyToName: string | null,
  replyToId: number | null;
}


export const HomePage: React.FC = () => {
  const [sorting, setSorting] = useState<string>('date');
  const [replyTo, setReplyTo] = useState<IReplyTo>({ replyToName: null, replyToId: null })
  const textareaRef = useRef<any>(null);

  return (
    <div className="container">
      <AddComment replyTo={replyTo} setReplyTo={setReplyTo} reference={textareaRef}/>
      <Header setSorting={setSorting} />
      <Comments sorting={sorting} reference={textareaRef} setReplyTo={setReplyTo}/>
    </div>
  );
};
