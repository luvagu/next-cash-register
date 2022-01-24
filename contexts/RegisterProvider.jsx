import { createContext, useContext, useReducer } from 'react'
import { PAYMENT_METHODS, TRANSACTIONS } from '../config'

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
	transactions: TRANSACTIONS,
	selectedTransaction: null,
	paymentMethods: PAYMENT_METHODS,
	selectedPaymentMethod: null,
}

const reducer = (state, { type, payload }) => {
	console.log({ type, payload })
	switch (type) {
		case ACTIONS.SELECT_TRANSACTION: {
			return {
				...state,
				isTransactionSelected: true,
				isSetTransactionAmount: false,
				selectedTransaction: payload,
			}
		}
		case ACTIONS.UPDATE_TRANSACTION_VALUE: {
			return {
				...state,
				isSetTransactionAmount: payload.amount > 0,
				selectedTransaction: {
					...state.selectedTransaction,
					...payload,
				},
				selectedPaymentMethod: null,
			}
		}
		case ACTIONS.SET_PAYMENT_METHOD: {
			return {
				...state,
				isPaymentMethodSelected: true,
				selectedPaymentMethod: payload,
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
