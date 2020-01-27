import React, { useReducer } from 'react';

const initialState = {
	active_tab: 0
};

const StateContext = React.createContext();

const StateProvider = ({ children }) => {
	// 	dispatch({ type: 'LOADING', payload: { loading: val } });

	const [ state, dispatch ] = useReducer((state, action) => {
		switch (action.type) {
			case 'set-tab':
				return { ...state, active_tab: action.payload.active_tab };
			default:
				return null;
		}
	}, initialState);

	return (
		<StateContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export { StateProvider, StateContext };
