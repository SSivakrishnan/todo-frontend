import { createSlice } from '@reduxjs/toolkit'

const accountStore = createSlice({
    name: 'account',
    initialState:{
        userDetails: null
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.userDetails = payload
        },
        updateUser: (state, {payload}) => {
            state.userDetails[payload.key] = payload.value
        }
        }
})

export const { updateUser, setUser } =  accountStore.actions

export default accountStore.reducer