'use strict';

export const randomUpTo = percentage => {
  return Math.trunc(Math.random() * percentage);
};

export const waitSeconds = async second => {
  return await new Promise(resolve => setTimeout(resolve, second * 1000));
};
