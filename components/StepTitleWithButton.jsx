import { FaSyncAlt } from 'react-icons/fa'
import { classNames } from '../utils/helpers'

function StepTitleWithButton({ title, showButton, onClick }) {
	return (
		<h2
			className={classNames(
				'text-base sm:text-lg font-semibold',
				showButton && 'flex items-center gap-2'
			)}
		>
			<span>{title}</span>
			{showButton && onClick && (
				<button
					type='button'
					className='text-sm sm:text-base text-cyan-700 hover:text-cyan-900 focus:outline-none'
					onClick={onClick}
				>
					<FaSyncAlt />
				</button>
			)}
		</h2>
	)
}

StepTitleWithButton.defaultProps = {
	title: '',
	showButton: false,
	onClick: () => {},
}

export default StepTitleWithButton
