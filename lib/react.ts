import type { ReactNode } from 'react';

import { isNotNullOrUndefined } from './index';

export const hasRenderableNode = (node: ReactNode): boolean => {
  return isNotNullOrUndefined(node) && node !== false && (typeof node !== 'string' || node.length > 0);
};
