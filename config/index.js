import { BsBank2, BsCreditCardFill } from 'react-icons/bs'
import { BiTransfer } from 'react-icons/bi'
import {
	FaFileInvoice,
	FaFileInvoiceDollar,
	FaHandHoldingUsd,
	FaMoneyCheck,
	FaReceipt,
} from 'react-icons/fa'
import { GiBanknote, GiPayMoney, GiTakeMyMoney } from 'react-icons/gi'
import { HiReceiptRefund } from 'react-icons/hi'

export const TRANSACTIONS = [
	{
		id: 't-nv',
		name: 'Ventas',
		icon: props => <FaReceipt {...props} />,
		variant: 'orange',
		operation: '+',
	},
	{
		id: 't-fc',
		name: 'Facturas',
		icon: props => <FaFileInvoiceDollar {...props} />,
		variant: 'blue',
		operation: '+',
	},
	{
		id: 't-fr',
		name: 'Facts+Ret',
		icon: props => <FaFileInvoice {...props} />,
		variant: 'sky',
		operation: '+',
	},
	{
		id: 't-ft',
		name: 'Facts+TC',
		icon: props => <FaFileInvoice {...props} />,
		variant: 'indigo',
		operation: '+',
	},
	{
		id: 't-cb',
		name: 'Cobros',
		icon: props => <FaHandHoldingUsd {...props} />,
		variant: 'green',
		operation: '+',
	},
	{
		id: 't-dr',
		name: 'Dev Rets',
		icon: props => <HiReceiptRefund {...props} />,
		variant: 'pink',
		operation: '-',
	},
	{
		id: 't-ad',
		name: 'Adelantos',
		icon: props => <GiTakeMyMoney {...props} />,
		variant: 'rose',
		operation: '-',
	},
	{
		id: 't-ga',
		name: 'Gastos',
		icon: props => <GiPayMoney {...props} />,
		variant: 'red',
		operation: '-',
	},
]

export const PAYMENT_METHODS = [
	{
		id: 'p-ef',
		name: 'Efectivo',
		icon: props => <GiBanknote {...props} />,
		variant: 'green',
	},
	{
		id: 'p-ch',
		name: 'Cheque',
		icon: props => <FaMoneyCheck {...props} />,
		variant: 'blue',
	},
	{
		id: 'p-dp',
		name: 'Deposito',
		icon: props => <BsBank2 {...props} />,
		variant: 'orange',
	},
	{
		id: 'p-tr',
		name: 'Transferencia',
		icon: props => <BiTransfer {...props} />,
		variant: 'emerald',
	},
	{
		id: 'p-tc',
		name: 'Tarjeta',
		icon: props => <BsCreditCardFill {...props} />,
		variant: 'indigo',
	},
]
