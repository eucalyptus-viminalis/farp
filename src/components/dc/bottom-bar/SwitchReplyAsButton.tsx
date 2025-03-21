import { UpdateIcon } from "@radix-ui/react-icons";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SwitchReplyAsButton(props: Props) {
  return (
    <button id="switch-reply-as-btn" onClick={props.onClick}>
      <UpdateIcon height={20} width={20} className="text-[var(--yellow-9)]" />
    </button>
  );
}
