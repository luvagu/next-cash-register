import { Fragment, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { classNames } from '../utils/helpers'

const iconColorVairants = {
	// gray variants
	default: 'text-gray-500',
	slate: 'text-slate-500',
	zinc: 'text-zinc-500',
	stone: 'text-stone-500',

	// red variants
	red: 'text-red-500',
	pink: 'text-pink-500',
	rose: 'text-rose-500',

	// green variants
	lime: 'text-lime-500',
	green: 'text-green-500',
	emerald: 'text-emerald-500',
	teal: 'text-teal-500',

	// yellow variants
	orange: 'text-orange-500',
	amber: 'text-amber-500',
	yellow: 'text-yellow-500',

	// purple variants
	indigo: 'text-indigo-500',
	violet: 'text-violet-500',
	purple: 'text-purple-500',
	fuchsia: 'text-fuchsia-500',

	// blue variants
	cyan: 'text-cyan-500',
	sky: 'text-sky-500',
	blue: 'text-blue-500',
}

const Icon = ({ icon, ...props }) => {
	const DynamicIcon = icon
	if (DynamicIcon) return <DynamicIcon {...props} />
	return null
}

function RadioOptionsGroup({
	items,
	getSelected,
	isGroupDisabled,
	selectedItem,
	isIconVariant,
}) {
	const [selected, setSelected] = useState(selectedItem ? selectedItem : null)

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
			<div
				className={classNames(
					'grid ',
					isIconVariant
						? 'grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))]'
						: 'grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))]',
					' items-start gap-2 sm:gap-4'
				)}
			>
				{items.map(item => (
					<RadioGroup.Option
						disabled={item?.disabled}
						key={item?.id}
						value={item}
						className={({ active, checked }) =>
							classNames(
								'relative flex flex-col justify-center items-center gap-1 sm:gap-2 px-4 py-3 rounded shadow-md focus:outline-none select-none transition-colors',
								active && 'ring-4 ring-slate-900/50',
								checked || item?.disabledChecked
									? 'bg-slate-900/75'
									: item?.disabled && !item?.disabledChecked
									? 'bg-slate-300/75'
									: 'bg-white',
								isGroupDisabled || item?.disabled
									? 'cursor-default'
									: 'cursor-pointer'
							)
						}
					>
						{({ checked }) => (
							<Fragment>
								<RadioGroup.Label
									as='h2'
									className={classNames(
										'text-xs sm:text-sm font-semibold whitespace-nowrap truncate',
										(checked || item?.disabledChecked) && 'text-white',
										(isGroupDisabled ||
											(item?.disabled && !item?.disabledChecked)) &&
											'text-gray-600',
										!checked && !item?.disabled && 'text-amber-900'
									)}
								>
									{item?.name}
								</RadioGroup.Label>
								{isIconVariant && (
									<RadioGroup.Description
										className={classNames(
											'inline',
											(checked || item?.disabledChecked) && 'text-opacity-95',
											(isGroupDisabled ||
												(item?.disabled && !item?.disabledChecked)) &&
												'text-gray-600',
											(!isGroupDisabled ||
												(item?.disabled && item?.disabledChecked)) &&
												iconColorVairants[item?.color || 'default']
										)}
									>
										<Icon icon={item?.icon} className='w-5 h-5 sm:w-6 sm:h-6' />
									</RadioGroup.Description>
								)}
							</Fragment>
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
	selectedItem: null,
	isIconVariant: true,
}

export default RadioOptionsGroup
