// src/ReduxProvider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store"; // Import the store you have created
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </SessionProvider>
    </Provider>
  );
};

export default ReduxProvider;
