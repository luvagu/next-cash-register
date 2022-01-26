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
		disabled: false,
		hasPaymentMethods: true,
	},
	{
		id: 't-fc',
		name: 'Facturas',
		icon: FaFileInvoiceDollar,
		color: 'blue',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
	},
	{
		id: 't-fr',
		name: 'Facts+Ret',
		icon: FaFileInvoice,
		color: 'sky',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
	},
	{
		id: 't-ft',
		name: 'Facts+TC',
		icon: FaFileInvoice,
		color: 'indigo',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
	},
	{
		id: 't-cb',
		name: 'Cobros',
		icon: FaHandHoldingUsd,
		color: 'green',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
	},
	{
		id: 't-dr',
		name: 'Dev Rets',
		icon: HiReceiptRefund,
		color: 'pink',
		operation: '-',
		disabled: false,
		hasPaymentMethods: false,
	},
	{
		id: 't-ad',
		name: 'Adelantos',
		icon: GiTakeMyMoney,
		color: 'rose',
		operation: '-',
		disabled: false,
		hasPaymentMethods: false,
	},
	{
		id: 't-ga',
		name: 'Gastos',
		icon: GiPayMoney,
		color: 'red',
		operation: '-',
		disabled: false,
		hasPaymentMethods: false,
	},
]

export const PAYMENT_METHODS = [
	{
		id: 'p-ef',
		name: 'Efectivo',
		icon: GiBanknote,
		color: 'green',
		disabled: false,
	},
	{
		id: 'p-ch',
		name: 'Cheque',
		icon: FaMoneyCheck,
		color: 'blue',
		disabled: false,
	},
	{
		id: 'p-dp',
		name: 'Depósito',
		icon: BsBank2,
		color: 'orange',
		disabled: false,
	},
	{
		id: 'p-tr',
		name: 'Transferencia',
		icon: BiTransfer,
		color: 'emerald',
		disabled: false,
	},
	{
		id: 'p-tc',
		name: 'Tarjeta',
		icon: BsCreditCardFill,
		color: 'indigo',
		disabled: false,
	},
]

export const TENDER_AMOUNTS = [
	{
		id: 'quarter',
		name: '25c',
		value: 0.25,
		color: 'green',
		disabled: false,
	},
	{
		id: 'half',
		name: '50c',
		value: 0.5,
		color: 'green',
		disabled: false,
	},
	{
		id: 'one',
		name: '$1',
		value: 1,
		color: 'green',
		disabled: false,
	},
	{
		id: 'five',
		name: '$5',
		value: 5,
		color: 'green',
		disabled: false,
	},
	{
		id: 'ten',
		name: '$10',
		value: 10,
		color: 'green',
		disabled: false,
	},
	{
		id: 'twenty',
		name: '$20',
		value: 20,
		color: 'green',
		disabled: false,
	},
	{
		id: 'exact',
		name: 'Exacto',
		color: 'green',
		disabled: false,
	},
	{
		id: 'other',
		name: 'Otro',
		color: 'green',
		disabled: false,
	},
]
