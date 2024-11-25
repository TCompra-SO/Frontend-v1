import { createContext, ReactNode, useState } from "react";

interface HomeContextType {
  userId: string;
  updateUserId: (id: string) => void;
}

export const HomeContext = createContext<HomeContextType>({
  userId: "",
  updateUserId: () => {},
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");

  function updateUserId(id: string) {
    setUserId(id);
  }

  return (
    <HomeContext.Provider
      value={{
        userId,
        updateUserId,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
