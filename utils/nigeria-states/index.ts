import states from "@/constants/states-and-lgas";

export const nigeriaStates = states.map((state) => state.state);

export const getLgas = (state: string) =>
  states.find((_state) => _state.state === state)?.lgas;
