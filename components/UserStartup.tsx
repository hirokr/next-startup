import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartUpCard, { StartUpCardType } from "./StartUpCard";

const UserStartup = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartUpCardType) => (
          <StartUpCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className='no-result'>No startups found</p>
      )}
    </>
  );
};

export default UserStartup;
