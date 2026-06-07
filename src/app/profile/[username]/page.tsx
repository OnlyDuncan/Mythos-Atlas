import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "../../../../auth";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth();
  const { username } = await params;

  const profileUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { id: username },
      ],
    },
  });

  if (!profileUser) notFound();

  const isOwner = session?.user?.id === profileUser.id;

  return (
    
    <div className="ambient-dark min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold text-white">
            {profileUser.name ?? profileUser.username ?? "Anonymous"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">@{profileUser.username ?? profileUser.id}</p>
          {profileUser.description && (
            <p className="mt-4 text-slate-300">{profileUser.description}</p>
          )}
          {isOwner && (
            <p className="mt-4 text-xs text-violet-400">This is your profile</p>
          )}
        </div>
      </div>
    </div>
  );
}
