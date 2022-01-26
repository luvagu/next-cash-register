import { useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import RadioItemsGroup from '../components/RadioItemsGroup'
import RadioOptionsGroup from '../components/RadioOptionsGroup'
import { ACTIONS, useRegister } from '../contexts/RegisterProvider'
import { classNames } from '../utils/helpers'

export default function Home() {
	const { state, dispatch } = useRegister()

	const {
		isPaymentMethodSelected,
		isTransactionSelected,
		isSetTransactionAmount,
		selectedTransaction,
		selectedPaymentMethod,
		transactions,
		paymentMethods,
		denominations,
	} = state

	console.log(state)

	const trAmountRef = useRef(null)
	const exactRef = useRef(null)
	const pmAmountRef = useRef(null)

	useEffect(() => {
		trAmountRef.current.value = undefined
	}, [selectedTransaction?.name])

	useEffect(() => {
		// exactRef.current.checked = false
		pmAmountRef.current.value = undefined
	}, [selectedPaymentMethod?.name])

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
					<div className='relative max-w-xs rounded shadow-md'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<span className='text-gray-500 text-sm sm:text-base'>$</span>
						</div>
						<input
							ref={trAmountRef}
							className={classNames(
								'block w-full border-0 rounded pl-7 pr-3 text-sm sm:text-base text-gray-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/50 disabled:bg-slate-300 disabled:bg-opacity-75 disabled:shadow-none invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
								!isTransactionSelected
									? 'disabled:text-gray-500'
									: isPaymentMethodSelected && 'disabled:text-gray-700'
							)}
							type='number'
							min={0}
							step={0.01}
							placeholder='0.00'
							disabled={!isTransactionSelected || isPaymentMethodSelected}
							required
							onChange={e =>
								dispatch({
									type: ACTIONS.UPDATE_TRANSACTION_AMOUNT,
									payload: { amount: parseFloat(e.target.value) },
								})
							}
						/>
					</div>
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
					<h1 className='text-base sm:text-lg font-semibold'>
						4. Ingresar monto de pago
					</h1>
					{/* <div className='flex flex-col gap-2'>
						<div className='flex items-center'>
							<input
								ref={exactRef}
								id='exact-amount'
								type='checkbox'
								className='h-4 w-4 text-gray-900 border-slate-500 rounded focus:ring-slate-900/75 disabled:border-slate-400
								disabled:bg-slate-300/75'
								disabled={!isPaymentMethodSelected}
								onChange={e => {
									const amount = e.target.checked
										? selectedTransaction?.amount
										: undefined
									dispatch({
										type: ACTIONS.UPDATE_PAYMENT_AMOUNT,
										payload: { amount },
									})
									pmAmountRef.current.value = amount
									pmAmountRef.current.disabled = e.target.checked
								}}
							/>
							<label
								htmlFor='exact-amount'
								className='ml-2 block text-sm text-gray-900'
							>
								Monto de pago exacto?
							</label>
						</div>
					</div> */}
					<RadioOptionsGroup
						items={denominations}
						isGroupDisabled={!isPaymentMethodSelected}
						selectedIndex={denominations.length - 1}
					/>
					<div className='relative max-w-xs rounded shadow-md'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<span className='text-gray-500 text-sm sm:text-base'>$</span>
						</div>
						<input
							ref={pmAmountRef}
							className={classNames(
								'block w-full border-0 rounded pl-7 pr-3 text-sm sm:text-base text-gray-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/50 disabled:bg-slate-300 disabled:bg-opacity-75 disabled:shadow-none invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
								!isTransactionSelected
									? 'disabled:text-gray-500'
									: isPaymentMethodSelected && 'disabled:text-gray-700'
							)}
							type='number'
							min={selectedTransaction?.amount || 0}
							step={0.01}
							placeholder='0.00'
							disabled={!isPaymentMethodSelected}
							required
							onChange={e =>
								dispatch({
									type: ACTIONS.UPDATE_PAYMENT_AMOUNT,
									payload: { amount: parseFloat(e.target.value) },
								})
							}
						/>
					</div>
				</div>
				<aside className='order-1 md:order-2 h-96 lg:h-full bg-amber-300'></aside>
			</div>
		</Layout>
	)
}
