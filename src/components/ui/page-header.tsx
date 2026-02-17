interface IPageHeaderProps {
  title: string;
  caption?: string;
}

const PageHeader = ({ title, caption }: IPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {caption && (
        <p className="text-sm text-muted-foreground mt-1">{caption}</p>
      )}
    </div>
  );
};

export default PageHeader;
