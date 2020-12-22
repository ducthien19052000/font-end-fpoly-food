import { notification } from 'antd'
import {ActionType} from '../Action/categoryAction'

const list ={
    lists: []
}

const groupReducer = (state=list,action) => {
    switch (action.type){
        case ActionType.GET_DATE_CATEGORY:{
            return {...state}
        }
      
        case  ActionType.GET_DATE_CATEGORY_SUCCESS: {
        
            return {...state, lists: action.payload.map((el, index) => ({...el, key: index}))}
          }
        case ActionType.GET_DATE_CATEGORY_ERROR:{
            return {...state}
        }
        case ActionType.ADD_DATA_CATEGORY:{
            
            return {...state}
        }
        case ActionType.ADD_DATA_CATEGORY_SUCCESS:{
            const newList = [...state.lists];
            newList.push(action.payload);
            notification['success']({
                message: 'Thông báo',
                description:
                  'Thêm thành công'
            })
            return {...state, lists: newList}
        }
        case ActionType.ADD_DATA_CATEGORY_ERROR:{
            return {...state}
        }
        case ActionType.DELETE_DATA_CATEGORY:{
            return {...state}
        }
        case ActionType.DELETE_DATA_CATEGORY_SUCCESS:{
            console.log(action.payload)
            notification['success']({
                message: 'Thông báo',
                description:
                  'Xóa thành công'
            })
            return {...state,lists: state.lists.filter(item=>item.id !== action.payload)}
        }
        case ActionType.DELETE_DATA_CATEGORY_ERROR:{
            return {...state}
        }
        case ActionType.EDIT_DATA_CATEGORY:{
            return {...state}
        }
        case ActionType.EDIT_DATA_CATEGORY_SUCCESS:{
            console.log(action.payload)
            notification['success']({
                message: 'Thông báo',
                description:
                  'Cập nhật thành công'
            })
            
            return {...state,lists: state.lists.map((item,index)=>{
                if(item.id === action.payload.id){
                    return {...action.payload,key: index}
                }
                return item;
            })}
        }
        case ActionType.EDIT_DATA_CATEGORY_ERROR:{
            return {...state}
        }
        default:
            return state;
    }
}

export default groupReducer;