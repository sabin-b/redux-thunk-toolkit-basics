import { createSlice } from '@reduxjs/toolkit';

// ! customer accounts creation
// const customerInitialState = {
//   fullName: '',
//   nationalityId: '',
//   createdAt: '',
// };

// export default function customerReducer(state = customerInitialState, action) {
//   switch (action.type) {
//     case 'customer/create':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalityId: action.payload.nationalityId,
//         createdAt: action.payload.createdAt,
//       };
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// // ! action creators

// export function create(fullName) {
//   return {
//     type: 'customer/create',
//     payload: {
//       fullName: fullName,
//       nationalityId: v4().slice(0, 10).toString(),
//       createdAt: new Date().toLocaleString(),
//     },
//   };
// }

// export function updateName(name) {
//   return {
//     type: 'customer/updateName',
//     payload: name,
//   };
// }

// new one
const customerInitailState = {
  fullName: '',
  createdAt: '',
  nationalId: '',
};

// export function customerReducer(state = customerInitailState, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case 'customer/updateCustomer':
//       return {
//         ...state,
//         fullName: action.payload,
//       };

//     default:
//       return state;
//   }
// }
// // customer actions
// export function createCustomer(fullName) {
//   return {
//     type: 'customer/createCustomer',
//     payload: {
//       fullName,
//       nationalId: uuid().toString().slice(0, 20),
//       createdAt: Date.now().toString(),
//     },
//   };
// }

// export function updateCustomer(fullName) {
//   return {
//     type: 'customer/updateCustomer',
//     payload: fullName,
//   };
// }

const customer = createSlice({
  name: 'customer',
  initialState: customerInitailState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = new Date().toISOString();
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateCustomer } = customer.actions;

export const customerReducer = customer.reducer;
