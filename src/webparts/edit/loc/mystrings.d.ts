declare interface IEditWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'EditWebPartStrings' {
  const strings: IEditWebPartStrings;
  export = strings;
}
