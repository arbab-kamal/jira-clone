import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspacesForm } from "@/features/workspaces/components/edit-workspaces-form";
import { redirect } from "next/navigation";
interface WorkspaceIdSettingsPageProps {
  params: { workspaceId: string };
}
const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspacesForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
