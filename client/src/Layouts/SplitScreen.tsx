interface SplitScreenProps {
  children: React.ReactNode[];
}

export const SplitScreen = ({ children }: SplitScreenProps) => {
  const [left, right] = children;

  return (
    <div className="main-container">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </div>
  );
};
