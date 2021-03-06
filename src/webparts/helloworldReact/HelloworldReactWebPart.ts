import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloworldReactWebPartStrings';
import HelloworldReact, { IHelloworldReactProps } from './components/HelloworldReact';
import { GraphHelper } from '../../Helpers/GraphHelper';


export interface IHelloworldReactWebPartProps {
  description: string;
  nome: string;
}

export default class HelloworldReactWebPart extends BaseClientSideWebPart<IHelloworldReactWebPartProps> {

  public async onInit() {
    return super.onInit().then(async (_) => {

      await GraphHelper.init(this.context.msGraphClientFactory);
      return;
    });
  }

  public render(): void {
    const element: React.ReactElement<IHelloworldReactProps> = React.createElement(
      HelloworldReact,
      {
        description: this.properties.description,
        nome: this.properties.nome
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('nome', {
                  label: "Inserisci Nome"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
