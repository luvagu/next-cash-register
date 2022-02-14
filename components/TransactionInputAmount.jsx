import { forwardRef } from 'react'
import { classNames } from '../utils/helpers'

const TransactionInputAmount = forwardRef(
	(
		{
			isTransactionSelected,
			isPaymentMethodSelected,
			min,
			disabled,
			required,
			onChange,
		},
		ref
	) => {
		return (
			<div className='relative max-w-xs rounded shadow-md'>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<span className='text-slate-500 text-sm sm:text-base'>$</span>
				</div>
				<input
					ref={ref}
					className={classNames(
						'block w-full border-0 rounded pl-7 pr-3 text-sm sm:text-base text-slate-900 font-semibold bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-slate-300/75 disabled:shadow-none invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500',
						!isTransactionSelected
							? 'disabled:text-slate-500'
							: isPaymentMethodSelected && 'disabled:text-slate-700'
					)}
					type='number'
					min={min}
					step={0.01}
					placeholder='0.00'
					disabled={disabled}
					required={required}
					onChange={onChange}
				/>
			</div>
		)
	}
)

TransactionInputAmount.displayName = 'TransactionInputAmount'
TransactionInputAmount.defaultProps = {
	isTransactionSelected: false,
	isPaymentMethodSelected: false,
	min: 0,
	disabled: true,
	required: true,
	onChange: () => {},
}

export default TransactionInputAmount
