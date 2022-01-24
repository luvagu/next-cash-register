import { createContext, useContext, useReducer } from 'react'

const RegisterContext = createContext()

export const useRegister = () => useContext(RegisterContext)

export const ACTIONS = {
	SELECT_TRANSACTION: 'SELECT_TRANSACTION',
	UPDATE_TRANSACTION_VALUE: 'UPDATE_TRANSACTION_VALUE',
	SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
}

const initialState = {
	isTransactionSelected: false,
	isSetTransactionAmount: false,
	isPaymentMethodSelected: false,
	transaction: null,
	paymentMethod: null,
}

const reducer = (state, { type, payload }) => {
	console.log({ type, payload })
	switch (type) {
		case ACTIONS.SELECT_TRANSACTION: {
			return {
				...state,
				isTransactionSelected: true,
				isSetTransactionAmount: false,
				transaction: payload,
			}
		}
		case ACTIONS.UPDATE_TRANSACTION_VALUE: {
			return {
				...state,
				isSetTransactionAmount: payload.amount > 0,
				transaction: {
					...state.transaction,
					...payload,
				},
				paymentMethod: null,
			}
		}
		case ACTIONS.SET_PAYMENT_METHOD: {
			return {
				...state,
				isPaymentMethodSelected: true,
				paymentMethod: payload,
			}
		}
		default:
			return state
	}
}

function RegisterProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<RegisterContext.Provider value={{ state, dispatch }}>
			{children}
		</RegisterContext.Provider>
	)
}

export default RegisterProvider
