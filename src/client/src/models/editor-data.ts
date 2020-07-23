import { observable, action } from 'mobx';
import { ExtensionType } from '@app/types';

export class EditorDataModel {
    @observable public extension: ExtensionType = ExtensionType.JS;

    @action public updateExtension = (extension: ExtensionType): void => {
        if (this.extension === extension) return;

        this.extension = extension;
    };
}
