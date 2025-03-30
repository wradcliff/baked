import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { data: plans, error } = await supabase
    .from('plan')
    .select('name')
    .in('id', [1, 2]);


  if (error) {
    console.error('Error fetching plans:', error);
    return <div>Error loading plans: {error.message}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your App!</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Plans from Supabase:</h2>
          {plans && plans.length > 0 ? (
            <ul className="list-disc pl-5">
              {plans.map((plan, index) => (
                <li key={index} className="text-xl">
                  Plan {index + 1}: {plan.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl">No plans found</p>
          )}
        </div>
      </div>
    </main>
  );
}
