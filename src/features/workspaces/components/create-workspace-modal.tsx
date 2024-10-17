"use client";
import { ResponsiveModel } from "@/components/responsive-model";
import { CreateWorkspacesForm } from "./create-workspaces-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";
import { set } from "date-fns";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspacesForm onCancel={close} />
    </ResponsiveModel>
  );
};
