import React, { useReducer } from 'react';

const initialState = {
	active_tab: 0,
	loading: false,
	data: [],
	openEdit: false
};

const StateContext = React.createContext();

const StateProvider = ({ children }) => {

	const setLoading = (value) => {
		dispatch({ type: 'set-loading', payload: { loading: value } })
	}
	const setData = (value) => {
		dispatch({ type: 'set-data', payload: { data: value } })
	}
	const setEditModal = (value) => {
		dispatch({ type: 'set-edit-modal', payload: { openEdit: value } })
	}



	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'set-tab':
				return { ...state, active_tab: action.payload.active_tab };
			case 'set-loading':
				return { ...state, loading: action.payload.loading };
			case 'set-data':
				return { ...state, data: action.payload.data };

			case 'set-edit-modal':
				return { ...state, openEdit: action.payload.openEdit }
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
				setData,
				setEditModal
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export { StateProvider, StateContext };
