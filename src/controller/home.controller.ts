import { injectable, inject } from "inversify";
import { controller, httpGet, BaseHttpController} from "inversify-express-utils";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {Weapon} from "../dominio/interfaces";
import {TYPES} from "../infraestructura/types";
@ApiPath({
  path:"/api/v1/home/",
  name:"home",
  security:{basicAuth: []}
})
@controller("/home")
 class homeController extends BaseHttpController{
   constructor(
     @inject(TYPES.Weapon) private _weapon:Weapon
   ){
     super();
   }
   @ApiOperationGet({
     description:"pruba",
     summary:"prueba resumen",
     responses:{
       200:{ description:"Succes", type:SwaggerDefinitionConstant.STRING  }
     },
     security:{
       apiKeyHeader:[]
     }
   })
   @httpGet("/")  
   public async get(){

    const content={foo:this._weapon.hit()};
    const statusCode=200;

    return this.json(content,statusCode);
  }
}
