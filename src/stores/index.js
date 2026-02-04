import { configureStore } from '@reduxjs/toolkit'
import accountStore from './accountStore.js'
import noteStore from './noteStore.js'

export const store = configureStore({
    reducer: {
        account: accountStore,
        note: noteStore
    }
})

