'use client';

/**
 * Spectrum UI: Empty states
 *
 * Six product empty states from the Spectrum UI collection behind one
 * `variant` prop: a no-results search that resolves a suggested term, a
 * cleared inbox, a project starter with templates, an upload dropzone, a chart
 * that springs in sample data and an activity timeline seeded with its first
 * event. Each one sits in the same panel chrome, enters once when it scrolls
 * into view and is also exported on its own.
 */

import { ActivityEmpty, type ActivityEmptyProps } from './empty-states-activity';
import { ChartEmpty, type ChartEmptyProps } from './empty-states-chart';
import { InboxEmpty, type InboxEmptyProps } from './empty-states-inbox';
import { ProjectEmpty, type ProjectEmptyProps } from './empty-states-project';
import { SearchEmpty, type SearchEmptyProps } from './empty-states-search';
import { UploadEmpty, type UploadEmptyProps } from './empty-states-upload';

export { ActivityEmpty, ChartEmpty, InboxEmpty, ProjectEmpty, SearchEmpty, UploadEmpty };
export type {
  ActivityEmptyProps,
  ChartEmptyProps,
  InboxEmptyProps,
  ProjectEmptyProps,
  SearchEmptyProps,
  UploadEmptyProps,
};

export type EmptyStatesVariant = 'search' | 'inbox' | 'project' | 'upload' | 'chart' | 'activity';

export interface EmptyStatesProps {
  variant?: EmptyStatesVariant;
  className?: string;
}

export function EmptyStates({ variant = 'search', className }: EmptyStatesProps) {
  switch (variant) {
    case 'inbox':
      return <InboxEmpty className={className} />;
    case 'project':
      return <ProjectEmpty className={className} />;
    case 'upload':
      return <UploadEmpty className={className} />;
    case 'chart':
      return <ChartEmpty className={className} />;
    case 'activity':
      return <ActivityEmpty className={className} />;
    default:
      return <SearchEmpty className={className} />;
  }
}

export default EmptyStates;
