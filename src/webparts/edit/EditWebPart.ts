import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EditWebPartStrings';
import Edit from './components/Edit';
import { IEditProps } from './components/IEditProps';
import { sp } from "@pnp/sp";

export interface IEditWebPartProps {
  description: string;
}

export default class EditWebPart extends BaseClientSideWebPart<IEditWebPartProps> {
  protected onInit(): Promise<void> {
    
    sp.setup({
      spfxContext: this.context
    });
  
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IEditProps> = React.createElement(
      Edit,
      {
        description: this.properties.description
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
