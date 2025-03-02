/* eslint-disable @next/next/no-img-element */

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { XIcon } from "lucide-react";
interface ThumbnailProps {
  url?: string | null;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="Message image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-4 shadow-none">
        <VisuallyHidden.Root>
          <DialogTitle>Uploaded Image</DialogTitle>
          <DialogDescription>
            Image sent or recieved in the chat
          </DialogDescription>
        </VisuallyHidden.Root>
        <DialogClose>
          <img
            src={url}
            alt="Message image"
            className="rounded-md object-cover size-full z-5"
          />
          <XIcon className="size-5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
