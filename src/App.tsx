import "./App.css";
import { Jetton } from "./components/Jetton";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk"

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const {network} = useTonConnect()

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton/>
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Jetton />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;



// yarn add namemodul - установка модуля
// yarn dev - запуск серверв
// yarn remove namemodul -удалить модуль
// yarn upgrade namemodul@<версия> - обновить модуль




// dependencies": {
//   "@aws-crypto/sha256-js": "^5.0.0",
//   "@orbs-network/ton-access": "^2.3.3",
//   "@tanstack/react-query": "^4.24.4",
//   "@ton/core": "^0.56.3",
//   "@tonconnect/ui-react": "^1.0.0-beta.6",
//   "@twa-dev/sdk": "^7.0.0",
//   "buffer": "^6.0.3",
//   "gh-pages": "^6.1.1",
//   "is-mobile": "^3.1.1",
//   "react": "^18.2.0",
//   "react-dom": "^18.2.0",
//   "styled-components": "6.1.11",
//   "ton": "^13.5.0",
//   "ton-core": "^0.49.1",
//   "ton-crypto": "^3.2.0",
//   "use-local-storage": "^2.3.6",
//   "vite-plugin-node-polyfills": "^0.7.0"
// }

// "@twa-dev/sdk": "^7.0.0",
// "gh-pages": "^6.1.1",
