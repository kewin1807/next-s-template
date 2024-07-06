import Image from "next/image";

export type TInputProps = {
  iconUrl?: string;
  placeHolder?: string;
  value: string;
  disable?: boolean;
  setValue: (value: string) => void;
  setMaxValue?: () => void;
  currency?: string;
};

const Input = (props: TInputProps) => {
  const {
    iconUrl,
    placeHolder,
    value,
    setValue,
    setMaxValue,
    disable,
    currency,
  } = props;

  return (
    <div className="px-4 py-3 gap-x-2 flex items-center rounded-xl border border-solid border-lightBorder">
      {iconUrl ? (
        <Image src={iconUrl} height={32} width={32} alt="icon" />
      ) : null}

      <input
        style={{ outline: 0 }}
        className="bg-transparent w-full border-transparent focus:border-transparent font-[700] font-SpaceGrotesk"
        placeholder={placeHolder}
        value={`${value}`}
        disabled={disable}
        onChange={(e) => setValue(e.target.value.replace(currency || "", ""))}
      />
      <span>{currency}</span>

      {setMaxValue ? (
        <button
          className="bg-yellow rounded-lg p-2 flex justify-center items-center font-[700]"
          onClick={setMaxValue}
        >
          MAX
        </button>
      ) : null}
    </div>
  );
};
export default Input;
