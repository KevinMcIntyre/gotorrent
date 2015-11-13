import { createStore } from 'redux';
import reducers from '../reducers/reducers.js';

export const store = createStore(reducers);