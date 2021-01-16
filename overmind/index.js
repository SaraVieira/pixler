import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createHook,
} from "overmind-react";
import * as effects from "./effects";
import { state } from "./state";
import * as actions from "./actions";

export const config = {
  state,
  actions,
  effects,
};

export const useState = createStateHook();
export const useActions = createActionsHook();
export const useEffects = createEffectsHook();
export const useReaction = createReactionHook();
export const useOvermind = createHook();
