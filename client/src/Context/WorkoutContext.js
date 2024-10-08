import { createContext, useReducer } from "react";
// 1st
export const WorkoutContext = createContext();


// 3rd
export const WorkoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':
            return {
                workouts: state.workouts.map((w) => w._id === action.payload._id? action.payload : w)
            }
        default:
            return state;
    }
}


// 2nd + import it at <App/>  
export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
} 