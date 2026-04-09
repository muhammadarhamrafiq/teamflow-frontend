import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import CreateInvitationModal from "./CreateInvitationModal";

const InvitationsSheet = () => {
  const [search, setSearch] = useState("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} className="cursor-pointer">
          Invitations <HugeiconsIcon icon={ArrowUpRight} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invitations</SheetTitle>
          <SheetDescription>
            Manage and invite the users to your organization
          </SheetDescription>
        </SheetHeader>
        <div className="mx-6 flex gap-1 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CreateInvitationModal />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvitationsSheet;
