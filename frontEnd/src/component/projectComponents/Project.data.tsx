import {
  ApheleiaImage,
  JamaImage,
  StockwiseImage,
  TrumpImage,
  AnimeImage,
} from "../../assets";

export const mainProjectList = [
  {
    title: "Apheleia",
    content: (
      <div className="content-container">
        <div className="content">
          <p>
            - Utilized different languages including React, HTML, CSS, JS,
            Wordpress and Divi Theme to build websites for a startup technology
            company.
          </p>
          <p>
            - Collaborated with professional graphic designers as a team to
            build website design that was visually appealing.
          </p>
        </div>
      </div>
    ),
    image: (
      <div className="image">
        <img src={ApheleiaImage} />
      </div>
    ),
    link: <a href="https://www.apheleia.me/home">Go</a>,
  },
  {
    title: "Stockwise",
    content: (
      <div>
        <p>
          - Using different languages including TypeScript, React, Sass to build
          websites for advertising a new stock app company based on a design.
        </p>
      </div>
    ),
    image: (
      <div className="image">
        <img src={StockwiseImage} />
      </div>
    ),
    link: <a href="https://stockwise.io/">Go</a>,
  },
  {
    title: "Jama",
    content: (
      <div>
        <p>
          - PSU capstone project to make a Jama Connect & Jira Link Plugin by
          using Jama API and Atlassian SDK.
        </p>
        <p>
          - Made the Authentication to Jama and create the link/unlink,
          sync/unsync items between Jama and Jira using React and Python .
        </p>
      </div>
    ),
    image: (
      <div className="image">
        <img src={JamaImage} />
      </div>
    ),
    link: <a>Private</a>,
  },
];

export const sideProjectList = [
  {
    title: "Since Trump Left",
    content: (
      <div>
        <p>
          - Using react and typescript to build the front end of the
          application.
        </p>
        <p>- Using chartjs to make charts.</p>
        <p>- Import APIs from different resources to display the data.</p>
      </div>
    ),
    image: (
      <div className="image">
        <img src={TrumpImage} />
      </div>
    ),
    link: <a>Discontinued</a>,
  },
  {
    title: "Anime Dashboard",
    content: (
      <p>
        - A fun project to show anime's stats and ranking for my final project
        in Front end engineer class.
      </p>
    ),
    image: (
      <div className="image">
        <img src={AnimeImage} />
      </div>
    ),
    link: <a href="https://final-project-cs410p-93e67.web.app/">Go</a>,
  },
];
