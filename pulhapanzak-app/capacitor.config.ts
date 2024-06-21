import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dmovil2.pulhaapp',
  appName: 'pulhapanzak-app',
  webDir: 'www',

  server:{
    androidScheme: 'https'
  }
};

export default config;
