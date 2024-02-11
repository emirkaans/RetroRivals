'use strict';

import { Manager } from './Manager.js';

export class Team {
  constructor(fullName, budget, members) {
    this.fullName = fullName;
    this.budget = budget;
    this.members = members;

    this._parseMembers();
    this._calculateTeamAttack();
    this._calculateTeamDefense();
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

  _getManagerEffect() {
    const manager = this.manager;
    const managerEffect = (manager.knowledge + manager.tactics + manager.motivation + manager.discipline) / 4;

    return managerEffect;
  }

  _setTeamToPlayers() {
    this.players.map(player => {
      player.team = this;
    });
  }

  _getOffensivePlayers() {
    return this.players.filter(player => {
      return player.position === 'OS' || player.position === 'FV';
    });
  }

  _getDefensivePlayers() {
    return this.players.filter(player => {
      return player.position === 'DF';
    });
  }

  _calculatePlayersAttack() {
    const offensivePlayers = this._getOffensivePlayers();

    return (
      offensivePlayers.reduce((prev, player) => {
        return prev + Math.round((player.health + player.technique + player.speed + player.finishing + player.shooting + player.dribbling + player.tackling + player.stamina) / 8);
      }, 0) / offensivePlayers.length
    );
  }

  _calculatePlayersDefence() {
    const defensivePlayers = this._getDefensivePlayers();

    return (
      defensivePlayers.reduce((prev, player) => {
        return prev + Math.round((player.health + player.defense + player.tackling + player.stamina) / 4);
      }, 0) / defensivePlayers.length
    );
  }

  _calculateTeamAttack() {
    this.attack = Math.round((this._calculatePlayersAttack() + this._getManagerEffect()) / 2);
  }

  _calculateTeamDefense() {
    this.defense = Math.round((this._calculatePlayersDefence() + this._getManagerEffect()) / 2);
  }
}
