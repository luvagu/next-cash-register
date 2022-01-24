import { createContext, useContext } from 'react'

const RegisterContext = createContext()

export const useRegister = () => useContext(RegisterContext)

function RegisterProvider({ children }) {
	return (
		<RegisterContext.Provider value={null}>{children}</RegisterContext.Provider>
	)
}

export default RegisterProvider
