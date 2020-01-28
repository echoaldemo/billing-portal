import React, { useReducer } from 'react';

const initialState = {
	active_tab: 0,
	loading: false,
	data: []
};

const StateContext = React.createContext();

const StateProvider = ({ children }) => {
	// 	dispatch({ type: 'LOADING', payload: { loading: val } });

	const setLoading = (value) => {
		dispatch({ type: 'set-loading', payload: { loading: value } })
	}
	const setData = (value) => {
		dispatch({ type: 'set-data', payload: { data: value } })
	}


	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'set-tab':
				return { ...state, active_tab: action.payload.active_tab };
			case 'set-loading':
				return { ...state, loading: action.payload.loading };
			case 'set-data':
				return { ...state, data: action.payload.data };
			default:
				return null;
		}
	}, initialState);

	return (
		<StateContext.Provider
			value={{
				state,
				dispatch,
				setLoading,
				setData
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export { StateProvider, StateContext };
