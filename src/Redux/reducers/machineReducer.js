const reducer = (state = {}, action) => {
    switch (action.type) {
        case "MACHINES": {
            return { ...state, machineData: action.data }
        }
        case "CURR_MACHINE": {
            return { ...state, currentMachine: action.data }
        }
        default: {
            return state;
        }
    }
}
export default reducer;