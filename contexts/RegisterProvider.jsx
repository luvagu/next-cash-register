import { createContext, useContext, useReducer } from 'react'
import { PAYMENT_METHODS, TENDER_AMOUNTS, TRANSACTIONS } from '../config'

const RegisterContext = createContext()

export const useRegister = () => useContext(RegisterContext)

// TODO's:
// - disable payment methods when payment amount is enetered or exact amount checkbox is checked
// - add radio options for payment amounts [exact / 25c / 50c / 1 / 5 / 10 / 20 / other] and disable option if less than amount
// - enable exact amount checkbox option to autopopulate payment amount with transaction amount
// - show "Finalizar Transacccion" button when all steps are done
// - add cancel buttons next to each step to cancel the step
// - Only show steps 3 & 4 for positive transactions

export const ACTIONS = {
	SET_TRANSACTION: 'SET_TRANSACTION',
	UPDATE_TRANSACTION_AMOUNT: 'UPDATE_TRANSACTION_AMOUNT',
	SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
	UPDATE_PAYMENT_AMOUNT: 'UPDATE_PAYMENT_AMOUNT',
}

const initialState = {
	isTransactionSelected: false,
	isSetTransactionAmount: false,
	isPaymentMethodSelected: false,
	transactions: TRANSACTIONS,
	selectedTransaction: null,
	paymentMethods: PAYMENT_METHODS,
	selectedPaymentMethod: null,
	denominations: TENDER_AMOUNTS,
}

const reducer = (state, { type, payload }) => {
	console.log({ type, payload })

	switch (type) {
		case ACTIONS.SET_TRANSACTION: {
			const { id, name, operation } = payload
			return {
				...state,
				isTransactionSelected: true,
				isSetTransactionAmount: false,
				selectedTransaction: { id, name, operation },
			}
		}
		case ACTIONS.UPDATE_TRANSACTION_AMOUNT: {
			const { amount } = payload
			return {
				...state,
				isSetTransactionAmount: amount > 0,
				selectedTransaction: {
					...state.selectedTransaction,
					amount,
				},
				selectedPaymentMethod: null,
			}
		}
		case ACTIONS.SET_PAYMENT_METHOD: {
			const { id, name } = payload
			return {
				...state,
				isPaymentMethodSelected: true,
				selectedPaymentMethod: { id, name },
				transactions: state.transactions.map(item => ({
					...item,
					disabled: true,
					disabledChecked: item.id === state.selectedTransaction.id,
				})),
			}
		}
		case ACTIONS.UPDATE_PAYMENT_AMOUNT: {
			const { amount } = payload
			return {
				...state,
				selectedPaymentMethod: {
					...state.selectedPaymentMethod,
					amount,
				},
				paymentMethods: state.paymentMethods.map(item => ({
					...item,
					disabled: true,
					disabledChecked: item.id === state.selectedPaymentMethod.id,
				})),
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
