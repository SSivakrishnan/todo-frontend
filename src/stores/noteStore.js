import { createSlice } from '@reduxjs/toolkit'

const noteStore = createSlice({
    name: 'note',
    initialState:{
        list: { }
    },
    reducers: {
        setNotes: (state, {payload}) => {
            state.list = payload
        }
        }
})

export const { setNotes } =  noteStore.actions

export default noteStore.reducer