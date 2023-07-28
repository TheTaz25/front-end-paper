import axios, { AxiosInstance } from 'axios';
import { createContext, useState, useEffect } from 'react';
import { DEFAULT_BACKEND } from './keys';

type State = {
  instances: Map<string, AxiosInstance>
  addInstance: (name: string, instance: AxiosInstance) => void,
  removeInstance: (name: string) => void,
}

const AxiosContext = createContext<State>({
  instances: new Map(),
  addInstance: () => {},
  removeInstance: () => {},
})

const AxiosProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [instances, setInstances] = useState<Map<string, AxiosInstance>>(new Map());

  const addInstance = (name: string, instance: AxiosInstance) => {
    setInstances((previous) => {
      let newInstances = new Map(previous);
      newInstances.set(name, instance);

      return newInstances;
    });
  }

  const removeInstance = (name: string) => {
    setInstances((previous) => {
      let newInstances = new Map(previous);
      newInstances.delete(name);
      return newInstances;
    })
  }

  useEffect(() => {
    const defaultBackendInstance = axios.create({
      baseURL: 'http://localhost:8080'
    });

    addInstance(DEFAULT_BACKEND, defaultBackendInstance);
  }, []);

  return (
    <AxiosContext.Provider value={{
      instances,
      addInstance,
      removeInstance,
    }}>
      {children}
    </AxiosContext.Provider>
  )
}

export { AxiosContext, AxiosProvider };
