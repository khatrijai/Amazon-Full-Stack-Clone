
export const initialState = {
  basket: [],
  userEmail: "Guest",
};





const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REFRESH":
      return {
        ...state,
        basket: action.item
      };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((pdt) => pdt.id !== action.item),
      };

    case "USER_SIGN_IN":
      return {
        ...state,
        userEmail: action.userInfo ,
        basket : action.basket
      };

    case "USER_SIGN_OUT":
      return {
        ...state,
        userEmail: action.userInfo,
        basket:[],
      };

    default:
      return state;
  }
};

export default reducer;
