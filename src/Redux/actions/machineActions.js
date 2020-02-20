
const getMachines = (data) => {
    
    return {
        type: "MACHINES",
        data
    }
}

const getCurrentMachine = (data) => {

    return {
        type: "CURR_MACHINE",
        data
    }
}


export {
    getMachines,
    getCurrentMachine
}