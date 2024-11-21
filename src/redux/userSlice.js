import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    wishlist: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.userList = action.payload.map(user => ({
        ...user,
        website: user.website.startsWith('http')
          ? user.website
          : `https://${user.website}`,
      }));
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(user => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const index = state.userList.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        const updatedUser = {
          ...action.payload,
          website: action.payload.website.startsWith('http')
            ? action.payload.website
            : `https://${action.payload.website}`,
        };
        state.userList[index] = updatedUser;
      }
    },
  },
});

export const { setUsers, addToWishlist, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
