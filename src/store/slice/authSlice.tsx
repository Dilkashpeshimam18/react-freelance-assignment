import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type AuthType = {
    isAuthenticated: boolean,
    user: {
        email: string | null,
        uid: string | null,
    },

}

const initialAuthState: AuthType = {
    isAuthenticated: localStorage.getItem('userUID') ? true : false,

    user: {
        email: localStorage.getItem('userEmail') || '',
        uid: localStorage.getItem('userUID') || null
    },

}
const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        addUserDetail(state, action: PayloadAction<any>) {
            state.user = action.payload
            state.isAuthenticated = true
        },
        removeUserDetail(state) {
            state.user.email = ''
            state.user.uid = null
            state.isAuthenticated = false
        },
    }
})

export const authActions = AuthSlice.actions
export default AuthSlice.reducer