import {
  Kbd as NextKbd,
  KbdProps as NextKbdProps,
  Chip,
} from "@nextui-org/react";

interface KbdProps extends NextKbdProps {
  os?: "win" | "mac" | "linux";
}

export function Kbd({ keys, children, os = "win" }: KbdProps) {
  if (os === "mac") return <NextKbd keys={keys}>{children}</NextKbd>;

  const commandKeys = Array.isArray(keys) ? keys.join(" + ") : keys;
  const convertKeys = commandKeys
    ?.toLocaleUpperCase()
    ?.replace("OPTION", "ALT");

  return (
    <Chip radius="sm" size="sm" variant="flat" className="shadow-small">
      {convertKeys} + {children}
    </Chip>
  );
}
