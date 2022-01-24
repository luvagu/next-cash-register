import { useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import RadioItemsGroup from '../components/RadioItemsGroup'
import { ACTIONS, useRegister } from '../contexts/RegisterProvider'

export default function Home() {
	const { state, dispatch } = useRegister()

	const {
		isPaymentMethodSelected,
		isTransactionSelected,
		isSetTransactionAmount,
		selectedTransaction,
		transactions,
		paymentMethods,
	} = state

	console.log(state)

	const amountRef = useRef(null)

	useEffect(() => {
		amountRef.current.value = undefined
	}, [selectedTransaction?.name])

	return (
		<Layout>
			<div className='grid grid-cols-1 md:grid-cols-[auto_minmax(200px,_300px)] gap-2 sm:gap-4 items-start'>
				<div className='order-2 md:order-1 flex flex-col gap-2 sm:gap-4'>
					<h1 className='text-base sm:text-lg font-semibold'>
						1. Seleccionar transacción
					</h1>
					<RadioItemsGroup
						items={transactions}
						getSelected={transaction =>
							dispatch({
								type: ACTIONS.SET_TRANSACTION,
								payload: transaction,
							})
						}
					/>
					<h1 className='text-base sm:text-lg font-semibold'>
						2. Ingresar monto de transacción
					</h1>
					<input
						ref={amountRef}
						className='w-full max-w-xs border-0 py-2 px-3 text-sm bg-white rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-300 focus:ring-white focus:ring-opacity-60 disabled:bg-slate-300 disabled:bg-opacity-75 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:text-pink-600
						focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
						type='number'
						min={0}
						step={0.01}
						placeholder='Ej: 1.85'
						disabled={!isTransactionSelected}
						required
						onChange={e =>
							dispatch({
								type: ACTIONS.UPDATE_TRANSACTION_AMOUNT,
								payload: { amount: parseFloat(e.target.value) },
							})
						}
					/>
					<h1 className='text-base sm:text-lg font-semibold'>
						3. Seleccionar forma de pago
					</h1>
					<RadioItemsGroup
						items={paymentMethods}
						getSelected={paymentMethod =>
							dispatch({
								type: ACTIONS.SET_PAYMENT_METHOD,
								payload: paymentMethod,
							})
						}
						isGroupDisabled={!isSetTransactionAmount}
					/>
				</div>
				<aside className='order-1 md:order-2 h-full bg-slate-400'>
					dfgdsfgs
				</aside>
			</div>
		</Layout>
	)
}
