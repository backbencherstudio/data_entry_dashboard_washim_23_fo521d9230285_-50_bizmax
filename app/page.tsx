import { redirect } from "next/navigation";
import Loader from "./_components/Loader";

export default function Home() {
redirect('/dashboard/sells')
  return (
    <Loader />
  );
}
