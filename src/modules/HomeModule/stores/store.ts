import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUserComment, IComment, IUserExistingComment } from "../types/comments.types";
import { initialComments } from "./initialComments";

interface ICommentSliceState {
    comments: IComment[];
}

const initialState: ICommentSliceState = {
    comments: [...initialComments],
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addNewComment: (state, action: PayloadAction<IUserComment>) => {
            state.comments = [
                ...state.comments,
                {
                    id: state.comments.length,
                    name: action.payload.name,
                    text: action.payload.text,
                    date: new Date(),
                    likes: 0,
                    liked: false,
                    comments: [],
                },
            ];
        },
        
        addNestedComment: (
            state,
            action: PayloadAction<IUserExistingComment>
        ) => {
            state.comments = [
                ...state.comments.map((comment) =>
                    comment.id === action.payload.id
                        ? {
                              ...comment,
                              comments: [
                                  ...comment.comments,
                                  action.payload.id,
                              ],
                          }
                        : { ...comment }
                ),
                {
                    id: state.comments.length,
                    name: action.payload.name,
                    text: action.payload.text,
                    date: new Date(),
                    likes: 0,
                    liked: false,
                    comments: [],
                },
            ];
        },

        likeComment: (state, action: PayloadAction<number>) => {
            state.comments = [
                ...state.comments.map((comment) =>
                    comment.id === action.payload
                        ? { ...comment, liked: true, likes: comment.likes + 1 }
                        : { ...comment }
                ),
            ];
        },

        unlikeComment: (state, action: PayloadAction<number>) => {
            state.comments = [
                ...state.comments.map((comment) =>
                    comment.id === action.payload
                        ? { ...comment, liked: false, likes: comment.likes - 1 }
                        : { ...comment }
                ),
            ];
        },

        editComment: (state, action: PayloadAction<IUserExistingComment>) => {
            state.comments = [
                ...state.comments.map((comment) =>
                    comment.id === action.payload.id
                        ? { ...comment, text: action.payload.text }
                        : { ...comment }
                ),
            ];
        },

        deleteComment: (state, action: PayloadAction<number>) => {
            state.comments = [
                ...state.comments
                    .filter((comment) => comment.id !== action.payload)
                    .map((comment) => ({ ...comment, comments: comment.comments.filter((commentId) => commentId !== action.payload)})),
            ];
        },
    },
});

export const { addNewComment, addNestedComment, deleteComment, editComment, likeComment, unlikeComment } = commentsSlice.actions;

const store = configureStore({
    reducer: {
        comments: commentsSlice.reducer,
    },
});

type TRootState = ReturnType<typeof store.getState>;

export const selectComments = (state: TRootState) => state.comments.comments;

export default store;
