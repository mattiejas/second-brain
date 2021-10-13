import cn from "classnames";

type Props = React.HTMLAttributes<HTMLSpanElement>;

const Version: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("version", className)}>
      {process.env.REACT_APP_VERSION}-{process.env.REACT_APP_GIT_SHA}@{process.env.REACT_APP_GIT_BRANCH}
    </div>
  );
};

export default Version;
