export interface MenuBarTooltipProps {
  text: string;
  shortcut?: string | JSX.Element;
}
export function HeaderButtonTooltip({ text, shortcut }: MenuBarTooltipProps) {
  console.log({ shortcut });
  return (
    <div className="flex flex-col items-center gap-2 max-w-[750px]">
      <div>{text}</div>
      {shortcut && <div>{shortcut}</div>}
    </div>
  );
}
