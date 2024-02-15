import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SquadBuilder } from "../components/SquadBuilder";
import { GetStarted } from "../components/getStarted/GetStarted";

export const HomePage = () => {
  return (
    <>
      <SignedIn>
        <SquadBuilder />
      </SignedIn>
      <SignedOut>
        <GetStarted />
      </SignedOut>
    </>
  );
};
