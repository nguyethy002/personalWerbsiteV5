import { ReactNode } from "react";
import "../../styles/global/Card.sass";

interface CardProp {
  content: ReactNode;
  title: string;
}

const Card = ({ content, title }: CardProp) => {
  return (
    <div className="card-container">
      <div className = "card">
        <h2>{title}</h2>
        <div className="content-container">{content}</div>
      </div>
    </div>
  );
};
export default Card;
