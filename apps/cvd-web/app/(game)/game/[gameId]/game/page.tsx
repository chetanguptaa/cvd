import getUser from "@/app/actions/get-user";
import Game from "@/components/app/game";
import { toast } from "@/hooks/use-toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { gameId: string } }) {
  const res = await getUser();
  if (!res.success) {
    toast({
      title: res.error,
    });
    redirect("/");
  }
  const token = cookies().get("user-token");
  return <Game user={res.user} gameId={params.gameId} token={token?.value} />;
}
