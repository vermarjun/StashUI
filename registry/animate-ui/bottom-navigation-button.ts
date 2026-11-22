import type { Transition } from 'motion/react';

import { motionTokens } from './bottom-navigation-motion';

const SCALE_SPRING: Transition = motionTokens.spring.press;

const TAP_SCALE = motionTokens.scale.press;

export { SCALE_SPRING, TAP_SCALE };
