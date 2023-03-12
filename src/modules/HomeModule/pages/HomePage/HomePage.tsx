import React, { useState } from "react";
import { Header } from "../../components/HomePageComponents/Header/Header";
import { Comments } from "../../components/HomePageComponents/Comments/Comments"
import { AddComment } from "../../components/HomePageComponents/AddComment/AddComment";
import "./HomePage.scss";


export const HomePage: React.FC = () => {
  const [sorting, setSorting] = useState<string>('date');

  return (
    <div className="container">
      <AddComment />
      <Header setSorting={setSorting} />
      <Comments sorting={sorting} />
    </div>
  );
};
