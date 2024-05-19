import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state
const initialState = {
  list: [],
};


// const listReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       return {
//         ...state,
//         list: [...state.list, action.payload],
//       };
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         list: state.list.filter(item => item.id !== action.payload.id),
//       };
    
//     default:
//       return state;
//   }
// };

// const listReducer = (state, action) => {
// switch (action.type) {
//     case 'ADD_ITEM':
//       const newStateAfterAdd = {
//         ...state,
//         list: [...state.list, action.payload],
//       };
//       localStorage.setItem('list', JSON.stringify(newStateAfterAdd.list)); // Save updated state
//       return newStateAfterAdd;
//     case 'REMOVE_ITEM':
//       const newStateAfterRemove = {
//         ...state,
//         list: state.list.filter(item => item.id !== action.payload.id),
//       };
//       localStorage.setItem('list', JSON.stringify(newStateAfterRemove.list)); // Save updated state
//       return newStateAfterRemove;
//     case 'LOAD_LIST':
//       return {
//         ...state,
//         list: action.payload,
//       };
//     default:
//       return state;
//   }
// }





// const listReducer = (state, action) => {
//     switch (action.type) {
//       case 'ADD_ITEM':
//         const newStateAfterAdd = {
//           ...state,
//           list: [...state.list, action.payload],
//         };
//         localStorage.setItem('list', JSON.stringify(newStateAfterAdd.list)); // Save updated state
//         return newStateAfterAdd;
//       case 'REMOVE_ITEM':
//         const newStateAfterRemove = {
//           ...state,
//           list: state.list.filter(item => item.id !== action.payload), // Check for item id match
//         };
//         localStorage.setItem('list', JSON.stringify(newStateAfterRemove.list)); // Save updated state
//         return newStateAfterRemove;
//       case 'LOAD_LIST':
//         return {
//           ...state,
//           list: action.payload,
//         };

//       default:
//         return state;
//     }
//   };





const listReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const newItem = {
          ...action.payload,
          startDate: '',
          endDate: '',
        };
        const newStateAfterAdd = {
          ...state,
          list: [...state.list, newItem],
        };
        localStorage.setItem('list', JSON.stringify(newStateAfterAdd.list));
        return newStateAfterAdd;
  
      case 'REMOVE_ITEM':
        const newStateAfterRemove = {
          ...state,
          list: state.list.filter(item => item.id !== action.payload),
        };
        localStorage.setItem('list', JSON.stringify(newStateAfterRemove.list));
        return newStateAfterRemove;
  
      case 'UPDATE_DATE':
        const { itemId, field, value } = action.payload;
        const updatedList = state.list.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              [field]: value,
            };
          }
          return item;
        });
        const newStateAfterUpdate = {
          ...state,
          list: updatedList,
        };
        localStorage.setItem('list', JSON.stringify(newStateAfterUpdate.list));
        return newStateAfterUpdate;
  
      case 'LOAD_LIST':
        return {
          ...state,
          list: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  



// Create the context
const ListContext = createContext();

// Create the ListProvider component
export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

// Custom hook for accessing the context
export const useList = () => useContext(ListContext);
