import { Box, Flex, Tabs } from "@mantine/core";
import { getApiData } from "./services/ApiService";
import ActionCategorySelector from "./components/ActionCategorySelector";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Skill } from "./helpers/CommonFunctions";
import ChangeLog from "./components/ChangeLog.tsx";
import { useMarket } from "./context/MarketContext.ts";
import { AppFooter } from "./components/AppFooter.tsx";
import ItemLookup from "./components/ItemLookup";
import Enhancing from "./components/Enhancing";
import Gathering from "./components/Gathering";
import Calculator from "./components/Calculator";
import { useWindowEvent } from "@mantine/hooks";

export default function App() {
  const market = useMarket();
  const data = useMemo(() => getApiData(market), [market]);
  const [hash, setHashValue] = useState(()=> window.location.hash.slice(1));
  useWindowEvent(
    "hashchange",
    useCallback(() => {
      setHashValue(window.location.hash.slice(1));
    }, [])
  );
  const handleTabChange = (t: string | null)=> {
    if(t) {
      window.location.hash = t;
    }
  }

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
    production: <Calculator data={data} />,
    itemLookup: <ItemLookup data={data} />,
    milking: <Gathering skill={Skill.Milking} data={data} />,
    foraging: <Gathering skill={Skill.Foraging} data={data} />,
    woodcutting: <Gathering skill={Skill.Woodcutting} data={data} />,
    cheesesmithing: (
      <ActionCategorySelector skill={Skill.Cheesesmithing} data={data} />
    ),
    crafting: <ActionCategorySelector skill={Skill.Crafting} data={data} />,
    tailoring: <ActionCategorySelector skill={Skill.Tailoring} data={data} />,
    cooking: (
      <ActionCategorySelector
        skill={Skill.Cooking}
        data={data}
        showUpgradeToggle={false}
      />
    ),
    brewing: <ActionCategorySelector skill={Skill.Brewing} data={data} />,
    enhancing: <Enhancing data={data} />,
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
