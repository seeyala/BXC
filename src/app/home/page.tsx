"use client";
import Home from '../../components/HomeComponent';
import withAuth from '../../hoc/withAuth'; 

const HomePage= () => {
    return (
      <div>
        <header>
            <Home />
        </header>
        <main>

        </main>
      </div>
    );
  };
  
export default withAuth(HomePage);
// export default HomePage;
