import { useState } from "react";

type Props = React.ComponentPropsWithoutRef<"img"> & { fallbackSrc?: string };

function CustomImage({ src, alt, className, fallbackSrc, ...rest }: Props) {
  const [usedSrc, setUsedSrc] = useState(src);
  return (
    <img
      onError={() => setUsedSrc(fallbackSrc ?? "")}
      src={usedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
}
export { CustomImage };
