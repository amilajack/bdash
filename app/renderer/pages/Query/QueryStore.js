import Setting from '../../../lib/Setting';
import Store from '../../flux/Store';

export default class QueryStore extends Store {
  getInitialState() {
    return {
      setting: Setting.getDefault(),
      queries: [],
      dataSources: [],
      charts: [],
      selectedQueryId: null,
      editor: {
        height: null,
        line: null,
      },
    };
  }

  reduce(type, payload) {
    switch (type) {
      case 'initialize': {
        return this.merge(payload);
      }
      case 'selectQuery': {
        let idx = this.findQueryIndex(payload.id);
        return this
          .set('selectedQueryId', payload.id)
          .set('editor.line', null)
          .merge(`queries.${idx}`, payload.query);
      }
      case 'addNewQuery': {
        return this
          .set('selectedQueryId', payload.query.id)
          .set('editor.line', null)
          .prepend('queries', payload.query);
      }
      case 'updateQuery': {
        let idx = this.findQueryIndex(payload.id);
        return this.merge(`queries.${idx}`, payload.params);
      }
      case 'deleteQuery': {
        let idx = this.findQueryIndex(payload.id);
        return this
          .set('selectedQueryId', null)
          .set('editor.line', null)
          .del(`queries.${idx}`, payload.id);
      }
      case 'updateEditor': {
        return this.merge('editor', payload);
      }
    }
  }

  findQueryIndex(id) {
    let idx = this.state.queries.findIndex(q => q.id === id);

    if (idx === undefined) {
      throw new Error(`query id:${id} not found`);
    }

    return idx;
  }
}

let { store, dispatch } = Store.create(QueryStore);
export { store, dispatch };
