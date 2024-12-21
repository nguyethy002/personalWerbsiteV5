import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";

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