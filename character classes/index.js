
class Character {
    /**
     *
     * @param {string} name    The name of the character
     * @param {number} maxHp   Maximum HP (120 is pretty good)
     * @param {number} attack  The default attack stat (kris normally has 10)
     * @param {number} defence The default defence stat (kris normally has 2)
     */
    constructor(name, maxHp, attack, defence) {
        this.name = name;
        this.hp = maxHp;
        this.maxHp = maxHp;
        this.attack = attack;
        this.defence = defence;
		this.statusEffects = [];
    }

	addStatusEffect(statusEffectId) {
		this.statusEffects.push(statusEffectId);
	}

	removeStatusEffect(statusEffectId) {
		const index = this.statusEffects.indexOf(statusEffectId);
		if (index !== -1) {
			this.statusEffects.splice(index, 1);
		}
	}

	hasStatusEffect(statusEffectId) {
		return this.statusEffects.includes(statusEffectId);
	}

	/**
	 *
	 * @param {number} amount    The amount to heal the character
	 * @param {bool}   ignoreReviveLimit When healing a DOWNED character to above 0 set HP straight to amount. (normally it becomes 1/6th of the max hp)
	 */
    heal(amount, ignoreReviveLimit=false) {
        const prev = this.hp
        this.hp = Math.min(this.hp + amount, this.maxHp)
        if (this.hasStatusEffect(statusEffects.DOWN) && this.hp > 0) {
        	this.removeStatusEffect(statusEffects.DOWN)
			if (ignoreReviveLimit) {
				this.hp = Math.min(amount, this.maxHp);
			} else {
				this.hp = Math.ceil(this.maxHp/6);
			}
        }
        console.log(`Healed ${this.name} (${prev} => ${this.hp})`)
    }

    hurt(amount) {
        const prev = this.hp;
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = -this.maxHp / 2;
            this.addStatusEffect(statusEffects.DOWN);
        }
        console.log(`${this.name} took damage (${prev} => ${this.hp})`)
    }
}

class Player extends Character {
    /**
     * 
     * @param {string} name    The name of the character
     * @param {number} maxHp   Maximum HP (120 is pretty good)
     * @param {number} attack  The default attack stat (kris normally has 10)
     * @param {number} defence The default defence stat (kris normally has 2)
     * @param {number} magic   Effectiveness of Spells.
     */
    constructor(name, maxHp, attack, defence, magic) {
        super(name, maxHp, attack, defence);
        this.magic = magic;
    }
}
class Enemy extends Character {
    /**
     * 
     * @param {string} name    The name of the character
     * @param {number} maxHp   Maximum HP (120 is pretty good)
     * @param {number} attack  The default attack stat (kris normally has 10)
     * @param {number} defence The default defence stat (kris normally has 2)
     */
    constructor(name, maxHp, attack, defence) {
        super(name, maxHp, attack, defence);
        this.mercy = 0;
    }
}

test = new Character("testCharacter1", 120, 10, 2);
test.hurt(60)
test.heal(30)
test.heal(100)
test.hurt(120)
