import clsx from "clsx";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ButtonStyle {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Neutral = "neutral",
}

export interface ButtonProps {
  label: string;
  size?: ButtonSize;
  style?: ButtonStyle;
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  size,
  style,
  fullWidth,
  onClick,
}: ButtonProps) {
  let styleClasses = "bg-blue-500";

  switch (style) {
    case ButtonStyle.Primary:
      styleClasses = "bg-green-600";

      break;

    case ButtonStyle.Secondary:
      styleClasses = "bg-red-600";

      break;

    case ButtonStyle.Tertiary:
      styleClasses = "bg-yellow-500 text-black";

      break;

    case ButtonStyle.Neutral:
      styleClasses = "bg-gray-300 text-black";

      break;
  }

  let sizeClasses = "px-12 py-4 text-3xl";

  switch (size) {
    case ButtonSize.Small:
      sizeClasses = "px-2 py-1 text-base";

      break;

    case ButtonSize.Medium:
      sizeClasses = "px-4 py-2 text-lg";

      break;
  }

  return (
    <button
      className={clsx(
        styleClasses,
        sizeClasses,
        { "w-full": fullWidth },
        "rounded-full transition-all shadow-inner-strong"
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {label}
    </button>
  );
}
