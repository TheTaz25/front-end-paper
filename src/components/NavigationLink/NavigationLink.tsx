
import { MantineColor, NavLink as MantineLink, ThemeIcon } from "@mantine/core";
import { NavLink, NavLinkProps } from "react-router-dom";

interface Props {
  to: NavLinkProps['to'],
  description?: string,
  label: string,
  icon: React.ReactNode,
  iconColor: MantineColor,
}

const NavigationLink: React.FC<React.PropsWithChildren<Props>> = ({
  label,
  to,
  description,
  children,
  icon,
  iconColor,
}) => {

  return (
    <MantineLink
      component={NavLink}
      to={to}
      label={label}
      description={description}
      icon={
        <ThemeIcon color={iconColor} variant="outline" sx={{
          height: '2rem',
          width: '2rem',
        }}>
          {icon}
        </ThemeIcon>
      }
      className="menu-link"
    >
      {children}
    </MantineLink>
  );
};

export default NavigationLink;
