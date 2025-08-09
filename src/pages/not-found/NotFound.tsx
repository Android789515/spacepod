import { Page } from 'components/page';

export const NotFound = () => {
  return (
    <Page
      title={`Couldn't find that...`}
      headerContent={null}
      mainContent={(
        <div>
          <h2>
            404 Page Not Found
          </h2>
        </div>
      )}
    />
  );
};

