type PaletteModeType = 'light' | 'dark';

export interface ThemeOptions {
  palette: {
    primary: any;
    secondary: any;
    neutral: any;
    background: {
      default: string;
      alt: string;
    };
    mode?: PaletteModeType;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}
