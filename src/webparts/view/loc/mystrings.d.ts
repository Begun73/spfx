declare interface IViewWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ViewWebPartStrings' {
  const strings: IViewWebPartStrings;
  export = strings;
}
declare module "*.png" {
  const value: any;
  export = value;
}
