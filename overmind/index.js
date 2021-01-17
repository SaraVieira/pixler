import { createHook } from "overmind-react";
import * as effects from "./effects";
import { state } from "./state";
import * as actions from "./actions";

export const config = {
  state,
  actions,
  effects,
};

export const useOvermind = createHook();
