import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ishrevi.focos',
  appName: 'FOCOS Manager',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3500,
      backgroundColor: '#0A0A1E',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
    },
  },
};

export default config;
