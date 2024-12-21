import { ProjectCard } from "..";
import { mainProjectList, sideProjectList } from "./Project.data";
import "../../styles/projects/Project.sass";

const Project = () => {
  const renderMainProjectList = () =>
    mainProjectList.map((ele) => (
      <ProjectCard
        key={ele.title}
        content={ele.content}
        title={ele.title}
        image={ele.image}
        link={ele.link}
      />
    ));
  const renderSideProjectList = () =>
    sideProjectList.map((ele) => (
      <ProjectCard
        key={ele.title}
        content={ele.content}
        title={ele.title}
        image={ele.image}
        link={ele.link}
      />
    ));
  return (
    <div className="project-container">
      <h1>Main projects</h1>
      <div className="main-project">{renderMainProjectList()}</div>
      <h1>Side projects</h1>
      <div className="side-project">{renderSideProjectList()}</div>
    </div>
  );
};
export default Project;
