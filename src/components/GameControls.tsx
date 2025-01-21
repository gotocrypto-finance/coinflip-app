import { useState } from "react";

import clsx from "clsx";

import Button, { ButtonSize, ButtonStyle } from "./Button";

export default function GameControls() {
  const [betAmount, setBetAmount] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Button
          label="0.05 Base"
          size={ButtonSize.Small}
          style={
            betAmount === 0.05 ? ButtonStyle.Secondary : ButtonStyle.Primary
          }
          onClick={() => setBetAmount(0.05)}
        />

        <Button
          label="0.1 Base"
          size={ButtonSize.Small}
          style={
            betAmount === 0.1 ? ButtonStyle.Secondary : ButtonStyle.Primary
          }
          onClick={() => setBetAmount(0.1)}
        />

        <Button
          label="0.25 Base"
          size={ButtonSize.Small}
          style={
            betAmount === 0.25 ? ButtonStyle.Secondary : ButtonStyle.Primary
          }
          onClick={() => setBetAmount(0.25)}
        />

        <Button
          label="0.5 Base"
          size={ButtonSize.Small}
          style={
            betAmount === 0.5 ? ButtonStyle.Secondary : ButtonStyle.Primary
          }
          onClick={() => setBetAmount(0.5)}
        />

        <Button
          label="0.75 Base"
          size={ButtonSize.Small}
          style={
            betAmount === 0.75 ? ButtonStyle.Secondary : ButtonStyle.Primary
          }
          onClick={() => setBetAmount(0.75)}
        />

        <Button
          label="1 Base"
          size={ButtonSize.Small}
          style={betAmount === 1 ? ButtonStyle.Secondary : ButtonStyle.Primary}
          onClick={() => setBetAmount(1)}
        />

        <div className="col-span-3">
          <Button
            label="Clear"
            size={ButtonSize.Small}
            fullWidth
            style={ButtonStyle.Primary}
            onClick={() => setBetAmount(0)}
          />
        </div>
      </div>

      <div
        className={clsx(
          { "opacity-100": betAmount > 0, "opacity-25": betAmount === 0 },
          "grid grid-cols-2 gap-4 transition-all"
        )}
      >
        <Button label="Heads" style={ButtonStyle.Tertiary} />
        <Button label="Tails" style={ButtonStyle.Tertiary} />
      </div>
    </div>
  );
}
