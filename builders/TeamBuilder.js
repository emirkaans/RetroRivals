'use strict';

import { Team } from '../models/Team.js';
import { buildManager } from './ManagerBuilder.js';
import { buildPlayers } from './PlayerBuilder.js';

export const buildTeam = teamData => {
  const allMembers = teamData.data.members.map(memberData => {
    if (memberData.type === 'Manager') {
      return buildManager(memberData);
    } else {
      return buildPlayers(memberData);
    }
  });

  const team = teamData.data.team;

  return new Team(team.fullName, team.budget, allMembers);
};
