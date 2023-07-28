import { useCallback, useContext } from 'react';
import { AxiosContext } from './AxiosContext';
import { AxiosInstance } from 'axios';

const useAxios = () => {
  const { instances, addInstance, removeInstance } = useContext(AxiosContext);

  const getInstance = useCallback((name: string): AxiosInstance | undefined => {
    const foundInstance = instances?.get(name);
    return foundInstance;
  }, [instances]);

  return {
    getInstance,
    addInstance,
    removeInstance,
  };
};

export default useAxios;
