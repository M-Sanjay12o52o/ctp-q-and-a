import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="px-4 py-6 flex flex-row justify-end items-center gap-4">
        <Link href={"/user/profile"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-8">
          Profile
        </Link>
      </div>
      <Link href={"/test"}>
        <Card className="max-w-screen mx-12 px-4 py-6 bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-4xl font-bold text-black">Test title</CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Test description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus excepturi consequatur officia saepe voluptatem cupiditate doloremque dolor harum aspernatur? Veniam earum aliquam odio maxime eveniet quod aspernatur commodi totam quam.
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
