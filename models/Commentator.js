'use strict';

import { getRandomItem, getDataFrom } from '../helpers.js';

export class Commentator {
  constructor() {}

  update(event, team, player, otherTeam) {
    if (event === 'match_start') {
      this.matchStart(team, otherTeam);
    } else if (event === 'first_half_end') {
      this.finishFirstHalf(team, otherTeam);
    } else if (event === 'second_half_start') {
      this.startSecondHalf(team, otherTeam);
    } else if (event === 'match_end') {
      this.finishMatch(team, otherTeam);
    } else if (event === 'goal') {
      this.goal(team, player);
    } else if (event === 'shot') {
      this.shot(team, player);
    } else if (event === 'corner') {
      this.corner(team, otherTeam);
    } else if (event === 'gk_save_corner') {
      this.gkSaveCorner(team, player);
    } else if (event === 'gk_save_shot') {
      this.gkSaveShot(team, player);
    } else if (event === 'df_save_corner') {
      this.dfSaveCorner(team, player);
    } else if (event === 'fv_shot_corner') {
      this.fvShotCorner(team, player);
    } else if (event === 'freekick') {
      this.freekick(team, player);
    } else if (event === 'gk_save_freekick') {
      this.gkSaveFreekick(team, player);
    } else if (event === 'penalty') {
      this.penalty(team, player);
    } else if (event === 'gk_save_penalty') {
      this.gkSavePenalty(team, player);
    }
  }

  matchStart(teamHome, teamAway) {
    console.log(`Hepinize büyük derbi akşamından selamlar. ${teamHome.fullName} evinde ${teamAway.fullName} takımını ağırlıyor. Heyecanlı bir mücadele bizleri bekliyor.`);
  }
  finishFirstHalf(teamHome, teamAway) {
    console.log(`Ve ${teamHome.fullName} - ${teamAway.fullName} mücadelesinde ilk yarı sona eriyor. Bakalım ikinci yarıda bizleri neler bekliyor`);
  }

  startSecondHalf(teamHome, teamAway) {
    console.log(`Ve hakemin düdüğü ile ikinci yarı başlıyor... ${teamHome.fullName} ve ${teamAway.fullName} takımlarının her ikisi de galibiyeti elde etmeye çalışıyor güzel bir ikinci yarı izleyeceğiz!`);
  }

  finishMatch(teamAttack, teamDefence) {
    console.log(`Ve hakemin son düdüğü ile maç sona eriyor`);
  }

  shot(teamAttack, footballer) {
    console.log(`${footballer.fullName} topla ilerliyor, ceza sahasına yaklaştı... Önünü boşalttı... Bir şuuut`);
  }

  goal(teamAttack, player) {
    console.log(`${player.fullName} mükemmel bir gol atıyor. ${teamAttack.fullName} takımının bu sezon parlayan yıldızı!`);
  }

  corner(teamAttack, teamDefence) {
    console.log(`${teamAttack.fullName} köşe vuruşunu kullanacak. Seyirciler nefesini tuttu bekliyorlar! ${teamDefence.fullName} savunması yerini aldı`);
  }

  gkSaveCorner(teamDefence, goalKeeper) {
    console.log(`${goalKeeper.fullName} çıktı ve kornerden gelen topu başarı ile kontrol etti. ${teamDefence.fullName} rahat bir nefes alıyor.`);
  }

  gkSaveShot(teamDefence, goalKeeper) {
    console.log(`${goalKeeper.fullName} müthiş uzandı ve çıkardı topu!`);
  }

  dfSaveCorner(teamDefence, footballer) {
    console.log(`Orta geldi... Ancak ${teamDefence.fullName} savunması devrede! ${footballer.fullName} başarı ile uzaklaştırdı topu.`);
  }

  fvShotCorner(teamAttack, footballer) {
    console.log(`Orta geldi... ${footballer.fullName} iyi yükseldi...Bir kafa...Ancak...`);
  }

