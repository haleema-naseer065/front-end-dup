import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    token: string;
    userData:any;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token:string , userData:any}>) {
      state.isAuthenticated = true;
      console.log('tpken',action.payload.token,action?.payload?.userData)
      state.user = { token: action.payload.token, userData: action.payload.userData };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
