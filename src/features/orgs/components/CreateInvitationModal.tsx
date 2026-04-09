import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

const CreateInvitationModal = () => {
  const [search, setSearch] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="cursor-pointer">
          <HugeiconsIcon icon={UserAdd01Icon} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Candidates</DialogTitle>
          <DialogDescription>
            Search for the candidates to invite to the organization
          </DialogDescription>
        </DialogHeader>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvitationModal;
