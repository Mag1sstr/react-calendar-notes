import type { FunctionComponent } from "react";
import Schedule from "./components/Schedule";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <>
      <Schedule />
    </>
  );
};

export default App;
