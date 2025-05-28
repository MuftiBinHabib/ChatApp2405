import React , {createContext} from 'react'

const logindata = createContext()

const LoginData = ({children}) => {
  return (
    <logindata.Provider value={ "ABC"}>{children}</logindata.Provider>
  )
}

export default LoginData
export {logindata}