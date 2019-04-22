import {ISerializable} from "../interfaces/ISerializable";
import {HtmlConfig} from "./html-config";

export class AppConfig implements ISerializable<AppConfig> {

    private _htmlConfig = new HtmlConfig();

    get html(): HtmlConfig {
        return this._htmlConfig;
    }

    initFromJSON(jsonObject: any): AppConfig {

        if (jsonObject) {
            this._htmlConfig.initFromJSON(jsonObject.html);
        }

        return this;
    }

    toJSON(): any {
        return {
            html: this._htmlConfig.toJSON()
        }
    }
}
