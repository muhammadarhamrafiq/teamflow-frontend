import SearchBar from "@/shared/components/SearchBar";
import { useState } from "react";
import InvitationsSheet from "./InvitationsSheet";
import MemberList from "./MembersList";

const MembersComponent = ({ id }: { id: string }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="border w-full px-2 py-2 md:px-4 md:py-4  h-120 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold">Organization Members</h2>
        <InvitationsSheet id={id} />
      </div>
      <SearchBar
        className="my-2 md:my-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MemberList search={search} id={id} />
    </div>
  );
};

export default MembersComponent;
