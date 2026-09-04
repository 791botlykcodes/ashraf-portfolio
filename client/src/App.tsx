import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import UniversePage, { pageData } from "./pages/UniversePage";

export default function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          {Object.entries(pageData).map(([slug, data]) => <Route key={slug} path={`/${slug}`}><UniversePage {...data} /></Route>)}
          <Route><Home /></Route>
        </Switch>
      </TooltipProvider>
    </ErrorBoundary>
  );
}
