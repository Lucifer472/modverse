import LiveSearch from "@/components/etc/LiveSearch";
import SwitchNav from "@/components/admin/SwitchNav";
import BlogList from "@/components/admin/BlogList";
import { getEditBlogs } from "@/lib/blog-util";

const listPage = async ({
  searchParams,
}: {
  searchParams: { [search: string]: null };
}) => {
  const handlePrams = async (q: string | null) => {
    if (q !== undefined) {
      const res = await getEditBlogs({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          OR: [
            {
              title: {
                contains: q,
              },
            },
            {
              url: {
                contains: q,
              },
            },
          ],
        },
        select: {
          url: true,
          id: true,
          title: true,
        },
      });
      return res;
    }
    const res = await getEditBlogs({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        url: true,
        id: true,
        title: true,
      },
    });
    return res;
  };
  const res = await handlePrams(searchParams.search);
  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="list" />
        </div>
        <div className="my-4 max-w-[1280px] mx-auto border border-black rounded-md p-4">
          <div className="w-full border-b-2 border-black mb-4">
            <span className="text-xl font-medium">Edit Blogs</span>
          </div>
          <LiveSearch />
          <div className="my-2 px-2">
            <BlogList data={res} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default listPage;
