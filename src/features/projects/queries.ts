import { getMember } from "@/features/members/utils";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { Project } from "./types";
import { createSessionClient } from "@/lib/appwrite";

interface GetProjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectProps) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      WORKSPACES_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });
    if (!member) {
      return null;
    }
    console.log({ member });
    return project;
  } catch (e) {
    console.error("Error in useGetProject:", e);
    return null;
  }
};
