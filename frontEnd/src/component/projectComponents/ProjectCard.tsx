import { ReactNode } from "react";
import "../../styles/projects/ProjectCard.sass";
interface ProjectCardProp {
  content: ReactNode;
  title: string;
  link: ReactNode;
  image: ReactNode;
}

const ProjectCard = ({ content, title, image, link }: ProjectCardProp) => {
  return (
    <div className="project-card">
      {image}
      <div className="info-container">
        <div className="info">
          <div className="content">
            <h3>{title}</h3>
            {content}
          </div>
          {link}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
