import { useEffect, useRef, useState } from "react";
import { UnderDevelopmentImage } from "assets";
import { AlertImage } from "./UnderDevelopment.style";

export function UnderDevelopment() {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const countImageHeight = () =>
    window.innerHeight - 2 * (containerRef.current?.offsetTop ?? 0);

  const onResize = () => {
    setImageHeight(countImageHeight());
  };

  useEffect(() => {
    setImageHeight(countImageHeight());

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div
        ref={containerRef}
        className="flex flex-col items-center overflow-y-hidden"
      >
        <h3 className="text-2xl sm:text-4xl font-medium font-montserrat">
          Em desenvolvimento
        </h3>
        <AlertImage
          alt="Em desenvolvimento"
          src={UnderDevelopmentImage}
          $height={imageHeight}
          $aspectRatio={[3, 2]}
        />
      </div>
    </div>
  );
}
