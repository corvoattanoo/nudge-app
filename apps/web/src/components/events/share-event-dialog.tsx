"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserGroups, shareEventToGroups, EventItem, createGroup } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // 👈 added Input
import { toast } from "sonner";
import { Users, Loader2, Plus, ArrowBigLeft} from "lucide-react";

interface ShareEventDialogProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareEventDialog({ event, isOpen, onClose }: ShareEventDialogProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newGroupName, setGroupName] = useState("");
  const queryClient = useQueryClient();

  // Helper to reset modal state when closing
  function handleClose() {
    onClose;
    setSelectedGroupId(null);
    setIsCreatingNew(false);
    setGroupName("");
  }

  // 1. Fetch user's groups
  const { data: groupMemberships, isLoading } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    enabled: isOpen, // only fetch when dialog is open
  });

  // 2. Share mutation
  const shareMutation = useMutation({
    mutationFn: () => {
      // let targetGroupId = selectedGroupId;

      // //if user hits nwe group
      // if()

      if (!selectedGroupId) throw new Error("Please select a group");
      return shareEventToGroups(event.id, selectedGroupId);
    },
    onSuccess: () => {
      toast.success("Event shared to group! Voting has started.");
      onClose();
      setSelectedGroupId(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share to Group</DialogTitle>
          <DialogDescription>
            Choose a group to propose <span className="font-semibold text-foreground">"{event.title}"</span>. Members will be able to vote on it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-6 animate-spin text-zinc-400" />
            </div>
          )}

          {groupMemberships && groupMemberships.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-4">
              You are not a member of any group yet.
            </p>
          )}

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {groupMemberships?.map(({ group }) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroupId(group.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors ${
                  selectedGroupId === group.id
                    ? "border-zinc-900 bg-zinc-50"
                    : "border-zinc-200 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="size-4 text-zinc-500" />
                  <span className="font-medium text-sm">{group.groupName}</span>
                </div>
                {selectedGroupId === group.id && (
                  <span className="text-xs font-semibold text-zinc-900">Selected</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} disabled={shareMutation.isPending}>
              Cancel
            </Button>
            <Button
              onClick={() => shareMutation.mutate()}
              disabled={!selectedGroupId || shareMutation.isPending}
            >
              {shareMutation.isPending ? "Sharing..." : "Share with group"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}