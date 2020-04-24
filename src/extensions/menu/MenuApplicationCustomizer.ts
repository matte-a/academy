import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as React from 'react'
import Menu from './Components/menu';
import * as ReactDom from 'react-dom';
import * as strings from 'MenuApplicationCustomizerStrings';

const LOG_SOURCE: string = 'MenuApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MenuApplicationCustomizer
  extends BaseApplicationCustomizer<IMenuApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    var topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);

    const element: React.ReactElement = React.createElement(
      Menu,
      {

      }
    );

    ReactDom.render(element, topPlaceholder.domElement);

    return Promise.resolve();
  }
}
