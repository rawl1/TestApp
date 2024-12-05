import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TestApp',
  webDir: 'www',
  bundledWebRuntime: false // Agregado para indicar que no se incluirá el runtime web en la app nativa
};

export default config;
