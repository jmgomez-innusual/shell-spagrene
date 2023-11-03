import "./home-card.css";
import React from "react";
import IconLongArrownRight from "@amiga-fwk-web/icons/arrows/icon-long-arrown-right";

type Props = {
  testId?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  onClick?: () => void;
};

const HomePageCard: React.FC<Props> = ({ testId, title, content, onClick }) => {
  return (
    <div className="appPageContainerCard" data-testid={`${testId}-homeCard`} onClick={onClick}>
      <div className="appPageContainerCard__title" data-testid={`${testId}-homeCardTitle`}>
        {title} <IconLongArrownRight />
      </div>
      <div className="appPageContainerCard__content" data-testid={`${testId}-homeCardContent`}>
        {content}
      </div>
    </div>
  );
};

export default HomePageCard;
