import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import { classNames } from '../utils/helpers'

function RadioOptionsGroup({
	items,
	getSelected,
	isGroupDisabled,
	selectedIndex,
}) {
	const [selected, setSelected] = useState(
		selectedIndex > -1 ? items[selectedIndex] : null
	)

	const handleChange = value => {
		setSelected(value)
		getSelected(value)
	}

	return (
		<RadioGroup
			value={selected}
			onChange={handleChange}
			disabled={isGroupDisabled}
		>
			<RadioGroup.Label className='sr-only'>Options</RadioGroup.Label>
			<div className='grid grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] items-start gap-2 sm:gap-4'>
				{items.map(item => (
					<RadioGroup.Option
						disabled={item?.disabled}
						key={item?.id}
						value={item}
						className={({ active, checked }) =>
							classNames(
								'relative flex justify-center items-center px-4 py-3 rounded shadow-md focus:outline-none select-none transition-colors',
								active &&
									'ring-2 ring-offset-2 ring-offset-slate-300 ring-white ring-opacity-60',
								(checked || item?.disabledChecked) &&
									'bg-slate-900 bg-opacity-75',
								(isGroupDisabled ||
									(item?.disabled && !item?.disabledChecked)) &&
									'bg-slate-300 bg-opacity-75',
								(!checked || !item?.disabled) && 'bg-white',
								!isGroupDisabled && !item?.disabled && 'cursor-pointer',
								(isGroupDisabled || item?.disabled) && 'cursor-default'
							)
						}
					>
						{({ checked }) => (
							<RadioGroup.Label
								as='h2'
								className={classNames(
									'text-xs sm:text-sm font-semibold whitespace-nowrap',
									(checked || item?.disabledChecked) && 'text-white',
									(isGroupDisabled ||
										(item?.disabled && !item?.disabledChecked)) &&
										'text-gray-600',
									!checked && !item?.disabled && 'text-amber-900'
								)}
							>
								{item?.name}
							</RadioGroup.Label>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	)
}

RadioOptionsGroup.defaultProps = {
	items: [],
	getSelected: () => {},
	isGroupDisabled: false,
	selectedIndex: -1,
}

export default RadioOptionsGroup
