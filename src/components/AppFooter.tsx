import { Code, Flex, Footer } from "@mantine/core";
import {
  useIsMarketLoading,
  useMarket,
  useMarketRefresher,
} from "../context/MarketContext.tsx";
import { clientData } from "../services/ApiService.ts";

export function AppFooter() {
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
          Game Version: <Code>{clientData.gameVersion}</Code>
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
