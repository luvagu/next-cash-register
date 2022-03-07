import { Fragment } from 'react'
import { FaCashRegister } from 'react-icons/fa'
import {
	ACTIONS,
	isTransactionReady,
	useRegister,
} from '../contexts/RegisterProvider'
import { classNames, curencyFormatter } from '../utils/helpers'

const TransactionDetailsRow = ({
	label = '',
	transaction = null,
	isTotal = false,
	isPayment = false,
	isChange = false,
	istextLarge = false,
}) => {
	const { name, amount, paymentMethod, paymentAmount, isNegative, change } =
		transaction

	return (
		<div
			className={classNames(
				'flex justify-between',
				istextLarge
					? 'text-base sm:text-lg font-semibold'
					: 'text-sm sm:text-base font-medium',
				'text-slate-900'
			)}
		>
			<p>
				{label}{' '}
				{isTotal && name && (
					<Fragment>
						<span className='text-sm text-amber-900'>({name})</span>
					</Fragment>
				)}
				{isPayment && paymentMethod && (
					<Fragment>
						<span className='text-sm text-amber-900'>({paymentMethod})</span>
					</Fragment>
				)}
			</p>
			<p className={classNames(isNegative && 'text-red-500')}>
				{isTotal && curencyFormatter(amount)}
				{isPayment && curencyFormatter(paymentAmount)}
				{isChange && curencyFormatter(change)}
			</p>
		</div>
	)
}

function TransactionDetails() {
	const {
		state: { transaction },
		dispatch,
	} = useRegister()

	return (
		<div className='absolute top-0 left-0 right-0 bg-white shadow-sm py-2 px-4 pb-4 flex flex-col gap-1'>
			<h2 className='text-base sm:text-lg font-semibold'>Transacción actual</h2>
			<TransactionDetailsRow label='Total' transaction={transaction} isTotal />
			<TransactionDetailsRow label='Pago' transaction={transaction} isPayment />
			<div className='h-1 mt-1 border-b-2 border-dashed border-slate-300' />
			<TransactionDetailsRow
				label='Cambio'
				transaction={transaction}
				isChange
				istextLarge
			/>

			{/* {transaction.isNegative && (
				<p className='mt-0.5 text-sm text-red-500'>El dinero saldrá de caja</p>
			)} */}

			{/* final */}
			<div className='mt-2'>
				<button
					type='button'
					className='relative flex justify-center items-center gap-2 sm:gap-2 px-4 py-2 w-full max-w-xs rounded shadow-md text-sm sm:text-base text-slate-50 font-semibold bg-lime-600 focus:outline-none focus:bg-lime-700 focus:text-white focus:ring-4 focus:ring-lime-900/50 disabled:bg-slate-300/75 disabled:text-slate-500 disabled:shadow-none transition-colors'
					disabled={!isTransactionReady(transaction)}
					onClick={() => dispatch({ type: ACTIONS.SAVE_TRANSACTION })}
				>
					<FaCashRegister />
					<span>Finalizar</span>
				</button>
			</div>
		</div>
	)
}

export default TransactionDetails
