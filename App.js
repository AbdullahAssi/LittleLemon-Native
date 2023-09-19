import { AppProvider } from "./context/AppContext";
import Navigation from "./Navigation";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
