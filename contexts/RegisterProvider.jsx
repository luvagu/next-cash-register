import { createContext, useContext, useReducer } from 'react'
import { PAYMENT_METHODS, TENDER_OPTIONS, TRANSACTIONS } from '../config'

const RegisterContext = createContext()

export const useRegister = () => useContext(RegisterContext)

// TODO's:
// - disable payment methods when payment amount is enetered or exact amount checkbox is checked --done
// - add radio options for payment amounts [exact / 25c / 50c / 1 / 5 / 10 / 20 / other] and disable option if less than amount --done
// - when exact amount is checked, autocomplete paynment amount input with transaction amount --done
// - when transaction amount is greater that tender amounts, disable tender amount(s) --done
// - enable "Finalizar" button when all steps are done --done
// - add edit buttons next to each step to edit the step --done
// - Only show steps 3 & 4 for positive transactions --done

export const ACTIONS = {
	SET_TRANSACTION: 'SET_TRANSACTION',
	UPDATE_TRANSACTION_AMOUNT: 'UPDATE_TRANSACTION_AMOUNT',
	SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
	UPDATE_PAYMENT_AMOUNT: 'UPDATE_PAYMENT_AMOUNT',
	SET_TENDER_OPTION: 'SET_TENDER_OPTION',
	EDIT_TRANSACTION_AMOUNT: 'EDIT_TRANSACTION_AMOUNT',
	EDIT_PAYMENT_METHOD: 'EDIT_PAYMENT_METHOD',
	RESET_TRANSACTION: 'RESET_TRANSACTION',
	SAVE_TRANSACTION: 'SAVE_TRANSACTION',
}

function isNegative(operation) {
	return operation === '-' ? true : false
}

export function isTransactionReady(transaction) {
	if (transaction?.isNegative && transaction?.amount) return true

	if (transaction?.paymentAmount >= transaction?.amount) return true

	return false
}

const TRANSACTION_TEMPLATE = {
	color: undefined,
	name: undefined,
	amount: undefined,
	paymentMethod: undefined,
	paymentAmount: undefined,
	change: undefined,
	ts: undefined,
	isNegative: false,
	status: 'pending',
}

const DEFAULT_TENDER_OPTION = TENDER_OPTIONS.find(({ id }) => id === 'other')

const DEFAULT_PAYMENT_METHOD_NAME = PAYMENT_METHODS.find(
	({ id }) => id === 'cash'
).name

const initialState = {
	isTransactionSelected: false,
	isSetTransactionAmount: false,
	isSetPaymentAmount: false,
	isPaymentMethodSelected: false,
	transactions: TRANSACTIONS.slice(),
	selectedTransaction: null,
	transactionPaymentMethods: null,
	paymentMethods: PAYMENT_METHODS.slice(),
	selectedPaymentMethod: null,
	tenderOptions: TENDER_OPTIONS.slice(),
	paymentMethodTenders: null,
	selectedTenderOption: { ...DEFAULT_TENDER_OPTION },
	transaction: { ...TRANSACTION_TEMPLATE },
	doneTransactions: [],
}

