import states from "@/constants/states-and-lgas";
import { useEffect, useState } from "react";
import { Option } from "react-multi-select-component";

const useStateAndLga = (state: string) => {
  const [lgaOptions, setLgaOptions] = useState<Option[]>([]);

  useEffect(() => {
    const lgas = states.find((_state) => _state.state === state)?.lgas;
    if (lgas) {
      const options = lgas.map((lga) => ({ label: lga, value: lga }));
      setLgaOptions(options);
    } else {
      setLgaOptions([]);
    }
  }, [state]);

  return { lgaOptions };
};

export default useStateAndLga;
