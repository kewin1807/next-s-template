import Image from "next/image";

const Tag = ({
  icon,
  title,
  style,
}: {
  icon?: string;
  title: string;
  style?: any;
}) => {
  return (
    <div
      className="flex items-center justify-center gap-2 bg-yellow px-2 py-3 text-black"
      style={{
        borderTopLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        ...style,
      }}
    >
      {icon ? <Image src={icon} height={20} width={20} alt="icon" /> : null}

      <span className="font-SpaceGrotesk text-[14px] font-[500]">{title}</span>
    </div>
  );
};
export default Tag;
