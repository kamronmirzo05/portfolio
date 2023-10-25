import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MoviesReducer } from "./Slice";

export const store = configureStore({
    reducer: {
        movies: MoviesReducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;