import {ISerializable} from "../interfaces/ISerializable";

export class HtmlConfig implements ISerializable<HtmlConfig> {

    private _root: string | undefined;

    get root(): string {
        return (this._root) ? this._root : '';
    }

    initFromJSON(jsonObject: any): HtmlConfig {
        if (jsonObject) {
            this._root = jsonObject.root;
        }

        return this;
    }

    toJSON(): any {
        return {
            root: this._root
        }
    }
}
