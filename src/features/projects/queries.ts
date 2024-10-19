import { getMember } from "@/features/members/utils";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { Project } from "./types";
import { Account, Client, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../auth/constants";

interface GetProjectProps {
  projectId: string;
}

export const useGetProject = async ({ projectId }: GetProjectProps) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE);
    if (!session) return null;
    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
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

    return project;
  } catch (e) {
    console.error("Error in useGetProject:", e);
    return null;
  }
};
