"use client";
import { ResponsiveModel } from "@/components/responsive-model";
import { CreateProjectsForm } from "./create-projects-form";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";

export const CreateProjectsModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectsForm onCancel={close} />
    </ResponsiveModel>
  );
};
