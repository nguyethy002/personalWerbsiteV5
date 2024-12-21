export const hobbieGraph = {
  labels: ["Swimming", "Playing guitar", "Drawing"],
  datasets: [
    {
      label: "My First Dataset",
      data: [20, 40, 40],
      backgroundColor: [
        "rgba(191, 219, 254)",
        "rgba(221, 214, 254)",
        "rgba(254, 202, 202)",
      ],
      borderColor: "rgba(4, 120, 87,0.5)",
      hoverOffset: 4,
    },
  ],
};
export const academicList = [
  {
    title: "Education",
    content: (
      <div>
        <h3>Portland State Uni</h3>
        <p>Major: Computer Science.</p>
        <p>
          Relevant Coursework: Full-Stack, Database, Algorithm, Programing
          Systems, Application Development.
        </p>
      </div>
    ),
  },
];
export const traitGraph = {
  labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding"],
  datasets: [
    {
      data: [30, 40, 50, 40, 50],
      fill: true,
      backgroundColor: "rgba(4, 120, 87,0.5)",
      borderColor: "rgba(4, 120, 87,0.5)",
      pointBackgroundColor: "rgba(4, 120, 87,0.5)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(153, 102, 255)",
    },
  ],
};
export const courseList = [
  {
    title: "Tech Skills",
    content: (
      <div className="coursework">
        <p>
          <img src="https://img.icons8.com/dusk/50/000000/github.png" /> Github
        </p>
        <p>
          <img src="https://img.icons8.com/bubbles/64/000000/react.png" /> React
        </p>
        <p>
          <img src="https://img.icons8.com/dusk/64/000000/c-plus-plus.png" />
          C++
        </p>
        <p>
          <img src="https://img.icons8.com/color/50/000000/typescript.png" />{" "}
          Typescript
        </p>
        <p>
          <img src="https://img.icons8.com/dusk/64/000000/html-5.png" />
          HTML
        </p>
        <p>
          <img src="https://img.icons8.com/color/48/000000/css-filetype.png" />
          CSS
        </p>
      </div>
    ),
  },
];
