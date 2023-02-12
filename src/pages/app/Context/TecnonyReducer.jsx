import { CARGAR_INFO } from "./TecnonyTypes"

export const TecnonyReducer = (state,action) => {

const {type,payload}=action


switch ( type  ){
   
    case CARGAR_INFO :{
        return {
            ...state,
            userinfo:payload
        }
    }
        }
}