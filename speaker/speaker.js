'use strict';

import { randomUpTo } from '../helpers.js';

export const commentCorner = async (footballer, goalKeeper, isAttack, isGoal) => {
  try {
    const response = await fetch('./speaker/comments/corner.json');
    const comments = await response.json();
    const goalKeeperName = (goalKeeper || {}).fullName || '';
    const footballerName = (footballer || {}).fullName || '';

    if (!isAttack) {
      if (footballerName === '') {
        return comments.goalKeeperSucceed[randomUpTo(comments.goalKeeperSucceed.length)].replaceAll('{goalKeeperName}', goalKeeperName);
      } else {
        return comments.defenseSucceed[randomUpTo(comments.defenseSucceed.length)].replaceAll('{footballerName}', footballerName);
      }
    } else {
      if (isGoal) {
        return comments.goal[randomUpTo(comments.goal.length)].replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
      } else {
        return comments.attackFailed[randomUpTo(comments.attackFailed.length)].replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
      }
    }
  } catch (err) {
    console.log(err);
  }

  //   if (!isAttack) {
  //     if (footballerName === '') {
  //       return comments.goalKeeperSucceed[randomUpTo(goalKeeperSucceed.length)];
  //     } else {
  //       return defenseSucceed[randomUpTo(defenseSucceed.length)];
  //     }
  //   } else {
  //     if (isGoal) {
  //       return goal[randomUpTo(goal.length)];
  //     } else {
  //       return attackFailed[randomUpTo(attackFailed.length)];
  //     }
  //   }

  //   const goalKeeperSucceed = [
  //     `${goalKeeperName}, kalabalığın içinden sıyrılıp topu güvenle kucaklıyor!`,
  //     `Ve ${goalKeeperName}, yüksekten gelen topu emin ellerle kontrol ediyor!`,
  //     `${goalKeeperName}, hava hakimiyetini gösteriyor ve topu rahatça alıyor!`,
  //     `İşte bir kaleci klasiği! ${goalKeeperName}, kornerden gelen topu sorunsuz bir şekilde yakalıyor.`,
  //     `${goalKeeperName}, yüksekten gelen topu başarı ile kontrol etmeyi başardı!`,
  //   ];

  //   const defenseSucceed = [
  //     `${footballerName} kafayla ceza sahasından uzaklaştırıyor topu!`,
  //     `${footballerName} yükseldi ve tehlikeyi uzaklaştırdı!`,
  //     `Kritik bir müdahale! ${footballerName}, topu güvenli bölgeye gönderiyor!`,
  //     `${footballerName}, topu önünde buldu ve derhal uzaklaştırdı.`,
  //     `Savunma hattı sağlam! ${footballerName}, topu uzaklaştırarak tehlikeyi savuşturuyor.`,
  //   ];

  //   const attackFailed = [
  //     `${footballerName} yükseldi vurdu kafayı ancak ${goalKeeperName} müthiş uzandı çıkardı topu!`,
  //     `İşte bir kafa vuruşu! Ama ${goalKeeperName}, inanılmaz bir refleksle topu kurtarıyor!`,
  //     `${footballerName}, kafayı vuruyor ama top direğin yanından az farkla dışarı gidiyor!`,
  //     `${footballerName} topu önünde buldu vurdu ama ${goalKeeperName}, son anda topu kornere çelerek gole izin vermiyor!`,
  //     `${footballerName} iyi yükseldi ama top az farkla üstten auta çıkıyor!`,
  //   ];

  //   const goal = [
  //     `${footballerName} kafayı vuruyor ve topu ağlara gönderiyor! ${goalKeeperName} çaresiz kalıyor! Köşeye giden bu topu nasıl çıkarsın!`,
  //     `Ve gol! ${footballerName}, mükemmel bir kafa vuruşuyla topu filelerle buluşturuyor!`,
  //     `${footballerName}, kusursuz bir zamanlamayla yükseliyor ve topu köşeden ağlara gönderiyor!`,
  //     `İşte bu! ${footballerName}, harika bir kafa vuruşuyla skoru değiştiriyor!`,
  //     `${footballerName}, yüksekten gelen topa mükemmel vuruyor ve topu ${goalKeeperName}'in sağından ağlara yolluyor!`,
  //   ];
};
