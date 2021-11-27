import { Meta } from 'src/layout/Meta';
import { Main } from 'src/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title='Next.js Boilerplate Presentation'
          description='Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework.'
        />
      }
    >
      <h1>index</h1>
    </Main>
  );
};

export default Index;
