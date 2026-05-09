import type { Assignee, Membership } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useGetMembers } from "@/features/orgs/hooks/useMembers";
import Avatar from "@/shared/components/Avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { ChevronsUpDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";

interface AssigneePickerProps {
  value: Assignee | null;
  onChange: (assignee: Assignee | null) => void;
}

const AssigneePicker = ({ value, onChange }: AssigneePickerProps) => {
  const { id: orgId } = useOrganizationContext();
  const [search, setSearch] = useState<string>("");
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Membership[]>([]);
  const { data, pagination, loading } = useGetMembers(orgId, {
    limit: pageSize,
    page,
    search: search ? search : undefined,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [orgId, search]);

  useEffect(() => {
    if (!data?.members) return;
    setItems((prev) =>
      page === 1 ? data.members : [...prev, ...data.members],
    );
  }, [data, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (data?.members.length ?? 0) === pageSize;
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, loading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: handleLoadMore,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mt-2 h-fit py-2"
        >
          {value ? (
            <AssigneeItem assignee={value} />
          ) : (
            <span className="text-muted-foreground">Pick And assignee</span>
          )}

          <HugeiconsIcon icon={ChevronsUpDown} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            placeholder="Enter name or email of assignee"
            value={search}
            onValueChange={(e) => setSearch(e)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {value && (
              <CommandGroup heading="Actions">
                <CommandItem
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                  className="text-destructive"
                >
                  Remove assignee
                </CommandItem>
              </CommandGroup>
            )}

            <CommandGroup heading="Members">
              {items.map((member) => {
                const isSelected = value?.id === member.userId;
                const assignee: Assignee = {
                  id: member.userId,
                  name: member.name,
                  email: member.email,
                  avatarUrl: member.avatarUrl || null,
                };

                return (
                  <CommandItem
                    key={member.userId}
                    value={`${member.name} ${member.email}`}
                    onSelect={() => {
                      onChange(isSelected ? null : assignee);
                      setOpen(false);
                    }}
                  >
                    <AssigneeItem assignee={assignee} />
                  </CommandItem>
                );
              })}
              {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const AssigneeItem = ({ assignee }: { assignee: Assignee }) => {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <Avatar avatar={assignee.avatarUrl || ""} size="sm" iconVariant="USER" />
      <div className="flex flex-col items-start overflow-hidden text-left">
        <span className="truncate text-sm font-medium">{assignee.name}</span>

        <span className="truncate text-xs text-muted-foreground">
          {assignee.email}
        </span>
      </div>
    </div>
  );
};

export default AssigneePicker;
