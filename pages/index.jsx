import { Fragment, useEffect, useRef } from 'react'
import { ACTIONS, useRegister } from '../contexts/RegisterProvider'

import Layout from '../components/Layout'
import RadioOptionsGroup from '../components/RadioOptionsGroup'
import StepTitleWithButton from '../components/StepTitleWithButton'
import TransactionInputAmount from '../components/TransactionInputAmount'
import TransactionDetails from '../components/TransactionDetails'

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
		transactionsHistory,
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
			<div className='flex flex-col sm:grid sm:grid-cols-[auto_350px] gap-2 sm:gap-4 items-start h-full'>
				<div className='flex flex-col self-stretch gap-2 sm:gap-4 p-4'>
					{/* step 1 */}
					<StepTitleWithButton
						title='1. Seleccionar transacción'
						showButton={isSetTransactionAmount}
						onClick={() => {
							dispatch({ type: ACTIONS.RESET_TRANSACTION })
						}}
					/>
					<RadioOptionsGroup
						items={transactions}
						getSelected={transaction =>
							dispatch({
								type: ACTIONS.SET_TRANSACTION,
								payload: transaction,
							})
						}
					/>

					{/* step 2 */}
					<StepTitleWithButton
						title='2. Ingresar monto de transacción'
						showButton={isPaymentMethodSelected}
						onClick={() => {
							dispatch({ type: ACTIONS.EDIT_TRANSACTION_AMOUNT })
						}}
					/>
					<TransactionInputAmount
						ref={trAmountRef}
						isTransactionSelected={isTransactionSelected}
						isPaymentMethodSelected={isPaymentMethodSelected}
						disabled={!isTransactionSelected || isPaymentMethodSelected}
						onChange={e =>
							dispatch({
								type: ACTIONS.UPDATE_TRANSACTION_AMOUNT,
								payload: { amount: parseFloat(e.target.value) },
							})
						}
					/>

					{selectedTransaction && selectedTransaction?.hasPaymentMethods && (
						<Fragment>
							{/* step 3 */}
							<StepTitleWithButton
								title='3. Seleccionar forma de pago'
								showButton={isSetPaymentAmount}
								onClick={() => {
									dispatch({ type: ACTIONS.EDIT_PAYMENT_METHOD })
								}}
							/>
							<RadioOptionsGroup
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
									<StepTitleWithButton title='4. Ingresar monto de pago' />
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
										selectedItem={paymentMethodTenders[0]}
										isIconVariant={false}
									/>
									<TransactionInputAmount
										ref={pmAmountRef}
										isTransactionSelected={isTransactionSelected}
										isPaymentMethodSelected={isPaymentMethodSelected}
										min={transaction.amount || 0}
										disabled={selectedTenderOption?.id !== 'other'}
										onChange={e =>
											dispatch({
												type: ACTIONS.UPDATE_PAYMENT_AMOUNT,
												payload: { amount: parseFloat(e.target.value) },
											})
										}
									/>
								</Fragment>
							)}
						</Fragment>
					)}
				</div>

				<aside className='relative w-full h-full bg-slate-300/75'>
					<TransactionDetails />
				</aside>
			</div>
		</Layout>
	)
}
