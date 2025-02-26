import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";
import { useCallback } from "react";

const gatheringSkillSettings = () => ({
  level: 1,
  toolBonus: 0,
  gearEfficiency: 0,
  teas: [] as string[],
});

const actionSkillSettings = () => ({
  level: 1,
  toolBonus: 0,
  gearEfficiency: 0,
  xp: 0,
  targetLevel: 0,
  fromRaw: false,
  teas: [] as string[],
});

const enchantingSkillSettings = () => ({
  item: null as string | null,
  level: 1,
  toolBonus: 0,
  gearSpeed: 0,
  teas: [] as string[],
  target: 1,
});

const defaultSettings = () => ({
  milking: gatheringSkillSettings(),
  foraging: gatheringSkillSettings(),
  woodcutting: gatheringSkillSettings(),
  cheesesmithing: actionSkillSettings(),
  crafting: actionSkillSettings(),
  tailoring: actionSkillSettings(),
  cooking: actionSkillSettings(),
  brewing: actionSkillSettings(),
  enhancing: enchantingSkillSettings(),
});

const skillSettingsAtom = atomWithStorage("skillSettings", defaultSettings());

type SkillSettings = ReturnType<typeof defaultSettings>;

export const useSkillSettings = <T extends keyof SkillSettings>(
  skillName: T
) => {
  const [skillsSettings, setSkillSettings] = useAtom(skillSettingsAtom);

  const settings = skillsSettings[skillName];
  const set = useCallback(
    (newSettings: Partial<SkillSettings[T]>) => {
      setSkillSettings({
        ...skillsSettings,
        [skillName]: {
          ...settings,
          ...newSettings,
        },
      });
    },
    [setSkillSettings, settings, skillName, skillsSettings]
  );

  return { settings, set };
};
export const useResetSkillSettings = () => {
  const [, setSkillSettings] = useAtom(skillSettingsAtom);

  const onReset = useCallback(() => {
    setSkillSettings(defaultSettings());
  }, [setSkillSettings]);

  return onReset;
};
