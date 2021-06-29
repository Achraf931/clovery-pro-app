import React from 'react';
import Providers from './src/navigation';
import SplashScreen from  "react-native-splash-screen";

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  })
  return <Providers />;
}
