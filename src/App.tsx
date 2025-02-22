import {
  AppShell,
  Code,
  Container,
  Flex,
  Footer,
  Loader,
  Tabs,
} from "@mantine/core";
import { getApiData } from "./services/ApiService";
import { ActionType } from "./models/Client";
import ActionCategorySelector from "./components/ActionCategorySelector";
import { Suspense, lazy, useMemo } from "react";
import { Skill } from "./helpers/CommonFunctions";
import ChangeLog from "./components/ChangeLog.tsx";
import { MarketProvider, useMarket } from "./context/MarketContext.tsx";

const ItemLookup = lazy(() => import("./components/ItemLookup"));
const Enhancing = lazy(() => import("./components/Enhancing"));
const Gathering = lazy(() => import("./components/Gathering"));
const Calculator = lazy(() => import("./components/Calculator"));
const Market = lazy(() => import("./components/Market"));

export default function App() {
  return (
    <MarketProvider>
      <AppWithProviders />
    </MarketProvider>
  );
}

function AppWithProviders() {
  const market = useMarket();
  const data = useMemo(() => getApiData(market), [market]);

  return (
    <AppShell padding="md" footer={
        <Footer height={{base: 65, sm: 25}}>
          <Flex gap="xs" justify="center" align="flex-start" direction="row" wrap="wrap">
            <div>Game Version: <Code>{data.gameVersion}</Code></div>
            <div>
              Market Date:&nbsp;
              <Code>
                {data.marketTime ? data.marketTime.toLocaleString() : "No data"}
              </Code>
            </div>
            <div>
              <a href="https://github.com/danthegoodman/cowculator" target="_blank" className="footer-link">Contribute</a>
            </div>
            <div>
              <a href="https://github.com/danthegoodman/cowculator/issues" target="_blank" className="footer-link">Report Bug / Suggest Feature</a>
            </div>

          </Flex>
        </Footer>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Container fluid>
        <Suspense fallback={<Loader />}>
          <Tabs variant="outline" defaultValue="production">
            <Tabs.List>
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

            {/* Panels that the header cycles through */}
            <Tabs.Panel value="production" pt="xs"><Calculator data={data} /></Tabs.Panel>
            <Tabs.Panel value="itemLookup" pt="xs"><ItemLookup data={data} /></Tabs.Panel>
            <Tabs.Panel value="milking" pt="xs"><Gathering skill={Skill.Milking} type={ActionType.Milking} data={data} /></Tabs.Panel>
            <Tabs.Panel value="foraging" pt="xs"><Gathering skill={Skill.Foraging} type={ActionType.Foraging} data={data} /></Tabs.Panel>
            <Tabs.Panel value="woodcutting" pt="xs"><Gathering skill={Skill.Woodcutting} type={ActionType.Woodcutting} data={data} /></Tabs.Panel>
            <Tabs.Panel value="cheesesmithing" pt="xs"><ActionCategorySelector skill={Skill.Cheesesmithing} data={data}/></Tabs.Panel>
            <Tabs.Panel value="crafting" pt="xs"><ActionCategorySelector skill={Skill.Crafting} data={data} /></Tabs.Panel>
            <Tabs.Panel value="tailoring" pt="xs"><ActionCategorySelector skill={Skill.Tailoring} data={data} /></Tabs.Panel>
            <Tabs.Panel value="cooking" pt="xs"><ActionCategorySelector skill={Skill.Cooking} data={data} showUpgradeToggle={false} /></Tabs.Panel>
            <Tabs.Panel value="brewing" pt="xs"><ActionCategorySelector skill={Skill.Brewing} data={data} /></Tabs.Panel>
            <Tabs.Panel value="enhancing" pt="xs"><Enhancing data={data} /></Tabs.Panel>
            <Tabs.Panel value="market" pt="xs"><Market data={data}/></Tabs.Panel>
            <Tabs.Panel value="changelog" pt="xs"><ChangeLog/></Tabs.Panel>
          </Tabs>
        </Suspense>
      </Container>
    </AppShell>
  );
}
