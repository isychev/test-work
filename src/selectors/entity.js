import { createSelector } from 'reselect';
import { getEntities, getEntityAlias } from './common';

export const tempEntity = null;

export const selectorEntity = createSelector(
  getEntities,
  getEntityAlias,
  (entities, entityAlias) => entities[entityAlias],
);
