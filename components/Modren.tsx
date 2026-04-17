"use client";
import { cn } from "@/lib/utils";
import { WavePath } from "./wave-path";

export default function Modren() {
  return (
    <div className="relative w-full flex justify-center container mx-auto mt-28">
      <div>
        <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]",
        )}
      />

      <div className="flex w-[70vw] flex-col items-end">
        <WavePath className="mb-10" />
        <div className="flex w-full flex-col">
          <div className="flex flex-wrap gap-4">
            <p className="text-muted-foreground mt-2 text-sm text-nowrap">World of Art</p>
            <p className="text-foreground/80 text-2xl lg:text-4xl">
              Experience the emotions of artists through their works. Let the
              beauty of art inspire you and fill your soul.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
