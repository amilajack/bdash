import { dispatch } from './QueryStore';
import { setting } from '../../../lib/Setting';
import Database from '../../../lib/Database';

const DEFAULT_QUERY_TITLE = 'New Query';

export default {
  initialize() {
    Promise.all([
      Database.Query.getAll(),
      Database.DataSource.getAll(),
    ]).then(([queries, dataSources]) => {
      dispatch('initialize', { queries, dataSources, setting: setting.load() });
    });
  },

  selectQuery(id) {
    Database.Query.find(id).then(query => {
      dispatch('selectQuery', { id, query });
    });
  },

  addNewQuery({ dataSourceId }) {
    let params = {
      title: DEFAULT_QUERY_TITLE,
      dataSourceId: dataSourceId,
    };

    Database.Query.create(params).then(query => {
      dispatch('addNewQuery', { query });
    });
  },

  updateQuery(id, params) {
    dispatch('updateQuery', { id, params });
    Database.Query.update(id, params);
  },

  deleteQuery(id) {
    Database.Query.del(id).then(() => {
      dispatch('deleteQuery', { id });
    });
  },

  executeQuery({ line, query }) {
    console.log(line, query);
  },

  cancelQuery(query) {
    console.log(query);
  },

  updateEditor(params) {
    dispatch('updateEditor', params);
  },
};
