import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Welcome from "@/pages/welcome";
import Quiz from "@/pages/quiz";
import { QuestionProvider } from "./context/QuestionContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/404" component={NotFound} />
      <Route>
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuestionProvider>
        <div className="min-h-screen bg-gray-50">
          <Router />
          <Toaster />
        </div>
      </QuestionProvider>
    </QueryClientProvider>
  );
}

export default App;
