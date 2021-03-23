import "reflect-metadata";
import * as bodyParser from "body-parser";
import {interfaces, InversifyExpressServer,TYPE} from "inversify-express-utils";
import "./controller/home.controller";
import {myContainer}from "./infraestructura/inversify.config";
import * as morgan from "morgan";
import * as express from "express";
import * as swagger from "swagger-express-ts";

let server= new InversifyExpressServer(myContainer,null,{rootPath:"/api/v1"});

const corsOptions = {
  origin: "http://localhost:3000"
};

server.setConfig((app)=>{
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(morgan.default("combined"));
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );
  app.use( swagger.express({
    definition: {
      externalDocs: {
	url: 'My url',
      },
      info: {
	title: 'My api',
	version: '1.0',
      },
      responses: {
	500: {},
      },
    },      
  }));

});


server.setErrorConfig((app)=>{
  app.use((err:any,req:any,res:any,next:any)=>{
    console.error(err.stack);
    res.status(500).send("ocurrio un error");
  });
});

let app= server.build();
app.listen(3000,"localhost",()=> console.log('server up and running port 3000'));


