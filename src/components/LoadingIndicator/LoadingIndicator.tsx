import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"

interface Props { ready: boolean, delay?: number }

const allColors = ["dark", "gray", "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "green", "lime", "yellow", "orange", "teal"]

const LoadingBlocker: React.FC<React.PropsWithChildren<Props>> = ({
  ready,
  delay = 1000,
  children,
}) => {
  const [color] = useState(allColors[Math.floor(Math.random() * allColors.length)]);
  const [delayedShow, setDelayedShow] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedShow(true), delay);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return !ready ? (
    <div className="loading">
      { delayedShow && <Loader size={192} color={color} /> }
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingBlocker;
