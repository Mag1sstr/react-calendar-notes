import type { FunctionComponent } from "react";
import Schedule from "./components/Schedule";
import Load from "./components/Load";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <>
      <Load />
      <Schedule />
    </>
  );
};

export default App;
