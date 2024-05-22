"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const BlogList = ({
  data,
}: {
  data: {
    url: string;
    title: string;
    id: number;
  }[];
}) => {
  const router = useRouter();
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Blog? It can not be Recovered."
    );

    if (!confirmed) {
      return; // User canceled the deletion
    }

    fetch("/api/delete/blog", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Message === "Blog has been Deleted!") {
          toast.success(data.Message);
          router.refresh();
        } else {
          toast.error("An Error has Occurred");
          router.refresh();
        }
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full grid grid-cols-11 border border-gray-100 rounded-t-sm">
        <div className="col-span-1 border-r border-gray-100 text-center py-2 px-4">
          Index
        </div>
        <div className="col-span-7 border-r border-gray-100 text-center py-2 px-4">
          Name
        </div>
        <div className="col-span-3 text-center py-2 px-4">Action</div>
      </div>
      {data.map((data, index, array) => (
        <div
          className={cn(
            "w-full grid grid-cols-11 border border-gray-100",
            index === array.length - 1 ? "rounded-b-sm" : ""
          )}
          key={index}
        >
          <div className="col-span-1 border-r border-gray-100 text-center py-2 px-4 flex items-center justify-center">
            {index + 1}
          </div>
          <div className="col-span-7 border-r border-gray-100 text-center py-2 px-4 flex items-center justify-center">
            {data.title}
          </div>
          <div className="col-span-3 text-center py-2 px-4 flex items-center justify-evenly gap-1">
            <Button variant={"default"} asChild>
              <Link href={`/admin/edit/${data.url}`}>Edit</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href={`/${data.url}`}>View</Link>
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
