import type { FunctionComponent } from "react";
import Schedule from "./components/Schedule";
import ActionMenu from "./components/ActionMenu";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <>
      <ActionMenu />
      <Schedule />
    </>
  );
};

export default App;
