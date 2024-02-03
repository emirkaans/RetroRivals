'use strict';

import { Manager } from './Manager.js';

export class Team {
  constructor(fullName, budget, members) {
    this.fullName = fullName;
    this.budget = budget;
    this.members = members;

    this._parseMembers();
    this._calculateAttack();
    this._calculateDefense();
    this._setTeamToPlayers();
  }

  _parseMembers() {
    this.manager = this.members.find(member => member instanceof Manager);
    this.players = this.members.filter(member => !(member instanceof Manager));
    delete this.members;
  }

  addPlayer(newPlayer) {
    this.players.push(newPlayer);
  }

  removePlayer(deletedPlayer) {
    this.players = this.players.filter(player => {
      player.playerNumber !== deletedPlayer.playerNumber;
    });
  }

  updateBudget(amount) {
    this.budget += amount;
  }

  getInjuredPlayers() {
    return this.players.filter(player => player.health < 60);
  }

  getManagerEffect() {
    const manager = this.manager;
    const managerEffect = (manager.knowledge + manager.tactics + manager.motivation + manager.discipline) / 4;

    return managerEffect;
  }

  _setTeamToPlayers() {
    this.players.map(player => {
      player.team = this;
    });
  }

  _calculateAttack() {
    const offensivePlayers = this.players.filter(player => {
      return player.position === 'OS' || player.position === 'FV';
    });
    const averageAttackPoints = [];
    offensivePlayers.map(player => {
      const playerAverage = Math.round((player.health + player.technique + player.speed + player.finishing + player.shooting + player.dribbling + player.tackling + player.stamina) / 8);

      averageAttackPoints.push(playerAverage);
    });

    const playersAttack =
      averageAttackPoints.reduce((prev, cur) => {
        return prev + cur;
      }, 0) / averageAttackPoints.length;

    this.attack = Math.round((playersAttack + this.getManagerEffect()) / 2);
  }

  _calculateDefense() {
    const defensivePlayers = this.players.filter(player => {
      return player.position === 'DF';
    });
    const averageDefensePoints = [];
    defensivePlayers.map(player => {
      const playerAverage = Math.round((player.health + player.defense + player.tackling + player.stamina) / 4);

      averageDefensePoints.push(playerAverage);
    });

    const playersDefense =
      averageDefensePoints.reduce((prev, cur) => {
        return prev + cur;
      }, 0) / averageDefensePoints.length;

    this.defense = Math.round((playersDefense + this.getManagerEffect()) / 2);
  }
}
