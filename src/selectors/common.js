import { ENTITIES } from '../reduxConstants';

export const getEntityAlias = (_, props) => props && props.entityAlias;
export const getEntities = state => state && state[ENTITIES];
