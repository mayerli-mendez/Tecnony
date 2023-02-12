import { useReducer } from "react"
import { TecnonyContext } from "./TecnonyContext"
import { TecnonyReducer } from "./TecnonyReducer"
import { CARGAR_INFO } from "./TecnonyTypes"

export const TecnonyState = ({ children }) => {

    const userinfo = {
        userinfo: null, cedula: null
    }

    const [userinfo1, SetUserinfo1] = useReducer(TecnonyReducer, userinfo);

    const cargarInfor = (general) => {
        SetUserinfo1({ payload: general, type: CARGAR_INFO })
        localStorage.setItem('user', JSON.stringify(general));
    }
    const reloadWindow = (isAuto) => {
        if (isAuto) {
            let isReload = isNaN(window.name) ? "0" : window.name;
            if (!isReload || isReload == "0") {
                if(document.location.href.endsWith("landing")){
                    document.location.href=document.location.href+"/";
                }else{
                    window.location.reload();
                }
               
                window.name = "1";
            } else {
                window.name = isReload + "0";
                if (window.name == "1000") {
                    window.name = "0"
                }
            }
        } else {
            window.location.reload();
        }
       

    }
    return <TecnonyContext.Provider

        value={{ userinfo: userinfo1.userinfo, cargarInfor, reloadWindow }}
    >
        {children}
    </TecnonyContext.Provider>
}