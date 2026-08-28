import React, { createContext, useContext, useState, useEffect } from 'react';
import { SoundFX } from '../utils/sound';

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClick: () => void;
  playSuccess: () => void;
  playError: () => void;
  playAlert: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  setSoundEnabled: () => {},
  playClick: () => {},
  playSuccess: () => {},
  playError: () => {},
  playAlert: () => {}
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);

  useEffect(() => {
    if (window.electronAPI?.getPreferences) {
      window.electronAPI.getPreferences().then((res: any) => {
        if (res?.success && res.sound !== undefined) {
          setSoundEnabledState(res.sound);
        }
      });
    }
  }, []);

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    if (window.electronAPI?.savePreferences) {
      window.electronAPI.savePreferences({ sound: enabled });
    }
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        playClick: () => SoundFX.playClick(soundEnabled),
        playSuccess: () => SoundFX.playSuccess(soundEnabled),
        playError: () => SoundFX.playError(soundEnabled),
        playAlert: () => SoundFX.playAlert(soundEnabled)
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
