'use strict';

import { Manager } from '../models/Manager.js';

export const buildManager = manager => {
  return new Manager(manager.fullName, manager.knowledge, manager.tactics, manager.motivation, manager.discipline);
};
