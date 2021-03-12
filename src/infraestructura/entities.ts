import {injectable, inject} from "inversify";
import "reflect-metadata"; 
import {Weapon, ThrowableWeapon, Warrior} from "../dominio/interfaces";
import {TYPES} from "./types";

@injectable()
class Katana implements Weapon{
	hit(): string {
	  return "cur!";
	}
}

@injectable()
class Shuriken implements ThrowableWeapon{
	throw(): string {
	  return "hit!";
	}

}

@injectable()
class Ninja implements Warrior{

  public constructor(
    @inject(TYPES.Weapon) private _kataka:Weapon,
    @inject(TYPES.ThrowableWeapon) private _shuriken:ThrowableWeapon
  ){ }

  figth(): string {
    return this._kataka.hit();
  }
  
  sneak(): string {
    return this._shuriken.throw();
  }
}

export {Ninja, Katana, Shuriken};