  freekick(teamAttack, footballer) {
    console.log(`${teamAttack.fullName} serbest vuruşu kullanacak. ${footballer.fullName} topun başına geldi. Gözler hakemde. Düdük geldi... ${footballer.fullName} geliyoor...`);
  }

  gkSaveFreekick(teamDefence, goalKeeper) {
    console.log(`${goalKeeper.fullName} müthiş uzandı ve çıkarmayı başardı topu! ${teamDefence.fullName} barajının üstünden füze gibi geçen topu müthiş çıkardı ${goalKeeper.fullName}`);
  }

  penalty(teamAttack, footballer) {
    console.log(`${footballer.fullName} ceza sahasına sokuldu.. bir çalım... yerde kalıyor gözler hakemde... Evet verdi penaltıyı! ${teamAttack.fullName} oldukça kritik bir penaltı kazanıyor!`);
  }

  gkSavePenalty(teamDefence, goalKeeper) {
    console.log(`${goalKeeper.fullName} uzandı ve kurtarıyooor! Zoru başardı müthiş uzandı ve penaltıyı kurtarıyor... ${teamDefence.fullName} takımını sırtlıyor adeta!`);
  }

  // async corner(footballer, goalKeeper, isAttack, isGoal) {
  //   try {
  //     const comments = await getDataFrom('./speaker/comments/corner.json');
  //     const goalKeeperName = (goalKeeper || {}).fullName || '';
  //     const footballerName = (footballer || {}).fullName || '';

  //     if (!isAttack) {
  //       if (footballerName === '') {
  //         return getRandomItem(comments.goalKeeperSucceed).replaceAll('{goalKeeperName}', goalKeeperName);
  //       } else {
  //         return getRandomItem(comments.defenseSucceed).replaceAll('{footballerName}', footballerName);
  //       }
  //     } else {
  //       if (isGoal) {
  //         return getRandomItem(comments.goal).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
  //       } else {
  //         return getRandomItem(comments.attackFailed).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

// Commentator corner metodu:

// async corner(footballer, goalKeeper, isAttack, isGoal) {
//   try {
//     const comments = await getDataFrom('./speaker/comments/corner.json');
//     const goalKeeperName = (goalKeeper || {}).fullName || '';
//     const footballerName = (footballer || {}).fullName || '';

//     if (!isAttack) {
//       if (footballerName === '') {
//         return getRandomItem(comments.goalKeeperSucceed).replaceAll('{goalKeeperName}', goalKeeperName);
//       } else {
//         return getRandomItem(comments.defenseSucceed).replaceAll('{footballerName}', footballerName);
//       }
//     } else {
//       if (isGoal) {
//         return getRandomItem(comments.goal).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
//       } else {
//         return getRandomItem(comments.attackFailed).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// ------------------

// Match corner metodu

// async _corner(teamAttack, teamDefense) {
//   const attackPlayers = teamAttack.players.filter(player => player.position !== 'KL' && player.height >= 180);
//   const defensePlayers = teamDefense.players.filter(player => player.position !== 'KL' && player.height >= 180);
//   const goalKeeper = teamDefense.players.find(player => player.position === 'KL');

//   if ((goalKeeper.reflexes + goalKeeper.bounce) / 2 > randomUpTo(100)) {
//     console.log(await commentCorner(undefined, goalKeeper, false, false));
//   } else {
//     const allPlayers = [...attackPlayers, ...defensePlayers];
//     const whoHeadedBall = getRandomItem(allPlayers);

//     if (whoHeadedBall.team.fullName === teamDefense.fullName) {
//       console.log(await commentCorner(whoHeadedBall, undefined, false, false));
//     } else {
//       if (randomUpTo(100) < 80) {
//         console.log(await commentCorner(whoHeadedBall, goalKeeper, true, false));
//       } else {
//         console.log(await commentCorner(whoHeadedBall, goalKeeper, true, true));
//         this._goal(teamAttack, true, whoHeadedBall);
//       }
//     }
//   }
// }
