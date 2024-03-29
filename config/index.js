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

export const TRANSACTIONS = Object.freeze([
	{
		id: 't-nv',
		name: 'Notas',
		icon: FaReceipt,
		color: 'orange',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
		paymentMethodIds: ['cash', 'transfer'],
	},
	{
		id: 't-fc',
		name: 'Facturas',
		icon: FaFileInvoiceDollar,
		color: 'blue',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
		paymentMethodIds: ['cash', 'check', 'deposit', 'transfer', 'card'],
	},
	{
		id: 't-fr',
		name: 'Facts+Ret',
		icon: FaFileInvoice,
		color: 'sky',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
		paymentMethodIds: ['cash', 'check', 'deposit', 'transfer', 'card'],
	},
	{
		id: 't-ft',
		name: 'Facts+TC',
		icon: FaFileInvoice,
		color: 'indigo',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
		paymentMethodIds: ['card'],
	},
	{
		id: 't-cb',
		name: 'Cobros',
		icon: FaHandHoldingUsd,
		color: 'green',
		operation: '+',
		disabled: false,
		hasPaymentMethods: true,
		paymentMethodIds: ['cash', 'check', 'deposit', 'transfer', 'card'],
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
])

export const PAYMENT_METHODS = Object.freeze([
	{
		id: 'cash',
		name: 'Efectivo',
		icon: GiBanknote,
		color: 'green',
		disabled: false,
		tenderAmountsIds: 1,
	},
	{
		id: 'check',
		name: 'Cheque',
		icon: FaMoneyCheck,
		color: 'blue',
		disabled: false,
		tenderAmountsIds: ['exact', 'other'],
	},
	{
		id: 'deposit',
		name: 'Depósito',
		icon: BsBank2,
		color: 'orange',
		disabled: false,
		tenderAmountsIds: ['exact', 'other'],
	},
	{
		id: 'transfer',
		name: 'Transferencia',
		icon: BiTransfer,
		color: 'emerald',
		disabled: false,
		tenderAmountsIds: ['exact', 'other'],
	},
	{
		id: 'card',
		name: 'Tarjeta',
		icon: BsCreditCardFill,
		color: 'indigo',
		disabled: false,
		tenderAmountsIds: ['exact', 'other'],
	},
])

export const TENDER_OPTIONS = Object.freeze([
	{
		id: 'other',
		name: 'Otro',
		disabled: false,
	},
	{
		id: 'exact',
		name: 'Exacto',
		disabled: false,
	},
	{
		id: 'nicke',
		name: '5c',
		value: 0.05,
		disabled: false,
	},
	{
		id: 'dime',
		name: '10c',
		value: 0.1,
		disabled: false,
	},
	{
		id: 'quarter',
		name: '25c',
		value: 0.25,
		disabled: false,
	},
	{
		id: 'half',
		name: '50c',
		value: 0.5,
		disabled: false,
	},
	{
		id: 'one',
		name: '$1',
		value: 1,
		disabled: false,
	},
	{
		id: 'five',
		name: '$5',
		value: 5,
		disabled: false,
	},
	{
		id: 'ten',
		name: '$10',
		value: 10,
		disabled: false,
	},
	{
		id: 'twenty',
		name: '$20',
		value: 20,
		disabled: false,
	},
])
