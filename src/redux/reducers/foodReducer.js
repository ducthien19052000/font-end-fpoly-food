import { notification } from 'antd'
import {ActionType} from '../Action/index'

const list ={
    lists: []
}

const foodReducer = (state=list,action) => {
    switch (action.type){
        case ActionType.GET_DATA:{
            return {...state}
        }
      
        case  ActionType.GET_DATA_SUCCESS: {
        
            return {...state, lists: action.payload.map((el, index) => ({...el, key: index}))}
          }
        case ActionType.GET_DATA_ERROR:{
            return {...state}
        }
        case ActionType.GET_DATA_GROUP_FOOD:{
            return {...state}
        }
      
        case  ActionType.GET_DATA_GROUP_FOOD_SUCCESS: {
        
            return {...state, lists: action.payload.map((el, index) => ({...el, key: index}))}
          }
        case ActionType.GET_DATA_GROUP_FOOD_ERROR:{
            return {...state}
        }
        case ActionType.ADD_DATA:{
            
            return {...state}
        }
        case ActionType.ADD_DATA_SUCCESS:{
            const newList = [...state.lists];
            newList.push(action.payload);
            notification['success']({
                message: 'Thông báo',
                description:
                  'Thêm thành công'
            })
            return {...state, lists: newList}
        }
        case ActionType.ADD_DATA_ERROR:{
            return {...state}
        }
        case ActionType.DELETE_DATA:{
            
            return {...state}
        }
        case ActionType.DELETE_DATA_SUCCESS:{
            
            notification['success']({
                message: 'Thông báo',
                description:
                  'Xóa thành công'
            })
            return {...state,lists: state.lists.filter(item=>item.id !== action.payload)}
        }
        case ActionType.DELETE_DATA_ERROR:{
            return {...state}
        }
        case ActionType.EDIT_DATA:{
            return {...state}
        }
        case ActionType.EDIT_DATA_SUCCESS:{
            notification['success']({
                message: 'Thông báo',
                description:
                  'Cập nhật thành công'
            })
            ;
            return {...state,lists: state.lists.map((item,index)=>{
                if(item.id === action.payload.id){
                    return {...action.payload,key: index}
                }
                return item;
            })}
        }
        case ActionType.EDIT_DATA_ERROR:{
            return {...state}
        }
        default:
            return state;
    }
}

export default foodReducer;
