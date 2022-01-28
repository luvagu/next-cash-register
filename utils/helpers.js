export function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function curencyFormatter(amount) {
	if (isNaN(amount)) return '--.--'

	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: 2,
		currencySign: 'accounting',
	}).format(amount)
}
