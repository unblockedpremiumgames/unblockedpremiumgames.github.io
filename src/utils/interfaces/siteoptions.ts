export interface ISiteOptions {
    title: string;
    siteTitle: string;
    description: string;
    sweetcoreSettings: ISweetcoreSettings;
}

export interface ISweetcoreSettings {
    footer: {
        copyright: string;
    };
}