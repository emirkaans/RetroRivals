'use strict';

export const randomUpTo = percentage => {
  return Math.trunc(Math.random() * percentage);
};

export const getRandomBetween = (smallNum, bigNum) => {
  return Math.floor(Math.random() * (bigNum - smallNum + 1)) + smallNum;
};

export const waitSeconds = async second => {
  return await new Promise(resolve => setTimeout(resolve, second * 1000));
};

export const getRandomItem = array => {
  return array[randomUpTo(array.length)];
};

export const getDataFrom = async url => {
  const response = await fetch(url);

  return await response.json();
};

// Possibilities

export const isGkSaveCorner = goalKeeper => {
  return (goalKeeper.reflexes + goalKeeper.bounce) / 2 > randomUpTo(100);
};
