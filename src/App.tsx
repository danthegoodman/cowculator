import { Flex, Loader, Tabs, Box } from "@mantine/core";
import { getApiData } from "./services/ApiService";
import { ActionType } from "./models/Client";
import ActionCategorySelector from "./components/ActionCategorySelector";
import { Suspense, lazy, useMemo, useState } from "react";
import { Skill } from "./helpers/CommonFunctions";
import ChangeLog from "./components/ChangeLog.tsx";
import { useMarket } from "./context/MarketContext.tsx";
import { AppFooter } from "./components/AppFooter.tsx";
import ItemLookup from "./components/ItemLookup";
import Enhancing from "./components/Enhancing";
import Gathering from "./components/Gathering";
import Calculator from "./components/Calculator";

const Market = lazy(() => import("./components/Market"));

export default function App() {
  const market = useMarket();
  const data = useMemo(() => getApiData(market), [market]);
  const [tab, setTab] = useState("production");

  return (
    <Flex direction="column" h="100vh" w="100vw">
      <Tabs variant="outline" value={tab} onTabChange={t=> t && setTab(t)}>
        <Tabs.List px="md" mt="md">
          <Tabs.Tab value="production">Production</Tabs.Tab>
          <Tabs.Tab value="itemLookup">Item Lookup</Tabs.Tab>
          <Tabs.Tab value="milking">Milking</Tabs.Tab>
          <Tabs.Tab value="foraging">Foraging</Tabs.Tab>
          <Tabs.Tab value="woodcutting">Woodcutting</Tabs.Tab>
          <Tabs.Tab value="cheesesmithing">Cheesesmithing</Tabs.Tab>
          <Tabs.Tab value="crafting">Crafting</Tabs.Tab>
          <Tabs.Tab value="tailoring">Tailoring</Tabs.Tab>
          <Tabs.Tab value="cooking">Cooking</Tabs.Tab>
          <Tabs.Tab value="brewing">Brewing</Tabs.Tab>
          <Tabs.Tab value="enhancing">Enhancing</Tabs.Tab>
          <Tabs.Tab value="market">Market</Tabs.Tab>
          <Tabs.Tab value="changelog">Change Log</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Box p="md" sx={{flexGrow: 1, overflow: 'auto'}} >
        <Suspense fallback={<Loader />}>
          <Tabs variant="outline" value={tab}>
            {/* Panels that the header cycles through */}
            <Tabs.Panel value="production"><Calculator data={data} /></Tabs.Panel>
            <Tabs.Panel value="itemLookup"><ItemLookup data={data} /></Tabs.Panel>
            <Tabs.Panel value="milking"><Gathering skill={Skill.Milking} type={ActionType.Milking} data={data} /></Tabs.Panel>
            <Tabs.Panel value="foraging"><Gathering skill={Skill.Foraging} type={ActionType.Foraging} data={data} /></Tabs.Panel>
            <Tabs.Panel value="woodcutting"><Gathering skill={Skill.Woodcutting} type={ActionType.Woodcutting} data={data} /></Tabs.Panel>
            <Tabs.Panel value="cheesesmithing"><ActionCategorySelector skill={Skill.Cheesesmithing} data={data}/></Tabs.Panel>
            <Tabs.Panel value="crafting"><ActionCategorySelector skill={Skill.Crafting} data={data} /></Tabs.Panel>
            <Tabs.Panel value="tailoring"><ActionCategorySelector skill={Skill.Tailoring} data={data} /></Tabs.Panel>
            <Tabs.Panel value="cooking"><ActionCategorySelector skill={Skill.Cooking} data={data} showUpgradeToggle={false} /></Tabs.Panel>
            <Tabs.Panel value="brewing"><ActionCategorySelector skill={Skill.Brewing} data={data} /></Tabs.Panel>
            <Tabs.Panel value="enhancing"><Enhancing data={data} /></Tabs.Panel>
            <Tabs.Panel value="market">{tab === "market" ? <Market data={data}/> : null}</Tabs.Panel>
            <Tabs.Panel value="changelog"><ChangeLog/></Tabs.Panel>
          </Tabs>
        </Suspense>
      </Box>
      <AppFooter/>
    </Flex>
  );
}
