export const HeadingIcon = ({
  width = 25,
  height = 25,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 64 64" width={width} height={height} {...props}>
      <path
        fill="currentColor"
        d="M9.2 6.2C7.4 8 7.7 16.7 9.6 17.4c2.3.9 3.4-.2 3.4-3.5V11h16v42h-2.9c-3.7 0-5.9 2.4-4.1 4.5 1.8 2.1 18.2 2.1 20 0 1.8-2.1-.4-4.5-4.1-4.5H35V11h16v2.9c0 3.3 1.1 4.4 3.4 3.5 1.9-.7 2.2-9.4.4-11.2-1.7-1.7-43.9-1.7-45.6 0z"
      />
    </svg>
  );
};