const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTIONS.SET_TRANSACTION: {
			const { color, name, amount, operation } = payload

			return {
				...state,
				isTransactionSelected: true,
				isSetTransactionAmount: false,
				selectedTransaction: payload,
				transactionPaymentMethods: state.paymentMethods.filter(({ id }) =>
					payload?.paymentMethodIds?.includes(id)
				),
				transaction: {
					...state.transaction,
					color,
					name,
					amount,
					change: undefined,
					isNegative: isNegative(operation),
				},
			}
		}
		case ACTIONS.UPDATE_TRANSACTION_AMOUNT: {
			const { amount } = payload
			const { id, operation } = state.selectedTransaction

			return {
				...state,
				isSetTransactionAmount: amount > 0,
				selectedPaymentMethod: null,
				transactions: state.transactions.map(item => ({
					...item,
					disabled: true,
					disabledChecked: item.id === id,
				})),
				transaction: {
					...state.transaction,
					amount: isNegative(operation) ? -amount : amount,
					paymentMethod: isNegative(operation)
						? DEFAULT_PAYMENT_METHOD_NAME
						: undefined,
					change: isNegative(operation) ? -amount : undefined,
				},
			}
		}
		case ACTIONS.SET_PAYMENT_METHOD: {
			const tenders =
				payload.tenderAmountsIds === 1
					? [...state.tenderOptions]
					: state.tenderOptions.filter(({ id }) =>
							payload?.tenderAmountsIds?.includes(id)
					  )
			const activeTenders = tenders.map(option => {
				if (
					option?.value !== undefined &&
					option?.value < state.transaction.amount
				) {
					option.disabled = true
				}
				return option
			})

			// const isOnlyExact =
			// 	state.selectedTransaction?.paymentMethodIds?.length === 1 &&
			// 	state.selectedTransaction?.paymentMethodIds[0] === 'card' &&
			// 	tenders.length === 1 &&
			// 	tenders[0].id === 'exact'

			return {
				...state,
				isPaymentMethodSelected: true,
				selectedPaymentMethod: payload,
				paymentMethodTenders: activeTenders,
				// selectedTenderOption: isOnlyExact
				// 	? tenders[0]
				// 	: state.selectedTenderOption,
				transaction: {
					...state.transaction,
					paymentMethod: payload.name,
					// paymentAmount: isOnlyExact ? state.transaction.amount : undefined,
					// change: 0,
				},
			}
		}
		case ACTIONS.UPDATE_PAYMENT_AMOUNT: {
			const { amount } = payload

			return {
				...state,
				isSetPaymentAmount: true,
				transactionPaymentMethods: state.transactionPaymentMethods.map(
					item => ({
						...item,
						disabled: true,
						disabledChecked: item.id === state.selectedPaymentMethod.id,
					})
				),
				transaction: {
					...state.transaction,
					paymentAmount: amount,
					change: amount - state.transaction.amount,
				},
			}
		}
		case ACTIONS.SET_TENDER_OPTION: {
			return {
				...state,
				selectedTenderOption: payload,
			}
		}
		case ACTIONS.EDIT_TRANSACTION_AMOUNT: {
			return {
				...state,
				isPaymentMethodSelected: false,
				// isSetTransactionAmount: false,
				selectedPaymentMethod: null,
				isSetPaymentAmount: false,
				transactionPaymentMethods: state.transactionPaymentMethods.map(
					item => ({
						...item,
						disabled: false,
						disabledChecked: false,
					})
				),
				selectedTenderOption: state.tenderOptions.find(
					({ id }) => id === 'other'
				),
				tenderOptions: state.tenderOptions.map(option => ({
					...option,
					disabled: false,
				})),
				transaction: {
					...state.transaction,
					paymentAmount: undefined,
					paymentMethod: undefined,
					change: undefined,
				},
			}
		}
		case ACTIONS.EDIT_PAYMENT_METHOD: {
			return {
				...state,
				isSetPaymentAmount: false,
				selectedPaymentMethod: null,
				transactionPaymentMethods: state.transactionPaymentMethods.map(
					item => ({
						...item,
						disabled: false,
						disabledChecked: false,
					})
				),
				selectedTenderOption: state.tenderOptions.find(
					({ id }) => id === 'other'
				),
				transaction: {
					...state.transaction,
					paymentAmount: undefined,
					paymentMethod: undefined,
					change: undefined,
				},
			}
		}
		case ACTIONS.RESET_TRANSACTION: {
			return {
				...state,
				isTransactionSelected: false,
				isSetTransactionAmount: false,
				isSetPaymentAmount: false,
				isPaymentMethodSelected: false,
				selectedTransaction: null,
				transactionPaymentMethods: null,
				selectedPaymentMethod: null,
				paymentMethodTenders: null,
				selectedTenderOption: { ...DEFAULT_TENDER_OPTION },
				transaction: { ...TRANSACTION_TEMPLATE },
				transactions: state.transactions.map(item => ({
					...item,
					disabled: false,
					disabledChecked: false,
				})),
			}
		}
		case ACTIONS.SAVE_TRANSACTION: {
			const latestTransction = {
				...state.transaction,
				ts: Date.now(),
				status: 'done',
			}

			return {
				...state,
				isTransactionSelected: false,
				isSetTransactionAmount: false,
				isSetPaymentAmount: false,
				isPaymentMethodSelected: false,
				selectedTransaction: null,
				transactionPaymentMethods: null,
				selectedPaymentMethod: null,
				paymentMethodTenders: null,
				selectedTenderOption: { ...DEFAULT_TENDER_OPTION },
				transaction: { ...TRANSACTION_TEMPLATE },
				transactions: state.transactions.map(item => ({
					...item,
					disabled: false,
					disabledChecked: false,
				})),
				doneTransactions: [latestTransction, ...state.doneTransactions],
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
