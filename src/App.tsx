import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/router/router";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
