import { useReducer, useEffect } from 'react';
import { ApiState } from '../enum/ApiState';


function reducer(state, action) {
  switch (action.state) {
    case ApiState.Success:
      return {
        isLoading: false,
        data: action.data,
        msg: action.msg
      };
    case ApiState.Error:
      return {
        isLoading: false,
        data: null,
        msg: action.msg
      };
    default:
      return {
        isLoading: false,
        data: null,
        msg: null
      };
  }
}

export default function ApiAsync(callback, deps = []) {

  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    data: null
  });


  const fetchData = async () => {
    try {

      const response = await callback();

      dispatch({ 
        state: ApiState.Success, 
        data: response.data,
        isLoading: false
      });

    } catch (e) {

      dispatch({ 
        state: ApiState.Error, 
        data: null,
        isLoading: false,
        error: e 
      });

    }
  };

  const { isDone } = state;

  useEffect(() => {
    if(isDone){
      return;
    }

    fetchData();

  // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}