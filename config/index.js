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
		icon: FaReceipt,
		color: 'orange',
		operation: '+',
	},
	{
		id: 't-fc',
		name: 'Facturas',
		icon: FaFileInvoiceDollar,
		color: 'blue',
		operation: '+',
	},
	{
		id: 't-fr',
		name: 'Facts+Ret',
		icon: FaFileInvoice,
		color: 'sky',
		operation: '+',
	},
	{
		id: 't-ft',
		name: 'Facts+TC',
		icon: FaFileInvoice,
		color: 'indigo',
		operation: '+',
	},
	{
		id: 't-cb',
		name: 'Cobros',
		icon: FaHandHoldingUsd,
		color: 'green',
		operation: '+',
	},
	{
		id: 't-dr',
		name: 'Dev Rets',
		icon: HiReceiptRefund,
		color: 'pink',
		operation: '-',
	},
	{
		id: 't-ad',
		name: 'Adelantos',
		icon: GiTakeMyMoney,
		color: 'rose',
		operation: '-',
	},
	{
		id: 't-ga',
		name: 'Gastos',
		icon: GiPayMoney,
		color: 'red',
		operation: '-',
	},
]

export const PAYMENT_METHODS = [
	{
		id: 'p-ef',
		name: 'Efectivo',
		icon: GiBanknote,
		color: 'green',
	},
	{
		id: 'p-ch',
		name: 'Cheque',
		icon: FaMoneyCheck,
		color: 'blue',
	},
	{
		id: 'p-dp',
		name: 'Deposito',
		icon: BsBank2,
		color: 'orange',
	},
	{
		id: 'p-tr',
		name: 'Transferencia',
		icon: BiTransfer,
		color: 'emerald',
	},
	{
		id: 'p-tc',
		name: 'Tarjeta',
		icon: BsCreditCardFill,
		color: 'indigo',
	},
]
