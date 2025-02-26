import { Code, Flex, Footer } from "@mantine/core";
import {
  useIsMarketLoading,
  useMarket,
  useMarketRefresher,
} from "../context/MarketContext.ts";
import { useData } from "../context/DataContext.ts";
import { useResetSkillSettings } from "../store/Settings.ts";

export function AppFooter() {
  const data = useData();
  const reset = useResetSkillSettings();
  return (
    <Footer height={{ base: 65, sm: 25 }}>
      <Flex
        gap="xs"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <div>
          Game Version: <Code>{data.gameVersion}</Code>
        </div>
        <MarketFooter />
        <div>
          <a
            href="https://github.com/danthegoodman/cowculator"
            target="_blank"
            className="footer-link"
          >
            Contribute & Issue Tracker
          </a>
        </div>
        <div>
          <a className="footer-link" onClick={reset}>
            Clear settings
          </a>
        </div>
      </Flex>
    </Footer>
  );
}

function MarketFooter() {
  const market = useMarket();
  const loading = useIsMarketLoading();
  const refreshMarket = useMarketRefresher();

  let when;
  if (loading) {
    when = "Loading...";
  } else if (market) {
    when = new Date(market.time * 1000).toLocaleString();
  } else {
    when = "No Data";
  }

  return (
    <div>
      Market Date: <Code>{when}</Code>
      &nbsp;
      <a href="#" onClick={refreshMarket}>
        (refresh)
      </a>
    </div>
  );
}
