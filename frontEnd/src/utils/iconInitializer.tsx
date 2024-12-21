import { library } from "@fortawesome/fontawesome-svg-core";
// import * as far from "@fortawesome/free-regular-svg-icons";
import * as fab from "@fortawesome/free-brands-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";

export const initializeIconList = () => {
  const iconList = [
    fas.faHome,
    fas.faChartPie,
    fas.faBrain,
    fas.faGuitar,
    fas.faPallet,
    fas.faCode,
    fas.faMugHot,
    fas.faSwimmer,
    fab.faLinkedin,
    fab.faInstagram,
    fab.faYoutube,
    fas.faInfo,
  ];

  // Set up icon libraries
  // @ts-ignore
  library.add(...iconList);
};
