
import React, { ReactNode } from "react";

type HeroProps = {
    children: ReactNode;
  };
const Hero: React.FC<HeroProps>  = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default Hero