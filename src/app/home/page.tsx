"use client";
import Home from '../../components/HomeComponent';
import withAuth from '../../hoc/withAuth'; 

const HomePage= () => {
    return (
      <div>
        <header>
            <Home />
        </header>
      </div>
    );
  };
  
export default withAuth(HomePage);
// export default HomePage;
