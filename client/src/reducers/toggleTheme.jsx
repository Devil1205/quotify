const updateLocalStorageTheme = (state)=>{
    localStorage.setItem('isDark',state.toString());
    console.log(localStorage.getItem('isDark'))
}
const inititalState = localStorage.getItem('isDark')===null?false:JSON.parse(localStorage.getItem('isDark'));
const isDark = (state = inititalState, action)=>{
    switch(action.type)
    {
        case "toggleTheme": {
            updateLocalStorageTheme(!state);
            return !state;
        }
        default: {
            return state;
        }
    }
}

export default isDark