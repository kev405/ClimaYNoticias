// Const
const initialData = {
    city: ""
};
const CIUDAD_SELECCIONADA = "CIUDAD_SELECCIONADA"

// Reducer
export default function cityReducer(state = initialData, action){
    switch(action.type){
        case CIUDAD_SELECCIONADA:
            return {city: action.payload}
        default:
            return state
    }
}

//actions

export const getCitySelected = (citySelected) => (dispatch, getState) => {
    console.log(citySelected)
    dispatch({
        type: CIUDAD_SELECCIONADA,
        payload: citySelected
    })
}