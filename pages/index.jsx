import { Fragment, useEffect, useRef } from 'react'
import { FaCashRegister, FaEdit, FaSyncAlt } from 'react-icons/fa'
import Layout from '../components/Layout'
import RadioItemsGroup from '../components/RadioItemsGroup'
import RadioOptionsGroup from '../components/RadioOptionsGroup'
import {
	ACTIONS,
	isTransactionReady,
	useRegister,
} from '../contexts/RegisterProvider'
import { classNames, curencyFormatter } from '../utils/helpers'

export default function Home() {
	const { state, dispatch } = useRegister()

	const {
		isPaymentMethodSelected,
		isTransactionSelected,
		isSetTransactionAmount,
		isSetPaymentAmount,
		selectedTransaction,
		selectedPaymentMethod,
		transactions,
		transactionPaymentMethods,
		paymentMethodTenders,
		selectedTenderOption,
		transaction,
		doneTransactions,
	} = state

	const trAmountRef = useRef(null)
	const pmAmountRef = useRef(null)

	useEffect(() => {
		if (trAmountRef.current) {
			trAmountRef.current.value = undefined
		}
	}, [transaction.name])

	useEffect(() => {
		if (pmAmountRef.current) {
			pmAmountRef.current.value = undefined
		}
	}, [transaction.paymentMethod])

	useEffect(() => {
		if (pmAmountRef.current) {
			const id = selectedTenderOption.id
			const amount = transaction.amount
			const tenderAmount = selectedTenderOption?.value
			pmAmountRef.current.value =
				id === 'other' ? undefined : id === 'exact' ? amount : tenderAmount
		}
	}, [selectedTenderOption, transaction.amount])

	return (
		<Layout>
			<div className='grid grid-cols-[auto_350px] gap-2 sm:gap-4 items-start h-full'>
				<div className='flex flex-col gap-2 sm:gap-4 p-4'>
					{/* step 1 */}
					<h2 className='text-base sm:text-lg font-semibold flex items-center gap-2'>
						<span>1. Seleccionar transacción</span>
						{isSetTransactionAmount && (
							<button
								type='button'
								className='text-sm sm:text-base text-cyan-700 hover:text-cyan-900 focus:outline-none'
								onClick={() => {
									dispatch({ type: ACTIONS.RESET_TRANSACTION })
								}}
							>
								<FaSyncAlt />
							</button>
						)}
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
					<h2 className='text-base sm:text-lg font-semibold flex items-center gap-2'>
						<span>2. Ingresar monto de transacción</span>
						{isPaymentMethodSelected && (
							<button
								type='button'
								className='text-sm sm:text-base text-cyan-700 hover:text-cyan-900 focus:outline-none'
								onClick={() => {
									dispatch({ type: ACTIONS.EDIT_TRANSACTION_AMOUNT })
								}}
							>
								<FaEdit />
							</button>
						)}
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
							<h2 className='text-base sm:text-lg font-semibold flex items-center gap-2'>
								<span>3. Seleccionar forma de pago</span>
								{isSetPaymentAmount && (
									<button
										type='button'
										className='text-sm sm:text-base text-cyan-700 hover:text-cyan-900 focus:outline-none'
										onClick={() => {
											dispatch({ type: ACTIONS.EDIT_PAYMENT_METHOD })
										}}
									>
										<FaEdit />
									</button>
								)}
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
															? transaction.amount
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
											min={transaction.amount || 0}
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
					<div className='absolute top-0 left-0 right-0 bg-white shadow-sm py-2 px-4 pb-4 flex flex-col gap-1'>
						<h2 className='text-base sm:text-lg font-semibold'>
							Transacción actual
						</h2>
						<div className='flex justify-between text-sm sm:text-base font-medium text-slate-900'>
							<p>
								Total{' '}
								{transaction.name && (
									<Fragment>
										<span className={'text-sm text-amber-900'}>
											({transaction.name})
										</span>
									</Fragment>
								)}
							</p>
							<p
								className={classNames(transaction.isNegative && 'text-red-500')}
							>
								{curencyFormatter(transaction.amount)}
							</p>
						</div>
						<div className='flex justify-between text-sm sm:text-base font-medium text-slate-900'>
							<p>
								Pago{' '}
								{transaction.paymentMethod && (
									<Fragment>
										<span className={'text-sm text-amber-900'}>
											({transaction.paymentMethod})
										</span>
									</Fragment>
								)}
							</p>
							<p>{curencyFormatter(transaction.paymentAmount)}</p>
						</div>
						<div className='h-1 mt-1 border-b-2 border-dashed border-slate-300' />
						<div className='flex justify-between text-base sm:text-lg font-semibold text-slate-900'>
							<p>Cambio</p>
							<p
								className={classNames(transaction.isNegative && 'text-red-500')}
							>
								{curencyFormatter(transaction.change)}
							</p>
						</div>
						{/* {transaction.isNegative && (
							<p className='mt-0.5 text-sm text-red-500'>
								El dinero saldrá de caja
							</p>
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
				</aside>
			</div>
		</Layout>
	)
}
