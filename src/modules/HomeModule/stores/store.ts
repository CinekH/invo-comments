import { configureStore, createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
    IUserComment,
    IComment,
    IUserExistingComment,
} from "../types/comments.types";
import { initialComments } from "./initialComments";

interface ICommentSliceState {
    comments: IComment[];
}

const initialState: ICommentSliceState = {
    comments: [...initialComments],
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState: { ...initialState, nextIndex: 3 },
    reducers: {
        addNewComment: (state, action: PayloadAction<IUserComment>) => {
            state.comments = [
                ...state.comments,
                {
                    id: state.nextIndex,
                    name: action.payload.name,
                    parentId: action.payload.parentId,
                    text: action.payload.text,
                    date: new Date().toString(),
                    likes: 0,
                    liked: false,
                },
            ];
            state.nextIndex = state.nextIndex + 1;
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
                        ? {
                              ...comment,
                              text: action.payload.text,
                          }
                        : { ...comment }
                ),
            ];
        },

        deleteComment: (state, action: PayloadAction<number>) => {
            state.comments = [
                ...state.comments.filter(
                    (comment) => comment.id !== action.payload
                ),
            ];
            state.nextIndex = state.nextIndex - 1;
        },
    },
});

export const {
    addNewComment,
    deleteComment,
    editComment,
    likeComment,
    unlikeComment,
} = commentsSlice.actions;

const store = configureStore({
    reducer: {
        comments: commentsSlice.reducer,
    },
});

export type TRootState = ReturnType<typeof store.getState>;

//export const selectComments = (state: TRootState) => state.comments.comments;

export const selectCommentsByParent = (
    state: TRootState,
    parentId: number | null
) => state.comments.comments.filter((comment) => comment.parentId === parentId);

export default store;
