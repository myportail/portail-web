import * as express from 'express';
import * as Path from 'path';
import {Router} from "express";
import * as bodyParser from 'body-parser';
import * as fs from "fs";
import {AppConfig} from "./config/app-config";

declare var process : {
    env: {
        PORT: number
        ENVIRONMENT_NAME: string
    }
};

function ReadConfig(configFilename: string): AppConfig | null{
    try {
        const appConfig = new AppConfig();
        const fileContent = fs.readFileSync(`configs/${configFilename}.json`, 'utf8');
        if (fileContent) {
            appConfig.initFromJSON(JSON.parse(fileContent));
        }

        return appConfig;
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

const configName = process.env.ENVIRONMENT_NAME;
const configPlatform = (configName) ? `.${configName}` : '';
const configFilename = `config${configPlatform}`;
const appConfig = ReadConfig(configFilename);


interface Headers {
    [key: string]: any;
}

const app: express.Application = express();
const router: Router = express.Router();
const port = 8002;

app.use(bodyParser.urlencoded({extended: true}));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

if (appConfig) {
    const path: string = Path.resolve(appConfig.html.root);

    console.log(`dirname : ${__dirname}`);
    console.log(`path : ${path}`);

    router.get('*', function (req, res) {
        res.sendFile('index.html', {root: path + '/'});
    });

    app.use(express.static(path + '/'));
}

app.use('/', router);

app.listen(port);
