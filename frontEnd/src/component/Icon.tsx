import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faInfoCircle, faFolder, faPen } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";

// Add the icons to the library so they can be used globally
library.add(faHome, faInfoCircle, faFolder, faPen);

interface IconInfo {
  icon: [string, string];
  className?: string;
  style?: object;
  spin?: boolean;
}

export const Icon = ({ icon, className, style, spin = false }: IconInfo) => {
  return (
    <FontAwesomeIcon
      icon={icon as IconProp}
      className={cx(className)}
      style={style}
      spin={spin}
    />
  );
};

export default Icon;
