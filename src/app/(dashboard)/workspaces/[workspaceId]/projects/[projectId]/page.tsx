import { getCurrent } from "@/features/auth/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useGetProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const initialValues = await useGetProject({ projectId: params.projectId });
  if (!initialValues) {
    throw new Error("Project not found");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.data.name}
            image={initialValues.data.imageUrl}
          />
          <h1 className="text-2xl font-semibold">{initialValues.data.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;
