// Carrega o estado de autenticação do localStorage
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('authState');
      if (serializedState === null) {
        return undefined; // Retorna undefined para que o reducer use o estado inicial
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state from localStorage", err);
      return undefined;
    }
  };
  
  // Salva o estado de autenticação no localStorage
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('authState', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  };