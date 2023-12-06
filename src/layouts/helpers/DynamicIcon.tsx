import { FC } from "react";
import type { IconType } from "react-icons";

// Import FontAwesome icons
import * as FaIcons6 from "react-icons/fa6";

// Import SimpleIcons
import * as SiIcons from "react-icons/si";

// Import BoxIcons
import * as BiIcons from "react-icons/bi";

// Import Grommet-Icons
import * as GrIcons from "react-icons/gr";

// Existing imports
import * as BsPersonCheckFill from "react-icons/bs";
import * as RiMoneyDollarCircleFill from "react-icons/ri";
import * as TbStarsFilled from "react-icons/tb";
import * as SlGraph from "react-icons/sl";
import { SiDotnet } from "react-icons/si";

type IconMap = Record<string, IconType>;

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const iconLibraries: { [key: string]: IconMap } = {
  fa: FaIcons6,
  si: SiIcons,
  bi: BiIcons,
  gr: GrIcons,
  bs: BsPersonCheckFill,
  ri: RiMoneyDollarCircleFill,
  tb: TbStarsFilled,
  sl: SlGraph,
};

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const IconLibrary = getIconLibrary(icon);
  const Icon = IconLibrary ? IconLibrary[icon] : undefined;

  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }

  return <Icon {...props} />;
};

const getIconLibrary = (icon: string): IconMap | undefined => {
  const libraryKey = [...icon].reduce((lib, letter, i) => {
    if (letter === letter.toUpperCase() && lib === "" && i > 0) {
      return icon.slice(0, i).toLowerCase();
    }
    return lib;
  }, "");

  return iconLibraries[libraryKey];
};

export default DynamicIcon;
