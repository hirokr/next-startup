import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export type StartUpCardType = Omit<Startup, "author"> & { author?: Author };

const StartUpCard = ({ post }: { post: StartUpCardType }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    title,
    description,
    image,
    category,
  } = post;
  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup-card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          {author && (
            <Link href={`/user/${author._id}`}>
              <p className='text-16-medium line-clamp-1'>{author.name}</p>
            </Link>
          )}
          <Link href={`/startup/${_id}`}>
            <h3 className='text-25-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        {author && (
          <Link href={`/user/${author._id}`}>
            <Image
              src={author.image || "https://placehold.co/48x48"}
              alt='place holder'
              width={48}
              height={48}
              className='rounded-full'
            />
          </Link>
        )}
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_description line-clamp-3'>{description}</p>
        <Image
          src={image || "https://placehold.co/120x120"}
          alt={title || ""}
          width={120}
          height={120}
          className='startup-card_img'
        />
      </Link>
      <div className='flex-between mt-5 gap-3'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartUpCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={index} className={cn("skeleton", "startup-card")}>
        <Skeleton className='startup-card_skeleton' />
      </li>
    ))}
  </>
);

export default StartUpCard;
