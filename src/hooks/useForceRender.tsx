import { useCallback, useState } from "react";

export const useForceRender = () => {
  const [, setState] = useState(false);

  return useCallback(() => {
    setState((prevState) => !prevState);
  }, []);
};
