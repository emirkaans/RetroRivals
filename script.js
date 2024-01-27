'use strict';

import { Manager } from './models/Manager.js';
import { GoalKeeper } from './models/GoalKeeper.js';
import { Footballer } from './models/Footballer.js';
import { Team } from './models/Team.js';

// Fenerbahçe Players

const volkanDemirel = new GoalKeeper('Volkan Demirel', '1', 25, 189, 19, 'KL', 15, 17, 16);
const diegoLugano = new Footballer('Diego Lugano', '2', 28, 189, 19, 'DF', 13, 13, 12, 12, 12, 18, 15, 19, 18);
const robertoCarlos = new Footballer('Roberto Carlos', '3', 36, 169, 18, 'DF', 17, 18, 16, 19, 18, 17, 17, 16, 16);
const eduDracena = new Footballer('Edu Dracena', '4', 28, 184, 18, 'DF', 11, 12, 7, 8, 10, 15, 13, 12, 17);
const emreBelozoglu = new Footballer('Emre Belözoğlu', '5', 34, 169, 17, 'OS', 18, 17, 17, 18, 16, 18, 13, 17, 17);
const gokcekVederson = new Footballer('Gökçek Vederson', '6', 28, 174, 18, 'DF', 18, 15, 16, 16, 15, 15, 15, 14, 16);
const alexDeSouza = new Footballer('Alex De Souza', '10', 32, 173, 18, 'OS', 19, 15, 18, 15, 18, 17, 15, 17, 18);
const ugurBoral = new Footballer('Uğur Boral', '25', 23, 176, 18, 'OS', 17, 16, 16, 16, 15, 17, 14, 15, 16);
const colinKazım = new Footballer('Colin Kazım', '8', 24, 178, 19, 'FV', 18, 15, 16, 17, 16, 16, 15, 15, 17);
const daniGuiza = new Footballer('Dani Guiza', '14', 28, 180, 18, 'FV', 17, 17, 17, 16, 15, 16, 16, 14, 16);
const semihSenturk = new Footballer('Semih Şentürk', '23', 24, 176, 18, 'FV', 16, 16, 19, 17, 16, 17, 17, 15, 17);

const playersFenerbahce = [volkanDemirel, diegoLugano, robertoCarlos, eduDracena, emreBelozoglu, gokcekVederson, alexDeSouza, ugurBoral, colinKazım, daniGuiza, semihSenturk];

// Fenerbahçe Manager

const zico = new Manager('Zico', 17, 18, 18, 15);

// Fenerbahçe Team

const fenerbahce = new Team('Fenerbahçe', 900000000, zico, playersFenerbahce);

// ////////////////////////////////

// Galatasaray Players

const morganDeSanctis = new GoalKeeper('Morgan De Sanctis', '26', 31, 190, 18, 'KL', 16, 15, 14);
const emreAsik = new Footballer('Emre Aşık', '4', 35, 187, 17, 'DF', 16, 12, 13, 11, 9, 10, 15, 8, 9);
const servetCetin = new Footballer('Servet Çetin', '21', 27, 192, 18, 'DF', 15, 16, 12, 10, 8, 9, 16, 7, 8);
const hakanBalta = new Footballer('Hakan Balta', '22', 25, 183, 17, 'DF', 16, 13, 14, 12, 10, 16, 14, 9, 17);
const sabriSarioglu = new Footballer('Sabri Sarıoğlu', '55', 23, 173, 16, 'DF', 17, 14, 15, 13, 11, 12, 13, 10, 18);
const ayhanAkman = new Footballer('Ayhan Akman', '5', 31, 175, 16, 'OS', 17, 15, 16, 14, 12, 13, 12, 11, 12);
const ardaTuran = new Footballer('Arda Turan', '66', 21, 177, 17, 'OS', 18, 17, 18, 16, 14, 15, 13, 12, 18);
const lincoln = new Footballer('Lincoln', '10', 29, 176, 16, 'OS', 17, 18, 19, 17, 15, 16, 14, 13, 15);
const baros = new Footballer('Milan Baroš', '15', 26, 182, 17, 'FV', 18, 16, 17, 18, 16, 17, 15, 14, 15);
const nonda = new Footballer('Shabani Nonda', '9', 31, 180, 16, 'FV', 16, 15, 16, 17, 15, 16, 16, 13, 17);
const umitKaran = new Footballer('Ümit Karan', '18', 31, 184, 17, 'FV', 16, 14, 15, 16, 17, 18, 17, 12, 13);

const playersGalatasaray = [morganDeSanctis, emreAsik, servetCetin, hakanBalta, sabriSarioglu, ayhanAkman, ardaTuran, lincoln, baros, nonda, umitKaran];

// Galatasaray Manager

const fatihTerim = new Manager('Fatih Terim', 16, 18, 18, 18);

// Galatasaray Team

const galatasaray = new Team('Galatasaray', 800000000, fatihTerim, playersGalatasaray);

class Match {
  constructor(teamHome, teamAway) {
    this.teamHome = teamHome;
    this.teamAway = teamAway;
    this.time = 0;
    this.isMatchOver = false;

    this.setScore();
  }

  setScore() {
    this.score = {};
    this.score[this.teamHome.fullName] = 0;
    this.score[this.teamAway.fullName] = 0;
  }

  goal(teamName) {
    this.score[teamName] += 1;
  }

  penalty(team) {}

  corner(team) {}

  offside() {}

  _startMatch() {}
  _finishMatch() {}
}

const match = new Match(fenerbahce, galatasaray);

match.goal(fenerbahce.fullName);

console.log(match);
