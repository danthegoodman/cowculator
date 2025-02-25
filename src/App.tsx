import { Box, Flex, Tabs } from "@mantine/core";
import ActionCategorySelector from "./components/ActionCategorySelector";
import { ReactNode, useCallback, useState } from "react";
import { Skill } from "./helpers/CommonFunctions";
import ChangeLog from "./components/ChangeLog.tsx";
import { AppFooter } from "./components/AppFooter.tsx";
import ItemLookup from "./components/ItemLookup";
import Enhancing from "./components/Enhancing";
import Gathering from "./components/Gathering";
import Calculator from "./components/Calculator";
import { useWindowEvent } from "@mantine/hooks";

export default function App() {
  const [hash, setHashValue] = useState(() => window.location.hash.slice(1));
  useWindowEvent(
    "hashchange",
    useCallback(() => {
      setHashValue(window.location.hash.slice(1));
    }, [])
  );
  const handleTabChange = (t: string | null) => {
    if (t) {
      window.location.hash = t;
    }
  };

  const tabs = {
    production: "Production",
    itemLookup: "Item Lookup",
    milking: "Milking",
    foraging: "Foraging",
    woodcutting: "Woodcutting",
    cheesesmithing: "Cheesesmithing",
    crafting: "Crafting",
    tailoring: "Tailoring",
    cooking: "Cooking",
    brewing: "Brewing",
    enhancing: "Enhancing",
    changelog: "Change Log",
  };

  const panels: Record<keyof typeof tabs, ReactNode> = {
    production: <Calculator />,
    itemLookup: <ItemLookup />,
    milking: <Gathering skill={Skill.Milking} />,
    foraging: <Gathering skill={Skill.Foraging} />,
    woodcutting: <Gathering skill={Skill.Woodcutting} />,
    cheesesmithing: <ActionCategorySelector skill={Skill.Cheesesmithing} />,
    crafting: <ActionCategorySelector skill={Skill.Crafting} />,
    tailoring: <ActionCategorySelector skill={Skill.Tailoring} />,
    cooking: (
      <ActionCategorySelector skill={Skill.Cooking} showUpgradeToggle={false} />
    ),
    brewing: <ActionCategorySelector skill={Skill.Brewing} />,
    enhancing: <Enhancing />,
    changelog: <ChangeLog />,
  };

  const tab = Object.hasOwn(tabs, hash) ? hash : "production";

  return (
    <Flex direction="column" h="100vh" w="100vw">
      <Tabs variant="outline" value={tab} onTabChange={handleTabChange}>
        <Tabs.List px="md" mt="md">
          {Object.entries(tabs).map(([v, name]) => (
            <Tabs.Tab key={v} value={v}>
              {name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Box p="md" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Tabs variant="outline" value={tab}>
          {Object.entries(panels).map(([v, node]) => (
            <Tabs.Panel key={v} value={v}>
              {node}
            </Tabs.Panel>
          ))}
        </Tabs>
      </Box>
      <AppFooter />
    </Flex>
  );
}
