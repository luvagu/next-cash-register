import { RadioGroup } from '@headlessui/react'

function RadioOptionsGroup({ items }) {
	return (
		<RadioGroup
			value={selectedSize}
			onChange={setSelectedSize}
			className='mt-4'
		>
			<RadioGroup.Label className='sr-only'>Choose a size</RadioGroup.Label>
			<div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
				{items.map(item => (
					<RadioGroup.Option
						key={item.name}
						value={item}
						disabled={!item.inStock}
						className={({ active }) =>
							classNames(
								item.inStock
									? 'bg-white shadow-sm text-gray-900 cursor-pointer'
									: 'bg-gray-50 text-gray-200 cursor-not-allowed',
								active ? 'ring-2 ring-indigo-500' : '',
								'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
							)
						}
					>
						{({ active, checked }) => (
							<>
								<RadioGroup.Label as='p'>{item.name}</RadioGroup.Label>
								{item.inStock ? (
									<div
										className={classNames(
											active ? 'border' : 'border-2',
											checked ? 'border-indigo-500' : 'border-transparent',
											'absolute -inset-px rounded-md pointer-events-none'
										)}
										aria-hidden='true'
									/>
								) : (
									<div
										aria-hidden='true'
										className='absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none'
									>
										<svg
											className='absolute inset-0 w-full h-full text-gray-200 stroke-2'
											viewBox='0 0 100 100'
											preserveAspectRatio='none'
											stroke='currentColor'
										>
											<line
												x1={0}
												y1={100}
												x2={100}
												y2={0}
												vectorEffect='non-scaling-stroke'
											/>
										</svg>
									</div>
								)}
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	)
}

export default RadioOptionsGroup
