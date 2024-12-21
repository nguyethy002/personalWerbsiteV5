import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  LineElement, // Add this import for line elements
  Tooltip,
  Legend,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Radar, Doughnut } from "react-chartjs-2";
import { DashboardImage } from "../../assets";
import { Card } from "..";
import {
  academicList,
  courseList,
  traitGraph,
  hobbieGraph,
} from "./Dashboard.data";
import "../../styles/dashboard/Dashboard.sass";

// Register the components with Chart.js
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
  PointElement, // Make sure to register PointElement
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const renderSocialList = () =>
    courseList.map((ele) => (
      <Card key={ele.title} content={ele.content} title={ele.title} />
    ));

  const renderAcademicList = () =>
    academicList.map((ele) => (
      <Card key={ele.title} content={ele.content} title={ele.title} />
    ));

  return (
    <div className="dashboard-container">
      <div className="intro">
        <div className="intro-content">
          <h1>Thy Nguyen</h1>
          <p>22</p>
          <p>Web developer</p>
        </div>
      </div>
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="cards-display">
            <div>{renderAcademicList()}</div>
            <div className="card-container">
              <div className="trait">
                <Radar
                  data={traitGraph}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      r: {
                        ticks: {
                          display: false,
                          maxTicksLimit: 3,
                        },
                        pointLabels: {
                          color: "rgba(146, 64, 14)",
                          font: {
                            size: 13,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="card-container">
              <div className="hobbie">
                <Doughnut
                  data={hobbieGraph}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: "rgba(146, 64, 14)",
                          font: {
                            size: 13,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div>{renderSocialList()}</div>
          </div>
        </div>
        <div className="experience-container">
          <div className="experience">
            <img src={DashboardImage} alt="Dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
