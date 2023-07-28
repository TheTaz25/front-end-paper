import "i18next";

import en from './translations/en.json';

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: 'ns',
    resources: {
      ns: typeof en
    }
  }
}