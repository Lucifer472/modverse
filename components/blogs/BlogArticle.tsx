import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import textSlice from "@/lib/text-util";
import { convertDateFormat } from "@/lib/date-util";

interface BlogArticleProps {
  link: string;
  img: string | StaticImport;
  title: string;
  authorImg: string | StaticImport | undefined;
  authorName: String | null | undefined;
  updatedAt: Date;
}

const BlogArticle = ({
  link,
  img,
  title,
  authorImg,
  authorName,
  updatedAt,
}: BlogArticleProps) => {
  return (
    <Link href={link} className="py-2 w-full sm:w-fit">
      <article className="flex flex-col items-start w-full sm:max-w-[300px] relative p-2 [&>h2]:hover:underline hover:shadow border rounded-md">
        <div className="relative w-full h-[200px]">
          <Image src={img} alt="Fallback" fill style={{ objectFit: "cover" }} />
        </div>
        <h2 className="font-medium h-[80px] mt-2 mb-2">
          {textSlice(title, 60)}
        </h2>
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex gap-1 items-center">
            <div className="relative w-6 h-6 rounded-full">
              <Image
                src={authorImg as string}
                alt="Author"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-light text-sky-700">{`By ${authorName}`}</span>
          </div>
          <time className="text-xs font-light text-sky-700">
            {convertDateFormat(updatedAt)}
          </time>
        </div>
      </article>
    </Link>
  );
};

export default BlogArticle;
