import { Fragment, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { classNames } from '../utils/helpers'

const iconcClorVairants = {
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

function RadioItemsGroup({ items, getSelected }) {
	const [selected, setSelected] = useState(null)

	const handleChange = value => {
		const { id, name } = value
		setSelected(value)
		getSelected({ id, name })
	}

	return (
		<RadioGroup value={selected} onChange={handleChange}>
			<RadioGroup.Label className='sr-only'>Options</RadioGroup.Label>
			<div className='grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] items-start gap-2 sm:gap-4'>
				{items.map(item => (
					<RadioGroup.Option
						key={item.id}
						value={item}
						className={({ active, checked }) =>
							classNames(
								'relative flex flex-col justify-center items-center gap-1 sm:gap-2 px-4 py-4 rounded shadow-md cursor-pointer focus:outline-none',
								active &&
									'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60',
								checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
							)
						}
					>
						{({ active, checked }) => (
							<Fragment>
								<RadioGroup.Label
									as='h2'
									className={classNames(
										'text-xs sm:text-sm font-semibold whitespace-nowrap truncate',
										checked ? 'text-white' : 'text-amber-900'
									)}
								>
									{item.name}
								</RadioGroup.Label>
								<RadioGroup.Description
									className={classNames(
										'inline',
										checked
											? 'text-sky-100'
											: iconcClorVairants[item?.variant || 'default']
									)}
								>
									<item.icon className='w-5 h-5 sm:w-6 sm:h-6' />
								</RadioGroup.Description>
							</Fragment>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	)
}

RadioItemsGroup.defaultProps = {
	items: [],
	getSelected: () => {},
}

export default RadioItemsGroup