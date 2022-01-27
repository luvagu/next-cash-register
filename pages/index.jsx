import { Fragment, useEffect, useRef } from 'react'
import { FaCashRegister } from 'react-icons/fa'
import Layout from '../components/Layout'
import RadioItemsGroup from '../components/RadioItemsGroup'
import RadioOptionsGroup from '../components/RadioOptionsGroup'
import { ACTIONS, useRegister } from '../contexts/RegisterProvider'
import { classNames, curencyFormatter } from '../utils/helpers'

export default function Home() {
	const { state, dispatch } = useRegister()

	const {
		isPaymentMethodSelected,
		isTransactionSelected,
		isSetTransactionAmount,
		selectedTransaction,
		selectedPaymentMethod,
		transactions,
		transactionPaymentMethods,
		paymentMethodTenders,
		selectedTenderOption,
	} = state

	const trAmountRef = useRef(null)
	const pmAmountRef = useRef(null)

	useEffect(() => {
		if (trAmountRef.current) {
			trAmountRef.current.value = undefined
		}
	}, [selectedTransaction?.name])

	useEffect(() => {
		if (pmAmountRef.current) {
			pmAmountRef.current.value = undefined
		}
	}, [selectedPaymentMethod?.name])

	useEffect(() => {
		if (pmAmountRef.current) {
			const id = selectedTenderOption.id
			const amount = selectedTransaction?.amount
			const tenderAmount = selectedTenderOption?.value
			pmAmountRef.current.value =
				id === 'other' ? undefined : id === 'exact' ? amount : tenderAmount
		}
	}, [selectedTenderOption, selectedTransaction?.amount])

	return (
		<Layout>
			<div className='grid grid-cols-[auto_350px] gap-2 sm:gap-4 items-start h-full'>
				<div className='flex flex-col gap-2 sm:gap-4 p-4'>
					{/* step 1 */}
					<h2 className='text-base sm:text-lg font-semibold'>
						1. Seleccionar transacción
					</h2>
					<RadioItemsGroup
						items={transactions}
						getSelected={transaction =>
							dispatch({
								type: ACTIONS.SET_TRANSACTION,
								payload: transaction,
							})
						}
					/>

					{/* step 2 */}
					<h2 className='text-base sm:text-lg font-semibold'>
						2. Ingresar monto de transacción
					</h2>
					<div className='relative max-w-xs rounded shadow-md'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<span className='text-slate-500 text-sm sm:text-base'>$</span>
						</div>
						<input
							ref={trAmountRef}
							className={classNames(
								'block w-full border-0 rounded pl-7 pr-3 text-sm sm:text-base text-slate-900 font-semibold bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-slate-300/75 disabled:shadow-none invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500',
								!isTransactionSelected
									? 'disabled:text-slate-500'
									: isPaymentMethodSelected && 'disabled:text-slate-700'
							)}
							type='number'
							min={0}
							step={0.01}
							placeholder='0.00'
							value={selectedTransaction?.amount}
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

					{selectedTransaction && selectedTransaction?.hasPaymentMethods && (
						<Fragment>
							{/* step 3 */}
							<h2 className='text-base sm:text-lg font-semibold'>
								3. Seleccionar forma de pago
							</h2>
							<RadioItemsGroup
								items={transactionPaymentMethods}
								getSelected={paymentMethod =>
									dispatch({
										type: ACTIONS.SET_PAYMENT_METHOD,
										payload: paymentMethod,
									})
								}
								isGroupDisabled={!isSetTransactionAmount}
							/>

							{/* step 4 */}
							{selectedPaymentMethod && (
								<Fragment>
									<h2 className='text-base sm:text-lg font-semibold'>
										4. Ingresar monto de pago
									</h2>
									<RadioOptionsGroup
										items={paymentMethodTenders}
										getSelected={tender => {
											dispatch({
												type: ACTIONS.SET_TENDER_OPTION,
												payload: tender,
											})
											dispatch({
												type: ACTIONS.UPDATE_PAYMENT_AMOUNT,
												payload: {
													amount:
														tender.id === 'other'
															? undefined
															: tender.id === 'exact'
															? selectedTransaction?.amount
															: tender?.value,
												},
											})
										}}
										isGroupDisabled={!isPaymentMethodSelected}
										selectedItem={selectedTenderOption}
									/>
									<div className='relative max-w-xs rounded shadow-md'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<span className='text-slate-500 text-sm sm:text-base'>
												$
											</span>
										</div>
										<input
											ref={pmAmountRef}
											className={classNames(
												'block w-full border-0 rounded pl-7 pr-3 text-sm sm:text-base text-slate-900 font-semibold bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-slate-300/75 disabled:shadow-none invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500',
												!isTransactionSelected
													? 'disabled:text-slate-500'
													: isPaymentMethodSelected && 'disabled:text-slate-700'
											)}
											type='number'
											min={selectedTransaction?.amount || 0}
											step={0.01}
											placeholder='0.00'
											disabled={selectedTenderOption?.id !== 'other'}
											required
											onChange={e =>
												dispatch({
													type: ACTIONS.UPDATE_PAYMENT_AMOUNT,
													payload: { amount: parseFloat(e.target.value) },
												})
											}
										/>
									</div>
								</Fragment>
							)}
						</Fragment>
					)}
				</div>
				<aside className='relative h-full bg-slate-300/75'>
					<div className='absolute top-0 left-0 right-0 bg-slate-50/90 shadow-sm py-2 px-4 pb-4 flex flex-col gap-1'>
						<h2 className='text-base sm:text-lg font-semibold'>
							Transacción actual
						</h2>
						<div className='flex justify-between text-sm sm:text-base font-medium text-slate-900'>
							<p>Total</p>
							<p>{curencyFormatter(selectedTransaction?.amount)}</p>
						</div>
						<div className='flex justify-between text-sm sm:text-base font-medium text-slate-900'>
							<p>Pagado</p>
							<p>{curencyFormatter(selectedPaymentMethod?.amount)}</p>
						</div>
						<div className='h-1 mt-1 border-b-2 border-dashed border-slate-300' />
						<div className='flex justify-between text-sm sm:text-base font-bold text-slate-900'>
							<p>Cambio</p>
							<p>{curencyFormatter(-52)}</p>
						</div>
						{/* final */}
						<div className='mt-2'>
							<button
								type='button'
								className='relative flex justify-center items-center gap-2 sm:gap-2 px-4 py-2 w-full max-w-xs rounded shadow-md text-sm sm:text-base text-slate-50 font-semibold bg-lime-700 focus:outline-none focus:bg-lime-800 focus:text-white focus:ring-4 focus:ring-slate-900/50 disabled:bg-slate-300/75 disabled:text-slate-500 disabled:shadow-none transition-colors'
								disabled={
									!(
										selectedPaymentMethod?.amount >= selectedTransaction?.amount
									)
								}
							>
								<FaCashRegister />
								<span>Finalizar</span>
							</button>
						</div>
					</div>
				</aside>
			</div>
		</Layout>
	)
}
