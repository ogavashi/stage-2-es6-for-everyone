import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const leftHealthBar = document.querySelector('#left-fighter-indicator');
    leftHealthBar.style.width = '100%';
    const rightHealthBar = document.querySelector('#right-fighter-indicator');
    rightHealthBar.style.width = '100%';

    const keyCombo = [];

    const state = {
      leftFighter: {
        ...firstFighter,
        isBlocking: false,
        ultimateCooldown: false
      },
      rightFighter: {
        ...secondFighter,
        isBlocking: false,
        ultimateCooldown: false
      }
    };

    document.addEventListener('keydown', (event) => {
      if (!event.repeat) {
        if (!keyCombo.includes(event.code)) keyCombo.push(event.code);

        if (comboCheck(keyCombo, controls.PlayerOneCriticalHitCombination)) {
          fightLogic({ type: controls.PlayerOneCriticalHitCombination });
        }

        if (comboCheck(keyCombo, controls.PlayerTwoCriticalHitCombination)) {
          fightLogic({ type: controls.PlayerTwoCriticalHitCombination });
        }

        fightLogic({ type: event.code });

        onHpChange();
      }
    });

    document.addEventListener('keyup', (event) => {
      keyCombo.splice(keyCombo.indexOf(event.code));
      defenseLogic({ type: event.code });
    });

    const fightLogic = (action) => {
      switch (action.type) {
        case controls.PlayerOneAttack:
          if (!state.rightFighter.isBlocking && !state.leftFighter.isBlocking) {
            state.rightFighter.health -= getDamage(firstFighter, secondFighter);
          }
          break;

        case controls.PlayerTwoAttack:
          if (!state.leftFighter.isBlocking && !state.rightFighter.isBlocking) {
            state.leftFighter.health -= getDamage(secondFighter, firstFighter);
          }
          break;

        case controls.PlayerOneBlock:
          state.leftFighter.isBlocking = true;
          break;

        case controls.PlayerTwoBlock:
          state.rightFighter.isBlocking = true;
          break;

        case controls.PlayerOneCriticalHitCombination:
          if (!state.leftFighter.ultimateCooldown && !state.leftFighter.isBlocking) {
            state.rightFighter.health -= state.leftFighter.attack * 2;
            state.leftFighter.ultimateCooldown = true;
            setCoolDown(state.leftFighter);
          }
          break;

        case controls.PlayerTwoCriticalHitCombination:
          if (!state.rightFighter.ultimateCooldown && !state.rightFighter.isBlocking) {
            state.leftFighter.health -= state.rightFighter.attack * 2;
            state.rightFighter.ultimateCooldown = true;
            setCoolDown(state.rightFighter);
          }
          break;
      }
    };

    const defenseLogic = (action) => {
      switch (action.type) {
        case controls.PlayerOneBlock:
          state.leftFighter.isBlocking = false;
          break;

        case controls.PlayerTwoBlock:
          state.rightFighter.isBlocking = false;
          break;
      }
    };

    const setCoolDown = (fighter) => {
      setTimeout(() => {
        fighter.ultimateCooldown = false;
      }, 10000);
    };

    const comboCheck = (keys, combo) => {
      return keys.every((key) => combo.includes(key)) && combo.every((key) => keys.includes(key));
    };

    const onHpChange = () => {
      if (state.leftFighter.health <= 0) {
        state.leftFighter.health = 0;
        resolve(secondFighter);
      }

      if (state.rightFighter.health <= 0) {
        state.rightFighter.health = 0;
        resolve(firstFighter);
      }

      rightHealthBar.style.width = (100 * state.rightFighter.health) / secondFighter.health + '%';
      leftHealthBar.style.width = (100 * state.leftFighter.health) / firstFighter.health + '%';
    };
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);

  return hitPower > blockPower ? hitPower - blockPower : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const hitPower = fighter.attack * (Math.random() + 1);
  return hitPower;
}

export function getBlockPower(fighter) {
  // return block power
  const blockPower = fighter.defense * (Math.random() + 1);
  return blockPower;
}
