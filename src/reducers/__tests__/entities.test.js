import reducer from '../entities';
import {
  onDeleteEntity,
  onCreateEntity,
  onUpdateEntity,
} from '../../actions/entity';

import { ENTITY_LOAD_SUCCESS } from '../../reduxConstants';

const tempEntity = {
  item: 'item',
};
const entityAlias = 'entityAlias';

describe('Entities reducer', () => {
  it('should return default state', () => {
    expect(reducer()).toEqual({});
  });
  it('should handle ENTITY_CREATE', () => {
    expect(
      reducer(
        {},
        onCreateEntity({
          entityAlias,
          entity: tempEntity,
        }),
      ),
    ).toEqual({
      [entityAlias]: tempEntity,
    });
  });
  it('should handle ENTITY_UPDATE', () => {
    expect(
      reducer(
        {},
        onUpdateEntity({
          entityAlias,
          entity: tempEntity,
        }),
      ),
    ).toEqual({
      [entityAlias]: tempEntity,
    });
  });
  it('should handle ENTITY_DELETE', () => {
    expect(
      reducer(
        {
          entityAlias: tempEntity,
        },
        onDeleteEntity({ entityAlias }),
      ),
    ).toEqual({});
  });

  it('should handle ENTITY_CREATE', () => {
    expect(
      reducer(
        {},
        {
          type: ENTITY_LOAD_SUCCESS,
          payload: {
            entityAlias,
            data: tempEntity,
          },
        },
      ),
    ).toEqual({
      [entityAlias]: tempEntity,
    });
  });

  it('should handle ENTITY_LOAD_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: ENTITY_LOAD_SUCCESS,
          payload: {
            entityAlias,
            data: tempEntity,
          },
        },
      ),
    ).toEqual({
      [entityAlias]: tempEntity,
    });
  });
});
