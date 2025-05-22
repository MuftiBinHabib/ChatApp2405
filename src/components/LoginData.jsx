import React , {createContext} from 'react'
import { auth } from '../firebase.config'

const logindata = createContext()

const LoginData = ({children}) => {
    
    
    const userdata = [
        {
            name: "Username"
        }
    ]
    
  return (
    <logindata.Provider value={userdata}>{children}</logindata.Provider>
  )
}

export {logindata}
export default LoginData