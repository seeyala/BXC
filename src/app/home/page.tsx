"use client";
import Home from '../../components/HomeComponent';
import withAuth from '../../hoc/withAuth';
import UploadImage from '../../components/UploadImage';

const HomePage= () => {
    return (
      <div>
        <header>
            <Home /><UploadImage />
        </header>
      </div>
    );
  };
  
export default withAuth(HomePage);
// export default HomePage;
