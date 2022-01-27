import { createContext, useContext, useReducer } from 'react'
import { PAYMENT_METHODS, TENDER_OPTIONS, TRANSACTIONS } from '../config'

const RegisterContext = createContext()

export const useRegister = () => useContext(RegisterContext)

// TODO's:
// - disable payment methods when payment amount is enetered or exact amount checkbox is checked --done
// - add radio options for payment amounts [exact / 25c / 50c / 1 / 5 / 10 / 20 / other] and disable option if less than amount --done
// - when exact amount is checked, autocomplete paynment amount input with transaction amount
// - do NOT show tender amounts with values when a payment method cannot use it - add flags to payment methods
// - show "Finalizar Transacccion" button when all steps are done
// - add cancel buttons next to each step to cancel the step
// - Only show steps 3 & 4 for positive transactions

export const ACTIONS = {
	SET_TRANSACTION: 'SET_TRANSACTION',
	UPDATE_TRANSACTION_AMOUNT: 'UPDATE_TRANSACTION_AMOUNT',
	SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
	UPDATE_PAYMENT_AMOUNT: 'UPDATE_PAYMENT_AMOUNT',
	SET_TENDER_OPTION: 'SET_TENDER_OPTION',
}

const initialState = {
	isTransactionSelected: false,
	isSetTransactionAmount: false,
	isPaymentMethodSelected: false,
	transactions: TRANSACTIONS,
	selectedTransaction: null,
	transactionPaymentMethods: null,
	paymentMethods: PAYMENT_METHODS,
	selectedPaymentMethod: null,
	tenderOptions: TENDER_OPTIONS,
	paymentMethodTenders: null,
	selectedTenderOption: TENDER_OPTIONS.find(({ id }) => id === 'other'),
}

const reducer = (state, { type, payload }) => {
	console.log({ type, payload })

	switch (type) {
		case ACTIONS.SET_TRANSACTION: {
			const { icon, ...transaction } = payload
			return {
				...state,
				isTransactionSelected: true,
				isSetTransactionAmount: false,
				selectedTransaction: { ...transaction },
				transactionPaymentMethods: state.paymentMethods.filter(({ id }) =>
					transaction?.paymentMethodIds?.includes(id)
				),
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
			const { icon, ...paymentMethod } = payload
			const tenders =
				paymentMethod.tenderAmountsIds === 1
					? [...state.tenderOptions]
					: state.tenderOptions.filter(({ id }) =>
							paymentMethod?.tenderAmountsIds?.includes(id)
					  )
			return {
				...state,
				isPaymentMethodSelected: true,
				selectedPaymentMethod: { ...paymentMethod },
				transactions: state.transactions.map(item => ({
					...item,
					disabled: true,
					disabledChecked: item.id === state.selectedTransaction.id,
				})),
				paymentMethodTenders: tenders.map(option => {
					if (
						'value' in option &&
						option.value < state.selectedTransaction.amount
					) {
						option.disabled = true
					}
					return option
				}),
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
				transactionPaymentMethods: state.transactionPaymentMethods.map(
					item => ({
						...item,
						disabled: true,
						disabledChecked: item.id === state.selectedPaymentMethod.id,
					})
				),
			}
		}
		case ACTIONS.SET_TENDER_OPTION: {
			return {
				...state,
				selectedTenderOption: payload,
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
