import React, { FC, MouseEvent, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import Button from "../Button/Button";
import { FBPlayer } from "@/_api/firebase-api";

interface Props {
  icon: ReactNode;
  handleClick: (event: MouseEvent<HTMLButtonElement>, player: FBPlayer) => void;
  tooltip: string;
  player: FBPlayer;
}

const TooltipIconButton: FC<Props> = ({icon, handleClick, tooltip, player}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="icon"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleClick(e, player);
          }}
          className="h-8 w-8"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipIconButton;
