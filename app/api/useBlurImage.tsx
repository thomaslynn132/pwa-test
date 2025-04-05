import Image from "next/image";
import { useEffect, useState } from "react";

const MyImageComponent = ({ src, alt }: { src: string; alt: string }) => {
  const [blurDataURL, setBlurDataURL] = useState("");

  useEffect(() => {
    const fetchBlur = async () => {
      const res = await fetch(`./api/getBlur?src=${encodeURIComponent(src)}`);
      const data = await res.json();
      setBlurDataURL(data.blurDataURL);
    };

    fetchBlur();
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      // placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
};

export default MyImageComponent;
